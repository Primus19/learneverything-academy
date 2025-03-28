'use client'

import React from 'react'
import Navbar from '@/components/layout/Navbar'
import CourseCard from '@/components/courses/CourseCard'

const courses = [
  {
    title: 'DevOps Engineering Masterclass',
    description: 'Master DevOps practices with hands-on projects covering CI/CD pipelines, containerization, infrastructure as code, and monitoring. Learn to implement industry-standard tools like Jenkins, Docker, Kubernetes, Terraform, and more.',
    image: '',
    slug: 'devops',
    price: '$199.99',
    level: 'Intermediate to Advanced',
    duration: '40+ hours'
  },
  {
    title: 'AWS Cloud Engineering Professional',
    description: 'Become an AWS Cloud expert with comprehensive training on cloud architecture, deployment, security, and optimization. Build scalable, resilient cloud infrastructure using AWS services and best practices.',
    image: '',
    slug: 'cloud-engineering',
    price: '$199.99',
    level: 'Intermediate to Advanced',
    duration: '35+ hours'
  }
]

export default function CoursesPage() {
  return (
    <main className="min-h-screen bg-gray-900">
      <Navbar />
      
      {/* Courses Header */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
            Available Courses
          </h1>
          <p className="mt-3 text-xl text-gray-300">
            Browse our comprehensive training programs designed for tech professionals.
          </p>
        </div>
      </section>
      
      {/* Courses List */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-2">
            {courses.map((course, index) => (
              <CourseCard key={index} {...course} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Why Choose Our Courses */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-white">
              Why Choose Our Courses
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-300">
              Our courses are designed to provide practical skills that employers demand.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-4">Industry-Relevant Content</h3>
              <p className="text-gray-300">
                Curriculum developed by industry experts focusing on the most in-demand skills and technologies.
              </p>
            </div>
            
            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-4">Hands-On Projects</h3>
              <p className="text-gray-300">
                Apply your knowledge with real-world projects that simulate actual work environments.
              </p>
            </div>
            
            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-4">Downloadable Resources</h3>
              <p className="text-gray-300">
                Access to complete code examples, cheat sheets, and reference materials.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Ready to advance your career?
          </h2>
          <p className="mt-3 max-w-md mx-auto text-xl text-white opacity-90">
            Join thousands of professionals who have transformed their careers with our courses.
          </p>
          <div className="mt-8 max-w-md mx-auto sm:flex sm:justify-center">
            <div className="rounded-md shadow">
              <a
                href="/register"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
              >
                Get Started Today
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white text-lg font-bold mb-4">Tech Academy</h3>
              <p className="text-gray-400">
                Professional training for DevOps and Cloud Engineering careers.
              </p>
            </div>
            
            <div>
              <h3 className="text-white text-lg font-bold mb-4">Courses</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/courses/devops" className="text-gray-400 hover:text-white">
                    DevOps Engineering
                  </a>
                </li>
                <li>
                  <a href="/courses/cloud-engineering" className="text-gray-400 hover:text-white">
                    Cloud Engineering
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white text-lg font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/resume-samples" className="text-gray-400 hover:text-white">
                    Resume Samples
                  </a>
                </li>
                <li>
                  <a href="/about" className="text-gray-400 hover:text-white">
                    About Us
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white text-lg font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/privacy" className="text-gray-400 hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="text-gray-400 hover:text-white">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} Tech Academy. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
