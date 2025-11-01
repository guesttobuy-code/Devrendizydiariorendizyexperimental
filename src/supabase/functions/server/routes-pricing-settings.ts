// ============================================================================
// ROUTES: PRICING SETTINGS (CONFIGURAÇÕES DE PREÇOS) - v1.0.81
// ============================================================================
// Sistema de preços derivados (hóspedes adicionais)
// Taxa de limpeza com repasse integral (não entra na comissão)
// Cálculo automático de totais de reserva
// ============================================================================

import { Hono } from 'npm:hono@4.0.2';
import { cors } from 'npm:hono/cors';
import * as kv from './kv_store.tsx';
import type {
  PricingSettings,
  UpdatePricingSettingsDTO,
  CalculateReservationDTO,
  ReservationCalculation,
  AccommodationRules,
  ApiResponse,
  Currency
} from './types.ts';

const app = new Hono();

// CORS
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Cria configurações padrão de preço para um novo listing
 */
function createDefaultPricingSettings(listingId: string, basePrice: number = 10000): PricingSettings {
  const now = new Date().toISOString();
  
  return {
    id: `pricing:${listingId}`,
    listingId,
    
    // Preço base: R$ 100/noite por padrão (10000 centavos)
    basePricePerNight: basePrice,
    
    // Hóspedes incluídos: 2 pessoas
    maxGuestsIncluded: 2,
    
    // Taxa por hóspede extra: R$ 50/noite (5000 centavos)
    extraGuestFeePerNight: 5000,
    
    // Não cobra por crianças extras por padrão
    chargeForChildren: false,
    
    // Taxa de limpeza: R$ 100 (10000 centavos)
    cleaningFee: 10000,
    
    // Taxa de limpeza é repasse integral (NÃO entra na comissão)
    cleaningFeeIsPassThrough: true,
    
    // Moeda padrão: BRL
    currency: 'BRL',
    
    createdAt: now,
    updatedAt: now
  };
}

/**
 * Calcula o total de uma reserva baseado nas configurações de preço
 */
export async function calculateReservationTotal(
  listingId: string,
  nights: number,
  guests: number,
  hasPets: boolean = false
): Promise<ReservationCalculation> {
  // Buscar configurações de preço
  let pricingSettings = await kv.get<PricingSettings>(`pricing:${listingId}`);
  
  if (!pricingSettings) {
    // Criar padrão se não existir
    const listing = await kv.get<any>(`listing:${listingId}`);
    const basePrice = listing?.pricing?.basePrice || 10000;
    pricingSettings = createDefaultPricingSettings(listingId, basePrice);
    await kv.set(`pricing:${listingId}`, pricingSettings);
  }
  
  // 1. Calcular diárias base
  const baseTotal = pricingSettings.basePricePerNight * nights;
  
  // 2. Calcular hóspedes extras
  const extraGuests = Math.max(0, guests - pricingSettings.maxGuestsIncluded);
  const extraGuestsTotal = extraGuests * pricingSettings.extraGuestFeePerNight * nights;
  
  // 3. Taxa de limpeza (1x)
  const cleaningFee = pricingSettings.cleaningFee;
  
  // 4. Taxa de pet (se houver)
  let petFee = 0;
  if (hasPets) {
    const rules = await kv.get<AccommodationRules>(`rules:${listingId}`);
    if (rules?.allowsPets === 'yes_chargeable' && rules.petFee) {
      petFee = rules.petFee; // Cobrado 1x por reserva
    }
  }
  
  // 5. Total final
  const grandTotal = baseTotal + extraGuestsTotal + cleaningFee + petFee;
  
  // 6. Base para comissão (SEM taxa de limpeza se for repasse)
  const commissionBase = pricingSettings.cleaningFeeIsPassThrough
    ? baseTotal + extraGuestsTotal + petFee
    : grandTotal;
  
  return {
    baseTotal,
    extraGuestsTotal,
    cleaningFee,
    grandTotal,
    commissionBase
  };
}

// ============================================================================
// ROUTES
// ============================================================================

/**
 * GET /make-server-67caf26a/listings/:listingId/pricing-settings
 * Busca as configurações de preço de um listing
 */
