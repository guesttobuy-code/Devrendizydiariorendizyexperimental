// ============================================================================
// ROTAS DE HÓSPEDES
// ============================================================================

import type { Context } from 'npm:hono';
import * as kv from './kv_store.tsx';
import type { Guest, CreateGuestDTO } from './types.ts';
import {
  generateGuestId,
  getCurrentDateTime,
  successResponse,
  errorResponse,
  notFoundResponse,
  validationErrorResponse,
  sanitizeString,
  sanitizeEmail,
  sanitizePhone,
  sanitizeCPF,
  isValidEmail,
  isValidPhone,
  generateFullName,
  matchesSearch,
  logInfo,
  logError,
} from './utils.ts';

// ============================================================================
// LISTAR TODOS OS HÓSPEDES
// ============================================================================

export async function listGuests(c: Context) {
  try {
    logInfo('Listing all guests');

    const guests = await kv.getByPrefix<Guest>('guest:');

    // Filtros
    const search = c.req.query('search');
    const isBlacklisted = c.req.query('blacklisted');

    let filtered = guests;

    if (search) {
      filtered = filtered.filter(g => 
        matchesSearch(g.fullName, search) ||
        matchesSearch(g.email, search) ||
        matchesSearch(g.phone, search)
      );
    }

    if (isBlacklisted !== undefined) {
      const blacklisted = isBlacklisted === 'true';
      filtered = filtered.filter(g => g.isBlacklisted === blacklisted);
    }

    // Ordenar por nome
    filtered.sort((a, b) => a.fullName.localeCompare(b.fullName));

    logInfo(`Found ${filtered.length} guests`);

    return c.json(successResponse(filtered));
  } catch (error) {
    logError('Error listing guests', error);
    return c.json(errorResponse('Failed to list guests'), 500);
  }
}

// ============================================================================
// BUSCAR HÓSPEDE POR ID
// ============================================================================

export async function getGuest(c: Context) {
  try {
    const id = c.req.param('id');
    logInfo(`Getting guest: ${id}`);

    const guest = await kv.get<Guest>(`guest:${id}`);

    if (!guest) {
      return c.json(notFoundResponse('Guest'), 404);
    }

    return c.json(successResponse(guest));
  } catch (error) {
    logError('Error getting guest', error);
    return c.json(errorResponse('Failed to get guest'), 500);
  }
}

// ============================================================================
// CRIAR NOVO HÓSPEDE
// ============================================================================

export async function createGuest(c: Context) {
  try {
    const body = await c.req.json<CreateGuestDTO>();
    logInfo('Creating guest', body);

    // Validações
    if (!body.firstName || !body.lastName) {
      return c.json(
        validationErrorResponse('First name and last name are required'),
        400
      );
    }

    if (!body.email || !isValidEmail(body.email)) {
      return c.json(
        validationErrorResponse('Valid email is required'),
        400
      );
    }

    if (!body.phone || !isValidPhone(body.phone)) {
      return c.json(
        validationErrorResponse('Valid phone is required'),
        400
      );
    }

    // Verificar se email já existe
    const allGuests = await kv.getByPrefix<Guest>('guest:');
    const emailExists = allGuests.some(
      g => g.email.toLowerCase() === body.email.toLowerCase()
    );

    if (emailExists) {
      return c.json(
        validationErrorResponse('A guest with this email already exists'),
        400
      );
    }

    // Criar hóspede
    const id = generateGuestId();
    const now = getCurrentDateTime();

    const guest: Guest = {
      id,
      firstName: sanitizeString(body.firstName),
      lastName: sanitizeString(body.lastName),
      fullName: generateFullName(body.firstName, body.lastName),
      email: sanitizeEmail(body.email),
      phone: sanitizePhone(body.phone),
      
      cpf: body.cpf ? sanitizeCPF(body.cpf) : undefined,
      passport: undefined,
      rg: undefined,
      
      address: undefined,
      birthDate: undefined,
      nationality: undefined,
      language: 'pt-BR',
      
      stats: {
        totalReservations: 0,
        totalNights: 0,
        totalSpent: 0,
      },
      
      preferences: undefined,
      tags: [],
      
      isBlacklisted: false,
      notes: undefined,
      
      createdAt: now,
      updatedAt: now,
      source: body.source || 'direct',
    };

    await kv.set(`guest:${id}`, guest);

    logInfo(`Guest created: ${id}`);

    return c.json(successResponse(guest, 'Guest created successfully'), 201);
  } catch (error) {
    logError('Error creating guest', error);
    return c.json(errorResponse('Failed to create guest'), 500);
  }
}

// ============================================================================
// ATUALIZAR HÓSPEDE
// ============================================================================

