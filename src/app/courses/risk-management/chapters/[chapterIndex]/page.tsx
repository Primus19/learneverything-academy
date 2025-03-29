'use client'

import React from 'react'
import { useParams, useRouter } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import ChapterNavigation from '@/components/courses/ChapterNavigation'
import MarkdownRenderer from '@/components/markdown/MarkdownRenderer'
import { getChapterContent, getCourseBySlug } from '@/lib/markdown/loader'

export default function ChapterPage() {
  const params = useParams()
  const router = useRouter()
  const [chapter, setChapter] = React.useState<any>(null)
  const [course, setCourse] = React.useState<any>(null)
  const [loading, setLoading] = React.useState(true)

  const courseSlug = 'risk-management'
  const chapterIndex = params?.chapterIndex ? parseInt(params.chapterIndex as string) : 0

  React.useEffect(() => {
    async function loadContent() {
      try {
        const [chapterData, courseData] = await Promise.all([
          getChapterContent(courseSlug, chapterIndex),
          getCourseBySlug(courseSlug)
        ])
        
        setChapter(chapterData)
        setCourse(courseData)
      } catch (error) {
        console.error('Error loading content:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadContent()
  }, [chapterIndex])

  const handlePrevChapter = () => {
    if (chapter?.prevChapter !== null) {
      router.push(`/courses/risk-management/chapters/${chapter.prevChapter}`)
    }
  }

  const handleNextChapter = () => {
    if (chapter?.nextChapter !== null) {
      router.push(`/courses/risk-management/chapters/${chapter.nextChapter}`)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded w-3/4 mb-6"></div>
            <div className="h-4 bg-gray-700 rounded w-full mb-4"></div>
            <div className="h-4 bg-gray-700 rounded w-5/6 mb-4"></div>
            <div className="h-4 bg-gray-700 rounded w-4/6 mb-8"></div>
            <div className="h-64 bg-gray-700 rounded w-full mb-6"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!chapter || !course) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-12 text-white">
          <h1 className="text-2xl font-bold mb-4">Content Not Found</h1>
          <p>The requested chapter could not be found. Please return to the course page.</p>
          <button 
            onClick={() => router.push('/courses/risk-management')}
            className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
          >
            Back to Course
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-gray-800 rounded-lg p-4 sticky top-8">
              <h3 className="text-xl font-bold text-white mb-4">{course.title}</h3>
              <div className="space-y-1">
                {course.chapters.map((courseChapter: any, index: number) => (
                  <a
                    key={index}
                    href={`/courses/risk-management/chapters/${index}`}
                    className={`block px-3 py-2 rounded-md text-sm ${
                      index === chapterIndex
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    {index + 1}. {courseChapter.title}
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          {/* Main content */}
          <div className="lg:w-3/4">
            <div className="bg-gray-800 rounded-lg p-6">
              <h1 className="text-3xl font-bold text-white mb-6">{chapter.title}</h1>
              
              <div className="prose prose-invert max-w-none">
                <MarkdownRenderer content={chapter.content} />
              </div>
              
              <ChapterNavigation 
                prevChapter={chapter.prevChapter !== null}
                nextChapter={chapter.nextChapter !== null}
                onPrevClick={handlePrevChapter}
                onNextClick={handleNextChapter}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
