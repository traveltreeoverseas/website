import { supabase, supabaseAdmin } from './supabase';

function getSupabaseAdmin() {
  if (!supabaseAdmin) {
    throw new Error('Supabase is not configured. Please check your environment variables.');
  }
  return supabaseAdmin;
}

import type {
  User,
  SiteContent,
  MedicalBooking,
  VisaTracking,
  Payment,
  Integration,
  ContactMessage,
} from './types';

function formatDate(): string {
  return new Date().toISOString();
}

// ==================== KEY CONVERSION HELPERS ====================

/**
 * Convert snake_case DB object to camelCase TypeScript object
 */
function dbToTs<T>(dbObj: any): T {
  if (!dbObj) return dbObj;
  if (Array.isArray(dbObj)) return dbObj.map(dbToTs) as any;

  const result: any = {};
  for (const key in dbObj) {
    if (Object.prototype.hasOwnProperty.call(dbObj, key)) {
      // Convert snake_case to camelCase
      const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
      result[camelKey] = dbObj[key];
    }
  }
  return result as T;
}

/**
 * Convert camelCase TypeScript object to snake_case DB object
 */
function tsToDb(tsObj: any): any {
  if (!tsObj) return tsObj;
  if (Array.isArray(tsObj)) return tsObj.map(tsToDb);

  const result: any = {};
  for (const key in tsObj) {
    if (Object.prototype.hasOwnProperty.call(tsObj, key)) {
      // Convert camelCase to snake_case
      const snakeKey = key.replace(/([A-Z])/g, letter => `_${letter.toLowerCase()}`).replace(/^_/, '');
      result[snakeKey] = tsObj[key];
    }
  }
  return result;
}

// ==================== USERS ====================

export async function getUsers(): Promise<User[]> {
  const admin = getSupabaseAdmin();
  const { data, error } = await admin.from('users').select('*');
  if (error) throw error;
  return (data || []).map(dbToTs) as User[];
}

export async function getUserById(id: string): Promise<User | null> {
  const admin = getSupabaseAdmin();
  const { data, error } = await admin.from('users').select('*').eq('id', id).single();
  if (error) return null;
  return dbToTs<User>(data);
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const admin = getSupabaseAdmin();
  const { data, error } = await admin
    .from('users')
    .select('*')
    .ilike('email', email)
    .single();
  if (error) return null;
  return dbToTs<User>(data);
}

export async function createUser(user: User): Promise<User> {
  const admin = getSupabaseAdmin();
  const dbUser = tsToDb(user);
  const { data, error } = await admin.from('users').insert(dbUser).select().single();
  if (error) throw error;
  return dbToTs<User>(data);
}

export async function updateUser(id: string, updates: Partial<User>): Promise<User | null> {
  const admin = getSupabaseAdmin();
  const dbUpdates = tsToDb(updates);
  const { data, error } = await admin
    .from('users')
    .update({ ...dbUpdates, updated_at: formatDate() })
    .eq('id', id)
    .select()
    .single();
  if (error) return null;
  return dbToTs<User>(data);
}

export async function deleteUser(id: string): Promise<boolean> {
  const admin = getSupabaseAdmin();
  const { error } = await admin.from('users').delete().eq('id', id);
  return !error;
}

// ==================== SITE CONTENT ====================

function mapSiteContent(row: any): SiteContent {
  return {
    hero: {
      title: row.hero_title || '',
      subtitle: row.hero_subtitle || '',
      backgroundImage: row.hero_background_image || '',
      ctaText: row.hero_cta_text || '',
      ctaLink: row.hero_cta_link || '',
    },
    about: {
      title: row.about_title || '',
      subtitle: row.about_subtitle || '',
      description: row.about_description || '',
      mission: row.about_mission || '',
      vision: row.about_vision || '',
      teamMembers: row.about_team_members || [],
      image: row.about_image || '',
    },
    services: row.services || [],
    testimonials: row.testimonials || [],
    contact: {
      address: row.contact_address || '',
      phone: row.contact_phone || '',
      email: row.contact_email || '',
      whatsapp: row.contact_whatsapp || '',
      mapEmbedUrl: row.contact_map_embed_url || '',
      workingHours: row.contact_working_hours || '',
    },
    footer: {
      description: row.footer_description || '',
      socialLinks: row.footer_social_links || {},
    },
    terms: row.terms || '',
    privacy: row.privacy || '',
    seo: row.seo || {},
  };
}

