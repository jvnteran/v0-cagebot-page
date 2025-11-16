"use client"

import type React from "react"

import { useState } from "react"

export function ContactSection() {
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setFormState({ name: "", email: "", subject: "", message: "" })
      setSubmitted(false)
    }, 3000)
  }

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-foreground">Get In Touch</h2>
        <div className="h-1 w-16 bg-accent rounded-full"></div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          {submitted ? (
            <div className="bg-accent/10 border border-accent rounded-lg p-6 text-center space-y-2">
              <p className="font-semibold text-accent">Message received!</p>
              <p className="text-sm text-muted-foreground">Thanks for reaching out. We'll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="bg-card border gh-border rounded-lg px-4 py-3 text-foreground text-sm placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors"
                  required
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="bg-card border gh-border rounded-lg px-4 py-3 text-foreground text-sm placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors"
                  required
                />
              </div>
              <input
                type="text"
                placeholder="Subject"
                value={formState.subject}
                onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                className="w-full bg-card border gh-border rounded-lg px-4 py-3 text-foreground text-sm placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors"
                required
              />
              <textarea
                placeholder="Your Message"
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                rows={5}
                className="w-full bg-card border gh-border rounded-lg px-4 py-3 text-foreground text-sm placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors resize-none"
                required
              />
              <button
                type="submit"
                className="w-full bg-accent text-background font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity"
              >
                Send Message
              </button>
            </form>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-card border gh-border rounded-lg p-6 space-y-3">
            <h3 className="font-semibold text-foreground">Email</h3>
            <p className="text-muted-foreground text-sm">contact@fightbot.ai</p>
          </div>

          <div className="bg-card border gh-border rounded-lg p-6 space-y-3">
            <h3 className="font-semibold text-foreground">Social</h3>
            <div className="space-y-2 text-sm">
              <p className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                Twitter @fightbot_ai
              </p>
              <p className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                Discord Community
              </p>
              <p className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                LinkedIn Team
              </p>
            </div>
          </div>

          <div className="bg-card border gh-border rounded-lg p-6 space-y-3">
            <h3 className="font-semibold text-foreground">Hours</h3>
            <p className="text-muted-foreground text-sm">
              Available 24/7 for support
              <br />
              Response time: &lt; 2 hours
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
