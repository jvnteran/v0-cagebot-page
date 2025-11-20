"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Menu, LogOut } from "lucide-react"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"

export function Navigation() {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()

    // Get initial user
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      setIsLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  const links = [
    { href: "/predictions", label: "Predictions" },
    { href: "/performance", label: "Performance" },
    { href: "/premium", label: "Premium" },
    { href: "/about", label: "About" },
  ]

  const getUserDisplayName = () => {
    if (!user) return null
    // Try to get username from user_metadata, fallback to email
    const username = user.user_metadata?.username || user.user_metadata?.full_name
    if (username) return username
    // Fallback to email username (before @)
    return user.email?.split("@")[0]
  }

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8.5 3L3 8.5V15.5L8.5 21H15.5L21 15.5V8.5L15.5 3H8.5Z"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-accent"
                fill="none"
              />
              <polyline
                points="7,17 10,14 13,16 17,12"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-accent"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="font-bold text-foreground">Cagebot</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-6 items-center">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors ${
                pathname === link.href ? "text-accent font-semibold" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Auth Links */}
        {!isLoading && (
          <div className="hidden md:flex gap-3 items-center">
            {user ? (
              <>
                <span className="text-sm text-foreground font-medium">{getUserDisplayName()}</span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 text-sm bg-accent text-background rounded-lg hover:opacity-90 transition-opacity font-semibold"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}

        {/* Mobile Menu Button */}
        <button className="md:hidden text-foreground" onClick={() => setIsOpen(!isOpen)}>
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-card border-t border-border p-4 space-y-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block text-sm transition-colors ${
                pathname === link.href ? "text-accent font-semibold" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          {!isLoading && (
            <div className="border-t border-border pt-3 space-y-3">
              {user ? (
                <>
                  <span className="block text-sm text-foreground font-medium px-4">{getUserDisplayName()}</span>
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors text-left flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    className="block px-4 py-2 text-sm bg-accent text-background rounded-lg hover:opacity-90 transition-opacity font-semibold text-center"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </nav>
  )
}
