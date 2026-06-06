# Travel Tree Overseas — Full-Stack Travel Agency Website

A premium travel agency website with admin CMS dashboard, client portal, GCC medical booking, and KSA visa tracking.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router, TypeScript) |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Auth | NextAuth.js (credentials provider) |
| Local DB | JSON file-based storage (Supabase-ready migration path) |
| State | React Context + Server Actions |
| Animations | Framer Motion (parallax, micro-interactions) |
| Icons | Lucide React |

---

## Proposed Architecture

```
e:\travel tree overceas\
├── app/
│   ├── (public)/              # Public-facing pages
│   │   ├── page.tsx           # Homepage with parallax hero
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── services/page.tsx
│   │   ├── terms/page.tsx
│   │   └── privacy/page.tsx
│   ├── (auth)/                # Auth pages
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   └── forgot-password/page.tsx
│   ├── client/                # Client dashboard (protected)
│   │   ├── dashboard/page.tsx
│   │   ├── medical-booking/page.tsx
│   │   ├── medical-status/page.tsx
│   │   ├── visa-status/page.tsx
│   │   ├── payments/page.tsx
│   │   └── profile/page.tsx
│   ├── admin/                 # Admin dashboard (protected)
│   │   ├── dashboard/page.tsx
│   │   ├── site-content/page.tsx      # CMS for all text/images
│   │   ├── integrations/page.tsx      # GTM, FB Pixel, etc.
│   │   ├── medical-bookings/page.tsx  # Manage GCC medical
│   │   ├── visa-tracking/page.tsx     # Manage KSA visa status
│   │   ├── clients/page.tsx           # Manage clients
│   │   ├── payments/page.tsx          # Payment management
│   │   └── settings/page.tsx
│   ├── api/                   # API routes
│   │   ├── auth/[...nextauth]/
│   │   ├── admin/
│   │   ├── client/
│   │   └── site-content/
│   └── layout.tsx
├── components/
│   ├── ui/                    # shadcn components
│   ├── public/                # Public page components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── HeroParallax.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   └── CTASection.tsx
│   ├── client/                # Client dashboard components
│   ├── admin/                 # Admin dashboard components
│   └── shared/                # Shared components
├── lib/
│   ├── db-local.ts            # Local JSON database layer
│   ├── auth.ts                # NextAuth config
│   ├── utils.ts
│   └── types.ts               # TypeScript types
├── data/                      # Local JSON storage
│   ├── users.json
│   ├── site-content.json
│   ├── medical-bookings.json
│   ├── visa-tracking.json
│   ├── payments.json
│   └── integrations.json
└── public/
    └── images/
```

---

## Proposed Changes

### Phase 1: Project Setup & Design System

#### [NEW] Project Initialization
- Initialize Next.js 15 with TypeScript, Tailwind CSS, ESLint
- Install and configure shadcn/ui (New York style, Zinc base color)
- Install dependencies: `framer-motion`, `next-auth`, `bcryptjs`, `lucide-react`
- Configure Tailwind with custom Travel Tree color palette:
  - **Primary**: Deep Teal `#0D7377` → `#14919B` (trust, travel)
  - **Accent**: Warm Gold `#D4A843` → `#E8C547` (premium feel)
  - **Dark**: Rich Navy `#0A1628` (backgrounds)
  - **Success/Error**: Standard semantic colors

#### [NEW] shadcn/ui Components to Install
```
button, card, input, label, textarea, select, dialog, dropdown-menu,
table, tabs, badge, avatar, separator, sheet, toast, form,
navigation-menu, checkbox, switch, skeleton, alert
```

---

### Phase 2: Local Database & Auth

#### [NEW] `lib/db-local.ts` — JSON File Database
- CRUD operations for all entities (users, bookings, visa, payments, content)
- File-based JSON storage in `/data` directory
- Abstracted interface so we can swap to Supabase later with minimal changes
- Functions: `readData()`, `writeData()`, `findById()`, `findByField()`, `create()`, `update()`, `delete()`

#### [NEW] `lib/auth.ts` — NextAuth Configuration
- Credentials provider (email/password)
- Role-based access: `admin` | `client`
- JWT strategy with role embedded in token
- Default admin account: `admin@traveltree.com` / `admin123`

#### [NEW] `lib/types.ts` — TypeScript Types
```typescript
User, SiteContent, MedicalBooking, VisaTracking,
Payment, Integration, ContactMessage
```

#### [NEW] `data/*.json` — Seed Data
- Pre-populated site content (hero text, about text, services, etc.)
- Default admin user
- Sample medical booking statuses
- Sample visa tracking entries

---

### Phase 3: Public Website (Mobile-First, Parallax)

