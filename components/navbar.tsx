"use client"

import Link from "next/link"
import { useState } from "react"
import { ShoppingCart, User, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"

type NavbarProps = {
  user?: {
    id: number
    email: string
    first_name?: string
    last_name?: string
  } | null
  cartItemsCount?: number
}

export function Navbar({ user, cartItemsCount = 0 }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <header className="border-b border-neon-green shadow-neon-green bg-black/90 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold neon-text-green animate-glow">NEON SNEAKERS</span>
          </Link>

          {/* Mobile menu button */}
          <button className="md:hidden text-white focus:outline-none" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`text-white hover:text-neon-green transition-colors ${isActive("/") ? "text-neon-green" : ""}`}
            >
              Home
            </Link>
            <Link
              href="/products"
              className={`text-white hover:text-neon-green transition-colors ${
                isActive("/products") ? "text-neon-green" : ""
              }`}
            >
              Products
            </Link>
            <Link
              href="/brands"
              className={`text-white hover:text-neon-green transition-colors ${
                isActive("/brands") ? "text-neon-green" : ""
              }`}
            >
              Brands
            </Link>
            <Link
              href="/categories"
              className={`text-white hover:text-neon-green transition-colors ${
                isActive("/categories") ? "text-neon-green" : ""
              }`}
            >
              Categories
            </Link>
          </nav>

          {/* User actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/cart" className="relative">
              <Button variant="ghost" size="icon" className="text-white hover:text-neon-green">
                <ShoppingCart size={24} />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-neon-purple text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </Button>
            </Link>
            {user ? (
              <div className="flex items-center space-x-4">
                <Link href="/profile">
                  <Button variant="ghost" size="icon" className="text-white hover:text-neon-green">
                    <User size={24} />
                  </Button>
                </Link>
                <Link href="/api/auth/logout">
                  <Button className="neon-button">Logout</Button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/login">
                  <Button className="neon-button">Login</Button>
                </Link>
                <Link href="/register">
                  <Button className="neon-button-purple">Register</Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className={`text-white hover:text-neon-green transition-colors ${
                  isActive("/") ? "text-neon-green" : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/products"
                className={`text-white hover:text-neon-green transition-colors ${
                  isActive("/products") ? "text-neon-green" : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                href="/brands"
                className={`text-white hover:text-neon-green transition-colors ${
                  isActive("/brands") ? "text-neon-green" : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Brands
              </Link>
              <Link
                href="/categories"
                className={`text-white hover:text-neon-green transition-colors ${
                  isActive("/categories") ? "text-neon-green" : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
              </Link>
            </nav>
            <div className="mt-4 flex flex-col space-y-4">
              <Link href="/cart" className="flex items-center">
                <ShoppingCart size={20} className="mr-2" />
                <span>Cart</span>
                {cartItemsCount > 0 && (
                  <span className="ml-2 bg-neon-purple text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
              {user ? (
                <>
                  <Link href="/profile" className="flex items-center">
                    <User size={20} className="mr-2" />
                    <span>Profile</span>
                  </Link>
                  <Link href="/api/auth/logout">
                    <Button className="neon-button w-full">Logout</Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <Button className="neon-button w-full">Login</Button>
                  </Link>
                  <Link href="/register">
                    <Button className="neon-button-purple w-full">Register</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

