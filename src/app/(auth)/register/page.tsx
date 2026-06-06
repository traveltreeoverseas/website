'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Plane, User, Mail, Phone, Lock, IdCard, Globe, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Registration failed');
      }

      toast.success('Account created! Please login.');
      router.push('/login');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side: Form */}
      <div className="flex flex-col justify-center px-6 md:px-12 lg:px-24 py-12 bg-white">
        <div className="max-w-md w-full mx-auto">
          <Link href="/" className="flex items-center gap-2 mb-12 group inline-flex">
            <div className="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center text-white shadow-lg">
              <Plane className="w-6 h-6 rotate-45" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-xl leading-tight text-teal-600">TRAVEL TREE</span>
              <span className="text-[10px] uppercase tracking-widest text-navy-500 font-medium leading-none">Overseas</span>
            </div>
          </Link>

          <div className="mb-10">
            <h1 className="text-3xl font-heading font-black text-navy-900 mb-2">Create an Account</h1>
            <p className="text-navy-500">Join Travel Tree Overseas and start tracking your applications today.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
                  <Input id="name" name="name" required placeholder="John Doe" className="pl-10 h-12 rounded-xl bg-navy-50 border-none focus:bg-white transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
                  <Input id="phone" name="phone" required placeholder="+880 1XXX..." className="pl-10 h-12 rounded-xl bg-navy-50 border-none focus:bg-white transition-all" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
                <Input id="email" name="email" type="email" required placeholder="name@example.com" className="pl-10 h-12 rounded-xl bg-navy-50 border-none focus:bg-white transition-all" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="passportNumber">Passport Number (Optional)</Label>
                <div className="relative">
                  <IdCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
                  <Input id="passportNumber" name="passportNumber" placeholder="A01234567" className="pl-10 h-12 rounded-xl bg-navy-50 border-none focus:bg-white transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="nationality">Nationality</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
                  <Input id="nationality" name="nationality" defaultValue="Bangladeshi" className="pl-10 h-12 rounded-xl bg-navy-50 border-none focus:bg-white transition-all" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
                <Input id="password" name="password" type="password" required placeholder="••••••••" className="pl-10 h-12 rounded-xl bg-navy-50 border-none focus:bg-white transition-all" />
              </div>
            </div>

            <p className="text-xs text-navy-400 px-1">
              By signing up, you agree to our <Link href="/terms" className="text-teal-600 hover:underline">Terms</Link> and <Link href="/privacy" className="text-teal-600 hover:underline">Privacy Policy</Link>.
            </p>

            <Button disabled={isLoading} className="w-full bg-teal-600 hover:bg-teal-700 py-7 text-lg font-bold rounded-2xl shadow-xl shadow-teal-600/20 transition-all">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="ml-2 w-5 h-5" />
                </>
              )}
            </Button>
          </form>

          <p className="mt-8 text-center text-navy-500">
            Already have an account? <Link href="/login" className="text-teal-600 font-bold hover:underline">Sign In</Link>
          </p>
        </div>
      </div>

      {/* Right Side: Design/Marketing */}
      <div className="hidden lg:flex flex-col justify-center items-center bg-teal-900 relative overflow-hidden px-12">
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] bg-teal-400 rounded-full blur-[150px]" />
          <div className="absolute bottom-[-10%] right-[-5%] w-[60%] h-[60%] bg-gold-400 rounded-full blur-[150px]" />
        </div>
        
        <div className="relative z-10 text-center max-w-lg">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-24 h-24 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl flex items-center justify-center text-white mb-12 mx-auto shadow-2xl"
          >
            <Plane className="w-12 h-12 rotate-45" />
          </motion.div>
          <h2 className="text-4xl font-heading font-black text-white mb-6">Experience the Best Travel Services</h2>
          <p className="text-teal-100 text-lg leading-relaxed mb-12">
            "Travel Tree Overseas has completely changed how I process my GCC medical. Fast, reliable, and completely transparent."
          </p>
          <div className="flex items-center justify-center gap-3">
             <div className="w-12 h-12 rounded-full bg-teal-700 border-2 border-teal-500" />
             <div className="text-left">
                <p className="text-white font-bold leading-none">Rahat Hossain</p>
                <p className="text-teal-400 text-xs mt-1">Verified Client</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
