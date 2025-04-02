import { Button } from "@/components/ui/button"
import { GraduationCap, Users, Award } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <div className="relative isolate overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
          <div className="mt-24 sm:mt-32 lg:mt-16">
            <div className="inline-flex space-x-6">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold leading-6 text-primary ring-1 ring-inset ring-primary/10">
                What&apos;s new
              </span>
              <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-muted-foreground">
                <span>Just shipped v1.0</span>
              </span>
            </div>
          </div>
          <h1 className="mt-10 text-4xl font-bold tracking-tight sm:text-6xl">
            Learn Everything You Need to Succeed
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Master the skills that matter with our comprehensive courses taught by industry experts.
            Start your learning journey today and transform your career.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <Link href="/courses">
              <Button size="lg">Browse Courses</Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              <div className="flex flex-col items-center">
                <div className="rounded-2xl bg-primary/10 p-4">
                  <GraduationCap className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">Expert Instructors</h3>
                <p className="mt-2 text-center text-sm text-muted-foreground">
                  Learn from industry professionals
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="rounded-2xl bg-primary/10 p-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">Active Community</h3>
                <p className="mt-2 text-center text-sm text-muted-foreground">
                  Connect with fellow learners
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="rounded-2xl bg-primary/10 p-4">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">Certification</h3>
                <p className="mt-2 text-center text-sm text-muted-foreground">
                  Earn recognized certificates
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}