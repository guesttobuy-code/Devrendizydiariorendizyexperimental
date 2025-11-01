import { Context } from "npm:hono";
import { createClient } from "jsr:@supabase/supabase-js@2";

const BUCKET_NAME = 'make-67caf26a-property-photos';

// Initialize Supabase client
const getSupabaseClient = () => {
  return createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  );
};

// Ensure bucket exists
async function ensureBucketExists() {
  const supabase = getSupabaseClient();
  
  const { data: buckets } = await supabase.storage.listBuckets();
  const bucketExists = buckets?.some(bucket => bucket.name === BUCKET_NAME);
  
  if (!bucketExists) {
    console.log(`Creating bucket: ${BUCKET_NAME}`);
    const { error } = await supabase.storage.createBucket(BUCKET_NAME, {
      public: false, // Private bucket
      fileSizeLimit: 5242880, // 5MB (reduced from 10MB)
      allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/jpg']
    });
    
    if (error) {
      console.error('Error creating bucket:', error);
      throw error;
    }
  }
}

/**
 * POST /make-server-67caf26a/photos/upload
 * Upload a photo to Supabase Storage
 */
export async function uploadPhoto(c: Context) {
  try {
    console.log('📸 Starting photo upload...');
    
    // Ensure bucket exists
    try {
      await ensureBucketExists();
      console.log('✅ Bucket verified');
    } catch (bucketError) {
      console.error('❌ Bucket error:', bucketError);
      return c.json({ 
        error: 'Failed to ensure bucket exists',
        details: bucketError instanceof Error ? bucketError.message : 'Unknown error'
      }, 500);
    }
    
    // Parse form data
    let formData;
    try {
      formData = await c.req.formData();
      console.log('✅ FormData parsed');
    } catch (formError) {
      console.error('❌ FormData error:', formError);
      return c.json({ 
        error: 'Failed to parse form data',
        details: formError instanceof Error ? formError.message : 'Unknown error'
      }, 400);
    }
    
    const file = formData.get('file') as File;
    const propertyId = formData.get('propertyId') as string;
    const room = formData.get('room') as string;
    
    console.log('📋 Upload params:', {
      hasFile: !!file,
      propertyId,
      room,
      fileType: file?.type,
      fileSize: file?.size
    });
    
    if (!file) {
      console.error('❌ No file in formData');
      return c.json({ error: 'No file provided' }, 400);
    }
    
    if (!propertyId) {
      console.error('❌ No propertyId in formData');
      return c.json({ error: 'Property ID is required' }, 400);
    }
    
    // Validate file size (5MB max)
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    if (file.size > MAX_FILE_SIZE) {
      console.error('❌ File too large:', file.size, 'bytes');
      return c.json({ 
        error: 'File too large',
        details: `Maximum file size is 5MB. Your file is ${(file.size / 1024 / 1024).toFixed(2)}MB`,
        maxSizeMB: 5,
        actualSizeMB: (file.size / 1024 / 1024).toFixed(2)
      }, 413);
    }
    
    // Generate unique filename
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(7);
    const extension = file.name.split('.').pop();
    const fileName = `${propertyId}/${room || 'external'}/${timestamp}-${randomStr}.${extension}`;
    
    console.log('📁 Generated filename:', fileName);
    
    // Upload to Supabase Storage
    const supabase = getSupabaseClient();
    
    let arrayBuffer;
    try {
      arrayBuffer = await file.arrayBuffer();
      console.log('✅ File converted to ArrayBuffer:', arrayBuffer.byteLength, 'bytes');
    } catch (bufferError) {
      console.error('❌ ArrayBuffer error:', bufferError);
      return c.json({ 
        error: 'Failed to read file',
        details: bufferError instanceof Error ? bufferError.message : 'Unknown error'
      }, 500);
    }
    
    const buffer = new Uint8Array(arrayBuffer);
    
    console.log('☁️ Uploading to Supabase Storage...');
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: false
      });
    
    if (error) {
      console.error('❌ Upload error:', error);
      return c.json({ 
        error: 'Failed to upload file', 
        details: JSON.stringify(error)
      }, 500);
    }
    
    console.log('✅ Upload successful:', data);
    
    // Generate signed URL (valid for 1 year)
    console.log('🔗 Generating signed URL...');
    const { data: urlData, error: urlError } = await supabase.storage
      .from(BUCKET_NAME)
      .createSignedUrl(fileName, 31536000); // 1 year
    
    if (urlError) {
      console.error('❌ Signed URL error:', urlError);
      return c.json({ 
        error: 'Failed to generate URL', 
        details: JSON.stringify(urlError)
      }, 500);
    }
    
    console.log('✅ Signed URL generated');
    
    const response = {
      success: true,
      photo: {
        id: `photo-${timestamp}-${randomStr}`,
        url: urlData.signedUrl,
        path: fileName,
        room: room || 'external',
        order: 0
      }
    };
    
    console.log('✅ Upload complete:', response);
    
    return c.json(response);
    
  } catch (error) {
    console.error('❌ Unexpected error in uploadPhoto:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack');
    return c.json({ 
      error: 'Failed to upload photo',
      details: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, 500);
  }
}

/**
 * DELETE /make-server-67caf26a/photos/:path
 * Delete a photo from Supabase Storage
 */
export async function deletePhoto(c: Context) {
  try {
    const path = c.req.param('path');
    
    if (!path) {
      return c.json({ error: 'Path is required' }, 400);
    }
    
    const supabase = getSupabaseClient();
    
    // Decode the path (might be URL encoded)
    const decodedPath = decodeURIComponent(path);
    
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([decodedPath]);
    
    if (error) {
      console.error('Error deleting file:', error);
      return c.json({ error: 'Failed to delete file', details: error }, 500);
    }
    
    return c.json({ success: true });
    
  } catch (error) {
    console.error('Error in deletePhoto:', error);
    return c.json({ 
      error: 'Failed to delete photo',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, 500);
  }
}

/**
 * GET /make-server-67caf26a/photos/property/:propertyId
 * List all photos for a property
 */
export async function listPropertyPhotos(c: Context) {
  try {
    const propertyId = c.req.param('propertyId');
    
    if (!propertyId) {
      return c.json({ error: 'Property ID is required' }, 400);
    }
    
    const supabase = getSupabaseClient();
    
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .list(propertyId);
    
    if (error) {
      console.error('Error listing files:', error);
      return c.json({ error: 'Failed to list files', details: error }, 500);
    }
    
    // Generate signed URLs for all photos
    const photos = await Promise.all(
      (data || []).map(async (file) => {
        const filePath = `${propertyId}/${file.name}`;
        
        const { data: urlData } = await supabase.storage
          .from(BUCKET_NAME)
          .createSignedUrl(filePath, 31536000); // 1 year
        
        // Extract room from path (if structured as propertyId/room/filename)
        const parts = file.name.split('/');
        const room = parts.length > 1 ? parts[0] : 'external';
        
        return {
          id: file.name,
          url: urlData?.signedUrl || '',
          path: filePath,
          room,
          order: 0,
          createdAt: file.created_at
        };
      })
    );
    
    return c.json({ photos });
    
  } catch (error) {
    console.error('Error in listPropertyPhotos:', error);
    return c.json({ 
      error: 'Failed to list photos',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, 500);
  }
}
