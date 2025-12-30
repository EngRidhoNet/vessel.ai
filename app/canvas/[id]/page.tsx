'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

type Canvas = {
  id: string
  title: string
  image: string | null
  content: string
  updatedAt: number
}

export default function CanvasPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()

  const [canvas, setCanvas] = useState<Canvas | null>(null)
  const [isSaved, setIsSaved] = useState(true)

  /* ---------------------------------------------
   * Load or create canvas
   * -------------------------------------------*/
  useEffect(() => {
    if (!id) return

    const key = `canvas:${id}`
    const stored = localStorage.getItem(key)

    if (stored) {
      setCanvas(JSON.parse(stored))
    } else {
      const fresh: Canvas = {
        id,
        title: 'Untitled',
        image: null,
        content: '',
        updatedAt: Date.now(),
      }
      localStorage.setItem(key, JSON.stringify(fresh))
      setCanvas(fresh)
    }
  }, [id])

  /* ---------------------------------------------
   * Autosave (debounced)
   * -------------------------------------------*/
  useEffect(() => {
    if (!canvas) return

    setIsSaved(false)

    const timer = setTimeout(() => {
      localStorage.setItem(`canvas:${canvas.id}`, JSON.stringify(canvas))
      setIsSaved(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [canvas])

  /* ---------------------------------------------
   * Image handlers
   * -------------------------------------------*/
  const handleImageUpload = (file: File) => {
    const url = URL.createObjectURL(file)
    setCanvas({
      ...canvas!,
      image: url,
      updatedAt: Date.now(),
    })
  }

  const removeImage = () => {
    if (canvas?.image) {
      URL.revokeObjectURL(canvas.image)
    }
    setCanvas({
      ...canvas!,
      image: null,
      updatedAt: Date.now(),
    })
  }

  if (!canvas) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-gray-200">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <button
              onClick={() => router.push('/dashboard')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
            >
              <svg
                className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="font-medium">Dashboard</span>
            </button>

            <span
              className={`text-sm ${
                isSaved ? 'text-green-600' : 'text-gray-400'
              } transition-colors`}
            >
              {isSaved ? '✓ Saved' : 'Saving...'}
            </span>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          {/* Title */}
          <input
            value={canvas.title}
            onChange={(e) =>
              setCanvas({
                ...canvas,
                title: e.target.value,
                updatedAt: Date.now(),
              })
            }
            className="w-full text-3xl sm:text-4xl lg:text-5xl font-bold outline-none placeholder-gray-300 bg-transparent border-none focus:ring-0 px-0"
            placeholder="Untitled canvas"
          />

          {/* Meta */}
          <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500">
            <span>
              Last edited {new Date(canvas.updatedAt).toLocaleDateString()}
            </span>
            <span>•</span>
            <span>{canvas.content.length} characters</span>
          </div>

          {/* Image Section */}
          {!canvas.image ? (
            <label className="block group relative border-2 border-dashed border-gray-200 rounded-xl sm:rounded-2xl p-8 sm:p-12 text-center hover:border-gray-300 hover:bg-gray-50/50 transition-all cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) handleImageUpload(file)
                }}
              />

              <div className="space-y-3">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                  <svg
                    className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-700 text-sm sm:text-base">Add an image</p>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">Click to upload</p>
                </div>
              </div>
            </label>
          ) : (
            <div className="relative group">
              <img
                src={canvas.image}
                alt="Canvas visual"
                className="rounded-xl sm:rounded-2xl max-h-[300px] sm:max-h-[420px] w-full object-cover border border-gray-200"
              />

              <button
                onClick={removeImage}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 px-3 py-1.5 text-xs sm:text-sm bg-black/70 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/90"
              >
                Remove
              </button>
            </div>
          )}

          {/* Content Editor */}
          <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-4 sm:p-6 lg:p-8 shadow-sm hover:shadow-md transition-shadow">
            <textarea
              value={canvas.content}
              onChange={(e) =>
                setCanvas({
                  ...canvas,
                  content: e.target.value,
                  updatedAt: Date.now(),
                })
              }
              placeholder="Start thinking here…"
              className="w-full min-h-[400px] sm:min-h-[500px] resize-none text-base sm:text-lg leading-relaxed outline-none placeholder-gray-300 bg-transparent"
            />
          </div>
        </div>
      </main>
    </div>
  )
}