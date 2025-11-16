"use client"

import Link from "next/link"
import { TrendingUp } from "lucide-react"

export function Hero() {
  return (
    <section className="pt-24 pb-12 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="w-2 h-2 bg-accent rounded-full pulse-glow" />
          <span>Model Status: Active • 3 upcoming events</span>
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
            The Nate Silver
            <br />
            of MMA
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Transparent, data-driven UFC predictions. See the methodology, understand the edge, know your probability.
          </p>
        </div>

        <div className="flex gap-3 pt-2">
          <Link
            href="/predictions"
            className="px-6 py-3 bg-accent text-background font-semibold rounded-lg hover:bg-accent/90 transition-colors inline-flex items-center gap-2"
          >
            <TrendingUp size={20} />
            View This Week's Picks
          </Link>
          <Link
            href="/premium"
            className="px-6 py-3 border border-accent text-accent font-semibold rounded-lg hover:bg-accent/10 transition-colors"
          >
            Get Premium Access
          </Link>
        </div>
      </div>
    </section>
  )
}
