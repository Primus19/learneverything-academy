'use client'

import React from 'react'
import Navbar from "../../../components/layout/Navbar"
import { ArrowLeft, BookOpen, Clock, Award, Download, CheckCircle } from 'lucide-react'
import Link from 'next/link'

// Sample course data
const courseData = {
  title: 'AWS Cloud Engineering Professional',
  description: 'Become an AWS Cloud expert with comprehensive training on cloud architecture, deployment, security, and optimization. Build scalable, resilient cloud infrastructure using AWS services and best practices.',
  image: '',
  price: '$199.99',
  level: 'Intermediate to Advanced',
  duration: '35+ hours',
  instructor: 'Sarah Johnson',
  instructorTitle: 'AWS Certified Solutions Architect',
  totalStudents: '1,800+',
  lastUpdated: 'March 2025',
  chapters: [
    {
      title: 'Introduction to AWS Cloud',
      lessons: [
        'Cloud Computing Fundamentals',
        'AWS Global Infrastructure',
        'AWS Account Setup and Management',
        'AWS Management Console and CLI',
        'AWS Pricing Models and Cost Optimization'
      ]
    },
    {
      title: 'Core AWS Services',
      lessons: [
        'EC2 and Virtual Computing',
        'S3 and Object Storage',
        'VPC and Networking',
        'IAM and Security Fundamentals',
        'RDS and Database Services',
        'Route 53 and DNS Management'
      ]
    },
    {
      title: 'Cloud Architecture Design',
      lessons: [
        'AWS Well-Architected Framework',
        'High Availability and Fault Tolerance',
        'Scalability Patterns',
        'Decoupling Applications',
        'Microservices Architecture on AWS'
      ]
    },
    {
      title: 'Infrastructure as Code on AWS',
      lessons: [
        'CloudFormation Fundamentals',
        'Creating and Managing CloudFormation Stacks',
        'AWS CDK Introduction',
        'Terraform with AWS',
        'Infrastructure Automation Best Practices'
      ]
    },
    {
      title: 'Serverless Computing',
      lessons: [
        'Lambda Functions and Event-Driven Architecture',
        'API Gateway',
        'DynamoDB for Serverless Applications',
        'Step Functions for Workflow Orchestration',
        'Serverless Application Model (SAM)'
      ]
    },
    {
      title: 'Containers on AWS',
      lessons: [
        'Docker on AWS',
        'Amazon ECR for Container Registry',
        'ECS for Container Orchestration',
        'EKS for Kubernetes on AWS',
        'Fargate for Serverless Containers'
      ]
    },
    {
      title: 'DevOps on AWS',
      lessons: [
        'CodeCommit for Source Control',
        'CodeBuild for Continuous Integration',
        'CodeDeploy for Deployment Automation',
        'CodePipeline for CI/CD Pipelines',
        'AWS Developer Tools Best Practices'
      ]
    },
    {
      title: 'Monitoring, Logging, and Security',
      lessons: [
        'CloudWatch for Monitoring and Alerting',
        'CloudTrail for Audit and Compliance',
        'AWS Security Best Practices',
        'AWS WAF and Shield for Protection',
        'Implementing Compliance Controls'
      ]
    },
    {
      title: 'Real-World AWS Projects',
      lessons: [
        'Building a Scalable Web Application',
        'Implementing a Serverless Data Processing Pipeline',
        'Deploying a Containerized Microservices Architecture',
        'Setting Up a Multi-Region Disaster Recovery Solution'
      ]
    }
  ]
}

export default function CloudEngineeringCourse() {
  return (
    <main className="min-h-screen bg-gray-900">
      <Navbar />
      
      {/* Course Header */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <Link href="/courses" className="inline-flex items-center text-blue-400 hover:text-blue-300">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Courses
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h1 className="text-3xl font-extrabold text-white sm:text-4xl mb-4">
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
              
              <button className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md mb-4">
                Purchase Course
              </button>
              
              <div className="space-y-3 mt-6">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-400 mr-3 mt-0.5" />
                  <p className="text-gray-300">35+ hours of video content</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-400 mr-3 mt-0.5" />
                  <p className="text-gray-300">Downloadable code examples</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-400 mr-3 mt-0.5" />
                  <p className="text-gray-300">Hands-on AWS projects</p>
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
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8">Course Content</h2>
          
          <div className="space-y-4">
            {courseData.chapters.map((chapter, chapterIndex) => (
              <div key={chapterIndex} className="bg-gray-800 rounded-lg overflow-hidden">
                <div className="p-4 bg-gray-700 flex justify-between items-center">
                  <h3 className="text-lg font-medium text-white">
                    Chapter {chapterIndex + 1}: {chapter.title}
                  </h3>
                  <span className="text-gray-300 text-sm">{chapter.lessons.length} lessons</span>
                </div>
                <div className="p-4">
                  <ul className="space-y-2">
                    {chapter.lessons.map((lesson, lessonIndex) => (
                      <li key={lessonIndex} className="flex items-center text-gray-300 py-2 border-b border-gray-700 last:border-0">
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
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8">What You'll Learn</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-blue-400 mr-3 mt-0.5" />
              <p className="text-gray-300">Design and implement scalable, highly available AWS architectures</p>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-blue-400 mr-3 mt-0.5" />
              <p className="text-gray-300">Deploy and manage applications using AWS services</p>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-blue-400 mr-3 mt-0.5" />
              <p className="text-gray-300">Implement Infrastructure as Code using CloudFormation and Terraform</p>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-blue-400 mr-3 mt-0.5" />
              <p className="text-gray-300">Build serverless applications with Lambda, API Gateway, and DynamoDB</p>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-blue-400 mr-3 mt-0.5" />
              <p className="text-gray-300">Containerize applications and deploy them on ECS and EKS</p>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-blue-400 mr-3 mt-0.5" />
              <p className="text-gray-300">Implement CI/CD pipelines using AWS Developer Tools</p>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-blue-400 mr-3 mt-0.5" />
              <p className="text-gray-300">Set up monitoring, logging, and security controls</p>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-blue-400 mr-3 mt-0.5" />
              <p className="text-gray-300">Build complete, real-world AWS projects from scratch</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Resources */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8">Course Resources</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <Download className="h-6 w-6 text-blue-400 mr-3" />
                <h3 className="text-lg font-medium text-white">CloudFormation Templates</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Ready-to-use CloudFormation templates for various AWS architectures.
              </p>
              <button className="text-blue-400 hover:text-blue-300 font-medium">
                Preview Templates
              </button>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <Download className="h-6 w-6 text-blue-400 mr-3" />
                <h3 className="text-lg font-medium text-white">AWS Service Cheat Sheets</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Quick reference guides for EC2, S3, VPC, Lambda, and other AWS services.
              </p>
              <button className="text-blue-400 hover:text-blue-300 font-medium">
                Preview Cheat Sheets
              </button>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <Download className="h-6 w-6 text-blue-400 mr-3" />
                <h3 className="text-lg font-medium text-white">Project Files</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Starter and completed project files for hands-on AWS exercises.
              </p>
              <button className="text-blue-400 hover:text-blue-300 font-medium">
                Preview Projects
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Ready to become an AWS Cloud expert?
          </h2>
          <p className="mt-3 max-w-md mx-auto text-xl text-white opacity-90">
            Join thousands of professionals who have transformed their careers with our courses.
          </p>
          <div className="mt-8 max-w-md mx-auto sm:flex sm:justify-center">
            <div className="rounded-md shadow">
              <button className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
                Purchase Course
              </button>
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
