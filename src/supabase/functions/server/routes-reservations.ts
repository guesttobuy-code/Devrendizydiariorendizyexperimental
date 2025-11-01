// ============================================================================
// ROTAS DE RESERVAS
// ============================================================================

import type { Context } from 'npm:hono';
import * as kv from './kv_store.tsx';
import type {
  Reservation,
  Property,
  CreateReservationDTO,
  UpdateReservationDTO,
  ReservationFilters,
  AvailabilityCheck,
  AvailabilityResponse,
} from './types.ts';
import {
  generateReservationId,
  getCurrentDateTime,
  calculateNights,
  validateDateRange,
  datesOverlap,
  successResponse,
  errorResponse,
  notFoundResponse,
  validationErrorResponse,
  applyDiscount,
  logInfo,
  logError,
} from './utils.ts';

// ============================================================================
// LISTAR TODAS AS RESERVAS
// ============================================================================

export async function listReservations(c: Context) {
  try {
    logInfo('Listing all reservations');

    // Buscar todas as reservas
    const allReservations = await kv.getByPrefix<Reservation>('reservation:');

    // Validar e limpar reservas órfãs
    const allProperties = await kv.getByPrefix<Property>('property:');
    const validPropertyIds = new Set(allProperties.map(p => p.id));
    
    const validReservations: Reservation[] = [];
    const orphanedReservations: string[] = [];
    
    for (const reservation of allReservations) {
      if (!validPropertyIds.has(reservation.propertyId)) {
        orphanedReservations.push(reservation.id);
        logInfo(`Removing orphaned reservation: ${reservation.id} (property ${reservation.propertyId} not found)`);
        await kv.del(`reservation:${reservation.id}`);
      } else {
        validReservations.push(reservation);
      }
    }
    
    if (orphanedReservations.length > 0) {
      logInfo(`Cleaned up ${orphanedReservations.length} orphaned reservations`);
    }

    // Aplicar filtros
    const filters: ReservationFilters = {
      propertyId: c.req.query('propertyId'),
      guestId: c.req.query('guestId'),
      status: c.req.query('status')?.split(',') as any,
      platform: c.req.query('platform')?.split(',') as any,
      checkInFrom: c.req.query('checkInFrom'),
      checkInTo: c.req.query('checkInTo'),
    };

    let filtered = validReservations;

    if (filters.propertyId) {
      filtered = filtered.filter(r => r.propertyId === filters.propertyId);
    }

    if (filters.guestId) {
      filtered = filtered.filter(r => r.guestId === filters.guestId);
    }

    if (filters.status && filters.status.length > 0) {
      filtered = filtered.filter(r => filters.status!.includes(r.status));
    }

    if (filters.platform && filters.platform.length > 0) {
      filtered = filtered.filter(r => filters.platform!.includes(r.platform));
    }

    if (filters.checkInFrom) {
      filtered = filtered.filter(r => r.checkIn >= filters.checkInFrom!);
    }

    if (filters.checkInTo) {
      filtered = filtered.filter(r => r.checkIn <= filters.checkInTo!);
    }

    // Ordenar por check-in (mais recente primeiro)
    filtered.sort((a, b) => b.checkIn.localeCompare(a.checkIn));

    logInfo(`Found ${filtered.length} reservations`);

    return c.json(successResponse(filtered));
  } catch (error) {
    logError('Error listing reservations', error);
    return c.json(errorResponse('Failed to list reservations'), 500);
  }
}

// ============================================================================
// BUSCAR RESERVA POR ID
// ============================================================================

export async function getReservation(c: Context) {
  try {
    const id = c.req.param('id');
    logInfo(`Getting reservation: ${id}`);

    const reservation = await kv.get<Reservation>(`reservation:${id}`);

    if (!reservation) {
      return c.json(notFoundResponse('Reservation'), 404);
    }

    // Verificar se a propriedade associada existe
    const property = await kv.get<Property>(`property:${reservation.propertyId}`);
    if (!property) {
      logInfo(`Removing orphaned reservation: ${id} (property ${reservation.propertyId} not found)`);
      await kv.del(`reservation:${id}`);
      return c.json(notFoundResponse('Property'), 404);
    }

    return c.json(successResponse(reservation));
  } catch (error) {
    logError('Error getting reservation', error);
    return c.json(errorResponse('Failed to get reservation'), 500);
  }
}

