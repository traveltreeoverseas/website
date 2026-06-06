import { getSiteContent } from '@/lib/db-local';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import { 
  Stethoscope, 
  FileCheck, 
  Plane, 
  Hotel, 
  Users, 
  Moon,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const iconMap: any = {
  Stethoscope: Stethoscope,
  FileCheck: FileCheck,
  Plane: Plane,
  Hotel: Hotel,
  Users: Users,
  Moon: Moon,
};

export default function ServicesPage() {
  const content = getSiteContent();
  const services = content.services.filter(s => s.isActive);

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Header */}
      <section className="pt-32 pb-20 md:pt-48 md:pb-32 bg-teal-900 text-white text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[100%] bg-white rounded-full blur-[150px]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <span className="text-gold-400 font-bold uppercase tracking-widest text-xs">Our Expertise</span>
          <h1 className="text-4xl md:text-6xl font-heading font-black mt-4 mb-6">World-Class Travel Services</h1>
          <p className="text-teal-100 max-w-2xl mx-auto text-lg">
            Comprehensive solutions for GCC medical, visa processing, and global travel planning.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-32">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || Plane;
            const isEven = index % 2 === 0;
            
            return (
              <div 
                key={service.id} 
                id={service.id}
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 items-center`}
              >
                {/* Content */}
                <div className="flex-1 space-y-8">
                  <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-2xl flex items-center justify-center">
                    <Icon className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-heading font-black mb-4 text-navy-900">{service.title}</h2>
                    <p className="text-navy-500 leading-relaxed text-lg">
                      {service.description}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-teal-600 mt-0.5 shrink-0" />
                        <span className="text-sm text-navy-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                    <Link href="/register" className="w-full sm:w-auto">
                      <Button className="w-full sm:w-auto bg-teal-600 px-8 py-6 rounded-xl">
                        Book This Service
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                    {service.price && (
                       <span className="text-navy-900 font-bold">{service.price}</span>
                    )}
                  </div>
                </div>

                {/* Decorative Image/Box */}
                <div className="flex-1 w-full max-w-xl">
                  <div className="relative aspect-video lg:aspect-square bg-navy-100 rounded-[3rem] overflow-hidden group shadow-2xl">
                    <div className="absolute inset-0 bg-teal-600/10 group-hover:bg-transparent transition-colors duration-500" />
                    <div className="absolute inset-0 flex items-center justify-center">
                       <Icon className="w-32 h-32 text-navy-200 group-hover:scale-110 transition-transform duration-500" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 bg-navy-50 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center relative z-10">
          <h2 className="text-3xl font-heading font-black mb-16">Why Process Through Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-8 bg-white rounded-3xl shadow-sm hover:shadow-xl transition-shadow border border-navy-100">
               <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-xl flex items-center justify-center mx-auto mb-6 font-bold">01</div>
               <h3 className="font-heading font-bold text-xl mb-4">Direct Integration</h3>
               <p className="text-sm text-navy-500">We use our authorized business accounts for direct and faster processing with GCC portals.</p>
            </div>
            <div className="p-8 bg-white rounded-3xl shadow-sm hover:shadow-xl transition-shadow border border-navy-100">
               <div className="w-12 h-12 bg-gold-100 text-gold-600 rounded-xl flex items-center justify-center mx-auto mb-6 font-bold">02</div>
               <h3 className="font-heading font-bold text-xl mb-4">Real-time Tracking</h3>
               <p className="text-sm text-navy-500">Our advanced portal allows you to track every stage of your application 24/7 from your mobile.</p>
            </div>
            <div className="p-8 bg-white rounded-3xl shadow-sm hover:shadow-xl transition-shadow border border-navy-100">
               <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-xl flex items-center justify-center mx-auto mb-6 font-bold">03</div>
               <h3 className="font-heading font-bold text-xl mb-4">Payment Security</h3>
               <p className="text-sm text-navy-500">All payments are tracked and recorded. You get digital receipts and full transparency.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
