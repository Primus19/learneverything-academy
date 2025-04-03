import { Github, Linkedin, Twitter, Book } from "lucide-react"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  return (
    <footer className="w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-4 md:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Book className="h-6 w-6" />
              <span className="font-bold">LearnEverything</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Empowering learners worldwide with comprehensive education in technology and programming.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-base mb-3">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              <Link 
                href="/courses" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Courses
              </Link>
              <Link 
                href="/resume-builder" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Resume Builder
              </Link>
              <Link 
                href="/resume-samples" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Resume Samples
              </Link>
            </nav>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-base mb-3">Resources</h4>
            <nav className="flex flex-col space-y-2">
              <Link 
                href="/about" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                About Us
              </Link>
            </nav>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold text-base mb-3">Follow Us</h4>
            <div className="flex items-center space-x-3">
              <Link 
                href="https://twitter.com" 
                className="p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link 
                href="https://github.com" 
                className="p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link 
                href="https://linkedin.com" 
                className="p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} LearnEverything Academy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}