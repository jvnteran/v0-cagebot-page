"use client"

import { Calendar, MapPin, TrendingUp, Target, DollarSign } from "lucide-react"
import Image from "next/image"
import { UFCFightCard } from "./ufc-fight-card"
import type { EventWithFights } from "@/lib/types/schema"

interface EventCardProps {
  event: EventWithFights
}

export function EventCard({ event }: EventCardProps) {
  const eventDate = new Date(event.date)
  const formattedDate = eventDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const totalFights = event.fights.length
  const picks = event.fights
    .map((fight) => fight.picks?.[0])
    .filter((pick): pick is NonNullable<typeof pick> => Boolean(pick && pick.confidence_percentage !== null))

  const highConfidencePicks = picks.filter((pick) => (pick.confidence_percentage ?? 0) >= 65).length
  const maxEdge = picks.length > 0 ? Math.max(...picks.map((pick) => pick.edge_vs_market ?? 0)).toFixed(1) : "0.0"
  const valuePlays = picks.filter((pick) => (pick.edge_vs_market ?? 0) >= 5).length

  const mainCardFights = event.fights.slice(0, 5)
  const prelimFights = event.fights.slice(5)

  const isCompleted = event.status === "completed"

  return (
    <div className="space-y-8">
      <div className="card-elevated overflow-hidden">
        <div className="relative h-96 w-full bg-gradient-to-br from-secondary/50 to-secondary/20">
          <Image
            src={event.poster_url || "/placeholder.svg?height=384&width=1200"}
            alt={`${event.name} poster`}
            fill
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-8">
            <h2 className="text-5xl font-bold text-foreground mb-4 drop-shadow-2xl text-center">{event.name}</h2>
            <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2 bg-card/90 backdrop-blur-sm px-4 py-2 rounded-lg border border-border">
                <Calendar size={18} />
                <span className="font-medium">{formattedDate}</span>
              </div>
              <div className="flex items-center gap-2 bg-card/90 backdrop-blur-sm px-4 py-2 rounded-lg border border-border">
                <MapPin size={18} />
                <span className="font-medium">{event.location}</span>
              </div>
              <div
                className={`flex items-center gap-2 backdrop-blur-sm px-4 py-2 rounded-lg border ${isCompleted ? "bg-muted/30 border-muted" : "bg-accent/20 border-accent"}`}
              >
                <div className={`w-2.5 h-2.5 rounded-full ${isCompleted ? "bg-muted" : "bg-accent pulse-glow"}`} />
                <span
                  className={`text-sm font-bold uppercase tracking-wide ${isCompleted ? "text-muted-foreground" : "text-accent"}`}
                >
                  {isCompleted ? "Completed Event" : "Upcoming Event"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-px bg-border">
          <div className="bg-card p-6 text-center transition-all duration-300 hover:bg-card/80">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Target size={20} className="text-success" />
              <div className="text-3xl font-bold text-success font-mono">{highConfidencePicks}</div>
            </div>
            <div className="text-xs text-muted-foreground uppercase tracking-wide">High Confidence</div>
            <div className="text-xs text-muted-foreground mt-1">≥65% picks</div>
          </div>
          <div className="bg-card p-6 text-center transition-all duration-300 hover:bg-card/80">
            <div className="flex items-center justify-center gap-2 mb-2">
              <TrendingUp size={20} className="text-accent" />
              <div className="text-3xl font-bold text-accent font-mono">+{maxEdge}%</div>
            </div>
            <div className="text-xs text-muted-foreground uppercase tracking-wide">Max Edge</div>
            <div className="text-xs text-muted-foreground mt-1">Best vs market</div>
          </div>
          <div className="bg-card p-6 text-center transition-all duration-300 hover:bg-card/80">
            <div className="flex items-center justify-center gap-2 mb-2">
              <DollarSign size={20} className="text-warning" />
              <div className="text-3xl font-bold text-warning font-mono">{valuePlays}</div>
            </div>
            <div className="text-xs text-muted-foreground uppercase tracking-wide">Value Plays</div>
            <div className="text-xs text-muted-foreground mt-1">≥5% edge</div>
          </div>
        </div>
      </div>

      {/* Main Card Section */}
      {mainCardFights.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-accent to-transparent" />
            <h3 className="text-2xl font-bold text-accent uppercase tracking-wider">Main Card</h3>
            <div className="h-px flex-1 bg-gradient-to-r from-accent via-transparent to-transparent" />
          </div>
          {mainCardFights.map((fight, index) => (
            <UFCFightCard key={fight.id} fight={fight} fightNumber={index + 1} isCompleted={isCompleted} />
          ))}
        </div>
      )}

      {/* Prelims Section */}
      {prelimFights.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-muted to-transparent" />
            <h3 className="text-2xl font-bold text-muted-foreground uppercase tracking-wider">Prelims</h3>
            <div className="h-px flex-1 bg-gradient-to-r from-muted via-transparent to-transparent" />
          </div>
          {prelimFights.map((fight, index) => (
            <UFCFightCard
              key={fight.id}
              fight={fight}
              fightNumber={mainCardFights.length + index + 1}
              isCompleted={isCompleted}
            />
          ))}
        </div>
      )}
    </div>
  )
}
