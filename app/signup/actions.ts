"use server"

import { createClient } from "@/lib/supabase/server"

export async function signUp(formData: FormData) {
  const username = formData.get("username") as string
  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirmPassword") as string

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

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
          first_name: firstName,
          last_name: lastName,
          full_name: `${firstName} ${lastName}`,
        },
      },
    })

    if (error) {
      return { error: error.message }
    }

    // Check if email confirmation is required
    if (data?.user && !data?.session) {
      return { success: true, redirectTo: "/auth/signup-success" }
    }

    // User is signed in immediately
    return { success: true, redirectTo: "/predictions" }
  } catch (error: any) {
    return { error: error.message || "An unexpected error occurred" }
  }
}
