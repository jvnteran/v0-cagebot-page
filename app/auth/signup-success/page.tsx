import Link from "next/link"
import { CheckCircle2 } from 'lucide-react'

export default function SignupSuccessPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-accent" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-3">Check Your Email</h1>
          <p className="text-muted-foreground mb-8">
            We've sent you a confirmation email. Please click the link in the email to verify your account and complete the signup process.
          </p>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Didn't receive the email? Check your spam folder or contact support.
            </p>
            <Link
              href="/login"
              className="inline-block px-6 py-3 bg-accent text-background rounded-lg hover:opacity-90 transition-opacity font-semibold"
            >
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
