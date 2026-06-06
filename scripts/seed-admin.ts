import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing SUPABASE environment variables.');
  console.log('Required: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const DEFAULT_ADMIN = {
  email: process.env.ADMIN_EMAIL || 'admin@travletree.com',
  password: process.env.ADMIN_PASSWORD || 'Admin6969',
  name: process.env.ADMIN_NAME || 'Admin User',
};

async function seedAdmin() {
  console.log('🌱 Seeding admin user...');

  // Check if admin already exists
  const { data: existing, error: fetchError } = await supabase
    .from('users')
    .select('*')
    .ilike('email', DEFAULT_ADMIN.email)
    .single();

  if (fetchError && fetchError.code !== 'PGRST116') {
    console.error('❌ Error checking existing user:', fetchError.message);
    process.exit(1);
  }

  if (existing) {
    console.log(`⚠️  Admin ${DEFAULT_ADMIN.email} already exists (ID: ${existing.id})`);
    // Optionally update password
    const hashed = await bcrypt.hash(DEFAULT_ADMIN.password, 10);
    const { error: updateError } = await supabase
      .from('users')
      .update({ password: hashed, role: 'admin', isActive: true })
      .eq('id', existing.id);

    if (updateError) {
      console.error('❌ Error updating admin:', updateError.message);
    } else {
      console.log('✅ Admin password and role updated.');
    }
    return;
  }

  // Create new admin
  const hashedPassword = await bcrypt.hash(DEFAULT_ADMIN.password, 10);
  const adminId = `usr_${Math.random().toString(36).substring(2, 10)}`;

  const { data: newAdmin, error: insertError } = await supabase
    .from('users')
    .insert({
      id: adminId,
      email: DEFAULT_ADMIN.email,
      name: DEFAULT_ADMIN.name,
      phone: '+8801700000000',
      password: hashedPassword,
      role: 'admin',
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
    .select()
    .single();

  if (insertError) {
    console.error('❌ Error creating admin:', insertError.message);
    process.exit(1);
  }

  console.log('✅ Admin user created:');
  console.log(`   ID: ${newAdmin.id}`);
  console.log(`   Email: ${newAdmin.email}`);
  console.log(`   Name: ${newAdmin.name}`);
}

seedAdmin().catch((err) => {
  console.error('❌ Unexpected error:', err);
  process.exit(1);
});