function flattenSiteContent(updates: Partial<SiteContent>): any {
  const flat: any = {};
  if (updates.hero) {
    flat.hero_title = updates.hero.title;
    flat.hero_subtitle = updates.hero.subtitle;
    flat.hero_background_image = updates.hero.backgroundImage;
    flat.hero_cta_text = updates.hero.ctaText;
    flat.hero_cta_link = updates.hero.ctaLink;
  }
  if (updates.about) {
    flat.about_title = updates.about.title;
    flat.about_subtitle = updates.about.subtitle;
    flat.about_description = updates.about.description;
    flat.about_mission = updates.about.mission;
    flat.about_vision = updates.about.vision;
    flat.about_team_members = updates.about.teamMembers;
    flat.about_image = updates.about.image;
  }
  if (updates.services) flat.services = updates.services;
  if (updates.testimonials) flat.testimonials = updates.testimonials;
  if (updates.contact) {
    flat.contact_address = updates.contact.address;
    flat.contact_phone = updates.contact.phone;
    flat.contact_email = updates.contact.email;
    flat.contact_whatsapp = updates.contact.whatsapp;
    flat.contact_map_embed_url = updates.contact.mapEmbedUrl;
    flat.contact_working_hours = updates.contact.workingHours;
  }
  if (updates.footer) {
    flat.footer_description = updates.footer.description;
    flat.footer_social_links = updates.footer.socialLinks;
  }
  if (updates.terms !== undefined) flat.terms = updates.terms;
  if (updates.privacy !== undefined) flat.privacy = updates.privacy;
  if (updates.seo) flat.seo = updates.seo;
  return flat;
}

export async function getSiteContent(): Promise<SiteContent> {
  const admin = getSupabaseAdmin();
  const { data, error } = await admin.from('site_content').select('*').single();
  if (error || !data) return getDefaultSiteContent();
  return mapSiteContent(data);
}

export async function updateSiteContent(updates: Partial<SiteContent>): Promise<SiteContent> {
  const admin = getSupabaseAdmin();
  const flatUpdates = flattenSiteContent(updates);
  const { data, error } = await admin
    .from('site_content')
    .update({ ...flatUpdates, updated_at: formatDate() })
    .select()
    .single();
  if (error) throw error;
  return mapSiteContent(data);
}

export async function updateSiteContentSection<K extends keyof SiteContent>(
  section: K,
  value: SiteContent[K]
): Promise<SiteContent> {
  const admin = getSupabaseAdmin();
  const columnMap: Record<string, string> = {
    hero: 'hero_title',
    about: 'about_title',
    services: 'services',
    testimonials: 'testimonials',
    contact: 'contact_address',
    footer: 'footer_description',
    terms: 'terms',
    privacy: 'privacy',
    seo: 'seo',
  };

  const column = columnMap[section];
  const updateObj: any = { [column]: value, updated_at: formatDate() };
  const { data, error } = await admin
    .from('site_content')
    .update(updateObj)
    .select()
    .single();
  if (error) throw error;
  return mapSiteContent(data);
}

// ==================== MEDICAL BOOKINGS ====================

export async function getMedicalBookings(): Promise<MedicalBooking[]> {
  const admin = getSupabaseAdmin();
  const { data, error } = await admin.from('medical_bookings').select('*');
  if (error) throw error;
  return (data || []).map(dbToTs) as MedicalBooking[];
}

export async function getMedicalBookingById(id: string): Promise<MedicalBooking | null> {
  const admin = getSupabaseAdmin();
  const { data, error } = await admin.from('medical_bookings').select('*').eq('id', id).single();
  if (error) return null;
  return dbToTs<MedicalBooking>(data);
}

export async function getMedicalBookingsByClient(clientId: string): Promise<MedicalBooking[]> {
  const admin = getSupabaseAdmin();
  const { data, error } = await admin
    .from('medical_bookings')
    .select('*')
    .eq('client_id', clientId);
  if (error) throw error;
  return (data || []).map(dbToTs) as MedicalBooking[];
}

