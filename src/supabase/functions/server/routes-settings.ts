/**
 * RENDIZY - Settings Routes (Global vs Individual)
 * 
 * Sistema de configurações em dois níveis:
 * - Global: Configurações da organização (aplicadas a todos os listings)
 * - Individual: Override por listing (sobrescreve o global)
 * 
 * Funcionalidades:
 * - CRUD de configurações globais
 * - CRUD de configurações individuais
 * - Sistema de herança automática
 * - Aplicação em lote (batch update)
 * 
 * @version 1.0.84
 * @date 2025-10-29
 */

import { Hono } from 'npm:hono@4.6.14';
import * as kv from './kv_store.tsx';

const app = new Hono();

// ============================================================================
// TYPES
// ============================================================================

interface GlobalSettings {
  id: string;
  organization_id: string;
  
  // Políticas de Cancelamento
  cancellation_policy: {
    enabled: boolean;
    type: 'flexible' | 'moderate' | 'strict' | 'custom';
    refund_percentage_7days: number;  // % de reembolso se cancelar 7+ dias antes
    refund_percentage_3days: number;  // % de reembolso se cancelar 3-6 dias antes
    refund_percentage_1day: number;   // % de reembolso se cancelar 1-2 dias antes
    no_refund_hours: number;           // Sem reembolso se cancelar X horas antes
  };
  
  // Check-in/Check-out
  checkin_checkout: {
    enabled: boolean;
    checkin_time_from: string;    // "14:00"
    checkin_time_to: string;      // "22:00"
    checkout_time: string;         // "11:00"
    early_checkin_fee?: number;    // Taxa por check-in antecipado
    late_checkout_fee?: number;    // Taxa por check-out tardio
    flexible_hours: boolean;       // Permite horários flexíveis
  };
  
  // Depósito/Caução
  security_deposit: {
    enabled: boolean;
    amount: number;
    required_for_all: boolean;     // Obrigatório para todas as reservas
    refund_days_after_checkout: number;  // Dias para devolver após checkout
    payment_method: 'pix' | 'card' | 'cash' | 'any';
  };
  
  // Noites Mínimas
  minimum_nights: {
    enabled: boolean;
    default_min_nights: number;
    weekend_min_nights?: number;    // Mínimo para finais de semana
    holiday_min_nights?: number;    // Mínimo para feriados
    high_season_min_nights?: number; // Mínimo para alta temporada
  };
  
  // Antecedência para Reserva
  advance_booking: {
    enabled: boolean;
    min_days_advance: number;       // Mínimo de dias de antecedência
    max_days_advance: number;       // Máximo de dias de antecedência
    same_day_booking: boolean;      // Permite reserva no mesmo dia
  };
  
  // Taxas Adicionais
  additional_fees: {
    enabled: boolean;
    cleaning_fee: number;
    cleaning_fee_is_passthrough: boolean;  // Se não entra na comissão
    service_fee_percentage: number;        // % de taxa de serviço
    platform_fee_percentage: number;       // % de taxa da plataforma
  };
  
  // Regras da Casa (Padrão)
  house_rules: {
    enabled: boolean;
    no_smoking: boolean;
    no_parties: boolean;
    no_pets: boolean;
    quiet_hours_from?: string;     // "22:00"
    quiet_hours_to?: string;       // "08:00"
    max_guests_strict: boolean;    // Aplicar limite estrito de hóspedes
  };
  
  // Comunicação
  communication: {
    enabled: boolean;
    auto_confirm_reservations: boolean;      // Confirmar automaticamente
    send_welcome_message: boolean;           // Enviar mensagem de boas-vindas
    send_checkin_instructions: boolean;      // Enviar instruções de check-in
    send_checkout_reminder: boolean;         // Enviar lembrete de checkout
    communication_language: 'pt' | 'en' | 'es' | 'auto';
  };
  
  // Metadata
  created_at: string;
  updated_at: string;
}

interface ListingSettings {
  id: string;
  listing_id: string;
  organization_id: string;
  
  // Override flags - indica se o listing usa valor próprio ou herda do global
  overrides: {
    cancellation_policy: boolean;
    checkin_checkout: boolean;
    security_deposit: boolean;
    minimum_nights: boolean;
    advance_booking: boolean;
    additional_fees: boolean;
    house_rules: boolean;
    communication: boolean;
  };
  
