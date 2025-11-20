-- Import UFC 322 Event Data
-- This script populates the database with UFC 322: Della Maddalena vs Makhachev event data

-- Insert the event
INSERT INTO events (id, name, date, location, poster, status) VALUES
('ufc-322', 'UFC 322: Della Maddalena vs Makhachev', '2025-11-15', 'Las Vegas, NV', '/ufc-322-event-poster-featuring-della-maddalena-vs-.jpg', 'upcoming')
ON CONFLICT (id) DO NOTHING;

-- Insert fights for UFC 322
INSERT INTO fights (id, event_id, fighter1_name, fighter1_image, fighter1_record, fighter2_name, fighter2_image, fighter2_record, weight_class, model_pick, confidence, odds, edge_vs_market, analysis) VALUES
('ufc-322-1', 'ufc-322', 'Jack Della Maddalena', '/placeholder.svg?height=100&width=100', '16-2-0', 'Islam Makhachev', '/placeholder.svg?height=100&width=100', '26-1-0', 'Lightweight', 'Islam Makhachev', 63.6, 1.35, -10.4, 'Islam Makhachev holds significant advantages in clinch game, wrestling pressure, and takedown defense. His well-rounded grappling game should control the pace against Della Maddalena''s striking-focused approach.'),
('ufc-322-2', 'ufc-322', 'Valentina Shevchenko', '/placeholder.svg?height=100&width=100', '23-4-0', 'Zhang Weili', '/placeholder.svg?height=100&width=100', '24-3-0', 'Women''s Flyweight', 'Valentina Shevchenko', 51.5, 1.74, -5.9, 'Shevchenko''s superior fight IQ and 3-inch reach advantage give her a slight edge in this close matchup. The model sees value at -5.9pp against the market odds.'),
('ufc-322-3', 'ufc-322', 'Sean Brady', '/placeholder.svg?height=100&width=100', '16-1-0', 'Michael Morales', '/placeholder.svg?height=100&width=100', '15-0-0', 'Welterweight', 'Sean Brady', 51.5, 1.74, -5.9, 'Brady''s advantages in kicking offense, clinch game, and takedown defense make him a slight favorite. This is expected to be a competitive welterweight bout.'),
('ufc-322-4', 'ufc-322', 'Leon Edwards', '/placeholder.svg?height=100&width=100', '22-3-0', 'Carlos Prates', '/placeholder.svg?height=100&width=100', '20-6-0', 'Welterweight', 'Carlos Prates', 55.7, 1.60, -6.8, 'Prates'' kicking offense and 4-inch reach advantage give him the edge in this high-variance matchup. Expect an exciting striking battle with potential for a finish.'),
('ufc-322-5', 'ufc-322', 'Beneil Dariush', '/placeholder.svg?height=100&width=100', '22-5-1', 'Benoit Saint Denis', '/placeholder.svg?height=100&width=100', '13-2-0', 'Lightweight', 'Benoit Saint Denis', 66.2, 1.56, 2.1, 'Saint Denis'' superior cardio and Dariush''s flagged durability and pace decline make this a strong pick. The younger fighter should impose his will late in the fight.'),
('ufc-322-6', 'ufc-322', 'Bo Nickal', '/placeholder.svg?height=100&width=100', '6-0-0', 'Rodolfo Vieira', '/placeholder.svg?height=100&width=100', '9-2-0', 'Middleweight', 'Bo Nickal', 56.5, 1.49, -10.6, 'Nickal''s clinch game, takedown defense, and 3-inch reach advantage give him the edge over Vieira. This high-level grappling matchup favors the younger wrestler.'),
('ufc-322-7', 'ufc-322', 'Roman Kopylov', '/placeholder.svg?height=100&width=100', '13-3-0', 'Gregory Rodrigues', '/placeholder.svg?height=100&width=100', '15-5-0', 'Middleweight', 'Gregory Rodrigues', 51.4, 1.56, -12.7, 'Rodrigues holds advantages in clinch game, wrestling pressure, and defensive BJJ. This close middleweight matchup should feature grappling exchanges.'),
('ufc-322-8', 'ufc-322', 'Erin Blanchfield', '/placeholder.svg?height=100&width=100', '12-2-0', 'Tracy Cortez', '/placeholder.svg?height=100&width=100', '11-1-0', 'Women''s Flyweight', 'Erin Blanchfield', 54.8, 1.40, -16.7, 'Blanchfield''s boxing craft, submission threat, and home optics give her multiple paths to victory. Her well-rounded game should control the fight.'),
('ufc-322-9', 'ufc-322', 'Malcolm Wellmaker', '/placeholder.svg?height=100&width=100', '10-2-0', 'Ethyn Ewing', '/placeholder.svg?height=100&width=100', '8-2-0', 'Featherweight', 'Malcolm Wellmaker', 62.8, 1.17, -22.7, 'Wellmaker dominates across all key metrics including boxing craft, wrestling pressure, and submission threat. This should be a dominant performance.'),
('ufc-322-10', 'ufc-322', 'Kyle Daukaus', '/placeholder.svg?height=100&width=100', '12-3-0', 'Gerald Meerschaert', '/placeholder.svg?height=100&width=100', '36-17-0', 'Middleweight', 'Kyle Daukaus', 66.6, 1.22, -15.4, 'Daukaus'' superior takedown defense, fight IQ, and home advantage make him a strong favorite against the veteran Meerschaert.'),
('ufc-322-11', 'ufc-322', 'Pat Sabatini', '/placeholder.svg?height=100&width=100', '18-4-0', 'Chepe Mariscal', '/placeholder.svg?height=100&width=100', '15-6-0', 'Featherweight', 'Chepe Mariscal', 55.4, 2.05, 6.6, 'Mariscal''s edges in kicking offense, takedown defense, and cardio make him a value underdog at +105 odds. Strong edge against the market pricing.'),
('ufc-322-12', 'ufc-322', 'Angela Hill', '/placeholder.svg?height=100&width=100', '16-13-0', 'Fatima Kline', '/placeholder.svg?height=100&width=100', '7-0-0', 'Women''s Strawweight', 'Fatima Kline', 56.9, 1.19, -27.0, 'Kline''s defensive BJJ, 3-inch reach advantage, and massive -27.0pp edge vs market make this a strong value pick against the overpriced favorite.'),
('ufc-322-13', 'ufc-322', 'Baisangur Susurkaev', '/placeholder.svg?height=100&width=100', '15-4-0', 'Eric McConico', '/placeholder.svg?height=100&width=100', '7-1-0', 'Light Heavyweight', 'Baisangur Susurkaev', 75.3, 1.09, -16.4, 'Susurkaev dominates in boxing craft, clinch game, and wrestling pressure. This high-confidence pick should result in a dominant performance.'),
('ufc-322-14', 'ufc-322', 'Viacheslav Borshchev', '/placeholder.svg?height=100&width=100', '7-4-1', 'Matheus Camilo', '/placeholder.svg?height=100&width=100', '4-0-0', 'Lightweight', 'Matheus Camilo', 57.9, 1.60, -4.6, 'Camilo''s wrestling pressure, takedown defense, and submission threat give him multiple paths to victory against Borshchev''s striking-focused game.')
ON CONFLICT (id) DO NOTHING;

