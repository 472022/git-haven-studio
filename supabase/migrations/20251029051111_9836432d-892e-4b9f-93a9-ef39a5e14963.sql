-- Create table for storing file contents
CREATE TABLE public.file_contents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  repository TEXT NOT NULL,
  file_path TEXT NOT NULL,
  content TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(repository, file_path)
);

-- Enable Row Level Security
ALTER TABLE public.file_contents ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read files (public repository simulation)
CREATE POLICY "Anyone can view file contents" 
ON public.file_contents 
FOR SELECT 
USING (true);

-- Create policy to allow anyone to insert/update files (simulating authenticated push)
CREATE POLICY "Anyone can push file contents" 
ON public.file_contents 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update file contents" 
ON public.file_contents 
FOR UPDATE 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_file_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_file_contents_updated_at
BEFORE UPDATE ON public.file_contents
FOR EACH ROW
EXECUTE FUNCTION public.update_file_updated_at();