  // Valores personalizados (mesma estrutura do GlobalSettings)
  cancellation_policy?: GlobalSettings['cancellation_policy'];
  checkin_checkout?: GlobalSettings['checkin_checkout'];
  security_deposit?: GlobalSettings['security_deposit'];
  minimum_nights?: GlobalSettings['minimum_nights'];
  advance_booking?: GlobalSettings['advance_booking'];
  additional_fees?: GlobalSettings['additional_fees'];
  house_rules?: GlobalSettings['house_rules'];
  communication?: GlobalSettings['communication'];
  
  // Metadata
  created_at: string;
  updated_at: string;
}

// ============================================================================
// HELPERS
// ============================================================================

/**
 * Retorna configurações efetivas de um listing
 * (mescla global + individual respeitando overrides)
 */
async function getEffectiveSettings(
  listingId: string,
  organizationId: string
): Promise<Partial<GlobalSettings>> {
  // Buscar configurações globais
  const globalSettings = await kv.get<GlobalSettings>(
    `global_settings:${organizationId}`
  );
  
  // Buscar configurações do listing
  const listingSettings = await kv.get<ListingSettings>(
    `listing_settings:${listingId}`
  );
  
  if (!globalSettings) {
    // Retornar defaults se não houver configuração global
    return getDefaultSettings();
  }
  
  if (!listingSettings) {
    // Retornar global se listing não tem overrides
    return globalSettings;
  }
  
  // Mesclar: usar listing onde há override, global caso contrário
  const effective: any = {};
  
  const sections = [
    'cancellation_policy',
    'checkin_checkout',
    'security_deposit',
    'minimum_nights',
    'advance_booking',
    'additional_fees',
    'house_rules',
    'communication'
  ];
  
  for (const section of sections) {
    if (listingSettings.overrides[section] && listingSettings[section]) {
      effective[section] = listingSettings[section];
    } else {
      effective[section] = globalSettings[section];
    }
  }
  
  return effective;
}

/**
 * Retorna configurações padrão
 */
function getDefaultSettings(): Partial<GlobalSettings> {
  return {
    cancellation_policy: {
      enabled: true,
      type: 'moderate',
      refund_percentage_7days: 100,
      refund_percentage_3days: 50,
      refund_percentage_1day: 0,
      no_refund_hours: 24
    },
    checkin_checkout: {
      enabled: true,
      checkin_time_from: '14:00',
      checkin_time_to: '22:00',
      checkout_time: '11:00',
      flexible_hours: false
    },
    security_deposit: {
      enabled: false,
      amount: 0,
      required_for_all: false,
      refund_days_after_checkout: 7,
      payment_method: 'pix'
    },
    minimum_nights: {
      enabled: true,
      default_min_nights: 2
    },
    advance_booking: {
      enabled: true,
      min_days_advance: 1,
      max_days_advance: 365,
      same_day_booking: false
    },
    additional_fees: {
      enabled: true,
      cleaning_fee: 0,
      cleaning_fee_is_passthrough: false,
      service_fee_percentage: 0,
      platform_fee_percentage: 0
    },
    house_rules: {
      enabled: true,
      no_smoking: true,
      no_parties: true,
      no_pets: false,
      max_guests_strict: true
    },
    communication: {
      enabled: true,
      auto_confirm_reservations: true,
      send_welcome_message: true,
      send_checkin_instructions: true,
      send_checkout_reminder: true,
      communication_language: 'pt'
    }
  };
}

// ============================================================================
// ROUTES: GLOBAL SETTINGS
// ============================================================================

/**
 * GET /organizations/:orgId/settings/global
 * Retorna configurações globais da organização
 */
