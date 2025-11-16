interface MetricCardProps {
  label: string
  value: string
  delta?: string
  deltaPositive?: boolean
}

export function MetricCard({ label, value, delta, deltaPositive = true }: MetricCardProps) {
  return (
    <div className="gh-card p-4 hover:border-accent/50 transition-colors">
      <div className="text-xs text-muted-foreground font-mono uppercase tracking-tight mb-2">{label}</div>
      <div className="stat-value mb-2">{value}</div>
      {delta && (
        <div className={`text-xs font-mono ${deltaPositive ? "text-accent" : "text-destructive"}`}>
          {deltaPositive ? "↑" : "↓"} {delta}
        </div>
      )}
    </div>
  )
}
