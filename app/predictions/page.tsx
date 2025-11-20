import { Navigation } from "@/components/navigation"
import { EventCard } from "@/components/predictions/event-card"
import { Footer } from "@/components/footer"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function PredictionsPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { data: events, error } = await supabase
    .from("events")
    .select(`
      *,
      fights (
        *,
        picks (*)
      )
    `)
    .order("date", { ascending: false })

  if (error) {
    console.error("[v0] Error fetching events:", error)
  }

  console.log("[v0] Total events fetched:", events?.length || 0)
  events?.forEach((event, idx) => {
    console.log(`[v0] Event ${idx + 1}: ${event.name} - ${event.fights?.length || 0} fights`)
  })

  const filteredEvents =
    events
      ?.filter((event) => event.name.includes("UFC 322"))
      .map((event) => ({
        ...event,
        fights: event.fights?.sort((a, b) => (a.fight_order || 0) - (b.fight_order || 0)).slice(0, 14), // Only show first 14 fights
      })) || []

  console.log("[v0] Filtered to UFC 322:", filteredEvents.length, "event(s)")
  if (filteredEvents.length > 0) {
    console.log("[v0] UFC 322 fight count (limited to 14):", filteredEvents[0].fights?.length || 0)
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-3">Event Predictions</h1>
          <p className="text-muted-foreground">AI-powered predictions for upcoming UFC events with detailed analysis</p>
        </div>

        <div className="space-y-12">
          {filteredEvents && filteredEvents.length > 0 ? (
            filteredEvents.map((event) => <EventCard key={event.id} event={event} />)
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No events available yet.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  )
}