app.get('/make-server-67caf26a/listings/:listingId/pricing-settings', async (c) => {
  try {
    const listingId = c.req.param('listingId');
    
    let pricingSettings = await kv.get<PricingSettings>(`pricing:${listingId}`);
    
    // Se não existir, criar padrão
    if (!pricingSettings) {
      const listing = await kv.get<any>(`listing:${listingId}`);
      const basePrice = listing?.pricing?.basePrice || 10000;
      pricingSettings = createDefaultPricingSettings(listingId, basePrice);
      await kv.set(`pricing:${listingId}`, pricingSettings);
    }
    
    return c.json<ApiResponse<PricingSettings>>({
      success: true,
      data: pricingSettings,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching pricing settings:', error);
    return c.json<ApiResponse>({
      success: false,
      error: 'Failed to fetch pricing settings',
      timestamp: new Date().toISOString()
    }, 500);
  }
});

/**
 * PUT /make-server-67caf26a/listings/:listingId/pricing-settings
 * Atualiza as configurações de preço de um listing
 */
app.put('/make-server-67caf26a/listings/:listingId/pricing-settings', async (c) => {
  try {
    const listingId = c.req.param('listingId');
    const body: UpdatePricingSettingsDTO = await c.req.json();
    
    // Validações
    if (body.basePricePerNight !== undefined && body.basePricePerNight < 0) {
      return c.json<ApiResponse>({
        success: false,
        error: 'Base price cannot be negative',
        timestamp: new Date().toISOString()
      }, 400);
    }
    
    if (body.maxGuestsIncluded !== undefined && body.maxGuestsIncluded < 1) {
      return c.json<ApiResponse>({
        success: false,
        error: 'Max guests included must be at least 1',
        timestamp: new Date().toISOString()
      }, 400);
    }
    
    // Buscar settings existentes
    let existingSettings = await kv.get<PricingSettings>(`pricing:${listingId}`);
    
    // Se não existir, criar padrão
    if (!existingSettings) {
      const listing = await kv.get<any>(`listing:${listingId}`);
      const basePrice = listing?.pricing?.basePrice || 10000;
      existingSettings = createDefaultPricingSettings(listingId, basePrice);
    }
    
    // Atualizar
    const updatedSettings: PricingSettings = {
      ...existingSettings,
      ...body,
      updatedAt: new Date().toISOString()
    };
    
    await kv.set(`pricing:${listingId}`, updatedSettings);
    
    // Também atualizar o basePrice no listing principal
    if (body.basePricePerNight !== undefined) {
      const listing = await kv.get<any>(`listing:${listingId}`);
      if (listing) {
        await kv.set(`listing:${listingId}`, {
          ...listing,
          pricing: {
            ...listing.pricing,
            basePrice: body.basePricePerNight
          },
          updatedAt: new Date().toISOString()
        });
      }
    }
    
    return c.json<ApiResponse<PricingSettings>>({
      success: true,
      data: updatedSettings,
      message: 'Pricing settings updated successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error updating pricing settings:', error);
    return c.json<ApiResponse>({
      success: false,
      error: 'Failed to update pricing settings',
      timestamp: new Date().toISOString()
    }, 500);
  }
});

/**
 * POST /make-server-67caf26a/calculate-reservation
 * Calcula o total de uma reserva
 */
app.post('/make-server-67caf26a/calculate-reservation', async (c) => {
  try {
    const body: CalculateReservationDTO = await c.req.json();
    
    // Validações
    if (!body.listingId || !body.nights || !body.guests) {
      return c.json<ApiResponse>({
        success: false,
        error: 'listingId, nights, and guests are required',
        timestamp: new Date().toISOString()
      }, 400);
    }
    
    if (body.nights < 1 || body.guests < 1) {
      return c.json<ApiResponse>({
        success: false,
        error: 'nights and guests must be at least 1',
        timestamp: new Date().toISOString()
      }, 400);
    }
    
    // Calcular
    const calculation = await calculateReservationTotal(
      body.listingId,
      body.nights,
      body.guests,
      body.hasPets || false
    );
    
    return c.json<ApiResponse<ReservationCalculation>>({
      success: true,
      data: calculation,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error calculating reservation:', error);
    return c.json<ApiResponse>({
      success: false,
      error: 'Failed to calculate reservation total',
      timestamp: new Date().toISOString()
    }, 500);
  }
});

/**
 * POST /make-server-67caf26a/listings/:listingId/pricing-settings/reset
 * Reseta as configurações de preço para o padrão
 */
app.post('/make-server-67caf26a/listings/:listingId/pricing-settings/reset', async (c) => {
  try {
    const listingId = c.req.param('listingId');
    
    // Buscar preço base do listing
    const listing = await kv.get<any>(`listing:${listingId}`);
    const basePrice = listing?.pricing?.basePrice || 10000;
    
    const defaultSettings = createDefaultPricingSettings(listingId, basePrice);
    await kv.set(`pricing:${listingId}`, defaultSettings);
    
    return c.json<ApiResponse<PricingSettings>>({
      success: true,
      data: defaultSettings,
      message: 'Pricing settings reset to default successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error resetting pricing settings:', error);
    return c.json<ApiResponse>({
      success: false,
      error: 'Failed to reset pricing settings',
      timestamp: new Date().toISOString()
    }, 500);
  }
});

export default app;
