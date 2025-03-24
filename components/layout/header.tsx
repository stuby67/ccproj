"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingCart, User, Menu, X } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

export function Header({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/brands", label: "Brands" },
    { href: "/categories", label: "Categories" },
  ]

  return (
    <header className="relative z-50 bg-black border-b border-neon-green/30">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold neon-text-green animate-glow">NEON KICKS</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-white hover:text-neon-green transition-colors",
                  pathname === link.href && "text-neon-green",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/cart" className="text-white hover:text-neon-green transition-colors relative">
              <ShoppingCart className="h-6 w-6" />
            </Link>

            {isLoggedIn ? (
              <Link href="/profile" className="text-white hover:text-neon-green transition-colors">
                <User className="h-6 w-6" />
              </Link>
            ) : (
              <Link href="/login" className="neon-button">
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black border-t border-neon-green/30 absolute w-full">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-white hover:text-neon-green transition-colors",
                    pathname === link.href && "text-neon-green",
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              <div className="flex items-center space-x-4 pt-4 border-t border-neon-green/30">
                <Link
                  href="/cart"
                  className="text-white hover:text-neon-green transition-colors flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <ShoppingCart className="h-6 w-6 mr-2" />
                  Cart
                </Link>

                {isLoggedIn ? (
                  <Link
                    href="/profile"
                    className="text-white hover:text-neon-green transition-colors flex items-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-6 w-6 mr-2" />
                    Profile
                  </Link>
                ) : (
                  <Link href="/login" className="neon-button" onClick={() => setIsMenuOpen(false)}>
                    Login
                  </Link>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