#### [NEW] Homepage (`app/(public)/page.tsx`)
- **Hero Section**: Full-screen parallax with stunning travel imagery, animated text overlay
- **Services Grid**: GCC Medical, KSA Visa, Air Tickets, Hotel Booking (cards with hover effects)
- **Why Choose Us**: Animated counters, trust badges
- **Testimonials**: Auto-sliding carousel
- **CTA Section**: "Start Your Journey" with gradient background
- All text/images pulled from `site-content.json` (admin-editable)

#### [NEW] Navbar (`components/public/Navbar.tsx`)
- Transparent on hero → solid on scroll
- Mobile hamburger menu (sheet component)
- Client login/register buttons
- Logo + navigation links

#### [NEW] Footer (`components/public/Footer.tsx`)
- Company info, quick links, contact details
- Social media links
- WhatsApp floating button

#### [NEW] About Us (`app/(public)/about/page.tsx`)
- Company story with parallax image sections
- Team section, mission/vision
- All admin-editable

#### [NEW] Contact Us (`app/(public)/contact/page.tsx`)
- Contact form (saves to local DB)
- Google Maps embed (configurable from admin)
- Office address, phone, email, WhatsApp

#### [NEW] Services Page (`app/(public)/services/page.tsx`)
- Detailed service cards: GCC Medical, KSA Visa Processing, Air Tickets, Hotel Booking, Manpower, Hajj & Umrah
- Each with icon, description, pricing info

#### [NEW] Terms & Conditions (`app/(public)/terms/page.tsx`)
#### [NEW] Privacy Policy (`app/(public)/privacy/page.tsx`)
- Rich text content, admin-editable

---

### Phase 4: Client Portal

#### [NEW] Client Registration & Login
- Registration form: name, email, phone, password, passport number
- Email verification (simulated locally)
- Login with credentials

#### [NEW] Client Dashboard (`app/client/dashboard/page.tsx`)
- Overview cards: active bookings, visa status, pending payments
- Recent activity timeline
- Quick action buttons

#### [NEW] GCC Medical Booking (`app/client/medical-booking/page.tsx`)
- Multi-step booking form:
  1. Select medical center / country
  2. Enter personal + passport details
  3. Choose preferred date
  4. **Payment required** — shows amount, payment instructions
  5. Upload payment proof
  6. Confirmation with booking reference
- Status: `pending_payment` → `payment_received` → `booked` → `completed`

> [!IMPORTANT]
> **Business Rule**: Client MUST pay Travel Tree Overseas first before the medical serial is booked. The system enforces this by requiring payment proof upload and admin approval before proceeding.

#### [NEW] Medical Status (`app/client/medical-status/page.tsx`)
- List of all medical bookings with status badges
- Detailed view with timeline (submitted → paid → booked → completed)
- Download receipt/confirmation

#### [NEW] KSA Visa Status (`app/client/visa-status/page.tsx`)
- Visa application tracker with stages:
  `submitted` → `documents_verified` → `processing` → `stamped` → `delivered`
- Real-time status updates (admin updates from dashboard)
- Document checklist

#### [NEW] Payments (`app/client/payments/page.tsx`)
- Payment history table
- Pending payments with action buttons
- Receipt download

---

### Phase 5: Admin Dashboard

#### [NEW] Admin Dashboard Home (`app/admin/dashboard/page.tsx`)
- Stats overview: total clients, active bookings, pending payments, revenue
- Recent activity feed
- Quick action cards
- Charts (booking trends, revenue)

#### [NEW] Site Content Manager (`app/admin/site-content/page.tsx`)
- **Tabbed interface** for each page section:
  - Hero (title, subtitle, background image URL)
  - About Us (paragraphs, team members, images)
  - Services (title, description, icon, price for each service)
  - Contact (address, phone, email, map embed URL)
  - Footer (text, social links)
  - Terms & Conditions (rich text)
  - Privacy Policy (rich text)
- Inline editing with live preview
- Image upload (stored locally in `/public/uploads/`)

#### [NEW] Integration Manager (`app/admin/integrations/page.tsx`)
- **Google Tag Manager**: Input GTM container ID → injected in `<head>`
- **Facebook Pixel**: Input Pixel ID → injected in `<head>`
- **Google Analytics**: Input GA4 Measurement ID
- **WhatsApp**: Configure floating button number
- **Custom Scripts**: Add custom `<head>` or `<body>` scripts
- Toggle each integration on/off

#### [NEW] Medical Booking Manager (`app/admin/medical-bookings/page.tsx`)
- Table of all bookings with filters (status, date, client)
- Update booking status (with notes)
- View payment proof
- Assign medical serial number
- Send status notification

#### [NEW] Visa Tracking Manager (`app/admin/visa-tracking/page.tsx`)
- Create/update visa entries for clients
- Update visa stage with timestamp
- Add notes and documents
- Bulk status updates

