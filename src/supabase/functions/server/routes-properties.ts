// ============================================================================
// ROTAS DE PROPRIEDADES (IMÓVEIS)
// ============================================================================

import type { Context } from 'npm:hono';
import * as kv from './kv_store.tsx';
import type {
  Property,
  CreatePropertyDTO,
  UpdatePropertyDTO,
  PropertyFilters,
  PropertyStats,
} from './types.ts';
import {
  generatePropertyId,
  getCurrentDateTime,
  successResponse,
  errorResponse,
  notFoundResponse,
  validationErrorResponse,
  sanitizeString,
  sanitizeEmail,
  generatePropertyCode,
  getRandomPropertyColor,
  matchesSearch,
  matchesAnyTag,
  logInfo,
  logError,
} from './utils.ts';

// ============================================================================
// LISTAR TODAS AS PROPRIEDADES
// ============================================================================

export async function listProperties(c: Context) {
  try {
    logInfo('Listing all properties');

    // Buscar todas as propriedades
    const properties = await kv.getByPrefix<Property>('property:');
    
    // Buscar todos os locations para enriquecer os dados
    const locations = await kv.getByPrefix<any>('location:');
    const locationsMap = new Map(locations.map(loc => [loc.id, loc]));

    // Enriquecer propriedades com dados do location
    for (const property of properties) {
      if (property.locationId && locationsMap.has(property.locationId)) {
        const location = locationsMap.get(property.locationId);
        property.locationName = location.name;
        property.locationAmenities = location.amenities || [];
      }
    }

    // Aplicar filtros (se houver)
    const filters: PropertyFilters = {
      status: c.req.query('status')?.split(',') as any,
      type: c.req.query('type')?.split(',') as any,
      city: c.req.query('city')?.split(','),
      tags: c.req.query('tags')?.split(','),
      folder: c.req.query('folder'),
      search: c.req.query('search'),
    };

    let filtered = properties;

    // Filtro por status
    if (filters.status && filters.status.length > 0) {
      filtered = filtered.filter(p => filters.status!.includes(p.status));
    }

    // Filtro por tipo
    if (filters.type && filters.type.length > 0) {
      filtered = filtered.filter(p => filters.type!.includes(p.type));
    }

    // Filtro por cidade
    if (filters.city && filters.city.length > 0) {
      filtered = filtered.filter(p => 
        filters.city!.includes(p.address.city)
      );
    }

    // Filtro por tags
    if (filters.tags && filters.tags.length > 0) {
      filtered = filtered.filter(p => matchesAnyTag(p.tags, filters.tags!));
    }

    // Filtro por pasta
    if (filters.folder) {
      filtered = filtered.filter(p => p.folder === filters.folder);
    }

    // Filtro por busca (nome ou código)
    if (filters.search) {
      filtered = filtered.filter(p => 
        matchesSearch(p.name, filters.search!) ||
        matchesSearch(p.code, filters.search!)
      );
    }

    // Ordenar por nome
    filtered.sort((a, b) => a.name.localeCompare(b.name));

    logInfo(`Found ${filtered.length} properties`);

    return c.json(successResponse(filtered));
  } catch (error) {
    logError('Error listing properties', error);
    return c.json(errorResponse('Failed to list properties'), 500);
  }
}

// ============================================================================
// BUSCAR PROPRIEDADE POR ID
// ============================================================================

export async function getProperty(c: Context) {
  try {
    const id = c.req.param('id');
    logInfo(`Getting property: ${id}`);

    const property = await kv.get<Property>(`property:${id}`);

    if (!property) {
      return c.json(notFoundResponse('Property'), 404);
    }

    // Se a propriedade tem locationId, buscar dados do location
    if (property.locationId) {
      const location = await kv.get<any>(`location:${property.locationId}`);
      if (location) {
        property.locationName = location.name;
        property.locationAmenities = location.amenities || [];
      }
    }

    return c.json(successResponse(property));
  } catch (error) {
    logError('Error getting property', error);
    return c.json(errorResponse('Failed to get property'), 500);
  }
}

// ============================================================================
// CRIAR NOVA PROPRIEDADE
// ============================================================================

