'use client'

import React from 'react'
import Navbar from '@/components/layout/Navbar'
import Link from 'next/link'
import { User, Settings, Book, FileText, CreditCard, LogOut } from 'lucide-react'

export default function Dashboard() {
  // Mock user data
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    joinDate: 'March 2025',
    courses: [
      {
        id: 1,
        title: 'DevOps Engineering Masterclass',
        progress: 35,
        lastAccessed: '2 days ago'
      }
    ]
  }

  return (
    <main className="min-h-screen bg-gray-900">
      <Navbar />
      
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white mb-8">Dashboard</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-lg p-6 mb-6">
              <div className="flex items-center mb-6">
                <div className="h-16 w-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl font-bold">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-bold text-white">{user.name}</h2>
                  <p className="text-gray-400">Member since {user.joinDate}</p>
                </div>
              </div>
              
              <nav className="space-y-2">
                <Link href="/dashboard" className="flex items-center px-4 py-2 text-white bg-gray-700 rounded-md">
                  <User className="h-5 w-5 mr-3" />
                  Dashboard
                </Link>
                <Link href="/dashboard/courses" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md">
                  <Book className="h-5 w-5 mr-3" />
                  My Courses
                </Link>
                <Link href="/dashboard/certificates" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md">
                  <FileText className="h-5 w-5 mr-3" />
                  Certificates
                </Link>
                <Link href="/dashboard/billing" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md">
                  <CreditCard className="h-5 w-5 mr-3" />
                  Billing
                </Link>
                <Link href="/dashboard/settings" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md">
                  <Settings className="h-5 w-5 mr-3" />
                  Settings
                </Link>
                <Link href="/logout" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md">
                  <LogOut className="h-5 w-5 mr-3" />
                  Logout
                </Link>
              </nav>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Welcome Card */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Welcome back, {user.name.split(' ')[0]}!</h2>
              <p className="text-blue-100 mb-4">Continue your learning journey where you left off.</p>
              {user.courses.length > 0 ? (
                <Link href={`/dashboard/courses/${user.courses[0].id}`} className="inline-block px-4 py-2 bg-white text-blue-700 rounded-md font-medium hover:bg-blue-50">
                  Continue Learning
                </Link>
              ) : (
                <Link href="/courses" className="inline-block px-4 py-2 bg-white text-blue-700 rounded-md font-medium hover:bg-blue-50">
                  Browse Courses
                </Link>
              )}
            </div>
            
            {/* My Courses */}
            <div className="bg-gray-800 rounded-lg p-6 mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">My Courses</h2>
                <Link href="/dashboard/courses" className="text-blue-400 hover:text-blue-300">
                  View All
                </Link>
              </div>
              
              {user.courses.length > 0 ? (
                <div className="space-y-4">
                  {user.courses.map((course) => (
                    <div key={course.id} className="bg-gray-700 rounded-lg p-4">
                      <h3 className="text-lg font-medium text-white mb-2">{course.title}</h3>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-300 text-sm">Progress: {course.progress}%</span>
                        <span className="text-gray-400 text-sm">Last accessed: {course.lastAccessed}</span>
                      </div>
                      <div className="w-full bg-gray-600 rounded-full h-2.5 mb-4">
                        <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${course.progress}%` }}></div>
                      </div>
                      <Link href={`/dashboard/courses/${course.id}`} className="text-blue-400 hover:text-blue-300 font-medium">
                        Continue Course
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-400 mb-4">You haven't purchased any courses yet.</p>
                  <Link href="/courses" className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700">
                    Browse Courses
                  </Link>
                </div>
              )}
            </div>
            
            {/* Recommended Courses */}
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Recommended For You</h2>
                <Link href="/courses" className="text-blue-400 hover:text-blue-300">
                  View All
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-700 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-white mb-2">AWS Cloud Engineering Professional</h3>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                    Become an AWS Cloud expert with comprehensive training on cloud architecture, deployment, security, and optimization.
                  </p>
                  <Link href="/courses/cloud-engineering" className="text-blue-400 hover:text-blue-300 font-medium">
                    View Course
                  </Link>
                </div>
                
                <div className="bg-gray-700 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-white mb-2">SOC Analysis Fundamentals</h3>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                    Learn the essential skills for Security Operations Center analysis and threat detection.
                  </p>
                  <span className="text-gray-400 text-sm">Coming Soon</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-800 mt-12">
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
