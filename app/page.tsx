import { Hero } from "@/src/frontend/components/Hero"
import { CourseCard } from "@/src/frontend/components/CourseCard"
import { courses } from "@/src/courses/data"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  const featuredCourses = courses.slice(0, 3)

  return (
    <div>
      <Hero />
      
      <section className="py-16 bg-muted/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Courses</h2>
            <p className="text-muted-foreground">
              Explore our most popular courses and start learning today
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/courses">
              <Button size="lg">View All Courses</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-muted-foreground">
              Learn from industry experts and advance your career
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Expert Instructors</h3>
              <p className="text-muted-foreground">
                Learn from professionals with real-world experience
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Flexible Learning</h3>
              <p className="text-muted-foreground">
                Study at your own pace with lifetime access
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Career Support</h3>
              <p className="text-muted-foreground">
                Get guidance and resources to advance your career
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}