'use client'

import React, { useState, useEffect } from 'react'
import { Progress } from "../../components/ui/progress"
import { Badge } from "../../components/ui/badge"
import Card from "../../components/ui/card-direct/Card.jsx"
import CardContent from "../../components/ui/card-direct/CardContent.jsx"
import CardDescription from "../../components/ui/card-direct/CardDescription.jsx"
import CardFooter from "../../components/ui/card-direct/CardFooter.jsx"
import CardHeader from "../../components/ui/card-direct/CardHeader.jsx"
import CardTitle from "../../components/ui/card-direct/CardTitle.jsx"
import { CheckCircle, Clock, Award, BookOpen } from 'lucide-react'

interface ProgressTrackingProps {
  courseId: string
  totalChapters: number
  completedChapters?: number[]
  userName?: string
}

export default function ProgressTracking({ 
  courseId, 
  totalChapters, 
  completedChapters = [], 
  userName = 'Student'
}: ProgressTrackingProps) {
  const [progress, setProgress] = useState(0)
  const [certificateEligible, setCertificateEligible] = useState(false)
  
  useEffect(() => {
    // Calculate progress percentage
    const progressPercentage = Math.round((completedChapters.length / totalChapters) * 100)
    setProgress(progressPercentage)
    
    // Check if eligible for certificate (100% completion)
    setCertificateEligible(progressPercentage === 100)
  }, [completedChapters, totalChapters])
  
  // Mock function to mark chapter as complete
  const markChapterComplete = (chapterIndex: number) => {
    // In a real implementation, this would call an API to update user progress
    console.log(`Marking chapter ${chapterIndex} as complete for course ${courseId}`)
    // For demo purposes, we'd update local state here
  }
  
  // Mock function to generate certificate
  const generateCertificate = () => {
    // In a real implementation, this would generate a PDF certificate
    console.log(`Generating certificate for ${userName} for course ${courseId}`)
    alert(`Congratulations ${userName}! Your certificate has been generated.`)
  }
  
  return (
    <Card className="w-full bg-gray-800 border-gray-700 text-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Course Progress
        </CardTitle>
        <CardDescription className="text-gray-400">
          Track your learning journey
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-300">{progress}% Complete</span>
              <span className="text-sm font-medium text-gray-300">
                {completedChapters.length} of {totalChapters} chapters
              </span>
            </div>
            <Progress value={progress} className="h-2 bg-gray-700" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
            {Array.from({ length: totalChapters }).map((_, index) => (
              <div 
                key={index}
                className={`flex items-center gap-2 p-2 rounded-md ${
                  completedChapters.includes(index) 
                    ? 'bg-green-900/20 text-green-400' 
                    : 'bg-gray-700/50 text-gray-300'
                }`}
              >
                {completedChapters.includes(index) ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <Clock className="h-4 w-4 text-gray-400" />
                )}
                <span className="text-sm">Chapter {index + 1}</span>
                {!completedChapters.includes(index) && (
                  <button 
                    onClick={() => markChapterComplete(index)}
                    className="ml-auto text-xs bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded"
                  >
                    Mark Complete
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t border-gray-700 pt-4">
        <div className="flex items-center gap-2">
          <Award className="h-5 w-5 text-yellow-500" />
          <span className="text-sm text-gray-300">
            {certificateEligible 
              ? 'Certificate Available!' 
              : `${progress}% progress to certificate`
            }
          </span>
        </div>
        
        {certificateEligible && (
          <button 
            onClick={generateCertificate}
            className="bg-gradient-to-r from-yellow-500 to-amber-500 text-black font-medium px-4 py-2 rounded-md hover:from-yellow-600 hover:to-amber-600 transition-all"
          >
            Get Certificate
          </button>
        )}
        
        <div className="flex gap-2">
          <Badge variant="outline" className="bg-blue-900/20 text-blue-400 border-blue-800">
            Share Progress
          </Badge>
          <Badge variant="outline" className="bg-purple-900/20 text-purple-400 border-purple-800">
            Download Report
          </Badge>
        </div>
      </CardFooter>
    </Card>
  )
}
