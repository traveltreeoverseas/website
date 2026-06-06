import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getVisaTrackingsByClient } from '@/lib/db-supabase';
import { 
  FileCheck, 
  Clock, 
  CheckCircle2, 
  MapPin, 
  Info,
  Calendar,
  AlertCircle,
  Truck,
  ShieldCheck,
  Search
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default async function VisaStatusPage() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any).id;
  const visas = await getVisaTrackingsByClient(userId);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-teal-600 text-white';
      case 'rejected': return 'bg-red-500 text-white';
      case 'stamped': return 'bg-teal-500 text-white';
      default: return 'bg-gold-400 text-navy-900';
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-heading font-black text-navy-900">Visa Tracking</h1>
          <p className="text-navy-500 mt-1">Check the current stage of your visa application.</p>
        </div>
      </div>

      {visas.length === 0 ? (
        <Card className="border-none shadow-sm rounded-[2.5rem] bg-white p-20 text-center">
           <div className="w-20 h-20 bg-navy-50 rounded-full flex items-center justify-center mx-auto mb-6 text-navy-200">
              <FileCheck className="w-10 h-10" />
           </div>
           <h3 className="text-2xl font-heading font-black text-navy-900 mb-2">No Visa Applications</h3>
           <p className="text-navy-500 max-w-sm mx-auto mb-8">You don't have any active visa applications at the moment.</p>
           <Button className="bg-teal-600 rounded-xl px-10 py-6">Apply for Visa</Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-12">
          {visas.map((visa) => (
            <div key={visa.id} className="space-y-6">
               <div className="flex items-center justify-between px-4">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-md text-teal-600">
                        <FileCheck className="w-6 h-6" />
                     </div>
                     <div>
                        <h2 className="text-xl font-heading font-black text-navy-900 capitalize">{visa.visaType} Visa - {visa.country}</h2>
                        <p className="text-xs text-navy-500">Ref: {visa.referenceNumber || 'N/A'}</p>
                     </div>
                  </div>
                  <Badge className={cn("rounded-full px-4 py-1.5 text-[10px] font-bold tracking-widest border-none", getStatusColor(visa.status))}>
                     {visa.status.replace('_', ' ').toUpperCase()}
                  </Badge>
               </div>

               <Card className="border-none shadow-2xl rounded-[3rem] bg-white overflow-hidden">
                  <CardContent className="p-8 md:p-16">
                     {/* Visa Stage Flow */}
                     <div className="relative mb-20">
                        {/* Connecting Line */}
                        <div className="absolute top-[26px] left-[10%] w-[80%] h-1 bg-navy-50 -z-0 hidden lg:block" />
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 relative z-10">
                           <Stage 
                              icon={FileCheck} 
                              label="Submitted" 
                              status={['submitted', 'documents_verified', 'processing', 'stamped', 'delivered'].includes(visa.status) ? 'completed' : 'pending'} 
                              date={visa.applicationDate}
                           />
                           <Stage 
                              icon={ShieldCheck} 
                              label="Verified" 
                              status={['documents_verified', 'processing', 'stamped', 'delivered'].includes(visa.status) ? 'completed' : 'pending'} 
                           />
                           <Stage 
                              icon={Search} 
                              label="Processing" 
                              status={['processing', 'stamped', 'delivered'].includes(visa.status) ? 'completed' : 'pending'} 
                           />
                           <Stage 
                              icon={CheckCircle2} 
                              label="Stamped" 
                              status={['stamped', 'delivered'].includes(visa.status) ? 'completed' : 'pending'} 
                           />
                           <Stage 
                              icon={Truck} 
                              label="Delivered" 
                              status={visa.status === 'delivered' ? 'completed' : 'pending'} 
                              date={visa.deliveryDate}
                           />
                        </div>
                     </div>

                     {/* Details Grid */}
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pt-12 border-t border-navy-50">
                        <div>
                           <p className="text-[10px] font-bold text-navy-400 uppercase tracking-widest mb-2">Passport Number</p>
                           <p className="text-navy-900 font-black">{visa.passportNumber}</p>
                        </div>
                        <div>
                           <p className="text-[10px] font-bold text-navy-400 uppercase tracking-widest mb-2">Application Date</p>
                           <p className="text-navy-900 font-black">{new Date(visa.applicationDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                           <p className="text-[10px] font-bold text-navy-400 uppercase tracking-widest mb-2">Expected Date</p>
                           <p className="text-teal-600 font-black">{visa.expectedDate ? new Date(visa.expectedDate).toLocaleDateString() : 'PROCESSING'}</p>
                        </div>
                        <div>
                           <p className="text-[10px] font-bold text-navy-400 uppercase tracking-widest mb-2">Current Location</p>
                           <p className="text-navy-900 font-black flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-teal-600" />
                              {visa.status === 'delivered' ? 'With Client' : 'Consulate/Embassy'}
                           </p>
                        </div>
                     </div>

{visa.adminNotes && (
                         <div className="mt-12 p-6 bg-gold-50 rounded-2xl border border-gold-100 flex gap-4 items-start">
                            <AlertCircle className="w-6 h-6 text-gold-600 shrink-0 mt-0.5" />
                            <div>
                               <p className="text-xs font-bold text-gold-700 uppercase tracking-widest mb-1">Update from Admin</p>
                               <p className="text-navy-700 text-sm">{visa.adminNotes}</p>
                            </div>
                         </div>
                      )}
                   </CardContent>
            </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Stage({ icon: Icon, label, status, date }: { icon: any, label: string, status: 'completed' | 'pending', date?: string }) {
  return (
    <div className="flex flex-row lg:flex-col items-center gap-4 lg:gap-4 group">
       <div className={cn(
          "w-14 h-14 rounded-3xl flex items-center justify-center transition-all duration-700 shadow-md border-4 border-white",
          status === 'completed' ? "bg-teal-600 text-white scale-110" : "bg-navy-50 text-navy-200"
       )}>
          <Icon className="w-6 h-6" />
       </div>
       <div className="text-left lg:text-center">
          <p className={cn(
             "text-xs font-bold uppercase tracking-widest mb-1",
             status === 'completed' ? "text-navy-900" : "text-navy-300"
          )}>{label}</p>
          {date && status === 'completed' && (
             <p className="text-[10px] text-teal-600 font-bold">{new Date(date).toLocaleDateString()}</p>
          )}
          {!date && status === 'completed' && (
             <p className="text-[10px] text-teal-600 font-bold">COMPLETED</p>
          )}
       </div>
    </div>
  );
}
