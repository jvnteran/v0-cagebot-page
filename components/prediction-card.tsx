"use client"

import { ChevronDown } from 'lucide-react'
import { useState } from "react"

interface PredictionCardProps {
  fighter1: string
  fighter2: string
  winner: string
  probability: number
  event: string
  date: string
  analysis: string
}

export function PredictionCard({ fighter1, fighter2, winner, probability, event, date, analysis }: PredictionCardProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:border-accent/50 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h4 className="text-foreground font-semibold mb-1">{fighter1} vs {fighter2}</h4>
          <p className="text-muted-foreground text-sm">{event} • {date}</p>
        </div>
      </div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-muted-foreground text-xs mb-1">Pick</p>
          <p className="text-accent font-bold">{winner}</p>
        </div>
        <div>
          <p className="text-muted-foreground text-xs mb-1">Confidence</p>
          <p className="text-foreground font-bold">{probability}%</p>
        </div>
      </div>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between text-accent hover:text-accent/80 text-sm font-medium py-2 border-t border-border"
      >
        <span>{expanded ? "Hide" : "View"} Analysis</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${expanded ? "rotate-180" : ""}`} />
      </button>
      {expanded && (
        <p className="text-muted-foreground text-sm mt-4 pt-4 border-t border-border">{analysis}</p>
      )}
    </div>
  )
}
