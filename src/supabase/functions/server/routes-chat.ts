import { Hono } from 'npm:hono';
import * as kv from './kv_store.tsx';

const chat = new Hono();

// ============================================
// TYPES
// ============================================

interface Message {
  id: string;
  conversation_id: string;
  sender_type: 'guest' | 'staff' | 'system';
  sender_name: string;
  sender_id?: string;
  content: string;
  sent_at: string;
  read_at?: string;
  organization_id: string;
  attachments?: string[];
  
  // ============================================
  // 🆕 MULTI-CHANNEL SUPPORT (v1.0.101)
  // ============================================
  channel: 'internal' | 'whatsapp' | 'sms' | 'email';
  direction: 'incoming' | 'outgoing';
  
  // External integration data
  external_id?: string; // ID from Evolution API, Twilio, etc
  external_status?: 'pending' | 'sent' | 'delivered' | 'read' | 'failed';
  external_error?: string;
  
  // Metadata for media and other channel-specific data
  metadata?: {
    media_url?: string;
    media_type?: string; // image, video, audio, document
    media_caption?: string;
    whatsapp_message_id?: string;
    sms_message_sid?: string;
    error_code?: string;
    error_message?: string;
  };
}

interface Conversation {
  id: string;
  organization_id: string;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  reservation_code?: string;
  property_name?: string;
  property_id?: string;
  channel: 'internal' | 'whatsapp' | 'sms' | 'email';
  status: 'unread' | 'read' | 'resolved';
  category: 'urgent' | 'normal' | 'resolved';
  conversation_type: 'guest' | 'lead';
  last_message: string;
  last_message_at: string;
  checkin_date?: string;
  checkout_date?: string;
  order?: number;
  isPinned?: boolean;
  tags?: string[];
  lead_data?: {
    desired_location?: string;
    num_guests?: number;
    desired_checkin?: string;
    desired_checkout?: string;
  };
  created_at: string;
  updated_at: string;
  
  // ============================================
  // 🆕 MULTI-CHANNEL SUPPORT (v1.0.101)
  // ============================================
  // External conversation ID (for WhatsApp, SMS, etc)
  external_conversation_id?: string;
  
  // Last channel used for this conversation
  last_channel?: 'internal' | 'whatsapp' | 'sms' | 'email';
  
  // Channel-specific metadata
  channel_metadata?: {
    whatsapp_contact_id?: string;
    whatsapp_profile_pic?: string;
    sms_phone_number?: string;
  };
}

interface MessageTemplate {
  id: string;
  organization_id: string;
  name: string;
  name_en?: string;
  name_es?: string;
  content: string;
  content_en?: string;
  content_es?: string;
  category: 'pre_checkin' | 'post_checkout' | 'during_stay' | 'payment' | 'general' | 'urgent';
  created_at: string;
  updated_at: string;
}

interface ChatTag {
  id: string;
  organization_id: string;
  name: string;
  color: string;
  description?: string;
  created_at: string;
  conversations_count: number;
}

// ============================================
// 🆕 CHANNEL CONFIGURATION (v1.0.101)
// ============================================

interface EvolutionAPIConfig {
  enabled: boolean;
  api_url: string;
  instance_name: string;
  api_key: string;
  connected: boolean;
  phone_number?: string;
  qr_code?: string;
  connection_status?: 'disconnected' | 'connecting' | 'connected' | 'error';
  last_connected_at?: string;
  error_message?: string;
}

interface TwilioConfig {
  enabled: boolean;
  account_sid: string;
  auth_token: string;
  phone_number: string;
  credits_remaining?: number;
  credits_used?: number;
  last_recharged_at?: string;
}

interface OrganizationChannelConfig {
  organization_id: string;
  
  // WhatsApp (Evolution API)
  whatsapp?: EvolutionAPIConfig;
  
  // SMS (Twilio)
  sms?: TwilioConfig;
  
  // Automations
  automations?: {
    reservation_confirmation?: boolean;
    checkin_reminder?: boolean;
    checkout_review?: boolean;
    payment_reminder?: boolean;
  };
  
  // Auto-reply templates
  auto_reply_templates?: {
    [key: string]: string;
  };
  
  created_at: string;
  updated_at: string;
}

// ============================================
// CONVERSATIONS
// ============================================

// GET all conversations
chat.get('/conversations', async (c) => {
  try {
    const orgId = c.req.query('organization_id');
    
    if (!orgId) {
      return c.json({ success: false, error: 'organization_id is required' }, 400);
    }

    const prefix = `chat:conversation:${orgId}:`;
    const conversations = await kv.getByPrefix<Conversation>(prefix);

    // Sort by order and last_message_at
    conversations.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      if (a.order !== undefined && b.order !== undefined) {
        if (a.order !== b.order) return a.order - b.order;
      }
      return new Date(b.last_message_at).getTime() - new Date(a.last_message_at).getTime();
    });

    return c.json({ success: true, data: conversations });
  } catch (error) {
    console.error('Error fetching conversations:', error);
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 500);
  }
});

// GET single conversation
chat.get('/conversations/:id', async (c) => {
  try {
    const conversationId = c.req.param('id');
    const orgId = c.req.query('organization_id');
    
    if (!orgId) {
      return c.json({ success: false, error: 'organization_id is required' }, 400);
    }

    const key = `chat:conversation:${orgId}:${conversationId}`;
    const conversation = await kv.get<Conversation>(key);

    if (!conversation) {
      return c.json({ success: false, error: 'Conversation not found' }, 404);
    }

    return c.json({ success: true, data: conversation });
  } catch (error) {
    console.error('Error fetching conversation:', error);
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 500);
  }
});

