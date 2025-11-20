"use server"

import { createClient } from "@/lib/supabase/server"
import { headers } from "next/headers"

export async function signUp(formData: FormData) {
  const username = formData.get("username") as string
  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirmPassword") as string

  console.log("[v0] Signup attempt for:", email)

  // Validation
  if (!username || username.length < 3) {
    return { error: "Username must be at least 3 characters" }
  }

  if (!firstName || !lastName) {
    return { error: "Please enter your first and last name" }
  }

  if (password !== confirmPassword) {
    return { error: "Passwords do not match" }
  }

  if (password.length < 8) {
    return { error: "Password must be at least 8 characters" }
  }

  try {
    const supabase = await createClient()

    const headersList = await headers()
    const host = headersList.get("host") || ""
    const protocol = process.env.NODE_ENV === "development" ? "http" : "https"
    const origin = `${protocol}://${host}`
    const redirectTo = `${origin}/auth/callback`

    console.log("[v0] Signup redirectTo:", redirectTo)
    console.log("[v0] User metadata:", { username, first_name: firstName, last_name: lastName })

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectTo,
        data: {
          username,
          first_name: firstName,
          last_name: lastName,
          full_name: `${firstName} ${lastName}`,
        },
      },
    })

    console.log("[v0] Supabase response - data:", data)
    console.log("[v0] Supabase response - error:", error)

    if (error) {
      console.error("[v0] Signup error from Supabase:", error)
      return { error: error.message }
    }

    // Check if email confirmation is required
    if (data?.user && !data?.session) {
      console.log("[v0] User created, email confirmation required")
      return { success: true, requiresConfirmation: true }
    }

    // User is signed in immediately
    console.log("[v0] User created and signed in immediately")
    return { success: true, requiresConfirmation: false }
  } catch (error: any) {
    console.error("[v0] Unexpected signup error:", error)
    return { error: error.message || "An unexpected error occurred" }
  }
}
