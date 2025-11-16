export function WhatYouGet() {
  const features = [
    "Live fight predictions updated daily",
    "Confidence scores for each prediction",
    "Historical accuracy metrics",
    "Edge vs market analysis",
    "Performance calibration data",
    "Expandable fight analysis",
  ]

  return (
    <section>
      <h2 className="text-2xl font-bold mb-8">What You Get</h2>
      <ul className="space-y-3">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-3 text-card-foreground">
            <div className="w-5 h-5 rounded-full bg-accent flex-shrink-0 mt-1" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
