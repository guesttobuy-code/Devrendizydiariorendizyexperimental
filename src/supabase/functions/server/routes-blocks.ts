import { Hono } from 'npm:hono';
import * as kv from './kv_store.tsx';

const blocks = new Hono();

// ============================================
// TYPES
// ============================================

type BlockSubtype = 'simple' | 'predictive' | 'maintenance';

interface Block {
  id: string;
  organization_id: string;
  property_id: string;
  property_name?: string;
  start_date: string;
  end_date: string;
  type: 'block';
  subtype?: BlockSubtype;
  reason: string;
  notes?: string;
  check_in_time?: string;
  check_out_time?: string;
  limitations?: {
    acoes?: boolean;
    espera?: boolean;
  };
  created_at: string;
  updated_at: string;
  created_by: string;
}

// ============================================
// BLOCKS CRUD
// ============================================

// GET all blocks
blocks.get('/', async (c) => {
  try {
    const orgId = c.req.query('organization_id');
    const propertyId = c.req.query('property_id');
    const startDate = c.req.query('start_date');
    const endDate = c.req.query('end_date');
    
    if (!orgId) {
      return c.json({ success: false, error: 'organization_id is required' }, 400);
    }

    const prefix = `block:${orgId}:`;
    let allBlocks = await kv.getByPrefix<Block>(prefix);

    // Filter by property if provided
    if (propertyId) {
      allBlocks = allBlocks.filter(b => b.property_id === propertyId);
    }

    // Filter by date range if provided
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      allBlocks = allBlocks.filter(b => {
        const blockStart = new Date(b.start_date);
        const blockEnd = new Date(b.end_date);
        
        // Check if blocks overlap with the date range
        return blockStart <= end && blockEnd >= start;
      });
    }

    // Sort by start_date
    allBlocks.sort((a, b) => 
      new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
    );

    return c.json({ success: true, data: allBlocks });
  } catch (error) {
    console.error('Error fetching blocks:', error);
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 500);
  }
});

// GET single block
blocks.get('/:id', async (c) => {
  try {
    const blockId = c.req.param('id');
    const orgId = c.req.query('organization_id');
    
    if (!orgId) {
      return c.json({ success: false, error: 'organization_id is required' }, 400);
    }

    const key = `block:${orgId}:${blockId}`;
    const block = await kv.get<Block>(key);

    if (!block) {
      return c.json({ success: false, error: 'Block not found' }, 404);
    }

    return c.json({ success: true, data: block });
  } catch (error) {
    console.error('Error fetching block:', error);
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 500);
  }
});

