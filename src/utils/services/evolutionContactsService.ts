/**
 * RENDIZY - Evolution API Contacts & Chats Sync Service
 * 
 * Importa contatos e conversas da Evolution API automaticamente
 * Igual ao Chatwoot - sincronização automática a cada 5 minutos
 * 
 * @version v1.0.103.164
 * @date 2025-10-31
 */

// ============================================
// TYPES
// ============================================

export interface EvolutionContact {
  id: string; // e.g., "5511987654321@c.us"
  name: string;
  pushname: string;
  isBusiness: boolean;
  profilePicUrl?: string;
  isMyContact: boolean;
}

export interface EvolutionChat {
  id: string; // Same format as contact.id
  name: string;
  lastMessage?: string;
  unreadCount: number;
  timestamp?: number;
}

export interface LocalContact {
  id: string;
  name: string;
  phone: string; // Formatted: +55 11 98765-4321
  profilePicUrl?: string;
  isBusiness: boolean;
  source: 'evolution' | 'manual';
  lastMessage?: string;
  unreadCount: number;
  isOnline: boolean;
  lastSeen?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface SyncStats {
  contactsImported: number;
  contactsUpdated: number;
  chatsImported: number;
  errors: number;
  lastSync: Date;
}

// ============================================
// EVOLUTION CONTACTS SERVICE
// ============================================

export class EvolutionContactsService {
  private apiUrl: string;
  private apiKey: string;
  private instanceName: string;
  private syncInterval: NodeJS.Timeout | null = null;
  private readonly SYNC_INTERVAL_MS = 5 * 60 * 1000; // 5 minutos
  private readonly STORAGE_KEY = 'rendizy_evolution_contacts';

  constructor(apiUrl: string, apiKey: string, instanceName: string) {
    this.apiUrl = apiUrl;
    this.apiKey = apiKey;
    this.instanceName = instanceName;
  }

  /**
   * Fetch contacts from Evolution API
   */
  async fetchContacts(): Promise<EvolutionContact[]> {
    try {
      const url = `${this.apiUrl}/contact/findContacts/${this.instanceName}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        // Silencia erros 404 e outros erros esperados
        return [];
      }

      const data = await response.json();
      console.log(`✅ ${data.length || 0} contatos encontrados`);
      
      return Array.isArray(data) ? data : [];
    } catch (error) {
      // Silencia erros de rede
      return [];
    }
  }

  /**
   * Fetch chats from Evolution API
   */
  async fetchChats(): Promise<EvolutionChat[]> {
    try {
      const url = `${this.apiUrl}/chat/findChats/${this.instanceName}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        // Silencia erros 404 e outros erros esperados
        return [];
      }

      const data = await response.json();
      console.log(`✅ ${data.length || 0} conversas encontradas`);
      
      return Array.isArray(data) ? data : [];
    } catch (error) {
      // Silencia erros de rede
      return [];
    }
  }

  /**
   * Format phone number
   * Input: "5511987654321@c.us"
   * Output: "+55 11 98765-4321"
   */
  private formatPhoneNumber(id: string): string {
    // Remove @c.us or @s.whatsapp.net
    const number = id.replace('@c.us', '').replace('@s.whatsapp.net', '');
    
    // Brazilian format: +55 11 98765-4321
    if (number.startsWith('55') && number.length === 13) {
      const countryCode = number.substring(0, 2);
      const areaCode = number.substring(2, 4);
      const firstPart = number.substring(4, 9);
      const secondPart = number.substring(9, 13);
      return `+${countryCode} ${areaCode} ${firstPart}-${secondPart}`;
    }
    
    // Default: just add +
    return `+${number}`;
  }

