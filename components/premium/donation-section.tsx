export function DonationSection() {
  const tiers = [
    { amount: "$5", emoji: "☕" },
    { amount: "$10", emoji: "🍕" },
    { amount: "$25", emoji: "🍷" },
    { amount: "$50", emoji: "🦾" },
  ]

  return (
    <section className="mb-16 bg-gray-900 border border-gray-800 rounded-xl p-8">
      <h3 className="text-2xl font-bold text-white mb-4">Support Our Work</h3>
      <p className="text-gray-400 mb-8">Enjoyed our predictions? Support us through Ko-fi!</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {tiers.map((tier) => (
          <button
            key={tier.amount}
            className="bg-gray-800 hover:border-emerald-400 border border-gray-700 rounded-xl p-4 transition-all text-center glow-accent-hover"
          >
            <div className="text-3xl mb-2">{tier.emoji}</div>
            <div className="text-emerald-400 font-semibold">{tier.amount}</div>
          </button>
        ))}
      </div>
    </section>
  )
}
