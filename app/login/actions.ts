"use server"

import { createClient } from "@/lib/supabase/server"

export async function signInWithEmailOrUsername(emailOrUsername: string, password: string) {
  try {
    const supabase = await createClient()

    // Check if input looks like an email
    const isEmail = emailOrUsername.includes("@")

    if (isEmail) {
      // Direct sign in with email
      const { data, error } = await supabase.auth.signInWithPassword({
        email: emailOrUsername,
        password,
      })

      if (error) throw error
      return { success: true, data }
    } else {
      // Look up email by username in user metadata
      // We need to use the admin API to search users by metadata
      const {
        data: { users },
        error: searchError,
      } = await supabase.auth.admin.listUsers()

      if (searchError) throw searchError

      // Find user with matching username in metadata
      const user = users.find((u) => u.user_metadata?.username?.toLowerCase() === emailOrUsername.toLowerCase())

      if (!user || !user.email) {
        throw new Error("Username not found")
      }

      // Sign in with the found email
      const { data, error } = await supabase.auth.signInWithPassword({
        email: user.email,
        password,
      })

      if (error) throw error
      return { success: true, data }
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Invalid credentials",
    }
  }
}
