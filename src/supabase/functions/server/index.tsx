import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";

// Import route handlers
import * as locationsRoutes from './routes-locations.ts';
import * as propertiesRoutes from './routes-properties.ts';
import * as reservationsRoutes from './routes-reservations.ts';
import * as guestsRoutes from './routes-guests.ts';
import * as calendarRoutes from './routes-calendar.ts';
import * as photosRoutes from './routes-photos.ts';
import organizationsApp from './routes-organizations.ts';
import usersApp from './routes-users.ts';
import { bookingcomRoutes } from './routes-bookingcom.ts';
import listingsApp from './routes-listings.ts';
import roomsApp from './routes-rooms.ts';
import rulesApp from './routes-rules.ts';
import pricingSettingsApp from './routes-pricing-settings.ts';
import seasonalPricingApp from './routes-seasonal-pricing.ts';
import icalApp from './routes-ical.ts';
import settingsApp from './routes-settings.ts';
import bulkPricingApp from './routes-bulk-pricing.ts';
import chatApp from './routes-chat.ts';
import quotationsApp from './routes-quotations.ts';
import blocksApp from './routes-blocks.ts';
import propertyTypesApp from './routes-property-types.ts';
import propertyWizardApp from './routes-property-wizard.ts';
import * as locationAmenitiesRoutes from './routes-location-amenities.ts';
import * as staysnetRoutes from './routes-staysnet.ts';
import * as amenitiesRoutes from './routes-amenities.ts';
import { whatsappEvolutionRoutes } from './routes-whatsapp-evolution.ts';
import clientSitesApp from './routes-client-sites.ts';
import { seedDatabase } from './seed-data.ts';
import { seedDatabaseNew } from './seed-data-new.ts';
import { seedTestProperties } from './seed-data-test.ts';
import { seedCompleteTest } from './seed-complete-test.ts';

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS - OPEN CORS para SaaS Multi-Tenant
// Permite TODOS os domínios (necessário pois cada cliente tem seu domínio customizado)
app.use(
  "/*",
  cors({
    origin: "*", // Permite QUALQUER origem (necessário para multi-tenant SaaS)
    allowHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length", "Content-Type"],
    maxAge: 600,
    credentials: false, // Deve ser false quando origin é "*"
  }),
);

// ============================================================================
// HEALTH CHECK
// ============================================================================

app.get("/make-server-67caf26a/health", (c) => {
  return c.json({ 
    status: "ok",
    timestamp: new Date().toISOString(),
    service: "Rendizy Backend API"
  });
});

// ============================================================================
// LOCATIONS ROUTES
// ============================================================================

app.get("/make-server-67caf26a/locations", locationsRoutes.listLocations);
app.get("/make-server-67caf26a/locations/:id", locationsRoutes.getLocation);
app.post("/make-server-67caf26a/locations", locationsRoutes.createLocation);
app.put("/make-server-67caf26a/locations/:id", locationsRoutes.updateLocation);
app.delete("/make-server-67caf26a/locations/:id", locationsRoutes.deleteLocation);
app.get("/make-server-67caf26a/locations/:id/accommodations", locationsRoutes.getLocationAccommodations);

// ============================================================================
// PROPERTIES/ACCOMMODATIONS ROUTES
// ============================================================================

app.get("/make-server-67caf26a/properties", propertiesRoutes.listProperties);
app.get("/make-server-67caf26a/properties/:id", propertiesRoutes.getProperty);
app.post("/make-server-67caf26a/properties", propertiesRoutes.createProperty);
app.put("/make-server-67caf26a/properties/:id", propertiesRoutes.updateProperty);
app.delete("/make-server-67caf26a/properties/:id", propertiesRoutes.deleteProperty);
app.get("/make-server-67caf26a/properties/:id/stats", propertiesRoutes.getPropertyStats);

// ============================================================================
// AMENITIES ROUTES (v1.0.103.80)
// Gerenciamento de Location Amenities vs Listing Amenities
// ============================================================================

app.get("/make-server-67caf26a/properties/:id/amenities", amenitiesRoutes.getPropertyAmenities);
app.put("/make-server-67caf26a/properties/:id/location-amenities", amenitiesRoutes.updateLocationAmenities);
app.put("/make-server-67caf26a/properties/:id/listing-amenities", amenitiesRoutes.updateListingAmenities);

// ============================================================================
// RESERVATIONS ROUTES
// ============================================================================

