// ============================================
// Travel Tree Overseas — TypeScript Types
// ============================================

export type UserRole = 'admin' | 'client';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string; // hashed
  role: UserRole;
  passportNumber?: string;
  nationality?: string;
  address?: string;
  avatar?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SiteContent {
  hero: {
    title: string;
    subtitle: string;
    backgroundImage: string;
    ctaText: string;
    ctaLink: string;
  };
  about: {
    title: string;
    subtitle: string;
    description: string;
    mission: string;
    vision: string;
    teamMembers: TeamMember[];
    image: string;
  };
  services: ServiceItem[];
  testimonials: Testimonial[];
  contact: {
    address: string;
    phone: string;
    email: string;
    whatsapp: string;
    mapEmbedUrl: string;
    workingHours: string;
  };
  footer: {
    description: string;
    socialLinks: {
      facebook: string;
      instagram: string;
      youtube: string;
      linkedin: string;
    };
  };
  terms: string;
  privacy: string;
  seo: {
    [page: string]: {
      title: string;
      description: string;
      keywords: string;
    };
  };
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  price?: string;
  isActive: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  country: string;
  comment: string;
  rating: number;
  avatar?: string;
}

export type MedicalBookingStatus =
  | 'pending_payment'
  | 'payment_submitted'
  | 'payment_verified'
  | 'booked'
  | 'completed'
  | 'cancelled';

export interface MedicalBooking {
  id: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  passportNumber: string;
  nationality: string;
  medicalCenter: string;
  country: string;
  preferredDate: string;
  amount: number;
  paymentProof?: string;
  paymentMethod?: string;
  serialNumber?: string;
  status: MedicalBookingStatus;
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export type VisaStatus =
  | 'submitted'
  | 'documents_verified'
  | 'processing'
  | 'stamped'
  | 'delivered'
  | 'rejected';

export type VisaType =
  | 'work'
  | 'visit'
  | 'hajj'
  | 'umrah'
  | 'business'
  | 'family';

export interface VisaTracking {
  id: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  passportNumber: string;
  visaType: VisaType;
  country: string;
  status: VisaStatus;
  applicationDate: string;
  expectedDate?: string;
  deliveryDate?: string;
  referenceNumber?: string;
  documents: string[];
  statusHistory: StatusHistoryItem[];
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface StatusHistoryItem {
  status: string;
  date: string;
  note?: string;
}

export type PaymentStatus = 'pending' | 'submitted' | 'verified' | 'rejected';

export interface Payment {
  id: string;
  clientId: string;
  clientName: string;
  bookingId?: string;
  bookingType: 'medical' | 'visa' | 'other';
  amount: number;
  paymentMethod: string;
  transactionId?: string;
  paymentProof?: string;
  status: PaymentStatus;
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Integration {
  id: string;
  name: string;
  type: 'gtm' | 'facebook_pixel' | 'google_analytics' | 'whatsapp' | 'custom_script';
  isActive: boolean;
  config: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

// Session types for NextAuth
export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
