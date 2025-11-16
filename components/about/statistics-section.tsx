export function StatisticsSection() {
  const stats = [
    {
      label: "Prediction Accuracy",
      value: "67.2%",
      context: "vs. 50% baseline",
    },
    {
      label: "Fights Analyzed",
      value: "2,847",
      context: "across 5 years of UFC history",
    },
    {
      label: "Active Users",
      value: "12.4K",
      context: "and growing daily",
    },
    {
      label: "Premium Subscribers",
      value: "3.2K",
      context: "supporting our mission",
    },
    {
      label: "Correct Predictions",
      value: "1,908",
      context: "this season alone",
    },
    {
      label: "Model Updates",
      value: "52",
      context: "weekly refinements",
    },
  ]

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-foreground">By The Numbers</h2>
        <div className="h-1 w-16 bg-accent rounded-full"></div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-card border gh-border rounded-lg p-6 space-y-2 hover:border-accent/50 transition-colors"
          >
            <p className="text-muted-foreground text-sm font-mono">{stat.label}</p>
            <p className="text-3xl font-bold text-accent">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.context}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
