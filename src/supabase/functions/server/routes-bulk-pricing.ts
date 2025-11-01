/**
 * RENDIZY - Bulk Pricing Routes
 * 
 * Sistema de precificação em lote para atualizar preços de múltiplos
 * listings simultaneamente.
 * 
 * Funcionalidades:
 * - Aplicar preço base em múltiplos listings
 * - Ajuste percentual (aumentar/diminuir em %)
 * - Regras sazonais em lote
 * - Preços derivados em lote
 * - Preview antes de aplicar
 * - Aplicar por grupo/tag/localização
 * 
 * @version 1.0.85
 * @date 2025-10-29
 */

import { Hono } from 'npm:hono@4.6.14';
import * as kv from './kv_store.tsx';

const app = new Hono();

// ============================================================================
// TYPES
// ============================================================================

interface BulkPricingRequest {
  listing_ids: string[];
  operation: 'set_base' | 'adjust_percentage' | 'seasonal' | 'derived';
  
  // Para set_base
  base_price?: number;
  
  // Para adjust_percentage
  percentage?: number;  // +15 ou -10
  apply_to?: 'base' | 'all' | 'weekday' | 'weekend';
  
  // Para seasonal
  seasonal_rules?: {
    start_date: string;
    end_date: string;
    price_multiplier: number;  // 1.5 = 50% mais caro
    min_nights?: number;
  }[];
  
  // Para derived
  derived_rules?: {
    base_guests: number;
    price_per_extra_guest: number;
    max_guests: number;
  };
  
  // Opções gerais
  preview?: boolean;  // Se true, retorna preview sem salvar
  date_range?: {
    start: string;
    end: string;
  };
}

interface BulkPricingPreview {
  listing_id: string;
  listing_name: string;
  current_base_price: number;
  new_base_price: number;
  affected_dates?: number;
  estimated_revenue_change?: number;
}

interface BulkPricingResult {
  success: boolean;
  affected_listings: number;
  total_updates: number;
  preview?: BulkPricingPreview[];
  errors?: string[];
}

// ============================================================================
// HELPERS
// ============================================================================

/**
 * Calcula novo preço baseado em ajuste percentual
 */
function calculatePercentageAdjustment(
  currentPrice: number,
  percentage: number
): number {
  const adjustment = (currentPrice * percentage) / 100;
  const newPrice = currentPrice + adjustment;
  return Math.max(0, Math.round(newPrice * 100) / 100); // Min 0, 2 decimais
}

/**
 * Gera preview de mudanças antes de aplicar
 */
async function generatePreview(
  listingIds: string[],
  operation: string,
  params: any
): Promise<BulkPricingPreview[]> {
  const previews: BulkPricingPreview[] = [];
  
  for (const listingId of listingIds) {
    const listing = await kv.get<any>(`listing:${listingId}`);
    if (!listing) continue;
    
    const pricingSettings = await kv.get<any>(`pricing_settings:${listingId}`);
    const currentPrice = pricingSettings?.base_price || listing.base_price || 0;
    
    let newPrice = currentPrice;
    
    if (operation === 'set_base') {
      newPrice = params.base_price || 0;
    } else if (operation === 'adjust_percentage') {
      newPrice = calculatePercentageAdjustment(currentPrice, params.percentage || 0);
    } else if (operation === 'seasonal') {
      // Para seasonal, mostra multiplicador médio
      const avgMultiplier = params.seasonal_rules?.reduce(
        (sum: number, rule: any) => sum + rule.price_multiplier,
        0
      ) / (params.seasonal_rules?.length || 1);
      newPrice = currentPrice * avgMultiplier;
    }
    
    previews.push({
      listing_id: listingId,
      listing_name: listing.title || listing.name || 'Sem nome',
      current_base_price: currentPrice,
      new_base_price: newPrice,
      affected_dates: params.date_range ? 30 : 0, // Estimativa
      estimated_revenue_change: (newPrice - currentPrice) * 30 // Estimativa
    });
  }
  
  return previews;
}

/**
 * Aplica regras sazonais a um listing
 */