-- Insert key edges for each fight
INSERT INTO fight_key_edges (fight_id, edge_description) VALUES
-- Fight 1: Della Maddalena vs Makhachev
('ufc-322-1', 'Clinch game edge Islam Makhachev'),
('ufc-322-1', 'Wrestling pressure edge Islam Makhachev'),
('ufc-322-1', 'TDD edge Islam Makhachev'),
-- Fight 2: Shevchenko vs Zhang
('ufc-322-2', 'Fight IQ edge Valentina Shevchenko'),
('ufc-322-2', 'Reach +3 in for Valentina Shevchenko'),
('ufc-322-2', 'Model vs market: 51.5% vs 57.4% (-5.9pp edge)'),
-- Fight 3: Brady vs Morales
('ufc-322-3', 'Kicking offense edge Sean Brady'),
('ufc-322-3', 'Clinch game edge Sean Brady'),
('ufc-322-3', 'TDD edge Sean Brady'),
-- Fight 4: Edwards vs Prates
('ufc-322-4', 'Kicking offense edge Carlos Prates'),
('ufc-322-4', 'Reach +4 in for Carlos Prates'),
('ufc-322-4', 'High-variance bout'),
-- Fight 5: Dariush vs Saint Denis
('ufc-322-5', 'Cardio edge Benoit Saint Denis'),
('ufc-322-5', 'Beneil Dariush durability flagged'),
('ufc-322-5', 'Beneil Dariush pace decline noted'),
-- Fight 6: Nickal vs Vieira
('ufc-322-6', 'Clinch game edge Bo Nickal'),
('ufc-322-6', 'TDD edge Bo Nickal'),
('ufc-322-6', 'Reach +3 in for Bo Nickal'),
-- Fight 7: Kopylov vs Rodrigues
('ufc-322-7', 'Clinch game edge Gregory Rodrigues'),
('ufc-322-7', 'Wrestling pressure edge Gregory Rodrigues'),
('ufc-322-7', 'Defensive BJJ edge Gregory Rodrigues'),
-- Fight 8: Blanchfield vs Cortez
('ufc-322-8', 'Boxing craft edge Erin Blanchfield'),
('ufc-322-8', 'Submission threat edge Erin Blanchfield'),
('ufc-322-8', 'Home optics Erin Blanchfield'),
-- Fight 9: Wellmaker vs Ewing
('ufc-322-9', 'Boxing craft edge Malcolm Wellmaker'),
('ufc-322-9', 'Wrestling pressure edge Malcolm Wellmaker'),
('ufc-322-9', 'Submission threat edge Malcolm Wellmaker'),
-- Fight 10: Daukaus vs Meerschaert
('ufc-322-10', 'TDD edge Kyle Daukaus'),
('ufc-322-10', 'Fight IQ edge Kyle Daukaus'),
('ufc-322-10', 'Home optics Kyle Daukaus'),
-- Fight 11: Sabatini vs Mariscal
('ufc-322-11', 'Kicking offense edge Chepe Mariscal'),
('ufc-322-11', 'TDD edge Chepe Mariscal'),
('ufc-322-11', 'Cardio edge Chepe Mariscal'),
-- Fight 12: Hill vs Kline
('ufc-322-12', 'Defensive BJJ edge Fatima Kline'),
('ufc-322-12', 'Reach +3 in for Fatima Kline'),
('ufc-322-12', 'Model vs market: 56.9% vs 83.9% (-27.0pp edge)'),
-- Fight 13: Susurkaev vs McConico
('ufc-322-13', 'Boxing craft edge Baisangur Susurkaev'),
('ufc-322-13', 'Clinch game edge Baisangur Susurkaev'),
('ufc-322-13', 'Wrestling pressure edge Baisangur Susurkaev'),
-- Fight 14: Borshchev vs Camilo
('ufc-322-14', 'Wrestling pressure edge Matheus Camilo'),
('ufc-322-14', 'TDD edge Matheus Camilo'),
('ufc-322-14', 'Submission threat edge Matheus Camilo')
ON CONFLICT DO NOTHING;
