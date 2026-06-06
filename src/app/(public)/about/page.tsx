import { getSiteContent } from '@/lib/db-local';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import { Target, Eye, Award, CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  const content = getSiteContent();
  const { about } = content;

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Page Header */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-navy-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${about.image})` }}
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 text-center">
          <span className="text-teal-400 font-bold uppercase tracking-widest text-xs">Who We Are</span>
          <h1 className="text-4xl md:text-6xl font-heading font-black text-white mt-4 mb-6">{about.title}</h1>
          <p className="text-navy-200 max-w-2xl mx-auto text-lg">{about.subtitle}</p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src={about.image} 
                  alt="About Us" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-teal-600 rounded-3xl -z-10" />
              <div className="absolute -top-8 -left-8 w-48 h-48 bg-gold-400 rounded-3xl -z-10" />
            </div>
            
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-black mb-8 text-navy-900">Our Story</h2>
              <div className="space-y-6 text-navy-600 leading-relaxed">
                {about.description.split('\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-12">
                <div className="p-6 bg-teal-50 rounded-2xl border border-teal-100">
                  <div className="w-12 h-12 bg-teal-600 rounded-xl flex items-center justify-center text-white mb-4">
                    <Target className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-bold text-lg mb-2">Our Mission</h3>
                  <p className="text-sm text-navy-600">{about.mission}</p>
                </div>
                <div className="p-6 bg-gold-50 rounded-2xl border border-gold-100">
                  <div className="w-12 h-12 bg-gold-500 rounded-xl flex items-center justify-center text-navy-900 mb-4">
                    <Eye className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-bold text-lg mb-2">Our Vision</h3>
                  <p className="text-sm text-navy-600">{about.vision}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-navy-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            <div>
              <p className="text-4xl md:text-5xl font-heading font-black text-teal-600 mb-2">10k+</p>
              <p className="text-sm uppercase tracking-widest text-navy-500 font-bold">Happy Clients</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-heading font-black text-teal-600 mb-2">15+</p>
              <p className="text-sm uppercase tracking-widest text-navy-500 font-bold">Years Experience</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-heading font-black text-teal-600 mb-2">50+</p>
              <p className="text-sm uppercase tracking-widest text-navy-500 font-bold">Global Partners</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-heading font-black text-teal-600 mb-2">24/7</p>
              <p className="text-sm uppercase tracking-widest text-navy-500 font-bold">Support Ready</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <span className="text-teal-600 font-bold uppercase tracking-widest text-xs">The Experts</span>
          <h2 className="text-3xl md:text-5xl font-heading font-black mt-4 mb-16">Meet Our Leadership</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {about.teamMembers.map((member) => (
              <div key={member.id} className="group">
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden mb-6 shadow-xl">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <h3 className="text-xl font-heading font-bold mb-1">{member.name}</h3>
                <p className="text-teal-600 text-sm font-bold uppercase tracking-wider mb-3">{member.role}</p>
                <p className="text-navy-500 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
