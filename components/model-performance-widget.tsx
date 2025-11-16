"use client"

import { CheckCircle, TrendingUp, Clock } from "lucide-react"

export function ModelPerformanceWidget() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Win Record */}
        <div className="card-elevated p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="stat-label">Recent Record</p>
            <CheckCircle size={18} className="text-accent" />
          </div>
          <p className="text-3xl font-bold text-foreground mb-1">12-3</p>
          <p className="text-sm text-muted-foreground">Last 15 predictions</p>
        </div>

        {/* Win Streak */}
        <div className="card-elevated p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="stat-label">Current Streak</p>
            <TrendingUp size={18} className="text-accent" />
          </div>
          <p className="text-3xl font-bold text-accent mb-1">3 Wins</p>
          <p className="text-sm text-muted-foreground">Active winning streak</p>
        </div>

        {/* Last Update */}
        <div className="card-elevated p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="stat-label">Last Update</p>
            <Clock size={18} className="text-accent" />
          </div>
          <p className="text-3xl font-bold text-foreground mb-1">4h ago</p>
          <p className="text-sm text-muted-foreground">Model running live</p>
        </div>
      </div>
    </section>
  )
}