// ============================================================================
// VERIFICAR DISPONIBILIDADE
// ============================================================================

export async function checkAvailability(c: Context) {
  try {
    const body = await c.req.json<AvailabilityCheck>();
    logInfo('Checking availability', body);

    const { propertyId, checkIn, checkOut } = body;

    // Validar datas
    const dateValidation = validateDateRange(checkIn, checkOut);
    if (!dateValidation.valid) {
      return c.json(validationErrorResponse(dateValidation.error!), 400);
    }

    // Verificar se propriedade existe
    const property = await kv.get<Property>(`property:${propertyId}`);
    if (!property) {
      return c.json(notFoundResponse('Property'), 404);
    }

    // Verificar restrições da propriedade
    const nights = calculateNights(checkIn, checkOut);
    if (nights < property.restrictions.minNights) {
      const response: AvailabilityResponse = {
        available: false,
        reason: `Minimum ${property.restrictions.minNights} nights required`,
      };
      return c.json(successResponse(response));
    }

    // Buscar reservas existentes
    const allReservations = await kv.getByPrefix<Reservation>('reservation:');
    const propertyReservations = allReservations.filter(
      r => r.propertyId === propertyId &&
      ['pending', 'confirmed', 'checked_in'].includes(r.status)
    );

    // Verificar conflitos
    const conflict = propertyReservations.find(r => 
      datesOverlap(checkIn, checkOut, r.checkIn, r.checkOut)
    );

    if (conflict) {
      const response: AvailabilityResponse = {
        available: false,
        reason: 'Property is already booked for these dates',
        conflictingReservation: {
          id: conflict.id,
          checkIn: conflict.checkIn,
          checkOut: conflict.checkOut,
        },
      };
      return c.json(successResponse(response));
    }

    // Buscar bloqueios
    const allBlocks = await kv.getByPrefix('block:');
    const propertyBlocks = allBlocks.filter(
      (b: any) => b.propertyId === propertyId
    );

    const blockConflict = propertyBlocks.find((b: any) =>
      datesOverlap(checkIn, checkOut, b.startDate, b.endDate)
    );

    if (blockConflict) {
      const response: AvailabilityResponse = {
        available: false,
        reason: `Property is blocked (${blockConflict.reason})`,
      };
      return c.json(successResponse(response));
    }

    // Disponível!
    const response: AvailabilityResponse = {
      available: true,
    };

    return c.json(successResponse(response));
  } catch (error) {
    logError('Error checking availability', error);
    return c.json(errorResponse('Failed to check availability'), 500);
  }
}

// ============================================================================
// CALCULAR PREÇO DA RESERVA
// ============================================================================

function calculateReservationPrice(
  property: Property,
  nights: number
): {
  pricePerNight: number;
  baseTotal: number;
  discount: number;
  total: number;
  appliedTier: 'base' | 'weekly' | 'biweekly' | 'monthly';
} {
  const basePrice = property.pricing.basePrice;
  let appliedTier: 'base' | 'weekly' | 'biweekly' | 'monthly' = 'base';
  let discountPercent = 0;

  // Determinar tier aplicável
  if (nights >= 28) {
    appliedTier = 'monthly';
    discountPercent = property.pricing.monthlyDiscount;
  } else if (nights >= 15) {
    appliedTier = 'biweekly';
    discountPercent = property.pricing.biweeklyDiscount;
  } else if (nights >= 7) {
    appliedTier = 'weekly';
    discountPercent = property.pricing.weeklyDiscount;
  }

  // Calcular preço por noite com desconto
  const pricePerNight = applyDiscount(basePrice, discountPercent);
  const baseTotal = pricePerNight * nights;
  const discount = (basePrice * nights) - baseTotal;

  return {
    pricePerNight,
    baseTotal,
    discount,
    total: baseTotal,
    appliedTier,
  };
}

// ============================================================================
// CRIAR NOVA RESERVA
// ============================================================================

