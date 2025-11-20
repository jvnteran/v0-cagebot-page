-- UFC 322: Complete Event Import
-- Creates event, fights, and picks in one transaction

-- Insert the UFC 322 event
INSERT INTO events (id, name, date, location, status, poster_url) VALUES
('d1e2f3g4-h5i6-4j7k-8l9m-0n1o2p3q4r5s', 'UFC 322: Della Maddalena vs Makhachev', '2025-11-15', 'TBD', 'upcoming', '/placeholder.svg?height=400&width=300')
ON CONFLICT (id) DO NOTHING;

-- Insert all 14 fights for UFC 322
WITH fight_data AS (
  SELECT * FROM (VALUES
    ('f1', 'd1e2f3g4-h5i6-4j7k-8l9m-0n1o2p3q4r5s', 'Jack Della Maddalena', 'Islam Makhachev', 'Lightweight', true, 1, 1.35, 2.85),
    ('f2', 'd1e2f3g4-h5i6-4j7k-8l9m-0n1o2p3q4r5s', 'Valentina Shevchenko', 'Zhang Weili', 'Flyweight', false, 2, 1.74, 2.10),
    ('f3', 'd1e2f3g4-h5i6-4j7k-8l9m-0n1o2p3q4r5s', 'Sean Brady', 'Michael Morales', 'Welterweight', false, 3, 1.74, 2.10),
    ('f4', 'd1e2f3g4-h5i6-4j7k-8l9m-0n1o2p3q4r5s', 'Leon Edwards', 'Carlos Prates', 'Welterweight', false, 4, 1.60, 2.35),
    ('f5', 'd1e2f3g4-h5i6-4j7k-8l9m-0n1o2p3q4r5s', 'Beneil Dariush', 'Benoit Saint Denis', 'Lightweight', false, 5, 1.56, 2.45),
    ('f6', 'd1e2f3g4-h5i6-4j7k-8l9m-0n1o2p3q4r5s', 'Bo Nickal', 'Rodolfo Vieira', 'Middleweight', false, 6, 1.49, 2.60),
    ('f7', 'd1e2f3g4-h5i6-4j7k-8l9m-0n1o2p3q4r5s', 'Roman Kopylov', 'Gregory Rodrigues', 'Middleweight', false, 7, 1.56, 2.45),
    ('f8', 'd1e2f3g4-h5i6-4j7k-8l9m-0n1o2p3q4r5s', 'Erin Blanchfield', 'Tracy Cortez', 'Flyweight', false, 8, 1.40, 2.90),
    ('f9', 'd1e2f3g4-h5i6-4j7k-8l9m-0n1o2p3q4r5s', 'Malcolm Wellmaker', 'Ethyn Ewing', 'Featherweight', false, 9, 1.17, 5.00),
    ('f10', 'd1e2f3g4-h5i6-4j7k-8l9m-0n1o2p3q4r5s', 'Kyle Daukaus', 'Gerald Meerschaert', 'Middleweight', false, 10, 1.22, 4.20),
    ('f11', 'd1e2f3g4-h5i6-4j7k-8l9m-0n1o2p3q4r5s', 'Pat Sabatini', 'Chepe Mariscal', 'Featherweight', false, 11, 2.05, 1.75),
    ('f12', 'd1e2f3g4-h5i6-4j7k-8l9m-0n1o2p3q4r5s', 'Angela Hill', 'Fatima Kline', 'Strawweight', false, 12, 1.19, 4.50),
    ('f13', 'd1e2f3g4-h5i6-4j7k-8l9m-0n1o2p3q4r5s', 'Baisangur Susurkaev', 'Eric McConico', 'Middleweight', false, 13, 1.09, 7.00),
    ('f14', 'd1e2f3g4-h5i6-4j7k-8l9m-0n1o2p3q4r5s', 'Viacheslav Borshchev', 'Matheus Camilo', 'Lightweight', false, 14, 1.60, 2.35)
  ) AS t(id, event_id, fighter_a_name, fighter_b_name, weight_class, is_main_event, fight_order, fighter_a_odds, fighter_b_odds)
)
INSERT INTO fights (id, event_id, fighter_a_name, fighter_b_name, weight_class, is_main_event, fight_order, fighter_a_odds, fighter_b_odds)
SELECT gen_random_uuid(), event_id, fighter_a_name, fighter_b_name, weight_class, is_main_event, fight_order, fighter_a_odds, fighter_b_odds
FROM fight_data
ON CONFLICT DO NOTHING;

