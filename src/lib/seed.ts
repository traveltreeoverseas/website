// ============================================
// Travel Tree Overseas — Database Seed Script
// Run: npx tsx src/lib/seed.ts
// ============================================

import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

async function seed() {
  ensureDir(DATA_DIR);

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  const users = [
    {
      id: 'usr_admin_001',
      name: 'Admin',
      email: 'admin@traveltree.com',
      phone: '+8801700000000',
      password: adminPassword,
      role: 'admin',
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  fs.writeFileSync(
    path.join(DATA_DIR, 'users.json'),
    JSON.stringify(users, null, 2)
  );

  // Create empty data files
  const emptyArrayFiles = [
    'medical-bookings.json',
    'visa-tracking.json',
    'payments.json',
    'contact-messages.json',
  ];

  emptyArrayFiles.forEach((file) => {
    fs.writeFileSync(path.join(DATA_DIR, file), JSON.stringify([], null, 2));
  });

  console.log('✅ Database seeded successfully!');
  console.log('📧 Admin login: admin@traveltree.com / admin123');
}

seed().catch(console.error);
