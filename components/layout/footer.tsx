import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-black border-t border-neon-green/30 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold neon-text-green mb-4">NEON KICKS</h3>
            <p className="text-gray-400">The ultimate destination for premium sneakers with a neon twist.</p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Shop</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-gray-400 hover:text-neon-green transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/brands" className="text-gray-400 hover:text-neon-green transition-colors">
                  Brands
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-gray-400 hover:text-neon-green transition-colors">
                  Categories
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Account</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/login" className="text-gray-400 hover:text-neon-green transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-gray-400 hover:text-neon-green transition-colors">
                  Register
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-gray-400 hover:text-neon-green transition-colors">
                  My Account
                </Link>
              </li>
              <li>
                <Link href="/orders" className="text-gray-400 hover:text-neon-green transition-colors">
                  Order History
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="text-gray-400">Email: support@neonkicks.com</li>
              <li className="text-gray-400">Phone: +1 (555) 123-4567</li>
              <li className="text-gray-400">Address: 123 Neon Street, Glow City</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-neon-green/30 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Neon Kicks. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

