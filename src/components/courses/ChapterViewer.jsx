'use client'

import React from 'react'
import MarkdownRenderer from "../../components/courses/MarkdownRenderer.jsx"
import { ArrowLeft, ArrowRight, BookOpen, Clock, Calendar } from 'lucide-react'
import Link from 'next/link'



const ChapterViewer = ({
  courseSlug,
  chapterIndex,
  title,
  content,
  nextChapter,
  prevChapter
}) => {
  // Track reading progress
  const [progress, setProgress] = React.useState(0)
  
  React.useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight - windowHeight
      const scrollTop = window.scrollY
      const newProgress = Math.min(Math.round((scrollTop / documentHeight) * 100), 100)
      setProgress(newProgress)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Estimate reading time (average reading speed words per minute)
  const wordCount = content.split(/\s+/).length
  const readingTime = Math.max(1, Math.ceil(wordCount / 200))

  return (
    <div className="bg-gray-900 min-h-screen pb-16">
      {/* Fixed progress bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
        <div 
          className="h-full bg-blue-600 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 sm-6 lg-8 pt-8">
        <div className="mb-8">
          <Link href={`/courses/${courseSlug}`} className="inline-flex items-center text-blue-400 hover-blue-300">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Course
          </Link>
          
          <h1 className="text-3xl font-extrabold text-white mt-4 mb-4">
            {title}
          </h1>
          
          <div className="flex flex-wrap items-center text-gray-400 text-sm mb-6 gap-4">
            <div className="flex items-center">
              <BookOpen className="h-4 w-4 mr-1" />
              Chapter {chapterIndex + 1}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {readingTime} min read</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              Last updated 2025</span>
            </div>
          </div>
          
          <div className="h-1 w-full bg-blue-600 rounded-full mb-8"></div>
        </div>
        
        {/* Table of Contents */}
        <div className="bg-gray-800 rounded-lg p-4 mb-8">
          <h3 className="text-white font-bold mb-2">In this chapter:</h3>
          <div className="text-gray-300 text-sm">
            {content.match(/^## (.*)/gm)?.map((heading, index) => (
              <div key={index} className="py-1">
                • {heading.replace('## ', '')}
              </div>
            ))}
          </div>
        </div>
        
        {/* Main content */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <MarkdownRenderer content={content} />
        </div>
        
        {/* Navigation buttons */}
        <div className="mt-12 pt-6 border-t border-gray-800 flex justify-between">
          {prevChapter !== null ? (
            <Link 
              href={`/courses/${courseSlug}/chapters/${prevChapter}`}
              className="inline-flex items-center px-4 py-2 bg-gray-800 text-white rounded-md hover-gray-700 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous Chapter
            </Link>
          ) : (
            </div>
          )}
          
          {nextChapter !== null ? (
            <Link 
              href={`/courses/${courseSlug}/chapters/${nextChapter}`}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover-blue-700 transition-colors"
            >
              Next Chapter
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          ) : (
            <Link 
              href={`/courses/${courseSlug}`}
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover-green-700 transition-colors"
            >
              Complete Course
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default ChapterViewer
