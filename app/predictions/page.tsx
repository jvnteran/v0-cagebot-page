import { Navigation } from "@/components/navigation"
import { EventCard } from "@/components/predictions/event-card"
import { Footer } from "@/components/footer"
import { events } from "@/data/events"
import { createClient } from "@/lib/supabase/server"
import { redirect } from 'next/navigation'

export default async function PredictionsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

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