export async function createMedicalBooking(booking: MedicalBooking): Promise<MedicalBooking> {
  const admin = getSupabaseAdmin();
  const dbBooking = tsToDb(booking);
  const { data, error } = await admin.from('medical_bookings').insert(dbBooking).select().single();
  if (error) throw error;
  return dbToTs<MedicalBooking>(data);
}

export async function updateMedicalBooking(
  id: string,
  updates: Partial<MedicalBooking>
): Promise<MedicalBooking | null> {
  const admin = getSupabaseAdmin();
  const dbUpdates = tsToDb(updates);
  const { data, error } = await admin
    .from('medical_bookings')
    .update({ ...dbUpdates, updated_at: formatDate() })
    .eq('id', id)
    .select()
    .single();
  if (error) return null;
  return dbToTs<MedicalBooking>(data);
}

export async function deleteMedicalBooking(id: string): Promise<boolean> {
  const admin = getSupabaseAdmin();
  const { error } = await admin.from('medical_bookings').delete().eq('id', id);
  return !error;
}

// ==================== VISA TRACKING ====================

export async function getVisaTrackings(): Promise<VisaTracking[]> {
  const admin = getSupabaseAdmin();
  const { data, error } = await admin.from('visa_tracking').select('*');
  if (error) throw error;
  return (data || []).map(dbToTs) as VisaTracking[];
}

export async function getVisaTrackingById(id: string): Promise<VisaTracking | null> {
  const admin = getSupabaseAdmin();
  const { data, error } = await admin.from('visa_tracking').select('*').eq('id', id).single();
  if (error) return null;
  return dbToTs<VisaTracking>(data);
}

export async function getVisaTrackingsByClient(clientId: string): Promise<VisaTracking[]> {
  const admin = getSupabaseAdmin();
  const { data, error } = await admin
    .from('visa_tracking')
    .select('*')
    .eq('client_id', clientId);
  if (error) throw error;
  return (data || []).map(dbToTs) as VisaTracking[];
}

export async function createVisaTracking(visa: VisaTracking): Promise<VisaTracking> {
  const admin = getSupabaseAdmin();
  const dbVisa = tsToDb(visa);
  const { data, error } = await admin.from('visa_tracking').insert(dbVisa).select().single();
  if (error) throw error;
  return dbToTs<VisaTracking>(data);
}

export async function updateVisaTracking(
  id: string,
  updates: Partial<VisaTracking>
): Promise<VisaTracking | null> {
  const admin = getSupabaseAdmin();
  const dbUpdates = tsToDb(updates);
  const { data, error } = await admin
    .from('visa_tracking')
    .update({ ...dbUpdates, updated_at: formatDate() })
    .eq('id', id)
    .select()
    .single();
  if (error) return null;
  return dbToTs<VisaTracking>(data);
}

// ==================== PAYMENTS ====================

export async function getPayments(): Promise<Payment[]> {
  const admin = getSupabaseAdmin();
  const { data, error } = await admin.from('payments').select('*');
  if (error) throw error;
  return (data || []).map(dbToTs) as Payment[];
}

export async function getPaymentById(id: string): Promise<Payment | null> {
  const admin = getSupabaseAdmin();
  const { data, error } = await admin.from('payments').select('*').eq('id', id).single();
  if (error) return null;
  return dbToTs<Payment>(data);
}

export async function getPaymentsByClient(clientId: string): Promise<Payment[]> {
  const admin = getSupabaseAdmin();
  const { data, error } = await admin
    .from('payments')
    .select('*')
    .eq('client_id', clientId);
  if (error) throw error;
  return (data || []).map(dbToTs) as Payment[];
}

export async function createPayment(payment: Payment): Promise<Payment> {
  const admin = getSupabaseAdmin();
  const dbPayment = tsToDb(payment);
  const { data, error } = await admin.from('payments').insert(dbPayment).select().single();
  if (error) throw error;
  return dbToTs<Payment>(data);
}

export async function updatePayment(
  id: string,
  updates: Partial<Payment>
): Promise<Payment | null> {
  const admin = getSupabaseAdmin();
  const dbUpdates = tsToDb(updates);
  const { data, error } = await admin
    .from('payments')
    .update({ ...dbUpdates, updated_at: formatDate() })
    .eq('id', id)
    .select()
    .single();
  if (error) return null;
  return dbToTs<Payment>(data);
}

// ==================== INTEGRATIONS ====================

