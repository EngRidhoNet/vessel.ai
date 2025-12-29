'use client'

import { createSupabaseClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const supabase = createSupabaseClient()

  const loginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    })
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="w-[360px] border rounded-xl p-6 space-y-4">
        <h1 className="text-xl font-semibold">vessel.ai</h1>

        <p className="text-sm text-gray-500">
          Sign in to save and continue your thinking.
        </p>

        <button
          onClick={loginWithGoogle}
          className="w-full border rounded-md py-2 hover:bg-gray-50"
        >
          Continue with Google
        </button>
      </div>
    </main>
  )
}
