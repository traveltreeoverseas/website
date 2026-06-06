import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Sidebar from '@/components/shared/Sidebar';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export default async function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login?callbackUrl=/client/dashboard');
  }

  if ((session.user as any).role !== 'client') {
    redirect('/admin/dashboard');
  }

  return (
    <div className="flex min-h-screen bg-navy-50">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 h-screen sticky top-0 border-r border-navy-100 shadow-xl z-30">
        <Sidebar role="client" />
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden h-16 bg-navy-900 flex items-center justify-between px-4 sticky top-0 z-40">
           <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center text-white">
                <span className="font-bold">T</span>
              </div>
              <span className="font-heading font-bold text-white tracking-tight">TRAVEL TREE</span>
           </div>
           
<Sheet>
               <SheetTrigger>
                  <Button variant="ghost" size="icon" className="text-white">
                     <Menu className="w-6 h-6" />
                  </Button>
               </SheetTrigger>
              <SheetContent side="left" className="p-0 border-none w-72">
                 <Sidebar role="client" />
              </SheetContent>
           </Sheet>
        </header>

        {/* Dynamic Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12">
          {children}
        </main>
      </div>
    </div>
  );
}
