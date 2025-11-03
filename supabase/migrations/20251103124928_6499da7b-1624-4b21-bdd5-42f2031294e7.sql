-- Create hospitals table
CREATE TABLE public.hospitals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  phone TEXT,
  beds INTEGER DEFAULT 0,
  emergency_services BOOLEAN DEFAULT false,
  rating DECIMAL(3,2) DEFAULT 0.00,
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create doctors table
CREATE TABLE public.doctors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL UNIQUE,
  hospital_id UUID REFERENCES public.hospitals(id) ON DELETE SET NULL,
  specialty TEXT NOT NULL,
  experience INTEGER DEFAULT 0,
  rating DECIMAL(3,2) DEFAULT 0.00,
  consultation_fee DECIMAL(10,2),
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create appointments table
CREATE TABLE public.appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  doctor_id UUID REFERENCES public.doctors(id) ON DELETE CASCADE NOT NULL,
  hospital_id UUID REFERENCES public.hospitals(id) ON DELETE SET NULL,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled', 'no-show')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create doctor schedules table
CREATE TABLE public.doctor_schedules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id UUID REFERENCES public.doctors(id) ON DELETE CASCADE NOT NULL,
  day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(doctor_id, day_of_week, start_time)
);

-- Create medical records table
CREATE TABLE public.medical_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  doctor_id UUID REFERENCES public.doctors(id) ON DELETE SET NULL,
  appointment_id UUID REFERENCES public.appointments(id) ON DELETE SET NULL,
  diagnosis TEXT,
  prescription TEXT,
  notes TEXT,
  record_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.hospitals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.doctor_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medical_records ENABLE ROW LEVEL SECURITY;

-- Hospitals policies (public read access)
CREATE POLICY "Anyone can view hospitals"
  ON public.hospitals FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage hospitals"
  ON public.hospitals FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Doctors policies
CREATE POLICY "Anyone can view doctors"
  ON public.doctors FOR SELECT
  USING (true);

CREATE POLICY "Doctors can update their own profile"
  ON public.doctors FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage doctors"
  ON public.doctors FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Appointments policies
CREATE POLICY "Patients can view their own appointments"
  ON public.appointments FOR SELECT
  USING (auth.uid() = patient_id);

CREATE POLICY "Doctors can view their appointments"
  ON public.appointments FOR SELECT
  USING (auth.uid() IN (SELECT user_id FROM public.doctors WHERE id = doctor_id));

CREATE POLICY "Patients can create appointments"
  ON public.appointments FOR INSERT
  WITH CHECK (auth.uid() = patient_id);

CREATE POLICY "Patients can cancel their appointments"
  ON public.appointments FOR UPDATE
  USING (auth.uid() = patient_id);

CREATE POLICY "Doctors can update their appointments"
  ON public.appointments FOR UPDATE
  USING (auth.uid() IN (SELECT user_id FROM public.doctors WHERE id = doctor_id));

CREATE POLICY "Admins can manage all appointments"
  ON public.appointments FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Doctor schedules policies
CREATE POLICY "Anyone can view doctor schedules"
  ON public.doctor_schedules FOR SELECT
  USING (true);

CREATE POLICY "Doctors can manage their own schedules"
  ON public.doctor_schedules FOR ALL
  USING (auth.uid() IN (SELECT user_id FROM public.doctors WHERE id = doctor_id));

CREATE POLICY "Admins can manage all schedules"
  ON public.doctor_schedules FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Medical records policies
CREATE POLICY "Patients can view their own records"
  ON public.medical_records FOR SELECT
  USING (auth.uid() = patient_id);

CREATE POLICY "Doctors can view records for their patients"
  ON public.medical_records FOR SELECT
  USING (auth.uid() IN (SELECT user_id FROM public.doctors WHERE id = doctor_id));

CREATE POLICY "Doctors can create records"
  ON public.medical_records FOR INSERT
  WITH CHECK (auth.uid() IN (SELECT user_id FROM public.doctors WHERE id = doctor_id));

CREATE POLICY "Doctors can update their records"
  ON public.medical_records FOR UPDATE
  USING (auth.uid() IN (SELECT user_id FROM public.doctors WHERE id = doctor_id));

CREATE POLICY "Admins can manage all records"
  ON public.medical_records FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Create indexes for better performance
CREATE INDEX idx_doctors_hospital ON public.doctors(hospital_id);
CREATE INDEX idx_doctors_user ON public.doctors(user_id);
CREATE INDEX idx_appointments_patient ON public.appointments(patient_id);
CREATE INDEX idx_appointments_doctor ON public.appointments(doctor_id);
CREATE INDEX idx_appointments_date ON public.appointments(appointment_date);
CREATE INDEX idx_medical_records_patient ON public.medical_records(patient_id);
CREATE INDEX idx_medical_records_doctor ON public.medical_records(doctor_id);

-- Add triggers for updated_at
CREATE TRIGGER update_hospitals_updated_at
  BEFORE UPDATE ON public.hospitals
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_doctors_updated_at
  BEFORE UPDATE ON public.doctors
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_appointments_updated_at
  BEFORE UPDATE ON public.appointments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_medical_records_updated_at
  BEFORE UPDATE ON public.medical_records
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();