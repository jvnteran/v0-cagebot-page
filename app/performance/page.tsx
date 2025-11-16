'use client'

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import {
  LineChart,
  Line,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { BarChart3, Target, TrendingUp, Award, Shield } from 'lucide-react'

// Mock data
const accuracyData = [
  { month: 'Jan', accuracy: 74.2 },
  { month: 'Feb', accuracy: 75.1 },
  { month: 'Mar', accuracy: 73.8 },
  { month: 'Apr', accuracy: 76.4 },
  { month: 'May', accuracy: 77.2 },
  { month: 'Jun', accuracy: 75.9 },
  { month: 'Jul', accuracy: 76.8 },
  { month: 'Aug', accuracy: 77.5 },
  { month: 'Sep', accuracy: 76.3 },
  { month: 'Oct', accuracy: 78.1 },
  { month: 'Nov', accuracy: 76.9 },
]

const calibrationData = [
  { predicted: 50, actual: 48 },
  { predicted: 55, actual: 53 },
  { predicted: 60, actual: 59 },
  { predicted: 65, actual: 64 },
  { predicted: 70, actual: 71 },
  { predicted: 75, actual: 76 },
  { predicted: 80, actual: 79 },
  { predicted: 85, actual: 86 },
  { predicted: 90, actual: 88 },
]

const bucketData = [
  { bucket: '50-60%', predictions: 287, accuracy: 55.4 },
  { bucket: '60-70%', predictions: 412, accuracy: 64.8 },
  { bucket: '70-80%', predictions: 348, accuracy: 73.6 },
  { bucket: '80-90%', predictions: 156, accuracy: 82.1 },
  { bucket: '90-100%', predictions: 44, accuracy: 90.9 },
]

const performanceByClass = [
  { weightClass: 'Heavyweight', accuracy: 78.5, count: 142 },
  { weightClass: 'Light Heavyweight', accuracy: 75.2, count: 156 },
  { weightClass: 'Middleweight', accuracy: 77.8, count: 198 },
  { weightClass: 'Welterweight', accuracy: 76.1, count: 245 },
  { weightClass: 'Lightweight', accuracy: 77.4, count: 312 },
  { weightClass: 'Featherweight', accuracy: 75.9, count: 194 },
]

export default function PerformancePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-accent/20 border border-accent/20 flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h1 className="text-4xl lg:text-5xl text-foreground font-bold">
                Model Performance
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                Complete transparency into our track record and methodology
              </p>
            </div>
          </div>
        </div>

        {/* Summary Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <MetricCardNew
            label="Overall Accuracy"
            value="76.9%"
            description="1,247 predictions"
            icon={Target}
            trend="up"
            trendValue="+2.1% this month"
          />
          <MetricCardNew
            label="Brier Score"
            value="0.178"
            description="Lower is better"
            icon={Shield}
          />
          <MetricCardNew
            label="Log Loss"
            value="0.512"
            description="Probability calibration"
            icon={TrendingUp}
          />
          <MetricCardNew
            label="Sharpe Ratio"
            value="1.34"
            description="Risk-adjusted returns"
            icon={Award}
          />
        </div>

        {/* Recent Performance Highlight */}
        <div className="bg-card border border-accent/20 rounded-xl p-6 mb-12 bg-gradient-to-br from-accent/10 to-accent/5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-accent font-semibold mb-1">Last 15 Predictions</div>
              <div className="text-3xl text-foreground mb-2 font-bold">12-3 Record (80%)</div>
              <div className="text-muted-foreground text-sm">Currently on a 3-fight win streak</div>
            </div>
            <div className="text-right">
              <div className="text-muted-foreground text-sm mb-1">Simulated ROI</div>
              <div className="text-2xl text-accent font-semibold">+$287</div>
              <div className="text-muted-foreground text-xs">Per $100 unit</div>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          {/* Accuracy Over Time Chart */}
          <div className="bg-[#0A0A0A] rounded-xl p-6 border border-white/5">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <h3 className="text-lg text-white">Accuracy Over Time</h3>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={accuracyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis
                  dataKey="month"
                  stroke="#ffffff40"
                  tick={{ fill: '#ffffff60', fontSize: 12 }}
                />
                <YAxis
                  stroke="#ffffff40"
                  tick={{ fill: '#ffffff60', fontSize: 12 }}
                  domain={[70, 80]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0A0A0A',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="accuracy"
                  stroke="#10B981"
                  strokeWidth={3}
                  dot={{ fill: '#10B981', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-white/50 text-xs mt-4">
              Consistent performance with improving trend in recent months
            </p>
          </div>

          {/* Calibration Plot */}
          <div className="bg-[#0A0A0A] rounded-xl p-6 border border-white/5">
            <div className="flex items-center gap-2 mb-6">
              <Target className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg text-white">Calibration Plot</h3>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis
                  dataKey="predicted"
                  stroke="#ffffff40"
                  tick={{ fill: '#ffffff60', fontSize: 12 }}
                  label={{
                    value: 'Predicted Win %',
                    position: 'insideBottom',
                    offset: -5,
                    fill: '#ffffff60',
                    fontSize: 11,
                  }}
                />
                <YAxis
                  dataKey="actual"
                  stroke="#ffffff40"
                  tick={{ fill: '#ffffff60', fontSize: 12 }}
                  label={{
                    value: 'Actual Win %',
                    angle: -90,
                    position: 'insideLeft',
                    fill: '#ffffff60',
                    fontSize: 11,
                  }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0A0A0A',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                />
                <Scatter
                  data={calibrationData}
                  fill="#3B82F6"
                  line={{ stroke: '#3B82F6', strokeWidth: 2 }}
                />
                <Line
                  data={[
                    { predicted: 50, actual: 50 },
                    { predicted: 90, actual: 90 },
                  ]}
                  dataKey="actual"
                  stroke="#ffffff40"
                  strokeDasharray="5 5"
                  dot={false}
                />
              </ScatterChart>
            </ResponsiveContainer>
            <p className="text-white/50 text-xs mt-4">
              Points close to diagonal line indicate excellent calibration
            </p>
          </div>
        </div>

        {/* Accuracy by Confidence Bucket */}
        <div className="bg-card rounded-xl p-6 border border-border mb-12">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="w-5 h-5 text-accent" />
            <h3 className="text-lg text-foreground font-semibold">Accuracy by Confidence Level</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Confidence Range</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Predictions</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Accuracy</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Visual</th>
                </tr>
              </thead>
              <tbody>
                {bucketData.map((row, index) => (
                  <tr
                    key={index}
                    className="border-b border-border hover:bg-accent/5 transition-colors"
                  >
                    <td className="py-4 px-4 text-foreground">{row.bucket}</td>
                    <td className="py-4 px-4 text-muted-foreground">{row.predictions}</td>
                    <td className="py-4 px-4 text-accent font-semibold">{row.accuracy}%</td>
                    <td className="py-4 px-4">
                      <div className="w-full bg-secondary rounded-full h-3 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-accent to-accent h-3 rounded-full transition-all duration-500"
                          style={{ width: `${row.accuracy}%` }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground text-sm mt-6">
            Higher confidence predictions show proportionally higher accuracy, validating our model's confidence estimates
          </p>
        </div>

        {/* Performance by Weight Class */}
        <div className="bg-card rounded-xl p-6 border border-border mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Award className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg text-foreground font-semibold">Performance by Weight Class</h3>
          </div>
          <div className="space-y-4">
            {performanceByClass.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-40 text-muted-foreground text-sm">{item.weightClass}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div className="h-3 bg-secondary rounded-full flex-1 mr-4 overflow-hidden">
                      <div
                        className="h-3 bg-gradient-to-r from-accent to-accent rounded-full"
                        style={{ width: `${item.accuracy}%` }}
                      />
                    </div>
                    <div className="text-accent font-semibold text-sm w-16 text-right">
                      {item.accuracy}%
                    </div>
                  </div>
                  <div className="text-muted-foreground text-xs">{item.count} predictions</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Two Column Stats */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-card rounded-xl p-6 border border-border">
            <h3 className="text-lg mb-6 text-foreground font-semibold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-accent" />
              Betting Performance
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span className="text-muted-foreground">Total Bets (simulated)</span>
                <span className="text-foreground font-semibold">1,247</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span className="text-muted-foreground">Win Rate</span>
                <span className="text-accent font-semibold">76.9%</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span className="text-muted-foreground">Average Odds</span>
                <span className="text-foreground font-semibold">-165</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span className="text-muted-foreground">ROI</span>
                <span className="text-accent font-semibold">+4.2%</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-muted-foreground">Profit (per $100 unit)</span>
                <span className="text-accent font-semibold text-lg">+$52.34</span>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl p-6 border border-border">
            <h3 className="text-lg mb-6 text-foreground font-semibold flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-400" />
              Model Strengths
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                </div>
                <div>
                  <div className="text-foreground font-medium mb-1">Championship Fights</div>
                  <div className="text-muted-foreground text-sm">81.2% accuracy on title bouts</div>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                </div>
                <div>
                  <div className="text-foreground font-medium mb-1">Grappling Matchups</div>
                  <div className="text-muted-foreground text-sm">Excels at predicting wrestling-heavy fights</div>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                </div>
                <div>
                  <div className="text-foreground font-medium mb-1">High Confidence Picks</div>
                  <div className="text-muted-foreground text-sm">85%+ accuracy when confidence {'>'} 75%</div>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                </div>
                <div>
                  <div className="text-foreground font-medium mb-1">Value Detection</div>
                  <div className="text-muted-foreground text-sm">Identifies mispriced lines vs public betting</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Methodology Section */}
        <div className="bg-card rounded-xl p-8 border border-border bg-gradient-to-br from-card to-secondary/30">
          <h3 className="text-2xl text-foreground font-bold mb-6">Our Methodology</h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div>
              <h4 className="text-foreground font-semibold mb-3">Data Sources</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>• UFC official statistics</li>
                <li>• Historical fight database (5,000+ fights)</li>
                <li>• Real-time betting odds</li>
                <li>• Fighter physical metrics</li>
                <li>• Training camp reports</li>
              </ul>
            </div>
            <div>
              <h4 className="text-foreground font-semibold mb-3">Model Architecture</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>• XGBoost ensemble</li>
                <li>• LightGBM for speed</li>
                <li>• 200+ engineered features</li>
                <li>• Platt scaling calibration</li>
                <li>• Cross-validation (5-fold)</li>
              </ul>
            </div>
            <div>
              <h4 className="text-foreground font-semibold mb-3">Key Features</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Striking accuracy & defense</li>
                <li>• Takedown metrics</li>
                <li>• Submission rates</li>
                <li>• Fight pace & cardio</li>
                <li>• Recent form & momentum</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}

function MetricCardNew({ label, value, description, icon: Icon, trend, trendValue }) {
  return (
    <div className="bg-card rounded-xl p-6 border border-border hover:border-accent/50 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="text-xs text-muted-foreground font-mono uppercase tracking-tight mb-2">{label}</div>
          <div className="font-mono text-2xl font-semibold text-foreground">{value}</div>
        </div>
        {Icon && <Icon className="w-5 h-5 text-accent/60" />}
      </div>
      <div className="text-xs text-muted-foreground">{description}</div>
      {trend && (
        <div className="text-xs text-accent mt-2 font-medium">{trendValue}</div>
      )}
    </div>
  )
}
