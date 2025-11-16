export function Hero() {
  return (
    <section className="pt-32 pb-16 px-4 text-center">
      <h1 className="text-7xl font-black mb-6 font-mono tracking-tight">
        <span className="text-accent">UFC</span> FIGHTBOT v2.5
      </h1>
      <div className="max-w-3xl mx-auto mb-8">
        <p className="text-lg text-muted-foreground mb-4">
          Advanced AI-powered fight predictions with data-driven analysis
        </p>
        <code className="inline-block mb-4 bg-secondary/50 border border-accent/20 rounded px-3 py-1 text-accent text-xs font-mono tracking-wider">
          model_accuracy: 76.9%
        </code>
      </div>
      <div className="flex gap-4 justify-center flex-wrap">
        <button className="px-8 py-3 bg-accent text-accent-foreground font-mono font-bold rounded neon-glow neon-glow-hover transition-all hover:scale-105">
          → VIEW PREDICTIONS
        </button>
        <button className="px-8 py-3 terminal-border text-accent font-mono font-bold rounded neon-glow-hover transition-all hover:bg-accent/10">
          ⓘ LEARN MORE
        </button>
      </div>
    </section>
  )
}
