/**
 * RENDIZY - iCal Synchronization Routes
 * 
 * Sistema completo de sincronização iCal para evitar overbooking
 * e permitir integração com Airbnb, Booking.com e outras plataformas.
 * 
 * Funcionalidades:
 * - Geração de URLs iCal por listing (export)
 * - Importação de calendários externos (import)
 * - Sincronização automática
 * - Parser de eventos iCal
 * - Gestão de conflitos
 * 
 * @version 1.0.83
 * @date 2025-10-29
 */

import { Hono } from 'npm:hono@4.6.14';
import * as kv from './kv_store.tsx';

const app = new Hono();

// ============================================================================
// TYPES
// ============================================================================

interface ICalFeed {
  id: string;
  listing_id: string;
  organization_id: string;
  name: string;
  url: string;
  platform: 'airbnb' | 'booking' | 'vrbo' | 'custom';
  status: 'active' | 'inactive' | 'error';
  last_sync_at?: string;
  last_sync_status?: 'success' | 'error';
  last_sync_message?: string;
  sync_frequency_minutes: number; // 60 = 1h, 1440 = 24h
  created_at: string;
  updated_at: string;
}

interface ICalEvent {
  id: string;
  feed_id: string;
  listing_id: string;
  organization_id: string;
  external_id: string; // UID do evento iCal
  summary: string; // Nome do evento
  description?: string;
  start_date: string; // YYYY-MM-DD
  end_date: string; // YYYY-MM-DD
  status: 'confirmed' | 'tentative' | 'cancelled';
  created_at: string;
  updated_at: string;
}

// ============================================================================
// HELPER: ICAL PARSER
// ============================================================================

/**
 * Parser simples de iCal
 * Extrai eventos (VEVENT) de um arquivo .ics
 */
function parseICalendar(icalContent: string): Array<{
  uid: string;
  summary: string;
  description?: string;
  dtstart: string;
  dtend: string;
  status: string;
}> {
  const events: Array<{
    uid: string;
    summary: string;
    description?: string;
    dtstart: string;
    dtend: string;
    status: string;
  }> = [];

  // Split por VEVENT
  const vevents = icalContent.split('BEGIN:VEVENT');
  
  for (let i = 1; i < vevents.length; i++) {
    const eventBlock = vevents[i].split('END:VEVENT')[0];
    
    const uid = extractField(eventBlock, 'UID');
    const summary = extractField(eventBlock, 'SUMMARY');
    const description = extractField(eventBlock, 'DESCRIPTION');
    const dtstart = extractField(eventBlock, 'DTSTART');
    const dtend = extractField(eventBlock, 'DTEND');
    const status = extractField(eventBlock, 'STATUS') || 'CONFIRMED';
    
    if (uid && dtstart && dtend) {
      events.push({
        uid,
        summary: summary || 'Reserva Bloqueada',
        description,
        dtstart: formatICalDate(dtstart),
        dtend: formatICalDate(dtend),
        status
      });
    }
  }
  
  return events;
}

/**
 * Extrai valor de um campo do iCal
 */
function extractField(block: string, field: string): string {
  const regex = new RegExp(`${field}[;:]([^\\r\\n]+)`, 'i');
  const match = block.match(regex);
  return match ? match[1].trim() : '';
}

/**
 * Formata data iCal (YYYYMMDD ou YYYYMMDDTHHMMSSZ) para YYYY-MM-DD
 */
function formatICalDate(icalDate: string): string {
  // Remove tudo que não é número
  const dateOnly = icalDate.replace(/[^0-9]/g, '').substring(0, 8);
  
  if (dateOnly.length === 8) {
    const year = dateOnly.substring(0, 4);
    const month = dateOnly.substring(4, 6);
    const day = dateOnly.substring(6, 8);
    return `${year}-${month}-${day}`;
  }
  
  return icalDate;
}

// ============================================================================
// HELPER: ICAL GENERATOR
// ============================================================================

/**
 * Gera conteúdo iCal a partir de reservas/bloqueios
 */
