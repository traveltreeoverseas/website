'use client';

import { useState, useEffect } from 'react';
import { 
  Save, 
  Image as ImageIcon, 
  Layout, 
  Info, 
  Settings, 
  MessageSquare,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

export default function SiteContentManager() {
  const [content, setContent] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/site-content')
      .then(res => res.json())
      .then(data => {
        setContent(data);
        setIsLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/admin/site-content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });
      if (!res.ok) throw new Error('Failed to save');
      toast.success('Site content updated successfully!');
    } catch (err) {
      toast.error('Error saving content');
    } finally {
      setIsSaving(false);
    }
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
          <h1 className="text-3xl font-heading font-black text-navy-900">Site Content Manager</h1>
          <p className="text-navy-500 mt-1">Manage all text and images across your public website.</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving} className="bg-teal-600 hover:bg-teal-700 px-8 py-6 rounded-xl shadow-lg">
           {isSaving ? <Loader2 className="animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
           Save Changes
        </Button>
      </div>

      <Tabs defaultValue="hero" className="space-y-8">
        <TabsList className="bg-white p-1 rounded-2xl border border-navy-100 shadow-sm h-auto flex flex-wrap gap-1">
          <TabsTrigger value="hero" className="rounded-xl px-6 py-3 data-[state=active]:bg-teal-600 data-[state=active]:text-white">Hero Section</TabsTrigger>
          <TabsTrigger value="about" className="rounded-xl px-6 py-3 data-[state=active]:bg-teal-600 data-[state=active]:text-white">About Us</TabsTrigger>
          <TabsTrigger value="contact" className="rounded-xl px-6 py-3 data-[state=active]:bg-teal-600 data-[state=active]:text-white">Contact Info</TabsTrigger>
          <TabsTrigger value="footer" className="rounded-xl px-6 py-3 data-[state=active]:bg-teal-600 data-[state=active]:text-white">Footer</TabsTrigger>
        </TabsList>

        <TabsContent value="hero">
          <Card className="border-none shadow-xl rounded-[2.5rem] bg-white">
            <CardHeader>
               <CardTitle className="text-xl font-heading font-black">Hero Section Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                     <Label>Hero Title</Label>
                     <Input 
                        value={content.hero.title} 
                        onChange={(e) => setContent({...content, hero: {...content.hero, title: e.target.value}})}
                        className="h-12 bg-navy-50 border-none rounded-xl"
                     />
                  </div>
                  <div className="space-y-4">
                     <Label>Background Image URL</Label>
                     <div className="flex gap-2">
                        <Input 
                           value={content.hero.backgroundImage} 
                           onChange={(e) => setContent({...content, hero: {...content.hero, backgroundImage: e.target.value}})}
                           className="h-12 bg-navy-50 border-none rounded-xl flex-1"
                        />
                        <Button variant="outline" className="h-12 rounded-xl"><ImageIcon className="w-4 h-4" /></Button>
                     </div>
                  </div>
               </div>
               <div className="space-y-4">
                  <Label>Hero Subtitle</Label>
                  <Textarea 
                     value={content.hero.subtitle} 
                     onChange={(e) => setContent({...content, hero: {...content.hero, subtitle: e.target.value}})}
                     className="bg-navy-50 border-none rounded-xl min-h-[100px]"
                  />
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                     <Label>CTA Button Text</Label>
                     <Input 
                        value={content.hero.ctaText} 
                        onChange={(e) => setContent({...content, hero: {...content.hero, ctaText: e.target.value}})}
                        className="h-12 bg-navy-50 border-none rounded-xl"
                     />
                  </div>
                  <div className="space-y-4">
                     <Label>CTA Link</Label>
                     <Input 
                        value={content.hero.ctaLink} 
                        onChange={(e) => setContent({...content, hero: {...content.hero, ctaLink: e.target.value}})}
                        className="h-12 bg-navy-50 border-none rounded-xl"
                     />
                  </div>
               </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="about">
           <Card className="border-none shadow-xl rounded-[2.5rem] bg-white">
            <CardHeader>
               <CardTitle className="text-xl font-heading font-black">About Us Page Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                     <Label>About Title</Label>
                     <Input 
                        value={content.about.title} 
                        onChange={(e) => setContent({...content, about: {...content.about, title: e.target.value}})}
                        className="h-12 bg-navy-50 border-none rounded-xl"
                     />
                  </div>
                  <div className="space-y-4">
                     <Label>Featured Image URL</Label>
                     <Input 
                        value={content.about.image} 
                        onChange={(e) => setContent({...content, about: {...content.about, image: e.target.value}})}
                        className="h-12 bg-navy-50 border-none rounded-xl"
                     />
                  </div>
               </div>
               <div className="space-y-4">
                  <Label>About Description</Label>
                  <Textarea 
                     value={content.about.description} 
                     onChange={(e) => setContent({...content, about: {...content.about, description: e.target.value}})}
                     className="bg-navy-50 border-none rounded-xl min-h-[200px]"
                  />
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                     <Label>Our Mission</Label>
                     <Textarea 
                        value={content.about.mission} 
                        onChange={(e) => setContent({...content, about: {...content.about, mission: e.target.value}})}
                        className="bg-navy-50 border-none rounded-xl"
                     />
                  </div>
                  <div className="space-y-4">
                     <Label>Our Vision</Label>
                     <Textarea 
                        value={content.about.vision} 
                        onChange={(e) => setContent({...content, about: {...content.about, vision: e.target.value}})}
                        className="bg-navy-50 border-none rounded-xl"
                     />
                  </div>
               </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact">
           <Card className="border-none shadow-xl rounded-[2.5rem] bg-white">
            <CardHeader>
               <CardTitle className="text-xl font-heading font-black">Contact & Location Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                     <Label>Office Address</Label>
                     <Input 
                        value={content.contact.address} 
                        onChange={(e) => setContent({...content, contact: {...content.contact, address: e.target.value}})}
                        className="h-12 bg-navy-50 border-none rounded-xl"
                     />
                  </div>
                  <div className="space-y-4">
                     <Label>Phone Number</Label>
                     <Input 
                        value={content.contact.phone} 
                        onChange={(e) => setContent({...content, contact: {...content.contact, phone: e.target.value}})}
                        className="h-12 bg-navy-50 border-none rounded-xl"
                     />
                  </div>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                     <Label>Email Address</Label>
                     <Input 
                        value={content.contact.email} 
                        onChange={(e) => setContent({...content, contact: {...content.contact, email: e.target.value}})}
                        className="h-12 bg-navy-50 border-none rounded-xl"
                     />
                  </div>
                  <div className="space-y-4">
                     <Label>WhatsApp Number</Label>
                     <Input 
                        value={content.contact.whatsapp} 
                        onChange={(e) => setContent({...content, contact: {...content.contact, whatsapp: e.target.value}})}
                        className="h-12 bg-navy-50 border-none rounded-xl"
                     />
                  </div>
               </div>
               <div className="space-y-4">
                  <Label>Google Maps Embed URL</Label>
                  <Input 
                     value={content.contact.mapEmbedUrl} 
                     onChange={(e) => setContent({...content, contact: {...content.contact, mapEmbedUrl: e.target.value}})}
                     className="h-12 bg-navy-50 border-none rounded-xl"
                  />
               </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="footer">
           <Card className="border-none shadow-xl rounded-[2.5rem] bg-white">
            <CardHeader>
               <CardTitle className="text-xl font-heading font-black">Footer Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
               <div className="space-y-4">
                  <Label>Footer Description</Label>
                  <Textarea 
                     value={content.footer.description} 
                     onChange={(e) => setContent({...content, footer: {...content.footer, description: e.target.value}})}
                     className="bg-navy-50 border-none rounded-xl"
                  />
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                     <Label>Facebook Page</Label>
                     <Input 
                        value={content.footer.socialLinks.facebook} 
                        onChange={(e) => setContent({...content, footer: {...content.footer, socialLinks: {...content.footer.socialLinks, facebook: e.target.value}}})}
                        className="h-12 bg-navy-50 border-none rounded-xl"
                     />
                  </div>
                  <div className="space-y-4">
                     <Label>Instagram Handle</Label>
                     <Input 
                        value={content.footer.socialLinks.instagram} 
                        onChange={(e) => setContent({...content, footer: {...content.footer, socialLinks: {...content.footer.socialLinks, instagram: e.target.value}}})}
                        className="h-12 bg-navy-50 border-none rounded-xl"
                     />
                  </div>
               </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
