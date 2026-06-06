import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getMedicalBookingsByClient } from '@/lib/db-local';
import { 
  Stethoscope, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Download,
  Info,
  Calendar,
  FileText,
  CreditCard,
  Globe
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default async function MedicalStatusPage() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any).id;
  const medicals = getMedicalBookingsByClient(userId);

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-heading font-black text-navy-900">Medical Booking Status</h1>
          <p className="text-navy-500 mt-1">Track your GCC medical application progress in real-time.</p>
        </div>
      </div>

      {medicals.length === 0 ? (
        <Card className="border-none shadow-sm rounded-[2.5rem] bg-white p-20 text-center">
           <div className="w-20 h-20 bg-navy-50 rounded-full flex items-center justify-center mx-auto mb-6 text-navy-200">
              <Stethoscope className="w-10 h-10" />
           </div>
           <h3 className="text-2xl font-heading font-black text-navy-900 mb-2">No Bookings Found</h3>
           <p className="text-navy-500 max-w-sm mx-auto mb-8">You haven't made any medical bookings yet. Start your application today.</p>
           <Button className="bg-teal-600 rounded-xl px-10 py-6">Book Medical Now</Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-8">
          {medicals.map((med) => (
            <Card key={med.id} className="border-none shadow-xl rounded-[2.5rem] bg-white overflow-hidden">
               <CardContent className="p-0">
                  <div className="p-8 md:p-12">
                     <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                        <div className="flex items-center gap-6">
                           <div className="w-16 h-16 bg-teal-50 text-teal-600 rounded-[1.5rem] flex items-center justify-center shadow-inner">
                              <Stethoscope className="w-8 h-8" />
                           </div>
                           <div>
                              <div className="flex items-center gap-3 mb-1">
                                 <h2 className="text-2xl font-heading font-black text-navy-900">GCC Medical Booking</h2>
                                 <Badge className={cn(
                                    "capitalize px-3 py-1 rounded-full text-[10px] font-bold tracking-widest border-none shadow-sm",
                                    med.status === 'booked' || med.status === 'completed' ? "bg-teal-600 text-white" : 
                                    med.status === 'cancelled' ? "bg-red-500 text-white" : "bg-gold-400 text-navy-900"
                                 )}>
                                    {med.status.replace('_', ' ')}
                                 </Badge>
                              </div>
                              <p className="text-navy-500 flex items-center gap-2 text-sm">
                                 <Calendar className="w-4 h-4" />
                                 {new Date(med.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                              </p>
                           </div>
                        </div>
                        <div className="flex items-center gap-4">
                           {med.status === 'booked' && (
                              <Button className="bg-navy-900 rounded-xl px-6">
                                 <Download className="w-4 h-4 mr-2" />
                                 Get Receipt
                              </Button>
                           )}
                           <Button variant="outline" className="rounded-xl border-navy-200">
                              View Details
                           </Button>
                        </div>
                     </div>

                     {/* Progress Timeline */}
                     <div className="relative mb-12 px-4 md:px-0">
                        <div className="absolute top-1/2 left-0 w-full h-1 bg-navy-100 -z-10 -translate-y-1/2 hidden md:block" />
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                           <TimelineStep 
                              icon={FileText} 
                              label="Submitted" 
                              status="completed" 
                              date={med.createdAt}
                           />
                           <TimelineStep 
                              icon={CreditCard} 
                              label="Payment Verified" 
                              status={med.status === 'pending_payment' || med.status === 'payment_submitted' ? 'pending' : 'completed'} 
                           />
                           <TimelineStep 
                              icon={Clock} 
                              label="Serial Booked" 
                              status={med.status === 'booked' || med.status === 'completed' ? 'completed' : 'pending'} 
                           />
                           <TimelineStep 
                              icon={CheckCircle2} 
                              label="Completed" 
                              status={med.status === 'completed' ? 'completed' : 'pending'} 
                           />
                        </div>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 bg-navy-50 rounded-[2rem] border border-navy-100">
                        <div>
                           <p className="text-[10px] font-bold text-navy-400 uppercase tracking-widest mb-1">Destination</p>
                           <p className="text-navy-900 font-bold flex items-center gap-2">
                              <Globe className="w-4 h-4 text-teal-600" />
                              {med.country}
                           </p>
                        </div>
                        <div>
                           <p className="text-[10px] font-bold text-navy-400 uppercase tracking-widest mb-1">Medical Center</p>
                           <p className="text-navy-900 font-bold">{med.medicalCenter}</p>
                        </div>
                        <div>
                           <p className="text-[10px] font-bold text-navy-400 uppercase tracking-widest mb-1">Serial Number</p>
                           <p className="text-teal-600 font-black tracking-widest">
                              {med.serialNumber || 'AWAITING VERIFICATION'}
                           </p>
                        </div>
                     </div>
                  </div>
               </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function TimelineStep({ icon: Icon, label, status, date }: { icon: any, label: string, status: 'completed' | 'pending', date?: string }) {
  return (
    <div className="flex flex-row md:flex-col items-center gap-4 md:gap-3">
       <div className={cn(
          "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 shadow-sm",
          status === 'completed' ? "bg-teal-600 text-white" : "bg-white text-navy-200 border border-navy-100"
       )}>
          <Icon className="w-5 h-5" />
       </div>
       <div className="text-left md:text-center">
          <p className={cn(
             "text-xs font-bold uppercase tracking-widest",
             status === 'completed' ? "text-teal-600" : "text-navy-400"
          )}>{label}</p>
          {date && status === 'completed' && (
             <p className="text-[10px] text-navy-400 mt-0.5">{new Date(date).toLocaleDateString()}</p>
          )}
       </div>
    </div>
  );
}