function generateICalendar(
  listingId: string,
  listingName: string,
  events: Array<{
    id: string;
    guestName?: string;
    checkIn: string;
    checkOut: string;
    status: string;
  }>
): string {
  const now = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  
  let ical = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//RENDIZY//iCal Export//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-CALNAME:${listingName}`,
    `X-WR-CALDESC:Calendário de reservas - ${listingName}`,
    'X-WR-TIMEZONE:America/Sao_Paulo',
  ].join('\r\n');
  
  for (const event of events) {
    const uid = `${event.id}@rendizy.com`;
    const summary = event.guestName 
      ? `Reserva - ${event.guestName}` 
      : 'Período Bloqueado';
    const description = `Status: ${event.status}`;
    
    // Converte YYYY-MM-DD para YYYYMMDD
    const dtstart = event.checkIn.replace(/-/g, '');
    const dtend = event.checkOut.replace(/-/g, '');
    
    ical += '\r\n' + [
      'BEGIN:VEVENT',
      `UID:${uid}`,
      `DTSTAMP:${now}`,
      `DTSTART;VALUE=DATE:${dtstart}`,
      `DTEND;VALUE=DATE:${dtend}`,
      `SUMMARY:${summary}`,
      `DESCRIPTION:${description}`,
      'STATUS:CONFIRMED',
      'TRANSP:OPAQUE',
      'END:VEVENT'
    ].join('\r\n');
  }
  
  ical += '\r\nEND:VCALENDAR';
  
  return ical;
}

// ============================================================================
// ROUTES: ICAL FEEDS MANAGEMENT
// ============================================================================

/**
 * GET /listings/:listingId/ical-feeds
 * Lista todos os feeds iCal configurados para um listing
 */
app.get('/make-server-67caf26a/listings/:listingId/ical-feeds', async (c) => {
  try {
    const { listingId } = c.req.param();
    
    // Buscar todos os feeds deste listing
    const allFeeds = await kv.getByPrefix<ICalFeed>(`ical_feed:`);
    const feeds = allFeeds.filter(f => f.listing_id === listingId);
    
    return c.json({
      success: true,
      data: feeds.sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )
    });
  } catch (error) {
    console.error('Error fetching iCal feeds:', error);
    return c.json({
      success: false,
      error: 'Erro ao buscar feeds iCal',
      details: error instanceof Error ? error.message : String(error)
    }, 500);
  }
});

/**
 * POST /listings/:listingId/ical-feeds
 * Cria novo feed iCal para importação
 */
