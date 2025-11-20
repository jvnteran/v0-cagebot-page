"use client"

import { useState } from "react"
import { ChevronDown, TrendingUp, Shield } from "lucide-react"
import Image from "next/image"
import type { FightWithRelations } from "@/lib/types/schema"

interface UFCFightCardProps {
  fight: FightWithRelations
  fightNumber: number
}

export function UFCFightCard({ fight, fightNumber }: UFCFightCardProps) {
  const [expanded, setExpanded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const pick = fight.picks?.[0]
  const hasConfidence = pick?.confidence_percentage !== null && pick?.confidence_percentage !== undefined
  const confidence = hasConfidence ? (pick.confidence_percentage ?? 0) : 0
  const hasEdge = pick?.edge_vs_market !== null && pick?.edge_vs_market !== undefined
  const edgeVsMarket = hasEdge ? (pick.edge_vs_market ?? 0) : 0
  const keyEdges = pick?.key_edges ?? []
  const analysis = pick?.analysis ?? "Model analysis will be published soon."
  const predictedWinner = pick?.predicted_winner

  const getConfidenceColor = (value: number) => {
    if (value >= 70) return "text-success"
    if (value >= 60) return "text-warning"
    return "text-danger"
  }

  const getConfidenceBg = (value: number) => {
    if (value >= 70) return "bg-success"
    if (value >= 60) return "bg-warning"
    return "bg-danger"
  }

  const formatOdds = (odds?: number | null) => {
    if (odds === null || odds === undefined) {
      return "N/A"
    }
    const rounded = Math.round(odds)
    return rounded > 0 ? `+${rounded}` : `${rounded}`
  }

  const getImage = (primary?: string | null, fallback?: string | null) => primary || fallback || "/placeholder.svg"

  const isPredictedWinner = (name: string) => predictedWinner === name
  const confidenceLabel = hasConfidence ? `${confidence.toFixed(1)}%` : "--"

  return (
    <div
      className="card-elevated overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.01]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`bg-gradient-to-r from-accent/5 via-accent/10 to-accent/5 px-4 py-2 border-b border-border transition-all duration-300 ${isHovered ? "from-accent/10 via-accent/20 to-accent/10" : ""}`}
      >
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold text-muted-foreground">FIGHT #{fightNumber}</span>
          <span className="text-sm font-semibold text-foreground">{fight.weight_class ?? "TBD"}</span>
        </div>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center mb-4">
          {/* Fighter A */}
          <div
            className={`flex items-center gap-3 ${isPredictedWinner(fight.fighter_a_name) ? "" : "flex-row-reverse"}`}
          >
            <div className="relative flex-shrink-0">
              <Image
                src={getImage(fight.fighter_a_image_url, fight.fighter_a_profile?.image_url) || "/placeholder.svg"}
                alt={fight.fighter_a_name}
                width={80}
                height={80}
                className={`rounded-lg border-2 border-border object-cover transition-transform duration-300 ${isHovered ? "scale-110" : ""}`}
              />
              {isPredictedWinner(fight.fighter_a_name) && (
                <div className="absolute -top-1 -right-1 bg-success text-white rounded-full p-1 animate-pulse">
                  <Shield size={14} fill="currentColor" />
                </div>
              )}
            </div>
            <div className={`flex-1 ${isPredictedWinner(fight.fighter_a_name) ? "text-left" : "text-right"}`}>
              <h3 className="text-base font-bold text-foreground leading-tight">{fight.fighter_a_name}</h3>
              {fight.fighter_a_profile?.record && (
                <p className="text-xs text-muted-foreground font-mono mt-0.5">{fight.fighter_a_profile.record}</p>
              )}
              <p className="text-xs text-muted-foreground mt-0.5">
                <span className="font-mono">{formatOdds(fight.fighter_a_odds)}</span>
              </p>
            </div>
          </div>

          {/* VS Section */}
          <div
            className={`text-xl font-bold text-muted-foreground px-2 transition-all duration-300 ${isHovered ? "text-accent scale-110" : ""}`}
          >
            VS
          </div>

          {/* Fighter B */}
          <div
            className={`flex items-center gap-3 ${isPredictedWinner(fight.fighter_a_name) ? "flex-row-reverse" : ""}`}
          >
            <div className="relative flex-shrink-0">
              <Image
                src={getImage(fight.fighter_b_image_url, fight.fighter_b_profile?.image_url) || "/placeholder.svg"}
                alt={fight.fighter_b_name}
                width={80}
                height={80}
                className={`rounded-lg border-2 border-border object-cover transition-transform duration-300 ${isHovered ? "scale-110" : ""}`}
              />
              {isPredictedWinner(fight.fighter_b_name) && (
                <div className="absolute -top-1 -left-1 bg-success text-white rounded-full p-1 animate-pulse">
                  <Shield size={14} fill="currentColor" />
                </div>
              )}
            </div>
            <div className={`flex-1 ${isPredictedWinner(fight.fighter_a_name) ? "text-right" : "text-left"}`}>
              <h3 className="text-base font-bold text-foreground leading-tight">{fight.fighter_b_name}</h3>
              {fight.fighter_b_profile?.record && (
                <p className="text-xs text-muted-foreground font-mono mt-0.5">{fight.fighter_b_profile.record}</p>
              )}
              <p className="text-xs text-muted-foreground mt-0.5">
                <span className="font-mono">{formatOdds(fight.fighter_b_odds)}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-3">
          <div className="bg-success/20 border border-success/50 rounded-lg p-3 transition-all duration-300 hover:bg-success/30 hover:border-success hover:shadow-lg hover:scale-105">
            <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">Cagebot Pick</div>
            <div className="text-sm font-bold text-success break-words leading-tight">
              {predictedWinner || "Pending"}
            </div>
          </div>

          {/* Confidence */}
          <div className="card-elevated p-3 transition-all duration-300 hover:shadow-lg hover:scale-105">
            <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">Confidence</div>
            <div
              className={`text-lg font-mono font-bold ${hasConfidence ? getConfidenceColor(confidence) : "text-muted-foreground"}`}
            >
              {confidenceLabel}
            </div>
            <div className="mt-2 h-1.5 bg-secondary rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${hasConfidence ? getConfidenceBg(confidence) : "bg-secondary"}`}
                style={{ width: `${hasConfidence ? Math.min(Math.max(confidence, 0), 100) : 0}%` }}
              />
            </div>
          </div>

          {/* Edge vs Market */}
          <div className="card-elevated p-3 transition-all duration-300 hover:shadow-lg hover:scale-105">
            <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wide flex items-center gap-1">
              <TrendingUp size={12} />
              <span>Edge</span>
            </div>
            <div
              className={`text-lg font-bold ${hasEdge ? (edgeVsMarket >= 0 ? "text-success" : "text-danger") : "text-muted-foreground"}`}
            >
              {hasEdge ? (
                <>
                  {edgeVsMarket >= 0 ? "+" : ""}
                  {edgeVsMarket.toFixed(1)}%
                </>
              ) : (
                "--"
              )}
            </div>
          </div>
        </div>

        {/* View Analysis Button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-center gap-2 bg-secondary/30 hover:bg-accent/20 hover:border-accent transition-all duration-300 px-3 py-2 rounded-lg border border-border text-xs font-semibold text-foreground uppercase tracking-wide group"
        >
          <span>{expanded ? "Hide" : "View"} Analysis</span>
          <ChevronDown
            size={14}
            className={`transition-all duration-300 text-accent ${expanded ? "rotate-180" : ""} group-hover:scale-125`}
          />
        </button>

        {/* Analysis Section */}
        {expanded && (
          <div className="mt-3 p-3 bg-secondary/20 rounded-lg border border-border space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
            <div>
              <h4 className="text-xs font-semibold text-foreground uppercase tracking-wide mb-2">Model Analysis</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{analysis}</p>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-foreground uppercase tracking-wide mb-2">Key Edges</h4>
              {keyEdges.length ? (
                <ul className="space-y-1">
                  {keyEdges.map((edge, index) => (
                    <li
                      key={`${fight.id}-edge-${index}`}
                      className="text-sm text-muted-foreground flex items-start gap-2 transition-all duration-200 hover:text-foreground hover:translate-x-1"
                    >
                      <span className="text-accent mt-1">•</span>
                      <span>{edge}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">Key edges will be updated soon.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
