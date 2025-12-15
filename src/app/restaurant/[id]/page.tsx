'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { Star, Clock, MapPin, Heart, Share2, Search } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { MenuItemCard } from '@/components/MenuItemCard'
import { restaurants } from '@/data/restaurants'
import { menuItems } from '@/data/menu'
import { Restaurant, MenuItem } from '@/lib/types'
import { formatPrice, formatRating, formatDeliveryTime } from '@/lib/utils'

export default function RestaurantDetailPage() {
  const params = useParams()
  const restaurantId = params.id as string
  
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null)
  const [menu, setMenu] = useState<MenuItem[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [filteredMenu, setFilteredMenu] = useState<MenuItem[]>([])
  const [isVegOnly, setIsVegOnly] = useState(false)

  useEffect(() => {
    // Find restaurant
    const foundRestaurant = restaurants.find(r => r.id === restaurantId)
    setRestaurant(foundRestaurant || null)

    // Get menu items
    const restaurantMenu = menuItems[restaurantId] || []
    setMenu(restaurantMenu)
    setFilteredMenu(restaurantMenu)
  }, [restaurantId])

  useEffect(() => {
    let filtered = menu

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory)
    }

    // Filter by veg only
    if (isVegOnly) {
      filtered = filtered.filter(item => item.isVeg)
    }

    setFilteredMenu(filtered)
  }, [menu, searchQuery, selectedCategory, isVegOnly])

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-secondary-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-secondary-600">Loading restaurant...</p>
        </div>
      </div>
    )
  }

  const categories = ['all', ...Array.from(new Set(menu.map(item => item.category)))]

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Restaurant Header */}
      <div className="relative h-64 md:h-80">
        <Image
          src={restaurant.image}
          alt={restaurant.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Header Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="container">
            <div className="flex items-end justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  {restaurant.name}
                </h1>
                <p className="text-lg mb-2 opacity-90">
                  {restaurant.cuisine.join(', ')}
                </p>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-current text-yellow-400" />
                    <span>{formatRating(restaurant.rating)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{formatDeliveryTime(restaurant.deliveryTime)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{restaurant.distance} km away</span>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button variant="secondary" size="sm">
                  <Heart className="w-4 h-4 mr-2" />
                  Save
                </Button>
                <Button variant="secondary" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Restaurant Info */}
      <div className="bg-white border-b border-secondary-200">
        <div className="container py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <Badge variant={restaurant.isVeg ? 'veg' : 'non-veg'}>
                <div className={`w-2 h-2 rounded-full mr-1 ${
                  restaurant.isVeg ? 'bg-green-500' : 'bg-red-500'
                }`} />
                {restaurant.isVeg ? 'Pure Veg' : 'Non-Veg'}
              </Badge>
              <span className="text-secondary-600">
                {formatPrice(restaurant.costForTwo)} for two
              </span>
            </div>
            
            {restaurant.offers && restaurant.offers.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {restaurant.offers.map((offer, index) => (
                  <Badge key={index} variant="warning" className="bg-yellow-100 text-yellow-800">
                    {offer}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Menu Categories Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-4">
              {/* Search Menu */}
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-500 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search menu..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Veg Filter */}
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isVegOnly}
                    onChange={(e) => setIsVegOnly(e.target.checked)}
                    className="text-primary-500 focus:ring-primary-500 rounded"
                  />
                  <span className="font-medium text-secondary-900">Veg Only</span>
                </label>
              </div>

              {/* Categories */}
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold text-secondary-900 mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedCategory === category
                          ? 'bg-primary-500 text-white'
                          : 'text-secondary-700 hover:bg-secondary-100'
                      }`}
                    >
                      {category === 'all' ? 'All Items' : category}
                      <span className="float-right text-xs opacity-75">
                        {category === 'all' 
                          ? menu.length 
                          : menu.filter(item => item.category === category).length
                        }
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="lg:col-span-3">
            {filteredMenu.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-secondary-200 rounded-full flex items-center justify-center">
                  <Search className="w-8 h-8 text-secondary-500" />
                </div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                  No items found
                </h3>
                <p className="text-secondary-600">
                  Try adjusting your search or filters
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Group by category */}
                {categories
                  .filter(cat => cat !== 'all')
                  .filter(cat => selectedCategory === 'all' || selectedCategory === cat)
                  .map(category => {
                    const categoryItems = filteredMenu.filter(item => item.category === category)
                    if (categoryItems.length === 0) return null

                    return (
                      <div key={category} id={category} className="scroll-mt-6">
                        <h2 className="text-xl font-semibold text-secondary-900 mb-4 pb-2 border-b border-secondary-200">
                          {category} ({categoryItems.length})
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {categoryItems.map((item) => (
                            <MenuItemCard
                              key={item.id}
                              item={item}
                              restaurantId={restaurantId}
                            />
                          ))}
                        </div>
                      </div>
                    )
                  })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}