export async function getIntegrations(): Promise<Integration[]> {
  const admin = getSupabaseAdmin();
  const { data, error } = await admin.from('integrations').select('*');
  if (error) throw error;
  return (data || []).map(dbToTs) as Integration[];
}

export async function updateIntegration(
  id: string,
  updates: Partial<Integration>
): Promise<Integration | null> {
  const admin = getSupabaseAdmin();
  const dbUpdates = tsToDb(updates);
  const { data, error } = await admin
    .from('integrations')
    .update({ ...dbUpdates, updated_at: formatDate() })
    .eq('id', id)
    .select()
    .single();
  if (error) return null;
  return dbToTs<Integration>(data);
}

// ==================== CONTACT MESSAGES ====================

export async function getContactMessages(): Promise<ContactMessage[]> {
  const admin = getSupabaseAdmin();
  const { data, error } = await admin.from('contact_messages').select('*');
  if (error) throw error;
  return (data || []).map(dbToTs) as ContactMessage[];
}

export async function createContactMessage(message: ContactMessage): Promise<ContactMessage> {
  const admin = getSupabaseAdmin();
  const dbMessage = tsToDb(message);
  const { data, error } = await admin.from('contact_messages').insert(dbMessage).select().single();
  if (error) throw error;
  return dbToTs<ContactMessage>(data);
}

export async function markMessageRead(id: string): Promise<boolean> {
  const admin = getSupabaseAdmin();
  const { error } = await admin
    .from('contact_messages')
    .update({ is_read: true })
    .eq('id', id);
  return !error;
}

export async function deleteContactMessage(id: string): Promise<boolean> {
  const admin = getSupabaseAdmin();
  const { error } = await admin.from('contact_messages').delete().eq('id', id);
  return !error;
}

// ==================== DEFAULT DATA ====================

function getDefaultIntegrations(): Integration[] {
  return [
    { id: 'int_gtm', name: 'Google Tag Manager', type: 'gtm', isActive: false, config: { containerId: '' }, createdAt: formatDate(), updatedAt: formatDate() },
    { id: 'int_fbpixel', name: 'Facebook Pixel', type: 'facebook_pixel', isActive: false, config: { pixelId: '' }, createdAt: formatDate(), updatedAt: formatDate() },
    { id: 'int_ga', name: 'Google Analytics', type: 'google_analytics', isActive: false, config: { measurementId: '' }, createdAt: formatDate(), updatedAt: formatDate() },
    { id: 'int_whatsapp', name: 'WhatsApp', type: 'whatsapp', isActive: true, config: { phoneNumber: '+8801XXXXXXXXX', message: 'Hello! I need help with...' }, createdAt: formatDate(), updatedAt: formatDate() },
    { id: 'int_custom', name: 'Custom Script', type: 'custom_script', isActive: false, config: { headScript: '', bodyScript: '' }, createdAt: formatDate(), updatedAt: formatDate() },
  ];
}

function getDefaultSiteContent(): SiteContent {
  return {
    hero: { title: 'Your Gateway to the World', subtitle: 'Travel Tree Overseas — Your trusted partner for GCC medical, KSA visa processing, air tickets, and complete travel solutions.', backgroundImage: '/images/hero-bg.jpg', ctaText: 'Start Your Journey', ctaLink: '/register' },
    about: { title: 'About Travel Tree Overseas', subtitle: 'Your Trusted Travel Partner Since 2015', description: 'Travel Tree Overseas is a leading travel agency specializing in GCC medical processing, KSA visa services, air ticketing, and comprehensive travel solutions.', mission: 'To provide reliable, efficient, and affordable travel services.', vision: 'To become the most trusted travel agency in Bangladesh.', teamMembers: [], image: '/images/about-hero.jpg' },
    services: [],
    testimonials: [],
    contact: { address: 'House #12, Road #5, Banani, Dhaka-1213, Bangladesh', phone: '+880-1700-000000', email: 'info@traveltreeoverseas.com', whatsapp: '+8801700000000', mapEmbedUrl: '', workingHours: 'Saturday - Thursday: 9:00 AM - 7:00 PM' },
    footer: { description: 'Travel Tree Overseas is your trusted partner for all travel needs.', socialLinks: { facebook: '', instagram: '', youtube: '', linkedin: '' } },
    terms: '',
    privacy: '',
    seo: {},
  };
}
