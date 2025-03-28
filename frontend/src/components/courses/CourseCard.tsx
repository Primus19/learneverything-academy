'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface CourseCardProps {
  title: string
  description: string
  image: string
  slug: string
  price: string
  level: string
  duration: string
}

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  description,
  image,
  slug,
  price,
  level,
  duration
}) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:transform hover:scale-105">
      <div className="h-48 bg-gray-700 relative">
        <div className="absolute inset-0 flex items-center justify-center text-gray-500">
          {image ? (
            <img src={image} alt={title} className="w-full h-full object-cover" />
          ) : (
            <span className="text-xl">Course Image</span>
          )}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <div className="flex items-center text-sm text-gray-400 mb-4">
          <span className="mr-4">{level}</span>
          <span>{duration}</span>
        </div>
        <p className="text-gray-300 mb-4 line-clamp-3">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-white">{price}</span>
          <Link 
            href={`/courses/${slug}`}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            View Course
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CourseCard
