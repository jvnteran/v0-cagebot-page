import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { StorySection } from "@/components/about/story-section"
import { StatisticsSection } from "@/components/about/statistics-section"
import { BlogsSection } from "@/components/about/blogs-section"
import { ContactSection } from "@/components/about/contact-section"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-2 text-foreground">About Fightbot</h1>
        <p className="text-muted-foreground mb-16 text-lg">
          Learn about our mission, track record, and the team behind the predictions
        </p>

        <div className="space-y-24">
          <StorySection />
          <StatisticsSection />
          <BlogsSection />
          <ContactSection />
        </div>
      </div>
      <Footer />
    </main>
  )
}
