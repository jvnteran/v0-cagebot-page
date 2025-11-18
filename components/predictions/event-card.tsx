"use client"

import { Calendar, MapPin, TrendingUp } from "lucide-react"
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
  const avgConfidence = picks.length
    ? (picks.reduce((sum, pick) => sum + (pick.confidence_percentage ?? 0), 0) / picks.length).toFixed(1)
    : "0.0"
  const highConfidencePicks = picks.filter((pick) => (pick.confidence_percentage ?? 0) >= 65).length

  return (
    <div className="space-y-8">
      {/* Event Header with Poster */}
      <div className="card-elevated overflow-hidden">
        <div className="relative h-64 w-full bg-gradient-to-br from-secondary/50 to-secondary/20">
          <Image
            src={event.poster_url || "/placeholder.svg?height=256&width=1200"}
            alt={`${event.name} poster`}
            fill
            className="object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h2 className="text-4xl font-bold text-foreground mb-3 drop-shadow-lg">{event.name}</h2>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2 bg-card/80 backdrop-blur-sm px-3 py-1 rounded-md">
                <Calendar size={16} />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-2 bg-card/80 backdrop-blur-sm px-3 py-1 rounded-md">
                <MapPin size={16} />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-2 bg-accent/20 backdrop-blur-sm px-3 py-1 rounded-md ml-auto">
                <div className="w-2 h-2 rounded-full bg-accent pulse-glow" />
                <span className="text-sm font-medium text-accent uppercase tracking-wide">Upcoming Event</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-px bg-border">
          <div className="bg-card p-4 text-center">
            <div className="text-2xl font-bold text-foreground font-mono">{totalFights}</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wide mt-1">Total Fights</div>
          </div>
          <div className="bg-card p-4 text-center">
            <div className="text-2xl font-bold text-accent font-mono">{avgConfidence}%</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wide mt-1">Avg Confidence</div>
          </div>
          <div className="bg-card p-4 text-center flex flex-col items-center justify-center">
            <div className="flex items-center gap-2">
              <TrendingUp size={20} className="text-success" />
              <div className="text-2xl font-bold text-success font-mono">{highConfidencePicks}</div>
            </div>
            <div className="text-xs text-muted-foreground uppercase tracking-wide mt-1">High Confidence</div>
          </div>
        </div>
      </div>

      {/* Fights */}
      <div className="space-y-6">
        {event.fights.map((fight, index) => (
          <UFCFightCard key={fight.id} fight={fight} fightNumber={index + 1} />
        ))}
      </div>
    </div>
  )
}
