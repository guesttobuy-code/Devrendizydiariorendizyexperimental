import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BUILD_INFO from './CACHE_BUSTER';
import { enableMockMode } from './utils/mockBackend';
import { setOfflineMode } from './utils/offlineConfig';
import { useCalendarManager } from './hooks/useCalendarManager';
import { MainSidebar } from './components/MainSidebar';
import { ModulePlaceholder } from './components/ModulePlaceholder';
import { VersionBadge } from './components/VersionBadge';
import { BuildLogger } from './components/BuildLogger';
import { Calendar } from './components/CalendarGrid';
import { PriceEditModal } from './components/PriceEditModal';
import { PropertySidebar } from './components/PropertySidebar';
import { CalendarHeader } from './components/CalendarHeader';
import { QuickActionsModal } from './components/QuickActionsModal';
import { ReservationPreviewModal } from './components/ReservationPreviewModal';
import { ReservationDetailsModal } from './components/ReservationDetailsModal';
import { CreateReservationWizard } from './components/CreateReservationWizard';
import { MinNightsEditModal } from './components/MinNightsEditModal';
import { BlockModal } from './components/BlockModal';
import { BlockDetailsModal } from './components/BlockDetailsModal';
import { QuotationModal } from './components/QuotationModal';
import { ListView } from './components/ListView';
import { TimelineView } from './components/TimelineView';
import { ExportModal } from './components/ExportModal';
import { TagsManagementModal } from './components/TagsManagementModal';
import { EditReservationWizard } from './components/EditReservationWizard';
import { PriceTiersModal } from './components/PriceTiersModal';
import { SeasonalityModal } from './components/SeasonalityModal';
import { CancelReservationModal } from './components/CancelReservationModal';
import { LocationsManager } from './components/LocationsManager';
import { IconsPreview } from './components/IconsPreview';
import { FontSelector } from './components/FontSelector';
import { SettingsPanel } from './components/SettingsPanel';
import { DatabaseInitializer } from './components/DatabaseInitializer';
import { ApiErrorBanner } from './components/ApiErrorBanner';
import { DebugBannerToggle } from './components/DebugBannerToggle';
import { ConflictAlert } from './components/ConflictAlert';
import { DashboardInicial } from './components/DashboardInicial';
import { AdminMasterFunctional } from './components/AdminMasterFunctional';
import { TenantManagement } from './components/TenantManagement';
import { UserManagement } from './components/UserManagement';
import { ReservationsManagement } from './components/ReservationsManagement';
import { BookingComIntegration } from './components/BookingComIntegration';
import { LocationsAndListings } from './components/LocationsAndListings';
import { PropertiesManagement } from './components/PropertiesManagement';
import { SettingsManager } from './components/SettingsManager';
import { BulkPricingManager } from './components/BulkPricingManager';
import { ChatInbox } from './components/ChatInbox';
import { ChatInboxWithEvolution } from './components/ChatInboxWithEvolution';
import { GuestsManager } from './components/GuestsManager';
import { ClientSitesManager } from './components/ClientSitesManager';
import { NotFoundPage } from './components/NotFoundPage';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { EmergencyHomeButton } from './components/EmergencyHomeButton';
import { EmergencyAdminBanner } from './components/EmergencyAdminBanner';
import { EmergencyRouter } from './components/EmergencyRouter';
import { PropertyWizardPage } from './pages/PropertyWizardPage';
import FinanceiroModule from './components/financeiro/FinanceiroModule';
import FinanceiroDashboard from './components/financeiro/FinanceiroDashboard';
import CRMTasksModule from './components/crm/CRMTasksModule';
import CRMTasksDashboard from './components/crm/CRMTasksDashboard';
import BIModule from './components/bi/BIModule';
import BIDashboard from './components/bi/BIDashboard';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { AppRouter } from './components/AppRouter';
import { LoadingProgress } from './components/LoadingProgress';
import { AutoFixWhatsAppApiKey } from './components/AutoFixWhatsAppApiKey';
import { BackendHealthBanner } from './components/BackendHealthBanner';
import { SmartBackendBanner } from './components/SmartBackendBanner';
import { BackendStatusIndicator } from './components/BackendStatusIndicator';
import { EnvironmentBadge } from './components/EnvironmentBadge';
import { initAutoRecovery } from './utils/autoRecovery';
import { ChevronLeft, ChevronRight, Plus, Filter, Download, Tag, Sparkles, TrendingUp, Database, AlertTriangle } from 'lucide-react';
import { detectConflicts } from './utils/conflictDetection';
import { Button } from './components/ui/button';
import { toast } from 'sonner';
import { Toaster } from './components/ui/sonner';
import { reservationsApi, guestsApi, propertiesApi, calendarApi } from './utils/api';
import { cn } from './components/ui/utils';

// Types
export interface Property {
  id: string;
  name: string;
  image: string;
  type: string;
  location: string;
  tarifGroup: string;
  tags?: string[];
}

export interface Reservation {
  id: string;
  propertyId: string;
  guestName: string;
  checkIn: Date;
  checkOut: Date;
  status: 'confirmed' | 'pending' | 'blocked' | 'maintenance';
  platform: 'airbnb' | 'booking' | 'direct' | 'decolar';
  price: number;
  nights: number;
}

export interface PriceRule {
  id: string;
  propertyId: string;
  startDate: Date;
  endDate: Date;
  daysOfWeek: number[]; // 0-6 (Dom-Sáb)
  basePrice: number;
}

// Mock data
const mockProperties: Property[] = [
  {
    id: '1',
    name: 'Arraial Novo - Barra da Tijuca RJ',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=100&h=100&fit=crop',
    type: 'Casa',
    location: 'Barra da Tijuca, RJ',
    tarifGroup: 'Praia',
    tags: ['Praia', 'Luxo']
  },
  {
    id: '2',
    name: 'Casa 003 - Itaúnas RJ',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=100&h=100&fit=crop',
    type: 'Casa',
    location: 'Itaúnas, RJ',
    tarifGroup: 'Praia',
    tags: ['Praia']
  },
  {
    id: '3',
    name: 'Studio Centro - RJ',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=100&h=100&fit=crop',
    type: 'Apartamento',
    location: 'Centro, RJ',
    tarifGroup: 'Padrão',
    tags: ['Cidade']
  },
  {
    id: '4',
    name: 'MARICÁ - RESERVA TIPO CASA',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=100&h=100&fit=crop',
    type: 'Casa',
    location: 'Maricá, RJ',
    tarifGroup: 'Padrão',
    tags: ['Praia', 'Montanha']
  }
];

const mockReservations: Reservation[] = [
  {
    id: 'r1',
    propertyId: '1',
    guestName: 'Juliana Aparecida',
    checkIn: new Date(2025, 9, 27), // Oct 27
    checkOut: new Date(2025, 9, 30), // Oct 30
    status: 'confirmed',
    platform: 'airbnb',
    price: 1244.10,
    nights: 3
  },
  {
    id: 'r2',
    propertyId: '2',
    guestName: 'Marco Aurelio',
    checkIn: new Date(2025, 10, 5), // Nov 5
    checkOut: new Date(2025, 10, 8), // Nov 8
    status: 'confirmed',
    platform: 'booking',
    price: 980.00,
    nights: 3
  },
  {
    id: 'r3',
    propertyId: '1',
    guestName: 'Arthur Neves',
    checkIn: new Date(2025, 10, 15), // Nov 15
    checkOut: new Date(2025, 10, 18), // Nov 18
    status: 'pending',
    platform: 'direct',
    price: 1100.00,
    nights: 3
  },
  {
    id: 'r4',
    propertyId: '4',
    guestName: 'Manutenção',
    checkIn: new Date(2025, 10, 1), // Nov 1
    checkOut: new Date(2025, 10, 3), // Nov 3
    status: 'maintenance',
    platform: 'direct',
    price: 0,
    nights: 2
  }
];