app.get('/make-server-67caf26a/organizations/:orgId/settings/global', async (c) => {
  try {
    const { orgId } = c.req.param();
    
    let settings = await kv.get<GlobalSettings>(`global_settings:${orgId}`);
    
    if (!settings) {
      // Criar configurações padrão se não existirem
      settings = {
        id: crypto.randomUUID(),
        organization_id: orgId,
        ...getDefaultSettings(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      } as GlobalSettings;
      
      await kv.set(`global_settings:${orgId}`, settings);
    }
    
    return c.json({
      success: true,
      data: settings
    });
  } catch (error) {
    console.error('Error fetching global settings:', error);
    return c.json({
      success: false,
      error: 'Erro ao buscar configurações globais',
      details: error instanceof Error ? error.message : String(error)
    }, 500);
  }
});

/**
 * PUT /organizations/:orgId/settings/global
 * Atualiza configurações globais
 */
app.put('/make-server-67caf26a/organizations/:orgId/settings/global', async (c) => {
  try {
    const { orgId } = c.req.param();
    const body = await c.req.json();
    
    const existing = await kv.get<GlobalSettings>(`global_settings:${orgId}`);
    
    const updated: GlobalSettings = {
      id: existing?.id || crypto.randomUUID(),
      organization_id: orgId,
      ...body,
      created_at: existing?.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    await kv.set(`global_settings:${orgId}`, updated);
    
    return c.json({
      success: true,
      data: updated,
      message: 'Configurações globais atualizadas com sucesso'
    });
  } catch (error) {
    console.error('Error updating global settings:', error);
    return c.json({
      success: false,
      error: 'Erro ao atualizar configurações',
      details: error instanceof Error ? error.message : String(error)
    }, 500);
  }
});

/**
 * POST /organizations/:orgId/settings/global/reset
 * Reseta configurações globais para padrão
 */
app.post('/make-server-67caf26a/organizations/:orgId/settings/global/reset', async (c) => {
  try {
    const { orgId } = c.req.param();
    
    const settings: GlobalSettings = {
      id: crypto.randomUUID(),
      organization_id: orgId,
      ...getDefaultSettings(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    } as GlobalSettings;
    
    await kv.set(`global_settings:${orgId}`, settings);
    
    return c.json({
      success: true,
      data: settings,
      message: 'Configurações resetadas para padrão'
    });
  } catch (error) {
    console.error('Error resetting global settings:', error);
    return c.json({
      success: false,
      error: 'Erro ao resetar configurações',
      details: error instanceof Error ? error.message : String(error)
    }, 500);
  }
});

// ============================================================================
// ROUTES: LISTING SETTINGS (Individual)
// ============================================================================

/**
 * GET /listings/:listingId/settings
 * Retorna configurações efetivas do listing (global + overrides)
 */
app.get('/make-server-67caf26a/listings/:listingId/settings', async (c) => {
  try {
    const { listingId } = c.req.param();
    
    // Buscar listing para obter organization_id
    const listing = await kv.get<any>(`listing:${listingId}`);
    if (!listing) {
      return c.json({
        success: false,
        error: 'Listing não encontrado'
      }, 404);
    }
    
    const effective = await getEffectiveSettings(listingId, listing.organization_id);
    
    // Buscar também as configurações individuais para saber os overrides
    const listingSettings = await kv.get<ListingSettings>(
      `listing_settings:${listingId}`
    );
    
    return c.json({
      success: true,
      data: {
        effective,
        overrides: listingSettings?.overrides || {},
        has_individual_settings: !!listingSettings
      }
    });
  } catch (error) {
    console.error('Error fetching listing settings:', error);
    return c.json({
      success: false,
      error: 'Erro ao buscar configurações',
      details: error instanceof Error ? error.message : String(error)
    }, 500);
  }
});

/**
 * PUT /listings/:listingId/settings
 * Atualiza configurações individuais do listing
 */
app.put('/make-server-67caf26a/listings/:listingId/settings', async (c) => {
  try {
    const { listingId } = c.req.param();
    const body = await c.req.json();
    
    // Buscar listing
    const listing = await kv.get<any>(`listing:${listingId}`);
    if (!listing) {
      return c.json({
        success: false,
        error: 'Listing não encontrado'
      }, 404);
    }
    
    const existing = await kv.get<ListingSettings>(
      `listing_settings:${listingId}`
    );
    
    const updated: ListingSettings = {
      id: existing?.id || crypto.randomUUID(),
      listing_id: listingId,
      organization_id: listing.organization_id,
      overrides: body.overrides || existing?.overrides || {
        cancellation_policy: false,
        checkin_checkout: false,
        security_deposit: false,
        minimum_nights: false,
        advance_booking: false,
        additional_fees: false,
        house_rules: false,
        communication: false
      },
      ...body,
      created_at: existing?.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    await kv.set(`listing_settings:${listingId}`, updated);
    
    return c.json({
      success: true,
      data: updated,
      message: 'Configurações do listing atualizadas'
    });
  } catch (error) {
    console.error('Error updating listing settings:', error);
    return c.json({
      success: false,
      error: 'Erro ao atualizar configurações',
      details: error instanceof Error ? error.message : String(error)
    }, 500);
  }
});

/**
 * POST /listings/:listingId/settings/reset
 * Remove overrides e volta a usar configurações globais
 */
app.post('/make-server-67caf26a/listings/:listingId/settings/reset', async (c) => {
  try {
    const { listingId } = c.req.param();
    
    await kv.del(`listing_settings:${listingId}`);
    
    return c.json({
      success: true,
      message: 'Configurações resetadas. Agora usa configurações globais.'
    });
  } catch (error) {
    console.error('Error resetting listing settings:', error);
    return c.json({
      success: false,
      error: 'Erro ao resetar configurações',
      details: error instanceof Error ? error.message : String(error)
    }, 500);
  }
});

/**
 * POST /listings/:listingId/settings/toggle-override
 * Ativa/desativa override de uma seção específica
 */
app.post('/make-server-67caf26a/listings/:listingId/settings/toggle-override', async (c) => {
  try {
    const { listingId } = c.req.param();
    const { section, enabled } = await c.req.json();
    
    if (!section) {
      return c.json({
        success: false,
        error: 'Seção é obrigatória'
      }, 400);
    }
    
    // Buscar listing
    const listing = await kv.get<any>(`listing:${listingId}`);
    if (!listing) {
      return c.json({
        success: false,
        error: 'Listing não encontrado'
      }, 404);
    }
    
    let settings = await kv.get<ListingSettings>(
      `listing_settings:${listingId}`
    );
    
    if (!settings) {
      // Criar se não existir
      settings = {
        id: crypto.randomUUID(),
        listing_id: listingId,
        organization_id: listing.organization_id,
        overrides: {
          cancellation_policy: false,
          checkin_checkout: false,
          security_deposit: false,
          minimum_nights: false,
          advance_booking: false,
          additional_fees: false,
          house_rules: false,
          communication: false
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    }
    
    // Toggle override
    settings.overrides[section] = enabled;
    settings.updated_at = new Date().toISOString();
    
    await kv.set(`listing_settings:${listingId}`, settings);
    
    return c.json({
      success: true,
      data: settings,
      message: `Override de ${section} ${enabled ? 'ativado' : 'desativado'}`
    });
  } catch (error) {
    console.error('Error toggling override:', error);
    return c.json({
      success: false,
      error: 'Erro ao alternar override',
      details: error instanceof Error ? error.message : String(error)
    }, 500);
  }
});

// ============================================================================
// ROUTES: BATCH OPERATIONS
// ============================================================================

/**
 * POST /organizations/:orgId/settings/apply-to-all
 * Aplica configurações globais a todos os listings (remove overrides)
 */
app.post('/make-server-67caf26a/organizations/:orgId/settings/apply-to-all', async (c) => {
  try {
    const { orgId } = c.req.param();
    
    // Buscar todos os listings da organização
    const allListings = await kv.getByPrefix<any>('listing:');
    const orgListings = allListings.filter(l => l.organization_id === orgId);
    
    // Remover todas as configurações individuais
    for (const listing of orgListings) {
      await kv.del(`listing_settings:${listing.id}`);
    }
    
    return c.json({
      success: true,
      message: `Configurações globais aplicadas a ${orgListings.length} listings`,
      data: {
        affected_listings: orgListings.length
      }
    });
  } catch (error) {
    console.error('Error applying settings to all:', error);
    return c.json({
      success: false,
      error: 'Erro ao aplicar configurações',
      details: error instanceof Error ? error.message : String(error)
    }, 500);
  }
});

/**
 * POST /organizations/:orgId/settings/apply-section-to-all
 * Aplica uma seção específica das configurações globais a todos os listings
 */
app.post('/make-server-67caf26a/organizations/:orgId/settings/apply-section-to-all', async (c) => {
  try {
    const { orgId } = c.req.param();
    const { section } = await c.req.json();
    
    if (!section) {
      return c.json({
        success: false,
        error: 'Seção é obrigatória'
      }, 400);
    }
    
    // Buscar todos os listings da organização
    const allListings = await kv.getByPrefix<any>('listing:');
    const orgListings = allListings.filter(l => l.organization_id === orgId);
    
    let updated = 0;
    
    // Desativar override da seção em todos os listings
    for (const listing of orgListings) {
      const settings = await kv.get<ListingSettings>(
        `listing_settings:${listing.id}`
      );
      
      if (settings && settings.overrides[section]) {
        settings.overrides[section] = false;
        settings[section] = undefined;
        settings.updated_at = new Date().toISOString();
        
        await kv.set(`listing_settings:${listing.id}`, settings);
        updated++;
      }
    }
    
    return c.json({
      success: true,
      message: `Seção "${section}" aplicada a ${updated} listings`,
      data: {
        affected_listings: updated
      }
    });
  } catch (error) {
    console.error('Error applying section to all:', error);
    return c.json({
      success: false,
      error: 'Erro ao aplicar seção',
      details: error instanceof Error ? error.message : String(error)
    }, 500);
  }
});

// ============================================================================
// EXPORT
// ============================================================================

export default app;
