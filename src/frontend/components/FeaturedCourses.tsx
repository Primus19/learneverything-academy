"use client"

import { motion } from "framer-motion"
import { CourseCard } from "@/src/frontend/components/CourseCard"
import { Course } from "@/src/lib/course-loader"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

interface FeaturedCoursesProps {
  courses: Course[]
}

export function FeaturedCourses({ courses }: FeaturedCoursesProps) {
  return (
    <section className="relative py-20 bg-muted/30">
      <div className="absolute inset-0 bg-grid-primary/[0.02] bg-[size:20px_20px]" />
      <div className="container px-4 md:px-6 relative">
        <motion.div 
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-4">Featured Courses</h2>
          <p className="text-lg text-muted-foreground">
            Explore our most popular courses and start your learning journey today
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {courses.map((course) => (
            <motion.div key={course.id} variants={item}>
              <CourseCard course={course} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Link href="/courses">
            <Button size="lg" variant="outline" className="group">
              View All Courses
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
