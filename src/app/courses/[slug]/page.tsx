'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Navbar from "../../../components/layout/Navbar"
import { ArrowLeft, BookOpen, Clock, Award, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { getCourseBySlug } from "../../../lib/markdown/loader"
import "../../../app/markdown.css" // Import markdown styles

export default function CoursePage() {
  const params = useParams()
  const slug = params?.slug as string
  const [courseData, setCourseData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) return

    async function loadCourse() {
      try {
        const course = await getCourseBySlug(slug)
        if (course) {
          setCourseData(course)
        } else {
          setError('Course not found')
        }
      } catch (err) {
        console.error('Error loading course:', err)
        setError('Failed to load course data')
      } finally {
        setLoading(false)
      }
    }
    
    loadCourse()
  }, [slug])

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-900">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-80px)]">
          <div className="text-white text-xl">Loading course...</div>
        </div>
      </main>
    )
  }

  if (error || !courseData) {
    return (
      <main className="min-h-screen bg-gray-900">
        <Navbar />
        <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)]">
          <div className="text-white text-xl mb-4">{error || 'Course not found'}</div>
          <Link href="/courses" className="text-blue-400 hover:text-blue-300">
            Return to courses
          </Link>
        </div>
      </main>
    )
  }

  // Calculate total lessons
  const totalLessons = courseData.chapters.reduce((total: number, chapter: any) => total + chapter.lessons.length, 0);

  return (
    <main className="min-h-screen bg-gray-900">
      <Navbar />
      
      {/* Course Header */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <Link href="/courses" className="inline-flex items-center text-blue-400 hover:text-blue-300">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Courses
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h1 className="text-3xl font-extrabold text-white sm:text-4xl mb-4">
                {courseData.title}
              </h1>
              <p className="text-xl text-gray-300 mb-6">
                {courseData.description}
              </p>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center text-gray-300">
                  <Award className="h-5 w-5 mr-2 text-blue-400" />
                  {courseData.level}
                </div>
                <div className="flex items-center text-gray-300">
                  <Clock className="h-5 w-5 mr-2 text-blue-400" />
                  {courseData.duration}
                </div>
                <div className="flex items-center text-gray-300">
                  <BookOpen className="h-5 w-5 mr-2 text-blue-400" />
                  {courseData.totalStudents} students
                </div>
              </div>
              
              <div className="flex items-center mb-8">
                <div className="h-12 w-12 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold mr-4">
                  {courseData.instructor.split(' ').map((n: string) => n[0]).join('')}
                </div>
                <div>
                  <p className="text-white font-medium">{courseData.instructor}</p>
                  <p className="text-gray-400">{courseData.instructorTitle}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
              {courseData.image && (
                <div className="mb-6 rounded-md overflow-hidden">
                  <img 
                    src={courseData.image} 
                    alt={courseData.title} 
                    className="w-full h-auto"
                  />
                </div>
              )}
              
              <div className="text-center mb-6">
                <p className="text-3xl font-bold text-white">{courseData.price}</p>
                <p className="text-gray-300 mt-1">Lifetime Access</p>
              </div>
              
              <button className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md mb-4 transition-colors">
                Purchase Course
              </button>
              
              <div className="space-y-3 mt-6">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-300">{courseData.duration} of video content</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-300">{courseData.chapters.length} chapters, {totalLessons} lessons</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-300">Downloadable code examples</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-300">Certificate of completion</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-300">Lifetime updates</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Course Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8">Course Content</h2>
          
          <div className="space-y-4">
            {courseData.chapters.map((chapter: any, chapterIndex: number) => (
              <div key={chapterIndex} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
                <div className="p-4 bg-gray-700 flex justify-between items-center">
                  <h3 className="text-lg font-medium text-white">
                    Chapter {chapterIndex + 1}: {chapter.title}
                  </h3>
                  <span className="text-gray-300 text-sm">{chapter.lessons.length} lessons</span>
                </div>
                <div className="p-4">
                  <ul className="space-y-2">
                    {chapter.lessons.map((lesson: string, lessonIndex: number) => (
                      <li key={lessonIndex} className="flex items-center text-gray-300 py-2 border-b border-gray-700 last:border-0">
                        <BookOpen className="h-4 w-4 mr-3 text-gray-400 flex-shrink-0" />
                        <span className="line-clamp-1">{lesson}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 text-right">
                    <Link 
                      href={`/courses/${slug}/chapters/${chapterIndex}`}
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                    >
                      Start Chapter
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* What You'll Learn */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8">What You'll Learn</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
              <p className="text-gray-300">Design and implement scalable, highly available architectures</p>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
              <p className="text-gray-300">Deploy and manage applications using modern services</p>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
              <p className="text-gray-300">Implement Infrastructure as Code using modern tools</p>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
              <p className="text-gray-300">Build serverless applications with modern technologies</p>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
              <p className="text-gray-300">Containerize applications and deploy them on orchestration platforms</p>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
              <p className="text-gray-300">Implement CI/CD pipelines using modern DevOps tools</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-600 bg-opacity-90">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Ready to advance your career?
          </h2>
          <p className="mt-3 max-w-md mx-auto text-xl text-white opacity-90">
            Join thousands of professionals who have transformed their careers with our courses.
          </p>
          <div className="mt-8 max-w-md mx-auto sm:flex sm:justify-center">
            <div className="rounded-md shadow">
              <a
                href="#"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 transition-colors"
              >
                Get Started Today
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
