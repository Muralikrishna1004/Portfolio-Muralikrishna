-- Visitor tracking table
CREATE TABLE visitors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  visit_count INTEGER DEFAULT 1,
  first_visit TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_visit TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ip_hash TEXT,
  user_agent TEXT
);

-- Contact form submissions
CREATE TABLE contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_read BOOLEAN DEFAULT FALSE
);

-- Enable RLS
ALTER TABLE visitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Policies for visitors (public can insert/select for counter)
CREATE POLICY "select_visitors" ON visitors FOR SELECT TO authenticated USING (true);
CREATE POLICY "insert_visitors" ON visitors FOR INSERT WITH CHECK (true);

-- Policies for contacts
CREATE POLICY "insert_contacts" ON contacts FOR INSERT WITH CHECK (true);
CREATE POLICY "select_contacts" ON contacts FOR SELECT TO authenticated USING (true);

-- Index for performance
CREATE INDEX idx_contacts_created_at ON contacts(created_at DESC);