export async function createProperty(c: Context) {
  try {
    const body = await c.req.json<CreatePropertyDTO>();
    logInfo('Creating property', body);

    // Validações
    if (!body.name || !body.code || !body.type) {
      return c.json(
        validationErrorResponse('Name, code, and type are required'),
        400
      );
    }

    if (!body.address || !body.address.city || !body.address.state) {
      return c.json(
        validationErrorResponse('Address with city and state is required'),
        400
      );
    }

    if (!body.maxGuests || body.maxGuests < 1) {
      return c.json(
        validationErrorResponse('Max guests must be at least 1'),
        400
      );
    }

    if (!body.basePrice || body.basePrice < 0) {
      return c.json(
        validationErrorResponse('Base price must be greater than 0'),
        400
      );
    }

    // Verificar se código já existe
    const existingProperties = await kv.getByPrefix<Property>('property:');
    const codeExists = existingProperties.some(p => p.code === body.code);

    if (codeExists) {
      return c.json(
        validationErrorResponse(`Property code '${body.code}' already exists`),
        400
      );
    }

    // Criar propriedade
    const id = generatePropertyId();
    const now = getCurrentDateTime();

    const property: Property = {
      id,
      name: sanitizeString(body.name),
      code: body.code.toUpperCase(),
      type: body.type,
      status: 'active',
      
      address: {
        street: body.address.street || '',
        number: body.address.number || '',
        complement: body.address.complement,
        neighborhood: body.address.neighborhood || '',
        city: body.address.city,
        state: body.address.state,
        zipCode: body.address.zipCode || '',
        country: body.address.country || 'BR',
      },
      
      maxGuests: body.maxGuests,
      bedrooms: body.bedrooms || 1,
      beds: body.beds || 1,
      bathrooms: body.bathrooms || 1,
      area: body.area,
      
      pricing: {
        basePrice: body.basePrice,
        currency: body.currency || 'BRL',
        weeklyDiscount: 10,      // 10% padrão
        biweeklyDiscount: 15,    // 15% padrão
        monthlyDiscount: 20,     // 20% padrão
      },
      
      restrictions: {
        minNights: body.minNights || 1,
        maxNights: 365,
        advanceBooking: 0,
        preparationTime: 0,
      },
      
      amenities: body.amenities || [],
      tags: body.tags || [],
      folder: undefined,
      color: getRandomPropertyColor(),
      
      photos: [],
      coverPhoto: undefined,
      
      description: body.description,
      shortDescription: undefined,
      
      platforms: {
        airbnb: undefined,
        booking: undefined,
        decolar: undefined,
        direct: true,
      },
      
      createdAt: now,
      updatedAt: now,
      ownerId: 'system', // TODO: Get from auth
      isActive: true,
    };

    // Salvar no banco
    await kv.set(`property:${id}`, property);

    logInfo(`Property created: ${id}`);

    return c.json(successResponse(property, 'Property created successfully'), 201);
  } catch (error) {
    logError('Error creating property', error);
    return c.json(errorResponse('Failed to create property'), 500);
  }
}

// ============================================================================
// ATUALIZAR PROPRIEDADE
// ============================================================================

