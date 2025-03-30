'use client'

import React from 'react'
import Navbar from '@/components/layout/Navbar'
import CourseCard from '@/components/courses/CourseCard'

const featuredCourses = [
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

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6">
            <span className="block">Master Modern</span>
            <span className="block text-blue-500">DevOps & Cloud Engineering</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-xl text-gray-300 sm:text-2xl md:mt-5 md:max-w-3xl">
            Practical, hands-on training with real-world projects and downloadable code examples.
          </p>
          <div className="mt-10 max-w-md mx-auto sm:flex sm:justify-center md:mt-12">
            <div className="rounded-md shadow">
              <a
                href="#courses"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
              >
                Explore Courses
              </a>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <a
                href="/about"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Courses Section */}
      <section id="courses" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Featured Courses
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-300">
              Comprehensive training programs designed for real-world applications.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-2">
            {featuredCourses.map((course, index) => (
              <CourseCard key={index} {...course} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Why Choose Tech Academy
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-300">
              Our courses are designed to provide practical skills that employers demand.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-4">Practical Training</h3>
              <p className="text-gray-300">
                Hands-on projects and exercises that simulate real-world scenarios and challenges.
              </p>
            </div>
            
            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-4">Downloadable Code</h3>
              <p className="text-gray-300">
                Access to complete code examples and resources that you can use in your own projects.
              </p>
            </div>
            
            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-4">Industry Relevant</h3>
              <p className="text-gray-300">
                Content developed by industry experts focusing on in-demand skills and technologies.
              </p>
            </div>
            
            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-4">Comprehensive Coverage</h3>
              <p className="text-gray-300">
                From fundamentals to advanced topics, our courses cover everything you need to know.
              </p>
            </div>
            
            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-4">Resume Samples</h3>
              <p className="text-gray-300">
                Professional resume templates tailored for DevOps and Cloud Engineering roles.
              </p>
            </div>
            
            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-4">Continuous Updates</h3>
              <p className="text-gray-300">
                Regular content updates to keep pace with evolving technologies and best practices.
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
