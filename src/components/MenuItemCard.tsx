'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Plus, Minus, Star } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Card, CardContent } from '@/components/ui/Card'
import { MenuItem } from '@/lib/types'
import { useCartStore } from '@/lib/store'
import { formatPrice, formatRating, generateId } from '@/lib/utils'

interface MenuItemCardProps {
  item: MenuItem
  restaurantId: string
}

export function MenuItemCard({ item, restaurantId }: MenuItemCardProps) {
  const { addItem, items } = useCartStore()
  const [quantity, setQuantity] = useState(0)
  const [showCustomization, setShowCustomization] = useState(false)

  // Check if item is already in cart
  const cartItem = items.find(cartItem => 
    cartItem.menuItem.id === item.id && cartItem.restaurantId === restaurantId
  )
  const currentQuantity = cartItem?.quantity || 0

  const handleAddToCart = () => {
    const cartItem = {
      id: generateId(),
      menuItem: item,
      quantity: 1,
      restaurantId,
      customizations: {}
    }
    
    addItem(cartItem)
    setQuantity(currentQuantity + 1)
  }

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity === 0) {
      // Remove from cart logic would go here
      setQuantity(0)
    } else {
      // Update cart logic would go here
      setQuantity(newQuantity)
    }
  }

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start space-x-4">
          <div className="flex-1">
            {/* Item Header */}
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Badge variant={item.isVeg ? 'veg' : 'non-veg'}>
                  <div className={`w-2 h-2 rounded-full mr-1 ${
                    item.isVeg ? 'bg-green-500' : 'bg-red-500'
                  }`} />
                </Badge>
                {item.isPopular && (
                  <Badge variant="warning" className="bg-orange-100 text-orange-800">
                    ⭐ Popular
                  </Badge>
                )}
              </div>
            </div>

            {/* Item Name */}
            <h3 className="font-semibold text-secondary-900 mb-2 text-lg">
              {item.name}
            </h3>

            {/* Rating */}
            {item.rating && (
              <div className="flex items-center space-x-1 mb-2">
                <Star className="w-4 h-4 fill-current text-yellow-400" />
                <span className="text-sm font-medium text-secondary-700">
                  {formatRating(item.rating)}
                </span>
              </div>
            )}

            {/* Price */}
            <div className="mb-3">
              <span className="text-lg font-bold text-secondary-900">
                {formatPrice(item.price)}
              </span>
            </div>

            {/* Description */}
            <p className="text-sm text-secondary-600 mb-4 line-clamp-2">
              {item.description}
            </p>

            {/* Add to Cart Button */}
            <div className="flex items-center justify-between">
              {currentQuantity === 0 ? (
                <Button
                  onClick={handleAddToCart}
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add</span>
                </Button>
              ) : (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleQuantityChange(currentQuantity - 1)}
                    className="w-8 h-8 rounded-full border border-primary-500 text-primary-500 flex items-center justify-center hover:bg-primary-50"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-medium text-primary-500 min-w-[2rem] text-center">
                    {currentQuantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(currentQuantity + 1)}
                    className="w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center hover:bg-primary-600"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Customization */}
              {item.customizations && item.customizations.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowCustomization(true)}
                >
                  Customize
                </Button>
              )}
            </div>
          </div>

          {/* Item Image */}
          {item.image && (
            <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}