import { MetricCard } from "@/components/metric-card"

export function MetricsOverview() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard label="Model Accuracy" value="76.9%" delta="2.3%" />
        <MetricCard label="Brier Score" value="0.178" delta="-0.012" />
        <MetricCard label="Total Predictions" value="1,247" />
        <MetricCard label="ROI" value="+4.2%" deltaPositive={true} />
      </div>
    </section>
  )
}
