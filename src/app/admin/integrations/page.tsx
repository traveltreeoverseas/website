'use client';

import { useState, useEffect } from 'react';
import { 
  Code, 
  CheckCircle2, 
  XCircle, 
  Loader2, 
  Save, 
  Info,
  ShieldCheck,
  Zap,
  Globe,
  Plus,
  MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

export default function IntegrationManager() {
  const [integrations, setIntegrations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // In a real app, fetch from API
    // For now, we simulate fetching from db-local defaults
    setTimeout(() => {
      setIntegrations([
        { id: 'int_gtm', name: 'Google Tag Manager', type: 'gtm', isActive: true, config: { containerId: 'GTM-XXXXXXX' } },
        { id: 'int_fbpixel', name: 'Facebook Pixel', type: 'facebook_pixel', isActive: false, config: { pixelId: '123456789' } },
        { id: 'int_ga', name: 'Google Analytics', type: 'google_analytics', isActive: true, config: { measurementId: 'G-XXXXXXX' } },
        { id: 'int_whatsapp', name: 'WhatsApp Button', type: 'whatsapp', isActive: true, config: { phoneNumber: '+8801700000000', message: 'Hello!' } },
        { id: 'int_custom', name: 'Custom Scripts', type: 'custom_script', isActive: false, config: { headScript: '', bodyScript: '' } },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleToggle = (id: string) => {
    setIntegrations(integrations.map(i => i.id === id ? { ...i, isActive: !i.isActive } : i));
  };

  const handleConfigChange = (id: string, key: string, value: string) => {
    setIntegrations(integrations.map(i => i.id === id ? { ...i, config: { ...i.config, [key]: value } } : i));
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success('Integrations updated successfully!');
    }, 1500);
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
          <h1 className="text-3xl font-heading font-black text-navy-900">Integrations</h1>
          <p className="text-navy-500 mt-1">Connect third-party tools like GTM, Facebook Pixel, and more.</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving} className="bg-teal-600 hover:bg-teal-700 px-8 py-6 rounded-xl shadow-lg">
           {isSaving ? <Loader2 className="animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
           Save Integrations
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {integrations.map((integration) => (
          <Card key={integration.id} className="border-none shadow-xl rounded-[2.5rem] bg-white overflow-hidden group">
             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6 border-b border-navy-50">
                <div className="flex items-center gap-4">
                   <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                      integration.isActive ? "bg-teal-100 text-teal-600" : "bg-navy-50 text-navy-300"
                   )}>
                      {integration.type === 'gtm' && <Zap className="w-6 h-6" />}
                      {integration.type === 'facebook_pixel' && <ShieldCheck className="w-6 h-6" />}
                      {integration.type === 'google_analytics' && <Globe className="w-6 h-6" />}
                      {integration.type === 'whatsapp' && <MessageSquare className="w-6 h-6" />}
                      {integration.type === 'custom_script' && <Code className="w-6 h-6" />}
                   </div>
                   <div>
                      <CardTitle className="text-lg font-heading font-bold">{integration.name}</CardTitle>
                      <CardDescription className="text-[10px] uppercase font-bold tracking-widest text-navy-400">
                         {integration.isActive ? 'Active' : 'Disabled'}
                      </CardDescription>
                   </div>
                </div>
                <Switch 
                   checked={integration.isActive} 
                   onCheckedChange={() => handleToggle(integration.id)}
                   className="data-[state=checked]:bg-teal-600"
                />
             </CardHeader>
             <CardContent className={cn("p-8 space-y-6 transition-opacity", !integration.isActive && "opacity-50 pointer-events-none")}>
                {integration.type === 'gtm' && (
                   <div className="space-y-4">
                      <Label>Container ID</Label>
                      <Input 
                         value={integration.config.containerId} 
                         onChange={(e) => handleConfigChange(integration.id, 'containerId', e.target.value)}
                         placeholder="GTM-XXXXXXX"
                         className="h-12 bg-navy-50 border-none rounded-xl"
                      />
                   </div>
                )}
                
                {integration.type === 'facebook_pixel' && (
                   <div className="space-y-4">
                      <Label>Pixel ID</Label>
                      <Input 
                         value={integration.config.pixelId} 
                         onChange={(e) => handleConfigChange(integration.id, 'pixelId', e.target.value)}
                         placeholder="1234567890"
                         className="h-12 bg-navy-50 border-none rounded-xl"
                      />
                   </div>
                )}

                {integration.type === 'google_analytics' && (
                   <div className="space-y-4">
                      <Label>Measurement ID</Label>
                      <Input 
                         value={integration.config.measurementId} 
                         onChange={(e) => handleConfigChange(integration.id, 'measurementId', e.target.value)}
                         placeholder="G-XXXXXXX"
                         className="h-12 bg-navy-50 border-none rounded-xl"
                      />
                   </div>
                )}

                {integration.type === 'whatsapp' && (
                   <div className="space-y-4">
                      <div className="space-y-2">
                         <Label>WhatsApp Number</Label>
                         <Input 
                            value={integration.config.phoneNumber} 
                            onChange={(e) => handleConfigChange(integration.id, 'phoneNumber', e.target.value)}
                            className="h-12 bg-navy-50 border-none rounded-xl"
                         />
                      </div>
                      <div className="space-y-2">
                         <Label>Default Message</Label>
                         <Input 
                            value={integration.config.message} 
                            onChange={(e) => handleConfigChange(integration.id, 'message', e.target.value)}
                            className="h-12 bg-navy-50 border-none rounded-xl"
                         />
                      </div>
                   </div>
                )}

                {integration.type === 'custom_script' && (
                   <div className="space-y-4">
                      <div className="space-y-2">
                         <Label>Head Script</Label>
                         <Textarea 
                            value={integration.config.headScript} 
                            onChange={(e) => handleConfigChange(integration.id, 'headScript', e.target.value)}
                            placeholder="<script>...</script>"
                            className="bg-navy-50 border-none rounded-xl h-24 font-mono text-xs"
                         />
                      </div>
                      <div className="space-y-2">
                         <Label>Body Script</Label>
                         <Textarea 
                            value={integration.config.bodyScript} 
                            onChange={(e) => handleConfigChange(integration.id, 'bodyScript', e.target.value)}
                            placeholder="<script>...</script>"
                            className="bg-navy-50 border-none rounded-xl h-24 font-mono text-xs"
                         />
                      </div>
                   </div>
                )}

                {!integration.isActive && (
                   <div className="p-4 bg-navy-50 rounded-2xl flex items-center gap-3 text-navy-400">
                      <Info className="w-4 h-4" />
                      <p className="text-xs">This integration is currently disabled and won't be loaded on the site.</p>
                   </div>
                )}
             </CardContent>
          </Card>
        ))}

        <Button variant="outline" className="border-2 border-dashed border-navy-200 h-full min-h-[300px] rounded-[2.5rem] flex flex-col gap-4 text-navy-400 hover:text-teal-600 hover:border-teal-400 transition-all bg-transparent">
           <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-sm">
              <Plus className="w-8 h-8" />
           </div>
           <span className="font-bold">Add Custom Integration</span>
        </Button>
      </div>
    </div>
  );
}

function cn(...inputs: any) {
  return inputs.filter(Boolean).join(' ');
}
