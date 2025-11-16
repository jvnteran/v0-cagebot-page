export function BlogsSection() {
  const blogs = [
    {
      title: "How We Build Our Prediction Models",
      date: "Nov 15, 2024",
      excerpt:
        "A deep dive into the machine learning techniques we use to analyze fighter data and predict UFC outcomes.",
      category: "Technical",
    },
    {
      title: "Top Factors That Influence Fight Outcomes",
      date: "Nov 12, 2024",
      excerpt: "Discover which fighter metrics have the strongest correlation with victory in the octagon.",
      category: "Analysis",
    },
    {
      title: "2024 Season Review: Our Best Predictions",
      date: "Nov 8, 2024",
      excerpt: "Reflecting on our most accurate predictions this season and what they teach us about the sport.",
      category: "Review",
    },
    {
      title: "The Rise of Data in Combat Sports",
      date: "Nov 1, 2024",
      excerpt: "How analytics is transforming the way we understand and predict mixed martial arts.",
      category: "Insights",
    },
  ]

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-foreground">Latest Articles</h2>
        <div className="h-1 w-16 bg-accent rounded-full"></div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {blogs.map((blog, idx) => (
          <article
            key={idx}
            className="bg-card border gh-border rounded-lg p-6 hover:border-accent/50 transition-colors cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-xs font-mono bg-accent/10 text-accent px-2 py-1 rounded">{blog.category}</span>
              <span className="text-xs text-muted-foreground">{blog.date}</span>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-accent transition-colors">
              {blog.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{blog.excerpt}</p>
            <div className="mt-4 pt-4 border-t gh-border">
              <p className="text-xs text-accent font-mono hover:underline">Read more →</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
