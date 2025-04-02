import { courses } from "@/src/courses/data"
import { CourseContent } from "./CourseContent"

export async function generateStaticParams() {
  return courses.map((course) => ({
    id: course.id,
  }))
}

export default function CoursePage({ params }: { params: { id: string } }) {
  const course = courses.find((c) => c.id === params.id)

  if (!course) {
    return (
      <div className="container py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
          <p className="text-muted-foreground">The requested course could not be found.</p>
        </div>
      </div>
    )
  }

  return <CourseContent course={course} />
}