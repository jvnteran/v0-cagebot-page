"use client"

import { useState } from "react"
import { ChevronDown, TrendingUp, Shield, CheckCircle2, XCircle } from "lucide-react"
import Image from "next/image"
import type { FightWithRelations } from "@/lib/types/schema"

interface UFCFightCardProps {
  fight: FightWithRelations
  fightNumber: number
  isCompleted?: boolean
}

export function UFCFightCard({ fight, fightNumber, isCompleted = false }: UFCFightCardProps) {
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

  const result = fight.results?.[0]
  const actualWinner = result?.winner
  const wasCorrect = isCompleted && actualWinner === predictedWinner
  const wasIncorrect = isCompleted && actualWinner && actualWinner !== predictedWinner

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
  const isActualWinner = (name: string) => actualWinner === name
  const confidenceLabel = hasConfidence ? `${confidence.toFixed(1)}%` : "--"

  return (
    <div
      className="card-elevated overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`bg-gradient-to-r from-accent/5 via-accent/10 to-accent/5 px-6 py-3 border-b border-border transition-all duration-300 ${isHovered ? "from-accent/10 via-accent/20 to-accent/10" : ""}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm font-mono font-bold text-muted-foreground">FIGHT #{fightNumber}</span>
            <span className="text-sm font-bold text-foreground uppercase tracking-wide">
              {fight.weight_class ?? "TBD"}
            </span>
          </div>
          {isCompleted && (
            <div
              className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold ${wasCorrect ? "bg-success/20 text-success" : wasIncorrect ? "bg-danger/20 text-danger" : "bg-muted/20 text-muted-foreground"}`}
            >
              {wasCorrect && <CheckCircle2 size={14} />}
              {wasIncorrect && <XCircle size={14} />}
              <span>{wasCorrect ? "CORRECT" : wasIncorrect ? "INCORRECT" : "PENDING"}</span>
            </div>
          )}
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-[1fr_auto_1fr] gap-6 items-center mb-6">
          {/* Fighter A */}
          <div
            className={`flex items-center gap-4 ${isPredictedWinner(fight.fighter_a_name) ? "" : "flex-row-reverse"}`}
          >
            <div className="relative flex-shrink-0">
              <Image
                src={getImage(fight.fighter_a_image_url, fight.fighter_a_profile?.image_url) || "/placeholder.svg"}
                alt={fight.fighter_a_name}
                width={96}
                height={96}
                className={`rounded-full border-4 object-cover transition-all duration-300 ${
                  isActualWinner(fight.fighter_a_name)
                    ? "border-success shadow-lg shadow-success/50"
                    : isPredictedWinner(fight.fighter_a_name)
                      ? "border-accent"
                      : "border-border"
                } ${isHovered ? "scale-110" : ""}`}
              />
              {isActualWinner(fight.fighter_a_name) && (
                <div className="absolute -bottom-1 -right-1 bg-success text-white rounded-full p-1.5">
                  <CheckCircle2 size={16} fill="currentColor" />
                </div>
              )}
              {isPredictedWinner(fight.fighter_a_name) && !isCompleted && (
                <div className="absolute -top-1 -right-1 bg-accent text-background rounded-full p-1.5 animate-pulse">
                  <Shield size={16} fill="currentColor" />
                </div>
              )}
            </div>
            <div className={`flex-1 ${isPredictedWinner(fight.fighter_a_name) ? "text-left" : "text-right"}`}>
              <h3 className="text-lg font-bold text-foreground leading-tight">{fight.fighter_a_name}</h3>
              {fight.fighter_a_profile?.record && (
                <p className="text-sm text-muted-foreground font-mono mt-1">{fight.fighter_a_profile.record}</p>
              )}
              <p className="text-base font-bold text-accent mt-1.5">
                <span className="font-mono">{formatOdds(fight.fighter_a_odds)}</span>
              </p>
            </div>
          </div>

          {/* VS Section */}
          <div
            className={`text-2xl font-bold text-muted-foreground px-4 transition-all duration-300 ${isHovered ? "text-accent scale-125" : ""}`}
          >
            VS
          </div>

          {/* Fighter B */}
          <div
            className={`flex items-center gap-4 ${isPredictedWinner(fight.fighter_a_name) ? "flex-row-reverse" : ""}`}
          >
            <div className="relative flex-shrink-0">
              <Image
                src={getImage(fight.fighter_b_image_url, fight.fighter_b_profile?.image_url) || "/placeholder.svg"}
                alt={fight.fighter_b_name}
                width={96}
                height={96}
                className={`rounded-full border-4 object-cover transition-all duration-300 ${
                  isActualWinner(fight.fighter_b_name)
                    ? "border-success shadow-lg shadow-success/50"
                    : isPredictedWinner(fight.fighter_b_name)
                      ? "border-accent"
                      : "border-border"
                } ${isHovered ? "scale-110" : ""}`}
              />
              {isActualWinner(fight.fighter_b_name) && (
                <div className="absolute -bottom-1 -left-1 bg-success text-white rounded-full p-1.5">
                  <CheckCircle2 size={16} fill="currentColor" />
                </div>
              )}
              {isPredictedWinner(fight.fighter_b_name) && !isCompleted && (
                <div className="absolute -top-1 -left-1 bg-accent text-background rounded-full p-1.5 animate-pulse">
                  <Shield size={16} fill="currentColor" />
                </div>
              )}
            </div>
            <div className={`flex-1 ${isPredictedWinner(fight.fighter_a_name) ? "text-right" : "text-left"}`}>
              <h3 className="text-lg font-bold text-foreground leading-tight">{fight.fighter_b_name}</h3>
              {fight.fighter_b_profile?.record && (
                <p className="text-sm text-muted-foreground font-mono mt-1">{fight.fighter_b_profile.record}</p>
              )}
              <p className="text-base font-bold text-accent mt-1.5">
                <span className="font-mono">{formatOdds(fight.fighter_b_odds)}</span>
              </p>
            </div>
          </div>
        </div>

        {isCompleted && result && (
          <div
            className={`mb-4 p-4 rounded-lg border ${wasCorrect ? "bg-success/10 border-success/50" : "bg-danger/10 border-danger/50"}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-bold text-foreground mb-1">
                  <span className="text-success">{actualWinner}</span> def.{" "}
                  {actualWinner === fight.fighter_a_name ? fight.fighter_b_name : fight.fighter_a_name}
                </div>
                <div className="text-xs text-muted-foreground">
                  via {result.method}
                  {result.round ? ` • Round ${result.round}` : ""}
                  {result.time ? ` • ${result.time}` : ""}
                </div>
              </div>
              <div className={`text-sm font-bold ${wasCorrect ? "text-success" : "text-danger"}`}>
                Model {wasCorrect ? "WIN" : "LOSS"}
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-3 gap-4 mb-4">
          {/* Cagebot Pick */}
          <div
            className={`border rounded-lg p-4 transition-all duration-300 hover:shadow-lg hover:scale-105 ${
              wasCorrect
                ? "bg-success/20 border-success/50"
                : wasIncorrect
                  ? "bg-danger/20 border-danger/50"
                  : "bg-success/20 border-success/50"
            }`}
          >
            <div className="text-xs text-muted-foreground mb-2 uppercase tracking-wide font-semibold">Cagebot Pick</div>
            <div
              className={`text-base font-bold break-words leading-tight ${wasCorrect ? "text-success" : wasIncorrect ? "text-danger" : "text-success"}`}
            >
              {predictedWinner || "Pending"}
            </div>
          </div>

          {/* Confidence */}
          <div className="card-elevated p-4 transition-all duration-300 hover:shadow-lg hover:scale-105">
            <div className="text-xs text-muted-foreground mb-2 uppercase tracking-wide font-semibold">Confidence</div>
            <div className="flex items-center justify-between gap-3">
              <div
                className={`text-xl font-mono font-bold ${hasConfidence ? getConfidenceColor(confidence) : "text-muted-foreground"}`}
              >
                {confidenceLabel}
              </div>
              {hasConfidence && (
                <div className="relative h-12 w-12 flex-shrink-0">
                  <svg className="transform -rotate-90" viewBox="0 0 36 36">
                    <circle
                      cx="18"
                      cy="18"
                      r="16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      className="text-muted/20"
                    />
                    <circle
                      cx="18"
                      cy="18"
                      r="16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeDasharray={`${2 * Math.PI * 16}`}
                      strokeDashoffset={`${2 * Math.PI * 16 * (1 - confidence / 100)}`}
                      className={`transition-all duration-500 ${
                        confidence >= 70 ? "text-success" : confidence >= 60 ? "text-warning" : "text-danger"
                      }`}
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* Edge vs Market */}
          <div className="card-elevated p-4 transition-all duration-300 hover:shadow-lg hover:scale-105">
            <div className="text-xs text-muted-foreground mb-2 uppercase tracking-wide font-semibold flex items-center gap-1.5">
              <TrendingUp size={14} />
              <span>Edge</span>
            </div>
            <div
              className={`text-xl font-mono font-bold ${hasEdge ? (edgeVsMarket >= 0 ? "text-success" : "text-danger") : "text-muted-foreground"}`}
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
          className="w-full flex items-center justify-center gap-2 bg-secondary/30 hover:bg-accent/20 hover:border-accent transition-all duration-300 px-4 py-3 rounded-lg border border-border text-sm font-bold text-foreground uppercase tracking-wide group"
        >
          <span>{expanded ? "Hide" : "View"} Analysis</span>
          <ChevronDown
            size={16}
            className={`transition-all duration-300 text-accent ${expanded ? "rotate-180" : ""} group-hover:scale-125`}
          />
        </button>

        {/* Analysis Section */}
        {expanded && (
          <div className="mt-4 p-4 bg-secondary/20 rounded-lg border border-border space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <div>
              <h4 className="text-sm font-bold text-foreground uppercase tracking-wide mb-2">Model Analysis</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{analysis}</p>
            </div>

            <div>
              <h4 className="text-sm font-bold text-foreground uppercase tracking-wide mb-2">Key Edges</h4>
              {keyEdges.length ? (
                <ul className="space-y-2">
                  {keyEdges.map((edge, index) => (
                    <li
                      key={`${fight.id}-edge-${index}`}
                      className="text-sm text-muted-foreground flex items-start gap-2 transition-all duration-200 hover:text-foreground hover:translate-x-1"
                    >
                      <span className="text-accent mt-0.5 font-bold">•</span>
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