app.get("/make-server-67caf26a/reservations", reservationsRoutes.listReservations);
app.get("/make-server-67caf26a/reservations/:id", reservationsRoutes.getReservation);
app.post("/make-server-67caf26a/reservations", reservationsRoutes.createReservation);
app.put("/make-server-67caf26a/reservations/:id", reservationsRoutes.updateReservation);
app.delete("/make-server-67caf26a/reservations/:id", reservationsRoutes.deleteReservation);
app.post("/make-server-67caf26a/reservations/:id/cancel", reservationsRoutes.cancelReservation);
app.post("/make-server-67caf26a/reservations/check-availability", reservationsRoutes.checkAvailability);
app.get("/make-server-67caf26a/reservations/detect-conflicts", reservationsRoutes.detectConflicts);

// ============================================================================
// GUESTS ROUTES
// ============================================================================

app.get("/make-server-67caf26a/guests", guestsRoutes.listGuests);
app.get("/make-server-67caf26a/guests/:id", guestsRoutes.getGuest);
app.post("/make-server-67caf26a/guests", guestsRoutes.createGuest);
app.put("/make-server-67caf26a/guests/:id", guestsRoutes.updateGuest);
app.delete("/make-server-67caf26a/guests/:id", guestsRoutes.deleteGuest);
app.get("/make-server-67caf26a/guests/:id/history", guestsRoutes.getGuestHistory);
app.post("/make-server-67caf26a/guests/:id/blacklist", guestsRoutes.toggleBlacklist);

// ============================================================================
// CALENDAR ROUTES
// ============================================================================

app.get("/make-server-67caf26a/calendar", calendarRoutes.getCalendarData);
app.get("/make-server-67caf26a/calendar/stats", calendarRoutes.getCalendarStats);
app.post("/make-server-67caf26a/calendar/blocks", calendarRoutes.createBlock);
app.delete("/make-server-67caf26a/calendar/blocks/:id", calendarRoutes.deleteBlock);
app.post("/make-server-67caf26a/calendar/bulk-update-prices", calendarRoutes.bulkUpdatePrices);
app.post("/make-server-67caf26a/calendar/bulk-update-min-nights", calendarRoutes.bulkUpdateMinNights);
app.post("/make-server-67caf26a/calendar/delete-custom-prices", calendarRoutes.deleteCustomPrices);

// ============================================================================
// PHOTOS ROUTES
// ============================================================================

app.post("/make-server-67caf26a/photos/upload", photosRoutes.uploadPhoto);
app.delete("/make-server-67caf26a/photos/:path", photosRoutes.deletePhoto);
app.get("/make-server-67caf26a/photos/property/:propertyId", photosRoutes.listPropertyPhotos);

// ============================================================================
// ORGANIZATIONS ROUTES
// ============================================================================

app.route("/make-server-67caf26a/organizations", organizationsApp);

// ============================================================================
// USERS ROUTES
// ============================================================================

app.route("/make-server-67caf26a/users", usersApp);

// ============================================================================
// BOOKING.COM INTEGRATION ROUTES
// ============================================================================

app.route("/make-server-67caf26a/bookingcom", bookingcomRoutes);

// ============================================================================
// LISTINGS ROUTES
// ============================================================================

app.route("/make-server-67caf26a/listings", listingsApp);

// ============================================================================
// ROOMS ROUTES (v1.0.79)
// ============================================================================

app.route("/make-server-67caf26a", roomsApp);

// ============================================================================
// ACCOMMODATION RULES ROUTES (v1.0.80)
// ============================================================================

app.route("/make-server-67caf26a", rulesApp);

// ============================================================================
// PRICING SETTINGS ROUTES (v1.0.81)
// ============================================================================

app.route("/make-server-67caf26a", pricingSettingsApp);

// ============================================================================
// SEASONAL PRICING ROUTES (v1.0.103.88)
// ============================================================================

app.route("/make-server-67caf26a", seasonalPricingApp);

// ============================================================================
// ICAL SYNCHRONIZATION ROUTES (v1.0.83)
// ============================================================================

app.route("/make-server-67caf26a", icalApp);

// ============================================================================
// SETTINGS ROUTES (Global vs Individual) (v1.0.84)
// ============================================================================

app.route("/make-server-67caf26a", settingsApp);

// ============================================================================
// BULK PRICING ROUTES (v1.0.85)
// ============================================================================

app.route("/make-server-67caf26a", bulkPricingApp);

// ============================================================================
// CHAT ROUTES (v1.0.93)
// ✅ REABILITADO v1.0.103.87 - Necessário para canais de comunicação
// ============================================================================

app.route("/make-server-67caf26a/chat", chatApp);

// ============================================================================
// WHATSAPP EVOLUTION API ROUTES (v1.0.103.84)
// Integração Evolution API com proxy seguro
// ============================================================================

whatsappEvolutionRoutes(app);

// ============================================================================
// QUOTATIONS ROUTES (v1.0.90)
// ============================================================================

app.route("/make-server-67caf26a/quotations", quotationsApp);

// ============================================================================
// BLOCKS ROUTES (v1.0.90)
// ============================================================================

app.route("/make-server-67caf26a/blocks", blocksApp);

