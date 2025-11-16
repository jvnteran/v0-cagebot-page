"use client"

import { LineChart, Line, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter } from "recharts"

export function PerformanceCharts() {
  const accuracyData = [
    { month: "Jan", accuracy: 74.2 },
    { month: "Feb", accuracy: 74.8 },
    { month: "Mar", accuracy: 75.1 },
    { month: "Apr", accuracy: 75.5 },
    { month: "May", accuracy: 75.9 },
    { month: "Jun", accuracy: 76.3 },
    { month: "Jul", accuracy: 76.9 },
  ]

  const calibrationData = [
    { predicted: 55, actual: 54 },
    { predicted: 60, actual: 61 },
    { predicted: 65, actual: 63 },
    { predicted: 70, actual: 71 },
    { predicted: 75, actual: 76 },
    { predicted: 80, actual: 82 },
    { predicted: 85, actual: 84 },
    { predicted: 90, actual: 89 },
  ]

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
      <div className="gh-card">
        <h3 className="text-lg font-semibold text-foreground mb-4">Rolling Accuracy Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={accuracyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--color-border))" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--color-card))",
                border: `1px solid hsl(var(--color-border))`,
                borderRadius: "8px",
              }}
              cursor={{ stroke: "hsl(var(--color-chart-4))" }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="accuracy"
              stroke="hsl(var(--color-chart-4))"
              dot={{ fill: "hsl(var(--color-chart-4))", r: 4 }}
              activeDot={{ r: 6 }}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="gh-card">
        <h3 className="text-lg font-semibold text-foreground mb-4">Calibration Plot</h3>
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--color-border))" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--color-card))",
                border: `1px solid hsl(var(--color-border))`,
                borderRadius: "8px",
              }}
            />
            <Scatter dataKey="actual" data={calibrationData} fill="hsl(var(--color-chart-4))" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
