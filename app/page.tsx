import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Target, TrendingUp, Clock, Flame, Award, CheckCircle, AlertCircle, XCircle } from 'lucide-react'
import { FeaturedFightCard } from "@/components/featured-fight-card"
import { PredictionCard } from "@/components/prediction-card"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/30 via-emerald-950/10 to-black" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          {/* Live Status Badge */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-accent text-sm font-medium">Model is actively analyzing upcoming event: UFC Fight Night Qatar: Tsarukyan vs Hooker</span>
            </div>
          </div>

          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-card border border-border rounded-2xl">
              <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center relative">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.5 3L3 8.5V15.5L8.5 21H15.5L21 15.5V8.5L15.5 3H8.5Z" stroke="currentColor" strokeWidth="1.5" className="text-accent" fill="none"/>
                  <polyline points="7,17 10,14 13,16 17,12" stroke="currentColor" strokeWidth="1.5" className="text-accent" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-2xl font-bold text-foreground tracking-tight">Cagebot</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-foreground leading-tight">
              UFC Fight Predictions<br/>Powered by Machine Learning
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Our AI model has correctly predicted <span className="text-accent font-semibold">76.9%</span> of UFC fights. Get data-driven insights before every event.
            </p>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 mb-12 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle className="w-5 h-5 text-accent" />
                <span><span className="text-foreground font-semibold">12-3</span> in last 15 picks</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-border" />
              <div className="flex items-center gap-2 text-muted-foreground">
                <Flame className="w-5 h-5 text-orange-500" fill="currentColor" />
                <span><span className="text-foreground font-semibold">3 fight</span> win streak</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-border" />
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-5 h-5 text-blue-400" />
                <span>Updated <span className="text-foreground font-semibold">4 hours ago</span></span>
              </div>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              {/* Model Accuracy */}
              <div className="bg-card/50 backdrop-blur border border-border rounded-2xl p-6 hover:border-accent/30 transition-all group">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs text-muted-foreground uppercase tracking-wide">Model Accuracy</span>
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <CheckCircle className="w-5 h-5 text-accent" />
                  </div>
                </div>
                <div className="text-4xl font-bold text-foreground mb-2">76.9%</div>
                <div className="text-sm text-muted-foreground">Historical win rate</div>
                <div className="text-xs text-accent mt-2">↑ +2.1% this month</div>
              </div>

              {/* Brier Score */}
              <div className="bg-card/50 backdrop-blur border border-border rounded-2xl p-6 hover:border-accent/30 transition-all group">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs text-muted-foreground uppercase tracking-wide">Brier Score</span>
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <TrendingUp className="w-5 h-5 text-accent" />
                  </div>
                </div>
                <div className="text-4xl font-bold text-foreground mb-2">0.178</div>
                <div className="text-sm text-muted-foreground">Calibration metric</div>
              </div>

              {/* Total Predictions */}
              <div className="bg-card/50 backdrop-blur border border-border rounded-2xl p-6 hover:border-accent/30 transition-all group">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs text-muted-foreground uppercase tracking-wide">Total Predictions</span>
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Target className="w-5 h-5 text-accent" />
                  </div>
                </div>
                <div className="text-4xl font-bold text-foreground mb-2">1,247</div>
                <div className="text-sm text-muted-foreground">All events</div>
              </div>

              {/* ROI */}
              <div className="bg-card/50 backdrop-blur border border-border rounded-2xl p-6 hover:border-accent/30 transition-all group">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs text-muted-foreground uppercase tracking-wide">ROI</span>
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                    </svg>
                  </div>
                </div>
                <div className="text-4xl font-bold text-foreground mb-2">+4.2%</div>
                <div className="text-sm text-muted-foreground">Betting returns</div>
                <div className="text-xs text-accent mt-2">↑ +0.8%</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/predictions"
                className="px-8 py-4 rounded-xl bg-accent hover:bg-accent/90 transition-all text-background font-semibold"
              >
                View All Predictions
              </Link>
              <Link
                href="/performance"
                className="px-8 py-4 rounded-xl bg-secondary hover:bg-secondary/80 border border-border transition-all text-foreground font-semibold"
              >
                See Performance Data
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-border">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Problem */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 border border-destructive/20 mb-6">
              <AlertCircle className="w-4 h-4 text-destructive" />
              <span className="text-destructive font-medium text-sm">THE PROBLEM</span>
            </div>
            <h2 className="text-4xl text-foreground mb-6">
              MMA "Experts" Are Guessing
            </h2>
            <div className="space-y-4 mb-8">
              <p className="text-muted-foreground text-lg leading-relaxed">
                The so-called MMA gurus dominating social media rely on hot takes, gut feelings, and personal bias. The result? They're barely better than a coin flip.
              </p>
              <div className="bg-card rounded-xl p-6 border border-border">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-muted-foreground">Typical "Expert" Accuracy</span>
                  <span className="text-destructive text-3xl font-bold">~45%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-destructive to-red-600 rounded-full" style={{ width: '45%' }}></div>
                </div>
                <p className="text-muted-foreground text-sm mt-3">
                  Often worse than random chance, with zero accountability or transparency
                </p>
              </div>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">No transparency into their methodology</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">Cherry-pick wins, hide losses</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">Emotional bias toward popular fighters</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">No statistical backing or data analysis</span>
              </li>
            </ul>
          </div>

          {/* Solution */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
              <CheckCircle className="w-4 h-4 text-accent" />
              <span className="text-accent font-medium text-sm">THE SOLUTION</span>
            </div>
            <h2 className="text-4xl text-foreground mb-6">
              Data Beats Gut Feeling
            </h2>
            <div className="space-y-4 mb-8">
              <p className="text-muted-foreground text-lg leading-relaxed">
                Cagebot uses machine learning trained on 5,000+ historical UFC fights, analyzing 200+ features per fighter to deliver predictions you can trust.
              </p>
              <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl p-6 border border-accent/20">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-muted-foreground">Cagebot Model Accuracy (Current Month)</span>
                  <span className="text-accent text-3xl font-bold">76%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-accent to-accent rounded-full" style={{ width: '76%' }}></div>
                </div>
                <p className="text-accent/70 text-sm mt-3">
                  Verified across 1,247 predictions with full public accountability
                </p>
              </div>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">
                  <strong className="text-foreground">Complete transparency</strong> - see exactly how we arrive at predictions
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">
                  <strong className="text-foreground">Fully documented track record</strong> - every prediction is publicly tracked
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">
                  <strong className="text-foreground">Zero emotional bias</strong> - pure statistical analysis
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">
                  <strong className="text-foreground">200+ data points per fight</strong> - comprehensive fighter analysis
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Stats Comparison */}
        <div className="mt-16 pt-16 border-t border-border">
          <h3 className="text-2xl text-foreground text-center mb-12">The Numbers Don't Lie</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-accent mb-2">76%</div>
              <div className="text-muted-foreground mb-2">Overall Accuracy (Current Month)</div>
              <div className="text-muted-foreground/60 text-sm">1,247 predictions tracked</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-accent mb-2">+31%</div>
              <div className="text-muted-foreground mb-2">Better Than "Experts"</div>
              <div className="text-muted-foreground/60 text-sm">71% improvement over typical gurus</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-accent mb-2">100%</div>
              <div className="text-muted-foreground mb-2">Transparency</div>
              <div className="text-muted-foreground/60 text-sm">Every prediction publicly documented</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works & Value Props */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-border">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* How It Works */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                <Target className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-2xl text-foreground">How Our Model Works</h3>
            </div>
            <div className="space-y-6">
              {[
                { num: 1, title: "Data Collection & Aggregation", desc: "We aggregate fighter statistics, historical performance data, and betting odds from multiple trusted sources to create a comprehensive dataset." },
                { num: 2, title: "Advanced Feature Engineering", desc: "Our system extracts 200+ features including striking metrics, grappling stats, physical attributes, fight context, and historical trends." },
                { num: 3, title: "ML Model Prediction", desc: "An ensemble of gradient boosting models, trained on 5,000+ historical fights, generates probability predictions." },
                { num: 4, title: "Calibration & Validation", desc: "Predictions are calibrated using Platt scaling to ensure accurate confidence intervals and validated against market odds." }
              ].map((step) => (
                <div key={step.num} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent font-semibold">
                    {step.num}
                  </div>
                  <div>
                    <h4 className="text-foreground mb-2">{step.title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* What You Get */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <Award className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-2xl text-foreground">What You Get</h3>
            </div>
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="space-y-4">
                {[
                  { title: "Precise Win Probabilities", desc: "Percentage likelihood for each fighter based on comprehensive data analysis" },
                  { title: "Confidence Scores", desc: "Complete transparency into how certain the model is about each prediction" },
                  { title: "Betting Edge Detection", desc: "Compare model odds vs. market to identify potentially mispriced lines" },
                  { title: "Expected Value Calculations", desc: "Quantified profit potential for each pick based on market odds" },
                  { title: "Fight Analysis & Key Factors", desc: "Understand exactly why the model favors one fighter over another" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-3 h-3 text-accent" />
                    </div>
                    <div>
                      <div className="text-foreground font-medium mb-1">{item.title}</div>
                      <div className="text-muted-foreground text-sm">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof / Trust Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-border">
        <div className="text-center mb-12">
          <h2 className="text-3xl text-foreground mb-4">Why Fighters and Analysts Trust Cagebot</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We're not just another prediction site. We're building the Nate Silver of MMA.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-card rounded-xl p-8 border border-border text-center">
            <div className="w-16 h-16 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-6">
              <TrendingUp className="w-8 h-8 text-accent" />
            </div>
            <h4 className="text-xl text-foreground mb-3">Proven Track Record</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">
              76% accuracy across 1,200+ predictions. Consistently outperforms betting market odds with fully documented results.
            </p>
          </div>
          <div className="bg-card rounded-xl p-8 border border-border text-center">
            <div className="w-16 h-16 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto mb-6">
              <Target className="w-8 h-8 text-blue-400" />
            </div>
            <h4 className="text-xl text-foreground mb-3">Transparent Methodology</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">
              We show our work. Full transparency about model limitations, confidence intervals, and decision-making process.
            </p>
          </div>
          <div className="bg-card rounded-xl p-8 border border-border text-center">
            <div className="w-16 h-16 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mx-auto mb-6">
              <Award className="w-8 h-8 text-purple-400" />
            </div>
            <h4 className="text-xl text-foreground mb-3">Data-Driven Decisions</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Statistical analysis over subjective opinions. Our model removes bias and emotion from fight predictions.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