// ============================================================================
// PROPERTY TYPES ROUTES (v1.0.103.8)
// ============================================================================

app.route("/make-server-67caf26a/property-types", propertyTypesApp);

// ============================================================================
// PROPERTY WIZARD ROUTES (v1.0.103.111)
// Backend completo para os 7 passos do wizard de edição
// ============================================================================

app.route("/make-server-67caf26a/properties/wizard", propertyWizardApp);

// ============================================================================
// LOCATION AMENITIES ROUTES (v1.0.103.11)
// ============================================================================

app.get("/make-server-67caf26a/settings/location-amenities", locationAmenitiesRoutes.getLocationAmenitiesConfig);
app.put("/make-server-67caf26a/settings/location-amenities", locationAmenitiesRoutes.updateLocationAmenitiesConfig);
app.post("/make-server-67caf26a/settings/location-amenities/reset", locationAmenitiesRoutes.resetLocationAmenitiesConfig);
app.get("/make-server-67caf26a/settings/location-amenities/enabled", locationAmenitiesRoutes.getEnabledAmenitiesForLocation);

// ============================================================================
// STAYS.NET PMS INTEGRATION ROUTES (v1.0.103.17)
// ============================================================================

app.get("/make-server-67caf26a/settings/staysnet", staysnetRoutes.getStaysNetConfig);
app.post("/make-server-67caf26a/settings/staysnet", staysnetRoutes.saveStaysNetConfig);
app.post("/make-server-67caf26a/staysnet/test", staysnetRoutes.testStaysNetConnection);
app.post("/make-server-67caf26a/staysnet/test-endpoint", staysnetRoutes.testStaysNetEndpoint);
app.post("/make-server-67caf26a/staysnet/sync/properties", staysnetRoutes.syncStaysNetProperties);
app.post("/make-server-67caf26a/staysnet/sync/reservations", staysnetRoutes.syncStaysNetReservations);
app.get("/make-server-67caf26a/staysnet/reservations/preview", staysnetRoutes.previewStaysNetReservations);

// ============================================================================
// CLIENT SITES ROUTES (v1.0.103.187)
// Sistema de gestão de sites customizados por cliente
// ============================================================================

app.route("/make-server-67caf26a/client-sites", clientSitesApp);

// ============================================================================
// ORGANIZATIONS & USERS ROUTES (v1.0.103.190)
// Sistema SaaS Multi-tenant - Gerenciamento de imobiliárias e usuários
// ============================================================================

app.route("/make-server-67caf26a/organizations", organizationsApp);
app.route("/make-server-67caf26a/users", usersApp);

// ============================================================================
// DEVELOPMENT / TESTING ROUTES
// ============================================================================

