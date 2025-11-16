-- Create events table
CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  poster_url TEXT,
  status TEXT DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create fights table
CREATE TABLE IF NOT EXISTS public.fights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  fighter_a_name TEXT NOT NULL,
  fighter_a_image_url TEXT,
  fighter_a_odds DECIMAL,
  fighter_b_name TEXT NOT NULL,
  fighter_b_image_url TEXT,
  fighter_b_odds DECIMAL,
  weight_class TEXT,
  is_main_event BOOLEAN DEFAULT FALSE,
  fight_order INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create picks table
CREATE TABLE IF NOT EXISTS public.picks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  fight_id UUID NOT NULL REFERENCES public.fights(id) ON DELETE CASCADE,
  predicted_winner TEXT NOT NULL,
  confidence_level TEXT NOT NULL CHECK (confidence_level IN ('high', 'medium', 'low')),
  confidence_percentage DECIMAL NOT NULL,
  edge_vs_market DECIMAL,
  analysis TEXT,
  key_edges TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_views table to track which users viewed which events
CREATE TABLE IF NOT EXISTS public.user_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, event_id)
);

-- Enable Row Level Security
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fights ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.picks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_views ENABLE ROW LEVEL SECURITY;

-- Events policies (public read for all authenticated users)
CREATE POLICY "Anyone can view events"
  ON public.events FOR SELECT
  TO authenticated
  USING (true);

-- Fights policies (public read for all authenticated users)
CREATE POLICY "Anyone can view fights"
  ON public.fights FOR SELECT
  TO authenticated
  USING (true);

-- Picks policies (public read for all authenticated users)
CREATE POLICY "Anyone can view picks"
  ON public.picks FOR SELECT
  TO authenticated
  USING (true);

-- User views policies (users can only insert/view their own)
CREATE POLICY "Users can insert their own views"
  ON public.user_views FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own views"
  ON public.user_views FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_fights_event_id ON public.fights(event_id);
CREATE INDEX IF NOT EXISTS idx_picks_fight_id ON public.picks(fight_id);
CREATE INDEX IF NOT EXISTS idx_user_views_user_id ON public.user_views(user_id);
CREATE INDEX IF NOT EXISTS idx_user_views_event_id ON public.user_views(event_id);
