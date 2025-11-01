// ============================================================================
// ROTAS DE LOCATIONS (LOCALIZAÇÕES / PRÉDIOS)
// ============================================================================
// Gerencia os containers físicos que agrupam múltiplas Accommodations
// Exemplo: Um prédio com 50 apartamentos = 1 Location + 50 Accommodations
// ============================================================================

import type { Context } from 'npm:hono';
import * as kv from './kv_store.tsx';
import type {
  Location,
  CreateLocationDTO,
  UpdateLocationDTO,
  LocationFilters,
} from './types.ts';
import {
  generateLocationId,
  getCurrentDateTime,
  successResponse,
  errorResponse,
  notFoundResponse,
  validationErrorResponse,
  sanitizeString,
  matchesSearch,
  logInfo,
  logError,
} from './utils.ts';

// ============================================================================
// LISTAR TODOS OS LOCATIONS
// ============================================================================

export async function listLocations(c: Context) {
  try {
    logInfo('Listing all locations');

    // Buscar todos os locations
    const locations = await kv.getByPrefix<Location>('location:');

    // Aplicar filtros (se houver)
    const filters: LocationFilters = {
      city: c.req.query('city')?.split(','),
      state: c.req.query('state')?.split(','),
      search: c.req.query('search'),
      hasElevator: c.req.query('hasElevator') === 'true' ? true : undefined,
      hasParking: c.req.query('hasParking') === 'true' ? true : undefined,
    };

    let filtered = locations;

    // Filtro por cidade
    if (filters.city && filters.city.length > 0) {
      filtered = filtered.filter(l => 
        filters.city!.includes(l.address.city)
      );
    }

    // Filtro por estado
    if (filters.state && filters.state.length > 0) {
      filtered = filtered.filter(l => 
        filters.state!.includes(l.address.state)
      );
    }

    // Filtro por busca (nome ou código)
    if (filters.search) {
      filtered = filtered.filter(l => 
        matchesSearch(l.name, filters.search!) ||
        matchesSearch(l.code, filters.search!)
      );
    }

    // Filtro por elevador
    if (filters.hasElevator !== undefined) {
      filtered = filtered.filter(l => 
        l.buildingAccess?.hasElevator === filters.hasElevator
      );
    }

    // Filtro por estacionamento
    if (filters.hasParking !== undefined) {
      filtered = filtered.filter(l => 
        l.buildingAccess?.hasParking === filters.hasParking
      );
    }

    // Ordenar por nome
    filtered.sort((a, b) => a.name.localeCompare(b.name));

    // Calcular estatísticas para cada Location
    for (const location of filtered) {
      const accommodations = await kv.getByPrefix(`property:`);
      const locationAccommodations = accommodations.filter((acc: any) => 
        acc.locationId === location.id
      );
      
      location.stats = {
        totalAccommodations: locationAccommodations.length,
        activeAccommodations: locationAccommodations.filter((acc: any) => 
          acc.status === 'active'
        ).length,
      };
    }

    logInfo(`Found ${filtered.length} locations`);

    return c.json(successResponse(filtered));
  } catch (error) {
    logError('Error listing locations', error);
    return c.json(errorResponse('Failed to list locations'), 500);
  }
}

// ============================================================================
// BUSCAR LOCATION POR ID
// ============================================================================

export async function getLocation(c: Context) {
  try {
    const id = c.req.param('id');
    logInfo(`Getting location: ${id}`);

    const location = await kv.get<Location>(`location:${id}`);

    if (!location) {
      return c.json(notFoundResponse('Location'), 404);
    }

    // Buscar accommodations vinculadas
    const allAccommodations = await kv.getByPrefix(`property:`);
    const locationAccommodations = allAccommodations.filter((acc: any) => 
      acc.locationId === id
    );

    // Adicionar estatísticas
    location.stats = {
      totalAccommodations: locationAccommodations.length,
      activeAccommodations: locationAccommodations.filter((acc: any) => 
        acc.status === 'active'
      ).length,
    };

    return c.json(successResponse({
      location,
      accommodations: locationAccommodations,
    }));
  } catch (error) {
    logError('Error getting location', error);
    return c.json(errorResponse('Failed to get location'), 500);
  }
}

// ============================================================================
// CRIAR NOVO LOCATION
// ============================================================================

export async function createLocation(c: Context) {
  try {
    const body = await c.req.json<CreateLocationDTO>();
    logInfo('Creating location', body);

    // Validações
    if (!body.name || !body.code) {
      return c.json(
        validationErrorResponse('Name and code are required'),
        400
      );
    }

    if (!body.address || !body.address.city || !body.address.state) {
      return c.json(
        validationErrorResponse('Address with city and state is required'),
        400
      );
    }

    // Verificar se código já existe
    const existingLocations = await kv.getByPrefix<Location>('location:');
    const codeExists = existingLocations.some(l => l.code === body.code);

    if (codeExists) {
      return c.json(
        validationErrorResponse(`Location code '${body.code}' already exists`),
        400
      );
    }

    // Criar location
    const id = generateLocationId();
    const now = getCurrentDateTime();

    const location: Location = {
      id,
      name: sanitizeString(body.name),
      code: body.code.toUpperCase(),
      
      address: {
        street: body.address.street || '',
        number: body.address.number || '',
        neighborhood: body.address.neighborhood || '',
        city: body.address.city,
        state: body.address.state,
        zipCode: body.address.zipCode || '',
        country: body.address.country || 'BR',
        coordinates: body.address.coordinates,
      },
      
      sharedAmenities: body.sharedAmenities || [],
      
      management: body.management,
      
      buildingAccess: body.buildingAccess || {
        type: 'portaria',
        hasElevator: false,
        hasParking: false,
      },
      
      photos: [],
      coverPhoto: undefined,
      
      description: body.description,
      
      showBuildingNumber: body.showBuildingNumber ?? false,
      
      stats: {
        totalAccommodations: 0,
        activeAccommodations: 0,
      },
      
      createdAt: now,
      updatedAt: now,
      ownerId: 'system', // TODO: Get from auth
      isActive: true,
    };

    // Salvar no banco
    await kv.set(`location:${id}`, location);

    logInfo(`Location created: ${id}`);

    return c.json(successResponse(location, 'Location created successfully'), 201);
  } catch (error) {
    logError('Error creating location', error);
    return c.json(errorResponse('Failed to create location'), 500);
  }
}

