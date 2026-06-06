'use client';

import { useState, useEffect } from 'react';
import { 
  FileCheck, 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  Edit2, 
  Truck, 
  Trash2,
  Loader2,
  CheckCircle2,
  MapPin,
  Clock
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

export default function VisaTrackingManager() {
  const [visas, setVisas] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedVisa, setSelectedVisa] = useState<any>(null);

  useEffect(() => {
    // Simulate fetch
    setTimeout(() => {
      setVisas([
        { id: 'v_1', clientName: 'Abdullah Al Mamun', passport: 'A12345678', visaType: 'work', country: 'Saudi Arabia', status: 'processing', reference: 'KSA-90123', updatedAt: '2024-04-18' },
        { id: 'v_2', clientName: 'Sufia Begum', passport: 'B98765432', visaType: 'visit', country: 'Saudi Arabia', status: 'stamped', reference: 'KSA-88712', updatedAt: '2024-04-19' },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleUpdateStatus = (visa: any, newStatus: string) => {
    setVisas(visas.map(v => v.id === visa.id ? { ...v, status: newStatus, updatedAt: new Date().toISOString() } : v));
    toast.success(`Status updated to ${newStatus}`);
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
          <h1 className="text-3xl font-heading font-black text-navy-900">Visa Tracking Manager</h1>
          <p className="text-navy-500 mt-1">Manage visa application stages and update clients.</p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)} className="bg-teal-600 hover:bg-teal-700 px-8 py-6 rounded-xl shadow-lg">
           <Plus className="w-4 h-4 mr-2" />
           Add New Visa App
        </Button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-2xl shadow-sm border border-navy-100">
         <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
            <Input placeholder="Search by name, passport, or reference..." className="pl-11 h-12 bg-navy-50 border-none rounded-xl" />
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
                    <TableHead className="py-6 px-8 text-navy-900 font-bold uppercase tracking-widest text-[10px]">Client / Reference</TableHead>
                    <TableHead className="text-navy-900 font-bold uppercase tracking-widest text-[10px]">Visa Type</TableHead>
                    <TableHead className="text-navy-900 font-bold uppercase tracking-widest text-[10px]">Status Stage</TableHead>
                    <TableHead className="text-navy-900 font-bold uppercase tracking-widest text-[10px]">Last Update</TableHead>
                    <TableHead className="text-right px-8 text-navy-900 font-bold uppercase tracking-widest text-[10px]">Actions</TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {visas.map((visa) => (
                     <TableRow key={visa.id} className="hover:bg-navy-50/50 transition-colors border-navy-50">
                        <TableCell className="py-6 px-8">
                           <div>
                              <p className="font-bold text-navy-900">{visa.clientName}</p>
                              <p className="text-[10px] text-teal-600 font-bold mt-1 uppercase tracking-wider">{visa.reference}</p>
                           </div>
                        </TableCell>
                        <TableCell>
                           <Badge variant="outline" className="bg-navy-50 text-navy-700 border-navy-100 capitalize">
                              {visa.visaType} Visa
                           </Badge>
                        </TableCell>
                        <TableCell>
                           <Select 
                              defaultValue={visa.status}
                              onValueChange={(val) => handleUpdateStatus(visa, val)}
                           >
                              <SelectTrigger className={cn(
                                 "w-40 h-10 rounded-lg border-none shadow-sm font-bold text-[10px] uppercase tracking-widest",
                                 visa.status === 'stamped' ? "bg-teal-600 text-white" : 
                                 visa.status === 'processing' ? "bg-gold-400 text-navy-900" : "bg-navy-900 text-white"
                              )}>
                                 <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectItem value="submitted">Submitted</SelectItem>
                                 <SelectItem value="documents_verified">Verified</SelectItem>
                                 <SelectItem value="processing">Processing</SelectItem>
                                 <SelectItem value="stamped">Stamped</SelectItem>
                                 <SelectItem value="delivered">Delivered</SelectItem>
                                 <SelectItem value="rejected">Rejected</SelectItem>
                              </SelectContent>
                           </Select>
                        </TableCell>
                        <TableCell className="text-sm text-navy-500">
                           {new Date(visa.updatedAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right px-8">
                           <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                 <Button variant="ghost" size="icon" className="rounded-full text-navy-400">
                                    <MoreVertical className="w-5 h-5" />
                                 </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-48">
                                 <DropdownMenuItem className="cursor-pointer"><Edit2 className="w-4 h-4 mr-2" /> Edit Info</DropdownMenuItem>
                                 <DropdownMenuItem className="cursor-pointer"><Clock className="w-4 h-4 mr-2" /> History</DropdownMenuItem>
                                 <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600"><Trash2 className="w-4 h-4 mr-2" /> Delete App</DropdownMenuItem>
                              </DropdownMenuContent>
                           </DropdownMenu>
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </CardContent>
      </Card>

      {/* Add Visa Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
         <DialogContent className="rounded-[2rem] max-w-2xl">
            <DialogHeader>
               <DialogTitle className="text-xl font-heading font-black">Add New Visa Application</DialogTitle>
               <DialogDescription>Create a tracking entry for a client's visa application.</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
               <div className="space-y-2">
                  <Label>Client Name</Label>
                  <Input placeholder="Select or type name" className="h-12 bg-navy-50 border-none rounded-xl" />
               </div>
               <div className="space-y-2">
                  <Label>Passport Number</Label>
                  <Input placeholder="A12345678" className="h-12 bg-navy-50 border-none rounded-xl" />
               </div>
               <div className="space-y-2">
                  <Label>Visa Type</Label>
                  <Select>
                     <SelectTrigger className="h-12 bg-navy-50 border-none rounded-xl">
                        <SelectValue placeholder="Select Type" />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectItem value="work">Work Visa</SelectItem>
                        <SelectItem value="visit">Visit Visa</SelectItem>
                        <SelectItem value="hajj">Hajj Visa</SelectItem>
                        <SelectItem value="umrah">Umrah Visa</SelectItem>
                     </SelectContent>
                  </Select>
               </div>
               <div className="space-y-2">
                  <Label>Reference Number</Label>
                  <Input placeholder="KSA-XXXXX" className="h-12 bg-navy-50 border-none rounded-xl" />
               </div>
            </div>
            <DialogFooter>
               <Button variant="ghost" onClick={() => setIsAddDialogOpen(false)} className="rounded-xl">Cancel</Button>
               <Button className="bg-teal-600 hover:bg-teal-700 rounded-xl px-10" onClick={() => {
                  setIsAddDialogOpen(false);
                  toast.success('Visa application added!');
               }}>Add Application</Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
    </div>
  );
}

function cn(...inputs: any) {
  return inputs.filter(Boolean).join(' ');
}
