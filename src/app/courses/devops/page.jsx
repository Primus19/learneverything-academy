'use client'

import React from 'react'
import Navbar from "../../../components/layout/Navbar"
import { ArrowLeft, BookOpen, Clock, Award, Download, CheckCircle } from 'lucide-react'
import Link from 'next/link'

// Sample course data
const courseData = {
  title: 'DevOps Engineering Masterclass',
  description: 'Master DevOps practices with hands-on projects covering CI/CD pipelines, containerization, infrastructure, and monitoring. Learn to implement industry-standard tools like Jenkins, Docker, Kubernetes, Terraform, and more.',
  image: '',
  price: '$199.99',
  level: 'Intermediate to Advanced',
  duration: '40+ hours',
  instructor: 'John Smith',
  instructorTitle: 'Senior DevOps Engineer',
  totalStudents: '2,500+',
  lastUpdated: 'March 2025',
  chapters: [
    {
      title: 'Introduction to DevOps',
      lessons: [
        'What is DevOps?',
        'DevOps Culture and Practices',
        'DevOps Toolchain Overview',
        'Setting Up Your Development Environment'
      ]
    },
    {
      title: 'Continuous Integration & Continuous Deployment',
      lessons: [
        'CI/CD Fundamentals',
        'Setting Up Jenkins',
        'Building CI Pipelines',
        'Automated Testing in CI',
        'Deployment Strategies',
        'Jenkins Pipeline'
      ]
    },
    {
      title: 'Containerization with Docker',
      lessons: [
        'Docker Fundamentals',
        'Creating Dockerfiles',
        'Docker Compose for Multi-Container Applications',
        'Docker Networking',
        'Docker Volumes and Persistence',
        'Docker Security Best Practices'
      ]
    },
    {
      title: 'Container Orchestration with Kubernetes',
      lessons: [
        'Kubernetes Architecture',
        'Setting Up a Kubernetes Cluster',
        'Deployments, Services, and Pods',
        'ConfigMaps and Secrets',
        'Persistent Volumes',
        'Helm Charts',
        'Kubernetes Monitoring and Logging'
      ]
    },
    {
      title: 'Infrastructure',
      lessons: [
        'IaC Principles',
        'Terraform Fundamentals',
        'AWS Infrastructure with Terraform',
        'Terraform Modules',
        'Terraform State Management',
        'Ansible for Configuration Management'
      ]
    },
    {
      title: 'Monitoring and Observability',
      lessons: [
        'Monitoring Fundamentals',
        'Prometheus and Grafana',
        'ELK Stack for Logging',
        'Distributed Tracing',
        'Alerting and Incident Response'
      ]
    },
    {
      title: 'DevOps Security (DevSecOps)',
      lessons: [
        'Security in the CI/CD Pipeline',
        'Container Security',
        'Infrastructure Security',
        'Secrets Management',
        'Compliance'
      ]
    },
    {
      title: 'Real-World DevOps Projects',
      lessons: [
        'Building a Complete CI/CD Pipeline',
        'Deploying Microservices on Kubernetes',
        'Infrastructure Automation Project',
        'Monitoring and Observability Implementation'
      ]
    }
  ]
}

