'use client'

import { useState } from 'react'
import { Clock, MapPin, RefreshCw, Star, Phone } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { formatPrice } from '@/lib/utils'

// Mock orders data
const mockOrders = [
  {
    id: 'FE12345678',
    restaurantName: 'Biryani Blues',
    restaurantImage: 'https://images.unsplash.com/photo-1563379091339-03246963d51a?w=100',
    items: [
      { name: 'Chicken Biryani', quantity: 1, price: 299 },
      { name: 'Raita', quantity: 1, price: 49 }
    ],
    total: 398,
    status: 'delivered',
    orderTime: new Date('2024-01-15T19:30:00'),
    deliveryTime: new Date('2024-01-15T20:15:00'),
    address: '123 Main Street, Banjara Hills'
  },
  {
    id: 'FE87654321',
    restaurantName: 'Pizza Palace',
    restaurantImage: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=100',
    items: [
      { name: 'Margherita Pizza', quantity: 1, price: 299 },
      { name: 'Garlic Bread', quantity: 1, price: 99 }
    ],
    total: 447,
    status: 'out_for_delivery',
    orderTime: new Date('2024-01-16T18:45:00'),
    address: '123 Main Street, Banjara Hills'
  },
  {
    id: 'FE11223344',
    restaurantName: 'Green Garden',
    restaurantImage: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=100',
    items: [
      { name: 'Masala Dosa', quantity: 2, price: 149 },
      { name: 'Filter Coffee', quantity: 1, price: 79 }
    ],
    total: 426,
    status: 'cancelled',
    orderTime: new Date('2024-01-14T12:30:00'),
    address: '123 Main Street, Banjara Hills'
  }
]

const statusConfig = {
  placed: { label: 'Order Placed', color: 'bg-blue-100 text-blue-800' },
  confirmed: { label: 'Confirmed', color: 'bg-yellow-100 text-yellow-800' },
  preparing: { label: 'Preparing', color: 'bg-orange-100 text-orange-800' },
  out_for_delivery: { label: 'Out for Delivery', color: 'bg-purple-100 text-purple-800' },
  delivered: { label: 'Delivered', color: 'bg-green-100 text-green-800' },
  cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-800' }
}

export default function OrdersPage() {
  const [filter, setFilter] = useState<'all' | 'active' | 'delivered' | 'cancelled'>('all')

  const filteredOrders = mockOrders.filter(order => {
    if (filter === 'all') return true
    if (filter === 'active') return ['placed', 'confirmed', 'preparing', 'out_for_delivery'].includes(order.status)
    if (filter === 'delivered') return order.status === 'delivered'
    if (filter === 'cancelled') return order.status === 'cancelled'
    return true
  })

  const handleReorder = (orderId: string) => {
    // Reorder logic would go here
    alert(`Reordering ${orderId}`)
  }

  const handleTrackOrder = (orderId: string) => {
    // Track order logic would go here
    alert(`Tracking ${orderId}`)
  }

  const handleRateOrder = (orderId: string) => {
    // Rate order logic would go here
    alert(`Rating ${orderId}`)
  }

  return (
    <div className="min-h-screen bg-secondary-50 py-6">
      <div className="container max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-secondary-900">
            My Orders
          </h1>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-1 mb-6 bg-white rounded-lg p-1 shadow-sm">
          {[
            { key: 'all', label: 'All Orders' },
            { key: 'active', label: 'Active' },
            { key: 'delivered', label: 'Delivered' },
            { key: 'cancelled', label: 'Cancelled' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key as any)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                filter === tab.key
                  ? 'bg-primary-500 text-white'
                  : 'text-secondary-600 hover:text-secondary-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-secondary-200 rounded-full flex items-center justify-center">
              <Clock className="w-8 h-8 text-secondary-500" />
            </div>
            <h3 className="text-lg font-semibold text-secondary-900 mb-2">
              No orders found
            </h3>
            <p className="text-secondary-600 mb-4">
              {filter === 'all' 
                ? "You haven't placed any orders yet"
                : `No ${filter} orders found`
              }
            </p>
            <Button onClick={() => window.location.href = '/restaurants'}>
              Start Ordering
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <Card key={order.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <img
                        src={order.restaurantImage}
                        alt={order.restaurantName}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-secondary-900 mb-1">
                          {order.restaurantName}
                        </h3>
                        <p className="text-sm text-secondary-600 mb-2">
                          Order #{order.id}
                        </p>
                        <div className="flex items-center space-x-2">
                          <Badge className={statusConfig[order.status as keyof typeof statusConfig].color}>
                            {statusConfig[order.status as keyof typeof statusConfig].label}
                          </Badge>
                          <span className="text-sm text-secondary-600">
                            {order.orderTime.toLocaleDateString()} at {order.orderTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-semibold text-secondary-900 mb-1">
                        {formatPrice(order.total)}
                      </p>
                      <p className="text-sm text-secondary-600">
                        {order.items.length} item{order.items.length > 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="mb-4">
                    <div className="space-y-1">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="text-secondary-700">
                            {item.quantity}x {item.name}
                          </span>
                          <span className="text-secondary-900">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Delivery Address */}
                  <div className="flex items-start space-x-2 mb-4 p-3 bg-secondary-50 rounded-lg">
                    <MapPin className="w-4 h-4 text-secondary-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-secondary-900">Delivered to</p>
                      <p className="text-sm text-secondary-600">{order.address}</p>
                    </div>
                  </div>

                  {/* Delivery Time */}
                  {order.deliveryTime && (
                    <div className="flex items-center space-x-2 mb-4 text-sm text-green-700">
                      <Clock className="w-4 h-4" />
                      <span>
                        Delivered at {order.deliveryTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2">
                    {order.status === 'delivered' && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleReorder(order.id)}
                        >
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Reorder
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRateOrder(order.id)}
                        >
                          <Star className="w-4 h-4 mr-2" />
                          Rate Order
                        </Button>
                      </>
                    )}
                    
                    {['placed', 'confirmed', 'preparing', 'out_for_delivery'].includes(order.status) && (
                      <>
                        <Button
                          size="sm"
                          onClick={() => handleTrackOrder(order.id)}
                        >
                          Track Order
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          Call Restaurant
                        </Button>
                      </>
                    )}
                    
                    <Button variant="outline" size="sm">
                      Get Help
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}