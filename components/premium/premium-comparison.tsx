export function PremiumComparison() {
  const features = [
    { name: "Daily Predictions", free: true, premium: true },
    { name: "Confidence Scores", free: true, premium: true },
    { name: "Historical Data", free: true, premium: true },
    { name: "Performance Metrics", free: false, premium: true },
    { name: "Advanced Filtering", free: false, premium: true },
    { name: "Email Alerts", free: false, premium: true },
    { name: "Priority Support", free: false, premium: true },
    { name: "API Access", free: false, premium: true },
  ]

  return (
    <section className="mb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Free Tier */}
        <div className="gh-card p-8">
          <h3 className="text-2xl font-bold text-foreground mb-4">Free</h3>
          <p className="text-muted-foreground mb-8">Get started with basic predictions</p>
          <button className="w-full px-6 py-3 border border-accent text-accent font-semibold rounded-xl hover:bg-accent hover:text-accent-foreground transition-all mb-8">
            Get Started
          </button>
          <div className="space-y-4">
            {features.map((feature) => (
              <div key={feature.name} className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded ${feature.free ? "bg-accent" : "bg-secondary"}`} />
                <span className={feature.free ? "text-foreground" : "text-muted-foreground"}>{feature.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Premium Tier */}
        <div className="bg-gradient-to-b from-accent from-10% to-card border-2 border-accent rounded-xl p-8 relative glow-accent">
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-background px-4 py-1">
            <span className="text-accent font-semibold text-sm">RECOMMENDED</span>
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-4">Premium</h3>
          <p className="text-card-foreground mb-2">
            <span className="text-4xl font-bold text-accent-foreground">$19</span>
            <span className="text-muted-foreground">/month</span>
          </p>
          <p className="text-muted-foreground mb-8">Unlock advanced features and insights</p>
          <button className="w-full px-6 py-3 bg-accent text-accent-foreground font-semibold rounded-xl hover:shadow-lg hover:shadow-accent/40 transition-all mb-8">
            Subscribe Now
          </button>
          <div className="space-y-4">
            {features.map((feature) => (
              <div key={feature.name} className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded ${feature.premium ? "bg-accent" : "bg-secondary"}`} />
                <span className={feature.premium ? "text-foreground" : "text-muted-foreground"}>{feature.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
