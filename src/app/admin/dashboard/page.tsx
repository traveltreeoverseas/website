import { cn } from '@/lib/utils';
import { 
  getMedicalBookings, 
  getVisaTrackings, 
  getPayments, 
  getUsers 
} from '@/lib/db-local';
import { 
  Users, 
  Stethoscope, 
  FileCheck, 
  CreditCard, 
  TrendingUp, 
  AlertCircle,
  ArrowUpRight,
  Plus
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

export default async function AdminDashboardPage() {
  const users = getUsers().filter(u => u.role === 'client');
  const medicals = getMedicalBookings();
  const visas = getVisaTrackings();
  const payments = getPayments();

  const totalRevenue = payments.filter(p => p.status === 'verified').reduce((acc, curr) => acc + curr.amount, 0);
  const pendingMedicals = medicals.filter(m => m.status === 'payment_submitted');
  const pendingPayments = payments.filter(p => p.status === 'submitted');

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-heading font-black text-navy-900">Admin Overview</h1>
          <p className="text-navy-500 mt-1">Control center for Travel Tree Overseas.</p>
        </div>
        <div className="flex items-center gap-3">
           <Link href="/admin/medical-bookings">
              <Button className="bg-teal-600 hover:bg-teal-700 rounded-xl shadow-lg shadow-teal-600/20">
                 <Plus className="w-4 h-4 mr-2" />
                 Update Bookings
              </Button>
           </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label="Total Revenue" 
          value={`৳${totalRevenue.toLocaleString()}`} 
          icon={TrendingUp} 
          trend="+12% from last month"
          color="teal"
        />
        <StatCard 
          label="Total Clients" 
          value={users.length.toString()} 
          icon={Users} 
          trend="+5 new this week"
          color="navy"
        />
        <StatCard 
          label="Medical Orders" 
          value={medicals.length.toString()} 
          icon={Stethoscope} 
          trend="8 pending verification"
          color="gold"
        />
        <StatCard 
          label="Visa Apps" 
          value={visas.length.toString()} 
          icon={FileCheck} 
          trend="12 in processing"
          color="teal"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Action Required */}
         <div className="lg:col-span-2 space-y-8">
            <h2 className="text-xl font-heading font-black text-navy-900">Action Required</h2>
            <div className="space-y-4">
               {pendingMedicals.length === 0 && pendingPayments.length === 0 && (
                  <div className="bg-white p-12 rounded-[2.5rem] border border-dashed border-navy-200 text-center">
                     <CheckCircle2 className="w-12 h-12 text-teal-500 mx-auto mb-4" />
                     <p className="text-navy-900 font-bold">All caught up!</p>
                     <p className="text-xs text-navy-500 mt-1">No pending verifications or actions needed.</p>
                  </div>
               )}

               {pendingPayments.map(pay => (
                  <Card key={pay.id} className="border-none shadow-sm hover:shadow-md transition-all rounded-3xl overflow-hidden bg-white">
                    <CardContent className="p-6 flex items-center justify-between">
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gold-50 text-gold-600 rounded-xl flex items-center justify-center">
                             <CreditCard className="w-6 h-6" />
                          </div>
                          <div>
                             <h4 className="font-bold text-navy-900">Payment Verification - {pay.clientName}</h4>
                             <p className="text-xs text-navy-500">Submitted ৳{pay.amount.toLocaleString()} for {pay.bookingType}</p>
                          </div>
                       </div>
                       <Link href="/admin/payments">
                          <Button size="sm" className="bg-navy-900 rounded-lg">Review</Button>
                       </Link>
                    </CardContent>
                  </Card>
               ))}

               {pendingMedicals.map(med => (
                  <Card key={med.id} className="border-none shadow-sm hover:shadow-md transition-all rounded-3xl overflow-hidden bg-white">
                    <CardContent className="p-6 flex items-center justify-between">
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center">
                             <Stethoscope className="w-6 h-6" />
                          </div>
                          <div>
                             <h4 className="font-bold text-navy-900">Medical Booking - {med.clientName}</h4>
                             <p className="text-xs text-navy-500">{med.country} • Needs Serial Assignment</p>
                          </div>
                       </div>
                       <Link href="/admin/medical-bookings">
                          <Button size="sm" className="bg-navy-900 rounded-lg">Assign</Button>
                       </Link>
                    </CardContent>
                  </Card>
               ))}
            </div>
         </div>

         {/* Quick Controls */}
         <div className="space-y-8">
            <h2 className="text-xl font-heading font-black text-navy-900">Quick Controls</h2>
            <div className="grid grid-cols-1 gap-4">
               <QuickControlLink href="/admin/site-content" label="Edit Website Text" icon={TrendingUp} />
               <QuickControlLink href="/admin/integrations" label="Manage Tracking Pixels" icon={Plus} />
               <QuickControlLink href="/admin/clients" label="Manage Client Access" icon={Users} />
               <QuickControlLink href="/admin/settings" label="Site Configuration" icon={AlertCircle} />
            </div>
         </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon: Icon, trend, color }: any) {
  return (
    <Card className="border-none shadow-sm rounded-3xl overflow-hidden bg-white group hover:shadow-md transition-all">
       <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
             <div className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500",
                color === 'teal' ? "bg-teal-50 text-teal-600 group-hover:bg-teal-600 group-hover:text-white" :
                color === 'gold' ? "bg-gold-50 text-gold-600 group-hover:bg-gold-500 group-hover:text-white" :
                "bg-navy-50 text-navy-600 group-hover:bg-navy-900 group-hover:text-white"
             )}>
                <Icon className="w-6 h-6" />
             </div>
             <div className="text-[10px] text-teal-600 font-black tracking-widest bg-teal-50 px-2 py-1 rounded-lg">LIVE</div>
          </div>
          <p className="text-[10px] font-bold text-navy-400 uppercase tracking-widest mb-1">{label}</p>
          <p className="text-3xl font-black text-navy-900 mb-2">{value}</p>
          <p className="text-[10px] text-navy-500 font-medium">{trend}</p>
       </CardContent>
    </Card>
  );
}

function QuickControlLink({ href, label, icon: Icon }: any) {
   return (
      <Link href={href}>
         <div className="p-6 bg-white rounded-[1.5rem] flex items-center justify-between group hover:bg-navy-900 transition-all shadow-sm border border-navy-50">
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 bg-navy-50 text-navy-400 rounded-xl flex items-center justify-center group-hover:bg-navy-800 transition-colors">
                  <Icon className="w-5 h-5" />
               </div>
               <span className="font-bold text-navy-900 group-hover:text-white transition-colors">{label}</span>
            </div>
            <ArrowUpRight className="w-5 h-5 text-navy-200 group-hover:text-teal-400 transition-all" />
         </div>
      </Link>
   );
}

function CheckCircle2(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  )
}
