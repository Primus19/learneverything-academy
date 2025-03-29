'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import CourseHeader from '@/components/courses/CourseHeader'
import CourseContent from '@/components/courses/CourseContent'
import { getCourseBySlug } from '@/lib/markdown/loader'

export default function SOCCoursePage() {
  const router = useRouter()
  const [course, setCourse] = React.useState<any>(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    async function loadCourse() {
      try {
        const courseData = await getCourseBySlug('soc')
        setCourse(courseData)
      } catch (error) {
        console.error('Error loading course:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadCourse()
  }, [])

  const handleStartCourse = () => {
    router.push('/courses/soc/chapters/0')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading course...</div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Course not found</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <CourseHeader 
        title={course.title}
        description={course.description}
        image={course.image}
        instructor={course.instructor}
        instructorTitle={course.instructorTitle}
        level={course.level}
        duration={course.duration}
        totalStudents={course.totalStudents}
        lastUpdated={course.lastUpdated}
        price={course.price}
        onStartCourse={handleStartCourse}
      />
      
      <CourseContent 
        chapters={course.chapters}
        courseSlug="soc"
      />
    </div>
  )
}
