// ============================================================================
// ROUTES: SEASONAL PRICING (PRECIFICAÇÃO INDIVIDUAL DE TEMPORADA)
// ============================================================================
// Sistema completo de sazonalidade com:
// - Períodos sazonais (alta/baixa temporada)
// - Preços por dia da semana
// - Datas especiais (feriados, eventos)
// - Descontos por permanência (semanal/mensal)
// - Modo Global vs Individual
// ============================================================================

import { Hono } from 'npm:hono@4.0.2';
import { cors } from 'npm:hono/cors';
import * as kv from './kv_store.tsx';
import type { ApiResponse } from './types.ts';

const app = new Hono();

// CORS
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

// ============================================================================
// TYPES
// ============================================================================

interface SeasonalPeriod {
  id: string;
  name: string;
  startDate: string; // ISO date
  endDate: string;   // ISO date
  pricePerNight: number; // em centavos
  minNights: number;
  color: string;
  icon: string;
}

interface WeekdayPricing {
  monday: number;
  tuesday: number;
  wednesday: number;
  thursday: number;
  friday: number;
  saturday: number;
  sunday: number;
}

interface SpecialDate {
  id: string;
  name: string;
  date: string; // ISO date
  pricePerNight: number; // em centavos
  minNights: number;
}

interface SeasonalPricingSettings {
  id: string;
  listingId: string;
  
  // Modo
  pricingMode: 'global' | 'individual';
  
  // Preço Base
  basePricePerNight: number; // em centavos
  currency: string;
  
  // Descontos por Permanência
  enableStayDiscounts: boolean;
  weeklyDiscount: number; // Percentual (0-100)
  monthlyDiscount: number; // Percentual (0-100)
  
  // Períodos Sazonais
  enableSeasonalPricing: boolean;
  seasonalPeriods: SeasonalPeriod[];
  
  // Preços por Dia da Semana
  enableWeekdayPricing: boolean;
  weekdayPricing: WeekdayPricing;
  
  // Datas Especiais
  enableSpecialDates: boolean;
  specialDates: SpecialDate[];
  
  // Metadata
  createdAt: string;
  updatedAt: string;
}

interface UpdateSeasonalPricingDTO {
  pricingMode?: 'global' | 'individual';
  basePricePerNight?: number;
  currency?: string;
  enableStayDiscounts?: boolean;
  weeklyDiscount?: number;
  monthlyDiscount?: number;
  enableSeasonalPricing?: boolean;
  seasonalPeriods?: SeasonalPeriod[];
  enableWeekdayPricing?: boolean;
  weekdayPricing?: WeekdayPricing;
  enableSpecialDates?: boolean;
  specialDates?: SpecialDate[];
}

interface CalculateSeasonalPriceDTO {
  listingId: string;
  checkIn: string; // ISO date
  checkOut: string; // ISO date
  guests: number;
}

interface DailyPrice {
  date: string;
  price: number;
  source: 'base' | 'seasonal' | 'weekday' | 'special';
  sourceName?: string;
}

