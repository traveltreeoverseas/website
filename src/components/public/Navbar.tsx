'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { Menu, X, Plane, User, LogOut, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = pathname === '/';

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 py-3 md:px-8',
        isScrolled
          ? 'bg-white/80 dark:bg-navy-800/80 backdrop-blur-md shadow-md py-2'
          : isHome
          ? 'bg-transparent'
          : 'bg-white dark:bg-navy-800 shadow-sm'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
            <Plane className="w-6 h-6 rotate-45" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-bold text-lg md:text-xl leading-tight tracking-tight text-teal-600 dark:text-teal-400">
              TRAVEL TREE
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-navy-500 dark:text-navy-300 leading-none">
              Overseas
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-teal-600',
                pathname === link.href
                  ? 'text-teal-600'
                  : isScrolled || !isHome
                  ? 'text-navy-800 dark:text-navy-100'
                  : 'text-white'
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Auth / User Actions */}
        <div className="hidden md:flex items-center gap-4">
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button variant="ghost" className="flex items-center gap-2 px-2">
                    <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-bold border border-teal-200">
                      {session.user?.name?.[0].toUpperCase()}
                    </div>
                    <span className={cn(
                      "text-sm font-medium",
                      isScrolled || !isHome ? "text-navy-800 dark:text-navy-100" : "text-white"
                    )}>
                      {session.user?.name?.split(' ')[0]}
                    </span>
                    <ChevronDown className={cn(
                      "w-4 h-4",
                      isScrolled || !isHome ? "text-navy-400" : "text-white/70"
                    )} />
                  </Button>
                }
              />
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center gap-2 p-2">
                  <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-bold">
                    {session.user?.name?.[0].toUpperCase()}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold truncate">{session.user?.name}</span>
                    <span className="text-xs text-muted-foreground truncate">{session.user?.email}</span>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  render={<Link href={(session.user as any).role === 'admin' ? '/admin/dashboard' : '/client/dashboard'} />}
                  className="cursor-pointer"
                >
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem 
                  render={<Link href="/profile" />}
                  className="cursor-pointer"
                >
                  Profile Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="text-red-600 focus:text-red-600 cursor-pointer"
                  onClick={() => signOut()}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href="/login">
                <Button 
                  variant="ghost" 
                  className={cn(
                    "text-sm font-medium",
                    isScrolled || !isHome ? "text-navy-800 dark:text-navy-100" : "text-white hover:bg-white/10"
                  )}
                >
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-teal-600 hover:bg-teal-700 text-white shadow-lg shadow-teal-600/20">
                  Join Now
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex md:hidden items-center gap-4">
          {session && (
             <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-bold text-xs border border-teal-200">
               {session.user?.name?.[0].toUpperCase()}
             </div>
          )}
          <Sheet>
            <SheetTrigger
              render={
                <Button 
                  variant="ghost" 
                  size="icon"
                  className={cn(
                    isScrolled || !isHome ? "text-navy-800 dark:text-navy-100" : "text-white"
                  )}
                >
                  <Menu className="w-6 h-6" />
                </Button>
              }
            />
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-8 mt-12">
                <div className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        'text-lg font-heading font-semibold transition-colors',
                        pathname === link.href ? 'text-teal-600' : 'text-navy-800 dark:text-navy-100'
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
                <div className="border-t pt-8 flex flex-col gap-4">
                  {session ? (
                    <>
                      <Link href={(session.user as any).role === 'admin' ? '/admin/dashboard' : '/client/dashboard'}>
                        <Button className="w-full justify-start" variant="outline">
                          Dashboard
                        </Button>
                      </Link>
                      <Button 
                        className="w-full justify-start text-red-600" 
                        variant="ghost"
                        onClick={() => signOut()}
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link href="/login" className="w-full">
                        <Button variant="outline" className="w-full">Login</Button>
                      </Link>
                      <Link href="/register" className="w-full">
                        <Button className="w-full bg-teal-600">Register</Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
