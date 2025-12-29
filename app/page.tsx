import { redirect } from 'next/navigation'
import { createSupabaseServer } from '@/lib/supabase/server'

export default async function HomePage() {
  const supabase = await createSupabaseServer()
  const { data } = await supabase.auth.getUser()

  if (data.user) {
    redirect('/dashboard')
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-semibold">vessel.ai</h1>

        <p className="text-gray-500">
          A visual space to think and create.
        </p>

        <a
          href="/login"
          className="px-6 py-3 bg-black text-white rounded-md"
        >
          Start thinking
        </a>
      </div>
    </main>
  )
}
