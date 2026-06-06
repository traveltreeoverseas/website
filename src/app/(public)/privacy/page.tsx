import { getSiteContent } from '@/lib/db-local';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';

export default function PrivacyPage() {
  const content = getSiteContent();

  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="pt-32 pb-24 md:pt-48 md:pb-32 bg-navy-50">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <div className="bg-white p-8 md:p-16 rounded-[2.5rem] shadow-xl border border-navy-100">
            <h1 className="text-3xl md:text-5xl font-heading font-black mb-12 text-navy-900 border-b pb-8">Privacy Policy</h1>
            <div className="prose prose-navy max-w-none prose-headings:font-heading prose-headings:font-bold prose-p:text-navy-600 prose-p:leading-relaxed whitespace-pre-wrap text-navy-700">
              {content.privacy}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