// POST create conversation
chat.post('/conversations', async (c) => {
  try {
    const body = await c.req.json();
    const {
      organization_id,
      guest_name,
      guest_email,
      guest_phone,
      reservation_code,
      property_name,
      property_id,
      channel = 'system',
      conversation_type = 'lead',
      checkin_date,
      checkout_date,
      lead_data,
    } = body;

    if (!organization_id || !guest_name || !guest_email) {
      return c.json({ 
        success: false, 
        error: 'organization_id, guest_name, and guest_email are required' 
      }, 400);
    }

    const conversationId = `conv-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const now = new Date().toISOString();

    const conversation: Conversation = {
      id: conversationId,
      organization_id,
      guest_name,
      guest_email,
      guest_phone: guest_phone || '',
      reservation_code,
      property_name,
      property_id,
      channel,
      status: 'unread',
      category: 'normal',
      conversation_type,
      last_message: 'Nova conversa iniciada',
      last_message_at: now,
      checkin_date,
      checkout_date,
      isPinned: false,
      tags: [],
      lead_data,
      created_at: now,
      updated_at: now,
    };

    const key = `chat:conversation:${organization_id}:${conversationId}`;
    await kv.set(key, conversation);

    return c.json({ success: true, data: conversation });
  } catch (error) {
    console.error('Error creating conversation:', error);
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 500);
  }
});

// PATCH update conversation
chat.patch('/conversations/:id', async (c) => {
  try {
    const conversationId = c.req.param('id');
    const body = await c.req.json();
    const orgId = body.organization_id;
    
    if (!orgId) {
      return c.json({ success: false, error: 'organization_id is required' }, 400);
    }

    const key = `chat:conversation:${orgId}:${conversationId}`;
    const conversation = await kv.get<Conversation>(key);

    if (!conversation) {
      return c.json({ success: false, error: 'Conversation not found' }, 404);
    }

    const updated: Conversation = {
      ...conversation,
      ...body,
      id: conversationId,
      organization_id: orgId,
      updated_at: new Date().toISOString(),
    };

    await kv.set(key, updated);

    return c.json({ success: true, data: updated });
  } catch (error) {
    console.error('Error updating conversation:', error);
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 500);
  }
});

// DELETE conversation
chat.delete('/conversations/:id', async (c) => {
  try {
    const conversationId = c.req.param('id');
    const orgId = c.req.query('organization_id');
    
    if (!orgId) {
      return c.json({ success: false, error: 'organization_id is required' }, 400);
    }

    const key = `chat:conversation:${orgId}:${conversationId}`;
    
    // Delete all messages for this conversation
    const messagesPrefix = `chat:message:${orgId}:${conversationId}:`;
    const messages = await kv.getByPrefix<Message>(messagesPrefix);
    
    for (const message of messages) {
      const messageKey = `chat:message:${orgId}:${conversationId}:${message.id}`;
      await kv.del(messageKey);
    }
    
    await kv.del(key);

    return c.json({ success: true });
  } catch (error) {
    console.error('Error deleting conversation:', error);
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 500);
  }
});

// PATCH update conversation order (drag and drop)
chat.patch('/conversations/:id/order', async (c) => {
  try {
    const conversationId = c.req.param('id');
    const body = await c.req.json();
    const { organization_id, order } = body;
    
    if (!organization_id) {
      return c.json({ success: false, error: 'organization_id is required' }, 400);
    }

    const key = `chat:conversation:${organization_id}:${conversationId}`;
    const conversation = await kv.get<Conversation>(key);

    if (!conversation) {
      return c.json({ success: false, error: 'Conversation not found' }, 404);
    }

    conversation.order = order;
    conversation.updated_at = new Date().toISOString();

    await kv.set(key, conversation);

    return c.json({ success: true, data: conversation });
  } catch (error) {
    console.error('Error updating conversation order:', error);
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 500);
  }
});

// PATCH toggle pin conversation
chat.patch('/conversations/:id/pin', async (c) => {
  try {
    const conversationId = c.req.param('id');
    const body = await c.req.json();
    const { organization_id } = body;
    
    if (!organization_id) {
      return c.json({ success: false, error: 'organization_id is required' }, 400);
    }

    const key = `chat:conversation:${organization_id}:${conversationId}`;
    const conversation = await kv.get<Conversation>(key);

    if (!conversation) {
      return c.json({ success: false, error: 'Conversation not found' }, 404);
    }

    conversation.isPinned = !conversation.isPinned;
    conversation.updated_at = new Date().toISOString();

    await kv.set(key, conversation);

    return c.json({ success: true, data: conversation });
  } catch (error) {
    console.error('Error toggling pin:', error);
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 500);
  }
});

// ============================================
// MESSAGES
// ============================================

// GET messages for a conversation
chat.get('/conversations/:id/messages', async (c) => {
  try {
    const conversationId = c.req.param('id');
    const orgId = c.req.query('organization_id');
    
    if (!orgId) {
      return c.json({ success: false, error: 'organization_id is required' }, 400);
    }

    const prefix = `chat:message:${orgId}:${conversationId}:`;
    const messages = await kv.getByPrefix<Message>(prefix);

    // Sort by sent_at
    messages.sort((a, b) => 
      new Date(a.sent_at).getTime() - new Date(b.sent_at).getTime()
    );

    return c.json({ success: true, data: messages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 500);
  }
});

// POST send message
chat.post('/conversations/:id/messages', async (c) => {
  try {
    const conversationId = c.req.param('id');
    const body = await c.req.json();
    const {
      organization_id,
      sender_type,
      sender_name,
      sender_id,
      content,
      attachments,
    } = body;

    if (!organization_id || !sender_type || !sender_name || !content) {
      return c.json({ 
        success: false, 
        error: 'organization_id, sender_type, sender_name, and content are required' 
      }, 400);
    }

    const messageId = `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const now = new Date().toISOString();

    const message: Message = {
      id: messageId,
      conversation_id: conversationId,
      sender_type,
      sender_name,
      sender_id,
      content,
      sent_at: now,
      organization_id,
      attachments,
    };

    const messageKey = `chat:message:${organization_id}:${conversationId}:${messageId}`;
    await kv.set(messageKey, message);

    // Update conversation last_message
    const conversationKey = `chat:conversation:${organization_id}:${conversationId}`;
    const conversation = await kv.get<Conversation>(conversationKey);

    if (conversation) {
      conversation.last_message = content.substring(0, 100);
      conversation.last_message_at = now;
      if (sender_type === 'guest') {
        conversation.status = 'unread';
      }
      conversation.updated_at = now;
      await kv.set(conversationKey, conversation);
    }

    return c.json({ success: true, data: message });
  } catch (error) {
    console.error('Error sending message:', error);
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 500);
  }
});