export async function createReservation(c: Context) {
  try {
    const body = await c.req.json<CreateReservationDTO>();
    logInfo('Creating reservation', body);

    // Validações
    if (!body.propertyId || !body.guestId) {
      return c.json(
        validationErrorResponse('Property ID and Guest ID are required'),
        400
      );
    }

    const dateValidation = validateDateRange(body.checkIn, body.checkOut);
    if (!dateValidation.valid) {
      return c.json(validationErrorResponse(dateValidation.error!), 400);
    }

    if (!body.adults || body.adults < 1) {
      return c.json(
        validationErrorResponse('At least 1 adult is required'),
        400
      );
    }

    // Verificar se propriedade existe
    const property = await kv.get<Property>(`property:${body.propertyId}`);
    if (!property) {
      return c.json(notFoundResponse('Property'), 404);
    }

    // Verificar se hóspede existe
    const guest = await kv.get(`guest:${body.guestId}`);
    if (!guest) {
      return c.json(notFoundResponse('Guest'), 404);
    }

    // Verificar disponibilidade
    const nights = calculateNights(body.checkIn, body.checkOut);
    
    // Verificar conflitos
    const allReservations = await kv.getByPrefix<Reservation>('reservation:');
    const conflict = allReservations.find(
      r => r.propertyId === body.propertyId &&
      ['pending', 'confirmed', 'checked_in'].includes(r.status) &&
      datesOverlap(body.checkIn, body.checkOut, r.checkIn, r.checkOut)
    );

    if (conflict) {
      return c.json(
        errorResponse('Property is not available for these dates'),
        400
      );
    }

    // Calcular preço
    const pricing = calculateReservationPrice(property, nights);

    // Criar reserva
    const id = generateReservationId();
    const now = getCurrentDateTime();

    const reservation: Reservation = {
      id,
      propertyId: body.propertyId,
      guestId: body.guestId,
      
      checkIn: body.checkIn,
      checkOut: body.checkOut,
      nights,
      
      guests: {
        adults: body.adults,
        children: body.children || 0,
        infants: body.infants || 0,
        pets: body.pets || 0,
        total: body.adults + (body.children || 0) + (body.infants || 0),
      },
      
      pricing: {
        pricePerNight: pricing.pricePerNight,
        baseTotal: pricing.baseTotal,
        cleaningFee: 0,
        serviceFee: 0,
        taxes: 0,
        discount: pricing.discount,
        total: pricing.total,
        currency: property.pricing.currency,
        appliedTier: pricing.appliedTier,
      },
      
      status: 'pending',
      platform: body.platform,
      externalId: body.externalId,
      
      payment: {
        status: 'pending',
      },
      
      notes: body.notes,
      specialRequests: body.specialRequests,
      
      createdAt: now,
      updatedAt: now,
      createdBy: 'system', // TODO: Get from auth
    };

    // Salvar
    await kv.set(`reservation:${id}`, reservation);

    logInfo(`Reservation created: ${id}`);

    return c.json(
      successResponse(reservation, 'Reservation created successfully'),
      201
    );
  } catch (error) {
    logError('Error creating reservation', error);
    return c.json(errorResponse('Failed to create reservation'), 500);
  }
}

// ============================================================================
// ATUALIZAR RESERVA
// ============================================================================

