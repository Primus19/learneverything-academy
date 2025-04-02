import { courses } from "@/src/courses/data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export default function CoursesPage() {
  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-8">Our Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id}>
            <CardHeader>
              <div className="relative w-full h-48 mb-4">
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
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">${course.price}</span>
                <span className="text-sm text-muted-foreground">{course.duration}</span>
              </div>
              <div className="mt-4">
                <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">
                  {course.level}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}