-- Now insert picks linked to the fights we just created
WITH fight_lookup AS (
  SELECT id as fight_id, fighter_a_name, fighter_b_name, fighter_a_odds, fighter_b_odds FROM fights WHERE event_id = 'd1e2f3g4-h5i6-4j7k-8l9m-0n1o2p3q4r5s'
),
pick_data AS (
  SELECT * FROM (VALUES
    ('Islam Makhachev', 'Jack Della Maddalena', 'Islam Makhachev', 63.6, 1.35, 'Clinch game edge Islam Makhachev  |  Wrestling pressure edge Islam Makhachev  |  TDD edge Islam Makhachev'),
    ('Valentina Shevchenko', 'Zhang Weili', 'Valentina Shevchenko', 51.5, 1.74, 'Fight IQ edge Valentina Shevchenko  |  Reach +3 in for Valentina Shevchenko  |  Model vs market: 51.5% vs 57.4% (-5.9pp edge)'),
    ('Sean Brady', 'Michael Morales', 'Sean Brady', 51.5, 1.74, 'Kicking offense edge Sean Brady  |  Clinch game edge Sean Brady  |  TDD edge Sean Brady'),
    ('Carlos Prates', 'Leon Edwards', 'Carlos Prates', 55.7, 1.60, 'Kicking offense edge Carlos Prates  |  Reach +4 in for Carlos Prates  |  High-variance bout'),
    ('Benoit Saint Denis', 'Beneil Dariush', 'Benoit Saint Denis', 66.2, 1.56, 'Cardio edge Benoit Saint Denis  |  Beneil Dariush durability flagged  |  Beneil Dariush pace decline noted'),
    ('Bo Nickal', 'Rodolfo Vieira', 'Bo Nickal', 56.5, 1.49, 'Clinch game edge Bo Nickal  |  TDD edge Bo Nickal  |  Reach +3 in for Bo Nickal'),
    ('Gregory Rodrigues', 'Roman Kopylov', 'Gregory Rodrigues', 51.4, 1.56, 'Clinch game edge Gregory Rodrigues  |  Wrestling pressure edge Gregory Rodrigues  |  Defensive BJJ edge Gregory Rodrigues'),
    ('Erin Blanchfield', 'Tracy Cortez', 'Erin Blanchfield', 54.8, 1.40, 'Boxing craft edge Erin Blanchfield  |  Submission threat edge Erin Blanchfield  |  Home optics Erin Blanchfield'),
    ('Malcolm Wellmaker', 'Ethyn Ewing', 'Malcolm Wellmaker', 62.8, 1.17, 'Boxing craft edge Malcolm Wellmaker  |  Wrestling pressure edge Malcolm Wellmaker  |  Submission threat edge Malcolm Wellmaker'),
    ('Kyle Daukaus', 'Gerald Meerschaert', 'Kyle Daukaus', 66.6, 1.22, 'TDD edge Kyle Daukaus  |  Fight IQ edge Kyle Daukaus  |  Home optics Kyle Daukaus'),
    ('Chepe Mariscal', 'Pat Sabatini', 'Chepe Mariscal', 55.4, 2.05, 'Kicking offense edge Chepe Mariscal  |  TDD edge Chepe Mariscal  |  Cardio edge Chepe Mariscal'),
    ('Fatima Kline', 'Angela Hill', 'Fatima Kline', 56.9, 1.19, 'Defensive BJJ edge Fatima Kline  |  Reach +3 in for Fatima Kline  |  Model vs market: 56.9% vs 83.9% (-27.0pp edge)'),
    ('Baisangur Susurkaev', 'Eric McConico', 'Baisangur Susurkaev', 75.3, 1.09, 'Boxing craft edge Baisangur Susurkaev  |  Clinch game edge Baisangur Susurkaev  |  Wrestling pressure edge Baisangur Susurkaev'),
    ('Matheus Camilo', 'Viacheslav Borshchev', 'Matheus Camilo', 57.9, 1.60, 'Wrestling pressure edge Matheus Camilo  |  TDD edge Matheus Camilo  |  Submission threat edge Matheus Camilo')
  ) AS t(fighter_a, fighter_b, predicted_winner, confidence_percentage, betting_odds, key_edges)
)
INSERT INTO picks (id, fight_id, predicted_winner, confidence_level, confidence_percentage, edge_vs_market, key_edges, analysis)
SELECT 
  gen_random_uuid(),
  fl.fight_id,
  pd.predicted_winner,
  CASE 
    WHEN pd.confidence_percentage >= 65 THEN 'high'
    WHEN pd.confidence_percentage >= 55 THEN 'medium'
    ELSE 'low'
  END,
  pd.confidence_percentage,
  pd.confidence_percentage - (100.0 / (1 + pd.betting_odds)) as edge_vs_market,
  string_to_array(pd.key_edges, '  |  '),
  pd.key_edges
FROM pick_data pd
INNER JOIN fight_lookup fl 
  ON (fl.fighter_a_name = pd.fighter_a AND fl.fighter_b_name = pd.fighter_b)
  OR (fl.fighter_b_name = pd.fighter_a AND fl.fighter_a_name = pd.fighter_b);
