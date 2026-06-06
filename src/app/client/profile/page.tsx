import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getUserById } from '@/lib/db-local';
import { 
  User, 
  Mail, 
  Phone, 
  Globe, 
  MapPin,
  Camera,
  Shield,
  Bell,
  Lock,
  ArrowRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any).id;
  const user = getUserById(userId);

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex items-center gap-8">
           <div className="relative group">
              <div className="w-32 h-32 bg-teal-100 text-teal-600 rounded-[2.5rem] flex items-center justify-center text-4xl font-black shadow-inner">
                 {user.name[0]}
              </div>
              <button className="absolute bottom-2 right-2 w-10 h-10 bg-navy-900 text-white rounded-xl flex items-center justify-center border-4 border-navy-50 hover:bg-teal-600 transition-colors">
                 <Camera className="w-4 h-4" />
              </button>
           </div>
           <div>
              <h1 className="text-3xl font-heading font-black text-navy-900">{user.name}</h1>
              <p className="text-navy-500 font-medium">Joined {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
              <div className="flex gap-2 mt-3">
                 <Badge variant="outline" className="bg-teal-50 text-teal-600 border-teal-100 uppercase text-[10px] tracking-widest px-3 py-1">Verified Client</Badge>
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-8">
            <Card className="border-none shadow-xl rounded-[2.5rem] bg-white overflow-hidden">
               <CardHeader className="p-8 pb-0">
                  <CardTitle className="text-xl font-heading font-black">Personal Information</CardTitle>
               </CardHeader>
               <CardContent className="p-8 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <Label>Full Name</Label>
                        <Input defaultValue={user.name} className="h-12 bg-navy-50 border-none rounded-xl px-4" />
                     </div>
                     <div className="space-y-2">
                        <Label>Email Address</Label>
                        <Input defaultValue={user.email} disabled className="h-12 bg-navy-200 border-none rounded-xl px-4 text-navy-500" />
                     </div>
                     <div className="space-y-2">
                        <Label>Phone Number</Label>
                        <Input defaultValue={user.phone} className="h-12 bg-navy-50 border-none rounded-xl px-4" />
                     </div>
                     <div className="space-y-2">
                        <Label>Nationality</Label>
                        <Input defaultValue={user.nationality} className="h-12 bg-navy-50 border-none rounded-xl px-4" />
                     </div>
                  </div>
                  <div className="space-y-2">
                     <Label>Passport Number</Label>
                     <Input defaultValue={user.passportNumber} className="h-12 bg-navy-50 border-none rounded-xl px-4" />
                  </div>
                  <div className="space-y-2">
                     <Label>Residential Address</Label>
                     <Input defaultValue={user.address} className="h-12 bg-navy-50 border-none rounded-xl px-4" />
                  </div>
                  <div className="pt-4">
                     <Button className="bg-teal-600 hover:bg-teal-700 px-8 py-6 rounded-xl">Save Changes</Button>
                  </div>
               </CardContent>
            </Card>

            <Card className="border-none shadow-xl rounded-[2.5rem] bg-white overflow-hidden">
               <CardHeader className="p-8 pb-0">
                  <CardTitle className="text-xl font-heading font-black">Security</CardTitle>
               </CardHeader>
               <CardContent className="p-8 space-y-6">
                  <div className="flex items-center justify-between p-6 bg-navy-50 rounded-2xl border border-navy-100">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-navy-400">
                           <Lock className="w-5 h-5" />
                        </div>
                        <div>
                           <p className="font-bold text-navy-900">Account Password</p>
                           <p className="text-xs text-navy-500">Change your login password regularly.</p>
                        </div>
                     </div>
                     <Button variant="outline" className="rounded-xl border-navy-200">Update</Button>
                  </div>
               </CardContent>
            </Card>
         </div>

         <div className="space-y-8">
            <Card className="border-none shadow-xl rounded-[2.5rem] bg-navy-900 text-white overflow-hidden">
               <CardHeader className="p-8">
                  <CardTitle className="text-lg font-heading font-black">Quick Actions</CardTitle>
               </CardHeader>
               <CardContent className="p-8 pt-0 space-y-4">
                  <ActionButton icon={Shield} label="Privacy Settings" />
                  <ActionButton icon={Bell} label="Notification Prefs" />
                  <ActionButton icon={MapPin} label="Delivery Address" />
               </CardContent>
            </Card>

            <div className="p-8 bg-gold-400 rounded-[2.5rem] text-navy-900 shadow-xl">
               <h3 className="text-xl font-heading font-black mb-2">Need Help?</h3>
               <p className="text-navy-700 text-sm mb-6">Our support team is available 24/7 for account related issues.</p>
               <Button className="w-full bg-navy-900 text-white hover:bg-navy-800 py-6 rounded-xl font-bold">Contact Support</Button>
            </div>
         </div>
      </div>
    </div>
  );
}

function ActionButton({ icon: Icon, label }: any) {
   return (
      <button className="w-full flex items-center justify-between p-4 bg-navy-800 rounded-xl hover:bg-navy-700 transition-colors group">
         <div className="flex items-center gap-3">
            <Icon className="w-5 h-5 text-teal-400" />
            <span className="text-sm font-bold">{label}</span>
         </div>
         <ArrowRight className="w-4 h-4 text-navy-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
      </button>
   );
}

function Badge({ children, variant, className }: any) {
  return (
    <span className={className}>
      {children}
    </span>
  );
}
