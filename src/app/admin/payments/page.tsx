'use client';

import { useState, useEffect } from 'react';
import { 
  CreditCard, 
  Search, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Download,
  Eye,
  Loader2,
  FileText,
  AlertCircle
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
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { toast } from 'sonner';

export default function PaymentManager() {
  const [payments, setPayments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  useEffect(() => {
    // Simulate fetch
    setTimeout(() => {
      setPayments([
        { id: 'pay_1', clientName: 'Rafiqul Islam', amount: 5500, bookingType: 'medical', status: 'submitted', createdAt: '2024-04-18', method: 'bKash', txnId: 'BK12345678' },
        { id: 'pay_2', clientName: 'Abdullah Mamun', amount: 15000, bookingType: 'visa', status: 'verified', createdAt: '2024-04-15', method: 'Nagad', txnId: 'NG90812312' },
        { id: 'pay_3', clientName: 'Sufia Begum', amount: 5500, bookingType: 'medical', status: 'rejected', createdAt: '2024-04-12', method: 'bKash', txnId: 'BK99911122' },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleAction = (id: string, newStatus: string) => {
    setPayments(payments.map(p => p.id === id ? { ...p, status: newStatus } : p));
    setIsPreviewOpen(false);
    toast.success(`Payment ${newStatus} successfully!`);
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
          <h1 className="text-3xl font-heading font-black text-navy-900">Payment Management</h1>
          <p className="text-navy-500 mt-1">Review and verify payment proofs from clients.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <Card className="border-none shadow-2xl rounded-[2.5rem] bg-white overflow-hidden">
           <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-navy-50">
                  <TableRow className="hover:bg-transparent border-navy-100">
                    <TableHead className="py-6 px-8 text-navy-900 font-bold uppercase tracking-widest text-[10px]">Client / Date</TableHead>
                    <TableHead className="text-navy-900 font-bold uppercase tracking-widest text-[10px]">Amount</TableHead>
                    <TableHead className="text-navy-900 font-bold uppercase tracking-widest text-[10px]">Type / Method</TableHead>
                    <TableHead className="text-navy-900 font-bold uppercase tracking-widest text-[10px]">Status</TableHead>
                    <TableHead className="text-right px-8 text-navy-900 font-bold uppercase tracking-widest text-[10px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((p) => (
                    <TableRow key={p.id} className="hover:bg-navy-50/50 transition-colors border-navy-50">
                      <TableCell className="py-6 px-8">
                         <div>
                            <p className="font-bold text-navy-900">{p.clientName}</p>
                            <p className="text-[10px] text-navy-400 font-bold mt-1 uppercase">{new Date(p.createdAt).toLocaleDateString()}</p>
                         </div>
                      </TableCell>
                      <TableCell>
                         <p className="font-black text-navy-900">৳{p.amount.toLocaleString()}</p>
                      </TableCell>
                      <TableCell>
                         <div className="flex flex-col gap-1">
                            <Badge variant="outline" className="bg-navy-50 text-navy-700 border-navy-100 capitalize w-fit">{p.bookingType}</Badge>
                            <span className="text-[10px] font-bold text-teal-600 uppercase tracking-widest">{p.method} • {p.txnId}</span>
                         </div>
                      </TableCell>
                      <TableCell>
                         <div className="flex items-center gap-2">
                            {p.status === 'verified' ? <CheckCircle2 className="w-4 h-4 text-teal-600" /> : 
                             p.status === 'rejected' ? <XCircle className="w-4 h-4 text-red-500" /> : <Clock className="w-4 h-4 text-gold-500" />}
                            <span className={cn(
                               "text-xs font-bold capitalize",
                               p.status === 'verified' ? "text-teal-600" : 
                               p.status === 'rejected' ? "text-red-500" : "text-gold-600"
                            )}>{p.status}</span>
                         </div>
                      </TableCell>
                      <TableCell className="text-right px-8">
                         <Button variant="outline" size="sm" className="rounded-xl border-navy-200" onClick={() => {
                            setSelectedPayment(p);
                            setIsPreviewOpen(true);
                         }}>
                            Review Proof
                         </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
           </CardContent>
        </Card>
      </div>

      {/* Review Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
         <DialogContent className="rounded-[2rem] max-w-lg">
            <DialogHeader>
               <DialogTitle className="text-xl font-heading font-black">Verify Payment Proof</DialogTitle>
               <DialogDescription>Review transaction details and screenshot submitted by {selectedPayment?.clientName}.</DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-6">
               <div className="aspect-video bg-navy-100 rounded-2xl flex items-center justify-center border-2 border-dashed border-navy-200">
                  <div className="text-center">
                     <ImageIcon className="w-12 h-12 text-navy-300 mx-auto mb-2" />
                     <p className="text-xs text-navy-400 font-bold uppercase tracking-widest">Payment Screenshot Preview</p>
                     <p className="text-[10px] text-navy-400 mt-1">Txn ID: {selectedPayment?.txnId}</p>
                  </div>
               </div>
               
               <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-navy-50 rounded-2xl">
                     <p className="text-[10px] font-bold text-navy-400 uppercase tracking-widest">Amount Expected</p>
                     <p className="text-lg font-black text-navy-900">৳{selectedPayment?.amount.toLocaleString()}</p>
                  </div>
                  <div className="p-4 bg-navy-50 rounded-2xl">
                     <p className="text-[10px] font-bold text-navy-400 uppercase tracking-widest">Method</p>
                     <p className="text-lg font-black text-teal-600 uppercase tracking-widest">{selectedPayment?.method}</p>
                  </div>
               </div>
            </div>
            <DialogFooter className="gap-2">
               <Button variant="outline" className="rounded-xl border-red-200 text-red-600 hover:bg-red-50" onClick={() => handleAction(selectedPayment.id, 'rejected')}>Reject</Button>
               <Button className="bg-teal-600 hover:bg-teal-700 rounded-xl px-10" onClick={() => handleAction(selectedPayment.id, 'verified')}>Approve & Verify</Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
    </div>
  );
}

function ImageIcon(props: any) {
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
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  )
}

function cn(...inputs: any) {
  return inputs.filter(Boolean).join(' ');
}
