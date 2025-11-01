// ============================================================
// EXEMPLO DE SITE CRIADO POR IA EXTERNA
// ============================================================
// Este é um exemplo de código que poderia vir de:
// - v0.dev
// - Bolt.ai
// - Figma Make
// - Qualquer outra ferramenta
//
// O código usa dados MOCKADOS inicialmente, mas quando
// importado para o RENDIZY via ClientSiteWrapper,
// os dados serão automaticamente substituídos por dados reais!
// ============================================================

import { useState } from 'react';
import { Search, MapPin, Calendar, Users, Star, Phone, Mail } from 'lucide-react';
import { useRendizyData, useRendizyBooking } from './components/ClientSiteWrapper';

// ============================================================
// SITE PRINCIPAL
// ============================================================

export default function ImobiliariaSite() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <SearchSection />
      <FeaturedProperties />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

// ============================================================
// HEADER
// ============================================================

function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-xl">🏖️</span>
          </div>
          <h1 className="text-2xl text-gray-900">Imobiliária Praia</h1>
        </div>
        
        <nav className="hidden md:flex gap-8">
          <a href="#imoveis" className="text-gray-600 hover:text-blue-600">Imóveis</a>
          <a href="#sobre" className="text-gray-600 hover:text-blue-600">Sobre</a>
          <a href="#contato" className="text-gray-600 hover:text-blue-600">Contato</a>
        </nav>

        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
          <Phone className="inline-block h-4 w-4 mr-2" />
          Fale Conosco
        </button>
      </div>
    </header>
  );
}

// ============================================================
// HERO SECTION
// ============================================================

