import Image from 'next/image'
import Link from 'next/link'
import { categories } from '@/data/categories'

export function CategoriesSection() {
  return (
    <section className="py-12 bg-white">
      <div className="container">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            What's on your mind?
          </h2>
          <p className="text-gray-600">
            Explore cuisines and dishes from your favorite restaurants
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-4 md:grid-cols-8 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/restaurants?category=${category.id}`}
              className="group flex flex-col items-center text-center hover:scale-105 transition-transform duration-200"
            >
              <div className="relative w-16 h-16 md:w-20 md:h-20 mb-2 rounded-full overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="text-sm md:text-base font-medium text-gray-900 group-hover:text-orange-500 transition-colors">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>

        {/* View All Categories */}
        <div className="text-center mt-8">
          <Link
            href="/restaurants"
            className="inline-flex items-center text-orange-500 hover:text-orange-600 font-medium transition-colors"
          >
            View All Categories
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}