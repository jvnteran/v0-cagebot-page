"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

export function PremiumFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "How accurate is the model?",
      answer:
        "Our model currently achieves 76.9% accuracy on historical data. Accuracy varies by confidence level, with predictions above 80% confidence showing 88%+ accuracy rates.",
    },
    {
      question: "Can I use predictions for betting?",
      answer:
        "Our predictions are for educational and analytical purposes. Always gamble responsibly and never bet more than you can afford to lose.",
    },
    {
      question: "How often are predictions updated?",
      answer:
        "Predictions are updated daily with the latest fighter statistics, injury reports, and training camp information.",
    },
    {
      question: "Is there a refund policy?",
      answer: "Yes, we offer a 7-day money-back guarantee if you're not satisfied with Premium membership.",
    },
    {
      question: "Can I cancel anytime?",
      answer: "You can cancel your Premium subscription at any time. No questions asked.",
    },
  ]

  return (
    <section>
      <h3 className="text-2xl font-bold text-white mb-8">Frequently Asked Questions</h3>
      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden glow-accent-hover">
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-800 transition-colors"
            >
              <span className="text-left font-semibold text-white">{faq.question}</span>
              <ChevronDown
                size={20}
                className={`text-emerald-400 transition-transform flex-shrink-0 ${
                  openIndex === idx ? "rotate-180" : ""
                }`}
              />
            </button>
            {openIndex === idx && <div className="px-6 pb-4 border-t border-gray-800 text-gray-400">{faq.answer}</div>}
          </div>
        ))}
      </div>
    </section>
  )
}
