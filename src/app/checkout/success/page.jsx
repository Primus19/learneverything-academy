'use client'

import React from 'react'
import Navbar from "../../../components/layout/Navbar"
import Link from 'next/link'
import { CheckCircle, ArrowRight } from 'lucide-react'

export default function CheckoutSuccess() {
  return (
    <main className="min-h-screen bg-gray-900">
      <Navbar />
      
      <div className="max-w-3xl mx-auto py-16 px-4 sm-6 lg-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-green-600 mb-8">
            <CheckCircle className="h-12 w-12 text-white" />
          </div>
          
          <h1 className="text-3xl font-extrabold text-white mb-4">Payment Successful!</h1>
          <p className="text-xl text-gray-300 mb-8">
            Thank you for your purchase. You now have full access to the course.
          </p>
          
          <div className="bg-gray-800 rounded-lg p-8 mb-8">
            <h2 className="text-xl font-bold text-white mb-4">Order Details</h2>
            
            <div className="border-b border-gray-700 pb-4 mb-4">
              <h3 className="text-lg font-medium text-white mb-2">DevOps Engineering Masterclass</h3>
              <div className="flex justify-between text-gray-300 mb-1">
                <span>Course Price</span>
                <span>$199.99</span>
              </div>
              <div className="flex justify-between text-gray-300 mb-1">
                <span>Tax</span>
                <span>$20.00</span>
              </div>
            </div>
            
            <div className="flex justify-between text-lg font-bold text-white">
              <span>Total</span>
              <span>$219.99</span>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-8 mb-8">
            <h2 className="text-xl font-bold text-white mb-4">What's Next?</h2>
            
            <div className="space-y-4 text-left">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                <p className="text-gray-300">
                  Your course is now available in your dashboard. You can start learning right away.
                </p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                <p className="text-gray-300">
                  You'll receive a confirmation email with your purchase details.
                </p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                <p className="text-gray-300">
                  You have lifetime access to all course materials and future updates.
                </p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                <p className="text-gray-300">
                  Need help? Contact our support team at support@techacademy.com
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm-row justify-center gap-4">
            <Link 
              href="/dashboard" 
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover-blue-700"
            >
              Go to Dashboard
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            
            <Link 
              href="/courses" 
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-600 text-base font-medium rounded-md text-gray-300 bg-gray-800 hover-gray-700"
            >
              Browse More Courses
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
