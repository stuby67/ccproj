"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import type { ProductSize } from "@/lib/products"

interface SizeSelectorProps {
  sizes: ProductSize[]
  onSelect: (size: string) => void
  variant?: "green" | "purple"
}

export function SizeSelector({ sizes, onSelect, variant = "green" }: SizeSelectorProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null)

  const handleSelect = (size: string) => {
    setSelectedSize(size)
    onSelect(size)
  }

  const getButtonClasses = (size: string, inStock: boolean) => {
    const baseClasses = "border rounded-md py-2 px-3 text-center transition-all duration-200"

    if (!inStock) {
      return cn(baseClasses, "border-gray-600 text-gray-600 cursor-not-allowed opacity-50")
    }

    if (selectedSize === size) {
      return cn(
        baseClasses,
        variant === "green"
          ? "border-neon-green text-neon-green shadow-[0_0_10px_#39FF14]"
          : "border-neon-purple text-neon-purple shadow-[0_0_10px_#BC13FE]",
      )
    }

    return cn(baseClasses, "border-gray-400 text-white hover:border-white")
  }

  return (
    <div>
      <h3 className="text-white font-semibold mb-2">Select Size</h3>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {sizes.map((sizeObj) => (
          <button
            key={sizeObj.size}
            className={getButtonClasses(sizeObj.size, sizeObj.stock > 0)}
            onClick={() => sizeObj.stock > 0 && handleSelect(sizeObj.size)}
            disabled={sizeObj.stock <= 0}
          >
            {sizeObj.size}
            {sizeObj.stock <= 0 && <span className="block text-xs">Out of stock</span>}
          </button>
        ))}
      </div>
    </div>
  )
}

