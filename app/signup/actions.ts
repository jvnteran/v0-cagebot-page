'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export async function signUp(formData: FormData) {
  const username = formData.get('username') as string
  const firstName = formData.get('firstName') as string
  const lastName = formData.get('lastName') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  console.log('[v0] Server action - signup started', { username, email })

  // Validation
  if (!username || username.length < 3) {
    return { error: 'Username must be at least 3 characters' }
  }

  if (!firstName || !lastName) {
    return { error: 'Please enter your first and last name' }
  }

  if (password !== confirmPassword) {
    return { error: 'Passwords do not match' }
  }

  if (password.length < 8) {
    return { error: 'Password must be at least 8 characters' }
  }

  try {
    const supabase = await createClient()
    
    const headersList = await headers()
    const origin = headersList.get('origin') || headersList.get('referer')?.split('/').slice(0, 3).join('/') || ''
    const redirectUrl = `${origin}/predictions`
    
    console.log('[v0] Signup redirect URL:', redirectUrl)

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
          first_name: firstName,
          last_name: lastName,
          full_name: `${firstName} ${lastName}`,
        }
      }
    })

    console.log('[v0] Supabase signup response:', { 
      hasUser: !!data?.user, 
      hasSession: !!data?.session, 
      error: error?.message 
    })

    if (error) {
      console.error('[v0] Signup error:', error)
      return { error: error.message }
    }

    // Check if email confirmation is required
    if (data?.user && !data?.session) {
      console.log('[v0] Email confirmation required, redirecting to success page')
      redirect('/auth/signup-success')
    }

    // User is signed in immediately
    console.log('[v0] User signed in, redirecting to predictions')
    redirect('/predictions')
  } catch (error: any) {
    console.error('[v0] Unexpected signup error:', error)
    return { error: error.message || 'An unexpected error occurred' }
  }
}
