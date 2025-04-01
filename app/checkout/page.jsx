import React from 'react';
import Link from 'next/link';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/components";
import Navbar from "../components/layout/Navbar";

export default function CheckoutPage() {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Details</CardTitle>
                  <CardDescription>Enter your payment information to complete your purchase</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">Name on Card</label>
                      <input
                        id="name"
                        type="text"
                        className="w-full p-2 border rounded-md bg-background"
                        placeholder="John Smith"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="card" className="text-sm font-medium">Card Number</label>
                      <input
                        id="card"
                        type="text"
                        className="w-full p-2 border rounded-md bg-background"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="expiry" className="text-sm font-medium">Expiry Date</label>
                        <input
                          id="expiry"
                          type="text"
                          className="w-full p-2 border rounded-md bg-background"
                          placeholder="MM/YY"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="cvc" className="text-sm font-medium">CVC</label>
                        <input
                          id="cvc"
                          type="text"
                          className="w-full p-2 border rounded-md bg-background"
                          placeholder="123"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="address" className="text-sm font-medium">Billing Address</label>
                      <input
                        id="address"
                        type="text"
                        className="w-full p-2 border rounded-md bg-background"
                        placeholder="123 Main St"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="city" className="text-sm font-medium">City</label>
                        <input
                          id="city"
                          type="text"
                          className="w-full p-2 border rounded-md bg-background"
                          placeholder="New York"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="zip" className="text-sm font-medium">ZIP Code</label>
                        <input
                          id="zip"
                          type="text"
                          className="w-full p-2 border rounded-md bg-background"
                          placeholder="10001"
                        />
                      </div>
                    </div>
                    
                    <Button className="w-full" type="button" onClick={() => window.location.href = '/checkout/success'}>
                      Complete Purchase
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>DevOps Course</span>
                      <span>$99.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cloud Engineering Course</span>
                      <span>$99.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Data Analytics Course</span>
                      <span>$99.00</span>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>$297.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>$23.76</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>$320.76</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="mt-4 text-sm text-muted-foreground">
                <p>By completing your purchase, you agree to our <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