function App() {
  const [activeModule, setActiveModule] = useState('painel-inicial');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 9, 1)); // October 2025
  const [properties, setProperties] = useState<Property[]>(mockProperties);
  const [selectedProperties, setSelectedProperties] = useState<string[]>(mockProperties.map(p => p.id));
  const [reservations, setReservations] = useState<Reservation[]>(mockReservations);
  const [blocks, setBlocks] = useState<any[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [loadingProperties, setLoadingProperties] = useState(false);
  const [showErrorBanner, setShowErrorBanner] = useState(false);
  const [errorBannerDismissed, setErrorBannerDismissed] = useState(false); // Novo: rastreia se foi dispensado
  const [initialLoading, setInitialLoading] = useState(false); // 🔥 COMEÇA COMO FALSE - sem loading!
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(2025, 9, 24), // Oct 24
    to: new Date(2025, 10, 11) // Nov 11
  });

  // 🚨 FIX v1.0.103.153: Garantir que loading nunca fica travado
  useEffect(() => {
    // Se loading ainda estiver ativo após 5 segundos, força desativar
    const emergencyTimeout = setTimeout(() => {
      if (initialLoading || loadingProperties) {
        console.error('🚨 EMERGENCY FIX: Loading travado detectado!');
        console.log('🔧 Forçando finalização do loading...');
        setInitialLoading(false);
        setLoadingProperties(false);
        toast.success('Sistema carregado (modo emergência)');
      }
    }, 5000);

    return () => clearTimeout(emergencyTimeout);
  }, [initialLoading, loadingProperties]);

  // 🚀 SISTEMA DE AUTO-RECUPERAÇÃO v1.0.103.157 - DESABILITADO
  useEffect(() => {
    console.log('⚠️ Auto-recuperação DESABILITADA (v1.0.103.157)');
    // 🔥 DESABILITADO - estava causando loop infinito
    // initAutoRecovery();
    
    // Ativa modo mock diretamente
    enableMockMode();
    setOfflineMode(true);
    console.log('✅ Modo Mock e Offline ativados! Sistema funcionando localmente.');
    
    // 📱 DESABILITADO v1.0.103.169 - Evolution Contacts Service
    // Evita "Failed to fetch" quando backend está offline
    /*
    try {
      const { initializeEvolutionContactsService } = require('./utils/services/evolutionContactsService');
      initializeEvolutionContactsService();
      console.log('✅ Evolution Contacts Service iniciado - Sync automática a cada 5 min');
    } catch (error) {
      console.warn('⚠️ Evolution Contacts Service não pôde ser iniciado:', error);
    }
    */
    console.log('⚠️ Evolution Contacts Service DESABILITADO - Evita erro quando backend offline');
  }, []);

  const [selectedReservationTypes, setSelectedReservationTypes] = useState<string[]>([
    'pre-reserva',
    'reserva',
    'contrato',
    'bloqueado',
    'manutencao',
    'cancelada'
  ]);
  
  const [priceEditModal, setPriceEditModal] = useState<{
    open: boolean;
    propertyId?: string;
    startDate?: Date;
    endDate?: Date;
  }>({ open: false });

  const [minNightsModal, setMinNightsModal] = useState<{
    open: boolean;
    propertyId?: string;
    startDate?: Date;
    endDate?: Date;
  }>({ open: false });

  const [quickActionsModal, setQuickActionsModal] = useState<{
    open: boolean;
    propertyId?: string;
    startDate?: Date;
    endDate?: Date;
  }>({ open: false });

  const [reservationPreviewModal, setReservationPreviewModal] = useState<{
    open: boolean;
    reservation?: Reservation;
  }>({ open: false });

  const [createReservationWizard, setCreateReservationWizard] = useState<{
    open: boolean;
    propertyId?: string;
    startDate?: Date;
    endDate?: Date;
  }>({ open: false });

  const [blockModal, setBlockModal] = useState<{
    open: boolean;
    propertyId?: string;
    startDate?: Date;
    endDate?: Date;
  }>({ open: false });

  const [blockDetailsModal, setBlockDetailsModal] = useState<{
    open: boolean;
    block?: any;
  }>({ open: false });

  const [quotationModal, setQuotationModal] = useState<{
    open: boolean;
    propertyId?: string;
    startDate?: Date;
    endDate?: Date;
  }>({ open: false });

  const [reservationDetailsModal, setReservationDetailsModal] = useState<{
    open: boolean;
    reservation?: Reservation;
  }>({ open: false });

  const [exportModal, setExportModal] = useState(false);
  const [tagsModal, setTagsModal] = useState(false);
  const [currentView, setCurrentView] = useState<'calendar' | 'list' | 'timeline'>('calendar');
  
  const [editReservationWizard, setEditReservationWizard] = useState<{
    open: boolean;
    reservation?: Reservation;
  }>({ open: false });

  const [priceTiersModal, setPriceTiersModal] = useState<{
    open: boolean;
    propertyId?: string;
    startDate?: Date;
    endDate?: Date;
  }>({ open: false });

  const [seasonalityModal, setSeasonalityModal] = useState<{
    open: boolean;
    propertyId?: string;
  }>({ open: false });

  const [cancelReservationModal, setCancelReservationModal] = useState<{
    open: boolean;
    reservation?: Reservation;
  }>({ open: false });

  const [databaseInitModal, setDatabaseInitModal] = useState(false);
  const [conflicts, setConflicts] = useState<any[]>([]);
  const [showConflictAlert, setShowConflictAlert] = useState(true);

  // Função para forçar carregamento com dados mock
  const forceLoad = useCallback(() => {
    console.log('⚡ [FORCE LOAD] Carregamento forçado pelo usuário!');
    setProperties(mockProperties);
    setSelectedProperties(mockProperties.map(p => p.id));
    setReservations(mockReservations);
    setBlocks([]);
    setLoadingProperties(false);
    setInitialLoading(false);
    toast.success('Sistema carregado com dados locais!');
  }, []);

  // 🔥 DESABILITADO - initialLoading já começa como false!
  /*
  // Log build info on mount + Force load imediato
  useEffect(() => {
    console.log('🎯 APP INITIALIZED - BUILD INFO:', BUILD_INFO);
    console.log('📅 Version:', BUILD_INFO.version);
    console.log('🔨 Build:', BUILD_INFO.build);
    console.log('⏰ Timestamp:', BUILD_INFO.timestamp);
    console.log('📝 Changes:', BUILD_INFO.changes);
    console.log('⚡ [AUTO-LOAD] initialLoading inicial:', initialLoading);
    
    // 🔥 FORCE LOAD IMEDIATO - sem dependências, roda apenas 1 vez
    console.log('⚡ [AUTO-LOAD] Iniciando carregamento...');
    const loadTimer = setTimeout(() => {
      console.log('⚡ [AUTO-LOAD] Timeout disparado! Carregando dados...');
      setProperties(mockProperties);
      setSelectedProperties(mockProperties.map(p => p.id));
      setReservations(mockReservations);
      setBlocks([]);
      setLoadingProperties(false);
      setInitialLoading(false);
      console.log('✅ [AUTO-LOAD] initialLoading setado para FALSE!');
      toast.success('Sistema carregado!');
    }, 100);
    
    return () => {
      console.log('⚠️ [AUTO-LOAD] Cleanup');
      clearTimeout(loadTimer);
    };
  }, []); // ✅ Array vazio = roda apenas 1 vez, sem loop
  */
  
  // Log apenas uma vez
  console.log('🎯 APP INITIALIZED - v1.0.103.159 - initialLoading:', initialLoading);
  
  // 🔥 FIX v1.0.103.157: FORCE LOAD IMEDIATO - SEMPRE FUNCIONA
  useEffect(() => {
    console.log('⚡ [BRUTAL FIX] Carregando sistema IMEDIATAMENTE...');
    
    // Carrega dados mock SEM delay
    setProperties(mockProperties);
    setSelectedProperties(mockProperties.map(p => p.id));
    setReservations(mockReservations);
    setBlocks([]);
    
    // Desativa loading
    setLoadingProperties(false);
    setInitialLoading(false);
    
    console.log('✅ [BRUTAL FIX] Sistema carregado! Dados mock prontos.');
    toast.success('Sistema carregado!', { duration: 2000 });
  }, []); // Roda apenas UMA vez

  // Detectar conflitos sempre que as reservas mudarem
  useEffect(() => {
    const { conflicts: detectedConflicts, reservationsWithConflicts } = detectConflicts(
      reservations,
      properties
    );
    
    setConflicts(detectedConflicts);
    
    // Atualizar reservas com flag de conflito
    if (detectedConflicts.length > 0) {
      setReservations(reservationsWithConflicts as Reservation[]);
      console.warn('⚠️ OVERBOOKING DETECTADO:', {
        conflictsCount: detectedConflicts.length,
        conflicts: detectedConflicts
      });
    }
  }, [reservations.length]);

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handlePriceEdit = (propertyId: string, startDate: Date, endDate: Date) => {
    setPriceEditModal({
      open: true,
      propertyId,
      startDate,
      endDate
    });
  };

  const handlePriceSave = (rule: Omit<PriceRule, 'id'>) => {
    console.log('💰 Salvando regra de preço:', rule);
    console.log('📦 Build Info:', BUILD_INFO);
    toast.success('Preços atualizados com sucesso!');
    setPriceEditModal({ open: false });
  };

  const handleMinNightsEdit = (propertyId: string, startDate: Date, endDate: Date) => {
    setMinNightsModal({
      open: true,
      propertyId,
      startDate,
      endDate
    });
  };

  const handleMinNightsSave = (data: any) => {
    console.log('Salvando mínimo de noites:', data);
    toast.success('Mínimo de noites atualizado!');
    setMinNightsModal({ open: false });
  };

  const handleEmptyClick = (propertyId: string, startDate: Date, endDate: Date) => {
    setQuickActionsModal({
      open: true,
      propertyId,
      startDate,
      endDate
    });
  };

  const handleQuickAction = (action: 'reservation' | 'quote' | 'predictive' | 'maintenance' | 'tiers' | 'seasonality') => {
    const { propertyId, startDate, endDate } = quickActionsModal;
    setQuickActionsModal({ open: false });
    
    if (action === 'reservation') {
      setCreateReservationWizard({
        open: true,
        propertyId,
        startDate,
        endDate
      });
    } else if (action === 'quote') {
      setQuotationModal({
        open: true,
        propertyId,
        startDate,
        endDate
      });
    } else if (action === 'predictive' || action === 'maintenance' || action === 'block') {
      // Todos os tipos de bloqueio usam o mesmo modal unificado
      setBlockModal({
        open: true,
        propertyId,
        startDate,
        endDate
      });
    } else if (action === 'tiers') {
      setPriceTiersModal({
        open: true,
        propertyId,
        startDate,
        endDate
      });
    } else if (action === 'seasonality') {
      setSeasonalityModal({
        open: true,
        propertyId
      });
    }
  };

  const handleReservationClick = (reservation: Reservation) => {
    setReservationPreviewModal({
      open: true,
      reservation
    });
  };

  const handleOpenReservationDetails = () => {
    const reservation = reservationPreviewModal.reservation;
    setReservationPreviewModal({ open: false });
    if (reservation) {
      setReservationDetailsModal({
        open: true,
        reservation
      });
    }
  };

  const handleOpenBlockDetails = (block: any) => {
    setBlockDetailsModal({
      open: true,
      block
    });
  };

  const handleBlockUpdate = () => {
    // Atualizar lista de bloqueios e reservas
    setRefreshKey(prev => prev + 1);
  };

  const handleBlockDelete = () => {
    // Atualizar lista de bloqueios e reservas
    setRefreshKey(prev => prev + 1);
  };

  // Initialize mock mode and check data consistency on mount
  useEffect(() => {
    // Garantir que mock mode está ativado
    enableMockMode();
    console.log('🎭 Mock mode garantido como ATIVADO');
    
    const checkDataConsistency = () => {
      try {
        const mockData = localStorage.getItem('rendizy_mock_data');
        if (mockData) {
          const data = JSON.parse(mockData);
          // Check if there are reservations with invalid propertyIds
          if (data.reservations && data.properties) {
            const propertyIds = new Set(data.properties.map((p: any) => p.id));
            const hasInvalidReservations = data.reservations.some(
              (r: any) => !propertyIds.has(r.propertyId)
            );
            if (hasInvalidReservations) {
              console.warn('⚠️ Dados inconsistentes detectados no localStorage');
              console.log('🟣 Ativando banner de erro');
              if (!errorBannerDismissed) {
                setShowErrorBanner(true);
              }
            } else {
              console.log('✅ Dados consistentes no localStorage');
            }
          }
        }
      } catch (error) {
        console.error('Erro ao verificar consistência dos dados:', error);
      }
    };
    
    checkDataConsistency();
  }, []);

  // Load properties from API - 🔥 DESABILITADO v1.0.103.157
  useEffect(() => {
    console.log('⚠️ [DESABILITADO] Load properties from API desabilitado - usando force load');
    return; // 🔥 DESABILITA COMPLETAMENTE
    
    const loadProperties = async () => {
      setLoadingProperties(true);
      console.log('🔄 [LOADING] Iniciando carregamento de propriedades...');
      
      // Timeout REDUZIDO para 3 segundos - carregamento mais rápido
      const timeoutId = setTimeout(() => {
        console.warn('⚠️ Timeout ao carregar propriedades (3s), usando mock data');
        toast.warning('Carregando dados locais (backend lento)', { duration: 3000 });
        setProperties(mockProperties);
        setSelectedProperties(mockProperties.map(p => p.id));
        setLoadingProperties(false);
      }, 3000); // REDUZIDO DE 5s PARA 3s
      
      try {
        const response = await propertiesApi.list();
        clearTimeout(timeoutId); // Cancela timeout se resposta chegar
        console.log('✅ [LOADING] Propriedades carregadas com sucesso!');
        
        if (response.success && response.data && response.data.length > 0) {
          // Convert API properties to App Property format
          const apiProperties = response.data.map((p: any) => ({
            id: p.id || '',
            name: p.internalName || p.name || 'Sem nome',
            image: p.photos?.[0] || 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=100&h=100&fit=crop',
            type: p.type || 'Casa',
            location: `${p.address?.city || 'N/A'}, ${p.address?.state || 'N/A'}`,
            tarifGroup: p.tarifGroup || 'Padrão',
            tags: p.tags || []
          })).filter((p: Property) => p.id); // Remove propriedades sem ID
          
          console.log('✅ Propriedades carregadas do backend:', apiProperties);
          setProperties(apiProperties);
          setSelectedProperties(apiProperties.map((p: Property) => p.id));
        } else {
          console.log('ℹ️ Nenhuma propriedade encontrada no backend, usando mock data');
          setProperties(mockProperties);
          setSelectedProperties(mockProperties.map(p => p.id));
        }
      } catch (error) {
        clearTimeout(timeoutId); // Cancela timeout se der erro
        console.error('Erro ao carregar propriedades:', error);
        console.log('⚠️ Usando mock data devido ao erro');
        console.log('🟣 Ativando banner de erro (erro ao carregar propriedades)');
        if (!errorBannerDismissed) {
          setShowErrorBanner(true);
        }
        setProperties(mockProperties);
        setSelectedProperties(mockProperties.map(p => p.id));
      } finally {
        setLoadingProperties(false);
        setInitialLoading(false); // Desativa loading inicial
      }
    };

    loadProperties();
  }, []);

  // Load reservations from API - 🔥 DESABILITADO v1.0.103.157
  useEffect(() => {
    console.log('⚠️ [DESABILITADO] Load reservations from API desabilitado - usando force load');
    return; // 🔥 DESABILITA COMPLETAMENTE
    
    const loadReservations = async () => {
      console.log('🔄 [LOADING] Iniciando carregamento de reservas...');
      
      // Timeout REDUZIDO para 3 segundos - carregamento mais rápido
      const timeoutId = setTimeout(() => {
        console.warn('⚠️ Timeout ao carregar reservas (3s), usando mock data');
        toast.warning('Carregando dados locais (backend lento)', { duration: 3000 });
        setReservations(mockReservations);
        setBlocks([]);
      }, 3000); // REDUZIDO DE 5s PARA 3s
      
      try {
        // Calcular intervalo de datas (3 meses antes até 6 meses depois)
        const today = new Date();
        const startDate = new Date(today.getFullYear(), today.getMonth() - 3, 1);
        const endDate = new Date(today.getFullYear(), today.getMonth() + 6, 30);
        
        const [reservationsResponse, guestsResponse, calendarResponse] = await Promise.all([
          reservationsApi.list(),
          guestsApi.list(),
          calendarApi.getData({
            startDate: startDate.toISOString().split('T')[0],
            endDate: endDate.toISOString().split('T')[0],
            includeBlocks: true,
            includePrices: false
          })
        ]);
        
        clearTimeout(timeoutId); // Cancela timeout se resposta chegar
        
        if (reservationsResponse.success && reservationsResponse.data) {
          const guests = guestsResponse.data || [];
          
          // Convert API reservations to App Reservation format
          const apiReservations = reservationsResponse.data.map((r: any) => {
            const guest = guests.find((g: any) => g.id === r.guestId);
            
            // Parse dates properly to avoid timezone issues
            // r.checkIn and r.checkOut are in 'YYYY-MM-DD' format
            const [ciYear, ciMonth, ciDay] = r.checkIn.split('-').map(Number);
            const [coYear, coMonth, coDay] = r.checkOut.split('-').map(Number);
            
            return {
              id: r.id,
              propertyId: r.propertyId,
              guestName: guest ? guest.fullName : 'Hóspede',
              checkIn: new Date(ciYear, ciMonth - 1, ciDay),
              checkOut: new Date(coYear, coMonth - 1, coDay),
              status: r.status,
              platform: r.platform,
              price: r.pricing.total / 100, // Convert cents to reais
              nights: r.nights
            };
          });
          
          console.log('✅ Reservas carregadas do backend:', apiReservations);
          setReservations(apiReservations);
          
          // Carregar bloqueios do calendário
          if (calendarResponse.success && calendarResponse.data?.blocks) {
            console.log('✅ Bloqueios carregados do backend:', calendarResponse.data.blocks);
            setBlocks(calendarResponse.data.blocks);
          }
        } else if (!reservationsResponse.success && reservationsResponse.error === 'Property not found') {
          // Specific error for property not found - USA MOCK
          console.error('🔴 ERRO: Property not found, usando mock data');
          setReservations(mockReservations);
          setBlocks([]);
          if (!errorBannerDismissed) {
            setShowErrorBanner(true);
          }
        } else if (!reservationsResponse.success) {
          // Outro erro da API - USA MOCK
          console.error('🔴 ERRO NA API:', reservationsResponse.error);
          console.log('⚠️ Usando mock data');
          setReservations(mockReservations);
          setBlocks([]);
          if (!errorBannerDismissed) {
            setShowErrorBanner(true);
          }
        }
      } catch (error) {
        clearTimeout(timeoutId); // Cancela timeout se der erro
        console.error('🔴 ERRO AO CARREGAR RESERVAS:', error);
        console.log('⚠️ Usando mock data devido ao erro');
        setReservations(mockReservations);
        setBlocks([]);
        if (!errorBannerDismissed) {
          setShowErrorBanner(true);
        }
      }
    };

    loadReservations();
  }, [refreshKey]);

  // ========================================================================
  // CALENDAR MANAGER - AGENDA VIVA (5 ANOS SEMPRE À FRENTE)
  // ========================================================================
  
  // Memoizar funções para evitar loop infinito
  const getCurrentLastDay = useCallback(() => {
    const today = new Date();
    const fiveYearsAhead = new Date();
    fiveYearsAhead.setFullYear(today.getFullYear() + 5);
    return fiveYearsAhead;
  }, []);

  const handleDaysAdded = useCallback(async (days: any[]) => {
    console.log(`📅 AGENDA ESTENDIDA: ${days.length} novos dias adicionados!`);
    console.log(`   → Primeiro dia: ${days[0]?.date}`);
    console.log(`   → Último dia: ${days[days.length - 1]?.date}`);
    
    // TODO: Enviar para o backend quando integrado
    // await calendarApi.extendCalendar(days);
    
    toast.success(
      `Agenda estendida! ${days.length} novos dias adicionados.`,
      {
        description: `Novo horizonte até ${days[days.length - 1]?.date}`,
        duration: 5000
      }
    );
  }, []);

  const calendarManager = useCalendarManager({
    getCurrentLastDay,
    onDaysAdded: handleDaysAdded,
    enabled: true
  });

  // ========================================================================

  const handleReservationComplete = (data: any) => {
    console.log('Reserva criada:', data);
    toast.success('Reserva criada com sucesso!');
    setCreateReservationWizard({ open: false });
    // Refresh reservations
    setRefreshKey(prev => prev + 1);
  };

  const handleEditReservationComplete = (data: {
    reservationId: string;
    guestName: string;
    guestEmail?: string;
    guestPhone?: string;
    checkIn: Date;
    checkOut: Date;
    totalPrice: number;
    notes?: string;
    sendEmail: boolean;
  }) => {
    console.log('✏️ Editando reserva:', data);
    
    // Atualiza a reserva no estado
    setReservations(prev => prev.map(reservation => {
      if (reservation.id === data.reservationId) {
        // Calcula o novo número de noites
        const nights = Math.ceil(
          (data.checkOut.getTime() - data.checkIn.getTime()) / (1000 * 60 * 60 * 24)
        );
        
        return {
          ...reservation,
          guestName: data.guestName,
          checkIn: data.checkIn,
          checkOut: data.checkOut,
          price: data.totalPrice,
          nights: nights
        };
      }
      return reservation;
    }));
    
    // Log para debug
    console.log('📦 Build Info:', BUILD_INFO);
    
    // Fecha o wizard
    setEditReservationWizard({ open: false });
    
    // Toast já é mostrado pelo EditReservationWizard
  };

  // Função para buscar reserva por código e navegar até ela
  const handleSearchReservation = async (searchQuery: string) => {
    // Detectar se é um código de reserva (RSV-XXXXXX)
    const reservationCodePattern = /^RSV-[A-Z0-9]{6}$/i;
    
    if (reservationCodePattern.test(searchQuery.trim())) {
      console.log('🔍 Buscando reserva:', searchQuery);
      
      // Buscar a reserva nos dados carregados
      const reservation = reservations.find(r => 
        r.id.toUpperCase() === searchQuery.trim().toUpperCase()
      );
      
      if (reservation) {
        console.log('✅ Reserva encontrada:', reservation);
        
        // 1. Navegar para o calendário
        setActiveModule('calendario');
        
        // 2. Ajustar mês para o check-in da reserva
        const checkInMonth = new Date(reservation.checkIn);
        setCurrentMonth(new Date(checkInMonth.getFullYear(), checkInMonth.getMonth(), 1));
        
        // 3. Selecionar a propriedade da reserva
        if (!selectedProperties.includes(reservation.propertyId)) {
          setSelectedProperties(prev => [...prev, reservation.propertyId]);
        }
        
        // 4. Mostrar preview da reserva após navegação
        setTimeout(() => {
          setReservationPreview({
            open: true,
            reservation
          });
        }, 300);
        
        toast.success(`Reserva ${reservation.id} encontrada!`);
        return true;
      } else {
        console.log('❌ Reserva não encontrada:', searchQuery);
        toast.error(`Reserva ${searchQuery} não encontrada`);
        return false;
      }
    }
    
    return false; // Não é um código de reserva
  };

  // Função de busca avançada (busca em tudo)
  const handleAdvancedSearch = (query: string): any[] => {
    if (!query || query.trim().length < 2) {
      return [];
    }

    const normalizedQuery = query.toLowerCase().trim();
    const results: any[] = [];

    // 1. Buscar em RESERVAS por código
    const reservationCodePattern = /^RSV-[A-Z0-9]{6}$/i;
    if (reservationCodePattern.test(query.trim())) {
      const matchingReservations = reservations.filter(r =>
        r.id.toUpperCase().includes(query.trim().toUpperCase())
      );
      matchingReservations.forEach(r => {
        const property = properties.find(p => p.id === r.propertyId);
        results.push({
          type: 'reservation',
          id: r.id,
          title: r.id,
          subtitle: `${r.guestName} • ${property?.name || 'Imóvel'} • ${r.nights} noites`,
          icon: 'Calendar' as const,
          data: r
        });
      });
    }

    // 2. Buscar em HÓSPEDES por nome
    const matchingGuests = reservations.filter(r =>
      r.guestName.toLowerCase().includes(normalizedQuery)
    );
    matchingGuests.forEach(r => {
      const property = properties.find(p => p.id === r.propertyId);
      results.push({
        type: 'guest',
        id: `guest-${r.id}`,
        title: r.guestName,
        subtitle: `${r.id} • ${property?.name || 'Imóvel'} • ${new Date(r.checkIn).toLocaleDateString('pt-BR')}`,
        icon: 'User' as const,
        data: r
      });
    });

    // 3. Buscar em PROPRIEDADES por nome ou localização
    const matchingProperties = properties.filter(p =>
      p.name.toLowerCase().includes(normalizedQuery) ||
      p.location.toLowerCase().includes(normalizedQuery) ||
      p.type.toLowerCase().includes(normalizedQuery)
    );
    matchingProperties.forEach(p => {
      const reservationCount = reservations.filter(r => r.propertyId === p.id).length;
      results.push({
        type: 'property',
        id: p.id,
        title: p.name,
        subtitle: `${p.type} • ${p.location} • ${reservationCount} reservas`,
        icon: 'Home' as const,
        data: p
      });
    });

    // Limitar a 10 resultados
    return results.slice(0, 10);
  };

  // Debug: log do estado do banner
  console.log('🎯 Estado do banner de erro:', showErrorBanner);
  console.log('✅ App renderizando...');

  return (
    <BrowserRouter>
      <ThemeProvider>
      <LanguageProvider>
        {/* 🚨 FAIXA DE EMERGÊNCIA - SEMPRE VISÍVEL NO TOPO */}
        <EmergencyAdminBanner />
        
        {/* 🚨 ROUTER DE EMERGÊNCIA - Redireciona rotas inválidas para Dashboard */}
        <EmergencyRouter />
        
        {/* 🔥 REMOVIDO v1.0.103.158 - Banner que tentava acessar backend */}
        {/* <SmartBackendBanner /> */}
        
        {/* Sincronização URL ↔ Módulo */}
        <AppRouter activeModule={activeModule} setActiveModule={setActiveModule} />
        
        {/* Componentes globais - sempre presentes */}
        <BuildLogger />
        <Toaster />
        {/* 🔥 REMOVIDO v1.0.103.158 - Componentes que tentavam acessar backend */}
        {/* <AutoFixWhatsAppApiKey /> */}
        {/* <BackendHealthBanner /> */}
        {/* <BackendStatusIndicator /> */}
        
        <Routes>
        {/* Módulo Financeiro */}
        <Route path="/financeiro/*" element={<FinanceiroModule />}>
          <Route index element={<FinanceiroDashboard />} />
          <Route path="plano-contas" element={<ModulePlaceholder module="Plano de Contas" />} />
          <Route path="lancamentos" element={<ModulePlaceholder module="Lançamentos" />} />
          <Route path="centro-custos" element={<ModulePlaceholder module="Centro de Custos" />} />
          <Route path="contas-receber" element={<ModulePlaceholder module="Contas a Receber" />} />
          <Route path="contas-pagar" element={<ModulePlaceholder module="Contas a Pagar" />} />
          <Route path="inadimplencia" element={<ModulePlaceholder module="Inadimplência" />} />
          <Route path="conciliacao" element={<ModulePlaceholder module="Conciliação Bancária" />} />
          <Route path="contas-bancarias" element={<ModulePlaceholder module="Contas Bancárias" />} />
          <Route path="dre" element={<ModulePlaceholder module="DRE" />} />
          <Route path="fluxo-caixa" element={<ModulePlaceholder module="Fluxo de Caixa" />} />
          <Route path="relatorios" element={<ModulePlaceholder module="Relatórios Gerenciais" />} />
          <Route path="configuracoes" element={<ModulePlaceholder module="Configurações Financeiras" />} />
        </Route>
        
        {/* Módulo CRM & Tasks - Unificado */}
        <Route path="/crm/*" element={<CRMTasksModule />}>
          <Route index element={<CRMTasksDashboard />} />
          
          {/* Seção Clientes (CRM) */}
          <Route path="contatos" element={<ModulePlaceholder module="Contatos" />} />
          <Route path="leads" element={<ModulePlaceholder module="Leads" />} />
          <Route path="proprietarios" element={<ModulePlaceholder module="Proprietários" />} />
          
          {/* Seção Tarefas (Tasks) */}
          <Route path="minhas-tarefas" element={<ModulePlaceholder module="Minhas Tarefas" />} />
          <Route path="todas-tarefas" element={<ModulePlaceholder module="Todas as Tarefas" />} />
          <Route path="calendario-tarefas" element={<ModulePlaceholder module="Calendário de Tarefas" />} />
          <Route path="equipes" element={<ModulePlaceholder module="Equipes" />} />
          <Route path="prioridades" element={<ModulePlaceholder module="Prioridades" />} />
          
          {/* Seção Vendas (CRM) */}
          <Route path="pipeline" element={<ModulePlaceholder module="Pipeline de Vendas" />} />
          <Route path="propostas" element={<ModulePlaceholder module="Propostas" />} />
          <Route path="negocios" element={<ModulePlaceholder module="Negócios" />} />
          
          {/* Seção Comunicação (CRM) */}
          <Route path="emails" element={<ModulePlaceholder module="E-mails" />} />
          <Route path="chamadas" element={<ModulePlaceholder module="Chamadas" />} />
          <Route path="agenda" element={<ModulePlaceholder module="Agenda" />} />
          
          {/* Seção Análise */}
          <Route path="relatorios" element={<ModulePlaceholder module="Relatórios" />} />
          <Route path="tarefas-arquivadas" element={<ModulePlaceholder module="Tarefas Arquivadas" />} />
          
          {/* Configurações */}
          <Route path="configuracoes" element={<ModulePlaceholder module="Configurações CRM & Tasks" />} />
        </Route>
        
        {/* Módulo BI */}
        <Route path="/bi/*" element={<BIModule />}>
          <Route index element={<BIDashboard />} />
          <Route path="financeiro" element={<ModulePlaceholder module="Relatório Financeiro" />} />
          <Route path="ocupacao" element={<ModulePlaceholder module="Relatório de Ocupação" />} />
          <Route path="reservas" element={<ModulePlaceholder module="Relatório de Reservas" />} />
          <Route path="clientes" element={<ModulePlaceholder module="Relatório de Clientes" />} />
          <Route path="tendencias" element={<ModulePlaceholder module="Análise de Tendências" />} />
          <Route path="comparativos" element={<ModulePlaceholder module="Análises Comparativas" />} />
          <Route path="previsoes" element={<ModulePlaceholder module="Previsões" />} />
          <Route path="construtor" element={<ModulePlaceholder module="Construtor de Relatórios" />} />
          <Route path="meus-relatorios" element={<ModulePlaceholder module="Meus Relatórios" />} />
          <Route path="agendados" element={<ModulePlaceholder module="Relatórios Agendados" />} />
          <Route path="kpis" element={<ModulePlaceholder module="KPIs e Metas" />} />
          <Route path="configuracoes" element={<ModulePlaceholder module="Configurações BI" />} />
        </Route>
        
        {/* ✅ REABILITADO v1.0.103.174 - Rotas properties com MainSidebar sempre visível */}
        <Route path="/properties/new" element={
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
            <MainSidebar
              activeModule='imoveis'
              onModuleChange={setActiveModule}
              collapsed={sidebarCollapsed}
              onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
              onSearchReservation={handleSearchReservation}
              onAdvancedSearch={handleAdvancedSearch}
            />

            <div 
              className={cn(
                "flex flex-col min-h-screen transition-all duration-300",
                sidebarCollapsed ? "lg:ml-20" : "lg:ml-72"
              )}
            >
              <PropertyWizardPage />
            </div>
          </div>
        } />
        
        <Route path="/properties/:id/edit" element={
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
            <MainSidebar
              activeModule='imoveis'
              onModuleChange={setActiveModule}
              collapsed={sidebarCollapsed}
              onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
              onSearchReservation={handleSearchReservation}
              onAdvancedSearch={handleAdvancedSearch}
            />

            <div 
              className={cn(
                "flex flex-col min-h-screen transition-all duration-300",
                sidebarCollapsed ? "lg:ml-20" : "lg:ml-72"
              )}
            >
              <PropertyWizardPage />
            </div>
          </div>
        } />
        
        <Route path="/properties" element={
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
            <LoadingProgress 
              isLoading={initialLoading} 
              onForceLoad={forceLoad}
            />
            
            {showErrorBanner && (
              <div className="fixed top-0 left-0 right-0 z-50">
                <ApiErrorBanner onDismiss={() => {
                  setShowErrorBanner(false);
                  setErrorBannerDismissed(true);
                }} />
              </div>
            )}
            
            <MainSidebar
              activeModule='imoveis'
              onModuleChange={setActiveModule}
              collapsed={sidebarCollapsed}
              onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
              onSearchReservation={handleSearchReservation}
              onAdvancedSearch={handleAdvancedSearch}
            />

            <div 
              className={cn(
                "flex flex-col min-h-screen transition-all duration-300",
                sidebarCollapsed ? "lg:ml-20" : "lg:ml-72",
                showErrorBanner ? 'pt-[80px]' : ''
              )}
            >
              <div className="flex-1 overflow-hidden">
                <PropertiesManagement />
              </div>
            </div>
          </div>
        } />
        
        {/* Rota raiz - Dashboard Inicial */}
        <Route path="/" element={
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
            <LoadingProgress 
              isLoading={initialLoading} 
              onForceLoad={forceLoad}
            />
            
            {showErrorBanner && (
              <div className="fixed top-0 left-0 right-0 z-50">
                <ApiErrorBanner onDismiss={() => {
                  setShowErrorBanner(false);
                  setErrorBannerDismissed(true);
                }} />
              </div>
            )}
            
            <MainSidebar
              activeModule={activeModule}
              onModuleChange={setActiveModule}
              collapsed={sidebarCollapsed}
              onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
              onSearchReservation={handleSearchReservation}
              onAdvancedSearch={handleAdvancedSearch}
            />

            <div 
              className={cn(
                "flex flex-col min-h-screen transition-all duration-300",
                sidebarCollapsed ? "lg:ml-20" : "lg:ml-72",
                showErrorBanner ? 'pt-[80px]' : ''
              )}
            >
              <DashboardInicial
                conflicts={conflicts}
                onReservationClick={handleReservationClick}
                onDismissConflictAlert={() => setShowConflictAlert(false)}
                reservations={reservations}
                properties={properties}
              />
            </div>
          </div>
        } />
        
        {/* Rota padrão - App principal */}
        <Route path="*" element={
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
          
            {/* Loading Progress - Modal bloqueante */}
            <LoadingProgress 
              isLoading={initialLoading} 
              onForceLoad={forceLoad}
            />
          
            {/* API Error Banner */}
            {showErrorBanner && (
              <div className="fixed top-0 left-0 right-0 z-50">
                <ApiErrorBanner onDismiss={() => {
                  setShowErrorBanner(false);
                  setErrorBannerDismissed(true); // Marca como dispensado para não aparecer novamente
                }} />
              </div>
            )}
            
            {/* Main Sidebar - Fixed */}
            <MainSidebar
              activeModule={activeModule}
              onModuleChange={setActiveModule}
              collapsed={sidebarCollapsed}
              onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
              onSearchReservation={handleSearchReservation}
              onAdvancedSearch={handleAdvancedSearch}
            />

            {/* Main Content - With margin to compensate fixed sidebar */}
            <div 
              className={cn(
                "flex flex-col min-h-screen transition-all duration-300",
                sidebarCollapsed ? "lg:ml-20" : "lg:ml-72",
                showErrorBanner ? 'pt-[80px]' : ''
              )}
            >
              {/* Renderizar Calendário ou Placeholder baseado no módulo ativo */}
              {activeModule === 'calendario' ? (
          <>
            {/* Header */}
            <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30 transition-colors">
        <div className="px-6 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-gray-900 dark:text-gray-100">Calendário Geral</h1>
              <VersionBadge />
              <LanguageSwitcher />
              
              {/* Month navigation */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevMonth}
                  className="h-8 w-8"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                <div className="min-w-[200px] text-center">
                  <span className="text-gray-900 dark:text-gray-100">
                    {currentMonth.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
                  </span>
                </div>
                
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextMonth}
                  className="h-8 w-8"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setDatabaseInitModal(true)}
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              >
                <Database className="h-4 w-4 mr-2" />
                Inicializar DB
              </Button>
              <DebugBannerToggle 
                show={showErrorBanner}
                onToggle={() => {
                  setShowErrorBanner(!showErrorBanner);
                  if (!showErrorBanner) {
                    setErrorBannerDismissed(false); // Permite reativar
                  }
                }}
              />
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setSeasonalityModal({ open: true })}
                className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Sazonalidade
              </Button>
              <Button variant="outline" size="sm" onClick={() => setTagsModal(true)}>
                <Tag className="h-4 w-4 mr-2" />
                Tags
              </Button>
              <Button variant="outline" size="sm" onClick={() => setExportModal(true)}>
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Nova Reserva
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content - Container Flex sem rolagem lateral */}
      <div className="flex h-[calc(100vh-56px)] overflow-hidden">
        {/* Sidebar - Fixo */}
        <PropertySidebar
          properties={properties}
          selectedProperties={selectedProperties}
          onToggleProperty={(id) => {
            setSelectedProperties(prev =>
              prev.includes(id)
                ? prev.filter(p => p !== id)
                : [...prev, id]
            );
          }}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          selectedReservationTypes={selectedReservationTypes}
          onReservationTypesChange={setSelectedReservationTypes}
          currentView={currentView}
          onViewChange={setCurrentView}
        />

        {/* Main area - Com rolagem independente */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Content - Área com rolagem independente */}
          <div className="flex-1 p-4 overflow-hidden">
            {currentView === 'calendar' && (
              <Calendar
                currentMonth={currentMonth}
                properties={properties.filter(p => selectedProperties.includes(p.id))}
                reservations={reservations}
                blocks={blocks}
                onPriceEdit={handlePriceEdit}
                onMinNightsEdit={handleMinNightsEdit}
                onEmptyClick={handleEmptyClick}
                onReservationClick={handleReservationClick}
                onBlockClick={handleOpenBlockDetails}
              />
            )}

            {currentView === 'list' && (
              <ListView
                properties={properties.filter(p => selectedProperties.includes(p.id))}
                reservations={reservations}
                onReservationClick={handleReservationClick}
              />
            )}

            {currentView === 'timeline' && (
              <TimelineView
                properties={properties.filter(p => selectedProperties.includes(p.id))}
                reservations={reservations}
                currentMonth={currentMonth}
                onReservationClick={handleReservationClick}
              />
            )}
          </div>
        </div>
      </div>

      {/* Modals - Calendário */}
      {activeModule === 'calendario' && (
        <>
      <PriceEditModal
        open={priceEditModal.open}
        propertyId={priceEditModal.propertyId}
        startDate={priceEditModal.startDate}
        endDate={priceEditModal.endDate}
        onClose={() => setPriceEditModal({ open: false })}
        onSave={handlePriceSave}
        property={properties.find(p => p.id === priceEditModal.propertyId)}
      />

      <MinNightsEditModal
        open={minNightsModal.open}
        property={properties.find(p => p.id === minNightsModal.propertyId)}
        startDate={minNightsModal.startDate}
        endDate={minNightsModal.endDate}
        onClose={() => setMinNightsModal({ open: false })}
        onSave={handleMinNightsSave}
      />

      <QuickActionsModal
        open={quickActionsModal.open}
        onClose={() => setQuickActionsModal({ open: false })}
        startDate={quickActionsModal.startDate}
        endDate={quickActionsModal.endDate}
        propertyId={quickActionsModal.propertyId}
        propertyName={properties.find(p => p.id === quickActionsModal.propertyId)?.name}
        onSelectAction={handleQuickAction}
      />

      <ReservationPreviewModal
        open={reservationPreviewModal.open}
        onClose={() => setReservationPreviewModal({ open: false })}
        reservation={reservationPreviewModal.reservation}
        onOpenDetails={handleOpenReservationDetails}
      />

      <CreateReservationWizard
        open={createReservationWizard.open}
        onClose={() => setCreateReservationWizard({ open: false })}
        property={properties.find(p => p.id === createReservationWizard.propertyId)}
        startDate={createReservationWizard.startDate}
        endDate={createReservationWizard.endDate}
        onComplete={handleReservationComplete}
      />

      <BlockModal
        isOpen={blockModal.open}
        onClose={() => setBlockModal({ open: false })}
        propertyId={blockModal.propertyId || ''}
        propertyName={properties.find(p => p.id === blockModal.propertyId)?.name || ''}
        startDate={blockModal.startDate || new Date()}
        endDate={blockModal.endDate || new Date()}
        onSave={() => {
          // Atualizar lista de reservas para refletir o bloqueio
          setRefreshKey(prev => prev + 1);
        }}
      />

      <BlockDetailsModal
        isOpen={blockDetailsModal.open}
        onClose={() => setBlockDetailsModal({ open: false })}
        block={blockDetailsModal.block}
        propertyName={properties.find(p => p.id === blockDetailsModal.block?.propertyId)?.name || ''}
        onDelete={handleBlockDelete}
        onUpdate={handleBlockUpdate}
      />

      <QuotationModal
        isOpen={quotationModal.open}
        onClose={() => setQuotationModal({ open: false })}
        property={properties.find(p => p.id === quotationModal.propertyId) || properties[0]}
        startDate={quotationModal.startDate || new Date()}
        endDate={quotationModal.endDate || new Date()}
      />

      <ReservationDetailsModal
        isOpen={reservationDetailsModal.open}
        onClose={() => setReservationDetailsModal({ open: false })}
        reservation={reservationDetailsModal.reservation}
        onEdit={(reservation) => {
          setReservationDetailsModal({ open: false });
          setEditReservationWizard({ open: true, reservation });
        }}
        onCancelReservation={(reservationId) => {
          // Remove a reserva do estado
          setReservations(prev => prev.filter(r => r.id !== reservationId));
          setReservationDetailsModal({ open: false });
          toast.success('Reserva removida do calendário');
        }}
      />

      <EditReservationWizard
        open={editReservationWizard.open}
        onClose={() => setEditReservationWizard({ open: false })}
        reservation={editReservationWizard.reservation}
        onComplete={handleEditReservationComplete}
      />

      <PriceTiersModal
        isOpen={priceTiersModal.open}
        onClose={() => setPriceTiersModal({ open: false })}
        propertyId={priceTiersModal.propertyId}
        propertyName={properties.find(p => p.id === priceTiersModal.propertyId)?.name}
        startDate={priceTiersModal.startDate || new Date()}
        endDate={priceTiersModal.endDate || new Date()}
      />

      <SeasonalityModal
        isOpen={seasonalityModal.open}
        onClose={() => setSeasonalityModal({ open: false })}
        propertyId={seasonalityModal.propertyId}
        propertyName={properties.find(p => p.id === seasonalityModal.propertyId)?.name}
      />

      <ExportModal
        isOpen={exportModal}
        onClose={() => setExportModal(false)}
      />

      <TagsManagementModal
        isOpen={tagsModal}
        onClose={() => setTagsModal(false)}
      />

      <CancelReservationModal
        isOpen={cancelReservationModal.open}
        onClose={() => setCancelReservationModal({ open: false })}
        reservation={cancelReservationModal.reservation}
      />
        </>
      )}

      {/* Database Initializer Modal */}
      {databaseInitModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="relative">
            <button
              onClick={() => setDatabaseInitModal(false)}
              className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-lg hover:bg-gray-100"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <DatabaseInitializer />
          </div>
        </div>
      )}
          </>
        ) : activeModule === 'locations-manager' ? (
          <div className="flex-1 p-6">
            <LocationsManager />
          </div>
        ) : activeModule === 'admin-master' ? (
          <AdminMasterFunctional onNavigate={setActiveModule} />
        ) : activeModule === 'painel-inicial' ? (
          <DashboardInicial
            conflicts={conflicts}
            onReservationClick={handleReservationClick}
            onDismissConflictAlert={() => setShowConflictAlert(false)}
            reservations={reservations}
            properties={properties}
          />
        ) : activeModule === 'configuracoes' ? (
          <div className="flex-1 p-8 overflow-y-auto bg-background">
            <SettingsManager
              organizationId="org-default-001"
              mode="global"
            />
          </div>
        ) : activeModule === 'precificacao-lote' || activeModule === 'tarifa-pricing' ? (
          <div className="flex-1 p-8 overflow-y-auto bg-background">
            <BulkPricingManager organizationId="org-default-001" />
          </div>
        ) : activeModule === 'backend-tester-tenants' ? (
          <div className="flex-1">
            <TenantManagement />
          </div>
        ) : activeModule === 'usuarios-hospedes' || activeModule === 'usuarios-usuarios' ? (
          <div className="flex-1">
            <UserManagement />
          </div>
        ) : activeModule === 'central-reservas' || activeModule === 'reservas-recepcao' || activeModule === 'reservas-achar' ? (
          <div className="flex-1 overflow-hidden">
            <div className="p-6 h-full">
              <ReservationsManagement />
            </div>
          </div>
        ) : activeModule === 'reservas-fazer' ? (
          <div className="flex-1 overflow-hidden">
            <div className="p-6 h-full">
              <ReservationsManagement autoOpenCreate={true} />
            </div>
          </div>
        ) : activeModule === 'integracoes-bookingcom' ? (
          <div className="flex-1 overflow-hidden">
            <BookingComIntegration />
          </div>
        ) : activeModule === 'imoveis' || activeModule === 'imoveis-anuncios' || activeModule === 'imoveis-locais' || activeModule === 'imoveis-fotos' || activeModule === 'locations-manager' ? (
          <div className="flex-1 overflow-hidden">
            <PropertiesManagement />
          </div>
        ) : activeModule === 'central-mensagens' ? (
          <div className="flex-1 overflow-hidden">
            <ChatInboxWithEvolution />
          </div>
        ) : activeModule === 'hospedes' ? (
          <div className="flex-1 overflow-hidden">
            <GuestsManager />
          </div>
        ) : activeModule === 'motor-reservas' ? (
          <div className="flex-1 overflow-hidden">
            <div className="p-6 h-full">
              <ClientSitesManager />
            </div>
          </div>
        ) : (
          <ModulePlaceholder 
            moduleName={getModuleName(activeModule)}
            moduleDescription={getModuleDescription(activeModule)}
          />
        )}
            </div>
          </div>
        } />
        
        {/* Rota 404 - Catch All (DEVE SER A ÚLTIMA) */}
        <Route path="*" element={<NotFoundPage />} />
        
        </Routes>
        
        {/* Badge de Ambiente */}
        <EnvironmentBadge />
        
        {/* Botão de Emergência - SEMPRE VISÍVEL */}
        <EmergencyHomeButton />
        
        {/* Botão Flutuante WhatsApp IA */}
        <WhatsAppFloatingButton />
      </LanguageProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