  /**
   * Merge contact with chat data
   */
  private mergeContactWithChat(
    contact: EvolutionContact,
    chat?: EvolutionChat
  ): LocalContact {
    return {
      id: contact.id,
      name: contact.name || contact.pushname || 'Sem nome',
      phone: this.formatPhoneNumber(contact.id),
      profilePicUrl: contact.profilePicUrl,
      isBusiness: contact.isBusiness,
      source: 'evolution',
      lastMessage: chat?.lastMessage,
      unreadCount: chat?.unreadCount || 0,
      isOnline: contact.isMyContact,
      lastSeen: chat?.timestamp ? new Date(chat.timestamp * 1000) : undefined,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  /**
   * Sync contacts and chats
   */
  async syncContactsAndChats(): Promise<SyncStats> {
    console.log('🔄 Iniciando sincronização de contatos e conversas...');
    
    const stats: SyncStats = {
      contactsImported: 0,
      contactsUpdated: 0,
      chatsImported: 0,
      errors: 0,
      lastSync: new Date()
    };

    try {
      // Buscar contatos e chats em paralelo
      const [contacts, chats] = await Promise.all([
        this.fetchContacts(),
        this.fetchChats()
      ]);

      // Criar mapa de chats por ID para acesso rápido
      const chatsMap = new Map<string, EvolutionChat>();
      chats.forEach(chat => {
        chatsMap.set(chat.id, chat);
        stats.chatsImported++;
      });

      // Carregar contatos existentes do localStorage
      const existingContacts = this.getStoredContacts();
      const existingContactsMap = new Map<string, LocalContact>();
      existingContacts.forEach(contact => {
        existingContactsMap.set(contact.id, contact);
      });

      // Processar cada contato
      const updatedContacts: LocalContact[] = [];
      
      for (const contact of contacts) {
        const chat = chatsMap.get(contact.id);
        const localContact = this.mergeContactWithChat(contact, chat);
        
        // Verificar se já existe
        const existing = existingContactsMap.get(contact.id);
        
        if (existing) {
          // Atualizar contato existente
          localContact.createdAt = existing.createdAt;
          stats.contactsUpdated++;
        } else {
          // Novo contato
          stats.contactsImported++;
        }
        
        updatedContacts.push(localContact);
      }

      // Salvar no localStorage
      this.saveContacts(updatedContacts);

      console.log('✅ Sincronização concluída:', stats);
      
      return stats;
    } catch (error) {
      console.error('❌ Erro na sincronização:', error);
      stats.errors++;
      return stats;
    }
  }

  /**
   * Get stored contacts from localStorage
   */
  getStoredContacts(): LocalContact[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (!stored) return [];
      
      const contacts = JSON.parse(stored);
      
      // Parse dates
      return contacts.map((c: any) => ({
        ...c,
        createdAt: new Date(c.createdAt),
        updatedAt: new Date(c.updatedAt),
        lastSeen: c.lastSeen ? new Date(c.lastSeen) : undefined
      }));
    } catch (error) {
      console.error('Error loading contacts from storage:', error);
      return [];
    }
  }

  /**
   * Save contacts to localStorage
   */
  private saveContacts(contacts: LocalContact[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(contacts));
      console.log(`💾 ${contacts.length} contatos salvos no localStorage`);
    } catch (error) {
      console.error('Error saving contacts to storage:', error);
    }
  }

  /**
   * Start automatic sync (every 5 minutes)
   */
  startAutoSync(): void {
    if (this.syncInterval) {
      console.warn('⚠️ Auto-sync já está ativo');
      return;
    }

    console.log('🔄 Iniciando sincronização automática (a cada 5 minutos)...');
    
    // Sync imediata
    this.syncContactsAndChats();
    
    // Sync a cada 5 minutos
    this.syncInterval = setInterval(() => {
      console.log('🔄 Sincronização automática agendada...');
      this.syncContactsAndChats();
    }, this.SYNC_INTERVAL_MS);
  }

  /**
   * Stop automatic sync
   */
  stopAutoSync(): void {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
      console.log('⏹️ Sincronização automática parada');
    }
  }

  /**
   * Search contacts by name or phone
   */
  searchContacts(query: string): LocalContact[] {
    const contacts = this.getStoredContacts();
    const lowerQuery = query.toLowerCase();
    
    return contacts.filter(contact => 
      contact.name.toLowerCase().includes(lowerQuery) ||
      contact.phone.includes(lowerQuery)
    );
  }

  /**
   * Filter contacts by criteria
   */
  filterContacts(filters: {
    unreadOnly?: boolean;
    businessOnly?: boolean;
    onlineOnly?: boolean;
  }): LocalContact[] {
    let contacts = this.getStoredContacts();
    
    if (filters.unreadOnly) {
      contacts = contacts.filter(c => c.unreadCount > 0);
    }
    
    if (filters.businessOnly) {
      contacts = contacts.filter(c => c.isBusiness);
    }
    
    if (filters.onlineOnly) {
      contacts = contacts.filter(c => c.isOnline);
    }
    
    return contacts;
  }

  /**
   * Get contact by ID
   */
  getContactById(id: string): LocalContact | undefined {
    const contacts = this.getStoredContacts();
    return contacts.find(c => c.id === id);
  }

  /**
   * Clear all contacts
   */
  clearContacts(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    console.log('🗑️ Todos os contatos foram removidos');
  }
}

// ============================================
// SINGLETON INSTANCE
// ============================================

let serviceInstance: EvolutionContactsService | null = null;

/**
 * Get or create Evolution Contacts Service instance
 */
export function getEvolutionContactsService(): EvolutionContactsService {
  if (!serviceInstance) {
    // Configuration from environment or defaults
    const apiUrl = 'https://evo.boravendermuito.com.br/api';
    const apiKey = '4de7861e944e291b56fe9781d2b00b36';
    const instanceName = 'Rendizy';
    
    serviceInstance = new EvolutionContactsService(apiUrl, apiKey, instanceName);
  }
  
  return serviceInstance;
}

/**
 * Initialize Evolution Contacts Service
 * Call this once when app starts
 */
export function initializeEvolutionContactsService(): void {
  const service = getEvolutionContactsService();
  service.startAutoSync();
  console.log('✅ Evolution Contacts Service inicializado');
}
