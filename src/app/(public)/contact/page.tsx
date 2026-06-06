import { getSiteContent } from '@/lib/db-local';
import Link from 'next/link';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';

export default function ContactPage() {
  const content = getSiteContent();
  const { contact } = content;

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Header */}
      <section className="pt-32 pb-20 md:pt-48 md:pb-32 bg-navy-50 text-center">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <span className="text-teal-600 font-bold uppercase tracking-widest text-xs">Get In Touch</span>
          <h1 className="text-4xl md:text-6xl font-heading font-black mt-4 mb-6">Contact Our Experts</h1>
          <p className="text-navy-500 max-w-2xl mx-auto text-lg">
            Have questions about GCC medicals or KSA visas? Our dedicated team is here to help you every step of the way.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info Cards */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="border-navy-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-8 flex items-start gap-6">
                  <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg mb-1">Phone Number</h3>
                    <p className="text-sm text-navy-500 mb-2">{contact.phone}</p>
                    <p className="text-xs text-teal-600 font-bold">Call us 9AM - 7PM</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-navy-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-8 flex items-start gap-6">
                  <div className="w-12 h-12 bg-gold-50 text-gold-600 rounded-xl flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg mb-1">Email Address</h3>
                    <p className="text-sm text-navy-500 mb-2">{contact.email}</p>
                    <p className="text-xs text-teal-600 font-bold">Expect reply in 24h</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-navy-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-8 flex items-start gap-6">
                  <div className="w-12 h-12 bg-navy-50 text-navy-600 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg mb-1">Office Location</h3>
                    <p className="text-sm text-navy-500 mb-2">{contact.address}</p>
                    <p className="text-xs text-teal-600 font-bold">Visit our Dhaka HQ</p>
                  </div>
                </CardContent>
              </Card>

              <div className="p-8 bg-teal-600 rounded-3xl text-white">
                <div className="flex items-center gap-4 mb-6">
                  <MessageSquare className="w-8 h-8" />
                  <h3 className="text-xl font-heading font-bold">Live Support</h3>
                </div>
                <p className="text-teal-100 text-sm mb-6">Need immediate assistance? Our WhatsApp support is available for quick queries.</p>
                <Link href={`https://wa.me/${contact.whatsapp.replace('+', '')}`} target="_blank">
                  <Button className="w-full bg-white text-teal-600 hover:bg-teal-50 font-bold py-6 rounded-xl">
                    Chat on WhatsApp
                  </Button>
                </Link>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-navy-100">
                <h2 className="text-3xl font-heading font-black mb-8 text-navy-900">Send Us a Message</h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-navy-500 ml-1">Full Name</label>
                      <Input placeholder="John Doe" className="bg-navy-50 border-transparent h-14 px-6 rounded-xl focus:bg-white transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-navy-500 ml-1">Email Address</label>
                      <Input placeholder="john@example.com" type="email" className="bg-navy-50 border-transparent h-14 px-6 rounded-xl focus:bg-white transition-all" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-navy-500 ml-1">Phone Number</label>
                      <Input placeholder="+880 1XXX XXXXXX" className="bg-navy-50 border-transparent h-14 px-6 rounded-xl focus:bg-white transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-navy-500 ml-1">Subject</label>
                      <Input placeholder="How can we help?" className="bg-navy-50 border-transparent h-14 px-6 rounded-xl focus:bg-white transition-all" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-navy-500 ml-1">Your Message</label>
                    <Textarea placeholder="Describe your requirement in detail..." className="bg-navy-50 border-transparent min-h-[200px] p-6 rounded-xl focus:bg-white transition-all resize-none" />
                  </div>
                  <Button className="w-full bg-teal-600 hover:bg-teal-700 py-8 text-lg font-bold rounded-2xl shadow-xl shadow-teal-600/20">
                    Send Message
                    <Send className="ml-2 w-5 h-5" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[500px] w-full grayscale contrast-125 brightness-100 hover:grayscale-0 transition-all duration-1000">
        <iframe 
          src={contact.mapEmbedUrl} 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen={true} 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>

      <Footer />
    </main>
  );
}
