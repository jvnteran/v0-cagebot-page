"use client"

import { useState } from "react"
import { ChevronDown, TrendingUp } from "lucide-react"

interface FightCardProps {
  fighter1: string
  fighter2: string
  pick: string
  probability: number
  edge: number
  analysis: string
  recentForm?: string
}

export function FightCard({ fighter1, fighter2, pick, probability, edge, analysis, recentForm }: FightCardProps) {
  const [expanded, setExpanded] = useState(false)

  const getConfidenceClass = (prob: number) => {
    if (prob >= 80) return "confidence-high"
    if (prob >= 60) return "confidence-medium"
    return "confidence-low"
  }

  const getConfidenceLabel = (prob: number) => {
    if (prob >= 80) return "High"
    if (prob >= 60) return "Medium"
    return "Low"
  }

  return (
    <div className={`card-elevated border-l-4 ${getConfidenceClass(probability)} overflow-hidden transition-all`}>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start mb-6">
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold text-foreground mb-4">
              {fighter1} <span className="text-muted-foreground font-normal">vs</span> {fighter2}
            </h3>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="stat-label">Model Pick</span>
                  <span className="font-semibold text-accent text-lg">{pick}</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="stat-label">Confidence</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-semibold text-foreground">{probability.toFixed(1)}%</span>
                    <span className="text-xs px-2 py-1 bg-background rounded border border-border text-muted-foreground">
                      {getConfidenceLabel(probability)}
                    </span>
                  </div>
                </div>
                <div className="confidence-bar">
                  <div className="bg-accent h-full transition-all" style={{ width: `${probability}%` }} />
                </div>
              </div>

              {recentForm && (
                <div>
                  <span className="stat-label">Recent Form</span>
                  <p className="text-sm text-foreground mt-1">{recentForm}</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-secondary/50 border border-border rounded-lg p-5">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={16} className="text-accent" />
              <span className="stat-label">Edge vs Market</span>
            </div>
            <p className="text-3xl font-bold text-accent">{edge.toFixed(1)}%</p>
          </div>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between text-accent hover:text-accent/80 transition-colors font-semibold text-sm uppercase tracking-wide py-3 border-t border-border"
        >
          <span>{expanded ? "Hide Analysis" : "View Analysis"}</span>
          <ChevronDown size={16} className={`transition-transform ${expanded ? "rotate-180" : ""}`} />
        </button>

        {expanded && (
          <div className="mt-4 pt-4 border-t border-border text-sm text-foreground leading-relaxed">{analysis}</div>
        )}
      </div>
    </div>
  )
}
