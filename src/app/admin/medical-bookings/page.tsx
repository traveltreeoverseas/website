'use client';

import { useState, useEffect } from 'react';
import { 
  Stethoscope, 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Download,
  Eye,
  MoreVertical,
  Loader2,
  AlertCircle,
  FileText,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function MedicalBookingManager() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [serialNumber, setSerialNumber] = useState('');

  useEffect(() => {
    // Simulate fetch from API
    setTimeout(() => {
      setBookings([
        { id: 'mb_1', clientName: 'Rafiqul Islam', country: 'Saudi Arabia', status: 'payment_submitted', createdAt: '2024-04-18', amount: 5500, passport: 'A12345678' },
        { id: 'mb_2', clientName: 'Sharmin Begum', country: 'UAE', status: 'booked', createdAt: '2024-04-15', amount: 5500, passport: 'B98765432', serialNumber: 'GAMCA-10293' },
        { id: 'mb_3', clientName: 'Kamal Hossain', country: 'Qatar', status: 'pending_payment', createdAt: '2024-04-19', amount: 5500, passport: 'C45678901' },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleUpdateStatus = (booking: any) => {
    setSelectedBooking(booking);
    setSerialNumber(booking.serialNumber || '');
    setIsUpdateDialogOpen(true);
  };

  const saveUpdate = () => {
    setBookings(bookings.map(b => 
      b.id === selectedBooking.id 
        ? { ...b, status: 'booked', serialNumber } 
        : b
    ));
    setIsUpdateDialogOpen(false);
    toast.success('Booking updated successfully!');
  };

  if (isLoading) return (
    <div className="h-[60vh] flex items-center justify-center">
       <Loader2 className="w-12 h-12 text-teal-600 animate-spin" />
    </div>
  );

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-black text-navy-900">Medical Bookings</h1>
          <p className="text-navy-500 mt-1">Manage GCC medical applications and assign serials.</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-2xl shadow-sm border border-navy-100">
         <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
            <Input placeholder="Search by name, passport, or country..." className="pl-11 h-12 bg-navy-50 border-none rounded-xl" />
         </div>
         <Button variant="outline" className="h-12 rounded-xl px-6 flex gap-2">
            <Filter className="w-4 h-4" />
            Filter
         </Button>
      </div>

      <Card className="border-none shadow-2xl rounded-[2.5rem] bg-white overflow-hidden">
         <CardContent className="p-0">
            <Table>
               <TableHeader className="bg-navy-50">
                  <TableRow className="hover:bg-transparent border-navy-100">
                    <TableHead className="py-6 px-8 text-navy-900 font-bold uppercase tracking-widest text-[10px]">Client / Passport</TableHead>
                    <TableHead className="text-navy-900 font-bold uppercase tracking-widest text-[10px]">Country</TableHead>
                    <TableHead className="text-navy-900 font-bold uppercase tracking-widest text-[10px]">Date</TableHead>
                    <TableHead className="text-navy-900 font-bold uppercase tracking-widest text-[10px]">Payment Status</TableHead>
                    <TableHead className="text-navy-900 font-bold uppercase tracking-widest text-[10px]">Serial Number</TableHead>
                    <TableHead className="text-right px-8 text-navy-900 font-bold uppercase tracking-widest text-[10px]">Actions</TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {bookings.map((booking) => (
                     <TableRow key={booking.id} className="hover:bg-navy-50/50 transition-colors border-navy-50">
                        <TableCell className="py-6 px-8">
                           <div>
                              <p className="font-bold text-navy-900">{booking.clientName}</p>
                              <p className="text-[10px] text-navy-400 font-mono font-bold mt-1 uppercase">{booking.passport}</p>
                           </div>
                        </TableCell>
                        <TableCell>
                           <Badge variant="outline" className="bg-teal-50 text-teal-700 border-teal-100">
                              {booking.country}
                           </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-navy-500">
                           {new Date(booking.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                           <div className="flex items-center gap-2">
                              <div className={cn(
                                 "w-2 h-2 rounded-full",
                                 booking.status === 'booked' ? "bg-teal-500" : "bg-gold-500"
                              )} />
                              <span className="text-xs font-bold capitalize">{booking.status.replace('_', ' ')}</span>
                           </div>
                        </TableCell>
                        <TableCell>
                           {booking.serialNumber ? (
                              <span className="font-mono text-xs font-bold text-teal-600">{booking.serialNumber}</span>
                           ) : (
                              <span className="text-xs text-navy-300 italic">Not assigned</span>
                           )}
                        </TableCell>
                        <TableCell className="text-right px-8">
                           <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                 <Button variant="ghost" size="icon" className="rounded-full text-navy-400">
                                    <MoreVertical className="w-5 h-5" />
                                 </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-48">
                                 <DropdownMenuItem className="cursor-pointer">
                                    <Eye className="w-4 h-4 mr-2" /> View Details
                                 </DropdownMenuItem>
                                 <DropdownMenuItem className="cursor-pointer" onClick={() => handleUpdateStatus(booking)}>
                                    <CheckCircle2 className="w-4 h-4 mr-2" /> Update Status
                                 </DropdownMenuItem>
                                 <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600">
                                    <XCircle className="w-4 h-4 mr-2" /> Cancel Booking
                                 </DropdownMenuItem>
                              </DropdownMenuContent>
                           </DropdownMenu>
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </CardContent>
      </Card>

      {/* Update Dialog */}
      <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
         <DialogContent className="rounded-[2rem] max-w-md">
            <DialogHeader>
               <DialogTitle className="text-xl font-heading font-black">Update Booking Status</DialogTitle>
               <DialogDescription>
                  Updating booking for <strong>{selectedBooking?.clientName}</strong>
               </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
               <div className="space-y-2">
                  <Label>Assign Serial Number</Label>
                  <Input 
                     value={serialNumber} 
                     onChange={(e) => setSerialNumber(e.target.value)}
                     placeholder="GAMCA-XXXXX" 
                     className="h-12 bg-navy-50 border-none rounded-xl"
                  />
                  <p className="text-[10px] text-navy-400">Entering a serial number will mark this as "Booked".</p>
               </div>
               
               <div className="p-4 bg-teal-50 rounded-2xl flex gap-3 items-start border border-teal-100">
                  <Info className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-navy-700">Updating this will notify the client and they can see it in their dashboard immediately.</p>
               </div>
            </div>
            <DialogFooter className="gap-2">
               <Button variant="ghost" onClick={() => setIsUpdateDialogOpen(false)} className="rounded-xl">Cancel</Button>
               <Button onClick={saveUpdate} className="bg-teal-600 hover:bg-teal-700 rounded-xl px-8">Save Changes</Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
    </div>
  );
}

function cn(...inputs: any) {
  return inputs.filter(Boolean).join(' ');
}
