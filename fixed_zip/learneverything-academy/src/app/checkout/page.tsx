'use client'

import React, { useState } from 'react'
import Navbar from "../../components/layout/Navbar"
import { CreditCard, Lock, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function Checkout() {
  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    billingAddress: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US'
  })
  
  const [errors, setErrors] = useState({
    cardName: '',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    billingAddress: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  })

  // Sample course data for checkout
  const course = {
    title: 'DevOps Engineering Masterclass',
    price: 199.99,
    tax: 20.00,
    total: 219.99
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const validateForm = () => {
    let valid = true
    const newErrors = {
      cardName: '',
      cardNumber: '',
      expiryMonth: '',
      expiryYear: '',
      cvv: '',
      billingAddress: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    }

    if (!formData.cardName.trim()) {
      newErrors.cardName = 'Name on card is required'
      valid = false
    }

    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = 'Card number is required'
      valid = false
    } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Card number must be 16 digits'
      valid = false
    }

    if (!formData.expiryMonth) {
      newErrors.expiryMonth = 'Expiry month is required'
      valid = false
    }

    if (!formData.expiryYear) {
      newErrors.expiryYear = 'Expiry year is required'
      valid = false
    }

    if (!formData.cvv.trim()) {
      newErrors.cvv = 'CVV is required'
      valid = false
    } else if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = 'CVV must be 3 or 4 digits'
      valid = false
    }

    if (!formData.billingAddress.trim()) {
      newErrors.billingAddress = 'Billing address is required'
      valid = false
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required'
      valid = false
    }

    if (!formData.state.trim()) {
      newErrors.state = 'State is required'
      valid = false
    }

    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required'
      valid = false
    }

    setErrors(newErrors)
    return valid
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      // Process payment
      console.log('Payment form submitted:', formData)
      
      // Redirect to success page
      window.location.href = '/checkout/success'
    }
  }

  return (
    <main className="min-h-screen bg-gray-900">
      <Navbar />
      
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-white">Checkout</h1>
          <p className="mt-2 text-gray-400">Complete your purchase to gain access to the course</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-lg p-6 sticky top-6">
              <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
              
              <div className="border-b border-gray-700 pb-4 mb-4">
                <h3 className="text-lg font-medium text-white mb-2">{course.title}</h3>
                <div className="flex justify-between text-gray-300 mb-1">
                  <span>Course Price</span>
                  <span>${course.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300 mb-1">
                  <span>Tax</span>
                  <span>${course.tax.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="flex justify-between text-lg font-bold text-white mb-6">
                <span>Total</span>
                <span>${course.total.toFixed(2)}</span>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-400 mr-3 mt-0.5" />
                  <p className="text-gray-300">Lifetime access to course content</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-400 mr-3 mt-0.5" />
                  <p className="text-gray-300">All code examples and resources</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-400 mr-3 mt-0.5" />
                  <p className="text-gray-300">Certificate of completion</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-400 mr-3 mt-0.5" />
                  <p className="text-gray-300">30-day money-back guarantee</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-6">Payment Information</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-gray-700 p-4 rounded-md flex items-center mb-6">
                  <Lock className="h-5 w-5 text-gray-400 mr-3" />
                  <p className="text-gray-300 text-sm">
                    Your payment information is encrypted and secure. We never store your full credit card details.
                  </p>
                </div>
                
                <div>
                  <label htmlFor="cardName" className="block text-sm font-medium text-gray-300 mb-1">
                    Name on card
                  </label>
                  <input
                    type="text"
                    id="cardName"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white sm:text-sm"
                    placeholder="John Smith"
                  />
                  {errors.cardName && <p className="mt-1 text-sm text-red-500">{errors.cardName}</p>}
                </div>
                
                <div>
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-300 mb-1">
                    Card number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white sm:text-sm"
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <CreditCard className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  {errors.cardNumber && <p className="mt-1 text-sm text-red-500">{errors.cardNumber}</p>}
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-1">
                    <label htmlFor="expiryMonth" className="block text-sm font-medium text-gray-300 mb-1">
                      Expiry month
                    </label>
                    <select
                      id="expiryMonth"
                      name="expiryMonth"
                      value={formData.expiryMonth}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white sm:text-sm"
                    >
                      <option value="">Month</option>
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                        <option key={month} value={month.toString().padStart(2, '0')}>
                          {month.toString().padStart(2, '0')}
                        </option>
                      ))}
                    </select>
                    {errors.expiryMonth && <p className="mt-1 text-sm text-red-500">{errors.expiryMonth}</p>}
                  </div>
                  
                  <div className="col-span-1">
                    <label htmlFor="expiryYear" className="block text-sm font-medium text-gray-300 mb-1">
                      Expiry year
                    </label>
                    <select
                      id="expiryYear"
                      name="expiryYear"
                      value={formData.expiryYear}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white sm:text-sm"
                    >
                      <option value="">Year</option>
                      {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                    {errors.expiryYear && <p className="mt-1 text-sm text-red-500">{errors.expiryYear}</p>}
                  </div>
                  
                  <div className="col-span-1">
                    <label htmlFor="cvv" className="block text-sm font-medium text-gray-300 mb-1">
                      CVV
                    </label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white sm:text-sm"
                      placeholder="123"
                      maxLength={4}
                    />
                    {errors.cvv && <p className="mt-1 text-sm text-red-500">{errors.cvv}</p>}
                  </div>
                </div>
                
                <h3 className="text-lg font-medium text-white mt-8 mb-4">Billing Address</h3>
                
                <div>
                  <label htmlFor="billingAddress" className="block text-sm font-medium text-gray-300 mb-1">
                    Street address
                  </label>
                  <input
                    type="text"
                    id="billingAddress"
                    name="billingAddress"
                    value={formData.billingAddress}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white sm:text-sm"
                    placeholder="123 Main St"
                  />
                  {errors.billingAddress && <p className="mt-1 text-sm text-red-500">{errors.billingAddress}</p>}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-300 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white sm:text-sm"
                      placeholder="New York"
                    />
                    {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-300 mb-1">
                      State / Province
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white sm:text-sm"
                      placeholder="NY"
                    />
                    {errors.state && <p className="mt-1 text-sm text-red-500">{errors.state}</p>}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-300 mb-1">
                      ZIP / Postal code
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white sm:text-sm"
                      placeholder="10001"
                    />
                    {errors.zipCode && <p className="mt-1 text-sm text-red-500">{errors.zipCode}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-300 mb-1">
                      Country
                    </label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white sm:text-sm"
                    >
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                      <option value="AU">Australia</option>
                      <option value="DE">Germany</option>
                      <option value="FR">France</option>
                      <option value="JP">Japan</option>
                      <option value="IN">India</option>
                      <option value="BR">Brazil</option>
                    </select>
                    {errors.country && <p className="mt-1 text-sm text-red-500">{errors.country}</p>}
                  </div>
                </div>
                
                <div className="mt-8">
                  <button
                    type="submit"
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Pay ${course.total.toFixed(2)}
                  </button>
                </div>
                
                <p className="text-center text-sm text-gray-400 mt-4">
                  By completing your purchase, you agree to our{' '}
                  <Link href="/terms" className="text-blue-400 hover:text-blue-300">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-blue-400 hover:text-blue-300">
                    Privacy Policy
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
