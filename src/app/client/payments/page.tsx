import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getPaymentsByClient } from '@/lib/db-local';
import { 
  CreditCard, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Download,
  Search,
  ArrowUpRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from '@/lib/utils';

export default async function ClientPaymentsPage() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any).id;
  const payments = getPaymentsByClient(userId);

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-heading font-black text-navy-900">Payment History</h1>
          <p className="text-navy-500 mt-1">View and manage all your transactions with Travel Tree Overseas.</p>
        </div>
        <div className="flex items-center gap-4">
           <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-navy-100">
              <p className="text-[10px] font-bold text-navy-400 uppercase tracking-widest">Total Spent</p>
              <p className="text-xl font-black text-teal-600">৳{payments.reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()}</p>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Filter/Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center bg-white p-4 rounded-2xl shadow-sm border border-navy-100">
           <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
              <Input placeholder="Search by Transaction ID or Booking..." className="pl-11 h-12 bg-navy-50 border-none rounded-xl" />
           </div>
           <Button variant="outline" className="h-12 px-8 rounded-xl border-navy-200">Export CSV</Button>
        </div>

        {/* Payments Table */}
        <Card className="border-none shadow-2xl rounded-[2.5rem] bg-white overflow-hidden">
           <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-navy-50">
                  <TableRow className="hover:bg-transparent border-navy-100">
                    <TableHead className="py-6 px-8 text-navy-900 font-bold uppercase tracking-widest text-[10px]">Payment Date</TableHead>
                    <TableHead className="text-navy-900 font-bold uppercase tracking-widest text-[10px]">Booking Type</TableHead>
                    <TableHead className="text-navy-900 font-bold uppercase tracking-widest text-[10px]">Transaction ID</TableHead>
                    <TableHead className="text-navy-900 font-bold uppercase tracking-widest text-[10px]">Amount</TableHead>
                    <TableHead className="text-navy-900 font-bold uppercase tracking-widest text-[10px]">Status</TableHead>
                    <TableHead className="text-right px-8 text-navy-900 font-bold uppercase tracking-widest text-[10px]">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-64 text-center text-navy-400 italic">
                         No payments found in your history.
                      </TableCell>
                    </TableRow>
                  ) : (
                    payments.map((p) => (
                      <TableRow key={p.id} className="hover:bg-navy-50/50 transition-colors border-navy-50">
                        <TableCell className="py-6 px-8">
                           <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center">
                                 <Calendar className="w-5 h-5" />
                              </div>
                              <span className="font-medium">{new Date(p.createdAt).toLocaleDateString()}</span>
                           </div>
                        </TableCell>
                        <TableCell>
                           <Badge variant="outline" className="bg-navy-50 text-navy-700 border-navy-100 capitalize">
                              {p.bookingType}
                           </Badge>
                        </TableCell>
                        <TableCell className="font-mono text-xs font-bold text-navy-500">
                           {p.transactionId || '---'}
                        </TableCell>
                        <TableCell className="font-black text-navy-900">
                           ৳{p.amount.toLocaleString()}
                        </TableCell>
                        <TableCell>
                           <div className="flex items-center gap-2">
                              {p.status === 'verified' ? (
                                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                              ) : p.status === 'rejected' ? (
                                <AlertCircle className="w-4 h-4 text-red-500" />
                              ) : (
                                <Clock className="w-4 h-4 text-gold-500" />
                              )}
                              <span className={cn(
                                "text-xs font-bold capitalize",
                                p.status === 'verified' ? "text-teal-600" : 
                                p.status === 'rejected' ? "text-red-500" : "text-gold-600"
                              )}>
                                 {p.status}
                              </span>
                           </div>
                        </TableCell>
                        <TableCell className="text-right px-8">
                           <Button variant="ghost" size="icon" className="rounded-xl text-navy-400 hover:text-teal-600">
                              <ArrowUpRight className="w-5 h-5" />
                           </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
           </CardContent>
        </Card>

        {/* Info Box */}
        <div className="p-8 bg-teal-900 rounded-[2.5rem] text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-teal-400 opacity-10 rounded-full blur-[80px] -mr-32 -mt-32" />
           <div className="flex items-center gap-6 relative z-10">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-[1.5rem] flex items-center justify-center">
                 <Download className="w-8 h-8 text-teal-400" />
              </div>
              <div>
                 <h3 className="text-xl font-heading font-black">Need a full statement?</h3>
                 <p className="text-teal-100 text-sm">Download your complete financial year statement for tax purposes.</p>
              </div>
           </div>
           <Button className="bg-white text-teal-900 hover:bg-teal-50 px-8 py-6 rounded-xl font-bold relative z-10">
              Download Statement
           </Button>
        </div>
      </div>
    </div>
  );
}

function Calendar(props: any) {
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
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  )
}
