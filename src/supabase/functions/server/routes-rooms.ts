// ============================================================================
// ROUTES: ROOMS (CÔMODOS) - v1.0.79
// ============================================================================
// Sistema de múltiplos cômodos por accommodation
// Calcula automaticamente a capacidade máxima (max_guests)
// ============================================================================

import { Hono } from 'npm:hono@4.0.2';
import { cors } from 'npm:hono/cors';
import * as kv from './kv_store.tsx';
import type {
  Room,
  RoomType,
  Bed,
  BedType,
  RoomPhoto,
  RoomPhotoTag,
  CreateRoomDTO,
  UpdateRoomDTO,
  CreateRoomPhotoDTO,
  ApiResponse,
  BED_CAPACITY
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

// Capacidade padrão por tipo de cama (atualizado para frontend)
const BED_CAPACITY_MAP: Record<string, number> = {
  'casal': 2,
  'solteiro': 1,
  'solteiro-twin': 1,
  'beliche-single': 1,
  'beliche-double': 2,
  'king': 2,
  'queen': 2,
  'futon-casal': 2,
  'futon-individual': 1,
  'sofa-cama': 1,
  'sofa-cama-casal': 2,
  // Novos tipos do frontend
  'cama-casal-1p': 2,
  'cama-solteiro-2p': 2,
  'cama-queen-1p': 2,
  'cama-king-1p': 2,
  'beliche-1p-2pessoas': 2,
  'berco-baby': 1,
};

/**
 * Calcula a capacidade de um cômodo baseado nas camas
 * Suporta tanto array de Bed quanto object de BedCount
 */
function calculateRoomCapacity(beds: Bed[] | Record<string, number>): number {
  if (Array.isArray(beds)) {
    return beds.reduce((total, bed) => {
      const capacityPerBed = BED_CAPACITY_MAP[bed.type] || 0;
      return total + (bed.quantity * capacityPerBed);
    }, 0);
  } else {
    // Object format: { 'cama-casal-1p': 2, 'cama-solteiro-2p': 1 }
    return Object.entries(beds).reduce((total, [bedType, quantity]) => {
      const capacityPerBed = BED_CAPACITY_MAP[bedType] || 0;
      return total + (quantity * capacityPerBed);
    }, 0);
  }
}

/**
 * Calcula a capacidade máxima total do listing baseado em todos os cômodos
 */
async function calculateMaxGuests(listingId: string): Promise<number> {
  const rooms = await kv.getByPrefix<Room>(`room:${listingId}:`);
  
  return rooms.reduce((total, room) => {
    return total + room.capacity;
  }, 0);
}

/**
 * Atualiza o max_guests do listing automaticamente
 */
async function updateListingMaxGuests(listingId: string): Promise<void> {
  const maxGuests = await calculateMaxGuests(listingId);
  
  // Buscar listing atual
  const listing = await kv.get<any>(`listing:${listingId}`);
  
  if (listing) {
    await kv.set(`listing:${listingId}`, {
      ...listing,
      maxGuests,
      updatedAt: new Date().toISOString()
    });
  }
}

/**
 * Gera estatísticas dos cômodos (para exibição)
 */
async function getRoomStats(listingId: string): Promise<{
  totalRooms: number;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
}> {
  const rooms = await kv.getByPrefix<Room>(`room:${listingId}:`);
  
  const bedrooms = rooms.filter(r => 
    ['duplo', 'triplo', 'quadruplo', 'suite', 'individual', 'twin', 'studio'].includes(r.type)
  ).length;
  
  const bathrooms = rooms.filter(r => 
    ['banheiro', 'meio-banheiro'].includes(r.type)
  ).length;
  
  const maxGuests = rooms.reduce((total, room) => total + room.capacity, 0);
  
  return {
    totalRooms: rooms.length,
    bedrooms,
    bathrooms,
    maxGuests
  };
}

// ============================================================================
// ROUTES: ROOMS
// ============================================================================

/**
 * GET /make-server-67caf26a/listings/:listingId/rooms
 * Lista todos os cômodos de um listing
 */
app.get('/make-server-67caf26a/listings/:listingId/rooms', async (c) => {
  try {
    const listingId = c.req.param('listingId');
    
    const rooms = await kv.getByPrefix<Room>(`room:${listingId}:`);
    
    // Ordenar por order
    rooms.sort((a, b) => a.order - b.order);
    
    const stats = await getRoomStats(listingId);
    
    return c.json<ApiResponse<{ rooms: Room[]; stats: typeof stats }>>({
      success: true,
      data: { rooms, stats },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching rooms:', error);
    return c.json<ApiResponse>({
      success: false,
      error: 'Failed to fetch rooms',
      timestamp: new Date().toISOString()
    }, 500);
  }
});

/**
 * GET /make-server-67caf26a/rooms/:roomId
 * Busca um cômodo específico
 */
app.get('/make-server-67caf26a/rooms/:roomId', async (c) => {
  try {
    const roomId = c.req.param('roomId');
    
    const room = await kv.get<Room>(`room:${roomId}`);
    
    if (!room) {
      return c.json<ApiResponse>({
        success: false,
        error: 'Room not found',
        timestamp: new Date().toISOString()
      }, 404);
    }
    
    return c.json<ApiResponse<Room>>({
      success: true,
      data: room,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching room:', error);
    return c.json<ApiResponse>({
      success: false,
      error: 'Failed to fetch room',
      timestamp: new Date().toISOString()
    }, 500);
  }
});

/**
 * POST /make-server-67caf26a/listings/:listingId/rooms
 * Cria um novo cômodo
 */
app.post('/make-server-67caf26a/listings/:listingId/rooms', async (c) => {
  try {
    const listingId = c.req.param('listingId');
    const body: CreateRoomDTO = await c.req.json();
    
    // Validações
    if (!body.type) {
      return c.json<ApiResponse>({
        success: false,
        error: 'Room type is required',
        timestamp: new Date().toISOString()
      }, 400);
    }
    
    // Gerar ID único
    const roomId = `${listingId}:${Date.now()}`;
    
    // Normalizar beds para array se vier como object
    let bedsArray: Bed[] = [];
    if (body.beds) {
      if (Array.isArray(body.beds)) {
        bedsArray = body.beds;
      } else {
        // Converter object para array
        bedsArray = Object.entries(body.beds).map(([type, quantity]) => ({
          type,
          quantity: quantity as number,
        }));
      }
    }
    
    // Calcular capacidade baseado nas camas
    const capacity = calculateRoomCapacity(body.beds || []);
    
    // Buscar todos os rooms para determinar order
    const existingRooms = await kv.getByPrefix<Room>(`room:${listingId}:`);
    const nextOrder = body.order ?? (existingRooms.length + 1);
    
    // Criar room
    const newRoom: Room = {
      id: roomId,
      accommodationId: listingId,
      type: body.type,
      name: body.name,
      isShared: body.isShared ?? false,
      hasLock: body.hasLock ?? false,
      beds: bedsArray,
      capacity,
      photos: [],
      order: nextOrder,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    await kv.set(`room:${roomId}`, newRoom);
    
    // Atualizar max_guests do listing
    await updateListingMaxGuests(listingId);
    
    return c.json<ApiResponse<Room>>({
      success: true,
      data: newRoom,
      message: 'Room created successfully',
      timestamp: new Date().toISOString()
    }, 201);
  } catch (error) {
    console.error('Error creating room:', error);
    return c.json<ApiResponse>({
      success: false,
      error: 'Failed to create room',
      timestamp: new Date().toISOString()
    }, 500);
  }
});

/**
 * PUT /make-server-67caf26a/rooms/:roomId
 * Atualiza um cômodo
 */
app.put('/make-server-67caf26a/rooms/:roomId', async (c) => {
  try {
    const roomId = c.req.param('roomId');
    const body: UpdateRoomDTO = await c.req.json();
    
    const existingRoom = await kv.get<Room>(`room:${roomId}`);
    
    if (!existingRoom) {
      return c.json<ApiResponse>({
        success: false,
        error: 'Room not found',
        timestamp: new Date().toISOString()
      }, 404);
    }
    
    // Normalizar beds para array se vier como object
    let bedsArray: Bed[] = existingRoom.beds;
    if (body.beds) {
      if (Array.isArray(body.beds)) {
        bedsArray = body.beds;
      } else {
        // Converter object para array
        bedsArray = Object.entries(body.beds).map(([type, quantity]) => ({
          type,
          quantity: quantity as number,
        }));
      }
    }
    
    // Recalcular capacidade se beds foi atualizado
    const capacity = calculateRoomCapacity(bedsArray);
    
    const updatedRoom: Room = {
      ...existingRoom,
      ...body,
      beds: bedsArray,
      capacity,
      updatedAt: new Date().toISOString()
    };
    
    await kv.set(`room:${roomId}`, updatedRoom);
    
    // Atualizar max_guests do listing
    await updateListingMaxGuests(existingRoom.accommodationId);
    
    return c.json<ApiResponse<Room>>({
      success: true,
      data: updatedRoom,
      message: 'Room updated successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error updating room:', error);
    return c.json<ApiResponse>({
      success: false,
      error: 'Failed to update room',
      timestamp: new Date().toISOString()
    }, 500);
  }
});

/**
 * DELETE /make-server-67caf26a/rooms/:roomId
 * Deleta um cômodo
 */
app.delete('/make-server-67caf26a/rooms/:roomId', async (c) => {
  try {
    const roomId = c.req.param('roomId');
    
    const room = await kv.get<Room>(`room:${roomId}`);
    
    if (!room) {
      return c.json<ApiResponse>({
        success: false,
        error: 'Room not found',
        timestamp: new Date().toISOString()
      }, 404);
    }
    
    // Deletar todas as fotos do cômodo
    const photos = await kv.getByPrefix<RoomPhoto>(`room_photo:${roomId}:`);
    for (const photo of photos) {
      await kv.del(`room_photo:${photo.id}`);
    }
    
    // Deletar room
    await kv.del(`room:${roomId}`);
    
    // Atualizar max_guests do listing
    await updateListingMaxGuests(room.accommodationId);
    
    return c.json<ApiResponse>({
      success: true,
      message: 'Room deleted successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error deleting room:', error);
    return c.json<ApiResponse>({
      success: false,
      error: 'Failed to delete room',
      timestamp: new Date().toISOString()
    }, 500);
  }
});

// ============================================================================
// ROUTES: ROOM PHOTOS
// ============================================================================

/**
 * GET /make-server-67caf26a/rooms/:roomId/photos
 * Lista fotos de um cômodo
 */
app.get('/make-server-67caf26a/rooms/:roomId/photos', async (c) => {
  try {
    const roomId = c.req.param('roomId');
    
    const photos = await kv.getByPrefix<RoomPhoto>(`room_photo:${roomId}:`);
    
    // Ordenar por order
    photos.sort((a, b) => a.order - b.order);
    
    return c.json<ApiResponse<RoomPhoto[]>>({
      success: true,
      data: photos,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching room photos:', error);
    return c.json<ApiResponse>({
      success: false,
      error: 'Failed to fetch room photos',
      timestamp: new Date().toISOString()
    }, 500);
  }
});

/**
 * POST /make-server-67caf26a/rooms/:roomId/photos
 * Adiciona foto a um cômodo
 */
app.post('/make-server-67caf26a/rooms/:roomId/photos', async (c) => {
  try {
    const roomId = c.req.param('roomId');
    const body: CreateRoomPhotoDTO = await c.req.json();
    
    // Validar
    if (!body.url || !body.tag) {
      return c.json<ApiResponse>({
        success: false,
        error: 'URL and tag are required',
        timestamp: new Date().toISOString()
      }, 400);
    }
    
    // Verificar se room existe
    const room = await kv.get<Room>(`room:${roomId}`);
    if (!room) {
      return c.json<ApiResponse>({
        success: false,
        error: 'Room not found',
        timestamp: new Date().toISOString()
      }, 404);
    }
    
    // Buscar photos existentes para determinar order
    const existingPhotos = await kv.getByPrefix<RoomPhoto>(`room_photo:${roomId}:`);
    const nextOrder = body.order ?? (existingPhotos.length + 1);
    
    // Se isMain, remover isMain das outras
    if (body.isMain) {
      for (const photo of existingPhotos) {
        if (photo.isMain) {
          await kv.set(`room_photo:${photo.id}`, {
            ...photo,
            isMain: false
          });
        }
      }
    }
    
    const photoId = `${roomId}:${Date.now()}`;
    
    const newPhoto: RoomPhoto = {
      id: photoId,
      url: body.url,
      tag: body.tag,
      caption: body.caption,
      order: nextOrder,
      isMain: body.isMain ?? false
    };
    
    await kv.set(`room_photo:${photoId}`, newPhoto);
    
    // Adicionar à lista de photos do room
    room.photos.push(newPhoto);
    await kv.set(`room:${roomId}`, {
      ...room,
      updatedAt: new Date().toISOString()
    });
    
    return c.json<ApiResponse<RoomPhoto>>({
      success: true,
      data: newPhoto,
      message: 'Photo added successfully',
      timestamp: new Date().toISOString()
    }, 201);
  } catch (error) {
    console.error('Error adding room photo:', error);
    return c.json<ApiResponse>({
      success: false,
      error: 'Failed to add room photo',
      timestamp: new Date().toISOString()
    }, 500);
  }
});

/**
 * DELETE /make-server-67caf26a/room-photos/:photoId
 * Remove foto de um cômodo
 */
app.delete('/make-server-67caf26a/room-photos/:photoId', async (c) => {
  try {
    const photoId = c.req.param('photoId');
    
    const photo = await kv.get<RoomPhoto>(`room_photo:${photoId}`);
    
    if (!photo) {
      return c.json<ApiResponse>({
        success: false,
        error: 'Photo not found',
        timestamp: new Date().toISOString()
      }, 404);
    }
    
    // Extrair roomId do photoId
    const roomId = photoId.split(':').slice(0, -1).join(':');
    
    // Remover da lista do room
    const room = await kv.get<Room>(`room:${roomId}`);
    if (room) {
      room.photos = room.photos.filter(p => p.id !== photoId);
      await kv.set(`room:${roomId}`, {
        ...room,
        updatedAt: new Date().toISOString()
      });
    }
    
    // Deletar photo
    await kv.del(`room_photo:${photoId}`);
    
    return c.json<ApiResponse>({
      success: true,
      message: 'Photo deleted successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error deleting room photo:', error);
    return c.json<ApiResponse>({
      success: false,
      error: 'Failed to delete room photo',
      timestamp: new Date().toISOString()
    }, 500);
  }
});

export default app;
