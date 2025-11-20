import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Target, TrendingUp, Zap, BarChart3 } from 'lucide-react'
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm text-emerald-500 font-medium">
                Model is actively analyzing upcoming event: UFC Fight Night Qatar: Tsarukyan vs Hooker
              </span>
            </div>
            
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.5 3L3 8.5V15.5L8.5 21H15.5L21 15.5V8.5L15.5 3H8.5Z" stroke="currentColor" strokeWidth="1.5" className="text-emerald-500" fill="none"/>
                  <polyline points="7,17 10,14 13,16 17,12" stroke="currentColor" strokeWidth="1.5" className="text-emerald-500" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold text-foreground">
                Cagebot
              </h1>
              <span className="px-3 py-1 text-xs font-semibold bg-emerald-500 text-black rounded-full">
                76.9% Accuracy
              </span>
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
              UFC Fight Predictions Powered by Machine Learning
            </h2>
            
            <p className="text-xl text-muted-foreground mb-8 text-balance">
              Our AI model has correctly predicted <span className="text-emerald-500 font-semibold">76.9%</span> of UFC fights. Get data-driven insights before every event.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-black font-semibold">
                <Link href="/signup">
                  Get Started Free
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/predictions">
                  View Predictions
                </Link>
              </Button>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            <div className="bg-card border border-border rounded-xl p-6 backdrop-blur-sm relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
              <div className="absolute top-4 right-4">
                <Target className="w-5 h-5 text-emerald-500/50 group-hover:text-emerald-500 transition-colors" />
              </div>
              <div className="text-4xl font-bold text-foreground mb-2">76.9%</div>
              <div className="text-sm text-muted-foreground">Model Accuracy</div>
              <div className="text-xs text-emerald-500 mt-1">Historical win rate</div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 backdrop-blur-sm relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
              <div className="absolute top-4 right-4">
                <TrendingUp className="w-5 h-5 text-emerald-500/50 group-hover:text-emerald-500 transition-colors" />
              </div>
              <div className="text-4xl font-bold text-foreground mb-2">0.178</div>
              <div className="text-sm text-muted-foreground">Brier Score</div>
              <div className="text-xs text-emerald-500 mt-1">Calibration metric</div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 backdrop-blur-sm relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
              <div className="absolute top-4 right-4">
                <BarChart3 className="w-5 h-5 text-emerald-500/50 group-hover:text-emerald-500 transition-colors" />
              </div>
              <div className="text-4xl font-bold text-foreground mb-2">1,247</div>
              <div className="text-sm text-muted-foreground">Total Predictions</div>
              <div className="text-xs text-emerald-500 mt-1">All events</div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 backdrop-blur-sm relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
              <div className="absolute top-4 right-4">
                <Zap className="w-5 h-5 text-emerald-500/50 group-hover:text-emerald-500 transition-colors" />
              </div>
              <div className="text-4xl font-bold text-foreground mb-2">+4.2%</div>
              <div className="text-sm text-muted-foreground">ROI</div>
              <div className="text-xs text-emerald-500 mt-1">Betting returns</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Why Cagebot?
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Advanced machine learning models analyze thousands of data points to deliver accurate predictions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-background border border-border rounded-xl p-8">
              <div className="w-12 h-12 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-emerald-500" />
              </div>
              <h4 className="text-xl font-bold text-foreground mb-3">Data-Driven Analysis</h4>
              <p className="text-muted-foreground">
                Our models process fighter stats, historical performance, and betting market data to generate predictions
              </p>
            </div>

            <div className="bg-background border border-border rounded-xl p-8">
              <div className="w-12 h-12 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-emerald-500" />
              </div>
              <h4 className="text-xl font-bold text-foreground mb-3">Proven Track Record</h4>
              <p className="text-muted-foreground">
                76.9% accuracy across 1,247 predictions demonstrates consistent performance across all UFC events
              </p>
            </div>

            <div className="bg-background border border-border rounded-xl p-8">
              <div className="w-12 h-12 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-emerald-500" />
              </div>
              <h4 className="text-xl font-bold text-foreground mb-3">Real-Time Updates</h4>
              <p className="text-muted-foreground">
                Get updated predictions as new information becomes available leading up to each event
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
            Ready to make smarter predictions?
          </h3>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of users who trust Cagebot for UFC fight analysis
          </p>
          <Button asChild size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-black font-semibold">
            <Link href="/signup">
              Start Free Today
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  )
}
