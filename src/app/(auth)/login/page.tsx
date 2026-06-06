'use client';

import { useState, Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Plane, Mail, Lock, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError(result.error);
        toast.error(result.error);
      } else {
        toast.success('Welcome back!');
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err) {
      setError('An unexpected error occurred');
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
        <h1 className="text-3xl font-heading font-black text-navy-900 mb-2">Welcome Back</h1>
        <p className="text-navy-500">Sign in to access your dashboard and track your applications.</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
            <Input id="email" name="email" type="email" required placeholder="name@example.com" className="pl-10 h-12 rounded-xl bg-navy-50 border-none focus:bg-white transition-all" />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center px-1">
            <Label htmlFor="password">Password</Label>
            <Link href="/forgot-password" title="Forgot Password?" className="text-xs text-teal-600 hover:underline">Forgot Password?</Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
            <Input id="password" name="password" type="password" required placeholder="••••••••" className="pl-10 h-12 rounded-xl bg-navy-50 border-none focus:bg-white transition-all" />
          </div>
        </div>

        <Button disabled={isLoading} className="w-full bg-teal-600 hover:bg-teal-700 py-7 text-lg font-bold rounded-2xl shadow-xl shadow-teal-600/20 transition-all">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Authenticating...
            </>
          ) : (
            <>
              Sign In
              <ArrowRight className="ml-2 w-5 h-5" />
            </>
          )}
        </Button>
      </form>

       <p className="mt-8 text-center text-navy-500">
         Don't have an account? <Link href="/register" className="text-teal-600 font-bold hover:underline">Create Account</Link>
       </p>
    </div>
  );
}

function LoginFormFallback() {
  return (
    <div className="max-w-md w-full mx-auto animate-pulse">
      <div className="h-10 w-32 bg-navy-100 rounded mb-12" />
      <div className="h-8 w-48 bg-navy-100 rounded mb-10" />
      <div className="space-y-6">
        <div className="h-12 bg-navy-100 rounded-xl" />
        <div className="h-12 bg-navy-100 rounded-xl" />
        <div className="h-14 bg-navy-100 rounded-2xl" />
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex flex-col justify-center px-6 md:px-12 lg:px-24 py-12 bg-white">
        <Suspense fallback={<LoginFormFallback />}>
          <LoginForm />
        </Suspense>
      </div>

      <div className="hidden lg:flex flex-col justify-center items-center bg-navy-900 relative overflow-hidden px-12">
        <div className="absolute inset-0 z-0">
          <img src="/images/hero-bg.jpg" alt="Travel" className="w-full h-full object-cover opacity-20" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/60 to-transparent" />
        
        <div className="relative z-10 text-center max-w-lg">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-heading font-black text-white mb-6">Manage Your Journey from Anywhere</h2>
            <p className="text-navy-300 text-lg leading-relaxed">
              Our portal gives you real-time access to your GCC medical status, KSA visa updates, and digital receipts.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
