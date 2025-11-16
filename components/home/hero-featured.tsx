"use client"

export function HeroFeatured() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="card-elevated border-2 border-accent/50 bg-gradient-to-br from-card to-secondary/30 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Fighter Images Placeholder */}
          <div className="flex gap-4 items-center justify-center">
            <div className="w-32 h-40 bg-secondary border-2 border-accent/20 rounded-lg flex items-center justify-center">
              <span className="text-sm text-muted-foreground">Fighter Photo</span>
            </div>
            <div className="text-2xl font-bold text-muted-foreground">vs</div>
            <div className="w-32 h-40 bg-secondary border-2 border-accent/20 rounded-lg flex items-center justify-center">
              <span className="text-sm text-muted-foreground">Fighter Photo</span>
            </div>
          </div>

          {/* Prediction Details */}
          <div className="flex flex-col justify-center">
            <div className="mb-6">
              <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-semibold uppercase rounded mb-4 border border-accent/30">
                Lock of the Event
              </span>
              <h2 className="text-3xl font-bold text-foreground mb-2">82% Confidence</h2>
              <p className="text-muted-foreground mb-4">Strong edge detected in fighter striking efficiency</p>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-secondary/50 rounded border border-border">
                <span className="stat-label">Model Prediction</span>
                <span className="font-bold text-accent">Fighter A to Win</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-secondary/50 rounded border border-border">
                <span className="stat-label">Edge vs Market</span>
                <span className="font-bold text-accent">+7.3%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