#### [NEW] Client Manager (`app/admin/clients/page.tsx`)
- List all registered clients
- View client details, booking history
- Activate/deactivate accounts
- Search and filter

#### [NEW] Payment Manager (`app/admin/payments/page.tsx`)
- View all payments
- Approve/reject payment proofs
- Mark payments as received
- Generate payment reports

#### [NEW] Admin Settings (`app/admin/settings/page.tsx`)
- Change admin password
- Site-wide settings (site name, logo, favicon)
- Notification preferences

---

### Phase 6: API Routes

#### [NEW] Auth API (`app/api/auth/[...nextauth]/route.ts`)
- NextAuth handler with credentials provider

#### [NEW] Admin APIs (`app/api/admin/`)
- `site-content/route.ts` — GET/PUT site content
- `integrations/route.ts` — GET/PUT integrations
- `medical-bookings/route.ts` — GET/PUT/DELETE bookings
- `visa-tracking/route.ts` — CRUD visa entries
- `clients/route.ts` — GET/PUT clients
- `payments/route.ts` — GET/PUT payments
- `upload/route.ts` — File upload handler

#### [NEW] Client APIs (`app/api/client/`)
- `medical-booking/route.ts` — POST new booking, GET own bookings
- `visa-status/route.ts` — GET own visa status
- `payments/route.ts` — GET own payments, POST payment proof
- `profile/route.ts` — GET/PUT own profile

---

## Additional Features (My Suggestions)

| Feature | Description |
|---------|-------------|
| 🔔 **Notification System** | Toast notifications for status changes |
| 📱 **WhatsApp Integration** | Floating WhatsApp button for instant support |
| 🌙 **Dark/Light Mode** | Theme toggle with system preference detection |
| 📊 **Dashboard Analytics** | Visual charts for admin (booking trends, revenue) |
| 🔍 **Search** | Global search across bookings, clients, visa entries |
| 📋 **Document Checklist** | Auto-generated checklists for visa requirements |
| 💬 **Contact Form** | Public contact form that saves to admin panel |
| 🏷️ **SEO Manager** | Admin can edit meta titles/descriptions per page |
| 📤 **Export Data** | CSV export for bookings, payments, client data |

---

## Design Approach

### Mobile-First Philosophy
- All layouts built mobile-first, then scaled up with `md:` and `lg:` breakpoints
- Touch-friendly UI elements (minimum 44px tap targets)
- Bottom navigation bar on mobile for client/admin dashboards
- Responsive data tables (card view on mobile, table on desktop)

### Parallax & Performance
- Use CSS `transform: translate3d()` for GPU-accelerated parallax (no heavy JS libraries)
- Intersection Observer for lazy-loading parallax sections
- `next/image` with priority loading for hero, lazy for below-fold
- Images optimized with Next.js Image component (WebP, responsive sizes)
- Dynamic imports for heavy components (charts, editors)

### Color Palette & Typography
- **Font**: Inter (body) + Playfair Display (headings) — elegant travel feel
- **Colors**: Deep teal primary, warm gold accent, navy dark backgrounds
- **Glassmorphism**: Subtle glass effects on cards and overlays
- **Gradients**: Teal-to-navy gradients for hero and CTA sections

---

## Open Questions

> [!IMPORTANT]
> **GCC Medical Account**: You mentioned "through our GCC medical account" — does this mean Travel Tree Overseas has a business account with specific GCC medical centers? Should the booking form include specific medical center options (e.g., Gamca centers in Dhaka, Chittagong, Sylhet)?

> [!IMPORTANT]
> **Payment Method**: For the "client must pay us first" flow — what payment methods should be supported? Options:
> 1. **Manual payment proof upload** (bKash/Nagad screenshot, bank slip) — simplest for now
> 2. **Online payment gateway** (SSLCommerz, bKash API) — can add later
> Currently planning option 1 for local hosting.

> [!NOTE]
> **KSA Visa Types**: Should we support multiple visa types? (Work visa, Visit visa, Hajj visa, Umrah visa, Business visa)

> [!NOTE]
> **Supabase Migration**: The local JSON DB will use an abstracted data access layer. When you're ready for Supabase, we'll swap the implementation with minimal code changes. No structural changes needed.

---

## Verification Plan

### Automated Tests
- Run `npm run build` to verify no TypeScript/build errors
- Test all API routes with browser dev tools
- Verify mobile responsiveness at 375px, 768px, 1024px, 1440px

### Browser Testing
- Navigate all public pages and verify parallax effects
- Complete client registration → login → medical booking → payment flow
- Test admin dashboard: edit site content → verify changes on public site
- Test integration toggles (GTM, FB Pixel script injection)
- Verify mobile navigation and responsive layouts

### Manual Verification
- Admin login → manage all sections
- Client signup → book medical → track visa status
- Verify all CRUD operations work with local JSON storage
