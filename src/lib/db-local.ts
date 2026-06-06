// ============================================
// Travel Tree Overseas — Local JSON Database
// Abstracted data layer (Supabase-ready)
// ============================================

import fs from 'fs';
import path from 'path';
import {
  User,
  SiteContent,
  MedicalBooking,
  VisaTracking,
  Payment,
  Integration,
  ContactMessage,
} from './types';

const DATA_DIR = path.join(process.cwd(), 'data');

// Ensure data directory exists
function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

// Generic read/write functions
function readJsonFile<T>(filename: string, defaultValue: T): T {
  ensureDataDir();
  const filePath = path.join(DATA_DIR, filename);
  try {
    if (!fs.existsSync(filePath)) {
      writeJsonFile(filename, defaultValue);
      return defaultValue;
    }
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data) as T;
  } catch {
    return defaultValue;
  }
}

function writeJsonFile<T>(filename: string, data: T): void {
  ensureDataDir();
  const filePath = path.join(DATA_DIR, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

// ============ USERS ============
export function getUsers(): User[] {
  return readJsonFile<User[]>('users.json', []);
}

export function getUserById(id: string): User | undefined {
  return getUsers().find((u) => u.id === id);
}

export function getUserByEmail(email: string): User | undefined {
  return getUsers().find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function createUser(user: User): User {
  const users = getUsers();
  users.push(user);
  writeJsonFile('users.json', users);
  return user;
}

export function updateUser(id: string, updates: Partial<User>): User | null {
  const users = getUsers();
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return null;
  users[index] = { ...users[index], ...updates, updatedAt: new Date().toISOString() };
  writeJsonFile('users.json', users);
  return users[index];
}

export function deleteUser(id: string): boolean {
  const users = getUsers();
  const filtered = users.filter((u) => u.id !== id);
  if (filtered.length === users.length) return false;
  writeJsonFile('users.json', filtered);
  return true;
}

// ============ SITE CONTENT ============
export function getSiteContent(): SiteContent {
  return readJsonFile<SiteContent>('site-content.json', getDefaultSiteContent());
}

export function updateSiteContent(updates: Partial<SiteContent>): SiteContent {
  const content = getSiteContent();
  const updated = { ...content, ...updates };
  writeJsonFile('site-content.json', updated);
  return updated;
}

export function updateSiteContentSection<K extends keyof SiteContent>(
  section: K,
  data: SiteContent[K]
): SiteContent {
  const content = getSiteContent();
  content[section] = data;
  writeJsonFile('site-content.json', content);
  return content;
}

// ============ MEDICAL BOOKINGS ============
export function getMedicalBookings(): MedicalBooking[] {
  return readJsonFile<MedicalBooking[]>('medical-bookings.json', []);
}

export function getMedicalBookingById(id: string): MedicalBooking | undefined {
  return getMedicalBookings().find((b) => b.id === id);
}

export function getMedicalBookingsByClient(clientId: string): MedicalBooking[] {
  return getMedicalBookings().filter((b) => b.clientId === clientId);
}

export function createMedicalBooking(booking: MedicalBooking): MedicalBooking {
  const bookings = getMedicalBookings();
  bookings.push(booking);
  writeJsonFile('medical-bookings.json', bookings);
  return booking;
}

export function updateMedicalBooking(
  id: string,
  updates: Partial<MedicalBooking>
): MedicalBooking | null {
  const bookings = getMedicalBookings();
  const index = bookings.findIndex((b) => b.id === id);
  if (index === -1) return null;
  bookings[index] = { ...bookings[index], ...updates, updatedAt: new Date().toISOString() };
  writeJsonFile('medical-bookings.json', bookings);
  return bookings[index];
}

export function deleteMedicalBooking(id: string): boolean {
  const bookings = getMedicalBookings();
  const filtered = bookings.filter((b) => b.id !== id);
  if (filtered.length === bookings.length) return false;
  writeJsonFile('medical-bookings.json', filtered);
  return true;
}

// ============ VISA TRACKING ============
export function getVisaTrackings(): VisaTracking[] {
  return readJsonFile<VisaTracking[]>('visa-tracking.json', []);
}

export function getVisaTrackingById(id: string): VisaTracking | undefined {
  return getVisaTrackings().find((v) => v.id === id);
}

export function getVisaTrackingsByClient(clientId: string): VisaTracking[] {
  return getVisaTrackings().filter((v) => v.clientId === clientId);
}

export function createVisaTracking(visa: VisaTracking): VisaTracking {
  const visas = getVisaTrackings();
  visas.push(visa);
  writeJsonFile('visa-tracking.json', visas);
  return visa;
}

export function updateVisaTracking(
  id: string,
  updates: Partial<VisaTracking>
): VisaTracking | null {
  const visas = getVisaTrackings();
  const index = visas.findIndex((v) => v.id === id);
  if (index === -1) return null;
  visas[index] = { ...visas[index], ...updates, updatedAt: new Date().toISOString() };
  writeJsonFile('visa-tracking.json', visas);
  return visas[index];
}

// ============ PAYMENTS ============
export function getPayments(): Payment[] {
  return readJsonFile<Payment[]>('payments.json', []);
}

export function getPaymentById(id: string): Payment | undefined {
  return getPayments().find((p) => p.id === id);
}

export function getPaymentsByClient(clientId: string): Payment[] {
  return getPayments().filter((p) => p.clientId === clientId);
}

export function createPayment(payment: Payment): Payment {
  const payments = getPayments();
  payments.push(payment);
  writeJsonFile('payments.json', payments);
  return payment;
}

export function updatePayment(id: string, updates: Partial<Payment>): Payment | null {
  const payments = getPayments();
  const index = payments.findIndex((p) => p.id === id);
  if (index === -1) return null;
  payments[index] = { ...payments[index], ...updates, updatedAt: new Date().toISOString() };
  writeJsonFile('payments.json', payments);
  return payments[index];
}

// ============ INTEGRATIONS ============
export function getIntegrations(): Integration[] {
  return readJsonFile<Integration[]>('integrations.json', getDefaultIntegrations());
}

export function updateIntegration(
  id: string,
  updates: Partial<Integration>
): Integration | null {
  const integrations = getIntegrations();
  const index = integrations.findIndex((i) => i.id === id);
  if (index === -1) return null;
  integrations[index] = {
    ...integrations[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  writeJsonFile('integrations.json', integrations);
  return integrations[index];
}

// ============ CONTACT MESSAGES ============
export function getContactMessages(): ContactMessage[] {
  return readJsonFile<ContactMessage[]>('contact-messages.json', []);
}

export function createContactMessage(message: ContactMessage): ContactMessage {
  const messages = getContactMessages();
  messages.push(message);
  writeJsonFile('contact-messages.json', messages);
  return message;
}

export function markMessageRead(id: string): boolean {
  const messages = getContactMessages();
  const index = messages.findIndex((m) => m.id === id);
  if (index === -1) return false;
  messages[index].isRead = true;
  writeJsonFile('contact-messages.json', messages);
  return true;
}

export function deleteContactMessage(id: string): boolean {
  const messages = getContactMessages();
  const filtered = messages.filter((m) => m.id !== id);
  if (filtered.length === messages.length) return false;
  writeJsonFile('contact-messages.json', filtered);
  return true;
}

// ============ DEFAULT DATA ============
function getDefaultIntegrations(): Integration[] {
  return [
    {
      id: 'int_gtm',
      name: 'Google Tag Manager',
      type: 'gtm',
      isActive: false,
      config: { containerId: '' },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'int_fbpixel',
      name: 'Facebook Pixel',
      type: 'facebook_pixel',
      isActive: false,
      config: { pixelId: '' },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'int_ga',
      name: 'Google Analytics',
      type: 'google_analytics',
      isActive: false,
      config: { measurementId: '' },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'int_whatsapp',
      name: 'WhatsApp',
      type: 'whatsapp',
      isActive: true,
      config: { phoneNumber: '+8801XXXXXXXXX', message: 'Hello! I need help with...' },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'int_custom',
      name: 'Custom Script',
      type: 'custom_script',
      isActive: false,
      config: { headScript: '', bodyScript: '' },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];
}

function getDefaultSiteContent(): SiteContent {
  return {
    hero: {
      title: 'Your Gateway to the World',
      subtitle:
        'Travel Tree Overseas — Your trusted partner for GCC medical, KSA visa processing, air tickets, and complete travel solutions.',
      backgroundImage: '/images/hero-bg.jpg',
      ctaText: 'Start Your Journey',
      ctaLink: '/register',
    },
    about: {
      title: 'About Travel Tree Overseas',
      subtitle: 'Your Trusted Travel Partner Since 2015',
      description:
        'Travel Tree Overseas is a leading travel agency specializing in GCC medical processing, KSA visa services, air ticketing, and comprehensive travel solutions. With years of experience and a dedicated team, we ensure seamless travel experiences for our clients.',
      mission:
        'To provide reliable, efficient, and affordable travel services that make every journey memorable and hassle-free.',
      vision:
        'To become the most trusted travel agency in Bangladesh, connecting people to opportunities across the globe.',
      teamMembers: [
        {
          id: 'team_1',
          name: 'Mohammad Rahman',
          role: 'Managing Director',
          image: '/images/team-1.jpg',
          bio: '15+ years of experience in the travel industry.',
        },
        {
          id: 'team_2',
          name: 'Fatima Akter',
          role: 'Operations Manager',
          image: '/images/team-2.jpg',
          bio: 'Expert in visa processing and client relations.',
        },
        {
          id: 'team_3',
          name: 'Abdul Karim',
          role: 'Medical Coordinator',
          image: '/images/team-3.jpg',
          bio: 'Specialized in GCC medical booking and coordination.',
        },
      ],
      image: '/images/about-hero.jpg',
    },
    services: [
      {
        id: 'svc_1',
        title: 'GCC Medical Booking',
        description:
          'Complete GCC medical test booking service. We handle the entire process from appointment scheduling to result delivery through our authorized medical account.',
        icon: 'Stethoscope',
        features: [
          'Authorized GAMCA medical center booking',
          'Fast appointment scheduling',
          'Result tracking & delivery',
          'All GCC countries supported',
        ],
        price: 'Starting from ৳5,000',
        isActive: true,
      },
      {
        id: 'svc_2',
        title: 'KSA Visa Processing',
        description:
          'Complete Saudi Arabia visa processing service including work visa, visit visa, Hajj & Umrah visa with full documentation support.',
        icon: 'FileCheck',
        features: [
          'Work visa processing',
          'Visit & family visa',
          'Hajj & Umrah visa',
          'Document attestation',
        ],
        price: 'Starting from ৳15,000',
        isActive: true,
      },
      {
        id: 'svc_3',
        title: 'Air Ticketing',
        description:
          'Domestic and international air ticket booking at competitive prices. We partner with all major airlines to offer you the best deals.',
        icon: 'Plane',
        features: [
          'All major airlines',
          'Best price guarantee',
          'Group booking discounts',
          '24/7 support',
        ],
        price: 'Best Market Price',
        isActive: true,
      },
      {
        id: 'svc_4',
        title: 'Hotel Booking',
        description:
          'Premium hotel booking services worldwide. From budget-friendly stays to luxury resorts, we find the perfect accommodation for you.',
        icon: 'Hotel',
        features: [
          'Worldwide hotels',
          'Best rate guarantee',
          'Free cancellation options',
          'Corporate rates',
        ],
        price: 'Varies by destination',
        isActive: true,
      },
      {
        id: 'svc_5',
        title: 'Manpower Export',
        description:
          'Complete manpower recruitment and export services for GCC countries. We connect skilled workers with international opportunities.',
        icon: 'Users',
        features: [
          'Skilled worker recruitment',
          'Document processing',
          'Pre-departure training',
          'Full legal compliance',
        ],
        price: 'Contact for details',
        isActive: true,
      },
      {
        id: 'svc_6',
        title: 'Hajj & Umrah Packages',
        description:
          'Comprehensive Hajj and Umrah packages with hotel accommodation, transportation, and guided tours. Making your spiritual journey memorable.',
        icon: 'Moon',
        features: [
          '5-star hotel packages',
          'VIP transportation',
          'Experienced guides',
          'Group & family packages',
        ],
        price: 'Starting from ৳3,50,000',
        isActive: true,
      },
    ],
    testimonials: [
      {
        id: 'test_1',
        name: 'Rafiqul Islam',
        country: 'Saudi Arabia',
        comment:
          'Travel Tree Overseas made my KSA visa process so smooth. Highly recommended!',
        rating: 5,
      },
      {
        id: 'test_2',
        name: 'Sharmin Begum',
        country: 'UAE',
        comment:
          'Excellent service for GCC medical booking. Got my appointment within 2 days.',
        rating: 5,
      },
      {
        id: 'test_3',
        name: 'Kamal Hossain',
        country: 'Qatar',
        comment:
          'Best travel agency in Dhaka. Professional team and reasonable prices.',
        rating: 4,
      },
    ],
    contact: {
      address: 'House #12, Road #5, Banani, Dhaka-1213, Bangladesh',
      phone: '+880-1700-000000',
      email: 'info@traveltreeoverseas.com',
      whatsapp: '+8801700000000',
      mapEmbedUrl:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.!2d90.39!3d23.79!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ3JzI0LjAiTiA5MMKwMjMnMjQuMCJF!5e0!3m2!1sen!2sbd!4v1',
      workingHours: 'Saturday - Thursday: 9:00 AM - 7:00 PM',
    },
    footer: {
      description:
        'Travel Tree Overseas is your trusted partner for all travel needs. From visa processing to air ticketing, we make your journey seamless.',
      socialLinks: {
        facebook: 'https://facebook.com/traveltreeoverseas',
        instagram: 'https://instagram.com/traveltreeoverseas',
        youtube: 'https://youtube.com/traveltreeoverseas',
        linkedin: 'https://linkedin.com/company/traveltreeoverseas',
      },
    },
    terms:
      '# Terms and Conditions\n\n## 1. Introduction\nWelcome to Travel Tree Overseas. These terms and conditions outline the rules and regulations for the use of our services.\n\n## 2. Services\nTravel Tree Overseas provides travel-related services including but not limited to:\n- GCC Medical booking and processing\n- Visa processing and consultation\n- Air ticket booking\n- Hotel reservation\n- Manpower export services\n\n## 3. Payment Terms\n- All payments must be made in advance before service delivery.\n- For GCC Medical booking, full payment is required before appointment scheduling.\n- Payment can be made via bank transfer, bKash, Nagad, or cash at our office.\n- Refund policy applies as per service-specific terms.\n\n## 4. Cancellation Policy\n- Cancellation requests must be made at least 48 hours before the scheduled service.\n- Cancellation fees may apply depending on the service type.\n- Non-refundable services will be clearly mentioned at the time of booking.\n\n## 5. Client Responsibilities\n- Provide accurate and complete information.\n- Submit all required documents on time.\n- Ensure passport validity for at least 6 months.\n\n## 6. Limitation of Liability\nTravel Tree Overseas is not liable for:\n- Visa rejection by embassy/consulate.\n- Flight delays or cancellations by airlines.\n- Medical test results or delays from medical centers.\n\n## 7. Contact\nFor any questions about these terms, please contact us at info@traveltreeoverseas.com.',
    privacy:
      '# Privacy Policy\n\n## 1. Information We Collect\nWe collect the following types of information:\n- Personal identification information (name, email, phone, passport details)\n- Payment information\n- Travel preferences and history\n\n## 2. How We Use Your Information\n- To process your bookings and applications\n- To communicate service updates\n- To improve our services\n- To comply with legal requirements\n\n## 3. Data Protection\n- All personal data is stored securely.\n- We do not sell your information to third parties.\n- Access to data is restricted to authorized personnel only.\n\n## 4. Cookies\nOur website may use cookies to enhance user experience.\n\n## 5. Your Rights\n- Access your personal data\n- Request data correction\n- Request data deletion\n- Opt-out of marketing communications\n\n## 6. Contact\nFor privacy-related inquiries, email us at privacy@traveltreeoverseas.com.',
    seo: {
      home: {
        title: 'Travel Tree Overseas — GCC Medical, KSA Visa & Travel Services',
        description:
          'Travel Tree Overseas is your trusted partner for GCC medical booking, KSA visa processing, air ticketing, and complete travel solutions in Bangladesh.',
        keywords:
          'travel agency bangladesh, gcc medical, ksa visa, air ticket, travel tree overseas',
      },
      about: {
        title: 'About Us — Travel Tree Overseas',
        description:
          'Learn about Travel Tree Overseas, a leading travel agency in Bangladesh specializing in GCC medical and KSA visa services.',
        keywords: 'about travel tree overseas, travel agency dhaka',
      },
      services: {
        title: 'Our Services — Travel Tree Overseas',
        description:
          'Explore our services: GCC Medical Booking, KSA Visa Processing, Air Ticketing, Hotel Booking, and more.',
        keywords: 'gcc medical booking, ksa visa processing, travel services bangladesh',
      },
      contact: {
        title: 'Contact Us — Travel Tree Overseas',
        description:
          'Get in touch with Travel Tree Overseas for all your travel needs. Visit our office or contact us online.',
        keywords: 'contact travel tree overseas, travel agency contact',
      },
    },
  };
}