export async function updateReservation(c: Context) {
  try {
    const id = c.req.param('id');
    const body = await c.req.json<UpdateReservationDTO>();
    logInfo(`Updating reservation: ${id}`, body);

    // Buscar reserva existente
    const existing = await kv.get<Reservation>(`reservation:${id}`);
    if (!existing) {
      return c.json(notFoundResponse('Reservation'), 404);
    }

    // Se mudando datas, recalcular preço E verificar conflitos
    let updatedPricing = existing.pricing;
    
    if (body.checkIn || body.checkOut) {
      const newCheckIn = body.checkIn || existing.checkIn;
      const newCheckOut = body.checkOut || existing.checkOut;
      
      const dateValidation = validateDateRange(newCheckIn, newCheckOut);
      if (!dateValidation.valid) {
        return c.json(validationErrorResponse(dateValidation.error!), 400);
      }

      const property = await kv.get<Property>(`property:${existing.propertyId}`);
      if (!property) {
        return c.json(notFoundResponse('Property'), 404);
      }

      // ============================================================================
      // REGRA MESTRA: VERIFICAR CONFLITOS AO MUDAR DATAS
      // ============================================================================
      const allReservations = await kv.getByPrefix<Reservation>('reservation:');
      const conflict = allReservations.find(
        r => r.id !== id && // Não verificar contra si mesmo
        r.propertyId === existing.propertyId &&
        ['pending', 'confirmed', 'checked_in'].includes(r.status) &&
        datesOverlap(newCheckIn, newCheckOut, r.checkIn, r.checkOut)
      );

      if (conflict) {
        return c.json(
          errorResponse(
            `OVERBOOKING BLOQUEADO: Já existe uma reserva (${conflict.id}) de ${conflict.checkIn} a ${conflict.checkOut}. Não é permitido sobrepor reservas.`
          ),
          400
        );
      }

      const nights = calculateNights(newCheckIn, newCheckOut);
      const pricing = calculateReservationPrice(property, nights);
      
      updatedPricing = {
        ...existing.pricing,
        pricePerNight: pricing.pricePerNight,
        baseTotal: pricing.baseTotal,
        discount: pricing.discount,
        total: pricing.total,
        appliedTier: pricing.appliedTier,
      };
    }

    // Atualizar reserva
    const updated: Reservation = {
      ...existing,
      ...(body.status && { status: body.status }),
      ...(body.checkIn && { checkIn: body.checkIn }),
      ...(body.checkOut && { checkOut: body.checkOut }),
      ...(body.checkIn || body.checkOut) && {
        nights: calculateNights(
          body.checkIn || existing.checkIn,
          body.checkOut || existing.checkOut
        ),
      },
      ...(body.adults !== undefined && {
        guests: {
          ...existing.guests,
          adults: body.adults,
          total: body.adults + existing.guests.children + existing.guests.infants,
        },
      }),
      ...(body.children !== undefined && {
        guests: {
          ...existing.guests,
          children: body.children,
          total: existing.guests.adults + body.children + existing.guests.infants,
        },
      }),
      ...(body.notes !== undefined && { notes: body.notes }),
      ...(body.internalComments !== undefined && { 
        internalComments: body.internalComments 
      }),
      ...(body.paymentStatus && {
        payment: {
          ...existing.payment,
          status: body.paymentStatus,
        },
      }),
      pricing: updatedPricing,
      updatedAt: getCurrentDateTime(),
    };

    // Salvar
    await kv.set(`reservation:${id}`, updated);

    logInfo(`Reservation updated: ${id}`);

    return c.json(successResponse(updated, 'Reservation updated successfully'));
  } catch (error) {
    logError('Error updating reservation', error);
    return c.json(errorResponse('Failed to update reservation'), 500);
  }
}

// ============================================================================
// CANCELAR RESERVA
// ============================================================================

export async function cancelReservation(c: Context) {
  try {
    const id = c.req.param('id');
    const { reason } = await c.req.json();
    logInfo(`Cancelling reservation: ${id}`);

    // Buscar reserva
    const reservation = await kv.get<Reservation>(`reservation:${id}`);
    if (!reservation) {
      return c.json(notFoundResponse('Reservation'), 404);
    }

    // Verificar se pode cancelar
    if (['cancelled', 'completed'].includes(reservation.status)) {
      return c.json(
        errorResponse('Cannot cancel a reservation that is already cancelled or completed'),
        400
      );
    }

    // Cancelar
    const cancelled: Reservation = {
      ...reservation,
      status: 'cancelled',
      cancelledAt: getCurrentDateTime(),
      cancelledBy: 'system', // TODO: Get from auth
      cancellationReason: reason,
      updatedAt: getCurrentDateTime(),
    };

    await kv.set(`reservation:${id}`, cancelled);

    logInfo(`Reservation cancelled: ${id}`);

    return c.json(successResponse(cancelled, 'Reservation cancelled successfully'));
  } catch (error) {
    logError('Error cancelling reservation', error);
    return c.json(errorResponse('Failed to cancel reservation'), 500);
  }
}

// ============================================================================
// DELETAR RESERVA
// ============================================================================

