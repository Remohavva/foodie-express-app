import Link from 'next/link'
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react'

export function Footer() {
  const companyLinks = [
    { href: '/about', label: 'About Us' },
    { href: '/careers', label: 'Careers' },
    { href: '/team', label: 'Team' },
    { href: '/blog', label: 'Blog' }
  ]

  const contactLinks = [
    { href: '/help', label: 'Help & Support' },
    { href: '/partner', label: 'Partner with us' },
    { href: '/ride', label: 'Ride with us' }
  ]

  const legalLinks = [
    { href: '/terms', label: 'Terms & Conditions' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/refund', label: 'Refund Policy' },
    { href: '/cookie', label: 'Cookie Policy' }
  ]

  const cities = [
    'Bangalore', 'Gurgaon', 'Hyderabad', 'Delhi', 'Mumbai', 'Pune',
    'Kolkata', 'Chennai', 'Ahmedabad', 'Chandigarh', 'Jaipur', 'Kochi'
  ]

  return (
    <footer className="bg-secondary-900 text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-secondary-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              {contactLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-secondary-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-secondary-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* We deliver to */}
          <div>
            <h3 className="text-lg font-semibold mb-4">We deliver to</h3>
            <div className="grid grid-cols-2 gap-1 text-sm">
              {cities.map((city) => (
                <Link
                  key={city}
                  href={`/city/${city.toLowerCase()}`}
                  className="text-secondary-300 hover:text-white transition-colors"
                >
                  {city}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-secondary-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <span className="text-xl font-bold">FoodieExpress</span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-secondary-400 text-sm">Follow us</span>
            <div className="flex space-x-3">
              <Link href="#" className="text-secondary-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-secondary-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-secondary-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-secondary-400 hover:text-white transition-colors">
                <Youtube className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center text-secondary-400 text-sm mt-4">
          © 2024 FoodieExpress. All rights reserved.
        </div>
      </div>
    </footer>
  )
}