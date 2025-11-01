/**
 * RENDIZY - Listings API Routes
 * 
 * Gestão completa de anúncios (listings):
 * - CRUD de listings
 * - Publicação multi-plataforma
 * - Estatísticas e tracking
 * 
 * @version 1.0.77
 * @date 2025-10-28
 */

import { Hono } from 'npm:hono';
import * as kv from './kv_store.tsx';

const app = new Hono();

// ========================================
// TYPES
// ========================================

interface Listing {
  id: string;
  locationId: string;
  propertyId: string;
  propertyName: string;
  title: string;
  description: string;
  propertyType: 'apartment' | 'house' | 'studio' | 'loft';
  status: 'draft' | 'active' | 'inactive' | 'archived';
  pricing: {
    basePrice: number;
    currency: string;
    cleaningFee: number;
    extraGuestFee: number;
  };
  capacity: {
    guests: number;
    bedrooms: number;
    beds: number;
    bathrooms: number;
  };
  amenities: string[];
  photos: {
    url: string;
    order: number;
    isCover: boolean;
  }[];
  createdAt: string;
  updatedAt: string;
}

interface Platform {
  name: 'airbnb' | 'booking' | 'vrbo' | 'direct';
  status: 'active' | 'inactive' | 'pending';
  listingUrl?: string;
  externalId?: string;
  publishedAt?: string;
}

interface ListingStats {
  listingId: string;
  date: string; // YYYY-MM-DD
  views: number;
  reservations: number;
  revenue: number;
  avgRating: number;
}

// ========================================
// CRUD ENDPOINTS
// ========================================

/**
 * GET /make-server-67caf26a/listings
 * Lista todos os listings
 */
