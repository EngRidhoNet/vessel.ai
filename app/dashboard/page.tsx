'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type Canvas = {
  id: string
  title: string
  image: string | null
  content: string
  updatedAt: number
}

export default function DashboardPage() {
  const router = useRouter()
  const [canvases, setCanvases] = useState<Canvas[]>([])

  // Load all canvases from localStorage
  useEffect(() => {
    const items: Canvas[] = []

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && key.startsWith('canvas:')) {
        const raw = localStorage.getItem(key)
        if (raw) {
          try {
            items.push(JSON.parse(raw))
          } catch {}
        }
      }
    }

    // sort by last edited desc
    items.sort((a, b) => b.updatedAt - a.updatedAt)
    setCanvases(items)
  }, [])

  const createNewCanvas = () => {
    const id = crypto.randomUUID()
    router.push(`/canvas/${id}`)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 backdrop-blur bg-white/80">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            vessel.ai
          </h1>
          <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
            Sign out
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Your Dashboard
          </h2>
          <p className="text-gray-600">
            Create and manage your visual thinking spaces.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* New Canvas */}
          <button
            onClick={createNewCanvas}
            className="group relative aspect-[4/3] rounded-2xl border-2 border-dashed border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 transition-all duration-300 hover:shadow-xl"
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                +
              </div>
              <span className="font-semibold text-gray-700">New Canvas</span>
            </div>
          </button>

          {/* Existing Canvases */}
          {canvases.map((c) => (
            <button
              key={c.id}
              onClick={() => router.push(`/canvas/${c.id}`)}
              className="aspect-[4/3] rounded-2xl bg-white p-6 border border-gray-200 flex flex-col justify-between hover:shadow-xl transition-shadow text-left"
            >
              <div>
                <div className="text-sm text-gray-500 mb-2">
                  {new Date(c.updatedAt).toLocaleDateString()}
                </div>
                <h3 className="font-semibold text-gray-900 line-clamp-2">
                  {c.title || 'Untitled'}
                </h3>
              </div>

              <div className="text-sm text-gray-600 line-clamp-2">
                {c.content || 'No content yet'}
              </div>
            </button>
          ))}
        </div>

        {/* Empty state (when only New Canvas exists) */}
        {canvases.length === 0 && (
          <div className="mt-12 text-center text-gray-500">
            <p className="mb-2">This is your space.</p>
            <p>Start with your first canvas.</p>
          </div>
        )}
      </div>
    </main>
  )
}
