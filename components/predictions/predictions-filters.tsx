"use client"

import { useState } from "react"

export function PredictionsFilters() {
  const [minConfidence, setMinConfidence] = useState(50)
  const [minEdge, setMinEdge] = useState(0)

  return (
    <div className="gh-card mb-8 glow-accent">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-4">
            Min Confidence: {minConfidence}%
          </label>
          <input
            type="range"
            min="50"
            max="95"
            value={minConfidence}
            onChange={(e) => setMinConfidence(Number(e.target.value))}
            className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-accent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-4">Min Edge: {minEdge}%</label>
          <input
            type="range"
            min="0"
            max="20"
            value={minEdge}
            onChange={(e) => setMinEdge(Number(e.target.value))}
            className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-accent"
          />
        </div>
      </div>
    </div>
  )
}
