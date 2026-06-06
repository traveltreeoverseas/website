'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { 
  LayoutDashboard, 
  Stethoscope, 
  FileCheck, 
  CreditCard, 
  User, 
  LogOut, 
  Plane,
  X,
  Settings,
  FileText,
  Users,
  Code
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  role: 'admin' | 'client';
  onClose?: () => void;
}

const clientLinks = [
  { label: 'Dashboard', href: '/client/dashboard', icon: LayoutDashboard },
  { label: 'GCC Medical Booking', href: '/client/medical-booking', icon: Stethoscope },
  { label: 'Medical Status', href: '/client/medical-status', icon: FileText },
  { label: 'KSA Visa Status', href: '/client/visa-status', icon: FileCheck },
  { label: 'My Payments', href: '/client/payments', icon: CreditCard },
  { label: 'My Profile', href: '/client/profile', icon: User },
];

const adminLinks = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Site Content', href: '/admin/site-content', icon: Settings },
  { label: 'Integrations', href: '/admin/integrations', icon: Code },
  { label: 'Medical Bookings', href: '/admin/medical-bookings', icon: Stethoscope },
  { label: 'Visa Tracking', href: '/admin/visa-tracking', icon: FileCheck },
  { label: 'Payments', href: '/admin/payments', icon: CreditCard },
  { label: 'Client Manager', href: '/admin/clients', icon: Users },
];

export default function Sidebar({ role, onClose }: SidebarProps) {
  const pathname = usePathname();
  const links = role === 'admin' ? adminLinks : clientLinks;

  return (
    <div className="flex flex-col h-full bg-navy-900 text-white">
      {/* Header */}
      <div className="p-6 border-b border-navy-800 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center text-white shadow-lg">
            <Plane className="w-5 h-5 rotate-45" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-bold text-base leading-tight tracking-tight">TRAVEL TREE</span>
            <span className="text-[8px] uppercase tracking-widest font-medium text-teal-400">Overseas</span>
          </div>
        </Link>
        {onClose && (
          <Button variant="ghost" size="icon" onClick={onClose} className="lg:hidden text-navy-400">
            <X className="w-5 h-5" />
          </Button>
        )}
      </div>

      {/* Links */}
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        <p className="px-4 text-[10px] uppercase tracking-widest font-bold text-navy-500 mb-4">
          {role === 'admin' ? 'Administration' : 'Client Portal'}
        </p>
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group',
                isActive 
                  ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/20' 
                  : 'text-navy-300 hover:bg-navy-800 hover:text-white'
              )}
            >
              <Icon className={cn('w-5 h-5', isActive ? 'text-white' : 'text-navy-500 group-hover:text-teal-400')} />
              {link.label}
            </Link>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-navy-800">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-950/30 rounded-xl"
          onClick={() => signOut({ callbackUrl: '/login' })}
        >
          <LogOut className="w-5 h-5 mr-3" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}
