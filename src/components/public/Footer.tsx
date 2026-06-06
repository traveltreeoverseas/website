'use client';

import Link from 'next/link';
import { Plane, Globe, Camera, Video, Share2, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                <Plane className="w-6 h-6 rotate-45" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-xl leading-tight tracking-tight text-white">
                  TRAVEL TREE
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-teal-400 leading-none">
                  Overseas
                </span>
              </div>
            </Link>
            <p className="text-navy-300 text-sm leading-relaxed">
              Travel Tree Overseas is your trusted partner for all travel needs. From GCC medical processing to global visa assistance, we make your journey seamless and worry-free.
            </p>
            <div className="flex items-center gap-4">
              <Link href="#" className="w-8 h-8 rounded-full bg-navy-800 flex items-center justify-center hover:bg-teal-600 transition-colors">
                <Globe className="w-4 h-4" />
              </Link>
              <Link href="#" className="w-8 h-8 rounded-full bg-navy-800 flex items-center justify-center hover:bg-teal-600 transition-colors">
                <Camera className="w-4 h-4" />
              </Link>
              <Link href="#" className="w-8 h-8 rounded-full bg-navy-800 flex items-center justify-center hover:bg-teal-600 transition-colors">
                <Share2 className="w-4 h-4" />
              </Link>
              <Link href="#" className="w-8 h-8 rounded-full bg-navy-800 flex items-center justify-center hover:bg-teal-600 transition-colors">
                <Video className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-6">
            <h4 className="font-heading font-bold text-lg">Quick Links</h4>
            <div className="flex flex-col gap-3">
              <Link href="/about" className="text-navy-300 hover:text-teal-400 transition-colors text-sm">About Us</Link>
              <Link href="/services" className="text-navy-300 hover:text-teal-400 transition-colors text-sm">Our Services</Link>
              <Link href="/contact" className="text-navy-300 hover:text-teal-400 transition-colors text-sm">Contact Us</Link>
              <Link href="/terms" className="text-navy-300 hover:text-teal-400 transition-colors text-sm">Terms & Conditions</Link>
              <Link href="/privacy" className="text-navy-300 hover:text-teal-400 transition-colors text-sm">Privacy Policy</Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-6">
            <h4 className="font-heading font-bold text-lg">Contact Info</h4>
            <div className="flex flex-col gap-4">
              <div className="flex gap-3">
                <MapPin className="w-5 h-5 text-teal-500 shrink-0" />
                <p className="text-navy-300 text-sm">House #12, Road #5, Banani, Dhaka-1213, Bangladesh</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-teal-500 shrink-0" />
                <p className="text-navy-300 text-sm">+880-1700-000000</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-teal-500 shrink-0" />
                <p className="text-navy-300 text-sm">info@traveltreeoverseas.com</p>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-6">
            <h4 className="font-heading font-bold text-lg">Newsletter</h4>
            <p className="text-navy-300 text-sm leading-relaxed">
              Subscribe to get the latest travel updates and exclusive offers.
            </p>
            <div className="flex flex-col gap-2">
              <Input 
                placeholder="Your Email" 
                className="bg-navy-800 border-navy-700 text-white placeholder:text-navy-500"
              />
              <Button className="bg-teal-600 hover:bg-teal-700 w-full">Subscribe</Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-navy-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-navy-500 text-xs text-center md:text-left">
            © {currentYear} Travel Tree Overseas. All rights reserved. Designed for Excellence.
          </p>
          <div className="flex gap-6 text-xs text-navy-500">
             <Link href="/privacy" className="hover:text-teal-400">Privacy</Link>
             <Link href="/terms" className="hover:text-teal-400">Terms</Link>
             <Link href="/sitemap" className="hover:text-teal-400">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
