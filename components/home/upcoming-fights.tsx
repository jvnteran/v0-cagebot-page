import { FightCard } from "@/components/fight-card"

export function UpcomingFights() {
  const upcomingFights = [
    {
      fighter1: "Adesanya",
      fighter2: "Pereira",
      pick: "Adesanya",
      probability: 72.5,
      edge: 8.2,
      analysis: "Adesanya shows superior striking accuracy and distance management. Historical head-to-head advantage.",
    },
    {
      fighter1: "Volkanovski",
      fighter2: "Topuria",
      pick: "Topuria",
      probability: 65.3,
      edge: 5.1,
      analysis: "Topuria's recent form and wrestling advantage provide edge. Volkanovski aging trend noted.",
    },
    {
      fighter1: "Holloway",
      fighter2: "Giga",
      pick: "Holloway",
      probability: 58.7,
      edge: 2.3,
      analysis: "Competitive matchup. Holloway's experience vs Giga's physicality. Close prediction.",
    },
  ]

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8">Top 3 Upcoming Fights</h2>
      <div className="space-y-6">
        {upcomingFights.map((fight, idx) => (
          <FightCard key={idx} {...fight} />
        ))}
      </div>
    </section>
  )
}
