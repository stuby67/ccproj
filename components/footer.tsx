import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-neon-green shadow-neon-green bg-black">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 neon-text-green">NEON SNEAKERS</h3>
            <p className="text-gray-400 mb-4">The ultimate destination for premium sneakers with a neon twist.</p>
            <div className="flex space-x-4">
              <Link href="#" className="text-white hover:text-neon-green">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="text-white hover:text-neon-green">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="text-white hover:text-neon-green">
                <Twitter size={20} />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Shop</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-gray-400 hover:text-neon-green">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/brands" className="text-gray-400 hover:text-neon-green">
                  Brands
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-gray-400 hover:text-neon-green">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/new-arrivals" className="text-gray-400 hover:text-neon-green">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Account</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/profile" className="text-gray-400 hover:text-neon-green">
                  My Account
                </Link>
              </li>
              <li>
                <Link href="/orders" className="text-gray-400 hover:text-neon-green">
                  Order History
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="text-gray-400 hover:text-neon-green">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link href="/addresses" className="text-gray-400 hover:text-neon-green">
                  Addresses
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Help</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-neon-green">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-400 hover:text-neon-green">
                  Shipping Information
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-400 hover:text-neon-green">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-neon-green">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Neon Sneakers. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-gray-400 hover:text-neon-green">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-neon-green">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

