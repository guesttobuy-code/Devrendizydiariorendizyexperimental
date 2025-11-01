// ============================================================================
// ROUTES: ACCOMMODATION RULES (REGRAS DA ACOMODAÇÃO) - v1.0.80
// ============================================================================
// Sistema de regras completo: crianças, bebês, pets, eventos, silêncio
// Fluxo condicional: pets com cobrança → taxa aparece automaticamente
// Multilíngue: PT, EN, ES
// ============================================================================

import { Hono } from 'npm:hono@4.0.2';
import { cors } from 'npm:hono/cors';
import * as kv from './kv_store.tsx';
import type {
  AccommodationRules,
  PetsPolicy,
  SmokingPolicy,
  EventsPolicy,
  UpdateAccommodationRulesDTO,
  ApiResponse
} from './types.ts';

const app = new Hono();

// CORS
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Cria regras padrão para um novo listing
 */
function createDefaultRules(listingId: string, maxAdults: number = 2): AccommodationRules {
  const now = new Date().toISOString();
  
  return {
    id: `rules:${listingId}`,
    listingId,
    
    // OCUPAÇÃO
    maxAdults,
    minAge: 18,
    
    // CRIANÇAS
    acceptsChildren: true,
    maxChildren: 0,
    childrenRules: undefined,
    
    // BEBÊS
    acceptsBabies: true,
    maxBabies: 0,
    providesCribs: false,
    maxCribs: 0,
    babiesRules: undefined,
    
    // PETS
    allowsPets: 'no',
    petFee: undefined,
    maxPets: undefined,
    petRules: undefined,
    
    // OUTRAS REGRAS
    smokingAllowed: 'no',
    eventsAllowed: 'no',
    quietHours: false,
    quietHoursStart: undefined,
    quietHoursEnd: undefined,
    
    additionalRules: undefined,
    
    createdAt: now,
    updatedAt: now
  };
}

/**
 * Valida se o pet fee deve existir baseado na política de pets
 */
function validatePetFee(rules: Partial<AccommodationRules>): string | null {
  // Se allowsPets é 'yes_chargeable', DEVE ter petFee
  if (rules.allowsPets === 'yes_chargeable' && !rules.petFee) {
    return 'Pet fee is required when pets policy is "yes_chargeable"';
  }
  
  // Se allowsPets não é 'yes_chargeable', NÃO deve ter petFee
  if (rules.allowsPets !== 'yes_chargeable' && rules.petFee) {
    return 'Pet fee can only be set when pets policy is "yes_chargeable"';
  }
  
  return null;
}

// ============================================================================
// ROUTES
// ============================================================================

/**
 * GET /make-server-67caf26a/listings/:listingId/rules
 * Busca as regras de um listing
 */
app.get('/make-server-67caf26a/listings/:listingId/rules', async (c) => {
  try {
    const listingId = c.req.param('listingId');
    
    let rules = await kv.get<AccommodationRules>(`rules:${listingId}`);
    
    // Se não existir, criar regras padrão
    if (!rules) {
      // Buscar max_guests do listing
      const listing = await kv.get<any>(`listing:${listingId}`);
      const maxAdults = listing?.maxGuests || 2;
      
      rules = createDefaultRules(listingId, maxAdults);
      await kv.set(`rules:${listingId}`, rules);
    }
    
    return c.json<ApiResponse<AccommodationRules>>({
      success: true,
      data: rules,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching rules:', error);
    return c.json<ApiResponse>({
      success: false,
      error: 'Failed to fetch accommodation rules',
      timestamp: new Date().toISOString()
    }, 500);
  }
});

/**
 * PUT /make-server-67caf26a/listings/:listingId/rules
 * Atualiza as regras de um listing
 */
app.put('/make-server-67caf26a/listings/:listingId/rules', async (c) => {
  try {
    const listingId = c.req.param('listingId');
    const body: UpdateAccommodationRulesDTO = await c.req.json();
    
    // Validar pet fee se fornecido
    const petFeeError = validatePetFee(body);
    if (petFeeError) {
      return c.json<ApiResponse>({
        success: false,
        error: petFeeError,
        timestamp: new Date().toISOString()
      }, 400);
    }
    
    // Buscar regras existentes
    let existingRules = await kv.get<AccommodationRules>(`rules:${listingId}`);
    
    // Se não existir, criar padrão
    if (!existingRules) {
      const listing = await kv.get<any>(`listing:${listingId}`);
      const maxAdults = listing?.maxGuests || 2;
      existingRules = createDefaultRules(listingId, maxAdults);
    }
    
    // Limpar petFee se allowsPets mudou para algo diferente de 'yes_chargeable'
    let updatedBody = { ...body };
    if (body.allowsPets && body.allowsPets !== 'yes_chargeable') {
      updatedBody.petFee = undefined;
      updatedBody.maxPets = undefined;
    }
    
    // Atualizar
    const updatedRules: AccommodationRules = {
      ...existingRules,
      ...updatedBody,
      updatedAt: new Date().toISOString()
    };
    
    await kv.set(`rules:${listingId}`, updatedRules);
    
    return c.json<ApiResponse<AccommodationRules>>({
      success: true,
      data: updatedRules,
      message: 'Accommodation rules updated successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error updating rules:', error);
    return c.json<ApiResponse>({
      success: false,
      error: 'Failed to update accommodation rules',
      timestamp: new Date().toISOString()
    }, 500);
  }
});

/**
 * POST /make-server-67caf26a/listings/:listingId/rules/reset
 * Reseta as regras para o padrão
 */
app.post('/make-server-67caf26a/listings/:listingId/rules/reset', async (c) => {
  try {
    const listingId = c.req.param('listingId');
    
    // Buscar max_guests do listing
    const listing = await kv.get<any>(`listing:${listingId}`);
    const maxAdults = listing?.maxGuests || 2;
    
    const defaultRules = createDefaultRules(listingId, maxAdults);
    await kv.set(`rules:${listingId}`, defaultRules);
    
    return c.json<ApiResponse<AccommodationRules>>({
      success: true,
      data: defaultRules,
      message: 'Rules reset to default successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error resetting rules:', error);
    return c.json<ApiResponse>({
      success: false,
      error: 'Failed to reset rules',
      timestamp: new Date().toISOString()
    }, 500);
  }
});

export default app;
