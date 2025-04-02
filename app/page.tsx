import { Hero } from "@/src/frontend/components/Hero"
import { CourseCard } from "@/src/frontend/components/CourseCard"
import { courses } from "@/src/courses/data"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, BookOpen, Users, Trophy, CheckCircle } from "lucide-react"

export default function Home() {
  const featuredCourses = courses.slice(0, 3)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background py-20 sm:py-32">
        <div className="absolute inset-0 bg-grid-primary/[0.02] bg-[size:20px_20px]" />
        <div className="container px-4 md:px-6 relative">
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10">
              <Trophy className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Leading Online Learning Platform</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-3xl bg-gradient-to-br from-primary via-primary/80 to-primary/50 bg-clip-text text-transparent">
              Master the Skills That Drive Innovation
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
              Join thousands of learners worldwide and acquire cutting-edge skills from industry experts.
              Start your journey to excellence today.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/courses">
                <Button size="lg" className="group">
                  Browse Courses
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl mt-8">
              <div className="flex flex-col items-center p-6 rounded-xl bg-primary/[0.03] border border-primary/10">
                <BookOpen className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-semibold mb-2">Expert Instructors</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Learn from industry professionals
                </p>
              </div>
              <div className="flex flex-col items-center p-6 rounded-xl bg-primary/[0.03] border border-primary/10">
                <Users className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-semibold mb-2">Active Community</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Connect with fellow learners
                </p>
              </div>
              <div className="flex flex-col items-center p-6 rounded-xl bg-primary/[0.03] border border-primary/10">
                <Trophy className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-semibold mb-2">Certification</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Earn recognized certificates
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="relative py-20 bg-muted/30">
        <div className="absolute inset-0 bg-grid-primary/[0.02] bg-[size:20px_20px]" />
        <div className="container px-4 md:px-6 relative">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Courses</h2>
            <p className="text-lg text-muted-foreground">
              Explore our most popular courses and start your learning journey today
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/courses">
              <Button size="lg" variant="outline">
                View All Courses
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-grid-primary/[0.02] bg-[size:20px_20px]" />
        <div className="container px-4 md:px-6 relative">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-lg text-muted-foreground">
              Learn from industry experts and advance your career with our comprehensive learning platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Comprehensive Curriculum",
                description: "Structured learning paths designed by industry experts",
                icon: BookOpen,
              },
              {
                title: "Hands-on Projects",
                description: "Apply your knowledge with real-world projects",
                icon: Trophy,
              },
              {
                title: "Career Support",
                description: "Get guidance and resources to advance your career",
                icon: Users,
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6 rounded-xl bg-primary/[0.03] border border-primary/10"
              >
                <feature.icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 bg-muted/30">
        <div className="absolute inset-0 bg-grid-primary/[0.02] bg-[size:20px_20px]" />
        <div className="container px-4 md:px-6 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of learners who have already taken the first step towards their future.
            </p>
            <Link href="/courses">
              <Button size="lg" className="group">
                Get Started Now
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}