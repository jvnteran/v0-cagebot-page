-- Add username to users table with proper auth.users ID reference
-- This correctly links your username to your Supabase Auth account

-- First, verify your auth user exists and get the ID
DO $$
DECLARE
  user_auth_id UUID;
BEGIN
  -- Get your auth user ID by email
  SELECT id INTO user_auth_id 
  FROM auth.users 
  WHERE email = 'jvnteran@gmail.com';
  
  -- If user exists in auth.users, insert into public.users
  IF user_auth_id IS NOT NULL THEN
    INSERT INTO public.users (id, username, email, full_name)
    VALUES (user_auth_id, 'jvnteran', 'jvnteran@gmail.com', 'Juan Navas')
    ON CONFLICT (id) DO UPDATE SET
      username = EXCLUDED.username,
      email = EXCLUDED.email,
      full_name = EXCLUDED.full_name,
      updated_at = NOW();
    
    RAISE NOTICE 'Successfully added/updated user: jvnteran';
  ELSE
    RAISE EXCEPTION 'Auth user not found for email: jvnteran@gmail.com';
  END IF;
END $$;
