'use client'

import React, { useState } from 'react'
import Link from "next/link.jsx"
import { Eye, EyeOff } from 'lucide-react'

export default function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleChange = (e.ChangeEvent) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]
    })
  }

  const validateForm = () => {
    let valid = true
    const newErrors = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
      valid = false
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
      valid = false
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
      valid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
      valid = false
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
      valid = false
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
      valid = false
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
      valid = false
    }

    setErrors(newErrors)
    return valid
  }

  const handleSubmit = (e.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      // Submit form data to backend
      console.log('Form submitted:', formData)
      // Redirect to login page or dashboard
      window.location.href = '/login'
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm-6 lg-8">
      <div className="sm-auto sm-full sm-w-md">
        <Link href="/" className="flex justify-center">
          <h1 className="text-white text-3xl font-bold">Tech Academy</h1>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-400">
          Or{' '}
          <Link href="/login" className="font-medium text-blue-500 hover-blue-400">
            sign in to your existing account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm-auto sm-full sm-w-md">
        <div className="bg-gray-800 py-8 px-4 shadow sm-lg sm-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 sm-cols-2">
              
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-300">
                  First name
                </label>
                <div className="mt-1">
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus-none focus-blue-500 focus-blue-500 bg-gray-700 text-white sm-sm"
                  />
                  {errors.firstName && <p className="mt-2 text-sm text-red-500">{errors.firstName}</p>}
                </div>
              </div>

              
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-300">
                  Last name
                </label>
                <div className="mt-1">
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus-none focus-blue-500 focus-blue-500 bg-gray-700 text-white sm-sm"
                  />
                  {errors.lastName && <p className="mt-2 text-sm text-red-500">{errors.lastName}</p>}
                </div>
              </div>
            </div>

            
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus-none focus-blue-500 focus-blue-500 bg-gray-700 text-white sm-sm"
                />
                {errors.email && <p className="mt-2 text-sm text-red-500">{errors.email}</p>}
              </div>
            </div>

            
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus-none focus-blue-500 focus-blue-500 bg-gray-700 text-white sm-sm"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                {errors.password && <p className="mt-2 text-sm text-red-500">{errors.password}</p>}
              </div>
            </div>

            
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
                Confirm password
              </label>
              <div className="mt-1 relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus-none focus-blue-500 focus-blue-500 bg-gray-700 text-white sm-sm"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                {errors.confirmPassword && <p className="mt-2 text-sm text-red-500">{errors.confirmPassword}</p>}
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-blue-600 focus-blue-500 border-gray-600 rounded bg-gray-700"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-300">
                I agree to the{' '}
                <Link href="/terms" className="font-medium text-blue-500 hover-blue-400">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="font-medium text-blue-500 hover-blue-400">
                  Privacy Policy
                </Link>
              </label>
            </div>

            
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover-blue-700 focus-none focus-2 focus-offset-2 focus-blue-500"
              >
                Create account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
