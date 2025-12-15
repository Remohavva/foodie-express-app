'use client'

import { X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

interface Filters {
  rating: number
  deliveryTime: number
  costForTwo: [number, number]
  isVeg: boolean
  cuisine: string[]
}

interface RestaurantFiltersProps {
  filters: Filters
  onFiltersChange: (filters: Filters) => void
  onClose?: () => void
}

const cuisines = [
  'North Indian', 'South Indian', 'Chinese', 'Italian', 'Mexican',
  'Biryani', 'Pizza', 'Burgers', 'Fast Food', 'Desserts',
  'Healthy', 'Beverages', 'Street Food', 'Tandoor'
]

export function RestaurantFilters({ filters, onFiltersChange, onClose }: RestaurantFiltersProps) {
  const updateFilter = (key: keyof Filters, value: any) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const toggleCuisine = (cuisine: string) => {
    const newCuisines = filters.cuisine.includes(cuisine)
      ? filters.cuisine.filter(c => c !== cuisine)
      : [...filters.cuisine, cuisine]
    updateFilter('cuisine', newCuisines)
  }

  const clearAllFilters = () => {
    onFiltersChange({
      rating: 0,
      deliveryTime: 60,
      costForTwo: [0, 1000],
      isVeg: false,
      cuisine: []
    })
  }

  return (
    <Card className="sticky top-6">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg">Filters</CardTitle>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-primary-500 hover:text-primary-600"
          >
            Clear All
          </Button>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose} className="md:hidden">
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Rating Filter */}
        <div>
          <h3 className="font-medium text-secondary-900 mb-3">Rating</h3>
          <div className="space-y-2">
            {[4.5, 4.0, 3.5, 3.0].map((rating) => (
              <label key={rating} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="rating"
                  checked={filters.rating === rating}
                  onChange={() => updateFilter('rating', rating)}
                  className="text-primary-500 focus:ring-primary-500"
                />
                <span className="text-sm text-secondary-700">
                  {rating}+ stars
                </span>
              </label>
            ))}
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="rating"
                checked={filters.rating === 0}
                onChange={() => updateFilter('rating', 0)}
                className="text-primary-500 focus:ring-primary-500"
              />
              <span className="text-sm text-secondary-700">Any rating</span>
            </label>
          </div>
        </div>

        {/* Delivery Time Filter */}
        <div>
          <h3 className="font-medium text-secondary-900 mb-3">Delivery Time</h3>
          <div className="space-y-2">
            {[15, 30, 45, 60].map((time) => (
              <label key={time} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="deliveryTime"
                  checked={filters.deliveryTime === time}
                  onChange={() => updateFilter('deliveryTime', time)}
                  className="text-primary-500 focus:ring-primary-500"
                />
                <span className="text-sm text-secondary-700">
                  Under {time} mins
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Cost Filter */}
        <div>
          <h3 className="font-medium text-secondary-900 mb-3">Cost for Two</h3>
          <div className="space-y-2">
            {[
              [0, 300],
              [300, 600],
              [600, 900],
              [900, 1000]
            ].map(([min, max]) => (
              <label key={`${min}-${max}`} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="costForTwo"
                  checked={filters.costForTwo[0] === min && filters.costForTwo[1] === max}
                  onChange={() => updateFilter('costForTwo', [min, max])}
                  className="text-primary-500 focus:ring-primary-500"
                />
                <span className="text-sm text-secondary-700">
                  ₹{min} - ₹{max}
                </span>
              </label>
            ))}
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="costForTwo"
                checked={filters.costForTwo[0] === 0 && filters.costForTwo[1] === 1000}
                onChange={() => updateFilter('costForTwo', [0, 1000])}
                className="text-primary-500 focus:ring-primary-500"
              />
              <span className="text-sm text-secondary-700">Any price</span>
            </label>
          </div>
        </div>

        {/* Veg Filter */}
        <div>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.isVeg}
              onChange={(e) => updateFilter('isVeg', e.target.checked)}
              className="text-primary-500 focus:ring-primary-500 rounded"
            />
            <span className="font-medium text-secondary-900">Pure Veg</span>
          </label>
        </div>

        {/* Cuisine Filter */}
        <div>
          <h3 className="font-medium text-secondary-900 mb-3">Cuisines</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {cuisines.map((cuisine) => (
              <label key={cuisine} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.cuisine.includes(cuisine)}
                  onChange={() => toggleCuisine(cuisine)}
                  className="text-primary-500 focus:ring-primary-500 rounded"
                />
                <span className="text-sm text-secondary-700">{cuisine}</span>
              </label>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}