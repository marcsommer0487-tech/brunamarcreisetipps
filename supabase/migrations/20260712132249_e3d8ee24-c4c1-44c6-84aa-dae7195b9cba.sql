CREATE TABLE public.rsvp_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  guests INTEGER NOT NULL,
  arrival DATE,
  dietary TEXT,
  dietary_note TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT INSERT ON public.rsvp_submissions TO anon;
GRANT SELECT ON public.rsvp_submissions TO authenticated;
GRANT ALL ON public.rsvp_submissions TO service_role;

ALTER TABLE public.rsvp_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit an RSVP"
  ON public.rsvp_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view RSVPs"
  ON public.rsvp_submissions
  FOR SELECT
  TO authenticated
  USING (true);