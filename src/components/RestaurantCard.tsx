import Image from 'next/image'
import Link from 'next/link'
import { Star, Clock, MapPin } from 'lucide-react'
import { Restaurant } from '@/lib/types'
import { Badge } from '@/components/ui/Badge'
import { formatPrice, formatRating, formatDeliveryTime } from '@/lib/utils'

interface RestaurantCardProps {
  restaurant: Restaurant
}

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <Link href={`/restaurant/${restaurant.id}`}>
      <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={restaurant.image}
            alt={restaurant.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Offers Badge */}
          {restaurant.offers && restaurant.offers.length > 0 && (
            <div className="absolute top-3 left-3">
              <Badge variant="warning" className="bg-yellow-400 text-yellow-900 font-semibold">
                {restaurant.offers[0]}
              </Badge>
            </div>
          )}

          {/* Veg/Non-Veg Badge */}
          <div className="absolute top-3 right-3">
            <Badge variant={restaurant.isVeg ? 'veg' : 'non-veg'}>
              <div className={`w-2 h-2 rounded-full mr-1 ${
                restaurant.isVeg ? 'bg-green-500' : 'bg-red-500'
              }`} />
              {restaurant.isVeg ? 'Veg' : 'Non-Veg'}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Restaurant Name */}
          <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-orange-500 transition-colors">
            {restaurant.name}
          </h3>

          {/* Cuisine */}
          <p className="text-gray-600 text-sm mb-3 line-clamp-1">
            {restaurant.cuisine.join(', ')}
          </p>

          {/* Rating, Time, Cost */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              {/* Rating */}
              <div className="flex items-center space-x-1">
                <div className={`flex items-center space-x-1 px-2 py-1 rounded ${
                  restaurant.rating >= 4.0 
                    ? 'bg-green-100 text-green-800' 
                    : restaurant.rating >= 3.5 
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  <Star className="w-3 h-3 fill-current" />
                  <span className="font-medium">{formatRating(restaurant.rating)}</span>
                </div>
              </div>

              {/* Delivery Time */}
              <div className="flex items-center space-x-1 text-gray-600">
                <Clock className="w-3 h-3" />
                <span>{formatDeliveryTime(restaurant.deliveryTime)}</span>
              </div>
            </div>

            {/* Cost for Two */}
            <div className="text-gray-900 font-medium">
              {formatPrice(restaurant.costForTwo)} for two
            </div>
          </div>

          {/* Distance */}
          {restaurant.distance && (
            <div className="flex items-center space-x-1 text-gray-500 text-xs mt-2">
              <MapPin className="w-3 h-3" />
              <span>{restaurant.distance} km away</span>
            </div>
          )}

          {/* Additional Offers */}
          {restaurant.offers && restaurant.offers.length > 1 && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-600">
                +{restaurant.offers.length - 1} more offer{restaurant.offers.length > 2 ? 's' : ''}
              </p>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}