// Helper functions para obter informações dos módulos
function getModuleName(moduleId: string): string {
  const moduleNames: Record<string, string> = {
    'admin-master': 'Admin Master',
    'painel-inicial': 'Dashboard Inicial',
    'locations-manager': 'Locais-Imóveis',
    'catalogo': 'Catálogo',
    'catalogo-grupos': 'Grupos',
    'catalogo-restricoes': 'Restrições dos Proprietários',
    'catalogo-regras': 'Regras Tarifárias',
    'catalogo-emails': 'Modelos de E-mail',
    'catalogo-impressao': 'Modelos para Impressão',
    'catalogo-midia': 'Gerenciador de Mídia',
    'central-reservas': 'Central de Reservas',
    'reservas-recepcao': 'Recepção',
    'reservas-fazer': 'Fazer Reserva',
    'reservas-achar': 'Achar Reserva',
    'reservas-incompletas': 'Reservas Incompletas',
    'reservas-avaliacoes-hospedes': 'Avaliações dos Hóspedes',
    'reservas-avaliacao-anfitriao': 'Avaliação do Anfitrião',
    'central-tarefas': 'Tasks',
    'tarefas-lista': 'Lista de Tarefas',
    'tarefas-dashboard-imagens': 'Dashboard de Imagens',
    'tarefas-dashboard-incutis': 'Dashboard Incutis',
    'tarefas-dashboard-guiaturs': 'Dashboard Guiaturs',
    'usuarios-hospedes': 'Usuários e Hóspedes',
    'usuarios-usuarios': 'Usuários',
    'usuarios-clientes': 'Clientes',
    'usuarios-proprietarios': 'Proprietários',
    'usuarios-exportacao-leads': 'Exportação de Leads',
    'usuarios-compras-email': 'Compras (por E-mail)',
    'usuarios-compras-nome': 'Compras (por Nome)',
    'usuarios-lista-canal': 'Lista de Canal',
    'usuarios-lista-telefones': 'Lista de Telefones',
    'usuarios-lista-documentos': 'Lista de Documentos',
    'assistentes': 'Suporte',
    'assistentes-duplicados': 'E-mails Duplicados',
    'assistentes-perfis': 'Perfis de Cadastro',
    'assistentes-permissoes': 'Funções e Permissões',
    'assistentes-online': 'Usuários Online',
    'assistentes-atividade': 'Atividade dos Usuários',
    'assistentes-historico': 'Histórico de Login',
    'central-mensagens': 'Chat',
    'financeiro': 'Finanças',
    'estatisticas': 'Estatísticas',
    'configuracoes': 'Configurações',
    'motor-reservas': 'Edição de site',
    'app-center': 'Aplicativos',
    'backend-tester-tenants': 'Gerenciamento de Imobiliárias',
    'promocoes': 'Promoções',
    'notificacoes': 'Notificações'
  };
  return moduleNames[moduleId] || 'Módulo';
}

