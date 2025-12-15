import { HeroSection } from '@/sections/HeroSection'
import { CategoriesSection } from '@/sections/CategoriesSection'
import { RestaurantsSection } from '@/sections/RestaurantsSection'
import { OffersSection } from '@/sections/OffersSection'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <OffersSection />
      <CategoriesSection />
      <RestaurantsSection />
    </div>
  )
}