// PATCH mark message as read
chat.patch('/messages/:id/read', async (c) => {
  try {
    const messageId = c.req.param('id');
    const body = await c.req.json();
    const { organization_id, conversation_id } = body;
    
    if (!organization_id || !conversation_id) {
      return c.json({ 
        success: false, 
        error: 'organization_id and conversation_id are required' 
      }, 400);
    }

    const key = `chat:message:${organization_id}:${conversation_id}:${messageId}`;
    const message = await kv.get<Message>(key);

    if (!message) {
      return c.json({ success: false, error: 'Message not found' }, 404);
    }

    message.read_at = new Date().toISOString();
    await kv.set(key, message);

    return c.json({ success: true, data: message });
  } catch (error) {
    console.error('Error marking message as read:', error);
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 500);
  }
});

// ============================================
// TEMPLATES
// ============================================

// GET all templates
chat.get('/templates', async (c) => {
  try {
    const orgId = c.req.query('organization_id');
    
    if (!orgId) {
      return c.json({ success: false, error: 'organization_id is required' }, 400);
    }

    const prefix = `chat:template:${orgId}:`;
    const templates = await kv.getByPrefix<MessageTemplate>(prefix);

    // Sort by category and name
    templates.sort((a, b) => {
      if (a.category !== b.category) {
        return a.category.localeCompare(b.category);
      }
      return a.name.localeCompare(b.name);
    });

    return c.json({ success: true, data: templates });
  } catch (error) {
    console.error('Error fetching templates:', error);
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 500);
  }
});

// GET single template
chat.get('/templates/:id', async (c) => {
  try {
    const templateId = c.req.param('id');
    const orgId = c.req.query('organization_id');
    
    if (!orgId) {
      return c.json({ success: false, error: 'organization_id is required' }, 400);
    }

    const key = `chat:template:${orgId}:${templateId}`;
    const template = await kv.get<MessageTemplate>(key);

    if (!template) {
      return c.json({ success: false, error: 'Template not found' }, 404);
    }

    return c.json({ success: true, data: template });
  } catch (error) {
    console.error('Error fetching template:', error);
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 500);
  }
});

// POST create template
chat.post('/templates', async (c) => {
  try {
    const body = await c.req.json();
    const {
      organization_id,
      name,
      name_en,
      name_es,
      content,
      content_en,
      content_es,
      category,
    } = body;

    if (!organization_id || !name || !content || !category) {
      return c.json({ 
        success: false, 
        error: 'organization_id, name, content, and category are required' 
      }, 400);
    }

    const templateId = `tpl-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const now = new Date().toISOString();

    const template: MessageTemplate = {
      id: templateId,
      organization_id,
      name,
      name_en,
      name_es,
      content,
      content_en,
      content_es,
      category,
      created_at: now,
      updated_at: now,
    };

    const key = `chat:template:${organization_id}:${templateId}`;
    await kv.set(key, template);

    return c.json({ success: true, data: template });
  } catch (error) {
    console.error('Error creating template:', error);
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 500);
  }
});

// PATCH update template
chat.patch('/templates/:id', async (c) => {
  try {
    const templateId = c.req.param('id');
    const body = await c.req.json();
    const orgId = body.organization_id;
    
    if (!orgId) {
      return c.json({ success: false, error: 'organization_id is required' }, 400);
    }

    const key = `chat:template:${orgId}:${templateId}`;
    const template = await kv.get<MessageTemplate>(key);

    if (!template) {
      return c.json({ success: false, error: 'Template not found' }, 404);
    }

    const updated: MessageTemplate = {
      ...template,
      ...body,
      id: templateId,
      organization_id: orgId,
      updated_at: new Date().toISOString(),
    };

    await kv.set(key, updated);

    return c.json({ success: true, data: updated });
  } catch (error) {
    console.error('Error updating template:', error);
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 500);
  }
});

// DELETE template
chat.delete('/templates/:id', async (c) => {
  try {
    const templateId = c.req.param('id');
    const orgId = c.req.query('organization_id');
    
    if (!orgId) {
      return c.json({ success: false, error: 'organization_id is required' }, 400);
    }

    const key = `chat:template:${orgId}:${templateId}`;
    await kv.del(key);

    return c.json({ success: true });
  } catch (error) {
    console.error('Error deleting template:', error);
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 500);
  }
});

// ============================================
// TAGS
// ============================================

// GET all tags
chat.get('/tags', async (c) => {
  try {
    const orgId = c.req.query('organization_id');
    
    if (!orgId) {
      return c.json({ success: false, error: 'organization_id is required' }, 400);
    }

    const prefix = `chat:tag:${orgId}:`;
    const tags = await kv.getByPrefix<ChatTag>(prefix);

    // Update conversations count for each tag
    const conversationsPrefix = `chat:conversation:${orgId}:`;
    const conversations = await kv.getByPrefix<Conversation>(conversationsPrefix);

    for (const tag of tags) {
      const count = conversations.filter(conv => 
        conv.tags?.includes(tag.id)
      ).length;
      tag.conversations_count = count;
    }

    // Sort by name
    tags.sort((a, b) => a.name.localeCompare(b.name));

    return c.json({ success: true, data: tags });
  } catch (error) {
    console.error('Error fetching tags:', error);
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 500);
  }
});

// POST create tag
chat.post('/tags', async (c) => {
  try {
    const body = await c.req.json();
    const {
      organization_id,
      name,
      color,
      description,
    } = body;

    if (!organization_id || !name || !color) {
      return c.json({ 
        success: false, 
        error: 'organization_id, name, and color are required' 
      }, 400);
    }

    const tagId = `tag-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const tag: ChatTag = {
      id: tagId,
      organization_id,
      name,
      color,
      description,
      created_at: new Date().toISOString(),
      conversations_count: 0,
    };

    const key = `chat:tag:${organization_id}:${tagId}`;
    await kv.set(key, tag);

    return c.json({ success: true, data: tag });
  } catch (error) {
    console.error('Error creating tag:', error);
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 500);
  }
});

