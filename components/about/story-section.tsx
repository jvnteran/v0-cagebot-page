export function StorySection() {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-foreground">Our Story</h2>
        <div className="h-1 w-16 bg-accent rounded-full"></div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4 text-foreground leading-relaxed">
          <p>
            Fightbot started with a simple observation: UFC predictions were dominated by intuition and bias rather than
            data-driven analysis. We believed there had to be a better way.
          </p>
          <p>
            In 2023, our team of sports analysts, machine learning engineers, and fighting enthusiasts came together to
            build something different—a prediction model trained on years of fight data, fighter metrics, and historical
            outcomes.
          </p>
          <p>
            What began as a side project has evolved into one of the most accurate predictive models in the UFC
            community. Our commitment to transparency, accuracy, and continuous improvement drives everything we do.
          </p>
        </div>

        <div className="bg-card border gh-border rounded-lg p-6 space-y-4">
          <h3 className="font-semibold text-foreground">Our Mission</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            To provide accurate, transparent, and data-driven UFC predictions that empower fans and bettors to make
            informed decisions. We believe in the power of analytics and are dedicated to advancing sports prediction
            science.
          </p>

          <div className="pt-4 border-t gh-border">
            <h3 className="font-semibold text-foreground mb-2">What Sets Us Apart</h3>
            <ul className="text-muted-foreground text-sm space-y-2">
              <li>✓ Advanced machine learning models</li>
              <li>✓ Real-time fighter context integration</li>
              <li>✓ Transparent confidence scoring</li>
              <li>✓ Continuous model refinement</li>
              <li>✓ Community-driven insights</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
