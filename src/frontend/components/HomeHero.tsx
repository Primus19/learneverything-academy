"use client"

import { motion } from "framer-motion"
import { Trophy, ArrowRight, BookOpen, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

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

export function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-background py-20 sm:py-32">
      <div className="absolute inset-0 bg-grid-primary/[0.02] bg-[size:20px_20px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background/50" />
      <motion.div 
        className="container px-4 md:px-6 relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col items-center text-center space-y-8">
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Trophy className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Leading Online Learning Platform</span>
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-3xl bg-gradient-to-br from-primary via-primary/80 to-primary/50 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Master the Skills That Drive Innovation
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Join thousands of learners worldwide and acquire cutting-edge skills from industry experts.
            Start your journey to excellence today.
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Link href="/courses">
              <Button size="lg" className="group bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                Browse Courses
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg" className="group">
                Learn More
                <ArrowRight className="ml-2 h-4 w-4 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl mt-8"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <motion.div 
              className="flex flex-col items-center p-6 rounded-xl bg-primary/[0.03] border border-primary/10 hover:bg-primary/[0.05] transition-colors"
              variants={item}
            >
              <BookOpen className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold mb-2">Expert Instructors</h3>
              <p className="text-sm text-muted-foreground text-center">
                Learn from industry professionals
              </p>
            </motion.div>
            <motion.div 
              className="flex flex-col items-center p-6 rounded-xl bg-primary/[0.03] border border-primary/10 hover:bg-primary/[0.05] transition-colors"
              variants={item}
            >
              <Users className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold mb-2">Active Community</h3>
              <p className="text-sm text-muted-foreground text-center">
                Connect with fellow learners
              </p>
            </motion.div>
            <motion.div 
              className="flex flex-col items-center p-6 rounded-xl bg-primary/[0.03] border border-primary/10 hover:bg-primary/[0.05] transition-colors"
              variants={item}
            >
              <Trophy className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold mb-2">Certification</h3>
              <p className="text-sm text-muted-foreground text-center">
                Earn recognized certificates
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}