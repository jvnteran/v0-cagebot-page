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
  // </CHANGE>

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-3">Event Predictions</h1>
          <p className="text-muted-foreground">AI-powered predictions for upcoming UFC events with detailed analysis</p>
        </div>

        <div className="space-y-12">
          {events && events.length > 0 ? (
            events.map((event) => <EventCard key={event.id} event={event} />)
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