export async function updateProperty(c: Context) {
  try {
    const id = c.req.param('id');
    const body = await c.req.json<UpdatePropertyDTO>();
    logInfo(`Updating property: ${id}`, body);

    // Buscar propriedade existente
    const existing = await kv.get<Property>(`property:${id}`);

    if (!existing) {
      return c.json(notFoundResponse('Property'), 404);
    }

    // Se mudando o código, verificar se já existe
    if (body.code && body.code !== existing.code) {
      const allProperties = await kv.getByPrefix<Property>('property:');
      const codeExists = allProperties.some(
        p => p.code === body.code && p.id !== id
      );

      if (codeExists) {
        return c.json(
          validationErrorResponse(`Property code '${body.code}' already exists`),
          400
        );
      }
    }

    // Atualizar propriedade
    const updated: Property = {
      ...existing,
      ...(body.name && { name: sanitizeString(body.name) }),
      ...(body.code && { code: body.code.toUpperCase() }),
      ...(body.type && { type: body.type }),
      ...(body.status && { status: body.status }),
      ...(body.address && { address: { ...existing.address, ...body.address } }),
      ...(body.maxGuests && { maxGuests: body.maxGuests }),
      ...(body.bedrooms !== undefined && { bedrooms: body.bedrooms }),
      ...(body.beds !== undefined && { beds: body.beds }),
      ...(body.bathrooms !== undefined && { bathrooms: body.bathrooms }),
      ...(body.basePrice !== undefined && {
        pricing: {
          ...existing.pricing,
          basePrice: body.basePrice,
        },
      }),
      ...(body.minNights !== undefined && {
        restrictions: {
          ...existing.restrictions,
          minNights: body.minNights,
        },
      }),
      ...(body.amenities && { amenities: body.amenities }),
      ...(body.tags && { tags: body.tags }),
      ...(body.color && { color: body.color }),
      ...(body.photos && { photos: body.photos }),
      ...(body.description !== undefined && { description: body.description }),
      updatedAt: getCurrentDateTime(),
    };

    // Salvar
    await kv.set(`property:${id}`, updated);

    logInfo(`Property updated: ${id}`);

    return c.json(successResponse(updated, 'Property updated successfully'));
  } catch (error) {
    logError('Error updating property', error);
    return c.json(errorResponse('Failed to update property'), 500);
  }
}

// ============================================================================
// DELETAR PROPRIEDADE
// ============================================================================

export async function deleteProperty(c: Context) {
  try {
    const id = c.req.param('id');
    logInfo(`Deleting property: ${id}`);

    // Verificar se existe
    const existing = await kv.get<Property>(`property:${id}`);

    if (!existing) {
      return c.json(notFoundResponse('Property'), 404);
    }

    // Verificar se tem reservas ativas
    const reservations = await kv.getByPrefix(`reservation:`);
    const hasActiveReservations = reservations.some((r: any) => 
      r.propertyId === id && 
      ['pending', 'confirmed', 'checked_in'].includes(r.status)
    );

    if (hasActiveReservations) {
      return c.json(
        errorResponse('Cannot delete property with active reservations'),
        400
      );
    }

    // Deletar
    await kv.del(`property:${id}`);

    logInfo(`Property deleted: ${id}`);

    return c.json(successResponse(null, 'Property deleted successfully'));
  } catch (error) {
    logError('Error deleting property', error);
    return c.json(errorResponse('Failed to delete property'), 500);
  }
}

// ============================================================================
// ESTATÍSTICAS DA PROPRIEDADE
// ============================================================================

export async function getPropertyStats(c: Context) {
  try {
    const id = c.req.param('id');
    logInfo(`Getting stats for property: ${id}`);

    // Verificar se existe
    const property = await kv.get<Property>(`property:${id}`);
    if (!property) {
      return c.json(notFoundResponse('Property'), 404);
    }

    // Buscar todas as reservas da propriedade
    const allReservations = await kv.getByPrefix(`reservation:`);
    const reservations = allReservations.filter((r: any) => r.propertyId === id);

    // Calcular estatísticas
    const completedReservations = reservations.filter(
      (r: any) => r.status === 'completed'
    );

    const totalNights = completedReservations.reduce(
      (sum: number, r: any) => sum + r.nights,
      0
    );

    const totalRevenue = completedReservations.reduce(
      (sum: number, r: any) => sum + r.pricing.total,
      0
    );

    const upcomingReservations = reservations.filter(
      (r: any) => ['pending', 'confirmed'].includes(r.status)
    ).length;

    const today = new Date().toISOString().split('T')[0];
    const currentlyOccupied = reservations.some((r: any) => 
      r.status === 'checked_in' &&
      r.checkIn <= today &&
      r.checkOut > today
    );

    const stats: PropertyStats = {
      totalReservations: completedReservations.length,
      totalNights,
      totalRevenue,
      occupancyRate: 0, // TODO: Calculate based on date range
      averageDailyRate: totalNights > 0 ? totalRevenue / totalNights : 0,
      averageNightsPerBooking: completedReservations.length > 0 
        ? totalNights / completedReservations.length 
        : 0,
      upcomingReservations,
      currentlyOccupied,
    };

    return c.json(successResponse(stats));
  } catch (error) {
    logError('Error getting property stats', error);
    return c.json(errorResponse('Failed to get property stats'), 500);
  }
}