// PATCH update tag
chat.patch('/tags/:id', async (c) => {
  try {
    const tagId = c.req.param('id');
    const body = await c.req.json();
    const orgId = body.organization_id;
    
    if (!orgId) {
      return c.json({ success: false, error: 'organization_id is required' }, 400);
    }

    const key = `chat:tag:${orgId}:${tagId}`;
    const tag = await kv.get<ChatTag>(key);

    if (!tag) {
      return c.json({ success: false, error: 'Tag not found' }, 404);
    }

    const updated: ChatTag = {
      ...tag,
      ...body,
      id: tagId,
      organization_id: orgId,
    };

    await kv.set(key, updated);

    return c.json({ success: true, data: updated });
  } catch (error) {
    console.error('Error updating tag:', error);
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 500);
  }
});

// DELETE tag
chat.delete('/tags/:id', async (c) => {
  try {
    const tagId = c.req.param('id');
    const orgId = c.req.query('organization_id');
    
    if (!orgId) {
      return c.json({ success: false, error: 'organization_id is required' }, 400);
    }

    // Remove tag from all conversations
    const conversationsPrefix = `chat:conversation:${orgId}:`;
    const conversations = await kv.getByPrefix<Conversation>(conversationsPrefix);

    for (const conversation of conversations) {
      if (conversation.tags?.includes(tagId)) {
        conversation.tags = conversation.tags.filter(t => t !== tagId);
        conversation.updated_at = new Date().toISOString();
        const convKey = `chat:conversation:${orgId}:${conversation.id}`;
        await kv.set(convKey, conversation);
      }
    }

    const key = `chat:tag:${orgId}:${tagId}`;
    await kv.del(key);

    return c.json({ success: true });
  } catch (error) {
    console.error('Error deleting tag:', error);
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 500);
  }
});

// ============================================
// FILE UPLOAD ROUTES
// ============================================

