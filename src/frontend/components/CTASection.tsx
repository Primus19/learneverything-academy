"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section className="relative py-20 bg-muted/30">
      <div className="absolute inset-0 bg-grid-primary/[0.02] bg-[size:20px_20px]" />
      <motion.div 
        className="container px-4 md:px-6 relative"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-br from-primary via-primary/80 to-primary/50 bg-clip-text text-transparent">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of learners who have already taken the first step towards their future.
          </p>
          <Link href="/courses">
            <Button size="lg" className="group bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
              Get Started Now
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </motion.div>
    </section>
  )
}