// ============================================================================
// ATUALIZAR LOCATION
// ============================================================================

export async function updateLocation(c: Context) {
  try {
    const id = c.req.param('id');
    const body = await c.req.json<UpdateLocationDTO>();
    logInfo(`Updating location: ${id}`, body);

    // Buscar location existente
    const existing = await kv.get<Location>(`location:${id}`);

    if (!existing) {
      return c.json(notFoundResponse('Location'), 404);
    }

    // Se mudando o código, verificar se já existe
    if (body.code && body.code !== existing.code) {
      const allLocations = await kv.getByPrefix<Location>('location:');
      const codeExists = allLocations.some(
        l => l.code === body.code && l.id !== id
      );

      if (codeExists) {
        return c.json(
          validationErrorResponse(`Location code '${body.code}' already exists`),
          400
        );
      }
    }

    // Atualizar location
    const updated: Location = {
      ...existing,
      ...(body.name && { name: sanitizeString(body.name) }),
      ...(body.code && { code: body.code.toUpperCase() }),
      ...(body.address && { address: { ...existing.address, ...body.address } }),
      ...(body.sharedAmenities && { sharedAmenities: body.sharedAmenities }),
      ...(body.management && { management: { ...existing.management, ...body.management } }),
      ...(body.buildingAccess && { buildingAccess: { ...existing.buildingAccess, ...body.buildingAccess } }),
      ...(body.photos && { photos: body.photos }),
      ...(body.coverPhoto !== undefined && { coverPhoto: body.coverPhoto }),
      ...(body.description !== undefined && { description: body.description }),
      ...(body.showBuildingNumber !== undefined && { showBuildingNumber: body.showBuildingNumber }),
      updatedAt: getCurrentDateTime(),
    };

    // Salvar
    await kv.set(`location:${id}`, updated);

    logInfo(`Location updated: ${id}`);

    return c.json(successResponse(updated, 'Location updated successfully'));
  } catch (error) {
    logError('Error updating location', error);
    return c.json(errorResponse('Failed to update location'), 500);
  }
}

// ============================================================================
// DELETAR LOCATION
// ============================================================================

export async function deleteLocation(c: Context) {
  try {
    const id = c.req.param('id');
    logInfo(`Deleting location: ${id}`);

    // Verificar se existe
    const existing = await kv.get<Location>(`location:${id}`);

    if (!existing) {
      return c.json(notFoundResponse('Location'), 404);
    }

    // Verificar se tem accommodations vinculadas
    const accommodations = await kv.getByPrefix(`property:`);
    const hasAccommodations = accommodations.some((acc: any) => 
      acc.locationId === id
    );

    if (hasAccommodations) {
      return c.json(
        errorResponse('Cannot delete location with accommodations. Delete or reassign accommodations first.'),
        400
      );
    }

    // Deletar
    await kv.del(`location:${id}`);

    logInfo(`Location deleted: ${id}`);

    return c.json(successResponse(null, 'Location deleted successfully'));
  } catch (error) {
    logError('Error deleting location', error);
    return c.json(errorResponse('Failed to delete location'), 500);
  }
}

// ============================================================================
// BUSCAR ACCOMMODATIONS DE UM LOCATION
// ============================================================================

export async function getLocationAccommodations(c: Context) {
  try {
    const id = c.req.param('id');
    logInfo(`Getting accommodations for location: ${id}`);

    // Verificar se location existe
    const location = await kv.get<Location>(`location:${id}`);

    if (!location) {
      return c.json(notFoundResponse('Location'), 404);
    }

    // Buscar todas as accommodations
    const allAccommodations = await kv.getByPrefix(`property:`);
    const locationAccommodations = allAccommodations.filter((acc: any) => 
      acc.locationId === id
    );

    // Ordenar por código
    locationAccommodations.sort((a: any, b: any) => 
      a.code.localeCompare(b.code)
    );

    logInfo(`Found ${locationAccommodations.length} accommodations for location ${id}`);

    return c.json(successResponse({
      location: {
        id: location.id,
        name: location.name,
        code: location.code,
        address: location.address,
      },
      accommodations: locationAccommodations,
      total: locationAccommodations.length,
    }));
  } catch (error) {
    logError('Error getting location accommodations', error);
    return c.json(errorResponse('Failed to get location accommodations'), 500);
  }
}
