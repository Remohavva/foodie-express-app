'use client'

import { useState, useEffect } from 'react'
import { Filter, Grid, List, SlidersHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { RestaurantCard } from '@/components/RestaurantCard'
import { RestaurantFilters } from '@/components/RestaurantFilters'
import { restaurants } from '@/data/restaurants'
import { Restaurant } from '@/lib/types'

export default function RestaurantsPage() {
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(restaurants)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState('relevance')
  const [filters, setFilters] = useState({
    rating: 0,
    deliveryTime: 60,
    costForTwo: [0, 1000],
    isVeg: false,
    cuisine: [] as string[]
  })

  useEffect(() => {
    let filtered = [...restaurants]

    // Apply filters
    if (filters.rating > 0) {
      filtered = filtered.filter(restaurant => restaurant.rating >= filters.rating)
    }

    if (filters.deliveryTime < 60) {
      filtered = filtered.filter(restaurant => restaurant.deliveryTime <= filters.deliveryTime)
    }

    if (filters.costForTwo[0] > 0 || filters.costForTwo[1] < 1000) {
      filtered = filtered.filter(restaurant => 
        restaurant.costForTwo >= filters.costForTwo[0] && 
        restaurant.costForTwo <= filters.costForTwo[1]
      )
    }

    if (filters.isVeg) {
      filtered = filtered.filter(restaurant => restaurant.isVeg)
    }

    if (filters.cuisine.length > 0) {
      filtered = filtered.filter(restaurant =>
        restaurant.cuisine.some(c => filters.cuisine.includes(c))
      )
    }

    // Apply sorting
    switch (sortBy) {
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'deliveryTime':
        filtered.sort((a, b) => a.deliveryTime - b.deliveryTime)
        break
      case 'costLowToHigh':
        filtered.sort((a, b) => a.costForTwo - b.costForTwo)
        break
      case 'costHighToLow':
        filtered.sort((a, b) => b.costForTwo - a.costForTwo)
        break
      case 'distance':
        filtered.sort((a, b) => (a.distance || 0) - (b.distance || 0))
        break
      default:
        // Keep original order for relevance
        break
    }

    setFilteredRestaurants(filtered)
  }, [filters, sortBy])

  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="container py-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-secondary-900 mb-2">
              Restaurants in Hyderabad
            </h1>
            <p className="text-secondary-600">
              {filteredRestaurants.length} restaurants found
            </p>
          </div>

          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-secondary-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="relevance">Relevance</option>
              <option value="rating">Rating</option>
              <option value="deliveryTime">Delivery Time</option>
              <option value="costLowToHigh">Cost: Low to High</option>
              <option value="costHighToLow">Cost: High to Low</option>
              <option value="distance">Distance</option>
            </select>

            {/* View Mode Toggle */}
            <div className="flex border border-secondary-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${
                  viewMode === 'grid'
                    ? 'bg-primary-500 text-white'
                    : 'bg-white text-secondary-600 hover:bg-secondary-50'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${
                  viewMode === 'list'
                    ? 'bg-primary-500 text-white'
                    : 'bg-white text-secondary-600 hover:bg-secondary-50'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Filters Toggle */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden"
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <div className={`${showFilters ? 'block' : 'hidden'} md:block w-full md:w-80 flex-shrink-0`}>
            <RestaurantFilters
              filters={filters}
              onFiltersChange={setFilters}
              onClose={() => setShowFilters(false)}
            />
          </div>

          {/* Restaurants Grid/List */}
          <div className="flex-1">
            {filteredRestaurants.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-secondary-200 rounded-full flex items-center justify-center">
                  <Filter className="w-8 h-8 text-secondary-500" />
                </div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                  No restaurants found
                </h3>
                <p className="text-secondary-600 mb-4">
                  Try adjusting your filters to see more results
                </p>
                <Button
                  onClick={() => setFilters({
                    rating: 0,
                    deliveryTime: 60,
                    costForTwo: [0, 1000],
                    isVeg: false,
                    cuisine: []
                  })}
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'space-y-4'
              }>
                {filteredRestaurants.map((restaurant) => (
                  <RestaurantCard
                    key={restaurant.id}
                    restaurant={restaurant}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}