// Seed database with sample data (OLD STRUCTURE - compatibilidade)
app.post("/make-server-67caf26a/dev/seed-database", async (c) => {
  try {
    console.log('🌱 Starting database seed (OLD STRUCTURE)...');
    const result = await seedDatabase();
    
    return c.json({
      success: true,
      message: 'Database seeded successfully (old structure)',
      data: {
        propertiesCount: result.properties.length,
        guestsCount: result.guests.length,
        reservationsCount: result.reservations.length,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error seeding database:', error);
    return c.json({
      success: false,
      error: 'Failed to seed database',
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    }, 500);
  }
});

// Seed database with NEW STRUCTURE (Location → Accommodation)
app.post("/make-server-67caf26a/dev/seed-database-new", async (c) => {
  try {
    console.log('🌱 Starting database seed (NEW STRUCTURE: Location → Accommodation)...');
    const result = await seedDatabaseNew();
    
    return c.json({
      success: true,
      message: 'Database seeded successfully with NEW STRUCTURE',
      structure: 'Location → Accommodation',
      data: {
        locationsCount: result.locations.length,
        accommodationsCount: result.accommodations.length,
        guestsCount: result.guests.length,
        reservationsCount: result.reservations.length,
        linkedAccommodations: result.accommodations.filter(a => a.locationId).length,
        standaloneAccommodations: result.accommodations.filter(a => !a.locationId).length,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error seeding database:', error);
    return c.json({
      success: false,
      error: 'Failed to seed database',
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    }, 500);
  }
});

// Seed database with TEST PROPERTIES (4 imóveis específicos para teste de reservas)
app.post("/make-server-67caf26a/dev/seed-test-properties", async (c) => {
  try {
    console.log('🌱 Starting TEST PROPERTIES seed (4 specific properties for reservation testing)...');
    const result = await seedTestProperties();
    
    return c.json({
      success: true,
      message: 'Test properties seeded successfully',
      structure: 'Location → Accommodation',
      data: {
        locationsCount: result.locations.length,
        propertiesCount: result.properties.length,
        guestsCount: result.guests.length,
        reservationsCount: result.reservations?.length || 0,
        properties: result.properties.map(p => ({
          id: p.id,
          name: p.name,
          code: p.code,
          type: p.type,
        })),
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error seeding test properties:', error);
    return c.json({
      success: false,
      error: 'Failed to seed test properties',
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    }, 500);
  }
});

// Seed COMPLETE TEST - Location e Listing completos com todos os campos
app.post("/make-server-67caf26a/dev/seed-complete-test", async (c) => {
  try {
    console.log('🌱 Starting COMPLETE TEST seed (full Location + Listing with all features)...');
    const result = await seedCompleteTest();
    
    return c.json({
      success: true,
      message: 'Complete test data seeded successfully',
      structure: 'Location → Property → Rooms → Listing + Rules + Pricing Settings',
      data: {
        location: {
          id: result.location.id,
          name: result.location.name,
          code: result.location.code,
          address: `${result.location.address.street}, ${result.location.address.number} - ${result.location.address.city}/${result.location.address.state}`,
          sharedAmenities: result.location.sharedAmenities.length,
        },
        property: {
          id: result.property.id,
          name: result.property.name,
          code: result.property.code,
          type: result.property.type,
          maxGuests: result.property.maxGuests,
          bedrooms: result.property.bedrooms,
          bathrooms: result.property.bathrooms,
          area: result.property.area,
          basePrice: result.property.pricing.basePrice,
          amenities: result.property.amenities.length,
        },
        rooms: {
          count: result.rooms.length,
          types: result.rooms.map(r => r.type),
        },
        listing: {
          id: result.listing.id,
          title: result.listing.title.pt,
          platforms: Object.entries(result.listing.platforms)
            .filter(([k, v]) => v.enabled)
            .map(([k]) => k),
          icalUrls: Object.entries(result.listing.icalUrls)
            .filter(([k, v]) => v)
            .length,
          derivedPricing: result.listing.derivedPricing.enabled,
        },
        additionalSettings: {
          pricingSettings: result.pricingSettings.id,
          accommodationRules: result.accommodationRules.id,
          pets: result.accommodationRules.pets.allowed,
          smoking: result.accommodationRules.smoking.allowed,
        },
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error seeding complete test:', error);
    return c.json({
      success: false,
      error: 'Failed to seed complete test data',
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    }, 500);
  }
});

// Clear all data (apenas para desenvolvimento/testes)
app.post("/make-server-67caf26a/dev/clear-database", async (c) => {
  try {
    console.log('🗑️ Clearing database...');
    
    const locations = await kv.getByPrefix('location:');
    const properties = await kv.getByPrefix('property:');
    const guests = await kv.getByPrefix('guest:');
    const reservations = await kv.getByPrefix('reservation:');
    const blocks = await kv.getByPrefix('block:');
    const customPrices = await kv.getByPrefix('customprice:');
    const customMinNights = await kv.getByPrefix('customminnight:');
    const organizations = await kv.getByPrefix('org:');
    const users = await kv.getByPrefix('user:');
    
    const allKeys = [
      ...locations.map((l: any) => `location:${l.id}`),
      ...properties.map((p: any) => `property:${p.id}`),
      ...guests.map((g: any) => `guest:${g.id}`),
      ...reservations.map((r: any) => `reservation:${r.id}`),
      ...blocks.map((b: any) => `block:${b.id}`),
      ...customPrices.map((p: any) => `customprice:${p.id}`),
      ...customMinNights.map((m: any) => `customminnight:${m.id}`),
      ...organizations.map((o: any) => `org:${o.id}`),
      ...users.map((u: any) => `user:${u.id}`),
    ];
    
    if (allKeys.length > 0) {
      await kv.mdel(allKeys);
    }
    
    console.log(`✅ Cleared ${allKeys.length} records`);
    
    return c.json({
      success: true,
      message: 'Database cleared successfully',
      data: {
        deletedCount: allKeys.length,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error clearing database:', error);
    return c.json({
      success: false,
      error: 'Failed to clear database',
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    }, 500);
  }
});

// ============================================================================
// ERROR HANDLER
// ============================================================================

app.onError((err, c) => {
  console.error('[ERROR]', err);
  return c.json({
    success: false,
    error: 'Internal server error',
    message: err.message,
    timestamp: new Date().toISOString(),
  }, 500);
});

// ============================================================================
// 404 HANDLER
// ============================================================================

app.notFound((c) => {
  return c.json({
    success: false,
    error: 'Not found',
    message: `Route ${c.req.method} ${c.req.path} not found`,
    timestamp: new Date().toISOString(),
  }, 404);
});

// ============================================================================
// START SERVER
// ============================================================================

console.log('🚀 Rendizy Backend API starting...');
console.log('📅 All routes registered successfully');

Deno.serve(app.fetch);