// POST create block
blocks.post('/', async (c) => {
  try {
    const body = await c.req.json();
    const {
      organization_id,
      property_id,
      property_name,
      start_date,
      end_date,
      subtype,
      reason,
      notes,
      check_in_time,
      check_out_time,
      limitations,
      created_by,
    } = body;

    if (!organization_id || !property_id || !start_date || !end_date || !created_by) {
      return c.json({ 
        success: false, 
        error: 'organization_id, property_id, start_date, end_date, and created_by are required' 
      }, 400);
    }

    // Validate dates
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);
    
    if (endDate <= startDate) {
      return c.json({ 
        success: false, 
        error: 'end_date must be after start_date' 
      }, 400);
    }

    // Check for conflicts with existing blocks and reservations
    const existingBlocksPrefix = `block:${organization_id}:`;
    const existingBlocks = await kv.getByPrefix<Block>(existingBlocksPrefix);
    
    const conflictingBlocks = existingBlocks.filter(b => {
      if (b.property_id !== property_id) return false;
      
      const bStart = new Date(b.start_date);
      const bEnd = new Date(b.end_date);
      
      return startDate < bEnd && endDate > bStart;
    });

    if (conflictingBlocks.length > 0) {
      return c.json({ 
        success: false, 
        error: 'Conflicting block already exists for this period',
        conflicts: conflictingBlocks 
      }, 409);
    }

    // Check for conflicts with reservations
    const reservationsPrefix = `reservation:${organization_id}:`;
    const reservations = await kv.getByPrefix<any>(reservationsPrefix);
    
    const conflictingReservations = reservations.filter((r: any) => {
      if (r.propertyId !== property_id) return false;
      if (r.status === 'cancelled') return false;
      
      const rStart = new Date(r.checkInDate);
      const rEnd = new Date(r.checkOutDate);
      
      return startDate < rEnd && endDate > rStart;
    });

    if (conflictingReservations.length > 0) {
      return c.json({ 
        success: false, 
        error: 'Conflicting reservation exists for this period',
        conflicts: conflictingReservations 
      }, 409);
    }

    const blockId = `blk-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const now = new Date().toISOString();

    const block: Block = {
      id: blockId,
      organization_id,
      property_id,
      property_name,
      start_date,
      end_date,
      type: 'block',
      subtype,
      reason: reason || 'Bloqueio',
      notes,
      check_in_time,
      check_out_time,
      limitations,
      created_at: now,
      updated_at: now,
      created_by,
    };

    const key = `block:${organization_id}:${blockId}`;
    await kv.set(key, block);

    return c.json({ success: true, data: block });
  } catch (error) {
    console.error('Error creating block:', error);
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 500);
  }
});

// PATCH update block
blocks.patch('/:id', async (c) => {
  try {
    const blockId = c.req.param('id');
    const body = await c.req.json();
    const orgId = body.organization_id;
    
    if (!orgId) {
      return c.json({ success: false, error: 'organization_id is required' }, 400);
    }

    const key = `block:${orgId}:${blockId}`;
    const block = await kv.get<Block>(key);

    if (!block) {
      return c.json({ success: false, error: 'Block not found' }, 404);
    }

    // If dates are being updated, check for conflicts
    if (body.start_date || body.end_date) {
      const newStartDate = new Date(body.start_date || block.start_date);
      const newEndDate = new Date(body.end_date || block.end_date);
      
      if (newEndDate <= newStartDate) {
        return c.json({ 
          success: false, 
          error: 'end_date must be after start_date' 
        }, 400);
      }

      // Check for conflicts with other blocks
      const existingBlocksPrefix = `block:${orgId}:`;
      const existingBlocks = await kv.getByPrefix<Block>(existingBlocksPrefix);
      
      const conflictingBlocks = existingBlocks.filter(b => {
        if (b.id === blockId) return false; // Ignore self
        if (b.property_id !== block.property_id) return false;
        
        const bStart = new Date(b.start_date);
        const bEnd = new Date(b.end_date);
        
        return newStartDate < bEnd && newEndDate > bStart;
      });

      if (conflictingBlocks.length > 0) {
        return c.json({ 
          success: false, 
          error: 'Conflicting block already exists for this period',
          conflicts: conflictingBlocks 
        }, 409);
      }

      // Check for conflicts with reservations
      const reservationsPrefix = `reservation:${orgId}:`;
      const reservations = await kv.getByPrefix<any>(reservationsPrefix);
      
      const conflictingReservations = reservations.filter((r: any) => {
        if (r.propertyId !== block.property_id) return false;
        if (r.status === 'cancelled') return false;
        
        const rStart = new Date(r.checkInDate);
        const rEnd = new Date(r.checkOutDate);
        
        return newStartDate < rEnd && newEndDate > rStart;
      });

      if (conflictingReservations.length > 0) {
        return c.json({ 
          success: false, 
          error: 'Conflicting reservation exists for this period',
          conflicts: conflictingReservations 
        }, 409);
      }
    }

    const updated: Block = {
      ...block,
      ...body,
      id: blockId,
      organization_id: orgId,
      type: 'block', // Ensure type is not changed
      updated_at: new Date().toISOString(),
    };

    await kv.set(key, updated);

    return c.json({ success: true, data: updated });
  } catch (error) {
    console.error('Error updating block:', error);
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 500);
  }
});

// DELETE block
blocks.delete('/:id', async (c) => {
  try {
    const blockId = c.req.param('id');
    const orgId = c.req.query('organization_id');
    
    if (!orgId) {
      return c.json({ success: false, error: 'organization_id is required' }, 400);
    }

    const key = `block:${orgId}:${blockId}`;
    await kv.del(key);

    return c.json({ success: true });
  } catch (error) {
    console.error('Error deleting block:', error);
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 500);
  }
});

// GET blocks by property
blocks.get('/property/:propertyId', async (c) => {
  try {
    const propertyId = c.req.param('propertyId');
    const orgId = c.req.query('organization_id');
    const startDate = c.req.query('start_date');
    const endDate = c.req.query('end_date');
    
    if (!orgId) {
      return c.json({ success: false, error: 'organization_id is required' }, 400);
    }

    const prefix = `block:${orgId}:`;
    let allBlocks = await kv.getByPrefix<Block>(prefix);

    // Filter by property
    allBlocks = allBlocks.filter(b => b.property_id === propertyId);

    // Filter by date range if provided
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      allBlocks = allBlocks.filter(b => {
        const blockStart = new Date(b.start_date);
        const blockEnd = new Date(b.end_date);
        
        return blockStart <= end && blockEnd >= start;
      });
    }

    // Sort by start_date
    allBlocks.sort((a, b) => 
      new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
    );

    return c.json({ success: true, data: allBlocks });
  } catch (error) {
    console.error('Error fetching property blocks:', error);
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 500);
  }
});

// POST bulk delete blocks
blocks.post('/bulk-delete', async (c) => {
  try {
    const body = await c.req.json();
    const { organization_id, block_ids } = body;
    
    if (!organization_id || !block_ids || !Array.isArray(block_ids)) {
      return c.json({ 
        success: false, 
        error: 'organization_id and block_ids array are required' 
      }, 400);
    }

    const deleted: string[] = [];
    const notFound: string[] = [];

    for (const blockId of block_ids) {
      const key = `block:${organization_id}:${blockId}`;
      const block = await kv.get<Block>(key);
      
      if (block) {
        await kv.del(key);
        deleted.push(blockId);
      } else {
        notFound.push(blockId);
      }
    }

    return c.json({ 
      success: true, 
      data: { 
        deleted: deleted.length, 
        not_found: notFound.length,
        deleted_ids: deleted,
        not_found_ids: notFound 
      } 
    });
  } catch (error) {
    console.error('Error bulk deleting blocks:', error);
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 500);
  }
});

// GET check availability (no blocks or reservations)
blocks.get('/check-availability', async (c) => {
  try {
    const orgId = c.req.query('organization_id');
    const propertyId = c.req.query('property_id');
    const startDate = c.req.query('start_date');
    const endDate = c.req.query('end_date');
    
    if (!orgId || !propertyId || !startDate || !endDate) {
      return c.json({ 
        success: false, 
        error: 'organization_id, property_id, start_date, and end_date are required' 
      }, 400);
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    // Check blocks
    const blocksPrefix = `block:${orgId}:`;
    const allBlocks = await kv.getByPrefix<Block>(blocksPrefix);
    
    const conflictingBlocks = allBlocks.filter(b => {
      if (b.property_id !== propertyId) return false;
      
      const bStart = new Date(b.start_date);
      const bEnd = new Date(b.end_date);
      
      return start < bEnd && end > bStart;
    });

    // Check reservations
    const reservationsPrefix = `reservation:${orgId}:`;
    const reservations = await kv.getByPrefix<any>(reservationsPrefix);
    
    const conflictingReservations = reservations.filter((r: any) => {
      if (r.propertyId !== propertyId) return false;
      if (r.status === 'cancelled') return false;
      
      const rStart = new Date(r.checkInDate);
      const rEnd = new Date(r.checkOutDate);
      
      return start < rEnd && end > rStart;
    });

    const isAvailable = conflictingBlocks.length === 0 && conflictingReservations.length === 0;

    return c.json({ 
      success: true, 
      data: {
        available: isAvailable,
        blocks: conflictingBlocks,
        reservations: conflictingReservations
      }
    });
  } catch (error) {
    console.error('Error checking availability:', error);
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 500);
  }
});

export default blocks;
