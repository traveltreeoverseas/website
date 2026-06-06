import { readFileSync } from 'fs';

const TOKEN = process.env.SUPABASE_ACCESS_TOKEN;
const PROJECT_REF = process.env.SUPABASE_PROJECT_REF || 'dwqmwbthhzowosqujhwj';
const URL = `https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`;

async function runQuery(query) {
  const res = await fetch(URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${text}`);
  return text;
}

const statements = [
  `CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`,

  `CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'client' CHECK (role IN ('admin', 'client')),
    passport_number TEXT,
    nationality TEXT,
    address TEXT,
    avatar TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  )`,

  `CREATE TABLE IF NOT EXISTS site_content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    hero_title TEXT,
    hero_subtitle TEXT,
    hero_background_image TEXT,
    hero_cta_text TEXT,
    hero_cta_link TEXT,
    about_title TEXT,
    about_subtitle TEXT,
    about_description TEXT,
    about_mission TEXT,
    about_vision TEXT,
    about_image TEXT,
    about_team_members JSONB DEFAULT '[]',
    services JSONB DEFAULT '[]',
    testimonials JSONB DEFAULT '[]',
    contact_address TEXT,
    contact_phone TEXT,
    contact_email TEXT,
    contact_whatsapp TEXT,
    contact_map_embed_url TEXT,
    contact_working_hours TEXT,
    footer_description TEXT,
    footer_social_links JSONB DEFAULT '{}',
    terms TEXT,
    privacy TEXT,
    seo JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  )`,

  `CREATE TABLE IF NOT EXISTS medical_bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID REFERENCES users(id) ON DELETE CASCADE,
    client_name TEXT NOT NULL,
    client_email TEXT NOT NULL,
    client_phone TEXT NOT NULL,
    passport_number TEXT NOT NULL,
    nationality TEXT NOT NULL,
    medical_center TEXT NOT NULL,
    country TEXT NOT NULL,
    preferred_date TEXT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_proof TEXT,
    payment_method TEXT,
    serial_number TEXT,
    status TEXT DEFAULT 'pending_payment' CHECK (status IN ('pending_payment','payment_submitted','payment_verified','booked','completed','cancelled')),
    admin_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  )`,

  `CREATE TABLE IF NOT EXISTS visa_tracking (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID REFERENCES users(id) ON DELETE CASCADE,
    client_name TEXT NOT NULL,
    client_email TEXT NOT NULL,
    passport_number TEXT NOT NULL,
    visa_type TEXT NOT NULL CHECK (visa_type IN ('work','visit','hajj','umrah','business','family')),
    country TEXT NOT NULL,
    status TEXT DEFAULT 'submitted' CHECK (status IN ('submitted','documents_verified','processing','stamped','delivered','rejected')),
    application_date TEXT NOT NULL,
    expected_date TEXT,
    delivery_date TEXT,
    reference_number TEXT,
    documents JSONB DEFAULT '[]',
    status_history JSONB DEFAULT '[]',
    admin_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  )`,

  `CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID REFERENCES users(id) ON DELETE CASCADE,
    client_name TEXT NOT NULL,
    booking_id TEXT,
    booking_type TEXT NOT NULL CHECK (booking_type IN ('medical','visa','other')),
    amount DECIMAL(10,2) NOT NULL,
    payment_method TEXT NOT NULL,
    transaction_id TEXT,
    payment_proof TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending','submitted','verified','rejected')),
    admin_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  )`,

  `CREATE TABLE IF NOT EXISTS integrations (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    is_active BOOLEAN DEFAULT false,
    config JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  )`,

  `CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  )`,

  `INSERT INTO integrations (id, name, type, is_active, config) VALUES
    ('int_gtm', 'Google Tag Manager', 'gtm', false, '{"containerId": ""}'),
    ('int_fbpixel', 'Facebook Pixel', 'facebook_pixel', false, '{"pixelId": ""}'),
    ('int_ga', 'Google Analytics', 'google_analytics', false, '{"measurementId": ""}'),
    ('int_whatsapp', 'WhatsApp', 'whatsapp', true, '{"phoneNumber": "+8801XXXXXXXXX", "message": "Hello! I need help with..."}'),
    ('int_custom', 'Custom Script', 'custom_script', false, '{"headScript": "", "bodyScript": ""}')
  ON CONFLICT (id) DO NOTHING`,

  `INSERT INTO site_content (
    hero_title, hero_subtitle, hero_background_image, hero_cta_text, hero_cta_link,
    about_title, about_subtitle, about_description, about_mission, about_vision,
    contact_address, contact_phone, contact_email, contact_whatsapp, contact_working_hours,
    footer_description, footer_social_links
  ) SELECT
    'Your Gateway to the World',
    'Travel Tree Overseas — Your trusted partner for GCC medical, KSA visa processing, air tickets, and complete travel solutions.',
    '/images/hero-bg.jpg', 'Start Your Journey', '/register',
    'About Travel Tree Overseas', 'Your Trusted Travel Partner Since 2015',
    'Travel Tree Overseas is a leading travel agency specializing in GCC medical processing, KSA visa services, air ticketing, and comprehensive travel solutions.',
    'To provide reliable, efficient, and affordable travel services.',
    'To become the most trusted travel agency in Bangladesh.',
    'House #12, Road #5, Banani, Dhaka-1213, Bangladesh',
    '+880-1700-000000', 'info@traveltreeoverseas.com', '+8801700000000',
    'Saturday - Thursday: 9:00 AM - 7:00 PM',
    'Travel Tree Overseas is your trusted partner for all travel needs.',
    '{"facebook":"","instagram":"","youtube":"","linkedin":""}'
  WHERE NOT EXISTS (SELECT 1 FROM site_content)`,

  `CREATE INDEX IF NOT EXISTS idx_medical_bookings_client ON medical_bookings(client_id);
   CREATE INDEX IF NOT EXISTS idx_medical_bookings_status ON medical_bookings(status);
   CREATE INDEX IF NOT EXISTS idx_visa_tracking_client ON visa_tracking(client_id);
   CREATE INDEX IF NOT EXISTS idx_visa_tracking_status ON visa_tracking(status);
   CREATE INDEX IF NOT EXISTS idx_payments_client ON payments(client_id);
   CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
   CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
   CREATE INDEX IF NOT EXISTS idx_contact_messages_read ON contact_messages(is_read)`,

  `ALTER TABLE users ENABLE ROW LEVEL SECURITY;
   ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
   ALTER TABLE medical_bookings ENABLE ROW LEVEL SECURITY;
   ALTER TABLE visa_tracking ENABLE ROW LEVEL SECURITY;
   ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
   ALTER TABLE integrations ENABLE ROW LEVEL SECURITY;
   ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY`,

  `DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='users' AND policyname='Users can view own profile') THEN
      CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='users' AND policyname='Admins can view all users') THEN
      CREATE POLICY "Admins can view all users" ON users FOR SELECT USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'));
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='users' AND policyname='Users can update own profile') THEN
      CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='users' AND policyname='Admins can update users') THEN
      CREATE POLICY "Admins can update users" ON users FOR UPDATE USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'));
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='users' AND policyname='Admins can insert users') THEN
      CREATE POLICY "Admins can insert users" ON users FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'));
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='users' AND policyname='Admins can delete users') THEN
      CREATE POLICY "Admins can delete users" ON users FOR DELETE USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'));
    END IF;
  END $$`,

  `DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='site_content' AND policyname='Anyone can view site content') THEN
      CREATE POLICY "Anyone can view site content" ON site_content FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='site_content' AND policyname='Admins can update site content') THEN
      CREATE POLICY "Admins can update site content" ON site_content FOR UPDATE USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'));
    END IF;
  END $$`,

  `DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='medical_bookings' AND policyname='Users can view own bookings') THEN
      CREATE POLICY "Users can view own bookings" ON medical_bookings FOR SELECT USING (auth.uid() = client_id);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='medical_bookings' AND policyname='Admins can view all bookings') THEN
      CREATE POLICY "Admins can view all bookings" ON medical_bookings FOR SELECT USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'));
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='medical_bookings' AND policyname='Users can create bookings') THEN
      CREATE POLICY "Users can create bookings" ON medical_bookings FOR INSERT WITH CHECK (auth.uid() = client_id);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='medical_bookings' AND policyname='Admins can update bookings') THEN
      CREATE POLICY "Admins can update bookings" ON medical_bookings FOR UPDATE USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'));
    END IF;
  END $$`,

  `DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='visa_tracking' AND policyname='Users can view own visas') THEN
      CREATE POLICY "Users can view own visas" ON visa_tracking FOR SELECT USING (auth.uid() = client_id);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='visa_tracking' AND policyname='Admins can view all visas') THEN
      CREATE POLICY "Admins can view all visas" ON visa_tracking FOR SELECT USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'));
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='visa_tracking' AND policyname='Users can create visas') THEN
      CREATE POLICY "Users can create visas" ON visa_tracking FOR INSERT WITH CHECK (auth.uid() = client_id);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='visa_tracking' AND policyname='Admins can update visas') THEN
      CREATE POLICY "Admins can update visas" ON visa_tracking FOR UPDATE USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'));
    END IF;
  END $$`,

  `DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='payments' AND policyname='Users can view own payments') THEN
      CREATE POLICY "Users can view own payments" ON payments FOR SELECT USING (auth.uid() = client_id);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='payments' AND policyname='Admins can view all payments') THEN
      CREATE POLICY "Admins can view all payments" ON payments FOR SELECT USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'));
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='payments' AND policyname='Users can create payments') THEN
      CREATE POLICY "Users can create payments" ON payments FOR INSERT WITH CHECK (auth.uid() = client_id);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='payments' AND policyname='Admins can update payments') THEN
      CREATE POLICY "Admins can update payments" ON payments FOR UPDATE USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'));
    END IF;
  END $$`,

  `DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='integrations' AND policyname='Anyone can view active integrations') THEN
      CREATE POLICY "Anyone can view active integrations" ON integrations FOR SELECT USING (is_active = true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='integrations' AND policyname='Admins can view all integrations') THEN
      CREATE POLICY "Admins can view all integrations" ON integrations FOR SELECT USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'));
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='integrations' AND policyname='Admins can update integrations') THEN
      CREATE POLICY "Admins can update integrations" ON integrations FOR UPDATE USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'));
    END IF;
  END $$`,

  `DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='contact_messages' AND policyname='Anyone can send messages') THEN
      CREATE POLICY "Anyone can send messages" ON contact_messages FOR INSERT WITH CHECK (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='contact_messages' AND policyname='Admins can manage messages') THEN
      CREATE POLICY "Admins can manage messages" ON contact_messages FOR ALL USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'));
    END IF;
  END $$`,
];

for (const [i, stmt] of statements.entries()) {
  try {
    await runQuery(stmt);
    console.log(`✅ Statement ${i + 1}/${statements.length} applied`);
  } catch (err) {
    console.error(`❌ Statement ${i + 1} failed: ${err.message}`);
  }
}

console.log('\n✅ Schema applied. Verifying tables...');
const result = await runQuery("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name");
console.log('Tables:', result);
