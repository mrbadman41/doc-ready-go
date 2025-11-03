import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Calendar, Clock } from "lucide-react";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";

const formSchema = z.object({
  hospitalId: z.string().min(1, "Please select a hospital"),
  doctorId: z.string().min(1, "Please select a doctor"),
  date: z.date({
    required_error: "Please select a date",
  }),
  time: z.string().min(1, "Please select a time"),
  reason: z.string().min(10, "Please provide a reason (minimum 10 characters)"),
});

interface BookAppointmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  preSelectedHospital?: string;
  preSelectedDoctor?: string;
}

const timeSlots = [
  "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM",
  "04:00 PM", "05:00 PM",
];

export const BookAppointmentModal = ({ open, onOpenChange, preSelectedHospital, preSelectedDoctor }: BookAppointmentModalProps) => {
  const { user } = useAuth();
  const [selectedHospital, setSelectedHospital] = useState<string>(preSelectedHospital || "");
  const [hospitals, setHospitals] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hospitalId: preSelectedHospital || "",
      doctorId: preSelectedDoctor || "",
      time: "",
      reason: "",
    },
  });

  useEffect(() => {
    const fetchHospitals = async () => {
      const { data } = await supabase.from('hospitals').select('*');
      setHospitals(data || []);
    };
    fetchHospitals();
  }, []);

  useEffect(() => {
    const fetchDoctors = async () => {
      if (!selectedHospital) return;
      const { data } = await supabase
        .from('doctors')
        .select('*, profiles!doctors_user_id_fkey(name)')
        .eq('hospital_id', selectedHospital);
      setDoctors(data || []);
    };
    fetchDoctors();
  }, [selectedHospital]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!user?.id) {
      toast.error("You must be logged in to book an appointment");
      return;
    }

    setLoading(true);
    
    const { error } = await supabase.from('appointments').insert({
      patient_id: user.id,
      doctor_id: values.doctorId,
      hospital_id: values.hospitalId,
      appointment_date: format(values.date, "yyyy-MM-dd"),
      appointment_time: values.time,
      notes: values.reason,
      status: 'scheduled'
    });

    setLoading(false);

    if (error) {
      toast.error("Failed to book appointment", {
        description: error.message
      });
      return;
    }
    
    toast.success("Appointment Booked!", {
      description: `Your appointment has been scheduled for ${format(values.date, "PPP")} at ${values.time}.`,
    });
    
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Book an Appointment</DialogTitle>
          <DialogDescription>
            Fill in the details below to schedule your appointment
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
            <FormField
              control={form.control}
              name="hospitalId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hospital</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setSelectedHospital(value);
                      form.setValue("doctorId", "");
                    }}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a hospital" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {hospitals.map((hospital) => (
                        <SelectItem key={hospital.id} value={hospital.id}>
                          {hospital.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="doctorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Doctor</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={!selectedHospital}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a doctor" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {doctors.map((doctor) => (
                        <SelectItem key={doctor.id} value={doctor.id}>
                          Dr. {doctor.profiles?.name || 'Unknown'} - {doctor.specialty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Appointment Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <Calendar className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time Slot</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a time" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            {time}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reason for Visit</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your symptoms or reason for appointment..."
                      className="resize-none"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="flex-1"
                disabled={loading}
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1" disabled={loading}>
                {loading ? 'Booking...' : 'Book Appointment'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
