import { MetricCard } from "@/components/metric-card"

export function PerformanceMetrics() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
      <MetricCard label="Model Accuracy" value="76.9%" delta="2.3%" />
      <MetricCard label="Brier Score" value="0.178" delta="-0.012" />
      <MetricCard label="Calibration" value="94.2%" delta="1.8%" />
      <MetricCard label="Total Fights" value="1,247" />
    </section>
  )
}
