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

-- Create fighters table to store reusable bios/attributes
CREATE TABLE IF NOT EXISTS public.fighters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  nickname TEXT,
  record TEXT,
  stance TEXT,
  height_cm NUMERIC,
  reach_cm NUMERIC,
  age INTEGER,
  country TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create fights table
CREATE TABLE IF NOT EXISTS public.fights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  fighter_a_id UUID REFERENCES public.fighters(id),
  fighter_a_name TEXT NOT NULL,
  fighter_a_image_url TEXT,
  fighter_a_odds DECIMAL,
  fighter_b_id UUID REFERENCES public.fighters(id),
  fighter_b_name TEXT NOT NULL,
  fighter_b_image_url TEXT,
  fighter_b_odds DECIMAL,
  weight_class TEXT,
  is_main_event BOOLEAN DEFAULT FALSE,
  fight_order INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Track each model inference batch for transparency
CREATE TABLE IF NOT EXISTS public.model_runs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  model_name TEXT NOT NULL,
  model_version TEXT NOT NULL,
  training_range TEXT,
  feature_set TEXT,
  run_context TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create picks table
CREATE TABLE IF NOT EXISTS public.picks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  fight_id UUID NOT NULL REFERENCES public.fights(id) ON DELETE CASCADE,
  model_run_id UUID REFERENCES public.model_runs(id) ON DELETE SET NULL,
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
  predicted_winner TEXT NOT NULL,
  confidence_level TEXT NOT NULL CHECK (confidence_level IN ('high', 'medium', 'low')),
  confidence_percentage NUMERIC,
  model_probability NUMERIC,
  model_probability_display TEXT,
  betting_odds NUMERIC,
  betting_odds_display TEXT,
  edge_vs_market NUMERIC,
  why_key_edges TEXT,
  key_edges TEXT[],
  analysis TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Odds snapshots to understand market movement
CREATE TABLE IF NOT EXISTS public.odds_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  fight_id UUID NOT NULL REFERENCES public.fights(id) ON DELETE CASCADE,
  sportsbook TEXT NOT NULL,
  fighter_a_decimal_odds DECIMAL,
  fighter_b_decimal_odds DECIMAL,
  captured_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Official results with bot performance tracking
CREATE TABLE IF NOT EXISTS public.results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  fight_id UUID NOT NULL REFERENCES public.fights(id) ON DELETE CASCADE,
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  winner TEXT NOT NULL,
  loser TEXT,
  result_code TEXT,
  method TEXT,
  method_detail TEXT,
  round INTEGER,
  time TEXT,
  result_source TEXT,
  model_pick TEXT,
  model_probability NUMERIC,
  market_probability NUMERIC,
  edge NUMERIC,
  model_result TEXT CHECK (model_result IN ('W', 'L', 'DRAW', 'NC', 'PENDING')),
  notes TEXT,
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
ALTER TABLE public.fighters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fights ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.model_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.picks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.odds_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_views ENABLE ROW LEVEL SECURITY;

-- Events policies (public read for all authenticated users)
CREATE POLICY "Anyone can view events"
  ON public.events FOR SELECT
  TO authenticated
  USING (true);

-- Fighters policies (public read for all authenticated users)
CREATE POLICY "Anyone can view fighters"
  ON public.fighters FOR SELECT
  TO authenticated
  USING (true);

-- Fights policies (public read for all authenticated users)
CREATE POLICY "Anyone can view fights"
  ON public.fights FOR SELECT
  TO authenticated
  USING (true);

-- Model run metadata is readable by authenticated users
CREATE POLICY "Anyone can view model runs"
  ON public.model_runs FOR SELECT
  TO authenticated
  USING (true);

-- Picks policies (public read for all authenticated users)
CREATE POLICY "Anyone can view picks"
  ON public.picks FOR SELECT
  TO authenticated
  USING (true);

-- Odds history policies
CREATE POLICY "Anyone can view odds history"
  ON public.odds_history FOR SELECT
  TO authenticated
  USING (true);

-- Results policies
CREATE POLICY "Anyone can view results"
  ON public.results FOR SELECT
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
CREATE INDEX IF NOT EXISTS idx_picks_model_run_id ON public.picks(model_run_id);
CREATE INDEX IF NOT EXISTS idx_odds_history_fight_id ON public.odds_history(fight_id);
CREATE INDEX IF NOT EXISTS idx_results_fight_id ON public.results(fight_id);
CREATE INDEX IF NOT EXISTS idx_user_views_user_id ON public.user_views(user_id);
CREATE INDEX IF NOT EXISTS idx_user_views_event_id ON public.user_views(event_id);
