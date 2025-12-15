'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search, Clock, TrendingUp } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { RestaurantCard } from '@/components/RestaurantCard'
import { restaurants } from '@/data/restaurants'
import { menuItems } from '@/data/menu'
import { Restaurant, MenuItem } from '@/lib/types'
import { debounce } from '@/lib/utils'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  
  const [query, setQuery] = useState(initialQuery)
  const [searchResults, setSearchResults] = useState<{
    restaurants: Restaurant[]
    dishes: (MenuItem & { restaurantName: string; restaurantId: string })[]
  }>({ restaurants: [], dishes: [] })
  const [isSearching, setIsSearching] = useState(false)
  const [recentSearches] = useState([
    'Biryani', 'Pizza', 'Burger', 'Chinese', 'Dosa'
  ])
  const [trendingSearches] = useState([
    'Chicken Biryani', 'Margherita Pizza', 'Masala Dosa', 'Butter Chicken', 'Veg Burger'
  ])

  const performSearch = debounce((searchQuery: string) => {
    if (!searchQuery.trim()) {
      setSearchResults({ restaurants: [], dishes: [] })
      setIsSearching(false)
      return
    }

    setIsSearching(true)

    // Simulate API delay
    setTimeout(() => {
      const query = searchQuery.toLowerCase()

      // Search restaurants
      const matchingRestaurants = restaurants.filter(restaurant =>
        restaurant.name.toLowerCase().includes(query) ||
        restaurant.cuisine.some(c => c.toLowerCase().includes(query))
      )

      // Search dishes
      const matchingDishes: (MenuItem & { restaurantName: string; restaurantId: string })[] = []
      
      Object.entries(menuItems).forEach(([restaurantId, items]) => {
        const restaurant = restaurants.find(r => r.id === restaurantId)
        if (restaurant) {
          items.forEach(item => {
            if (
              item.name.toLowerCase().includes(query) ||
              item.description.toLowerCase().includes(query) ||
              item.category.toLowerCase().includes(query)
            ) {
              matchingDishes.push({
                ...item,
                restaurantName: restaurant.name,
                restaurantId: restaurant.id
              })
            }
          })
        }
      })

      setSearchResults({
        restaurants: matchingRestaurants,
        dishes: matchingDishes
      })
      setIsSearching(false)
    }, 500)
  }, 300)

  useEffect(() => {
    performSearch(query)
  }, [query])

  const handleSearchClick = (searchTerm: string) => {
    setQuery(searchTerm)
  }

  const totalResults = searchResults.restaurants.length + searchResults.dishes.length

  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="container py-6">
        {/* Search Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-500 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search for restaurants, cuisines or dishes"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 h-12 text-lg"
            />
          </div>

          {/* Search Suggestions */}
          {!query && (
            <div className="mt-6 space-y-4">
              {/* Recent Searches */}
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <Clock className="w-4 h-4 text-secondary-500" />
                  <h3 className="font-medium text-secondary-900">Recent Searches</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((search) => (
                    <button
                      key={search}
                      onClick={() => handleSearchClick(search)}
                      className="px-3 py-1.5 bg-secondary-100 hover:bg-secondary-200 text-secondary-700 rounded-full text-sm transition-colors"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>

              {/* Trending Searches */}
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <TrendingUp className="w-4 h-4 text-primary-500" />
                  <h3 className="font-medium text-secondary-900">Trending</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {trendingSearches.map((search) => (
                    <button
                      key={search}
                      onClick={() => handleSearchClick(search)}
                      className="px-3 py-1.5 bg-primary-50 hover:bg-primary-100 text-primary-700 rounded-full text-sm transition-colors"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Search Results */}
        {query && (
          <div>
            {isSearching ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto mb-4"></div>
                <p className="text-secondary-600">Searching...</p>
              </div>
            ) : totalResults === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-secondary-200 rounded-full flex items-center justify-center">
                  <Search className="w-8 h-8 text-secondary-500" />
                </div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                  No results found for "{query}"
                </h3>
                <p className="text-secondary-600 mb-4">
                  Try searching for something else or check the spelling
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Results Summary */}
                <div className="bg-white rounded-lg p-4">
                  <p className="text-secondary-600">
                    Found {totalResults} result{totalResults !== 1 ? 's' : ''} for "{query}"
                  </p>
                </div>

                {/* Restaurants */}
                {searchResults.restaurants.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold text-secondary-900 mb-4">
                      Restaurants ({searchResults.restaurants.length})
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {searchResults.restaurants.map((restaurant) => (
                        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Dishes */}
                {searchResults.dishes.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold text-secondary-900 mb-4">
                      Dishes ({searchResults.dishes.length})
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {searchResults.dishes.map((dish) => (
                        <div key={`${dish.restaurantId}-${dish.id}`} className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex items-start space-x-4">
                            {dish.image && (
                              <img
                                src={dish.image}
                                alt={dish.name}
                                className="w-16 h-16 rounded-lg object-cover"
                              />
                            )}
                            <div className="flex-1">
                              <h3 className="font-semibold text-secondary-900 mb-1">
                                {dish.name}
                              </h3>
                              <p className="text-sm text-secondary-600 mb-2 line-clamp-2">
                                {dish.description}
                              </p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <span className="font-semibold text-secondary-900">
                                    ₹{dish.price}
                                  </span>
                                  <div className={`w-3 h-3 rounded-full ${
                                    dish.isVeg ? 'bg-green-500' : 'bg-red-500'
                                  }`} />
                                </div>
                                <p className="text-sm text-primary-600 font-medium">
                                  from {dish.restaurantName}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}