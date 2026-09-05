CREATE TABLE public.project_documents (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text,
  doc_date date NOT NULL,
  category text NOT NULL DEFAULT 'radionica',
  file_url text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT SELECT ON public.project_documents TO anon, authenticated;
GRANT ALL ON public.project_documents TO service_role;

ALTER TABLE public.project_documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read project documents" ON public.project_documents FOR SELECT USING (true);
CREATE POLICY "Deny anon+auth insert on project_documents" ON public.project_documents AS RESTRICTIVE FOR INSERT TO anon, authenticated WITH CHECK (false);
CREATE POLICY "Deny anon+auth update on project_documents" ON public.project_documents AS RESTRICTIVE FOR UPDATE TO anon, authenticated USING (false) WITH CHECK (false);
CREATE POLICY "Deny anon+auth delete on project_documents" ON public.project_documents AS RESTRICTIVE FOR DELETE TO anon, authenticated USING (false);

CREATE TRIGGER project_documents_set_updated_at BEFORE UPDATE ON public.project_documents FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();