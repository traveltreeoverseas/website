import { getSiteContent } from '@/lib/db-local';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import HeroParallax from '@/components/public/HeroParallax';
import { 
  Stethoscope, 
  FileCheck, 
  Plane, 
  Hotel, 
  Users, 
  Moon,
  ShieldCheck,
  Zap,
  Globe,
  Clock
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const iconMap: any = {
  Stethoscope: Stethoscope,
  FileCheck: FileCheck,
  Plane: Plane,
  Hotel: Hotel,
  Users: Users,
  Moon: Moon,
};

export default function HomePage() {
  const content = getSiteContent();

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <HeroParallax content={content.hero} />

      {/* Trust Badges */}
      <section className="py-12 bg-navy-50 border-y border-navy-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <ShieldCheck className="w-8 h-8 text-teal-600" />
              <div>
                <p className="font-bold text-navy-800 leading-none">ISO Certified</p>
                <p className="text-[10px] uppercase tracking-wider text-navy-500">Quality Service</p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <Zap className="w-8 h-8 text-teal-600" />
              <div>
                <p className="font-bold text-navy-800 leading-none">Fast Approval</p>
                <p className="text-[10px] uppercase tracking-wider text-navy-500">Quick Processing</p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <Globe className="w-8 h-8 text-teal-600" />
              <div>
                <p className="font-bold text-navy-800 leading-none">Global Network</p>
                <p className="text-[10px] uppercase tracking-wider text-navy-500">20+ Countries</p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <Clock className="w-8 h-8 text-teal-600" />
              <div>
                <p className="font-bold text-navy-800 leading-none">24/7 Support</p>
                <p className="text-[10px] uppercase tracking-wider text-navy-500">Always Online</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <span className="text-teal-600 font-bold uppercase tracking-widest text-xs">What We Offer</span>
            <h2 className="text-3xl md:text-5xl font-heading font-black mt-4 mb-6">Our Specialized Services</h2>
            <p className="text-navy-500 max-w-2xl mx-auto">
              We provide comprehensive travel solutions tailored to your needs. From medical bookings to visa assistance, we handle everything with precision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.services.filter(s => s.isActive).map((service) => {
              const Icon = iconMap[service.icon] || Plane;
              return (
                <Card key={service.id} className="group hover:shadow-2xl transition-all duration-500 border-navy-100 overflow-hidden rounded-3xl">
                  <CardContent className="p-0">
                    <div className="p-8">
                      <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600 mb-6 group-hover:bg-teal-600 group-hover:text-white transition-colors duration-500">
                        <Icon className="w-7 h-7" />
                      </div>
                      <h3 className="text-xl font-heading font-bold mb-4">{service.title}</h3>
                      <p className="text-navy-500 text-sm mb-6 line-clamp-3">
                        {service.description}
                      </p>
                      <ul className="space-y-2 mb-8">
                        {service.features.slice(0, 3).map((f, i) => (
                          <li key={i} className="flex items-center gap-2 text-xs text-navy-600">
                            <div className="w-1 h-1 bg-teal-500 rounded-full" />
                            {f}
                          </li>
                        ))}
                      </ul>
                      <Link href={`/services#${service.id}`}>
                        <Button variant="outline" className="w-full group-hover:bg-teal-600 group-hover:text-white transition-colors duration-500 border-teal-600 text-teal-600">
                          Learn More
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-teal-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[80%] bg-teal-400 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[80%] bg-gold-400 rounded-full blur-[120px]" />
        </div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-heading font-black text-white mb-8">
            Ready to Start Your International Journey?
          </h2>
          <p className="text-teal-100 mb-12 text-lg">
            Join thousands of satisfied clients who have successfully processed their medicals and visas through Travel Tree Overseas.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register">
              <Button size="lg" className="bg-gold-500 hover:bg-gold-600 text-navy-900 px-10 py-7 text-lg font-bold rounded-2xl shadow-xl shadow-gold-500/20">
                Register as Client
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-10 py-7 text-lg rounded-2xl">
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
