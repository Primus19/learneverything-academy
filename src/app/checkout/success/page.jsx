import React from 'react';
import { Button, Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/components";
import Navbar from "../../../components/layout/Navbar";
import Link from 'next/link';

export default function CheckoutSuccessPage() {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-6 flex justify-center">
            <div className="h-24 w-24 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Thank you for your purchase. Your order has been confirmed.
          </p>
          
          <Card>
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Order Number</span>
                  <span className="font-medium">ORD-2025-38291</span>
                </div>
                <div className="flex justify-between">
                  <span>Date</span>
                  <span className="font-medium">March 30, 2025</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Amount</span>
                  <span className="font-medium">$320.76</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Method</span>
                  <span className="font-medium">Credit Card (****3456)</span>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h3 className="font-medium mb-2">Purchased Courses</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>DevOps Course</span>
                    <span>$99.00</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Cloud Engineering Course</span>
                    <span>$99.00</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Data Analytics Course</span>
                    <span>$99.00</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-8 space-y-4">
            <p className="text-muted-foreground">
              A receipt has been sent to your email address. You can now access all your purchased courses from your dashboard.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/courses">Browse More Courses</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