// POST upload file
chat.post('/upload', async (c) => {
  try {
    const formData = await c.req.formData();
    const file = formData.get('file') as File;
    const organizationId = formData.get('organization_id') as string;
    const conversationId = formData.get('conversation_id') as string;
    
    if (!file || !organizationId) {
      return c.json({ 
        success: false, 
        error: 'file and organization_id are required' 
      }, 400);
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return c.json({ 
        success: false, 
        error: 'File size exceeds 10MB limit' 
      }, 400);
    }

    // Generate unique filename
    const timestamp = Date.now();
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${timestamp}_${sanitizedName}`;
    const path = `${organizationId}/chat/${conversationId || 'general'}/${filename}`;

    // In production, upload to Supabase Storage
    // For now, we'll store metadata in KV and simulate upload
    const fileMetadata = {
      id: `file-${timestamp}`,
      filename: file.name,
      path,
      size: file.size,
      type: file.type,
      organization_id: organizationId,
      conversation_id: conversationId,
      uploaded_at: new Date().toISOString(),
      // In production, this would be the actual storage URL
      url: `/storage/${path}`,
    };

    // Store metadata in KV
    const key = `chat:file:${organizationId}:${fileMetadata.id}`;
    await kv.set(key, fileMetadata);

    return c.json({ 
      success: true, 
      data: fileMetadata 
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 500);
  }
});

// GET download file
chat.get('/files/:fileId', async (c) => {
  try {
    const fileId = c.req.param('fileId');
    const orgId = c.req.query('organization_id');
    
    if (!orgId) {
      return c.json({ success: false, error: 'organization_id is required' }, 400);
    }

    const key = `chat:file:${orgId}:${fileId}`;
    const fileMetadata = await kv.get(key);

    if (!fileMetadata) {
      return c.json({ success: false, error: 'File not found' }, 404);
    }

    return c.json({ success: true, data: fileMetadata });
  } catch (error) {
    console.error('Error getting file:', error);
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 500);
  }
});

// GET list files for conversation
chat.get('/conversations/:conversationId/files', async (c) => {
  try {
    const conversationId = c.req.param('conversationId');
    const orgId = c.req.query('organization_id');
    
    if (!orgId) {
      return c.json({ success: false, error: 'organization_id is required' }, 400);
    }

    const prefix = `chat:file:${orgId}:`;
    const allFiles = await kv.getByPrefix(prefix);
    
    // Filter files for this conversation
    const conversationFiles = allFiles.filter((file: any) => 
      file.conversation_id === conversationId
    );

    return c.json({ success: true, data: conversationFiles });
  } catch (error) {
    console.error('Error listing files:', error);
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 500);
  }
});

// ============================================
// 🆕 CHANNELS CONFIGURATION (v1.0.101)
// ============================================

// GET channel configuration
chat.get('/channels/config', async (c) => {
  try {
    const orgId = c.req.query('organization_id');
    
    if (!orgId) {
      return c.json({ success: false, error: 'organization_id is required' }, 400);
    }

    const key = `chat:channels:config:${orgId}`;
    let config = await kv.get<OrganizationChannelConfig>(key);
    
    // If no config exists, create default
    if (!config) {
      config = {
        organization_id: orgId,
        whatsapp: {
          enabled: false,
          api_url: '',
          instance_name: '',
          api_key: '',
          connected: false,
          connection_status: 'disconnected'
        },
        sms: {
          enabled: false,
          account_sid: '',
          auth_token: '',
          phone_number: '',
          credits_remaining: 0,
          credits_used: 0
        },
        automations: {
          reservation_confirmation: false,
          checkin_reminder: false,
          checkout_review: false,
          payment_reminder: false
        },
        auto_reply_templates: {},
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      await kv.set(key, config);
    }

    return c.json({ success: true, data: config });
  } catch (error) {
    console.error('❌ Error getting channel config:', error);
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 500);
  }
});

// UPDATE channel configuration
chat.patch('/channels/config', async (c) => {
  try {
    const body = await c.req.json();
    const { organization_id, ...updates } = body;
    
    if (!organization_id) {
      return c.json({ success: false, error: 'organization_id is required' }, 400);
    }

    const key = `chat:channels:config:${organization_id}`;
    const existing = await kv.get<OrganizationChannelConfig>(key);
    
    const updated: OrganizationChannelConfig = {
      ...(existing || {
        organization_id,
        created_at: new Date().toISOString()
      }),
      ...updates,
      updated_at: new Date().toISOString()
    };
    
    await kv.set(key, updated);
    
    console.log('✅ Channel config updated for org:', organization_id);
    return c.json({ success: true, data: updated });
  } catch (error) {
    console.error('❌ Error updating channel config:', error);
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 500);
  }
});

// ============================================
// 🆕 WHATSAPP (Evolution API) - v1.0.102 ✅
// ============================================

// Helper: Create Evolution API client
function createEvolutionClient(config: EvolutionAPIConfig) {
  return {
    apiUrl: config.api_url,
    instanceName: config.instance_name,
    apiKey: config.api_key
  };
}

// Helper: Make request to Evolution API
async function evolutionRequest(
  config: { apiUrl: string; instanceName: string; apiKey: string },
  endpoint: string,
  method: 'GET' | 'POST' | 'DELETE' = 'GET',
  body?: any
): Promise<any> {
  const url = `${config.apiUrl}${endpoint}`;
  
  console.log(`📡 Evolution API Request:`);
  console.log(`   Method: ${method}`);
  console.log(`   URL: ${url}`);
  console.log(`   API Key: ${config.apiKey.substring(0, 15)}...`);
  if (body) console.log(`   Body:`, JSON.stringify(body, null, 2));
  
  // Evolution API aceita múltiplos formatos de header de autenticação
  // Vamos enviar todos os formatos possíveis para garantir compatibilidade
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'apikey': config.apiKey,           // Formato padrão Evolution API v1
    'api-key': config.apiKey,          // Formato alternativo
    'Authorization': `Bearer ${config.apiKey}`, // Formato Bearer token
  };

  console.log(`   Headers:`, {
    'Content-Type': 'application/json',
    'apikey': `${config.apiKey.substring(0, 15)}...`,
    'api-key': `${config.apiKey.substring(0, 15)}...`,
    'Authorization': `Bearer ${config.apiKey.substring(0, 15)}...`
  });

  const options: RequestInit = {
    method,
    headers,
  };

  if (body && method !== 'GET') {
    options.body = JSON.stringify(body);
  }

  try {
    // Log COMPLETO antes de enviar
    console.log(`🔍 DEBUGGING - Requisição COMPLETA:`);
    console.log(`   URL COMPLETA: ${url}`);
    console.log(`   Method: ${method}`);
    console.log(`   Headers COMPLETOS:`, JSON.stringify(headers, null, 2));
    console.log(`   API Key COMPLETA (ATENÇÃO LOGS):`, config.apiKey);
    if (body && method !== 'GET') {
      console.log(`   Body COMPLETO:`, JSON.stringify(body, null, 2));
    }
    
    const response = await fetch(url, options);
    
    console.log(`   Response Status: ${response.status} ${response.statusText}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ Evolution API Error ${response.status}:`);
      console.error(`   Response:`, errorText);
      console.error(`   Headers enviados:`, headers);
      
      // Se 401, dar dica específica
      if (response.status === 401) {
        console.error(`❌ ERRO 401: API Key inválida ou formato incorreto`);
        console.error(`   API Key fornecida: ${config.apiKey.substring(0, 20)}...`);
        console.error(`   Confirme com seu TI se a API Key está correta`);
      }
      
      throw new Error(`Evolution API Error ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log(`✅ Evolution API Success`);
    
    return data;
  } catch (error) {
    console.error(`❌ Evolution API Request Failed:`);
    console.error(`   URL: ${url}`);
    console.error(`   Error:`, error instanceof Error ? error.message : error);
    throw error;
  }
}

// Connect WhatsApp instance
chat.post('/channels/whatsapp/connect', async (c) => {
  try {
    const body = await c.req.json();
    let { organization_id, api_url, instance_name, api_key } = body;
    
    if (!organization_id || !api_url || !instance_name || !api_key) {
      return c.json({ 
        success: false, 
        error: 'Missing required fields: organization_id, api_url, instance_name, api_key' 
      }, 400);
    }

    // Limpar e validar dados
    api_url = api_url.trim().replace(/\/manager\/?$/, '').replace(/\/$/, '');
    instance_name = instance_name.trim();
    api_key = api_key.trim();
    
    // Validar URL
    if (api_url === 'https://api.evolutionapi.com' || !api_url.startsWith('http')) {
      return c.json({
        success: false,
        error: 'Invalid Evolution API URL. Please use your real server URL (without /manager)'
      }, 400);
    }
    
    // Validar API Key
    if (!api_key || api_key.length < 10) {
      return c.json({
        success: false,
        error: 'Invalid API Key'
      }, 400);
    }

    console.log(`🔗 Connecting WhatsApp for org: ${organization_id}`);
    console.log(`📡 API URL: ${api_url}`);
    console.log(`📱 Instance: ${instance_name}`);

    const client = { apiUrl: api_url, instanceName: instance_name, apiKey: api_key };

    // ============================================
    // 🆕 v1.0.103.61: DELETE + RECREATE Strategy
    // ============================================
    // Step 1: Check if instance exists
    let instanceExists = false;
    
    try {
      const instanceInfo = await evolutionRequest(
        client,
        `/instance/connectionState/${instance_name}`,
        'GET'
      );
      instanceExists = true;
      console.log('✅ Instance already exists');
      console.log('   Full instance info:', JSON.stringify(instanceInfo, null, 2));
    } catch (error) {
      console.log('📝 Instance does not exist yet.');
      instanceExists = false;
    }

    // Step 2: DELETE instance completely (if exists)
    if (instanceExists) {
      try {
        console.log('🗑️  DELETING existing instance to force fresh QR Code generation...');
        
        await evolutionRequest(
          client,
          `/instance/delete/${instance_name}`,
          'DELETE'
        );
        
        console.log('✅ Instance deleted successfully');
        
        // IMPORTANTE: Aguardar Evolution API processar
        console.log('⏳ Waiting 2 seconds for Evolution API to process deletion...');
        await new Promise(resolve => setTimeout(resolve, 2000));
        
      } catch (deleteError) {
        console.error('❌ Error deleting instance:', deleteError);
        
        // Fallback: Tentar logout
        try {
          console.log('🔄 Trying logout as fallback...');
          await evolutionRequest(client, `/instance/logout/${instance_name}`, 'DELETE');
          console.log('✅ Logout successful');
          await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (logoutError) {
          console.error('❌ Logout also failed:', logoutError);
        }
      }
    }

    // Step 3: CREATE new instance explicitly
    let instanceCreated = false;
    try {
      console.log('🆕 Creating NEW instance...');
      
      const createResponse = await evolutionRequest(
        client,
        `/instance/create`,
        'POST',
        {
          instanceName: instance_name,
          qrcode: true,
          integration: 'WHATSAPP-BAILEYS'
        }
      );
      
      console.log('✅ New instance created successfully');
      console.log('   Create response:', JSON.stringify(createResponse, null, 2));
      instanceCreated = true;
      
      // Aguardar instância ficar pronta
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (createError: any) {
      console.error('❌ Error creating instance:', createError);
      
      // Se erro 401, a API Key está inválida - retornar erro estruturado
      if (createError.message?.includes('401') || createError.message?.includes('Unauthorized')) {
        console.error('🔴 API Key inválida - retornando erro estruturado para frontend');
        
        return c.json({
          success: false,
          error: 'API_KEY_INVALID',
          message: 'A API Key fornecida não é válida ou não tem permissões.',
          details: {
            code: 'INVALID_CREDENTIALS',
            action: 'OBTAIN_VALID_API_KEY',
            steps: [
              'Acesse: https://evo.boravendermuito.com.br/manager',
              'Menu: Global API Keys',
              'Criar nova key com TODAS permissões',
              'Colar no RENDIZY e testar'
            ]
          }
        }, 401);
      }
      
      // Se erro 409 ou mensagem dizendo que já existe, continuar
      if (createError.message?.includes('409') || createError.message?.includes('already exists')) {
        console.log('   Instance already exists, continuing...');
        instanceCreated = true;
      } else {
        console.log('   Will try to connect anyway...');
      }
    }
    
    // Se não conseguiu criar e não existe, não tem como continuar
    if (!instanceCreated && !instanceExists) {
      throw new Error('Failed to create instance. Please check your Evolution API credentials and permissions.');
    }

    // Step 4: Generate FRESH QR Code
    let qrCodeData;
    try {
      console.log('📡 Requesting FRESH QR Code from Evolution API...');
      qrCodeData = await evolutionRequest(
        client,
        `/instance/connect/${instance_name}`,
        'GET'
      );
      console.log('✅ QR Code generated from /instance/connect');
      console.log('   Full response:', JSON.stringify(qrCodeData, null, 2));
    } catch (qrError: any) {
      console.error('❌ Error from /instance/connect:', qrError);
      
      // Mensagem de erro mais clara
      let errorMsg = 'Failed to generate QR Code. ';
      
      if (qrError.message?.includes('404')) {
        errorMsg += 'The instance does not exist. ';
        if (!instanceCreated) {
          errorMsg += 'Instance creation failed - please check your API Key permissions.';
        } else {
          errorMsg += 'The instance was just created but not found - there may be a delay. Try again in a few seconds.';
        }
      } else if (qrError.message?.includes('401')) {
        errorMsg += 'API Key is invalid or does not have permission to connect instances.';
      } else {
        errorMsg += 'There may be a connection issue with Evolution API. Error: ' + qrError.message;
      }
      
      throw new Error(errorMsg);
    }

    // Extract QR Code from response (can be in different formats)
    let qrCodeBase64 = qrCodeData.base64 || qrCodeData.code || qrCodeData.pairingCode;
    
    // Log what we got
    console.log('📊 QR Code extraction:');
    console.log('   base64:', qrCodeData.base64 ? `${qrCodeData.base64.substring(0, 30)}...` : 'undefined');
    console.log('   code:', qrCodeData.code ? `${qrCodeData.code.substring(0, 30)}...` : 'undefined');
    console.log('   pairingCode:', qrCodeData.pairingCode ? `${qrCodeData.pairingCode.substring(0, 30)}...` : 'undefined');
    console.log('   Final QR Code:', qrCodeBase64 ? `${qrCodeBase64.substring(0, 30)}...` : 'undefined');
    
    if (!qrCodeBase64) {
      console.error('❌ No QR Code found in response:', qrCodeData);
      throw new Error('QR Code not found in Evolution API response');
    }

    // Step 3: Save configuration
    const key = `chat:channels:config:${organization_id}`;
    let config = await kv.get<OrganizationChannelConfig>(key);
    
    if (!config) {
      config = {
        organization_id,
        whatsapp: {
          enabled: true,
          api_url,
          instance_name,
          api_key,
          connected: false,
          connection_status: 'connecting',
          qr_code: qrCodeBase64
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    } else {
      config.whatsapp = {
        ...config.whatsapp,
        enabled: true,
        api_url,
        instance_name,
        api_key,
        connected: false,
        connection_status: 'connecting',
        qr_code: qrCodeBase64
      };
      config.updated_at = new Date().toISOString();
    }
    
    await kv.set(key, config);

    console.log('✅ WhatsApp connection initiated successfully');
    console.log('✅ QR Code saved to config');

    return c.json({ 
      success: true, 
      data: {
        qr_code: qrCodeBase64,
        instance_name,
        status: 'connecting'
      }
    });
  } catch (error) {
    console.error('❌ Error connecting WhatsApp:', error);
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 500);
  }
});

// Get WhatsApp connection status
chat.post('/channels/whatsapp/status', async (c) => {
  try {
    const body = await c.req.json();
    const { organization_id } = body;
    
    if (!organization_id) {
      return c.json({ success: false, error: 'organization_id is required' }, 400);
    }

    // Get config from KV
    const key = `chat:channels:config:${organization_id}`;
    const config = await kv.get<OrganizationChannelConfig>(key);
    
    if (!config?.whatsapp || !config.whatsapp.enabled) {
      return c.json({ 
        success: true, 
        data: { connected: false, error: 'WhatsApp not configured' } 
      });
    }

    // Check status from Evolution API
    try {
      const client = createEvolutionClient(config.whatsapp);
      const instanceInfo = await evolutionRequest(
        client,
        `/instance/connectionState/${config.whatsapp.instance_name}`,
        'GET'
      );

      const isConnected = instanceInfo.instance?.status === 'open';
      const phoneNumber = instanceInfo.phoneNumber || 
                         (instanceInfo.ownerJid ? instanceInfo.ownerJid.split('@')[0] : undefined);

      // Update config if status changed
      if (isConnected !== config.whatsapp.connected) {
        config.whatsapp.connected = isConnected;
        config.whatsapp.connection_status = isConnected ? 'connected' : 'disconnected';
        config.whatsapp.phone_number = phoneNumber;
        config.whatsapp.last_connected_at = isConnected ? new Date().toISOString() : config.whatsapp.last_connected_at;
        config.updated_at = new Date().toISOString();
        await kv.set(key, config);
      }

      return c.json({ 
        success: true, 
        data: {
          connected: isConnected,
          phone_number: phoneNumber,
          connection_status: config.whatsapp.connection_status,
          profile_name: instanceInfo.profileName
        }
      });
    } catch (error) {
      console.error('❌ Error checking Evolution API status:', error);
      
      // Return cached status
      return c.json({ 
        success: true, 
        data: {
          connected: config.whatsapp.connected || false,
          phone_number: config.whatsapp.phone_number,
          connection_status: config.whatsapp.connection_status || 'error',
          error: 'Could not connect to Evolution API'
        }
      });
    }
  } catch (error) {
    console.error('❌ Error getting WhatsApp status:', error);
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 500);
  }
});

// Disconnect WhatsApp
chat.post('/channels/whatsapp/disconnect', async (c) => {
  try {
    const body = await c.req.json();
    const { organization_id } = body;
    
    if (!organization_id) {
      return c.json({ success: false, error: 'organization_id is required' }, 400);
    }

    const key = `chat:channels:config:${organization_id}`;
    const config = await kv.get<OrganizationChannelConfig>(key);
    
    if (!config?.whatsapp) {
      return c.json({ success: false, error: 'WhatsApp not configured' }, 400);
    }

    // Logout from Evolution API
    try {
      const client = createEvolutionClient(config.whatsapp);
      await evolutionRequest(
        client,
        `/instance/logout/${config.whatsapp.instance_name}`,
        'DELETE'
      );
      console.log('✅ WhatsApp logged out successfully');
    } catch (error) {
      console.error('⚠️ Error logging out from Evolution API:', error);
      // Continue anyway to update local state
    }

    // Update local config
    config.whatsapp.connected = false;
    config.whatsapp.connection_status = 'disconnected';
    config.whatsapp.phone_number = undefined;
    config.whatsapp.qr_code = undefined;
    config.updated_at = new Date().toISOString();
    
    await kv.set(key, config);

    return c.json({ success: true, data: { connected: false } });
  } catch (error) {
    console.error('❌ Error disconnecting WhatsApp:', error);
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 500);
  }
});

// Send WhatsApp message
chat.post('/channels/whatsapp/send', async (c) => {
  try {
    const body = await c.req.json();
    const { organization_id, conversation_id, content, metadata, phone_number } = body;
    
    if (!organization_id || !conversation_id || !content) {
      return c.json({ 
        success: false, 
        error: 'Missing required fields: organization_id, conversation_id, content' 
      }, 400);
    }

    // Get WhatsApp config
    const configKey = `chat:channels:config:${organization_id}`;
    const config = await kv.get<OrganizationChannelConfig>(configKey);
    
    if (!config?.whatsapp || !config.whatsapp.enabled) {
      return c.json({ success: false, error: 'WhatsApp not configured' }, 400);
    }

    if (!config.whatsapp.connected) {
      return c.json({ success: false, error: 'WhatsApp not connected' }, 400);
    }

    // Get conversation to find phone number
    const conversation = await kv.get<Conversation>(`chat:conversation:${organization_id}:${conversation_id}`);
    if (!conversation) {
      return c.json({ success: false, error: 'Conversation not found' }, 404);
    }

    const targetPhone = phone_number || conversation.guest_phone;
    if (!targetPhone) {
      return c.json({ success: false, error: 'Phone number not found' }, 400);
    }

    // Normalize phone number
    const normalizePhone = (num: string) => {
      let normalized = num.replace(/\D/g, '');
      if (!normalized.startsWith('55') && normalized.length === 11) {
        normalized = '55' + normalized;
      }
      if (!num.includes('@s.whatsapp.net')) {
        normalized = `${normalized}@s.whatsapp.net`;
      } else {
        normalized = num;
      }
      return normalized;
    };

    const client = createEvolutionClient(config.whatsapp);
    
    // Send message via Evolution API
    let evolutionResponse;
    if (metadata?.media_url) {
      // Send media
      evolutionResponse = await evolutionRequest(
        client,
        `/message/sendMedia/${config.whatsapp.instance_name}`,
        'POST',
        {
          number: normalizePhone(targetPhone),
          mediatype: metadata.media_type || 'image',
          media: metadata.media_url,
          caption: content || '',
          fileName: metadata.file_name || 'file'
        }
      );
    } else {
      // Send text
      evolutionResponse = await evolutionRequest(
        client,
        `/message/sendText/${config.whatsapp.instance_name}`,
        'POST',
        {
          number: normalizePhone(targetPhone),
          text: content
        }
      );
    }

    // Create message in our system
    const messageId = `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const message: Message = {
      id: messageId,
      conversation_id,
      sender_type: 'staff',
      sender_name: 'Sistema',
      content,
      sent_at: new Date().toISOString(),
      organization_id,
      attachments: metadata?.media_url ? [metadata.media_url] : [],
      channel: 'whatsapp',
      direction: 'outgoing',
      external_id: evolutionResponse.key?.id,
      external_status: 'sent',
      metadata: {
        whatsapp_message_id: evolutionResponse.key?.id,
        media_url: metadata?.media_url,
        media_type: metadata?.media_type,
        media_caption: content
      }
    };

    // Save message
    await kv.set(`chat:message:${organization_id}:${conversation_id}:${messageId}`, message);

    // Update conversation
    conversation.last_message = content;
    conversation.last_message_at = new Date().toISOString();
    conversation.last_channel = 'whatsapp';
    conversation.updated_at = new Date().toISOString();
    await kv.set(`chat:conversation:${organization_id}:${conversation_id}`, conversation);

    console.log('✅ WhatsApp message sent successfully');

    return c.json({ success: true, data: message });
  } catch (error) {
    console.error('❌ Error sending WhatsApp message:', error);
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 500);
  }
});

// Webhook to receive WhatsApp messages (from Evolution API)
chat.post('/channels/whatsapp/webhook', async (c) => {
  try {
    const payload = await c.req.json();
    
    console.log('📥 WhatsApp webhook received:', JSON.stringify(payload, null, 2));

    // Only process incoming messages
    if (payload.event !== 'messages.upsert' && payload.event !== 'MESSAGES_UPSERT') {
      console.log('⏭️ Skipping non-message event:', payload.event);
      return c.json({ success: true, message: 'Event ignored' });
    }

    const messageData = payload.data;
    
    // Skip messages sent by us
    if (messageData.key?.fromMe) {
      console.log('⏭️ Skipping outgoing message');
      return c.json({ success: true, message: 'Outgoing message ignored' });
    }

    // Extract message info
    const senderJid = messageData.key?.remoteJid;
    const messageId = messageData.key?.id;
    const senderPhone = senderJid?.split('@')[0] || '';
    const senderName = messageData.pushName || `+${senderPhone}`;
    
    // Extract text from different message types
    let messageText = '';
    if (messageData.message?.conversation) {
      messageText = messageData.message.conversation;
    } else if (messageData.message?.extendedTextMessage?.text) {
      messageText = messageData.message.extendedTextMessage.text;
    } else if (messageData.message?.imageMessage?.caption) {
      messageText = messageData.message.imageMessage.caption || '📷 Image';
    } else if (messageData.message?.videoMessage?.caption) {
      messageText = messageData.message.videoMessage.caption || '🎥 Video';
    } else if (messageData.message?.audioMessage) {
      messageText = '🎵 Audio';
    } else if (messageData.message?.documentMessage) {
      messageText = '📄 Document';
    }

    if (!messageText) {
      console.log('⚠️ Could not extract message text');
      return c.json({ success: true, message: 'No text found' });
    }

    // Find organization by instance name
    const instanceName = payload.instance;
    const prefix = 'chat:channels:config:';
    const allConfigs = await kv.getByPrefix<OrganizationChannelConfig>(prefix);
    
    const orgConfig = allConfigs.find(cfg => 
      cfg.whatsapp?.instance_name === instanceName
    );

    if (!orgConfig) {
      console.error('❌ Organization not found for instance:', instanceName);
      return c.json({ success: false, error: 'Organization not found' }, 404);
    }

    const organizationId = orgConfig.organization_id;
    console.log(`✅ Found organization: ${organizationId}`);

    // Find or create conversation
    const conversationsPrefix = `chat:conversation:${organizationId}:`;
    const allConversations = await kv.getByPrefix<Conversation>(conversationsPrefix);
    
    let conversation = allConversations.find(conv => 
      conv.guest_phone?.replace(/\D/g, '').includes(senderPhone) ||
      conv.channel_metadata?.whatsapp_contact_id === senderJid
    );

    if (!conversation) {
      // Create new conversation
      const conversationId = `conv-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      conversation = {
        id: conversationId,
        organization_id: organizationId,
        guest_name: senderName,
        guest_email: '',
        guest_phone: `+${senderPhone}`,
        channel: 'whatsapp',
        status: 'unread',
        category: 'normal',
        conversation_type: 'guest',
        last_message: messageText,
        last_message_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        external_conversation_id: senderJid,
        last_channel: 'whatsapp',
        channel_metadata: {
          whatsapp_contact_id: senderJid
        }
      };
      
      await kv.set(`chat:conversation:${organizationId}:${conversationId}`, conversation);
      console.log(`✅ Created new conversation: ${conversationId}`);
    } else {
      // Update existing conversation
      conversation.last_message = messageText;
      conversation.last_message_at = new Date().toISOString();
      conversation.last_channel = 'whatsapp';
      conversation.status = 'unread';
      conversation.updated_at = new Date().toISOString();
      
      await kv.set(`chat:conversation:${organizationId}:${conversation.id}`, conversation);
      console.log(`✅ Updated conversation: ${conversation.id}`);
    }

    // Create message
    const newMessageId = `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newMessage: Message = {
      id: newMessageId,
      conversation_id: conversation.id,
      sender_type: 'guest',
      sender_name: senderName,
      content: messageText,
      sent_at: new Date(messageData.messageTimestamp * 1000).toISOString(),
      organization_id: organizationId,
      attachments: [],
      channel: 'whatsapp',
      direction: 'incoming',
      external_id: messageId,
      external_status: 'delivered',
      metadata: {
        whatsapp_message_id: messageId,
        media_type: messageData.messageType
      }
    };

    await kv.set(
      `chat:message:${organizationId}:${conversation.id}:${newMessageId}`,
      newMessage
    );

    console.log('✅ WhatsApp message processed successfully');

    return c.json({ 
      success: true, 
      message: 'Message processed',
      data: {
        conversation_id: conversation.id,
        message_id: newMessageId
      }
    });
  } catch (error) {
    console.error('❌ Error processing WhatsApp webhook:', error);
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 500);
  }
});

// ============================================
// 🆕 SMS (Twilio) - v1.0.103+
// ============================================
// NOTE: Estas rotas serão implementadas depois do WhatsApp

// Configure Twilio
chat.post('/channels/sms/configure', async (c) => {
  return c.json({ 
    success: false, 
    error: 'SMS integration will be implemented in v1.0.103+',
    message: 'Feature coming soon!'
  }, 501);
});

// Send SMS
chat.post('/channels/sms/send', async (c) => {
  return c.json({ 
    success: false, 
    error: 'SMS send will be implemented in v1.0.103+',
    message: 'Feature coming soon!'
  }, 501);
});

// Get SMS credits
chat.post('/channels/sms/credits', async (c) => {
  return c.json({ 
    success: false, 
    error: 'SMS credits will be implemented in v1.0.103+',
    message: 'Feature coming soon!'
  }, 501);
});

// Webhook to receive SMS (from Twilio)
chat.post('/channels/sms/webhook', async (c) => {
  return c.json({ 
    success: false, 
    error: 'SMS webhook will be implemented in v1.0.103+',
    message: 'Feature coming soon!'
  }, 501);
});

export default chat;
