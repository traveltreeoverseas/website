'use client';

import { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  MoreVertical, 
  UserPlus, 
  Mail, 
  Phone, 
  Shield, 
  Trash2,
  Loader2,
  CheckCircle2,
  XCircle,
  ExternalLink
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
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { toast } from 'sonner';

export default function ClientManager() {
  const [clients, setClients] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetch
    setTimeout(() => {
      setClients([
        { id: 'usr_1', name: 'Rafiqul Islam', email: 'rafiq@example.com', phone: '01711223344', status: 'active', createdAt: '2024-04-01', applications: 2 },
        { id: 'usr_2', name: 'Abdullah Mamun', email: 'mamun@example.com', phone: '01811556677', status: 'active', createdAt: '2024-04-05', applications: 1 },
        { id: 'usr_3', name: 'Sufia Begum', email: 'sufia@example.com', phone: '01911889900', status: 'inactive', createdAt: '2024-04-10', applications: 0 },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleToggleStatus = (id: string) => {
    setClients(clients.map(c => c.id === id ? { ...c, status: c.status === 'active' ? 'inactive' : 'active' } : c));
    toast.success('Client status updated');
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
          <h1 className="text-3xl font-heading font-black text-navy-900">Client Manager</h1>
          <p className="text-navy-500 mt-1">Manage registered clients and their account access.</p>
        </div>
        <Button className="bg-teal-600 hover:bg-teal-700 px-8 py-6 rounded-xl shadow-lg">
           <UserPlus className="w-4 h-4 mr-2" />
           Add New Client
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-2xl shadow-sm border border-navy-100">
         <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
            <Input placeholder="Search by name, email or phone..." className="pl-11 h-12 bg-navy-50 border-none rounded-xl" />
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
                    <TableHead className="py-6 px-8 text-navy-900 font-bold uppercase tracking-widest text-[10px]">Client Info</TableHead>
                    <TableHead className="text-navy-900 font-bold uppercase tracking-widest text-[10px]">Contact Details</TableHead>
                    <TableHead className="text-navy-900 font-bold uppercase tracking-widest text-[10px]">Joined Date</TableHead>
                    <TableHead className="text-navy-900 font-bold uppercase tracking-widest text-[10px]">Apps</TableHead>
                    <TableHead className="text-navy-900 font-bold uppercase tracking-widest text-[10px]">Status</TableHead>
                    <TableHead className="text-right px-8 text-navy-900 font-bold uppercase tracking-widest text-[10px]">Actions</TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {clients.map((client) => (
                     <TableRow key={client.id} className="hover:bg-navy-50/50 transition-colors border-navy-50">
                        <TableCell className="py-6 px-8">
                           <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
                                 {client.name[0]}
                              </div>
                              <p className="font-bold text-navy-900">{client.name}</p>
                           </div>
                        </TableCell>
                        <TableCell>
                           <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-2 text-xs text-navy-500">
                                 <Mail className="w-3 h-3 text-navy-400" /> {client.email}
                              </div>
                              <div className="flex items-center gap-2 text-xs text-navy-500">
                                 <Phone className="w-3 h-3 text-navy-400" /> {client.phone}
                              </div>
                           </div>
                        </TableCell>
                        <TableCell className="text-sm text-navy-500">
                           {new Date(client.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                           <Badge className="bg-navy-900 text-white font-bold">{client.applications}</Badge>
                        </TableCell>
                        <TableCell>
                           <Badge variant={client.status === 'active' ? 'default' : 'secondary'} className={cn(
                              "capitalize rounded-full px-3 py-1 text-[10px] font-bold tracking-widest border-none",
                              client.status === 'active' ? "bg-teal-100 text-teal-700" : "bg-navy-100 text-navy-500"
                           )}>
                              {client.status}
                           </Badge>
                        </TableCell>
<TableCell className="text-right px-8">
                            <DropdownMenu>
                               <DropdownMenuTrigger>
                                  <Button variant="ghost" size="icon" className="rounded-full text-navy-400">
                                     <MoreVertical className="w-5 h-5" />
                                  </Button>
                               </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-56">
                                 <DropdownMenuItem className="cursor-pointer">
                                    <ExternalLink className="w-4 h-4 mr-2" /> View Full Profile
                                 </DropdownMenuItem>
                                 <DropdownMenuItem className="cursor-pointer">
                                    <Shield className="w-4 h-4 mr-2" /> Reset Password
                                 </DropdownMenuItem>
                                 <DropdownMenuSeparator />
                                 <DropdownMenuItem className="cursor-pointer" onClick={() => handleToggleStatus(client.id)}>
                                    {client.status === 'active' ? (
                                       <><XCircle className="w-4 h-4 mr-2 text-red-500" /> Deactivate Account</>
                                    ) : (
                                       <><CheckCircle2 className="w-4 h-4 mr-2 text-teal-500" /> Activate Account</>
                                    )}
                                 </DropdownMenuItem>
                                 <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600">
                                    <Trash2 className="w-4 h-4 mr-2" /> Delete Account
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
    </div>
  );
}

function cn(...inputs: any) {
  return inputs.filter(Boolean).join(' ');
}