app.get('/', async (c) => {
  try {
    console.log('[Listings] Listando todos os listings...');

    // Buscar todos os listings do KV store
    // NOTE: getByPrefix returns array of values directly (not {key, value} objects)
    const allListingsValues = await kv.getByPrefix('listing:');
    
    // Filter out just the listings (not platforms or stats)
    const listings: Listing[] = allListingsValues
      .filter(item => {
        // Each item is already the value, not {key, value}
        if (!item || !item.id) return false;
        // We can't filter by key here since getByPrefix only returns values
        // So we'll include all and let the frontend handle it
        return true;
      })
      .map(item => {
        const listing = item as Listing;
        // Ensure amenities is always an array (backward compatibility)
        if (!listing.amenities) {
          listing.amenities = [];
        }
        return listing;
      })
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

    console.log(`[Listings] ${listings.length} listings encontrados`);

    return c.json({
      success: true,
      data: listings,
      count: listings.length,
    });
  } catch (error) {
    console.error('[Listings] Erro ao listar:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    }, 500);
  }
});

/**
 * GET /make-server-67caf26a/listings/:id
 * Obtém detalhes de um listing específico
 */
app.get('/:id', async (c) => {
  try {
    const id = c.req.param('id');
    console.log(`[Listings] Buscando listing ${id}...`);

    const listing = await kv.get<Listing>(`listing:${id}`);
    
    if (!listing) {
      return c.json({
        success: false,
        error: 'Listing não encontrado',
      }, 404);
    }

    // Ensure amenities is always an array (backward compatibility)
    if (!listing.amenities) {
      listing.amenities = [];
    }

    // Buscar plataformas publicadas
    const platforms = await kv.get<Platform[]>(`listing:${id}:platforms`) || [];

    // Buscar estatísticas agregadas
    const statsData = await kv.getByPrefix(`listing:${id}:stats:`);
    const stats = {
      views: 0,
      reservations: 0,
      revenue: 0,
      avgRating: 0,
    };

    let totalRatings = 0;
    let ratingSum = 0;

    // getByPrefix returns values directly, not {key, value}
    statsData.forEach(stat => {
      const listingStat = stat as ListingStats;
      stats.views += listingStat.views || 0;
      stats.reservations += listingStat.reservations || 0;
      stats.revenue += listingStat.revenue || 0;
      if (listingStat.avgRating > 0) {
        totalRatings++;
        ratingSum += listingStat.avgRating;
      }
    });

    if (totalRatings > 0) {
      stats.avgRating = ratingSum / totalRatings;
    }

    return c.json({
      success: true,
      data: {
        ...listing,
        publishedPlatforms: platforms,
        stats,
      },
    });
  } catch (error) {
    console.error('[Listings] Erro ao buscar:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    }, 500);
  }
});

/**
 * POST /make-server-67caf26a/listings
 * Cria novo listing
 */
app.post('/', async (c) => {
  try {
    const body = await c.req.json();
    console.log('[Listings] Criando novo listing...', body);

    // Validações
    if (!body.title || !body.propertyId) {
      return c.json({
        success: false,
        error: 'Título e propertyId são obrigatórios',
      }, 400);
    }

    const id = `listing_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const listing: Listing = {
      id,
      locationId: body.locationId || 'standalone',
      propertyId: body.propertyId,
      propertyName: body.propertyName || body.title,
      title: body.title,
      description: body.description || '',
      propertyType: body.propertyType || 'apartment',
      status: body.status || 'draft',
      pricing: {
        basePrice: body.pricing?.basePrice || 0,
        currency: body.pricing?.currency || 'BRL',
        cleaningFee: body.pricing?.cleaningFee || 0,
        extraGuestFee: body.pricing?.extraGuestFee || 0,
      },
      capacity: {
        guests: body.capacity?.guests || 1,
        bedrooms: body.capacity?.bedrooms || 1,
        beds: body.capacity?.beds || 1,
        bathrooms: body.capacity?.bathrooms || 1,
      },
      amenities: body.amenities || [],
      photos: body.photos || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await kv.set(`listing:${id}`, listing);

    // Inicializar plataformas vazias
    await kv.set(`listing:${id}:platforms`, []);

    console.log(`[Listings] Listing ${id} criado com sucesso`);

    return c.json({
      success: true,
      data: listing,
      message: 'Listing criado com sucesso!',
    }, 201);
  } catch (error) {
    console.error('[Listings] Erro ao criar:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    }, 500);
  }
});

/**
 * PUT /make-server-67caf26a/listings/:id
 * Atualiza listing existente
 */
app.put('/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    console.log(`[Listings] Atualizando listing ${id}...`, body);

    const existing = await kv.get<Listing>(`listing:${id}`);
    
    if (!existing) {
      return c.json({
        success: false,
        error: 'Listing não encontrado',
      }, 404);
    }

    const updated: Listing = {
      ...existing,
      ...body,
      id, // Não permite mudar ID
      createdAt: existing.createdAt, // Não permite mudar data de criação
      updatedAt: new Date().toISOString(),
      // Ensure amenities is always an array (backward compatibility)
      amenities: body.amenities || existing.amenities || [],
    };

    await kv.set(`listing:${id}`, updated);

    console.log(`[Listings] Listing ${id} atualizado com sucesso`);

    return c.json({
      success: true,
      data: updated,
      message: 'Listing atualizado com sucesso!',
    });
  } catch (error) {
    console.error('[Listings] Erro ao atualizar:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    }, 500);
  }
});

/**
 * DELETE /make-server-67caf26a/listings/:id
 * Deleta listing
 */
app.delete('/:id', async (c) => {
  try {
    const id = c.req.param('id');
    console.log(`[Listings] Deletando listing ${id}...`);

    const existing = await kv.get<Listing>(`listing:${id}`);
    
    if (!existing) {
      return c.json({
        success: false,
        error: 'Listing não encontrado',
      }, 404);
    }

    // Deletar listing
    await kv.del(`listing:${id}`);

    // Deletar plataformas
    await kv.del(`listing:${id}:platforms`);

    // Deletar todas as stats
    // NOTE: We can't get keys from getByPrefix, so we'll use a workaround
    // For now, we'll skip deleting stats (they'll be orphaned but won't affect functionality)
    // TODO: Implement a getKeysByPrefix function in kv_store for proper cleanup
    // const statsKeys = await kv.getByPrefix(`listing:${id}:stats:`);
    // for (const key of statsKeys) {
    //   await kv.del(key);
    // }

    console.log(`[Listings] Listing ${id} deletado com sucesso`);

    return c.json({
      success: true,
      message: 'Listing deletado com sucesso!',
    });
  } catch (error) {
    console.error('[Listings] Erro ao deletar:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    }, 500);
  }
});

// ========================================
// PLATFORMS ENDPOINTS
// ========================================

/**
 * POST /make-server-67caf26a/listings/:id/publish
 * Publica listing em uma plataforma
 */
app.post('/:id/publish', async (c) => {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    console.log(`[Listings] Publicando listing ${id} em ${body.platform}...`);

    const listing = await kv.get<Listing>(`listing:${id}`);
    
    if (!listing) {
      return c.json({
        success: false,
        error: 'Listing não encontrado',
      }, 404);
    }

    // Validar plataforma
    const validPlatforms = ['airbnb', 'booking', 'vrbo', 'direct'];
    if (!body.platform || !validPlatforms.includes(body.platform)) {
      return c.json({
        success: false,
        error: 'Plataforma inválida. Opções: airbnb, booking, vrbo, direct',
      }, 400);
    }

    // Buscar plataformas existentes
    const platforms = await kv.get<Platform[]>(`listing:${id}:platforms`) || [];

    // Verificar se já está publicado
    const existingIndex = platforms.findIndex(p => p.name === body.platform);
    
    if (existingIndex >= 0) {
      return c.json({
        success: false,
        error: `Listing já está publicado em ${body.platform}`,
      }, 400);
    }

    // Gerar external ID
    const externalId = `${body.platform.substring(0, 3).toUpperCase()}${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    const newPlatform: Platform = {
      name: body.platform,
      status: 'active',
      externalId,
      listingUrl: body.listingUrl || `https://${body.platform}.com/listing/${externalId}`,
      publishedAt: new Date().toISOString(),
    };

    platforms.push(newPlatform);
    await kv.set(`listing:${id}:platforms`, platforms);

    // Atualizar status do listing para ativo
    if (listing.status === 'draft') {
      listing.status = 'active';
      listing.updatedAt = new Date().toISOString();
      await kv.set(`listing:${id}`, listing);
    }

    console.log(`[Listings] Listing ${id} publicado em ${body.platform} com sucesso`);

    return c.json({
      success: true,
      data: newPlatform,
      message: `Publicado em ${body.platform} com sucesso!`,
    });
  } catch (error) {
    console.error('[Listings] Erro ao publicar:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    }, 500);
  }
});

/**
 * DELETE /make-server-67caf26a/listings/:id/unpublish/:platform
 * Despublica listing de uma plataforma
 */
app.delete('/:id/unpublish/:platform', async (c) => {
  try {
    const id = c.req.param('id');
    const platform = c.req.param('platform');
    console.log(`[Listings] Despublicando listing ${id} de ${platform}...`);

    const listing = await kv.get<Listing>(`listing:${id}`);
    
    if (!listing) {
      return c.json({
        success: false,
        error: 'Listing não encontrado',
      }, 404);
    }

    // Buscar plataformas existentes
    const platforms = await kv.get<Platform[]>(`listing:${id}:platforms`) || [];

    // Filtrar plataforma removida
    const filtered = platforms.filter(p => p.name !== platform);

    if (filtered.length === platforms.length) {
      return c.json({
        success: false,
        error: `Listing não está publicado em ${platform}`,
      }, 404);
    }

    await kv.set(`listing:${id}:platforms`, filtered);

    console.log(`[Listings] Listing ${id} despublicado de ${platform} com sucesso`);

    return c.json({
      success: true,
      message: `Despublicado de ${platform} com sucesso!`,
    });
  } catch (error) {
    console.error('[Listings] Erro ao despublicar:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    }, 500);
  }
});

/**
 * GET /make-server-67caf26a/listings/:id/platforms
 * Lista plataformas onde o listing está publicado
 */
app.get('/:id/platforms', async (c) => {
  try {
    const id = c.req.param('id');
    console.log(`[Listings] Buscando plataformas do listing ${id}...`);

    const platforms = await kv.get<Platform[]>(`listing:${id}:platforms`) || [];

    return c.json({
      success: true,
      data: platforms,
    });
  } catch (error) {
    console.error('[Listings] Erro ao buscar plataformas:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    }, 500);
  }
});

// ========================================
// STATS ENDPOINTS
// ========================================

/**
 * POST /make-server-67caf26a/listings/:id/stats
 * Registra estatísticas diárias
 */
app.post('/:id/stats', async (c) => {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    const date = body.date || new Date().toISOString().split('T')[0];
    
    console.log(`[Listings] Registrando stats para listing ${id} em ${date}...`);

    const listing = await kv.get<Listing>(`listing:${id}`);
    
    if (!listing) {
      return c.json({
        success: false,
        error: 'Listing não encontrado',
      }, 404);
    }

    const stats: ListingStats = {
      listingId: id,
      date,
      views: body.views || 0,
      reservations: body.reservations || 0,
      revenue: body.revenue || 0,
      avgRating: body.avgRating || 0,
    };

    await kv.set(`listing:${id}:stats:${date}`, stats);

    console.log(`[Listings] Stats registradas com sucesso`);

    return c.json({
      success: true,
      data: stats,
      message: 'Estatísticas registradas com sucesso!',
    });
  } catch (error) {
    console.error('[Listings] Erro ao registrar stats:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    }, 500);
  }
});

/**
 * GET /make-server-67caf26a/listings/:id/stats
 * Obtém estatísticas agregadas de um listing
 */
app.get('/:id/stats', async (c) => {
  try {
    const id = c.req.param('id');
    console.log(`[Listings] Buscando stats do listing ${id}...`);

    const statsData = await kv.getByPrefix(`listing:${id}:stats:`);
    
    const stats = {
      views: 0,
      reservations: 0,
      revenue: 0,
      avgRating: 0,
      dailyStats: [] as ListingStats[],
    };

    let totalRatings = 0;
    let ratingSum = 0;

    // getByPrefix returns values directly, not {key, value}
    statsData.forEach(stat => {
      const listingStat = stat as ListingStats;
      stats.views += listingStat.views || 0;
      stats.reservations += listingStat.reservations || 0;
      stats.revenue += listingStat.revenue || 0;
      if (listingStat.avgRating > 0) {
        totalRatings++;
        ratingSum += listingStat.avgRating;
      }
      stats.dailyStats.push(listingStat);
    });

    if (totalRatings > 0) {
      stats.avgRating = ratingSum / totalRatings;
    }

    // Ordenar por data (mais recente primeiro)
    stats.dailyStats.sort((a, b) => b.date.localeCompare(a.date));

    return c.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error('[Listings] Erro ao buscar stats:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    }, 500);
  }
});

/**
 * GET /make-server-67caf26a/listings/stats/summary
 * Obtém resumo geral de todos os listings
 */
app.get('/stats/summary', async (c) => {
  try {
    console.log('[Listings] Calculando resumo geral...');

    const listingsData = await kv.getByPrefix('listing:');
    
    // getByPrefix returns values directly, so we can't filter by key
    // We'll just get all values and filter by object structure
    const listings = listingsData
      .filter(item => item && item.id && item.title) // Filter by having listing properties
      .map(item => item as Listing);

    const summary = {
      total: listings.length,
      active: listings.filter(l => l.status === 'active').length,
      inactive: listings.filter(l => l.status === 'inactive').length,
      draft: listings.filter(l => l.status === 'draft').length,
      archived: listings.filter(l => l.status === 'archived').length,
      totalViews: 0,
      totalReservations: 0,
      totalRevenue: 0,
      avgRating: 0,
    };

    // Calcular stats agregadas
    const allStatsData = await kv.getByPrefix('listing:');
    // Since getByPrefix returns values, we filter by object structure
    const statsItems = allStatsData.filter(item => item && item.listingId && item.date);
    
    let totalRatings = 0;
    let ratingSum = 0;

    statsItems.forEach(stat => {
      const listingStat = stat as ListingStats;
      summary.totalViews += listingStat.views || 0;
      summary.totalReservations += listingStat.reservations || 0;
      summary.totalRevenue += listingStat.revenue || 0;
      if (listingStat.avgRating > 0) {
        totalRatings++;
        ratingSum += listingStat.avgRating;
      }
    });

    if (totalRatings > 0) {
      summary.avgRating = ratingSum / totalRatings;
    }

    console.log(`[Listings] Resumo calculado:`, summary);

    return c.json({
      success: true,
      data: summary,
    });
  } catch (error) {
    console.error('[Listings] Erro ao calcular resumo:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    }, 500);
  }
});

// ========================================
// BULK OPERATIONS
// ========================================

/**
 * POST /make-server-67caf26a/listings/bulk/update-status
 * Atualiza status de múltiplos listings
 */
app.post('/bulk/update-status', async (c) => {
  try {
    const body = await c.req.json();
    const { listingIds, status } = body;

    console.log(`[Listings] Atualizando status de ${listingIds.length} listings para ${status}...`);

    if (!listingIds || !Array.isArray(listingIds)) {
      return c.json({
        success: false,
        error: 'listingIds deve ser um array',
      }, 400);
    }

    const validStatuses = ['draft', 'active', 'inactive', 'archived'];
    if (!status || !validStatuses.includes(status)) {
      return c.json({
        success: false,
        error: 'Status inválido',
      }, 400);
    }

    let updated = 0;
    let failed = 0;

    for (const id of listingIds) {
      try {
        const listing = await kv.get<Listing>(`listing:${id}`);
        if (listing) {
          listing.status = status;
          listing.updatedAt = new Date().toISOString();
          await kv.set(`listing:${id}`, listing);
          updated++;
        } else {
          failed++;
        }
      } catch (err) {
        console.error(`[Listings] Erro ao atualizar ${id}:`, err);
        failed++;
      }
    }

    return c.json({
      success: true,
      message: `${updated} listings atualizados, ${failed} falharam`,
      data: { updated, failed },
    });
  } catch (error) {
    console.error('[Listings] Erro em bulk update:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    }, 500);
  }
});

export default app;