export default function DevOpsCourse() {
  return (
    <main className="min-h-screen bg-gray-900">
      <Navbar />
      
      {/* Course Header */}
      <section className="py-12 px-4 sm-6 lg-8 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <Link href="/courses" className="inline-flex items-center text-blue-400 hover-blue-300">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Courses
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg-cols-3 gap-8">
            <div className="lg-span-2">
              <h1 className="text-3xl font-extrabold text-white sm-4xl mb-4">
                {courseData.title}
              </h1>
              <p className="text-xl text-gray-300 mb-6">
                {courseData.description}
              </p>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center text-gray-300">
                  <Award className="h-5 w-5 mr-2 text-blue-400" />
                  {courseData.level}
                </div>
                <div className="flex items-center text-gray-300">
                  <Clock className="h-5 w-5 mr-2 text-blue-400" />
                  {courseData.duration}
                </div>
                <div className="flex items-center text-gray-300">
                  <BookOpen className="h-5 w-5 mr-2 text-blue-400" />
                  {courseData.totalStudents} students
                </div>
              </div>
              
              <div className="flex items-center mb-8">
                <div className="h-12 w-12 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold mr-4">
                  {courseData.instructor.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="text-white font-medium">{courseData.instructor}</p>
                  <p className="text-gray-400">{courseData.instructorTitle}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-700 p-6 rounded-lg">
              <div className="text-center mb-6">
                <p className="text-3xl font-bold text-white">{courseData.price}</p>
                <p className="text-gray-300 mt-1">Lifetime Access</p>
              </div>
              
              <button className="w-full py-3 px-4 bg-blue-600 hover-blue-700 text-white font-medium rounded-md mb-4">
                Purchase Course
              </button>
              
              <div className="space-y-3 mt-6">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-400 mr-3 mt-0.5" />
                  <p className="text-gray-300">40+ hours of video content</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-400 mr-3 mt-0.5" />
                  <p className="text-gray-300">Downloadable code examples</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-400 mr-3 mt-0.5" />
                  <p className="text-gray-300">Hands-on projects</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-400 mr-3 mt-0.5" />
                  <p className="text-gray-300">Certificate of completion</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-400 mr-3 mt-0.5" />
                  <p className="text-gray-300">Lifetime updates</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Course Content */}
      <section className="py-16 px-4 sm-6 lg-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8">Course Content</h2>
          
          <div className="space-y-4">
            {courseData.chapters.map((chapter, chapterIndex) => (
              <div key={chapterIndex} className="bg-gray-800 rounded-lg overflow-hidden">
                <div className="p-4 bg-gray-700 flex justify-between items-center">
                  <h3 className="text-lg font-medium text-white">
                    Chapter {chapterIndex + 1}
                  </h3>
                  <span className="text-gray-300 text-sm">{chapter.lessons.length} lessons</span>
                </div>
                <div className="p-4">
                  <ul className="space-y-2">
                    {chapter.lessons.map((lesson, lessonIndex) => (
                      <li key={lessonIndex} className="flex items-center text-gray-300 py-2 border-b border-gray-700 last-0">
                        <BookOpen className="h-4 w-4 mr-3 text-gray-400" />
                        {lesson}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* What You'll Learn */}
      <section className="py-16 px-4 sm-6 lg-8 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8">What You'll Learn</h2>
          
          <div className="grid grid-cols-1 md-cols-2 gap-6">
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-blue-400 mr-3 mt-0.5" />
              <p className="text-gray-300">Design and implement CI/CD pipelines using Jenkins and other modern tools</p>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-blue-400 mr-3 mt-0.5" />
              <p className="text-gray-300">Containerize applications with Docker and manage them with Docker Compose</p>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-blue-400 mr-3 mt-0.5" />
              <p className="text-gray-300">Deploy and manage applications on Kubernetes clusters</p>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-blue-400 mr-3 mt-0.5" />
              <p className="text-gray-300">Implement Infrastructure using Terraform and Ansible</p>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-blue-400 mr-3 mt-0.5" />
              <p className="text-gray-300">Set up comprehensive monitoring and observability solutions</p>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-blue-400 mr-3 mt-0.5" />
              <p className="text-gray-300">Integrate security practices into the DevOps lifecycle (DevSecOps)</p>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-blue-400 mr-3 mt-0.5" />
              <p className="text-gray-300">Automate infrastructure provisioning and configuration</p>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-blue-400 mr-3 mt-0.5" />
              <p className="text-gray-300">Build complete, real-world DevOps projects from scratch</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Resources */}
      <section className="py-16 px-4 sm-6 lg-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8">Course Resources</h2>
          
          <div className="grid grid-cols-1 md-cols-2 lg-cols-3 gap-6">
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <Download className="h-6 w-6 text-blue-400 mr-3" />
                <h3 className="text-lg font-medium text-white">CI/CD Pipeline Templates</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Ready-to-use Jenkins pipeline templates for various project types.
              </p>
              <button className="text-blue-400 hover-blue-300 font-medium">
                Preview Templates
              </button>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <Download className="h-6 w-6 text-blue-400 mr-3" />
                <h3 className="text-lg font-medium text-white">Docker & Kubernetes Configs</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Sample configuration files for containerization and orchestration.
              </p>
              <button className="text-blue-400 hover-blue-300 font-medium">
                Preview Configs
              </button>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <Download className="h-6 w-6 text-blue-400 mr-3" />
                <h3 className="text-lg font-medium text-white">Infrastructure Code</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Terraform and Ansible code for infrastructure automation.
              </p>
              <button className="text-blue-400 hover-blue-300 font-medium">
                Preview Code
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4 sm-6 lg-8 bg-blue-600">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-white sm-4xl">
            Ready to master DevOps engineering?
          </h2>
          <p className="mt-3 max-w-md mx-auto text-xl text-white opacity-90">
            Join thousands of professionals who have transformed their careers with our courses.
          </p>
          <div className="mt-8 max-w-md mx-auto sm sm-center">
            <div className="rounded-md shadow">
              <button className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover-gray-50 md-4 md-lg md-10">
                Purchase Course
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 py-12 px-4 sm-6 lg-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md-cols-4 gap-8">
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
                  <a href="/courses/devops" className="text-gray-400 hover-white">
                    DevOps Engineering
                  </a>
                </li>
                <li>
                  <a href="/courses/cloud-engineering" className="text-gray-400 hover-white">
                    Cloud Engineering
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white text-lg font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/resume-samples" className="text-gray-400 hover-white">
                    Resume Samples
                  </a>
                </li>
                <li>
                  <a href="/about" className="text-gray-400 hover-white">
                    About Us
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white text-lg font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/privacy" className="text-gray-400 hover-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="text-gray-400 hover-white">
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
