'use client'

import { useState } from 'react'
import { Search, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('')
  const [location, setLocation] = useState('Hyderabad')

  const handleSearch = () => {
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <section className="relative bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 text-white">
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="relative container py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Hungry?
            <br />
            <span className="text-yellow-300">Order Now!</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-primary-100 animate-slide-up">
            Discover the best food & drinks from restaurants near you
          </p>

          {/* Search Section */}
          <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-2xl mx-auto animate-slide-up">
            {/* Location */}
            <div className="flex items-center mb-4 pb-4 border-b border-secondary-200">
              <MapPin className="w-5 h-5 text-primary-500 mr-3" />
              <div className="flex-1 text-left">
                <p className="text-sm text-secondary-600">Deliver to</p>
                <p className="font-semibold text-secondary-900">{location}</p>
              </div>
              <Button variant="ghost" size="sm" className="text-primary-500">
                Change
              </Button>
            </div>

            {/* Search Bar */}
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Search for restaurant, cuisine or a dish"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="border-0 bg-secondary-50 text-secondary-900 placeholder:text-secondary-500"
                />
              </div>
              <Button onClick={handleSearch} className="px-6">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </div>

          {/* Popular Searches */}
          <div className="mt-8 animate-fade-in">
            <p className="text-primary-100 mb-3">Popular searches:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {['Biryani', 'Pizza', 'Burger', 'Chinese', 'South Indian'].map((item) => (
                <button
                  key={item}
                  className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm hover:bg-white/20 transition-colors"
                  onClick={() => setSearchQuery(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-300/20 rounded-full blur-xl"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-orange-300/20 rounded-full blur-xl"></div>
    </section>
  )
}