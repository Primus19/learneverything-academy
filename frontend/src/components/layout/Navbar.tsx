'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown } from 'lucide-react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown)
  }

  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-white font-bold text-xl">
                Tech Academy
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Home
              </Link>
              
              {/* Courses Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => toggleDropdown('courses')}
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
                >
                  Courses
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                
                {openDropdown === 'courses' && (
                  <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      <Link href="/courses/devops" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">
                        DevOps Engineering
                      </Link>
                      <Link href="/courses/cloud-engineering" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">
                        Cloud Engineering
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              
              <Link href="/resume-templates" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Resume Templates
              </Link>
              
              <Link href="/about" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                About
              </Link>
            </div>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <Link href="/login" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Login
            </Link>
            <Link href="/register" className="ml-4 px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
              Register
            </Link>
          </div>
          
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
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
        <div className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="/" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              Home
            </Link>
            
            <button
              onClick={() => toggleDropdown('mobile-courses')}
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left flex items-center"
            >
              Courses
              <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            
            {openDropdown === 'mobile-courses' && (
              <div className="pl-4">
                <Link href="/courses/devops" className="text-gray-400 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                  DevOps Engineering
                </Link>
                <Link href="/courses/cloud-engineering" className="text-gray-400 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                  Cloud Engineering
                </Link>
              </div>
            )}
            
            <Link href="/resume-templates" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              Resume Templates
            </Link>
            
            <Link href="/about" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              About
            </Link>
            
            <div className="pt-4 pb-3 border-t border-gray-700">
              <Link href="/login" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                Login
              </Link>
              <Link href="/register" className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700">
                Register
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
