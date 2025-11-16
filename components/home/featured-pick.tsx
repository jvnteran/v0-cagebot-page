"use client"

import { Lock, TrendingUp } from "lucide-react"

interface FeaturedPickProps {
  fighter1: string
  fighter2: string
  pick: string
  confidence: number
  edge: number
  insight: string
  event: string
}

export function FeaturedPick({ fighter1, fighter2, pick, confidence, edge, insight, event }: FeaturedPickProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="card-elevated border-2 border-accent/30 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
          {/* Left: Fighter Matchup */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-4 mb-8">
              <div className="px-3 py-1 bg-accent/10 border border-accent text-accent text-xs font-semibold uppercase rounded">
                <Lock size={12} className="inline mr-1" />
                Lock of the Event
              </div>
              <span className="text-xs text-muted-foreground uppercase">{event}</span>
            </div>

            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl font-bold text-foreground">{fighter1}</span>
                <span className="text-muted-foreground">vs</span>
                <span className="text-3xl font-bold text-foreground">{fighter2}</span>
              </div>
              <div className="h-1 bg-border rounded-full" />
            </div>

            <div className="space-y-6">
              <div>
                <p className="stat-label mb-2">Model Pick</p>
                <p className="text-2xl font-bold text-accent">{pick} to Win</p>
              </div>
              <div>
                <p className="stat-label mb-3">Key Insight</p>
                <p className="text-base text-foreground leading-relaxed">{insight}</p>
              </div>
            </div>
          </div>

          {/* Right: Stats */}
          <div className="bg-secondary/50 border border-border rounded-lg p-6 space-y-6">
            <div>
              <p className="stat-label mb-3">Confidence Level</p>
              <div className="flex items-baseline gap-3">
                <p className="stat-value text-accent">{confidence.toFixed(0)}%</p>
              </div>
              <div className="confidence-bar mt-3">
                <div className="bg-accent h-full transition-all" style={{ width: `${confidence}%` }} />
              </div>
            </div>

            <div>
              <p className="stat-label mb-2">Edge vs Market</p>
              <div className="flex items-center gap-2 text-2xl font-bold text-foreground">
                <TrendingUp size={20} className="text-accent" />
                {edge.toFixed(1)}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
