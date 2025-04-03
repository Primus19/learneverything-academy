"use client"

import { motion } from "framer-motion"
import { BookOpen, Trophy, Users } from "lucide-react"

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

export function WhyChooseUs() {
  return (
    <section className="relative py-20">
      <div className="absolute inset-0 bg-grid-primary/[0.02] bg-[size:20px_20px]" />
      <div className="container px-4 md:px-6 relative">
        <motion.div 
          className="max-w-2xl mx-auto text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
          <p className="text-lg text-muted-foreground">
            Learn from industry experts and advance your career with our comprehensive learning platform
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
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
            <motion.div
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-xl bg-primary/[0.03] border border-primary/10 hover:bg-primary/[0.05] transition-colors"
              variants={item}
            >
              <feature.icon className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}