async function applySeasonalRules(
  listingId: string,
  rules: any[]
): Promise<number> {
  let updatedCount = 0;
  
  for (const rule of rules) {
    const seasonalRule = {
      id: crypto.randomUUID(),
      listing_id: listingId,
      start_date: rule.start_date,
      end_date: rule.end_date,
      price_multiplier: rule.price_multiplier,
      min_nights: rule.min_nights,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    await kv.set(
      `seasonal_rule:${listingId}:${seasonalRule.id}`,
      seasonalRule
    );
    
    updatedCount++;
  }
  
  return updatedCount;
}

/**
 * Filtra listings por critérios
 */
async function filterListings(
  organizationId: string,
  filters?: {
    tags?: string[];
    location?: string;
    property_type?: string;
  }
): Promise<string[]> {
  const allListings = await kv.getByPrefix<any>('listing:');
  
  let filtered = allListings.filter(
    l => l.organization_id === organizationId
  );
  
  if (filters?.tags && filters.tags.length > 0) {
    filtered = filtered.filter(l =>
      filters.tags?.some(tag => l.tags?.includes(tag))
    );
  }
  
  if (filters?.location) {
    filtered = filtered.filter(l =>
      l.location?.toLowerCase().includes(filters.location!.toLowerCase())
    );
  }
  
  if (filters?.property_type) {
    filtered = filtered.filter(l =>
      l.property_type === filters.property_type
    );
  }
  
  return filtered.map(l => l.id);
}

// ============================================================================
// ROUTES
// ============================================================================

/**
 * POST /organizations/:orgId/bulk-pricing/apply
 * Aplica precificação em lote
 */
app.post('/make-server-67caf26a/organizations/:orgId/bulk-pricing/apply', async (c) => {
  try {
    const { orgId } = c.req.param();
    const request = await c.req.json() as BulkPricingRequest;
    
    // Validações
    if (!request.listing_ids || request.listing_ids.length === 0) {
      return c.json({
        success: false,
        error: 'Nenhum listing selecionado'
      }, 400);
    }
    
    if (!request.operation) {
      return c.json({
        success: false,
        error: 'Operação não especificada'
      }, 400);
    }
    
    // Se for preview, gera e retorna
    if (request.preview) {
      const preview = await generatePreview(
        request.listing_ids,
        request.operation,
        request
      );
      
      return c.json({
        success: true,
        preview,
        affected_listings: preview.length
      });
    }
    
    // Aplicar mudanças reais
    let totalUpdates = 0;
    const errors: string[] = [];
    
    for (const listingId of request.listing_ids) {
      try {
        const listing = await kv.get<any>(`listing:${listingId}`);
        if (!listing) {
          errors.push(`Listing ${listingId} não encontrado`);
          continue;
        }
        
        // Buscar ou criar pricing settings
        let pricingSettings = await kv.get<any>(`pricing_settings:${listingId}`);
        if (!pricingSettings) {
          pricingSettings = {
            id: crypto.randomUUID(),
            listing_id: listingId,
            organization_id: orgId,
            base_price: listing.base_price || 0,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          };
        }
        
        // Aplicar operação
        if (request.operation === 'set_base') {
          pricingSettings.base_price = request.base_price || 0;
          totalUpdates++;
        } else if (request.operation === 'adjust_percentage') {
          const currentPrice = pricingSettings.base_price || 0;
          pricingSettings.base_price = calculatePercentageAdjustment(
            currentPrice,
            request.percentage || 0
          );
          totalUpdates++;
        } else if (request.operation === 'seasonal' && request.seasonal_rules) {
          const rulesApplied = await applySeasonalRules(
            listingId,
            request.seasonal_rules
          );
          totalUpdates += rulesApplied;
        } else if (request.operation === 'derived' && request.derived_rules) {
          pricingSettings.derived_pricing = request.derived_rules;
          totalUpdates++;
        }
        
        pricingSettings.updated_at = new Date().toISOString();
        await kv.set(`pricing_settings:${listingId}`, pricingSettings);
        
      } catch (error) {
        errors.push(`Erro em ${listingId}: ${error instanceof Error ? error.message : String(error)}`);
      }
    }
    
    return c.json({
      success: true,
      affected_listings: request.listing_ids.length - errors.length,
      total_updates: totalUpdates,
      errors: errors.length > 0 ? errors : undefined,
      message: `${totalUpdates} atualizações aplicadas em ${request.listing_ids.length - errors.length} listings`
    });
    
  } catch (error) {
    console.error('Error applying bulk pricing:', error);
    return c.json({
      success: false,
      error: 'Erro ao aplicar precificação em lote',
      details: error instanceof Error ? error.message : String(error)
    }, 500);
  }
});

/**
 * POST /organizations/:orgId/bulk-pricing/preview
 * Gera preview de mudanças sem aplicar
 */
app.post('/make-server-67caf26a/organizations/:orgId/bulk-pricing/preview', async (c) => {
  try {
    const { orgId } = c.req.param();
    const request = await c.req.json() as BulkPricingRequest;
    
    const preview = await generatePreview(
      request.listing_ids,
      request.operation,
      request
    );
    
    // Calcular estatísticas
    const totalRevChange = preview.reduce(
      (sum, p) => sum + (p.estimated_revenue_change || 0),
      0
    );
    
    const avgPriceChange = preview.reduce(
      (sum, p) => sum + (p.new_base_price - p.current_base_price),
      0
    ) / preview.length;
    
    return c.json({
      success: true,
      preview,
      stats: {
        affected_listings: preview.length,
        total_revenue_change: Math.round(totalRevChange),
        avg_price_change: Math.round(avgPriceChange * 100) / 100,
        min_new_price: Math.min(...preview.map(p => p.new_base_price)),
        max_new_price: Math.max(...preview.map(p => p.new_base_price))
      }
    });
    
  } catch (error) {
    console.error('Error generating preview:', error);
    return c.json({
      success: false,
      error: 'Erro ao gerar preview',
      details: error instanceof Error ? error.message : String(error)
    }, 500);
  }
});

/**
 * POST /organizations/:orgId/bulk-pricing/filter-listings
 * Retorna IDs de listings filtrados por critérios
 */
app.post('/make-server-67caf26a/organizations/:orgId/bulk-pricing/filter-listings', async (c) => {
  try {
    const { orgId } = c.req.param();
    const filters = await c.req.json();
    
    const listingIds = await filterListings(orgId, filters);
    
    // Buscar detalhes dos listings
    const listings = [];
    for (const id of listingIds) {
      const listing = await kv.get<any>(`listing:${id}`);
      if (listing) {
        const pricingSettings = await kv.get<any>(`pricing_settings:${id}`);
        listings.push({
          id: listing.id,
          name: listing.title || listing.name,
          location: listing.location,
          property_type: listing.property_type,
          current_price: pricingSettings?.base_price || listing.base_price || 0,
          tags: listing.tags || []
        });
      }
    }
    
    return c.json({
      success: true,
      listings,
      count: listings.length
    });
    
  } catch (error) {
    console.error('Error filtering listings:', error);
    return c.json({
      success: false,
      error: 'Erro ao filtrar listings',
      details: error instanceof Error ? error.message : String(error)
    }, 500);
  }
});

/**
 * GET /organizations/:orgId/bulk-pricing/templates
 * Retorna templates pré-configurados de precificação
 */
app.get('/make-server-67caf26a/organizations/:orgId/bulk-pricing/templates', async (c) => {
  try {
    const templates = [
      {
        id: 'alta_temporada',
        name: 'Alta Temporada (+50%)',
        description: 'Aumenta preços em 50% para alta temporada',
        operation: 'adjust_percentage',
        percentage: 50,
        icon: 'TrendingUp'
      },
      {
        id: 'baixa_temporada',
        name: 'Baixa Temporada (-20%)',
        description: 'Reduz preços em 20% para aumentar ocupação',
        operation: 'adjust_percentage',
        percentage: -20,
        icon: 'TrendingDown'
      },
      {
        id: 'fim_de_semana',
        name: 'Fim de Semana (+30%)',
        description: 'Aumenta preços em 30% aos finais de semana',
        operation: 'adjust_percentage',
        percentage: 30,
        apply_to: 'weekend',
        icon: 'Calendar'
      },
      {
        id: 'feriados',
        name: 'Feriados (+100%)',
        description: 'Dobra preços em feriados',
        operation: 'seasonal',
        seasonal_rules: [],
        icon: 'Star'
      },
      {
        id: 'reajuste_inflacao',
        name: 'Reajuste Inflação (+5%)',
        description: 'Reajuste anual baseado em inflação',
        operation: 'adjust_percentage',
        percentage: 5,
        icon: 'DollarSign'
      }
    ];
    
    return c.json({
      success: true,
      templates
    });
    
  } catch (error) {
    console.error('Error fetching templates:', error);
    return c.json({
      success: false,
      error: 'Erro ao buscar templates'
    }, 500);
  }
});

/**
 * GET /organizations/:orgId/bulk-pricing/history
 * Retorna histórico de operações em lote
 */
app.get('/make-server-67caf26a/organizations/:orgId/bulk-pricing/history', async (c) => {
  try {
    const { orgId } = c.req.param();
    
    // Buscar histórico (implementação futura - armazenar operações)
    const history = await kv.getByPrefix<any>(`bulk_pricing_history:${orgId}:`);
    
    return c.json({
      success: true,
      history: history.sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      ).slice(0, 20) // Últimas 20 operações
    });
    
  } catch (error) {
    console.error('Error fetching history:', error);
    return c.json({
      success: false,
      error: 'Erro ao buscar histórico'
    }, 500);
  }
});

// ============================================================================
// EXPORT
// ============================================================================

export default app;
