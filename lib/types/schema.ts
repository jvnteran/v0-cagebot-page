export type EventStatus = "upcoming" | "completed" | "cancelled"
export type ConfidenceLevel = "high" | "medium" | "low"
export type ModelResultCode = "W" | "L" | "DRAW" | "NC" | "PENDING"

export interface EventRecord {
  id: string
  name: string
  location: string
  date: string
  poster_url: string | null
  status: EventStatus
  created_at: string | null
  updated_at: string | null
}

export interface FighterRecord {
  id: string
  name: string
  nickname: string | null
  record: string | null
  stance: string | null
  height_cm: number | null
  reach_cm: number | null
  age: number | null
  country: string | null
  image_url: string | null
  created_at: string | null
  updated_at: string | null
}

export interface FightRecord {
  id: string
  event_id: string
  fighter_a_id: string | null
  fighter_a_name: string
  fighter_a_image_url: string | null
  fighter_a_odds: number | null
  fighter_b_id: string | null
  fighter_b_name: string
  fighter_b_image_url: string | null
  fighter_b_odds: number | null
  weight_class: string | null
  is_main_event: boolean | null
  fight_order: number | null
  created_at: string | null
  updated_at: string | null
}

export interface ModelRunRecord {
  id: string
  model_name: string
  model_version: string
  training_range: string | null
  feature_set: string | null
  run_context: string | null
  created_at: string | null
}

export interface PickRecord {
  id: string
  fight_id: string
  model_run_id: string | null
  event_id: string | null
  predicted_winner: string
  confidence_level: ConfidenceLevel
  confidence_percentage: number | null
  model_probability: number | null
  model_probability_display: string | null
  betting_odds: number | null
  betting_odds_display: string | null
  edge_vs_market: number | null
  why_key_edges: string | null
  key_edges: string[] | null
  analysis: string | null
  created_at: string | null
  updated_at: string | null
}

export interface OddsHistoryRecord {
  id: string
  fight_id: string
  sportsbook: string
  fighter_a_decimal_odds: number | null
  fighter_b_decimal_odds: number | null
  captured_at: string | null
}

export interface ResultRecord {
  id: string
  fight_id: string
  event_id: string
  winner: string
  loser: string | null
  result_code: string | null
  method: string | null
  method_detail: string | null
  round: number | null
  time: string | null
  result_source: string | null
  model_pick: string | null
  model_probability: number | null
  market_probability: number | null
  edge: number | null
  model_result: ModelResultCode | null
  notes: string | null
  created_at: string | null
  updated_at: string | null
}

export interface UserViewRecord {
  id: string
  user_id: string
  event_id: string
  viewed_at: string | null
}

export interface FightWithRelations extends FightRecord {
  picks: PickRecord[]
  odds_history?: OddsHistoryRecord[] | null
  results?: ResultRecord[] | null
  fighter_a_profile?: FighterRecord | null
  fighter_b_profile?: FighterRecord | null
}

export interface EventWithFights extends EventRecord {
  fights: FightWithRelations[]
}
