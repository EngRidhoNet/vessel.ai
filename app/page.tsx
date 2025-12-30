import { redirect } from 'next/navigation'
import { createSupabaseServer } from '@/lib/supabase/server'

export default async function HomePage() {
  const supabase = await createSupabaseServer()
  const { data } = await supabase.auth.getUser()

  if (data.user) {
    redirect('/dashboard')
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="text-center space-y-8 px-4">
        <div className="space-y-4">
          <div className="inline-block">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
              vessel.ai
            </h1>
          </div>
          
          <p className="text-xl text-gray-600 max-w-md mx-auto">
            A visual space to think and create.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <a
            href="/login"
            className="group relative px-8 py-4 bg-black text-white rounded-xl font-medium overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <span className="relative z-10">Start thinking</span>
            <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-black opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
          
          <a
            href="#features"
            className="px-8 py-4 border-2 border-gray-200 rounded-xl font-medium hover:border-gray-300 hover:bg-gray-50 transition-all duration-300"
          >
            Learn more
          </a>
        </div>

        <div className="pt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="p-6 rounded-2xl bg-white/50 backdrop-blur border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-3">✨</div>
            <h3 className="font-semibold mb-2">Intuitive</h3>
            <p className="text-sm text-gray-600">Simple and clean interface</p>
          </div>
          
          <div className="p-6 rounded-2xl bg-white/50 backdrop-blur border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-3">🎨</div>
            <h3 className="font-semibold mb-2">Creative</h3>
            <p className="text-sm text-gray-600">Visual thinking space</p>
          </div>
          
          <div className="p-6 rounded-2xl bg-white/50 backdrop-blur border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-3">☁️</div>
            <h3 className="font-semibold mb-2">Cloud Sync</h3>
            <p className="text-sm text-gray-600">Access anywhere</p>
          </div>
        </div>
      </div>
    </main>
  )
}