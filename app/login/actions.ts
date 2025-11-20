"use server"

import { createClient } from "@/lib/supabase/server"

export async function signInWithEmailOrUsername(emailOrUsername: string, password: string) {
  try {
    const supabase = await createClient()

    // Check if input looks like an email
    const isEmail = emailOrUsername.includes("@")

    if (isEmail) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: emailOrUsername,
        password,
      })

      if (error) throw error
      return { success: true, data }
    } else {
      const { data: userData, error: lookupError } = await supabase
        .from("users")
        .select("email")
        .eq("username", emailOrUsername)
        .single()

      if (lookupError || !userData) {
        throw new Error("Username not found")
      }

      // Sign in with the found email
      const { data, error } = await supabase.auth.signInWithPassword({
        email: userData.email,
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
