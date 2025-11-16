"use client"

export function FeaturedFightCard() {
  return (
    <div className="bg-card border border-accent/30 rounded-xl p-8">
      <div className="text-sm font-medium text-accent uppercase mb-4">Featured Pick</div>
      <h3 className="text-3xl text-foreground mb-6">Tom Aspinall vs Sergei Pavlovich</h3>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <p className="text-muted-foreground mb-4">Model Prediction</p>
          <p className="text-foreground text-2xl font-bold mb-6">Tom Aspinall wins with 71% confidence</p>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Aspinall's speed and technical grappling give him a significant advantage in this heavyweight clash.
          </p>
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-muted-foreground text-sm mb-2">Confidence Level</p>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-accent" style={{ width: '71%' }}></div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-muted-foreground text-xs">Edge vs Market</p>
              <p className="text-accent text-xl font-bold">+15%</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Expected Value</p>
              <p className="text-accent text-xl font-bold">1.58x</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
