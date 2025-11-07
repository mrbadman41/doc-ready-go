-- Add new columns to doctors table
ALTER TABLE public.doctors
ADD COLUMN IF NOT EXISTS phone text,
ADD COLUMN IF NOT EXISTS license_number text,
ADD COLUMN IF NOT EXISTS qualifications text,
ADD COLUMN IF NOT EXISTS languages_spoken text;

-- Make consultation_fee nullable (it already is, but ensuring it)
ALTER TABLE public.doctors
ALTER COLUMN consultation_fee DROP NOT NULL;