app.post('/make-server-67caf26a/listings/:listingId/ical-feeds', async (c) => {
  try {
    const { listingId } = c.req.param();
    const body = await c.req.json();
    
    const { name, url, platform, sync_frequency_minutes = 1440 } = body;
    
    // Validações
    if (!name || !url) {
      return c.json({
        success: false,
        error: 'Nome e URL são obrigatórios'
      }, 400);
    }
    
    if (!url.startsWith('http://') && !url.startsWith('https://') && !url.startsWith('webcal://')) {
      return c.json({
        success: false,
        error: 'URL inválida. Deve começar com http://, https:// ou webcal://'
      }, 400);
    }
    
    // Buscar listing para obter organization_id
    const listing = await kv.get<any>(`listing:${listingId}`);
    if (!listing) {
      return c.json({
        success: false,
        error: 'Listing não encontrado'
      }, 404);
    }
    
    const feed: ICalFeed = {
      id: crypto.randomUUID(),
      listing_id: listingId,
      organization_id: listing.organization_id,
      name,
      url: url.replace('webcal://', 'https://'), // Converte webcal para https
      platform: platform || 'custom',
      status: 'active',
      sync_frequency_minutes,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    await kv.set(`ical_feed:${feed.id}`, feed);
    
    // Fazer sync inicial imediatamente
    try {
      await syncICalFeed(feed);
    } catch (syncError) {
      console.error('Initial sync failed:', syncError);
      // Não falha a criação, apenas loga o erro
    }
    
    return c.json({
      success: true,
      data: feed,
      message: 'Feed iCal criado com sucesso'
    });
  } catch (error) {
    console.error('Error creating iCal feed:', error);
    return c.json({
      success: false,
      error: 'Erro ao criar feed iCal',
      details: error instanceof Error ? error.message : String(error)
    }, 500);
  }
});

/**
 * PUT /ical-feeds/:feedId
 * Atualiza configurações de um feed
 */
app.put('/make-server-67caf26a/ical-feeds/:feedId', async (c) => {
  try {
    const { feedId } = c.req.param();
    const body = await c.req.json();
    
    const feed = await kv.get<ICalFeed>(`ical_feed:${feedId}`);
    if (!feed) {
      return c.json({
        success: false,
        error: 'Feed não encontrado'
      }, 404);
    }
    
    const updated: ICalFeed = {
      ...feed,
      ...body,
      id: feed.id, // Não permite alterar o ID
      listing_id: feed.listing_id, // Não permite alterar o listing
      organization_id: feed.organization_id, // Não permite alterar a org
      updated_at: new Date().toISOString()
    };
    
    await kv.set(`ical_feed:${feedId}`, updated);
    
    return c.json({
      success: true,
      data: updated,
      message: 'Feed atualizado com sucesso'
    });
  } catch (error) {
    console.error('Error updating iCal feed:', error);
    return c.json({
      success: false,
      error: 'Erro ao atualizar feed',
      details: error instanceof Error ? error.message : String(error)
    }, 500);
  }
});

/**
 * DELETE /ical-feeds/:feedId
 * Remove um feed iCal
 */
app.delete('/make-server-67caf26a/ical-feeds/:feedId', async (c) => {
  try {
    const { feedId } = c.req.param();
    
    const feed = await kv.get<ICalFeed>(`ical_feed:${feedId}`);
    if (!feed) {
      return c.json({
        success: false,
        error: 'Feed não encontrado'
      }, 404);
    }
    
    // Remover todos os eventos deste feed
    const events = await kv.getByPrefix<ICalEvent>(`ical_event:${feedId}:`);
    for (const event of events) {
      await kv.del(`ical_event:${feedId}:${event.id}`);
    }
    
    // Remover o feed
    await kv.del(`ical_feed:${feedId}`);
    
    return c.json({
      success: true,
      message: 'Feed removido com sucesso'
    });
  } catch (error) {
    console.error('Error deleting iCal feed:', error);
    return c.json({
      success: false,
      error: 'Erro ao remover feed',
      details: error instanceof Error ? error.message : String(error)
    }, 500);
  }
});

// ============================================================================
// ROUTES: ICAL EXPORT (Gerar calendário para OTAs)
// ============================================================================

/**
 * GET /listings/:listingId/ical/export
 * Gera arquivo .ics com todas as reservas e bloqueios
 * Para ser usado em Airbnb, Booking.com, etc
 */
app.get('/make-server-67caf26a/listings/:listingId/ical/export', async (c) => {
  try {
    const { listingId } = c.req.param();
    
    // Buscar listing
    const listing = await kv.get<any>(`listing:${listingId}`);
    if (!listing) {
      return c.text('Listing não encontrado', 404);
    }
    
    // Buscar todas as reservas e bloqueios deste listing
    const allReservations = await kv.getByPrefix<any>('reservation:');
    const listingReservations = allReservations
      .filter(r => r.property_id === listingId || r.listing_id === listingId)
      .map(r => ({
        id: r.id,
        guestName: r.guest_name,
        checkIn: r.check_in,
        checkOut: r.check_out,
        status: r.status
      }));
    
    // Gerar iCal
    const icalContent = generateICalendar(
      listingId,
      listing.title || listing.name,
      listingReservations
    );
    
    // Retornar como arquivo .ics
    return new Response(icalContent, {
      headers: {
        'Content-Type': 'text/calendar; charset=utf-8',
        'Content-Disposition': `attachment; filename="rendizy-${listingId}.ics"`,
        'Cache-Control': 'no-cache'
      }
    });
  } catch (error) {
    console.error('Error exporting iCal:', error);
    return c.text('Erro ao gerar calendário iCal', 500);
  }
});

// ============================================================================
// ROUTES: ICAL SYNC (Sincronização)
// ============================================================================

/**
 * POST /ical-feeds/:feedId/sync
 * Força sincronização imediata de um feed
 */
app.post('/make-server-67caf26a/ical-feeds/:feedId/sync', async (c) => {
  try {
    const { feedId } = c.req.param();
    
    const feed = await kv.get<ICalFeed>(`ical_feed:${feedId}`);
    if (!feed) {
      return c.json({
        success: false,
        error: 'Feed não encontrado'
      }, 404);
    }
    
    const result = await syncICalFeed(feed);
    
    return c.json({
      success: true,
      data: result,
      message: 'Sincronização concluída'
    });
  } catch (error) {
    console.error('Error syncing iCal feed:', error);
    return c.json({
      success: false,
      error: 'Erro ao sincronizar feed',
      details: error instanceof Error ? error.message : String(error)
    }, 500);
  }
});

/**
 * GET /ical-feeds/:feedId/events
 * Lista eventos importados de um feed
 */
app.get('/make-server-67caf26a/ical-feeds/:feedId/events', async (c) => {
  try {
    const { feedId } = c.req.param();
    
    const events = await kv.getByPrefix<ICalEvent>(`ical_event:${feedId}:`);
    
    return c.json({
      success: true,
      data: events.sort((a, b) => a.start_date.localeCompare(b.start_date))
    });
  } catch (error) {
    console.error('Error fetching iCal events:', error);
    return c.json({
      success: false,
      error: 'Erro ao buscar eventos',
      details: error instanceof Error ? error.message : String(error)
    }, 500);
  }
});

// ============================================================================
// HELPER: SYNC FUNCTION
// ============================================================================

/**
 * Sincroniza um feed iCal (baixa e processa eventos)
 */
async function syncICalFeed(feed: ICalFeed): Promise<{
  events_imported: number;
  events_updated: number;
  events_removed: number;
  status: 'success' | 'error';
  message: string;
}> {
  try {
    console.log(`[iCal Sync] Starting sync for feed ${feed.id} (${feed.name})`);
    
    // Baixar conteúdo iCal
    const response = await fetch(feed.url);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const icalContent = await response.text();
    
    if (!icalContent.includes('BEGIN:VCALENDAR')) {
      throw new Error('Conteúdo não é um calendário iCal válido');
    }
    
    // Parsear eventos
    const parsedEvents = parseICalendar(icalContent);
    console.log(`[iCal Sync] Parsed ${parsedEvents.length} events`);
    
    // Buscar eventos existentes deste feed
    const existingEvents = await kv.getByPrefix<ICalEvent>(`ical_event:${feed.id}:`);
    const existingUIDs = new Set(existingEvents.map(e => e.external_id));
    const parsedUIDs = new Set(parsedEvents.map(e => e.uid));
    
    let eventsImported = 0;
    let eventsUpdated = 0;
    let eventsRemoved = 0;
    
    // Importar/atualizar eventos
    for (const parsed of parsedEvents) {
      const existing = existingEvents.find(e => e.external_id === parsed.uid);
      
      if (existing) {
        // Atualizar se mudou
        if (
          existing.start_date !== parsed.dtstart ||
          existing.end_date !== parsed.dtend ||
          existing.summary !== parsed.summary
        ) {
          const updated: ICalEvent = {
            ...existing,
            summary: parsed.summary,
            description: parsed.description,
            start_date: parsed.dtstart,
            end_date: parsed.dtend,
            status: parsed.status.toLowerCase() === 'confirmed' ? 'confirmed' : 'tentative',
            updated_at: new Date().toISOString()
          };
          
          await kv.set(`ical_event:${feed.id}:${existing.id}`, updated);
          eventsUpdated++;
        }
      } else {
        // Criar novo evento
        const newEvent: ICalEvent = {
          id: crypto.randomUUID(),
          feed_id: feed.id,
          listing_id: feed.listing_id,
          organization_id: feed.organization_id,
          external_id: parsed.uid,
          summary: parsed.summary,
          description: parsed.description,
          start_date: parsed.dtstart,
          end_date: parsed.dtend,
          status: parsed.status.toLowerCase() === 'confirmed' ? 'confirmed' : 'tentative',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        
        await kv.set(`ical_event:${feed.id}:${newEvent.id}`, newEvent);
        eventsImported++;
      }
    }
    
    // Remover eventos que não existem mais no feed
    for (const existing of existingEvents) {
      if (!parsedUIDs.has(existing.external_id)) {
        await kv.del(`ical_event:${feed.id}:${existing.id}`);
        eventsRemoved++;
      }
    }
    
    // Atualizar status do feed
    const updatedFeed: ICalFeed = {
      ...feed,
      last_sync_at: new Date().toISOString(),
      last_sync_status: 'success',
      last_sync_message: `${eventsImported} importados, ${eventsUpdated} atualizados, ${eventsRemoved} removidos`,
      updated_at: new Date().toISOString()
    };
    
    await kv.set(`ical_feed:${feed.id}`, updatedFeed);
    
    console.log(`[iCal Sync] Completed: ${eventsImported} imported, ${eventsUpdated} updated, ${eventsRemoved} removed`);
    
    return {
      events_imported: eventsImported,
      events_updated: eventsUpdated,
      events_removed: eventsRemoved,
      status: 'success',
      message: `${eventsImported} importados, ${eventsUpdated} atualizados, ${eventsRemoved} removidos`
    };
  } catch (error) {
    console.error('[iCal Sync] Error:', error);
    
    // Atualizar status do feed com erro
    const updatedFeed: ICalFeed = {
      ...feed,
      last_sync_at: new Date().toISOString(),
      last_sync_status: 'error',
      last_sync_message: error instanceof Error ? error.message : String(error),
      updated_at: new Date().toISOString()
    };
    
    await kv.set(`ical_feed:${feed.id}`, updatedFeed);
    
    throw error;
  }
}

// ============================================================================
// ROUTES: CRON / AUTO SYNC
// ============================================================================

/**
 * POST /ical/sync-all
 * Sincroniza todos os feeds ativos
 * Chamado por um cron job (ex: a cada 1 hora)
 */
app.post('/make-server-67caf26a/ical/sync-all', async (c) => {
  try {
    const allFeeds = await kv.getByPrefix<ICalFeed>('ical_feed:');
    const activeFeeds = allFeeds.filter(f => f.status === 'active');
    
    console.log(`[iCal Auto Sync] Found ${activeFeeds.length} active feeds`);
    
    const results = [];
    
    for (const feed of activeFeeds) {
      // Verificar se já passou o tempo de sincronização
      const minutesSinceLastSync = feed.last_sync_at
        ? (Date.now() - new Date(feed.last_sync_at).getTime()) / 1000 / 60
        : 9999;
      
      if (minutesSinceLastSync >= feed.sync_frequency_minutes) {
        try {
          const result = await syncICalFeed(feed);
          results.push({
            feed_id: feed.id,
            feed_name: feed.name,
            ...result
          });
        } catch (error) {
          results.push({
            feed_id: feed.id,
            feed_name: feed.name,
            status: 'error',
            message: error instanceof Error ? error.message : String(error)
          });
        }
      } else {
        console.log(`[iCal Auto Sync] Skipping feed ${feed.id} (last sync ${minutesSinceLastSync.toFixed(0)} min ago)`);
      }
    }
    
    return c.json({
      success: true,
      data: {
        total_feeds: activeFeeds.length,
        synced: results.length,
        results
      },
      message: `${results.length} feeds sincronizados`
    });
  } catch (error) {
    console.error('Error in auto sync:', error);
    return c.json({
      success: false,
      error: 'Erro na sincronização automática',
      details: error instanceof Error ? error.message : String(error)
    }, 500);
  }
});

// ============================================================================
// EXPORT
// ============================================================================

export default app;
