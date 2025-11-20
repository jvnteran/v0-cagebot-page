-- Create users table to store username and email for login lookup
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE,
  first_name TEXT,
  last_name TEXT,
  full_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read usernames for login lookup
CREATE POLICY "Anyone can read users for login" ON public.users
  FOR SELECT
  USING (true);

-- Users can only update their own record
CREATE POLICY "Users can update own record" ON public.users
  FOR UPDATE
  USING (auth.uid() = id);

-- Create index for fast username lookups
CREATE INDEX IF NOT EXISTS idx_users_username ON public.users(username);
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
