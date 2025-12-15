'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MapPin, CreditCard, Smartphone, Banknote, Clock } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { useCartStore, useUserStore } from '@/lib/store'
import { formatPrice } from '@/lib/utils'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotalPrice, clearCart } = useCartStore()
  const { addresses, selectedAddress, setSelectedAddress } = useUserStore()
  
  const [paymentMethod, setPaymentMethod] = useState('upi')
  const [isPlacingOrder, setIsPlacingOrder] = useState(false)

  const subtotal = getTotalPrice()
  const deliveryFee = subtotal > 299 ? 0 : 49
  const taxes = Math.round(subtotal * 0.05)
  const total = subtotal + deliveryFee + taxes

  const paymentMethods = [
    { id: 'upi', name: 'UPI', icon: Smartphone, description: 'Pay using UPI apps' },
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard, description: 'Visa, Mastercard, etc.' },
    { id: 'cod', name: 'Cash on Delivery', icon: Banknote, description: 'Pay when you receive' }
  ]

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      alert('Please select a delivery address')
      return
    }

    setIsPlacingOrder(true)

    // Simulate order placement
    setTimeout(() => {
      clearCart()
      router.push('/order-success')
    }, 2000)
  }

  // Handle SSR - don't redirect during server rendering
  if (typeof window !== 'undefined' && items.length === 0) {
    router.push('/cart')
    return null
  }

  // Show loading during SSR or when cart is empty
  if (typeof window === 'undefined' || items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="container max-w-4xl">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5" />
                  <span>Delivery Address</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {addresses.map((address) => (
                  <div
                    key={address.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedAddress?.id === address.id
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedAddress(address)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-gray-900 capitalize">
                            {address.type}
                          </span>
                          {address.isDefault && (
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-gray-700 mb-1">{address.address}</p>
                        {address.landmark && (
                          <p className="text-sm text-gray-600">
                            Landmark: {address.landmark}
                          </p>
                        )}
                        <p className="text-sm text-gray-600">
                          {address.city}, {address.pincode}
                        </p>
                      </div>
                      <input
                        type="radio"
                        checked={selectedAddress?.id === address.id}
                        onChange={() => setSelectedAddress(address)}
                        className="text-orange-500 focus:ring-orange-500"
                      />
                    </div>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full">
                  + Add New Address
                </Button>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="w-5 h-5" />
                  <span>Payment Method</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {paymentMethods.map((method) => {
                  const Icon = method.icon
                  return (
                    <div
                      key={method.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        paymentMethod === method.id
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setPaymentMethod(method.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Icon className="w-5 h-5 text-gray-600" />
                          <div>
                            <p className="font-medium text-gray-900">
                              {method.name}
                            </p>
                            <p className="text-sm text-gray-600">
                              {method.description}
                            </p>
                          </div>
                        </div>
                        <input
                          type="radio"
                          checked={paymentMethod === method.id}
                          onChange={() => setPaymentMethod(method.id)}
                          className="text-orange-500 focus:ring-orange-500"
                        />
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            {/* Delivery Instructions */}
            <Card>
              <CardHeader>
                <CardTitle>Delivery Instructions (Optional)</CardTitle>
              </CardHeader>
              <CardContent>
                <textarea
                  placeholder="Add any special instructions for delivery..."
                  className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  rows={3}
                />
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Items */}
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">
                          {item.menuItem.name}
                        </p>
                        <p className="text-gray-600">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="font-medium text-gray-900">
                        {formatPrice(item.menuItem.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Bill Details */}
                <div className="space-y-2 pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900">{formatPrice(subtotal)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="text-gray-900">
                      {deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Taxes & Fees</span>
                    <span className="text-gray-900">{formatPrice(taxes)}</span>
                  </div>
                  
                  <div className="flex justify-between font-semibold text-lg pt-2 border-t border-gray-200">
                    <span className="text-gray-900">Total</span>
                    <span className="text-gray-900">{formatPrice(total)}</span>
                  </div>
                </div>

                {/* Delivery Time */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-green-600" />
                    <p className="text-sm text-green-800">
                      Delivery in 25-35 minutes
                    </p>
                  </div>
                </div>

                {/* Place Order Button */}
                <Button
                  onClick={handlePlaceOrder}
                  className="w-full"
                  size="lg"
                  loading={isPlacingOrder}
                  disabled={!selectedAddress}
                >
                  {isPlacingOrder ? 'Placing Order...' : `Place Order • ${formatPrice(total)}`}
                </Button>

                {/* Terms */}
                <p className="text-xs text-gray-600 text-center">
                  By placing this order, you agree to our{' '}
                  <a href="/terms" className="text-orange-500 hover:text-orange-600">
                    Terms & Conditions
                  </a>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}