function HeroSection() {
  return (
    <section className="relative h-[600px] bg-gradient-to-r from-blue-600 to-blue-800">
      <div className="absolute inset-0 bg-black/30"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex items-center">
        <div className="text-white max-w-2xl">
          <h2 className="text-6xl mb-6">
            Encontre sua Casa de Praia dos Sonhos
          </h2>
          <p className="text-2xl mb-8 text-blue-100">
            Mais de 100 imóveis de temporada em destinos paradisíacos
          </p>
          <div className="flex gap-4">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg hover:bg-blue-50 transition">
              Ver Imóveis
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg hover:bg-white/10 transition">
              Saiba Mais
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// BUSCA
// ============================================================

function SearchSection() {
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);

  // ✅ HOOK DO RENDIZY - Injeta função de busca real
  const { searchProperties } = useRendizyData();

  const handleSearch = async () => {
    const results = await searchProperties({
      location,
      checkIn,
      checkOut,
      guests
    });
    console.log('Resultados:', results);
  };

  return (
    <section className="bg-gray-50 py-12" id="busca">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl mb-6 text-gray-900">Busque seu Imóvel Ideal</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Localização */}
            <div>
              <label className="block text-sm mb-2 text-gray-700">Localização</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Cidade ou bairro"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Check-in */}
            <div>
              <label className="block text-sm mb-2 text-gray-700">Check-in</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Check-out */}
            <div>
              <label className="block text-sm mb-2 text-gray-700">Check-out</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Hóspedes */}
            <div>
              <label className="block text-sm mb-2 text-gray-700">Hóspedes</label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                    <option key={n} value={n}>{n} hóspede{n > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <button
            onClick={handleSearch}
            className="w-full mt-6 bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
          >
            <Search className="h-5 w-5" />
            Buscar Imóveis
          </button>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// IMÓVEIS EM DESTAQUE
// ============================================================

function FeaturedProperties() {
  // ✅ HOOK DO RENDIZY - Injeta imóveis reais automaticamente!
  const { properties, loading } = useRendizyData();

  if (loading) {
    return (
      <section className="py-20 px-4" id="imoveis">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando imóveis...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4" id="imoveis">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl text-center mb-4 text-gray-900">
          Imóveis em Destaque
        </h2>
        <p className="text-center text-gray-600 mb-12 text-xl">
          Confira nossas propriedades mais procuradas
        </p>

        {properties.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              Nenhum imóvel disponível no momento
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ============================================================
// CARD DE IMÓVEL
// ============================================================

function PropertyCard({ property }: { property: any }) {
  const [showBooking, setShowBooking] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
      {/* Imagem */}
      <div className="relative h-64">
        <img
          src={property.images?.[0] || 'https://images.unsplash.com/photo-1568605114967-8130f3a36994'}
          alt={property.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full">
          <span className="flex items-center gap-1 text-sm">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            4.8
          </span>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="p-6">
        <h3 className="text-xl mb-2 text-gray-900">{property.name}</h3>
        
        <p className="text-gray-600 mb-4 flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          {property.location}
        </p>

        <p className="text-gray-700 mb-4 line-clamp-2">
          {property.description || 'Imóvel confortável e bem localizado'}
        </p>

        <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
          <span>{property.bedrooms} quartos</span>
          <span>•</span>
          <span>{property.bathrooms} banheiros</span>
          <span>•</span>
          <span>{property.maxGuests} hóspedes</span>
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div>
            <p className="text-sm text-gray-600">A partir de</p>
            <p className="text-2xl text-blue-600">
              R$ {property.price || 0}
              <span className="text-sm text-gray-600">/noite</span>
            </p>
          </div>
          <button
            onClick={() => setShowBooking(!showBooking)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Reservar
          </button>
        </div>

        {/* Widget de Reserva */}
        {showBooking && (
          <BookingWidget propertyId={property.id} onClose={() => setShowBooking(false)} />
        )}
      </div>
    </div>
  );
}

// ============================================================
// WIDGET DE RESERVA
// ============================================================

function BookingWidget({ propertyId, onClose }: { propertyId: string; onClose: () => void }) {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [price, setPrice] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // ✅ HOOK DO RENDIZY - Funções de reserva e cálculo
  const { calculatePrice, createReservation, checkAvailability } = useRendizyBooking();

  const handleCalculate = async () => {
    if (!checkIn || !checkOut) return;

    setLoading(true);
    try {
      const available = await checkAvailability(propertyId, checkIn, checkOut);
      
      if (!available) {
        alert('Imóvel não disponível para estas datas');
        return;
      }

      const priceData = await calculatePrice(propertyId, checkIn, checkOut);
      setPrice(priceData);
    } catch (error) {
      alert('Erro ao calcular preço');
    } finally {
      setLoading(false);
    }
  };

  const handleBook = async () => {
    if (!guestName || !guestEmail || !checkIn || !checkOut) {
      alert('Preencha todos os campos');
      return;
    }

    setLoading(true);
    try {
      const result = await createReservation({
        propertyId,
        guestName,
        guestEmail,
        guestPhone,
        checkIn,
        checkOut,
        guests,
        totalPrice: price?.totalPrice || 0
      });

      if (result.success) {
        alert('Reserva criada com sucesso! ID: ' + result.reservationId);
        onClose();
      } else {
        alert('Erro ao criar reserva: ' + result.error);
      }
    } catch (error) {
      alert('Erro ao criar reserva');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg text-gray-900">Fazer Reserva</h4>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
      </div>

      <div className="space-y-4">
        {/* Datas */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1 text-gray-700">Check-in</label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm mb-1 text-gray-700">Check-out</label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        {/* Calcular Preço */}
        <button
          onClick={handleCalculate}
          disabled={loading || !checkIn || !checkOut}
          className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 disabled:opacity-50"
        >
          {loading ? 'Calculando...' : 'Calcular Preço'}
        </button>

        {/* Exibir Preço */}
        {price && (
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">R$ {price.pricePerNight} x {price.nights} noites</span>
              <span className="text-gray-900">R$ {price.subtotal}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Taxa de limpeza</span>
              <span className="text-gray-900">R$ {price.cleaningFee}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Taxa de serviço</span>
              <span className="text-gray-900">R$ {price.serviceFee}</span>
            </div>
            <div className="border-t pt-2 mt-2 flex justify-between">
              <span className="text-gray-900">Total</span>
              <span className="text-xl text-blue-600">R$ {price.totalPrice}</span>
            </div>
          </div>
        )}

        {/* Dados do Hóspede */}
        {price && (
          <>
            <div>
              <label className="block text-sm mb-1 text-gray-700">Nome completo</label>
              <input
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="João Silva"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-gray-700">Email</label>
              <input
                type="email"
                value={guestEmail}
                onChange={(e) => setGuestEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="joao@email.com"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-gray-700">Telefone</label>
              <input
                type="tel"
                value={guestPhone}
                onChange={(e) => setGuestPhone(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="(11) 99999-9999"
              />
            </div>

            <button
              onClick={handleBook}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Processando...' : 'Confirmar Reserva'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ============================================================
// SOBRE
// ============================================================

function AboutSection() {
  return (
    <section className="py-20 px-4 bg-gray-50" id="sobre">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl mb-6 text-gray-900">
              Sobre a Imobiliária Praia
            </h2>
            <p className="text-gray-700 mb-4 text-lg">
              Há mais de 10 anos conectando pessoas aos melhores imóveis de temporada
              em destinos paradisíacos.
            </p>
            <p className="text-gray-700 mb-6 text-lg">
              Nossa missão é proporcionar experiências inesquecíveis através de
              propriedades cuidadosamente selecionadas e atendimento personalizado.
            </p>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-4xl text-blue-600 mb-2">100+</p>
                <p className="text-gray-600">Imóveis</p>
              </div>
              <div className="text-center">
                <p className="text-4xl text-blue-600 mb-2">5000+</p>
                <p className="text-gray-600">Hóspedes</p>
              </div>
              <div className="text-center">
                <p className="text-4xl text-blue-600 mb-2">4.9</p>
                <p className="text-gray-600">Avaliação</p>
              </div>
            </div>
          </div>
          <div className="h-96 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl"></div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// CONTATO
// ============================================================

function ContactSection() {
  return (
    <section className="py-20 px-4" id="contato">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl text-center mb-12 text-gray-900">
          Entre em Contato
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm mb-2 text-gray-700">Nome</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Seu nome"
                />
              </div>
              <div>
                <label className="block text-sm mb-2 text-gray-700">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="seu@email.com"
                />
              </div>
              <div>
                <label className="block text-sm mb-2 text-gray-700">Mensagem</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Como podemos ajudar?"
                ></textarea>
              </div>
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
                Enviar Mensagem
              </button>
            </form>
          </div>
          <div className="space-y-6">
            <div className="flex gap-4">
              <Phone className="h-6 w-6 text-blue-600 mt-1" />
              <div>
                <p className="text-gray-900 mb-1">Telefone</p>
                <p className="text-gray-600">(11) 99999-9999</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Mail className="h-6 w-6 text-blue-600 mt-1" />
              <div>
                <p className="text-gray-900 mb-1">Email</p>
                <p className="text-gray-600">contato@imobiliariapraia.com</p>
              </div>
            </div>
            <div className="flex gap-4">
              <MapPin className="h-6 w-6 text-blue-600 mt-1" />
              <div>
                <p className="text-gray-900 mb-1">Endereço</p>
                <p className="text-gray-600">Av. Atlântica, 1000 - Rio de Janeiro, RJ</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FOOTER
// ============================================================

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-gray-400 mb-4">
          © 2025 Imobiliária Praia. Todos os direitos reservados.
        </p>
        <p className="text-sm text-gray-500">
          Powered by RENDIZY - Sistema de Gestão de Imóveis de Temporada
        </p>
      </div>
    </footer>
  );
}
