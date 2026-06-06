import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { cn } from '@/lib/utils';
import { 
  getMedicalBookingsByClient, 
  getVisaTrackingsByClient,
  getPaymentsByClient
} from '@/lib/db-local';
import { 
  Stethoscope, 
  FileCheck, 
  CreditCard, 
  Clock, 
  AlertCircle,
  ArrowRight,
  TrendingUp,
  CheckCircle2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

export default async function ClientDashboardPage() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any).id;

  const medicals = getMedicalBookingsByClient(userId);
  const visas = getVisaTrackingsByClient(userId);
  const payments = getPaymentsByClient(userId);

  const pendingMedicals = medicals.filter(m => m.status === 'pending_payment' || m.status === 'payment_submitted');
  const activeVisas = visas.filter(v => v.status !== 'delivered' && v.status !== 'rejected');
  const recentPayments = payments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);

  return (
    <div className="space-y-10">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-heading font-black text-navy-900">Hello, {session?.user?.name}!</h1>
          <p className="text-navy-500 mt-1">Welcome back to your travel portal. Here's what's happening.</p>
        </div>
        <div className="flex items-center gap-3">
           <Link href="/client/medical-booking">
              <Button className="bg-teal-600 hover:bg-teal-700 rounded-xl shadow-lg shadow-teal-600/20">
                 New Medical Booking
              </Button>
           </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-none shadow-sm hover:shadow-md transition-all rounded-3xl overflow-hidden bg-white">
          <CardContent className="p-6 flex items-center gap-4">
             <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center">
                <Stethoscope className="w-6 h-6" />
             </div>
             <div>
                <p className="text-xs font-bold text-navy-400 uppercase tracking-widest">Medical Bookings</p>
                <p className="text-2xl font-black text-navy-900">{medicals.length}</p>
             </div>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-sm hover:shadow-md transition-all rounded-3xl overflow-hidden bg-white">
          <CardContent className="p-6 flex items-center gap-4">
             <div className="w-12 h-12 bg-gold-50 text-gold-600 rounded-2xl flex items-center justify-center">
                <FileCheck className="w-6 h-6" />
             </div>
             <div>
                <p className="text-xs font-bold text-navy-400 uppercase tracking-widest">Visa Applications</p>
                <p className="text-2xl font-black text-navy-900">{visas.length}</p>
             </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm hover:shadow-md transition-all rounded-3xl overflow-hidden bg-white">
          <CardContent className="p-6 flex items-center gap-4">
             <div className="w-12 h-12 bg-navy-50 text-navy-600 rounded-2xl flex items-center justify-center">
                <Clock className="w-6 h-6" />
             </div>
             <div>
                <p className="text-xs font-bold text-navy-400 uppercase tracking-widest">Pending Tasks</p>
                <p className="text-2xl font-black text-navy-900">{pendingMedicals.length + activeVisas.length}</p>
             </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm hover:shadow-md transition-all rounded-3xl overflow-hidden bg-white">
          <CardContent className="p-6 flex items-center gap-4">
             <div className="w-12 h-12 bg-teal-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-teal-600/30">
                <CreditCard className="w-6 h-6" />
             </div>
             <div>
                <p className="text-xs font-bold text-navy-400 uppercase tracking-widest">Total Payments</p>
                <p className="text-2xl font-black text-navy-900">{payments.length}</p>
             </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Applications */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between">
             <h2 className="text-xl font-heading font-black text-navy-900">Active Applications</h2>
             <Link href="/client/medical-status" className="text-teal-600 text-sm font-bold hover:underline flex items-center gap-1">
                View All <ArrowRight className="w-4 h-4" />
             </Link>
          </div>

          <div className="space-y-4">
            {pendingMedicals.length === 0 && activeVisas.length === 0 && (
              <div className="bg-white p-12 rounded-[2.5rem] border border-dashed border-navy-200 text-center">
                 <div className="w-16 h-16 bg-navy-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="w-8 h-8 text-navy-300" />
                 </div>
                 <h3 className="text-lg font-heading font-bold text-navy-900 mb-2">No Active Applications</h3>
                 <p className="text-sm text-navy-500 mb-6">You don't have any pending applications or visa processes at the moment.</p>
                 <Link href="/client/medical-booking">
                    <Button variant="outline" className="border-teal-600 text-teal-600 rounded-xl">Start New Booking</Button>
                 </Link>
              </div>
            )}

            {pendingMedicals.map(med => (
              <Card key={med.id} className="border-none shadow-sm hover:shadow-md transition-all rounded-3xl overflow-hidden bg-white">
                <CardContent className="p-6 flex items-center justify-between gap-4">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center">
                         <Stethoscope className="w-6 h-6" />
                      </div>
                      <div>
                         <h4 className="font-bold text-navy-900">GCC Medical - {med.country}</h4>
                         <p className="text-xs text-navy-500">Booked on {new Date(med.createdAt).toLocaleDateString()}</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-6">
                      <div className="hidden md:block text-right">
                         <p className="text-xs font-bold text-navy-400 uppercase tracking-widest mb-1">Status</p>
                         <Badge variant="outline" className="bg-gold-50 text-gold-600 border-gold-200 capitalize">
                            {med.status.replace('_', ' ')}
                         </Badge>
                      </div>
                      <Link href="/client/medical-status">
                         <Button size="icon" variant="ghost" className="rounded-full text-navy-400 hover:text-teal-600">
                            <ArrowRight className="w-5 h-5" />
                         </Button>
                      </Link>
                   </div>
                </CardContent>
              </Card>
            ))}

            {activeVisas.map(visa => (
              <Card key={visa.id} className="border-none shadow-sm hover:shadow-md transition-all rounded-3xl overflow-hidden bg-white">
                <CardContent className="p-6 flex items-center justify-between gap-4">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gold-50 text-gold-600 rounded-xl flex items-center justify-center">
                         <FileCheck className="w-6 h-6" />
                      </div>
                      <div>
                         <h4 className="font-bold text-navy-900">{visa.visaType} Visa - {visa.country}</h4>
                         <p className="text-xs text-navy-500">Processing started {new Date(visa.createdAt).toLocaleDateString()}</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-6">
                      <div className="hidden md:block text-right">
                         <p className="text-xs font-bold text-navy-400 uppercase tracking-widest mb-1">Current Stage</p>
                         <Badge variant="outline" className="bg-teal-50 text-teal-600 border-teal-200 capitalize">
                            {visa.status.replace('_', ' ')}
                         </Badge>
                      </div>
                      <Link href="/client/visa-status">
                         <Button size="icon" variant="ghost" className="rounded-full text-navy-400 hover:text-teal-600">
                            <ArrowRight className="w-5 h-5" />
                         </Button>
                      </Link>
                   </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Payments */}
        <div className="space-y-8">
           <div className="flex items-center justify-between">
              <h2 className="text-xl font-heading font-black text-navy-900">Recent Payments</h2>
           </div>

           <Card className="border-none shadow-xl rounded-[2.5rem] bg-navy-900 text-white overflow-hidden">
             <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold uppercase tracking-widest text-navy-400">Total Spent</CardTitle>
                <div className="flex items-baseline gap-2">
                   <span className="text-3xl font-black text-teal-400">৳{payments.reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()}</span>
                </div>
             </CardHeader>
             <CardContent className="p-0">
                <div className="p-6 pt-0 space-y-4">
                   {recentPayments.length === 0 && (
                      <p className="text-xs text-navy-500 py-8 text-center italic">No payments recorded yet.</p>
                   )}
                   {recentPayments.map(p => (
                      <div key={p.id} className="flex items-center justify-between py-3 border-b border-navy-800 last:border-0">
                         <div className="flex items-center gap-3">
                            <div className={cn(
                               "w-8 h-8 rounded-lg flex items-center justify-center",
                               p.status === 'verified' ? "bg-teal-500/20 text-teal-500" : "bg-gold-500/20 text-gold-500"
                            )}>
                               {p.status === 'verified' ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                            </div>
                            <div>
                               <p className="text-xs font-bold leading-none capitalize">{p.bookingType} Payment</p>
                               <p className="text-[10px] text-navy-500 mt-1">{new Date(p.createdAt).toLocaleDateString()}</p>
                            </div>
                         </div>
                         <p className="text-sm font-bold">৳{p.amount.toLocaleString()}</p>
                      </div>
                   ))}
                </div>
                <Link href="/client/payments">
                   <Button variant="ghost" className="w-full rounded-none h-14 bg-navy-800/50 hover:bg-navy-800 text-teal-400 text-xs font-bold uppercase tracking-widest">
                      View All Payments
                   </Button>
                </Link>
             </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}
