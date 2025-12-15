import Link from 'next/link'
import { RestaurantCard } from '@/components/RestaurantCard'
import { restaurants } from '@/data/restaurants'

export function RestaurantsSection() {
  const topRatedRestaurants = restaurants
    .filter(restaurant => restaurant.rating >= 4.2)
    .slice(0, 6)

  const nearbyRestaurants = restaurants
    .filter(restaurant => restaurant.distance && restaurant.distance <= 3)
    .slice(0, 6)

  return (
    <section className="py-12 bg-gray-50">
      <div className="container">
        {/* Top Rated Restaurants */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Top Rated Near You
              </h2>
              <p className="text-gray-600">
                Highly rated restaurants in your area
              </p>
            </div>
            <Link
              href="/restaurants?sort=rating"
              className="text-orange-500 hover:text-orange-600 font-medium transition-colors"
            >
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topRatedRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </div>

        {/* Nearby Restaurants */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Restaurants Nearby
              </h2>
              <p className="text-gray-600">
                Quick delivery from restaurants close to you
              </p>
            </div>
            <Link
              href="/restaurants?sort=distance"
              className="text-orange-500 hover:text-orange-600 font-medium transition-colors"
            >
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nearbyRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center bg-white rounded-2xl p-8 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Can't find what you're looking for?
          </h3>
          <p className="text-gray-600 mb-4">
            Explore all restaurants and cuisines in your area
          </p>
          <Link
            href="/restaurants"
            className="inline-flex items-center bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Browse All Restaurants
          </Link>
        </div>
      </div>
    </section>
  )
}