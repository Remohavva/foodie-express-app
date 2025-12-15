'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { CheckCircle, Clock, MapPin, Phone } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

export default function OrderSuccessPage() {
  const [orderNumber] = useState(() => 
    'FE' + Math.random().toString(36).substr(2, 8).toUpperCase()
  )
  const [estimatedTime] = useState(() => 
    new Date(Date.now() + (Math.random() * 20 + 25) * 60000) // 25-45 minutes
  )

  useEffect(() => {
    // Confetti animation or success sound could be added here
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container max-w-2xl">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6 animate-bounce-in">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Order Placed Successfully!
          </h1>
          
          <p className="text-lg text-gray-600 mb-6">
            Thank you for your order. We're preparing your delicious meal.
          </p>

          <div className="bg-orange-50 border border-primary-200 rounded-lg p-4 inline-block">
            <p className="text-primary-800 font-medium">
              Order ID: <span className="font-bold">{orderNumber}</span>
            </p>
          </div>
        </div>

        {/* Order Details */}
        <div className="space-y-6">
          {/* Delivery Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-orange-500" />
                <span>Delivery Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                <div>
                  <p className="font-medium text-green-800">
                    Estimated Delivery Time
                  </p>
                  <p className="text-green-700">
                    {estimatedTime.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-green-600">
                    In about
                  </p>
                  <p className="font-bold text-green-800">
                    25-35 mins
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg">
                <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900 mb-1">
                    Delivering to Home
                  </p>
                  <p className="text-gray-700">
                    123 Main Street, Banjara Hills
                  </p>
                  <p className="text-gray-600">
                    Near City Center Mall, Hyderabad, 500034
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Status */}
          <Card>
            <CardHeader>
              <CardTitle>Order Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { status: 'Order Placed', time: 'Just now', completed: true },
                  { status: 'Order Confirmed', time: '2-3 mins', completed: false },
                  { status: 'Preparing Food', time: '10-15 mins', completed: false },
                  { status: 'Out for Delivery', time: '20-25 mins', completed: false },
                  { status: 'Delivered', time: '25-35 mins', completed: false }
                ].map((step, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      step.completed 
                        ? 'bg-green-500 border-green-500' 
                        : 'border-gray-300'
                    }`}>
                      {step.completed && (
                        <CheckCircle className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium ${
                        step.completed ? 'text-green-700' : 'text-gray-600'
                      }`}>
                        {step.status}
                      </p>
                    </div>
                    <p className="text-sm text-gray-500">
                      {step.time}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-orange-500" />
                <span>Need Help?</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="text-center p-4 border border-gray-200 rounded-lg">
                  <p className="font-medium text-gray-900 mb-1">
                    Call Restaurant
                  </p>
                  <p className="text-orange-600 font-medium">
                    +91 98765 43210
                  </p>
                </div>
                <div className="text-center p-4 border border-gray-200 rounded-lg">
                  <p className="font-medium text-gray-900 mb-1">
                    Customer Support
                  </p>
                  <p className="text-orange-600 font-medium">
                    +91 98765 43211
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/orders" className="flex-1">
              <Button variant="outline" className="w-full">
                Track Order
              </Button>
            </Link>
            <Link href="/" className="flex-1">
              <Button className="w-full">
                Continue Shopping
              </Button>
            </Link>
          </div>

          {/* Share Experience */}
          <Card>
            <CardContent className="text-center py-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                Enjoying our service?
              </h3>
              <p className="text-gray-600 mb-4">
                Share your experience and help others discover great food!
              </p>
              <div className="flex justify-center space-x-3">
                <Button variant="outline" size="sm">
                  Rate Order
                </Button>
                <Button variant="outline" size="sm">
                  Share on Social
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}