export async function deleteReservation(c: Context) {
  try {
    const id = c.req.param('id');
    logInfo(`Deleting reservation: ${id}`);

    const reservation = await kv.get<Reservation>(`reservation:${id}`);
    if (!reservation) {
      return c.json(notFoundResponse('Reservation'), 404);
    }

    // Apenas permitir deletar se estiver cancelada ou pendente
    if (!['cancelled', 'pending'].includes(reservation.status)) {
      return c.json(
        errorResponse('Only cancelled or pending reservations can be deleted'),
        400
      );
    }

    await kv.del(`reservation:${id}`);

    logInfo(`Reservation deleted: ${id}`);

    return c.json(successResponse(null, 'Reservation deleted successfully'));
  } catch (error) {
    logError('Error deleting reservation', error);
    return c.json(errorResponse('Failed to delete reservation'), 500);
  }
}

// ============================================================================
// DETECTAR CONFLITOS DE OVERBOOKING
// ============================================================================

export async function detectConflicts(c: Context) {
  try {
    logInfo('Detecting reservation conflicts...');

    // Buscar todas as reservas ativas
    const allReservations = await kv.getByPrefix<Reservation>('reservation:');
    const activeReservations = allReservations.filter(
      r => ['pending', 'confirmed', 'checked_in'].includes(r.status)
    );

    // Buscar todas as propriedades
    const allProperties = await kv.getByPrefix<Property>('property:');

    // Mapa: propertyId -> data -> array de reservas
    const occupancyMap = new Map<string, Map<string, Reservation[]>>();

    // Função para obter datas ocupadas (lógica hoteleira)
    const getOccupiedDates = (checkIn: string, checkOut: string): string[] => {
      const dates: string[] = [];
      const current = new Date(checkIn);
      current.setHours(0, 0, 0, 0);
      
      const end = new Date(checkOut);
      end.setHours(0, 0, 0, 0);
      
      // Check-in ocupa, check-out NÃO ocupa
      while (current < end) {
        dates.push(current.toISOString().split('T')[0]);
        current.setDate(current.getDate() + 1);
      }
      
      return dates;
    };

    // Construir mapa de ocupação
    for (const reservation of activeReservations) {
      const occupiedDates = getOccupiedDates(reservation.checkIn, reservation.checkOut);

      if (!occupancyMap.has(reservation.propertyId)) {
        occupancyMap.set(reservation.propertyId, new Map());
      }

      const propertyMap = occupancyMap.get(reservation.propertyId)!;

      for (const date of occupiedDates) {
        if (!propertyMap.has(date)) {
          propertyMap.set(date, []);
        }
        propertyMap.get(date)!.push(reservation);
      }
    }

    // Detectar conflitos (2+ reservas na mesma data/propriedade)
    interface ConflictInfo {
      propertyId: string;
      propertyName: string;
      date: string;
      reservations: {
        id: string;
        guestId: string;
        checkIn: string;
        checkOut: string;
        platform: string;
        status: string;
      }[];
    }

    const conflicts: ConflictInfo[] = [];
    const conflictingReservationIds = new Set<string>();

    for (const [propertyId, dateMap] of occupancyMap.entries()) {
      for (const [date, reservationsOnDate] of dateMap.entries()) {
        if (reservationsOnDate.length > 1) {
          // CONFLITO DETECTADO!
          const property = allProperties.find(p => p.id === propertyId);
          const propertyName = property?.name || `Propriedade ${propertyId}`;

          conflicts.push({
            propertyId,
            propertyName,
            date,
            reservations: reservationsOnDate.map(r => ({
              id: r.id,
              guestId: r.guestId,
              checkIn: r.checkIn,
              checkOut: r.checkOut,
              platform: r.platform,
              status: r.status,
            })),
          });

          // Marcar todas as reservas como conflitantes
          for (const reservation of reservationsOnDate) {
            conflictingReservationIds.add(reservation.id);
          }
        }
      }
    }

    logInfo(`Found ${conflicts.length} conflicts affecting ${conflictingReservationIds.size} reservations`);

    return c.json(successResponse({
      conflictsCount: conflicts.length,
      affectedReservations: conflictingReservationIds.size,
      conflicts,
      conflictingReservationIds: Array.from(conflictingReservationIds),
    }));
  } catch (error) {
    logError('Error detecting conflicts', error);
    return c.json(errorResponse('Failed to detect conflicts'), 500);
  }
}
