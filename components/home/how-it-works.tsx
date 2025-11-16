export function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Data Collection",
      description: "Real-time fighter stats, historical records, and fight footage analysis",
    },
    { number: "02", title: "ML Processing", description: "Advanced algorithms analyze 50+ data points per fighter" },
    {
      number: "03",
      title: "Probability Generation",
      description: "Calibrated win probabilities with confidence intervals",
    },
    {
      number: "04",
      title: "Market Analysis",
      description: "Compare predictions against betting odds for edge identification",
    },
  ]

  return (
    <section>
      <h2 className="text-2xl font-bold mb-8">How It Works</h2>
      <div className="space-y-4">
        {steps.map((step) => (
          <div key={step.number} className="border-l-2 border-accent pl-4">
            <div className="text-accent font-bold text-sm">{step.number}</div>
            <h3 className="text-lg font-semibold text-foreground mb-1">{step.title}</h3>
            <p className="text-muted-foreground text-sm">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