interface SeasonalPriceCalculation {
  checkIn: string;
  checkOut: string;
  nights: number;
  dailyPrices: DailyPrice[];
  subtotal: number;
  weeklyDiscount: number;
  monthlyDiscount: number;
  grandTotal: number;
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Cria configurações padrão de precificação sazonal
 */
function createDefaultSeasonalPricing(listingId: string, basePrice: number = 10000): SeasonalPricingSettings {
  const now = new Date().toISOString();
  
  return {
    id: `seasonal-pricing:${listingId}`,
    listingId,
    pricingMode: 'global',
    basePricePerNight: basePrice,
    currency: 'BRL',
    enableStayDiscounts: false,
    weeklyDiscount: 0,
    monthlyDiscount: 0,
    enableSeasonalPricing: false,
    seasonalPeriods: [],
    enableWeekdayPricing: false,
    weekdayPricing: {
      monday: basePrice,
      tuesday: basePrice,
      wednesday: basePrice,
      thursday: basePrice,
      friday: basePrice,
      saturday: basePrice,
      sunday: basePrice,
    },
    enableSpecialDates: false,
    specialDates: [],
    createdAt: now,
    updatedAt: now
  };
}

/**
 * Verifica se uma data está dentro de um período sazonal
 */
function isDateInSeasonalPeriod(date: Date, period: SeasonalPeriod): boolean {
  const dateTime = date.getTime();
  const startTime = new Date(period.startDate).getTime();
  const endTime = new Date(period.endDate).getTime();
  
  return dateTime >= startTime && dateTime <= endTime;
}

/**
 * Obtém o dia da semana como chave do WeekdayPricing
 */
function getWeekdayKey(date: Date): keyof WeekdayPricing {
  const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, etc
  const weekdayKeys: (keyof WeekdayPricing)[] = [
    'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'
  ];
  return weekdayKeys[dayOfWeek];
}

/**
 * Calcula o preço para uma data específica
 */
function calculateDailyPrice(
  date: Date,
  settings: SeasonalPricingSettings
): DailyPrice {
  const dateStr = date.toISOString().split('T')[0];
  
  // 1. Verificar se é data especial (maior prioridade)
  if (settings.enableSpecialDates) {
    const specialDate = settings.specialDates.find(sd => sd.date === dateStr);
    if (specialDate) {
      return {
        date: dateStr,
        price: specialDate.pricePerNight,
        source: 'special',
        sourceName: specialDate.name
      };
    }
  }
  
  // 2. Verificar se está em período sazonal
  if (settings.enableSeasonalPricing) {
    const seasonalPeriod = settings.seasonalPeriods.find(period => 
      isDateInSeasonalPeriod(date, period)
    );
    if (seasonalPeriod) {
      return {
        date: dateStr,
        price: seasonalPeriod.pricePerNight,
        source: 'seasonal',
        sourceName: seasonalPeriod.name
      };
    }
  }
  
  // 3. Verificar preço por dia da semana
  if (settings.enableWeekdayPricing) {
    const weekdayKey = getWeekdayKey(date);
    return {
      date: dateStr,
      price: settings.weekdayPricing[weekdayKey],
      source: 'weekday',
      sourceName: weekdayKey
    };
  }
  
  // 4. Usar preço base (AGENDA INFINITA - sempre tem preço)
  return {
    date: dateStr,
    price: settings.basePricePerNight,
    source: 'base'
  };
}

/**
 * Calcula o total de uma reserva considerando sazonalidade
 */
export async function calculateSeasonalPrice(
  dto: CalculateSeasonalPriceDTO
): Promise<SeasonalPriceCalculation> {
  // Buscar configurações
  let settings = await kv.get<SeasonalPricingSettings>(`seasonal-pricing:${dto.listingId}`);
  
  if (!settings) {
    // Criar padrão se não existir
    const listing = await kv.get<any>(`listing:${dto.listingId}`);
    const basePrice = listing?.pricing?.basePrice || 10000;
    settings = createDefaultSeasonalPricing(dto.listingId, basePrice);
    await kv.set(`seasonal-pricing:${dto.listingId}`, settings);
  }
  
  // Converter datas
  const checkInDate = new Date(dto.checkIn);
  const checkOutDate = new Date(dto.checkOut);
  
  // Calcular número de noites
  const msPerDay = 1000 * 60 * 60 * 24;
  const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / msPerDay);
  
  // Calcular preço diário para cada noite
  const dailyPrices: DailyPrice[] = [];
  let subtotal = 0;
  
  for (let i = 0; i < nights; i++) {
    const currentDate = new Date(checkInDate);
    currentDate.setDate(currentDate.getDate() + i);
    
    const dailyPrice = calculateDailyPrice(currentDate, settings);
    dailyPrices.push(dailyPrice);
    subtotal += dailyPrice.price;
  }
  
  // Aplicar descontos por permanência
  let weeklyDiscount = 0;
  let monthlyDiscount = 0;
  
  if (settings.enableStayDiscounts) {
    // Desconto mensal tem prioridade sobre semanal
    if (nights >= 30 && settings.monthlyDiscount > 0) {
      monthlyDiscount = Math.round(subtotal * (settings.monthlyDiscount / 100));
    } else if (nights >= 7 && settings.weeklyDiscount > 0) {
      weeklyDiscount = Math.round(subtotal * (settings.weeklyDiscount / 100));
    }
  }
  
