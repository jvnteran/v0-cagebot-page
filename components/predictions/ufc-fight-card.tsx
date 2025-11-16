"use client"

import { useState } from "react"
import { ChevronDown, TrendingUp, Shield } from 'lucide-react'
import Image from "next/image"
import type { Fight } from "@/data/events"

interface UFCFightCardProps {
  fight: Fight
  fightNumber: number
}

export function UFCFightCard({ fight, fightNumber }: UFCFightCardProps) {
  const [expanded, setExpanded] = useState(false)

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 70) return "text-success"
    if (confidence >= 60) return "text-warning"
    return "text-danger"
  }

  const getConfidenceBg = (confidence: number) => {
    if (confidence >= 70) return "bg-success"
    if (confidence >= 60) return "bg-warning"
    return "bg-danger"
  }

  const formatOdds = (decimalOdds: number) => {
    // Convert decimal odds to American odds
    if (decimalOdds >= 2.0) {
      return `+${Math.round((decimalOdds - 1) * 100)}`
    } else {
      return `${Math.round(-100 / (decimalOdds - 1))}`
    }
  }

  const isModelPickFighter1 = fight.modelPick === fight.fighter1.name

  return (
    <div className="card-elevated overflow-hidden">
      <div className="bg-secondary/30 px-4 py-2 border-b border-border">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold text-muted-foreground">FIGHT #{fightNumber}</span>
          <span className="text-sm font-semibold text-foreground">{fight.weightClass}</span>
        </div>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center mb-4">
          {/* Fighter 1 */}
          <div className={`flex items-center gap-3 ${isModelPickFighter1 ? "" : "flex-row-reverse"}`}>
            <div className="relative flex-shrink-0">
              <Image
                src={fight.fighter1.image || "/placeholder.svg"}
                alt={fight.fighter1.name}
                width={80}
                height={80}
                className="rounded-lg border-2 border-border object-cover"
              />
              {isModelPickFighter1 && (
                <div className="absolute -top-1 -right-1 bg-success text-white rounded-full p-1">
                  <Shield size={14} fill="currentColor" />
                </div>
              )}
            </div>
            <div className={`flex-1 ${isModelPickFighter1 ? "text-left" : "text-right"}`}>
              <h3 className="text-base font-bold text-foreground leading-tight">{fight.fighter1.name}</h3>
              {fight.fighter1.record && (
                <p className="text-xs text-muted-foreground font-mono mt-0.5">{fight.fighter1.record}</p>
              )}
              <p className="text-xs text-muted-foreground mt-0.5">
                <span className="font-mono">{formatOdds(isModelPickFighter1 ? fight.odds : 2.5)}</span>
              </p>
            </div>
          </div>

          {/* VS Section */}
          <div className="text-xl font-bold text-muted-foreground px-2">VS</div>

          {/* Fighter 2 */}
          <div className={`flex items-center gap-3 ${isModelPickFighter1 ? "flex-row-reverse" : ""}`}>
            <div className="relative flex-shrink-0">
              <Image
                src={fight.fighter2.image || "/placeholder.svg"}
                alt={fight.fighter2.name}
                width={80}
                height={80}
                className="rounded-lg border-2 border-border object-cover"
              />
              {!isModelPickFighter1 && (
                <div className="absolute -top-1 -left-1 bg-success text-white rounded-full p-1">
                  <Shield size={14} fill="currentColor" />
                </div>
              )}
            </div>
            <div className={`flex-1 ${isModelPickFighter1 ? "text-right" : "text-left"}`}>
              <h3 className="text-base font-bold text-foreground leading-tight">{fight.fighter2.name}</h3>
              {fight.fighter2.record && (
                <p className="text-xs text-muted-foreground font-mono mt-0.5">{fight.fighter2.record}</p>
              )}
              <p className="text-xs text-muted-foreground mt-0.5">
                <span className="font-mono">{formatOdds(isModelPickFighter1 ? 2.5 : fight.odds)}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-3">
          <div className="bg-success/20 border border-success/50 rounded-lg p-3">
            <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">Cagebot Pick</div>
            <div className="text-sm font-bold text-success truncate">{fight.modelPick.split(' ')[0]}</div>
          </div>

          {/* Confidence */}
          <div className="card-elevated p-3">
            <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">Confidence</div>
            <div className={`text-lg font-mono font-bold ${getConfidenceColor(fight.confidence)}`}>
              {fight.confidence.toFixed(1)}%
            </div>
            <div className="mt-2 h-1.5 bg-secondary rounded-full overflow-hidden">
              <div
                className={`h-full transition-all ${getConfidenceBg(fight.confidence)}`}
                style={{ width: `${fight.confidence}%` }}
              />
            </div>
          </div>

          {/* Edge vs Market */}
          <div className="card-elevated p-3">
            <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wide flex items-center gap-1">
              <TrendingUp size={12} />
              <span>Edge</span>
            </div>
            <div className={`text-lg font-bold ${fight.edgeVsMarket > 0 ? 'text-success' : 'text-danger'}`}>
              {fight.edgeVsMarket > 0 ? '+' : ''}{fight.edgeVsMarket.toFixed(1)}%
            </div>
          </div>
        </div>

        {/* View Analysis Button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-center gap-2 bg-secondary/30 hover:bg-secondary/50 transition-colors px-3 py-2 rounded-lg border border-border text-xs font-semibold text-foreground uppercase tracking-wide"
        >
          <span>{expanded ? "Hide" : "View"} Analysis</span>
          <ChevronDown size={14} className={`transition-transform text-accent ${expanded ? "rotate-180" : ""}`} />
        </button>

        {/* Analysis Section */}
        {expanded && (
          <div className="mt-3 p-3 bg-secondary/20 rounded-lg border border-border space-y-3">
            <div>
              <h4 className="text-xs font-semibold text-foreground uppercase tracking-wide mb-2">Model Analysis</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{fight.analysis}</p>
            </div>
            
            <div>
              <h4 className="text-xs font-semibold text-foreground uppercase tracking-wide mb-2">Key Edges</h4>
              <ul className="space-y-1">
                {fight.keyEdges.map((edge, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>{edge}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
