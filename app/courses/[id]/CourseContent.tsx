"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Clock, GraduationCap, List } from "lucide-react"
import { Course } from "@/src/courses/data"
import { InstructorCard } from "@/src/frontend/components/InstructorCard"
import { CurriculumAccordion } from "@/src/frontend/components/CurriculumAccordion"
import { CourseFeatures } from "@/src/frontend/components/CourseFeatures"
import { CourseObjectives } from "@/src/frontend/components/CourseObjectives"
import { CourseRequirements } from "@/src/frontend/components/CourseRequirements"

interface CourseContentProps {
  course: Course
}

export function CourseContent({ course }: CourseContentProps) {
  if (!course) {
    return <div>Course not found</div>
  }

  return (
    <div className="container py-8">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="relative w-full h-64 mb-4">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              <CardTitle>{course.title}</CardTitle>
              <CardDescription>{course.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  <span>{course.level}</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <List className="h-5 w-5" />
                    Topics Covered
                  </h3>
                  <ul className="list-disc list-inside">
                    {course.topics.map((topic) => (
                      <li key={topic}>{topic}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <CourseObjectives objectives={course.objectives} />
          <CourseRequirements requirements={course.requirements} />
          <CourseFeatures features={course.features} />
          
          <Card>
            <CardHeader>
              <CardTitle>Course Curriculum</CardTitle>
            </CardHeader>
            <CardContent>
              <CurriculumAccordion curriculum={course.curriculum} />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Course Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <span className="text-2xl font-bold">${course.price}</span>
                </div>
                <Button className="w-full">Enroll Now</Button>
              </div>
            </CardContent>
          </Card>

          <InstructorCard instructor={course.instructor} />
        </div>
      </div>
    </div>
  )
}