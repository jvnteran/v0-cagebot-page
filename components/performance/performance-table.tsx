export function PerformanceTable() {
  const buckets = [
    { range: "50-60%", wins: 185, losses: 210, accuracy: 46.8 },
    { range: "60-70%", wins: 312, losses: 168, accuracy: 65.0 },
    { range: "70-80%", wins: 428, losses: 92, accuracy: 82.3 },
    { range: "80-90%", wins: 234, losses: 32, accuracy: 88.0 },
    { range: "90%+", wins: 85, losses: 8, accuracy: 91.4 },
  ]

  return (
    <div className="gh-card overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border bg-secondary">
            <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Confidence Bucket</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Wins</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Losses</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Accuracy</th>
          </tr>
        </thead>
        <tbody>
          {buckets.map((bucket) => (
            <tr
              key={bucket.range}
              className="border-b border-border hover:bg-secondary hover:bg-opacity-50 transition-colors"
            >
              <td className="px-6 py-4 text-sm text-foreground">{bucket.range}</td>
              <td className="px-6 py-4 text-sm text-chart-4">{bucket.wins}</td>
              <td className="px-6 py-4 text-sm text-destructive">{bucket.losses}</td>
              <td className="px-6 py-4 text-sm font-semibold text-foreground">{bucket.accuracy}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