function getModuleDescription(moduleId: string): string {
  const descriptions: Record<string, string> = {
    'admin-master': 'Painel de controle administrativo exclusivo RENDIZY. Gerencie todas as imobiliárias, monitore o sistema e configure parâmetros globais.',
    'painel-inicial': 'Dashboard com visão geral do sistema, métricas principais e alertas importantes.',
    'locations-manager': 'Gerencie prédios, condomínios e localizações físicas. Nova estrutura hierárquica Location → Accommodation.',
    'catalogo': 'Organize e gerencie seus imóveis, grupos, tags e configurações de catálogo.',
    'catalogo-grupos': 'Crie e gerencie grupos/pastas para organizar seus imóveis.',
    'catalogo-restricoes': 'Configure restrições e preferências dos proprietários de imóveis.',
    'catalogo-regras': 'Defina regras tarifárias e políticas de precificação.',
    'catalogo-emails': 'Crie e edite modelos de e-mail para comunicação com hóspedes.',
    'catalogo-impressao': 'Configure modelos de documentos para impressão.',
    'catalogo-midia': 'Gerencie fotos, vídeos e outros arquivos de mídia dos imóveis.',
    'central-reservas': 'Centralize a gestão de todas as reservas de todas as plataformas.',
    'reservas-recepcao': 'Receba e processe novas solicitações de reserva.',
    'reservas-fazer': 'Crie novas reservas manualmente no sistema.',
    'reservas-achar': 'Busque e filtre reservas por diversos critérios.',
    'reservas-incompletas': 'Gerencie reservas pendentes ou com informações incompletas.',
    'reservas-avaliacoes-hospedes': 'Visualize e responda avaliações feitas pelos hóspedes.',
    'reservas-avaliacao-anfitriao': 'Avalie seus hóspedes após o check-out.',
    'central-tarefas': 'Organize e acompanhe tarefas relacionadas aos imóveis e reservas.',
    'tarefas-lista': 'Visualize e gerencie todas as tarefas do sistema.',
    'tarefas-dashboard-imagens': 'Dashboard para controle de qualidade de imagens dos imóveis.',
    'tarefas-dashboard-incutis': 'Painel de integração com Incutis.',
    'tarefas-dashboard-guiaturs': 'Painel de integração com Guiaturs.',
    'usuarios-hospedes': 'Gerencie usuários, clientes, hóspedes e proprietários.',
    'usuarios-usuarios': 'Administre usuários do sistema e suas permissões.',
    'usuarios-clientes': 'Gerencie cadastro de clientes e hóspedes.',
    'usuarios-proprietarios': 'Administre informações dos proprietários de imóveis.',
    'usuarios-exportacao-leads': 'Exporte dados de leads e contatos para marketing.',
    'usuarios-compras-email': 'Visualize histórico de compras por endereço de e-mail.',
    'usuarios-compras-nome': 'Consulte histórico de compras por nome do cliente.',
    'usuarios-lista-canal': 'Lista de origens e canais de aquisição de clientes.',
    'usuarios-lista-telefones': 'Catálogo de contatos telefônicos.',
    'usuarios-lista-documentos': 'Gestão de documentos de clientes e hóspedes.',
    'assistentes': 'Ferramentas auxiliares para administração e manutenção do sistema.',
    'assistentes-duplicados': 'Identifique e mescle cadastros duplicados de e-mails.',
    'assistentes-perfis': 'Configure perfis padrão de cadastro.',
    'assistentes-permissoes': 'Gerencie funções e permissões de acesso.',
    'assistentes-online': 'Monitore usuários atualmente online no sistema.',
    'assistentes-atividade': 'Acompanhe a atividade e ações dos usuários.',
    'assistentes-historico': 'Visualize histórico de logins e acessos.',
    'central-mensagens': 'Centralize toda a comunicação com hóspedes de todas as plataformas.',
    'financeiro': 'Gerencie receitas, despesas, cobranças e relat��rios financeiros.',
    'estatisticas': 'Visualize métricas, gráficos e análises de performance.',
    'configuracoes': 'Configure preferências do sistema, integrações e parâmetros.',
    'motor-reservas': 'Gerencie sites customizados para clientes. Crie, edite e importe designs.',
    'app-center': 'Gerencie integrações com aplicativos e serviços externos.',
    'backend-tester-tenants': 'Gerencie todas as imobiliárias clientes do sistema SaaS. Controle de contas, planos, limites e status.',
    'promocoes': 'Crie e gerencie promoções, cupons de desconto e ofertas especiais para atrair mais reservas.',
    'notificacoes': 'Central de notificações e alertas do sistema para manter você informado sobre eventos importantes.'
  };
  return descriptions[moduleId] || 'Este módulo está planejado e será implementado em breve.';
}

export default App;
