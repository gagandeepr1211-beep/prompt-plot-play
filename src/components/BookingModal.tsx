import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, addDays, isSameDay, isAfter, isBefore } from 'date-fns';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CalendarIcon, Clock, MapPin, CheckCircle, User, Phone, Mail } from 'lucide-react';
import { Property } from '@/data/properties';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: Property;
}

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
  isBooked?: boolean;
}

interface BookingStep {
  step: number;
  title: string;
  completed: boolean;
}

export const BookingModal = ({ isOpen, onClose, property }: BookingModalProps) => {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });

  const steps: BookingStep[] = [
    { step: 1, title: 'Select Date', completed: !!selectedDate },
    { step: 2, title: 'Choose Time', completed: !!selectedTimeSlot },
    { step: 3, title: 'Personal Details', completed: !!(formData.name && formData.email && formData.phone) },
    { step: 4, title: 'Confirmation', completed: bookingConfirmed }
  ];

  // Generate time slots for the selected date
  const timeSlots: TimeSlot[] = [
    { id: '1', time: '09:00 AM', available: true },
    { id: '2', time: '10:00 AM', available: false, isBooked: true },
    { id: '3', time: '11:00 AM', available: true },
    { id: '4', time: '12:00 PM', available: true },
    { id: '5', time: '02:00 PM', available: true },
    { id: '6', time: '03:00 PM', available: false, isBooked: true },
    { id: '7', time: '04:00 PM', available: true },
    { id: '8', time: '05:00 PM', available: true },
  ];

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedTimeSlot('');
    if (date) {
      setCurrentStep(2);
    }
  };

  const handleTimeSlotSelect = (slotId: string) => {
    setSelectedTimeSlot(slotId);
    setCurrentStep(3);
  };

  const handleFormSubmit = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    setCurrentStep(4);
  };

  const handleBookingConfirm = () => {
    setBookingConfirmed(true);
    
    toast({
      title: "Booking Confirmed! 🎉",
      description: `Your registration slot for ${format(selectedDate!, 'PPP')} has been booked successfully.`,
    });

    // Auto-close modal after success animation
    setTimeout(() => {
      onClose();
      // Reset state
      setSelectedDate(undefined);
      setSelectedTimeSlot('');
      setCurrentStep(1);
      setBookingConfirmed(false);
      setFormData({ name: '', email: '', phone: '', notes: '' });
    }, 3000);
  };

  const getStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">Select Registration Date</h3>
              <p className="text-muted-foreground text-sm">
                Choose your preferred date for property registration
              </p>
            </div>
            
            <div className="flex justify-center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                disabled={(date) => 
                  isBefore(date, new Date()) || 
                  isAfter(date, addDays(new Date(), 30))
                }
                initialFocus
                className={cn("rounded-md border border-border pointer-events-auto")}
              />
            </div>
            
            <div className="text-center text-sm text-muted-foreground">
              Available dates: Next 30 days • Weekend slots limited
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">Choose Time Slot</h3>
              <p className="text-muted-foreground text-sm">
                Available slots for {selectedDate && format(selectedDate, 'PPP')}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {timeSlots.map((slot) => (
                <motion.div
                  key={slot.id}
                  whileHover={{ scale: slot.available ? 1.02 : 1 }}
                  whileTap={{ scale: slot.available ? 0.98 : 1 }}
                >
                  <Button
                    variant={selectedTimeSlot === slot.id ? "default" : "outline"}
                    className={cn(
                      "w-full h-12 flex items-center justify-center",
                      !slot.available && "opacity-50 cursor-not-allowed",
                      selectedTimeSlot === slot.id && "bg-primary text-primary-foreground"
                    )}
                    disabled={!slot.available}
                    onClick={() => slot.available && handleTimeSlotSelect(slot.id)}
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{slot.time}</span>
                    {slot.isBooked && (
                      <Badge variant="secondary" className="ml-2 text-xs">Booked</Badge>
                    )}
                  </Button>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center justify-between mt-4">
              <Button variant="outline" onClick={() => setCurrentStep(1)}>
                ← Back
              </Button>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">Personal Details</h3>
              <p className="text-muted-foreground text-sm">
                We'll use this information for the registration process
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter your full name"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="+91 XXXXX XXXXX"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="your.email@example.com"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Special Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Any specific requirements or questions..."
                  rows={3}
                />
              </div>
            </div>

            <div className="flex items-center justify-between mt-6">
              <Button variant="outline" onClick={() => setCurrentStep(2)}>
                ← Back
              </Button>
              <Button onClick={handleFormSubmit}>
                Continue
              </Button>
            </div>
          </motion.div>
        );

      case 4:
        const selectedSlot = timeSlots.find(slot => slot.id === selectedTimeSlot);
        
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {!bookingConfirmed ? (
              <>
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Confirm Booking</h3>
                  <p className="text-muted-foreground text-sm">
                    Please review your booking details before confirming
                  </p>
                </div>

                <Card className="border border-border">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h4 className="font-medium text-foreground">Property</h4>
                        <p className="text-sm text-muted-foreground">{property.title}</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3 mr-1" />
                          {property.location}
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-border pt-4 grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-foreground flex items-center">
                          <CalendarIcon className="h-4 w-4 mr-2" />
                          Date
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {selectedDate && format(selectedDate, 'PPPP')}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          Time
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {selectedSlot?.time}
                        </p>
                      </div>
                    </div>

                    <div className="border-t border-border pt-4">
                      <h4 className="font-medium text-foreground mb-2">Contact Details</h4>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>{formData.name}</p>
                        <p>{formData.email}</p>
                        <p>{formData.phone}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex items-center justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(3)}>
                    ← Back
                  </Button>
                  <Button onClick={handleBookingConfirm} className="bg-primary hover:bg-primary-light">
                    Confirm Booking
                  </Button>
                </div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-6"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
                  className="mx-auto w-16 h-16 bg-success rounded-full flex items-center justify-center"
                >
                  <CheckCircle className="h-8 w-8 text-success-foreground" />
                </motion.div>
                
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Booking Confirmed!</h3>
                  <p className="text-muted-foreground">
                    Your registration slot has been successfully booked.
                  </p>
                </div>

                <Card className="border border-success bg-success/10">
                  <CardContent className="p-4">
                    <div className="text-sm space-y-2">
                      <div className="font-medium text-foreground">Booking Reference: #LV{Date.now().toString().slice(-6)}</div>
                      <div className="text-muted-foreground">
                        Confirmation details sent to {formData.email}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="text-sm text-muted-foreground">
                  You'll receive a reminder 24 hours before your appointment.
                </div>
              </motion.div>
            )}
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-background border-border">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <DialogHeader className="text-center mb-6">
                <DialogTitle className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
                  <CalendarIcon className="h-6 w-6 text-primary" />
                  Book Registration Slot
                </DialogTitle>
              </DialogHeader>

              {/* Progress Steps */}
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  {steps.map((step, index) => (
                    <div key={step.step} className="flex items-center">
                      <motion.div
                        className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                          currentStep >= step.step 
                            ? "bg-primary text-primary-foreground" 
                            : "bg-muted text-muted-foreground"
                        )}
                        whileHover={{ scale: 1.05 }}
                      >
                        {step.completed ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          step.step
                        )}
                      </motion.div>
                      {index < steps.length - 1 && (
                        <div className={cn(
                          "w-12 h-0.5 mx-2",
                          currentStep > step.step ? "bg-primary" : "bg-muted"
                        )} />
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-2">
                  {steps.map((step) => (
                    <div key={step.step} className="text-xs text-muted-foreground text-center">
                      {step.title}
                    </div>
                  ))}
                </div>
              </div>

              {/* Step Content */}
              <AnimatePresence mode="wait">
                {getStepContent()}
              </AnimatePresence>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};