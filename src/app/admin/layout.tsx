import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Sidebar from '@/components/shared/Sidebar';
import { Menu, Search, Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login?callbackUrl=/admin/dashboard');
  }

  if ((session.user as any).role !== 'admin') {
    redirect('/client/dashboard');
  }

  return (
    <div className="flex min-h-screen bg-navy-50">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 h-screen sticky top-0 border-r border-navy-100 shadow-xl z-30">
        <Sidebar role="admin" />
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Admin Top Header */}
        <header className="h-20 bg-white border-b border-navy-100 flex items-center justify-between px-6 md:px-12 sticky top-0 z-40">
           <div className="flex items-center gap-4 flex-1">
<Sheet>
                 <SheetTrigger>
                    <Button variant="ghost" size="icon" className="lg:hidden text-navy-800">
                       <Menu className="w-6 h-6" />
                    </Button>
                 </SheetTrigger>
                <SheetContent side="left" className="p-0 border-none w-72">
                   <Sidebar role="admin" />
                </SheetContent>
              </Sheet>
              <div className="hidden md:flex relative max-w-md w-full">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
                 <Input placeholder="Search everything..." className="pl-11 h-12 bg-navy-50 border-none rounded-xl" />
              </div>
           </div>

           <div className="flex items-center gap-6">
              <Button variant="ghost" size="icon" className="relative text-navy-400">
                 <Bell className="w-6 h-6" />
                 <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
              </Button>
              <div className="flex items-center gap-3 pl-6 border-l border-navy-100">
                 <div className="text-right hidden sm:block">
                    <p className="text-sm font-bold text-navy-900 leading-none">{session.user?.name}</p>
                    <p className="text-[10px] font-bold text-teal-600 uppercase tracking-widest mt-1">Super Admin</p>
                 </div>
                 <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-lg shadow-teal-600/20">
                    <User className="w-5 h-5" />
                 </div>
              </div>
           </div>
        </header>

        {/* Dynamic Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12">
          {children}
        </main>
      </div>
    </div>
  );
}
