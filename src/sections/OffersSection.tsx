'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const offers = [
  {
    id: 1,
    title: '50% OFF',
    subtitle: 'On your first order',
    description: 'Use code WELCOME50',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&h=300&fit=crop',
    bgColor: 'from-red-500 to-pink-600'
  },
  {
    id: 2,
    title: 'Free Delivery',
    subtitle: 'On orders above ₹299',
    description: 'No delivery charges',
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600&h=300&fit=crop',
    bgColor: 'from-green-500 to-emerald-600'
  },
  {
    id: 3,
    title: 'Buy 1 Get 1',
    subtitle: 'On selected restaurants',
    description: 'Limited time offer',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&h=300&fit=crop',
    bgColor: 'from-blue-500 to-indigo-600'
  },
  {
    id: 4,
    title: '₹100 Cashback',
    subtitle: 'On UPI payments',
    description: 'Max cashback ₹100',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=300&fit=crop',
    bgColor: 'from-purple-500 to-violet-600'
  }
]

export function OffersSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % offers.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % offers.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + offers.length) % offers.length)
  }

  return (
    <section className="py-8 bg-gray-50">
      <div className="container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Best Offers for You
          </h2>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={prevSlide}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={nextSlide}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Desktop Carousel */}
        <div className="hidden md:block relative overflow-hidden rounded-2xl">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {offers.map((offer) => (
              <div key={offer.id} className="w-full flex-shrink-0">
                <div className={`relative h-64 bg-gradient-to-r ${offer.bgColor} rounded-2xl overflow-hidden`}>
                  <div className="absolute inset-0 flex items-center">
                    <div className="flex-1 p-8 text-white">
                      <h3 className="text-4xl font-bold mb-2">{offer.title}</h3>
                      <p className="text-xl mb-2">{offer.subtitle}</p>
                      <p className="text-lg opacity-90 mb-4">{offer.description}</p>
                      <Button variant="secondary" className="bg-white text-gray-900 hover:bg-gray-100">
                        Order Now
                      </Button>
                    </div>
                    <div className="flex-1 relative h-full">
                      <Image
                        src={offer.image}
                        alt={offer.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden grid grid-cols-1 gap-4">
          {offers.map((offer) => (
            <div key={offer.id} className={`relative h-48 bg-gradient-to-r ${offer.bgColor} rounded-xl overflow-hidden`}>
              <div className="absolute inset-0 flex items-center p-6 text-white">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-1">{offer.title}</h3>
                  <p className="text-lg mb-1">{offer.subtitle}</p>
                  <p className="text-sm opacity-90 mb-3">{offer.description}</p>
                  <Button variant="secondary" size="sm" className="bg-white text-gray-900 hover:bg-gray-100">
                    Order Now
                  </Button>
                </div>
                <div className="w-24 h-24 relative">
                  <Image
                    src={offer.image}
                    alt={offer.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots Indicator */}
        <div className="hidden md:flex justify-center mt-6 space-x-2">
          {offers.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-orange-500' : 'bg-gray-300'
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}