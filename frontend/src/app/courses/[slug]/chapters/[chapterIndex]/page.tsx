'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import ChapterViewer from '@/components/courses/ChapterViewer'
import { getChapterContent } from '@/lib/markdown/loader'
import '@/app/markdown.css' // Import markdown styles

export default function ChapterPage() {
  const params = useParams()
  const slug = params?.slug as string
  const chapterIndexStr = params?.chapterIndex as string
  const chapterIndex = parseInt(chapterIndexStr, 10)
  
  const [chapterData, setChapterData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slug || isNaN(chapterIndex)) return

    async function loadChapter() {
      try {
        const chapter = await getChapterContent(slug, chapterIndex)
        if (chapter) {
          setChapterData(chapter)
        } else {
          setError('Chapter not found')
        }
      } catch (err) {
        console.error('Error loading chapter:', err)
        setError('Failed to load chapter data')
      } finally {
        setLoading(false)
      }
    }
    
    loadChapter()
  }, [slug, chapterIndex])

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-900">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-80px)]">
          <div className="text-white text-xl">Loading chapter...</div>
        </div>
      </main>
    )
  }

  if (error || !chapterData) {
    return (
      <main className="min-h-screen bg-gray-900">
        <Navbar />
        <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)]">
          <div className="text-white text-xl mb-4">{error || 'Chapter not found'}</div>
          <a href={`/courses/${slug}`} className="text-blue-400 hover:text-blue-300">
            Return to course
          </a>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-900">
      <Navbar />
      <ChapterViewer
        courseSlug={slug}
        chapterIndex={chapterIndex}
        title={chapterData.title}
        content={chapterData.content}
        nextChapter={chapterData.nextChapter}
        prevChapter={chapterData.prevChapter}
      />
    </main>
  )
}
