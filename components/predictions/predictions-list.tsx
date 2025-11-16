import { FightCard } from "@/components/fight-card"

export function PredictionsList() {
  const predictions = [
    {
      fighter1: "Silva",
      fighter2: "Dricus",
      pick: "Silva",
      probability: 71.2,
      edge: 7.8,
      analysis:
        "Silva's superior striking technique and ring control give competitive advantage. Experience factor significant.",
    },
    {
      fighter1: "Strickland",
      fighter2: "Dos Anjos",
      pick: "Strickland",
      probability: 62.1,
      edge: 4.5,
      analysis:
        "Close matchup with good value. Strickland's wrestling vs Dos Anjos accuracy. Slight edge to Strickland.",
    },
    {
      fighter1: "Khamzat",
      fighter2: "Holland",
      pick: "Khamzat",
      probability: 78.3,
      edge: 11.2,
      analysis: "Strong prediction. Khamzat's dominant grappling and athleticism overwhelms Holland's striking.",
    },
    {
      fighter1: "Ankalaev",
      fighter2: "Oezdemir",
      pick: "Ankalaev",
      probability: 68.9,
      edge: 6.3,
      analysis: "Ankalaev trending up. Oezdemir declining. Physical attributes favor Ankalaev significantly.",
    },
  ]

  return (
    <div className="space-y-6">
      {predictions.map((pred, idx) => (
        <FightCard key={idx} {...pred} />
      ))}
    </div>
  )
}
