import { redirect } from 'next/navigation'
import { createSupabaseServer } from '@/lib/supabase/server'

export default async function DashboardPage() {
  const supabase = await createSupabaseServer()
  const { data } = await supabase.auth.getUser()

  if (!data.user) {
    redirect('/login')
  }

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-2xl font-semibold mb-4">
        Your Dashboard
      </h1>

      <p className="text-gray-600 mb-6">
        This is where your canvases will live.
      </p>

      <button className="px-4 py-2 rounded-md bg-black text-white">
        + New Canvas
      </button>
    </main>
  )
}