  const grandTotal = subtotal - weeklyDiscount - monthlyDiscount;
  
  return {
    checkIn: dto.checkIn,
    checkOut: dto.checkOut,
    nights,
    dailyPrices,
    subtotal,
    weeklyDiscount,
    monthlyDiscount,
    grandTotal
  };
}

// ============================================================================
// ROUTES
// ============================================================================

/**
 * GET /make-server-67caf26a/listings/:listingId/seasonal-pricing
 * Busca as configurações de precificação sazonal de um listing
 */
app.get('/make-server-67caf26a/listings/:listingId/seasonal-pricing', async (c) => {
  try {
    const listingId = c.req.param('listingId');
    
    let settings = await kv.get<SeasonalPricingSettings>(`seasonal-pricing:${listingId}`);
    
    // Se não existir, criar padrão
    if (!settings) {
      const listing = await kv.get<any>(`listing:${listingId}`);
      const basePrice = listing?.pricing?.basePrice || 10000;
      settings = createDefaultSeasonalPricing(listingId, basePrice);
      await kv.set(`seasonal-pricing:${listingId}`, settings);
    }
    
    return c.json<ApiResponse<SeasonalPricingSettings>>({
      success: true,
      data: settings,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching seasonal pricing:', error);
    return c.json<ApiResponse>({
      success: false,
      error: 'Failed to fetch seasonal pricing settings',
      timestamp: new Date().toISOString()
    }, 500);
  }
});

/**
 * PUT /make-server-67caf26a/listings/:listingId/seasonal-pricing
 * Atualiza as configurações de precificação sazonal
 */
app.put('/make-server-67caf26a/listings/:listingId/seasonal-pricing', async (c) => {
  try {
    const listingId = c.req.param('listingId');
    const body: UpdateSeasonalPricingDTO = await c.req.json();
    
    // Validações
    if (body.basePricePerNight !== undefined && body.basePricePerNight < 0) {
      return c.json<ApiResponse>({
        success: false,
        error: 'Base price cannot be negative',
        timestamp: new Date().toISOString()
      }, 400);
    }
    
    if (body.weeklyDiscount !== undefined && (body.weeklyDiscount < 0 || body.weeklyDiscount > 100)) {
      return c.json<ApiResponse>({
        success: false,
        error: 'Weekly discount must be between 0 and 100',
        timestamp: new Date().toISOString()
      }, 400);
    }
    
    if (body.monthlyDiscount !== undefined && (body.monthlyDiscount < 0 || body.monthlyDiscount > 100)) {
      return c.json<ApiResponse>({
        success: false,
        error: 'Monthly discount must be between 0 and 100',
        timestamp: new Date().toISOString()
      }, 400);
    }
    
    // Buscar settings existentes
    let existingSettings = await kv.get<SeasonalPricingSettings>(`seasonal-pricing:${listingId}`);
    
    // Se não existir, criar padrão
    if (!existingSettings) {
      const listing = await kv.get<any>(`listing:${listingId}`);
      const basePrice = listing?.pricing?.basePrice || 10000;
      existingSettings = createDefaultSeasonalPricing(listingId, basePrice);
    }
    
    // Atualizar
    const updatedSettings: SeasonalPricingSettings = {
      ...existingSettings,
      ...body,
      updatedAt: new Date().toISOString()
    };
    
    await kv.set(`seasonal-pricing:${listingId}`, updatedSettings);
    
    return c.json<ApiResponse<SeasonalPricingSettings>>({
      success: true,
      data: updatedSettings,
      message: 'Seasonal pricing settings updated successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error updating seasonal pricing:', error);
    return c.json<ApiResponse>({
      success: false,
      error: 'Failed to update seasonal pricing settings',
      timestamp: new Date().toISOString()
    }, 500);
  }
});

/**
 * POST /make-server-67caf26a/calculate-seasonal-price
 * Calcula o preço total considerando sazonalidade
 */
app.post('/make-server-67caf26a/calculate-seasonal-price', async (c) => {
  try {
    const body: CalculateSeasonalPriceDTO = await c.req.json();
    
    // Validações
    if (!body.listingId || !body.checkIn || !body.checkOut || !body.guests) {
      return c.json<ApiResponse>({
        success: false,
        error: 'listingId, checkIn, checkOut, and guests are required',
        timestamp: new Date().toISOString()
      }, 400);
    }
    
    if (body.guests < 1) {
      return c.json<ApiResponse>({
        success: false,
        error: 'guests must be at least 1',
        timestamp: new Date().toISOString()
      }, 400);
    }
    
    // Calcular
    const calculation = await calculateSeasonalPrice(body);
    
    return c.json<ApiResponse<SeasonalPriceCalculation>>({
      success: true,
      data: calculation,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error calculating seasonal price:', error);
    return c.json<ApiResponse>({
      success: false,
      error: 'Failed to calculate seasonal price',
      timestamp: new Date().toISOString()
    }, 500);
  }
});

/**
 * POST /make-server-67caf26a/listings/:listingId/seasonal-pricing/reset
 * Reseta as configurações de precificação sazonal para o padrão
 */
app.post('/make-server-67caf26a/listings/:listingId/seasonal-pricing/reset', async (c) => {
  try {
    const listingId = c.req.param('listingId');
    
    // Buscar preço base do listing
    const listing = await kv.get<any>(`listing:${listingId}`);
    const basePrice = listing?.pricing?.basePrice || 10000;
    
    const defaultSettings = createDefaultSeasonalPricing(listingId, basePrice);
    await kv.set(`seasonal-pricing:${listingId}`, defaultSettings);
    
    return c.json<ApiResponse<SeasonalPricingSettings>>({
      success: true,
      data: defaultSettings,
      message: 'Seasonal pricing settings reset to default successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error resetting seasonal pricing:', error);
    return c.json<ApiResponse>({
      success: false,
      error: 'Failed to reset seasonal pricing settings',
      timestamp: new Date().toISOString()
    }, 500);
  }
});

/**
 * DELETE /make-server-67caf26a/listings/:listingId/seasonal-pricing/periods/:periodId
 * Remove um período sazonal
 */
app.delete('/make-server-67caf26a/listings/:listingId/seasonal-pricing/periods/:periodId', async (c) => {
  try {
    const listingId = c.req.param('listingId');
    const periodId = c.req.param('periodId');
    
    const settings = await kv.get<SeasonalPricingSettings>(`seasonal-pricing:${listingId}`);
    
    if (!settings) {
      return c.json<ApiResponse>({
        success: false,
        error: 'Seasonal pricing settings not found',
        timestamp: new Date().toISOString()
      }, 404);
    }
    
    // Filtrar período
    const updatedPeriods = settings.seasonalPeriods.filter(p => p.id !== periodId);
    
    const updatedSettings: SeasonalPricingSettings = {
      ...settings,
      seasonalPeriods: updatedPeriods,
      updatedAt: new Date().toISOString()
    };
    
    await kv.set(`seasonal-pricing:${listingId}`, updatedSettings);
    
    return c.json<ApiResponse<SeasonalPricingSettings>>({
      success: true,
      data: updatedSettings,
      message: 'Seasonal period removed successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error removing seasonal period:', error);
    return c.json<ApiResponse>({
      success: false,
      error: 'Failed to remove seasonal period',
      timestamp: new Date().toISOString()
    }, 500);
  }
});

/**
 * DELETE /make-server-67caf26a/listings/:listingId/seasonal-pricing/special-dates/:dateId
 * Remove uma data especial
 */
app.delete('/make-server-67caf26a/listings/:listingId/seasonal-pricing/special-dates/:dateId', async (c) => {
  try {
    const listingId = c.req.param('listingId');
    const dateId = c.req.param('dateId');
    
    const settings = await kv.get<SeasonalPricingSettings>(`seasonal-pricing:${listingId}`);
    
    if (!settings) {
      return c.json<ApiResponse>({
        success: false,
        error: 'Seasonal pricing settings not found',
        timestamp: new Date().toISOString()
      }, 404);
    }
    
    // Filtrar data especial
    const updatedDates = settings.specialDates.filter(d => d.id !== dateId);
    
    const updatedSettings: SeasonalPricingSettings = {
      ...settings,
      specialDates: updatedDates,
      updatedAt: new Date().toISOString()
    };
    
    await kv.set(`seasonal-pricing:${listingId}`, updatedSettings);
    
    return c.json<ApiResponse<SeasonalPricingSettings>>({
      success: true,
      data: updatedSettings,
      message: 'Special date removed successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error removing special date:', error);
    return c.json<ApiResponse>({
      success: false,
      error: 'Failed to remove special date',
      timestamp: new Date().toISOString()
    }, 500);
  }
});

/**
 * GET /make-server-67caf26a/listings/:listingId/seasonal-pricing/date/:date
 * Retorna o preço para uma data específica (AGENDA INFINITA)
 * Sempre retorna um preço, mesmo para datas futuras distantes
 */
app.get('/make-server-67caf26a/listings/:listingId/seasonal-pricing/date/:date', async (c) => {
  try {
    const listingId = c.req.param('listingId');
    const dateParam = c.req.param('date');
    
    // Buscar configurações
    let settings = await kv.get<SeasonalPricingSettings>(`seasonal-pricing:${listingId}`);
    
    if (!settings) {
      // Criar padrão se não existir
      const listing = await kv.get<any>(`listing:${listingId}`);
      const basePrice = listing?.pricing?.basePrice || 10000;
      settings = createDefaultSeasonalPricing(listingId, basePrice);
      await kv.set(`seasonal-pricing:${listingId}`, settings);
    }
    
    // Calcular preço para a data específica
    const date = new Date(dateParam);
    const dailyPrice = calculateDailyPrice(date, settings);
    
    return c.json<ApiResponse<DailyPrice>>({
      success: true,
      data: dailyPrice,
      message: 'Price calculated for specific date (infinite calendar)',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error getting price for date:', error);
    return c.json<ApiResponse>({
      success: false,
      error: 'Failed to get price for date',
      timestamp: new Date().toISOString()
    }, 500);
  }
});

/**
 * POST /make-server-67caf26a/listings/:listingId/seasonal-pricing/generate-calendar
 * Gera calendário de preços para período (para envio a OTAs)
 * AGENDA INFINITA: Sempre gera preços, nunca vazio
 */
app.post('/make-server-67caf26a/listings/:listingId/seasonal-pricing/generate-calendar', async (c) => {
  try {
    const listingId = c.req.param('listingId');
    const body = await c.req.json();
    
    const startDate = body.startDate || new Date().toISOString().split('T')[0];
    const daysAhead = body.daysAhead || 365; // Padrão: 1 ano
    
    // Buscar configurações
    let settings = await kv.get<SeasonalPricingSettings>(`seasonal-pricing:${listingId}`);
    
    if (!settings) {
      const listing = await kv.get<any>(`listing:${listingId}`);
      const basePrice = listing?.pricing?.basePrice || 10000;
      settings = createDefaultSeasonalPricing(listingId, basePrice);
      await kv.set(`seasonal-pricing:${listingId}`, settings);
    }
    
    // Gerar preços para todos os dias
    const calendar: DailyPrice[] = [];
    const start = new Date(startDate);
    
    for (let i = 0; i < daysAhead; i++) {
      const currentDate = new Date(start);
      currentDate.setDate(currentDate.getDate() + i);
      
      const dailyPrice = calculateDailyPrice(currentDate, settings);
      calendar.push(dailyPrice);
    }
    
    return c.json<ApiResponse<{ calendar: DailyPrice[]; totalDays: number }>>({
      success: true,
      data: {
        calendar,
        totalDays: calendar.length
      },
      message: `Generated infinite calendar with ${calendar.length} days of pricing`,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error generating calendar:', error);
    return c.json<ApiResponse>({
      success: false,
      error: 'Failed to generate calendar',
      timestamp: new Date().toISOString()
    }, 500);
  }
});

export default app;