'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const pathname = usePathname()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const isActive = (path) => {
    return pathname === path || pathname?.startsWith(path + '/')
  }

  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm-6 lg-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-white font-bold text-xl">
                Learn Everything Academy
              </Link>
            </div>
            <div className="hidden sm-6 sm sm-x-8">
              <Link
                href="/"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium h-16 ${
                  isActive('/') 
                    ? 'border-blue-500 text-white' 
                    : 'border-transparent text-gray-300 hover-gray-300 hover-white'
                }`}
              >
                Home
              </Link>
              <Link
                href="/courses"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium h-16 ${
                  isActive('/courses') 
                    ? 'border-blue-500 text-white' 
                    : 'border-transparent text-gray-300 hover-gray-300 hover-white'
                }`}
              >
                Courses
              </Link>
              <Link
                href="/resume-templates"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium h-16 ${
                  isActive('/resume-templates') 
                    ? 'border-blue-500 text-white' 
                    : 'border-transparent text-gray-300 hover-gray-300 hover-white'
                }`}
              >
                Resume Templates
              </Link>
              <Link
                href="/about"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium h-16 ${
                  isActive('/about') 
                    ? 'border-blue-500 text-white' 
                    : 'border-transparent text-gray-300 hover-gray-300 hover-white'
                }`}
              >
                About
              </Link>
            </div>
          </div>
          <div className="hidden sm-6 sm sm-center">
            <div className="flex space-x-4">
              <Link
                href="/login"
                className="text-gray-300 hover-gray-700 hover-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="bg-blue-600 hover-blue-700 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Sign up
              </Link>
            </div>
          </div>
          <div className="-mr-2 flex items-center sm">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover-white hover-gray-700 focus-none focus-2 focus-inset focus-white"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                isActive('/') 
                  ? 'bg-gray-800 border-blue-500 text-white' 
                  : 'border-transparent text-gray-300 hover-gray-700 hover-gray-300 hover-white'
              }`}
            >
              Home
            </Link>
            <Link
              href="/courses"
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                isActive('/courses') 
                  ? 'bg-gray-800 border-blue-500 text-white' 
                  : 'border-transparent text-gray-300 hover-gray-700 hover-gray-300 hover-white'
              }`}
            >
              Courses
            </Link>
            <Link
              href="/resume-templates"
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                isActive('/resume-templates') 
                  ? 'bg-gray-800 border-blue-500 text-white' 
                  : 'border-transparent text-gray-300 hover-gray-700 hover-gray-300 hover-white'
              }`}
            >
              Resume Templates
            </Link>
            <Link
              href="/about"
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                isActive('/about') 
                  ? 'bg-gray-800 border-blue-500 text-white' 
                  : 'border-transparent text-gray-300 hover-gray-700 hover-gray-300 hover-white'
              }`}
            >
              About
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="flex items-center px-4 space-x-3">
              <Link
                href="/login"
                className="block text-gray-300 hover-gray-700 hover-white px-3 py-2 rounded-md text-base font-medium"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="block bg-blue-600 hover-blue-700 text-white px-3 py-2 rounded-md text-base font-medium transition-colors"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