export async function updateGuest(c: Context) {
  try {
    const id = c.req.param('id');
    const body = await c.req.json<Partial<Guest>>();
    logInfo(`Updating guest: ${id}`, body);

    const existing = await kv.get<Guest>(`guest:${id}`);
    if (!existing) {
      return c.json(notFoundResponse('Guest'), 404);
    }

    // Se mudando email, verificar se já existe
    if (body.email && body.email !== existing.email) {
      if (!isValidEmail(body.email)) {
        return c.json(validationErrorResponse('Invalid email'), 400);
      }

      const allGuests = await kv.getByPrefix<Guest>('guest:');
      const emailExists = allGuests.some(
        g => g.email.toLowerCase() === body.email!.toLowerCase() && g.id !== id
      );

      if (emailExists) {
        return c.json(
          validationErrorResponse('A guest with this email already exists'),
          400
        );
      }
    }

    // Atualizar
    const updated: Guest = {
      ...existing,
      ...(body.firstName && { firstName: sanitizeString(body.firstName) }),
      ...(body.lastName && { lastName: sanitizeString(body.lastName) }),
      ...(body.firstName || body.lastName) && {
        fullName: generateFullName(
          body.firstName || existing.firstName,
          body.lastName || existing.lastName
        ),
      },
      ...(body.email && { email: sanitizeEmail(body.email) }),
      ...(body.phone && { phone: sanitizePhone(body.phone) }),
      ...(body.cpf !== undefined && { cpf: body.cpf ? sanitizeCPF(body.cpf) : undefined }),
      ...(body.passport !== undefined && { passport: body.passport }),
      ...(body.rg !== undefined && { rg: body.rg }),
      ...(body.address !== undefined && { address: body.address }),
      ...(body.birthDate !== undefined && { birthDate: body.birthDate }),
      ...(body.nationality !== undefined && { nationality: body.nationality }),
      ...(body.language !== undefined && { language: body.language }),
      ...(body.preferences !== undefined && { preferences: body.preferences }),
      ...(body.tags !== undefined && { tags: body.tags }),
      ...(body.isBlacklisted !== undefined && { isBlacklisted: body.isBlacklisted }),
      ...(body.blacklistReason !== undefined && { blacklistReason: body.blacklistReason }),
      ...(body.notes !== undefined && { notes: body.notes }),
      updatedAt: getCurrentDateTime(),
    };

    await kv.set(`guest:${id}`, updated);

    logInfo(`Guest updated: ${id}`);

    return c.json(successResponse(updated, 'Guest updated successfully'));
  } catch (error) {
    logError('Error updating guest', error);
    return c.json(errorResponse('Failed to update guest'), 500);
  }
}

// ============================================================================
// DELETAR HÓSPEDE
// ============================================================================

export async function deleteGuest(c: Context) {
  try {
    const id = c.req.param('id');
    logInfo(`Deleting guest: ${id}`);

    const existing = await kv.get<Guest>(`guest:${id}`);
    if (!existing) {
      return c.json(notFoundResponse('Guest'), 404);
    }

    // Verificar se tem reservas
    const reservations = await kv.getByPrefix('reservation:');
    const hasReservations = reservations.some((r: any) => r.guestId === id);

    if (hasReservations) {
      return c.json(
        errorResponse('Cannot delete guest with existing reservations'),
        400
      );
    }

    await kv.del(`guest:${id}`);

    logInfo(`Guest deleted: ${id}`);

    return c.json(successResponse(null, 'Guest deleted successfully'));
  } catch (error) {
    logError('Error deleting guest', error);
    return c.json(errorResponse('Failed to delete guest'), 500);
  }
}

// ============================================================================
// BUSCAR HISTÓRICO DO HÓSPEDE
// ============================================================================

export async function getGuestHistory(c: Context) {
  try {
    const id = c.req.param('id');
    logInfo(`Getting guest history: ${id}`);

    const guest = await kv.get<Guest>(`guest:${id}`);
    if (!guest) {
      return c.json(notFoundResponse('Guest'), 404);
    }

    // Buscar todas as reservas do hóspede
    const allReservations = await kv.getByPrefix('reservation:');
    const guestReservations = allReservations
      .filter((r: any) => r.guestId === id)
      .sort((a: any, b: any) => b.checkIn.localeCompare(a.checkIn));

    return c.json(successResponse({
      guest,
      reservations: guestReservations,
    }));
  } catch (error) {
    logError('Error getting guest history', error);
    return c.json(errorResponse('Failed to get guest history'), 500);
  }
}

// ============================================================================
// ADICIONAR/REMOVER BLACKLIST
// ============================================================================

export async function toggleBlacklist(c: Context) {
  try {
    const id = c.req.param('id');
    const { blacklist, reason } = await c.req.json();
    logInfo(`Toggling blacklist for guest: ${id}`);

    const guest = await kv.get<Guest>(`guest:${id}`);
    if (!guest) {
      return c.json(notFoundResponse('Guest'), 404);
    }

    const updated: Guest = {
      ...guest,
      isBlacklisted: blacklist,
      blacklistReason: blacklist ? reason : undefined,
      blacklistedAt: blacklist ? getCurrentDateTime() : undefined,
      blacklistedBy: blacklist ? 'system' : undefined, // TODO: Get from auth
      updatedAt: getCurrentDateTime(),
    };

    await kv.set(`guest:${id}`, updated);

    logInfo(`Guest ${blacklist ? 'added to' : 'removed from'} blacklist: ${id}`);

    return c.json(successResponse(updated, `Guest ${blacklist ? 'blacklisted' : 'removed from blacklist'} successfully`));
  } catch (error) {
    logError('Error toggling blacklist', error);
    return c.json(errorResponse('Failed to toggle blacklist'), 500);
  }
}
