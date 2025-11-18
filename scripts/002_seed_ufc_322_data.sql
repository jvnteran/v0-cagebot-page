-- Seed fighter bios referenced by the UFC 322 card
INSERT INTO public.fighters (id, name, record, stance, country, image_url)
VALUES
  ('11111111-1111-1111-1111-111111111111', 'Jack Della Maddalena', '16-2-0', 'Orthodox', 'Australia', '/placeholder.svg?fighter=jack-della-maddalena'),
  ('22222222-2222-2222-2222-222222222222', 'Gilbert Burns', '22-6-0', 'Orthodox', 'Brazil', '/placeholder.svg?fighter=gilbert-burns'),
  ('33333333-3333-3333-3333-333333333333', 'Leon Edwards', '21-3-0', 'Southpaw', 'United Kingdom', '/leon-edwards-ufc-fighter.png'),
  ('44444444-4444-4444-4444-444444444444', 'Belal Muhammad', '23-4-0', 'Orthodox', 'United States', '/placeholder.svg?fighter=belal-muhammad'),
  ('55555555-5555-5555-5555-555555555555', 'Alexandre Pantoja', '28-5-0', 'Orthodox', 'Brazil', '/alexandre-pantoja-ufc-fighter.png'),
  ('66666666-6666-6666-6666-666666666666', 'Steve Erceg', '12-1-0', 'Orthodox', 'Australia', '/placeholder.svg?fighter=steve-erceg'),
  ('77777777-7777-7777-7777-777777777777', 'Kai Kara-France', '25-11-0', 'Orthodox', 'New Zealand', '/placeholder.svg?fighter=kai-kara-france'),
  ('88888888-8888-8888-8888-888888888888', 'Manel Kape', '21-6-0', 'Orthodox', 'Angola', '/placeholder.svg?fighter=manel-kape'),
  ('99999999-9999-9999-9999-999999999999', 'Dan Hooker', '23-12-0', 'Orthodox', 'New Zealand', '/placeholder.svg?fighter=dan-hooker'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Mateusz Gamrot', '24-2-0', 'Orthodox', 'Poland', '/placeholder.svg?fighter=mateusz-gamrot')
ON CONFLICT (name) DO UPDATE
SET
  record = EXCLUDED.record,
  stance = COALESCE(EXCLUDED.stance, public.fighters.stance),
  country = COALESCE(EXCLUDED.country, public.fighters.country),
  image_url = COALESCE(EXCLUDED.image_url, public.fighters.image_url),
  updated_at = NOW();

-- Track the model batch that produced these picks
INSERT INTO public.model_runs (id, model_name, model_version, training_range, feature_set, run_context)
VALUES (
  '0aa0bb00-ccdd-4eee-9000-aaaaaaaaaaaa',
  'cagebot-ensemble',
  'v2.0.0',
  '2013-01-01 to 2024-10-31',
  'ufc_core_features_v4',
  'Initial inference for UFC 322 event card'
)
ON CONFLICT (id) DO UPDATE
SET
  model_name = EXCLUDED.model_name,
  model_version = EXCLUDED.model_version,
  training_range = EXCLUDED.training_range,
  feature_set = EXCLUDED.feature_set,
  run_context = EXCLUDED.run_context;

-- Insert UFC 322 Event
INSERT INTO public.events (id, name, location, date, poster_url, status)
VALUES (
  'e1a1b2c3-d4e5-6f7a-8b9c-0d1e2f3a4b5c',
  'UFC 322: Della Maddalena vs. Burns',
  'Perth Arena, Perth, Australia',
  '2025-02-08 22:00:00+00',
  '/ufc-322-event-poster-featuring-della-maddalena-vs-.jpg',
  'upcoming'
)
ON CONFLICT (id) DO UPDATE
SET
  name = EXCLUDED.name,
  location = EXCLUDED.location,
  date = EXCLUDED.date,
  poster_url = EXCLUDED.poster_url,
  status = EXCLUDED.status;

-- Insert fights for UFC 322
-- Fight 1: Della Maddalena vs Burns
INSERT INTO public.fights (id, event_id, fighter_a_id, fighter_a_name, fighter_a_odds, fighter_b_id, fighter_b_name, fighter_b_odds, weight_class, is_main_event, fight_order)
VALUES (
  'f1a1b2c3-d4e5-6f7a-8b9c-1d2e3f4a5b6c',
  'e1a1b2c3-d4e5-6f7a-8b9c-0d1e2f3a4b5c',
  '11111111-1111-1111-1111-111111111111',
  'Jack Della Maddalena',
  -145,
  '22222222-2222-2222-2222-222222222222',
  'Gilbert Burns',
  125,
  'Welterweight',
  true,
  1
)
ON CONFLICT (id) DO UPDATE
SET
  fighter_a_id = EXCLUDED.fighter_a_id,
  fighter_a_name = EXCLUDED.fighter_a_name,
  fighter_a_odds = EXCLUDED.fighter_a_odds,
  fighter_b_id = EXCLUDED.fighter_b_id,
  fighter_b_name = EXCLUDED.fighter_b_name,
  fighter_b_odds = EXCLUDED.fighter_b_odds,
  weight_class = EXCLUDED.weight_class,
  is_main_event = EXCLUDED.is_main_event,
  fight_order = EXCLUDED.fight_order;

INSERT INTO public.picks (
  fight_id,
  event_id,
  model_run_id,
  predicted_winner,
  confidence_level,
  confidence_percentage,
  model_probability,
  model_probability_display,
  betting_odds,
  betting_odds_display,
  edge_vs_market,
  why_key_edges,
  key_edges,
  analysis
)
VALUES (
  'f1a1b2c3-d4e5-6f7a-8b9c-1d2e3f4a5b6c',
  'e1a1b2c3-d4e5-6f7a-8b9c-0d1e2f3a4b5c',
  '0aa0bb00-ccdd-4eee-9000-aaaaaaaaaaaa',
  'Jack Della Maddalena',
  'high',
  67.5,
  0.675,
  '67.5%',
  1.35,
  '1.35',
  8.4,
  'Superior striking metrics  |  Home crowd advantage  |  Youth and athleticism edge',
  ARRAY['Superior striking metrics', 'Home crowd advantage', 'Youth and athleticism edge'],
  'Della Maddalena''s striking volume and accuracy give him a significant edge in this matchup.'
);

-- Fight 2: Leon Edwards vs Belal Muhammad
INSERT INTO public.fights (id, event_id, fighter_a_id, fighter_a_name, fighter_a_odds, fighter_b_id, fighter_b_name, fighter_b_odds, weight_class, fight_order)
VALUES (
  'f2a1b2c3-d4e5-6f7a-8b9c-2d3e4f5a6b7c',
  'e1a1b2c3-d4e5-6f7a-8b9c-0d1e2f3a4b5c',
  '33333333-3333-3333-3333-333333333333',
  'Leon Edwards',
  -110,
  '44444444-4444-4444-4444-444444444444',
  'Belal Muhammad',
  -110,
  'Welterweight',
  2
)
ON CONFLICT (id) DO UPDATE
SET
  fighter_a_id = EXCLUDED.fighter_a_id,
  fighter_a_name = EXCLUDED.fighter_a_name,
  fighter_a_odds = EXCLUDED.fighter_a_odds,
  fighter_b_id = EXCLUDED.fighter_b_id,
  fighter_b_name = EXCLUDED.fighter_b_name,
  fighter_b_odds = EXCLUDED.fighter_b_odds,
  weight_class = EXCLUDED.weight_class,
  fight_order = EXCLUDED.fight_order;

INSERT INTO public.picks (
  fight_id,
  event_id,
  model_run_id,
  predicted_winner,
  confidence_level,
  confidence_percentage,
  model_probability,
  model_probability_display,
  betting_odds,
  betting_odds_display,
  edge_vs_market,
  why_key_edges,
  key_edges,
  analysis
)
VALUES (
  'f2a1b2c3-d4e5-6f7a-8b9c-2d3e4f5a6b7c',
  'e1a1b2c3-d4e5-6f7a-8b9c-0d1e2f3a4b5c',
  '0aa0bb00-ccdd-4eee-9000-aaaaaaaaaaaa',
  'Leon Edwards',
  'medium',
  55.2,
  0.552,
  '55.2%',
  1.74,
  '1.74',
  5.2,
  'Better striking defense  |  Experience in championship rounds  |  Cardio advantage',
  ARRAY['Better striking defense', 'Experience in championship rounds', 'Cardio advantage'],
  'Edwards'' striking precision and defensive wrestling should be enough to secure the decision.'
);

-- Fight 3: Alexandre Pantoja vs Steve Erceg
INSERT INTO public.fights (id, event_id, fighter_a_id, fighter_a_name, fighter_a_odds, fighter_b_id, fighter_b_name, fighter_b_odds, weight_class, fight_order)
VALUES (
  'f3a1b2c3-d4e5-6f7a-8b9c-3d4e5f6a7b8c',
  'e1a1b2c3-d4e5-6f7a-8b9c-0d1e2f3a4b5c',
  '55555555-5555-5555-5555-555555555555',
  'Alexandre Pantoja',
  -135,
  '66666666-6666-6666-6666-666666666666',
  'Steve Erceg',
  115,
  'Flyweight',
  3
)
ON CONFLICT (id) DO UPDATE
SET
  fighter_a_id = EXCLUDED.fighter_a_id,
  fighter_a_name = EXCLUDED.fighter_a_name,
  fighter_a_odds = EXCLUDED.fighter_a_odds,
  fighter_b_id = EXCLUDED.fighter_b_id,
  fighter_b_name = EXCLUDED.fighter_b_name,
  fighter_b_odds = EXCLUDED.fighter_b_odds,
  weight_class = EXCLUDED.weight_class,
  fight_order = EXCLUDED.fight_order;

INSERT INTO public.picks (
  fight_id,
  event_id,
  model_run_id,
  predicted_winner,
  confidence_level,
  confidence_percentage,
  model_probability,
  model_probability_display,
  betting_odds,
  betting_odds_display,
  edge_vs_market,
  why_key_edges,
  key_edges,
  analysis
)
VALUES (
  'f3a1b2c3-d4e5-6f7a-8b9c-3d4e5f6a7b8c',
  'e1a1b2c3-d4e5-6f7a-8b9c-0d1e2f3a4b5c',
  '0aa0bb00-ccdd-4eee-9000-aaaaaaaaaaaa',
  'Alexandre Pantoja',
  'high',
  68.8,
  0.688,
  '68.8%',
  1.74,
  '1.74',
  11.2,
  'Superior grappling  |  Championship experience  |  Submission threat',
  ARRAY['Superior grappling', 'Championship experience', 'Submission threat'],
  'Pantoja''s grappling and submission threat make him a strong favorite in this matchup.'
);

-- Fight 4: Kai Kara-France vs Manel Kape
INSERT INTO public.fights (id, event_id, fighter_a_id, fighter_a_name, fighter_a_odds, fighter_b_id, fighter_b_name, fighter_b_odds, weight_class, fight_order)
VALUES (
  'f4a1b2c3-d4e5-6f7a-8b9c-4d5e6f7a8b9c',
  'e1a1b2c3-d4e5-6f7a-8b9c-0d1e2f3a4b5c',
  '77777777-7777-7777-7777-777777777777',
  'Kai Kara-France',
  -140,
  '88888888-8888-8888-8888-888888888888',
  'Manel Kape',
  120,
  'Flyweight',
  4
)
ON CONFLICT (id) DO UPDATE
SET
  fighter_a_id = EXCLUDED.fighter_a_id,
  fighter_a_name = EXCLUDED.fighter_a_name,
  fighter_a_odds = EXCLUDED.fighter_a_odds,
  fighter_b_id = EXCLUDED.fighter_b_id,
  fighter_b_name = EXCLUDED.fighter_b_name,
  fighter_b_odds = EXCLUDED.fighter_b_odds,
  weight_class = EXCLUDED.weight_class,
  fight_order = EXCLUDED.fight_order;

INSERT INTO public.picks (
  fight_id,
  event_id,
  model_run_id,
  predicted_winner,
  confidence_level,
  confidence_percentage,
  model_probability,
  model_probability_display,
  betting_odds,
  betting_odds_display,
  edge_vs_market,
  why_key_edges,
  key_edges,
  analysis
)
VALUES (
  'f4a1b2c3-d4e5-6f7a-8b9c-4d5e6f7a8b9c',
  'e1a1b2c3-d4e5-6f7a-8b9c-0d1e2f3a4b5c',
  '0aa0bb00-ccdd-4eee-9000-aaaaaaaaaaaa',
  'Kai Kara-France',
  'medium',
  62.4,
  0.624,
  '62.4%',
  1.60,
  '1.60',
  4.2,
  'Power striking  |  Speed advantage  |  Better fight IQ',
  ARRAY['Power striking', 'Speed advantage', 'Better fight IQ'],
  'Kara-France''s power and speed should overcome Kape''s wrestling.'
);

-- Fight 5: Dan Hooker vs Mateusz Gamrot
INSERT INTO public.fights (id, event_id, fighter_a_id, fighter_a_name, fighter_a_odds, fighter_b_id, fighter_b_name, fighter_b_odds, weight_class, fight_order)
VALUES (
  'f5a1b2c3-d4e5-6f7a-8b9c-5d6e7f8a9b0c',
  'e1a1b2c3-d4e5-6f7a-8b9c-0d1e2f3a4b5c',
  '99999999-9999-9999-9999-999999999999',
  'Dan Hooker',
  130,
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
  'Mateusz Gamrot',
  -150,
  'Lightweight',
  5
)
ON CONFLICT (id) DO UPDATE
SET
  fighter_a_id = EXCLUDED.fighter_a_id,
  fighter_a_name = EXCLUDED.fighter_a_name,
  fighter_a_odds = EXCLUDED.fighter_a_odds,
  fighter_b_id = EXCLUDED.fighter_b_id,
  fighter_b_name = EXCLUDED.fighter_b_name,
  fighter_b_odds = EXCLUDED.fighter_b_odds,
  weight_class = EXCLUDED.weight_class,
  fight_order = EXCLUDED.fight_order;

INSERT INTO public.picks (
  fight_id,
  event_id,
  model_run_id,
  predicted_winner,
  confidence_level,
  confidence_percentage,
  model_probability,
  model_probability_display,
  betting_odds,
  betting_odds_display,
  edge_vs_market,
  why_key_edges,
  key_edges,
  analysis
)
VALUES (
  'f5a1b2c3-d4e5-6f7a-8b9c-5d6e7f8a9b0c',
  'e1a1b2c3-d4e5-6f7a-8b9c-0d1e2f3a4b5c',
  '0aa0bb00-ccdd-4eee-9000-aaaaaaaaaaaa',
  'Mateusz Gamrot',
  'high',
  70.1,
  0.701,
  '70.1%',
  1.43,
  '1.43',
  10.1,
  'Elite wrestling  |  Superior cardio  |  Ground control',
  ARRAY['Elite wrestling', 'Superior cardio', 'Ground control'],
  'Gamrot''s wrestling and cardio will dominate over multiple rounds.'
);

-- Optional odds history snapshots for transparency
INSERT INTO public.odds_history (fight_id, sportsbook, fighter_a_decimal_odds, fighter_b_decimal_odds, captured_at)
VALUES
  ('f1a1b2c3-d4e5-6f7a-8b9c-1d2e3f4a5b6c', 'DraftKings', 1.72, 2.15, '2024-12-01 15:00:00+00'),
  ('f1a1b2c3-d4e5-6f7a-8b9c-1d2e3f4a5b6c', 'FanDuel', 1.70, 2.20, '2024-12-03 15:00:00+00'),
  ('f2a1b2c3-d4e5-6f7a-8b9c-2d3e4f5a6b7c', 'DraftKings', 1.95, 1.95, '2024-12-02 15:00:00+00');

-- Example official results that include model pick outcomes for CSV parity
INSERT INTO public.results (
  fight_id,
  event_id,
  winner,
  loser,
  result_code,
  method,
  method_detail,
  round,
  time,
  result_source,
  model_pick,
  model_probability,
  market_probability,
  edge,
  model_result,
  notes
)
VALUES
  (
    'f1a1b2c3-d4e5-6f7a-8b9c-1d2e3f4a5b6c',
    'e1a1b2c3-d4e5-6f7a-8b9c-0d1e2f3a4b5c',
    'Jack Della Maddalena',
    'Gilbert Burns',
    'A',
    'KO/TKO',
    'Elbows from mount',
    2,
    '4:11',
    'UFC Stats',
    'Jack Della Maddalena',
    0.675,
    0.591,
    0.084,
    'W',
    'Model called the stoppage with a high-confidence tag'
  ),
  (
    'f2a1b2c3-d4e5-6f7a-8b9c-2d3e4f5a6b7c',
    'e1a1b2c3-d4e5-6f7a-8b9c-0d1e2f3a4b5c',
    'Belal Muhammad',
    'Leon Edwards',
    'B',
    'Decision',
    'Unanimous',
    5,
    '5:00',
    'UFC Stats',
    'Leon Edwards',
    0.552,
    0.575,
    -0.023,
    'L',
    'Fight went the distance and broke the model''s medium confidence pick'
  );
