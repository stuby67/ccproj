"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { NeonButton } from "@/components/ui/neon-button"
import { SizeSelector } from "@/components/products/size-selector"
import type { ProductDetail } from "@/lib/products"

interface AddToCartButtonProps {
  product: ProductDetail
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const router = useRouter()
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleAddToCart = async () => {
    if (!selectedSize) {
      setError("Please select a size")
      return
    }

    setError(null)
    setSuccess(null)
    setIsLoading(true)

    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product.id,
          size: selectedSize,
          quantity,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to add to cart")
      }

      setSuccess("Added to cart!")
      router.refresh()
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <SizeSelector
        sizes={product.sizes}
        onSelect={(size) => {
          setSelectedSize(size)
          setError(null)
        }}
      />

      <div className="flex items-center space-x-4">
        <div>
          <label htmlFor="quantity" className="block text-white mb-2">
            Quantity
          </label>
          <select
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number.parseInt(e.target.value))}
            className="neon-input"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && <div className="bg-red-900/50 border border-red-500 text-white p-3 rounded-md">{error}</div>}

      {success && <div className="bg-green-900/50 border border-green-500 text-white p-3 rounded-md">{success}</div>}

      <div className="flex space-x-4">
        <NeonButton onClick={handleAddToCart} className="flex-1" isLoading={isLoading} disabled={!selectedSize}>
          Add to Cart
        </NeonButton>

        <NeonButton
          variant="purple"
          className="flex-1"
          onClick={() => {
            handleAddToCart()
            setTimeout(() => router.push("/cart"), 500)
          }}
          isLoading={isLoading}
          disabled={!selectedSize}
        >
          Buy Now
        </NeonButton>
      </div>
    </div>
  )
}

