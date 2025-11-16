import { Navigation } from "@/components/navigation"
import { PremiumComparison } from "@/components/premium/premium-comparison"
import { DonationSection } from "@/components/premium/donation-section"
import { PremiumFAQ } from "@/components/premium/premium-faq"
import { Footer } from "@/components/footer"

export default function PremiumPage() {
  return (
    <main className="min-h-screen bg-black">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 gradient-text">Premium</h1>
        <PremiumComparison />
        <DonationSection />
        <PremiumFAQ />
      </div>
      <Footer />
    </main>
  )
}
