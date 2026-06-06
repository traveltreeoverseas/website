'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Stethoscope, 
  Globe, 
  Calendar, 
  CreditCard, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  ArrowLeft,
  Loader2,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

const steps = [
  { id: 1, title: 'Medical Details', icon: Stethoscope },
  { id: 2, title: 'Payment Info', icon: CreditCard },
  { id: 3, title: 'Confirmation', icon: CheckCircle2 },
];

const countries = ['Saudi Arabia', 'UAE', 'Qatar', 'Oman', 'Kuwait', 'Bahrain'];
const medicalCenters = [
  'Dhaka - Gamca Authorized Centers',
  'Chittagong - Gamca Authorized Centers',
  'Sylhet - Gamca Authorized Centers',
];

export default function MedicalBookingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    country: '',
    medicalCenter: '',
    preferredDate: '',
    passportNumber: '',
    nationality: 'Bangladeshi',
  });

  const handleNext = () => {
    if (currentStep === 1) {
       if (!formData.country || !formData.medicalCenter || !formData.preferredDate || !formData.passportNumber) {
          toast.error('Please fill all required fields');
          return;
       }
    }
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => setCurrentStep(currentStep - 1);

  const handleSubmit = async () => {
    setIsLoading(true);
    // In a real app, this would hit an API and save to DB
    // For now, we simulate success
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Booking request submitted!');
      router.push('/client/medical-status');
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl font-heading font-black text-navy-900">GCC Medical Booking</h1>
        <p className="text-navy-500 mt-2">Follow the steps below to book your medical appointment.</p>
      </div>

      {/* Stepper */}
      <div className="flex items-center justify-between mb-12 relative">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-navy-100 -z-10 -translate-y-1/2" />
        {steps.map((step) => {
          const Icon = step.icon;
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;
          
          return (
            <div key={step.id} className="flex flex-col items-center gap-3 bg-navy-50 px-4">
              <div className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500",
                isActive ? "bg-teal-600 text-white shadow-xl shadow-teal-600/30 scale-110" : 
                isCompleted ? "bg-teal-100 text-teal-600" : "bg-white text-navy-300 border border-navy-100"
              )}>
                {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : <Icon className="w-5 h-5" />}
              </div>
              <span className={cn(
                "text-[10px] font-bold uppercase tracking-widest",
                isActive ? "text-teal-600" : "text-navy-400"
              )}>{step.title}</span>
            </div>
          );
        })}
      </div>

      {/* Step Content */}
      <Card className="border-none shadow-2xl rounded-[2.5rem] bg-white overflow-hidden">
        <CardContent className="p-8 md:p-12">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <Label>Destination Country</Label>
                    <Select onValueChange={(val) => setFormData({...formData, country: val as string})}>
                      <SelectTrigger className="h-14 rounded-2xl bg-navy-50 border-none px-6">
                        <SelectValue placeholder="Select Country" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Medical Center Location</Label>
                    <Select onValueChange={(val) => setFormData({...formData, medicalCenter: val as string})}>
                      <SelectTrigger className="h-14 rounded-2xl bg-navy-50 border-none px-6">
                        <SelectValue placeholder="Select Location" />
                      </SelectTrigger>
                      <SelectContent>
                        {medicalCenters.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <Label>Preferred Date</Label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-400" />
                      <Input 
                        type="date" 
                        className="h-14 pl-12 pr-6 rounded-2xl bg-navy-50 border-none"
                        onChange={(e) => setFormData({...formData, preferredDate: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Passport Number</Label>
                    <Input 
                      placeholder="A01234567" 
                      className="h-14 px-6 rounded-2xl bg-navy-50 border-none"
                      onChange={(e) => setFormData({...formData, passportNumber: e.target.value})}
                    />
                  </div>
                </div>

                <div className="p-6 bg-teal-50 rounded-3xl flex gap-4 items-start border border-teal-100">
                   <Info className="w-6 h-6 text-teal-600 shrink-0 mt-1" />
                   <div className="text-sm text-navy-700 leading-relaxed">
                      <p className="font-bold text-teal-600 mb-1">Important Note</p>
                      According to the rules of Travel Tree Overseas, you must pay the processing fee first. Once your payment is verified by our admin, we will book your medical serial through our official GCC account.
                   </div>
                </div>

                <Button onClick={handleNext} className="w-full bg-teal-600 hover:bg-teal-700 py-8 text-lg font-bold rounded-2xl shadow-xl shadow-teal-600/20">
                   Continue to Payment
                   <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="text-center space-y-2">
                   <h3 className="text-xl font-heading font-black text-navy-900">Processing Fee: ৳5,500</h3>
                   <p className="text-sm text-navy-500">Please send the amount to one of our official accounts.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className="p-6 border-2 border-navy-100 rounded-3xl flex items-center gap-4 hover:border-teal-600 transition-colors cursor-pointer group">
                      <div className="w-12 h-12 bg-pink-50 rounded-2xl flex items-center justify-center font-bold text-pink-600 group-hover:bg-teal-50 group-hover:text-teal-600 transition-colors">b</div>
                      <div>
                         <p className="font-bold text-navy-900">bKash Personal</p>
                         <p className="text-sm text-navy-500">01700-000000</p>
                      </div>
                   </div>
                   <div className="p-6 border-2 border-navy-100 rounded-3xl flex items-center gap-4 hover:border-teal-600 transition-colors cursor-pointer group">
                      <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center font-bold text-orange-600 group-hover:bg-teal-50 group-hover:text-teal-600 transition-colors">n</div>
                      <div>
                         <p className="font-bold text-navy-900">Nagad Personal</p>
                         <p className="text-sm text-navy-500">01700-000000</p>
                      </div>
                   </div>
                </div>

                <div className="space-y-4">
                   <Label>Transaction ID / Reference</Label>
                   <Input placeholder="Enter Txn ID after payment" className="h-14 px-6 rounded-2xl bg-navy-50 border-none" />
                </div>

                <div className="space-y-4">
                   <Label>Upload Payment Screenshot</Label>
                   <div className="border-2 border-dashed border-navy-200 rounded-3xl p-12 text-center hover:border-teal-400 transition-colors cursor-pointer bg-navy-50/50">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                         <CreditCard className="w-8 h-8 text-navy-300" />
                      </div>
                      <p className="text-sm font-bold text-navy-900 mb-1">Click to upload or drag & drop</p>
                      <p className="text-xs text-navy-500">JPG, PNG or PDF (Max 5MB)</p>
                   </div>
                </div>

                <div className="flex gap-4">
                   <Button variant="ghost" onClick={handleBack} className="flex-1 py-8 text-lg font-bold rounded-2xl">
                      <ArrowLeft className="mr-2 w-5 h-5" />
                      Back
                   </Button>
                   <Button onClick={handleNext} className="flex-[2] bg-teal-600 hover:bg-teal-700 py-8 text-lg font-bold rounded-2xl shadow-xl shadow-teal-600/20">
                      Confirm & Submit
                      <CheckCircle2 className="ml-2 w-5 h-5" />
                   </Button>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-8 py-12"
              >
                <div className="w-24 h-24 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                   <CheckCircle2 className="w-12 h-12" />
                </div>
                <div>
                   <h3 className="text-3xl font-heading font-black text-navy-900 mb-4">Request Submitted!</h3>
                   <p className="text-navy-500 max-w-sm mx-auto leading-relaxed">
                      We've received your booking request and payment info. Our admin will verify the payment within 1-2 working hours and process your medical serial.
                   </p>
                </div>
                <div className="pt-8">
                   <Button onClick={handleSubmit} disabled={isLoading} className="bg-navy-900 hover:bg-navy-800 text-white px-12 py-8 text-lg font-bold rounded-2xl shadow-2xl">
                      {isLoading ? <Loader2 className="animate-spin" /> : 'Go to My Status'}
                   </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
}

function cn(...inputs: any) {
  return inputs.filter(Boolean).join(' ');
}
