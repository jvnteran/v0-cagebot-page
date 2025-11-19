import { Navigation } from "@/components/navigation"
import { EventCard } from "@/components/predictions/event-card"
import { Footer } from "@/components/footer"
import { createClient } from "@/lib/supabase/server"
import type { EventWithFights } from "@/lib/types/schema"
import { redirect } from "next/navigation"

export default async function PredictionsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { data, error } = await supabase
    .from("events")
    .select(`
      id,
      name,
      location,
      date,
      poster_url,
      status,
      created_at,
      updated_at,
      fights (
        id,
        event_id,
        fighter_a_id,
        fighter_a_name,
        fighter_a_image_url,
        fighter_a_odds,
        fighter_b_id,
        fighter_b_name,
        fighter_b_image_url,
        fighter_b_odds,
        weight_class,
        is_main_event,
        fight_order,
        created_at,
        updated_at,
        picks (
          id,
          fight_id,
          model_run_id,
          event_id,
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
          analysis,
          created_at,
          updated_at
        ),
        odds_history (
          id,
          fight_id,
          sportsbook,
          fighter_a_decimal_odds,
          fighter_b_decimal_odds,
          captured_at
        ),
        results (
          id,
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
          notes,
          created_at,
          updated_at
        ),
        fighter_a_profile:fighters!fights_fighter_a_id_fkey (
          id,
          name,
          nickname,
          record,
          stance,
          height_cm,
          reach_cm,
          age,
          country,
          image_url,
          created_at,
          updated_at
        ),
        fighter_b_profile:fighters!fights_fighter_b_id_fkey (
          id,
          name,
          nickname,
          record,
          stance,
          height_cm,
          reach_cm,
          age,
          country,
          image_url,
          created_at,
          updated_at
        )
      )
    `)
    .eq("status", "upcoming")
    .order("date", { ascending: true })
    .order("fight_order", { ascending: true, foreignTable: "fights" })

  if (error) {
    console.error("Failed to load events", error)
    throw new Error(error.message)
  }

  const events: EventWithFights[] = (data ?? []).map((event) => ({
    ...event,
    fights: (event.fights ?? []).map((fight) => ({
      ...fight,
      picks: fight.picks ?? [],
      odds_history: fight.odds_history ?? [],
      results: fight.results ?? [],
      fighter_a_profile: fight.fighter_a_profile ?? null,
      fighter_b_profile: fight.fighter_b_profile ?? null,
    })),
  }))

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-3">Event Predictions</h1>
          <p className="text-muted-foreground">
            AI-powered predictions for upcoming UFC events with detailed analysis
          </p>
        </div>

        <div className="space-y-12">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
      <Footer />
    </main>
  )
}
