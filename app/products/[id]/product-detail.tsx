"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { formatCurrency } from "@/lib/utils"

type ProductDetailProps = {
  product: {
    id: number
    name: string
    description: string
    brand_name?: string
    category_name?: string
    price: number
    image_url: string
  }
  sizes: {
    id: number
    product_id: number
    size: string
    stock: number
  }[]
  user: any
}

export function ProductDetail({ product, sizes, user }: ProductDetailProps) {
  const [selectedSize, setSelectedSize] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleAddToCart = async () => {
    if (!user) {
      toast({
        title: "Please login",
        description: "You need to be logged in to add items to your cart",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    if (!selectedSize) {
      toast({
        title: "Please select a size",
        description: "You need to select a size before adding to cart",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/cart/add", {
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

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to add to cart")
      }

      toast({
        title: "Added to cart!",
        description: `${product.name} (Size: ${selectedSize}) has been added to your cart`,
      })

      router.refresh()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to add to cart",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* Product Image */}
      <div className="neon-card overflow-hidden">
        <div className="relative aspect-square">
          <Image
            src={product.image_url || "/placeholder.svg?height=600&width=600"}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        {product.brand_name && <h3 className="text-neon-purple text-lg">{product.brand_name}</h3>}

        <h1 className="text-3xl font-bold text-white">{product.name}</h1>

        <p className="text-2xl font-bold neon-text-green">{formatCurrency(product.price)}</p>

        {product.category_name && (
          <div className="flex items-center">
            <span className="text-gray-400">Category:</span>
            <span className="ml-2 text-white">{product.category_name}</span>
          </div>
        )}

        <div className="border-t border-gray-800 pt-6">
          <h3 className="text-lg font-semibold text-white mb-4">Description</h3>
          <p className="text-gray-400">{product.description}</p>
        </div>

        {/* Size Selection */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Select Size</h3>
          <div className="grid grid-cols-4 gap-2">
            {sizes.map((size) => (
              <button
                key={size.id}
                className={`py-2 border ${
                  selectedSize === size.size
                    ? "border-neon-green text-neon-green"
                    : "border-gray-700 text-gray-400 hover:border-gray-500"
                } rounded-md transition-colors ${size.stock === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={() => setSelectedSize(size.size)}
                disabled={size.stock === 0}
              >
                {size.size}
                {size.stock === 0 && " (Out of Stock)"}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quantity</h3>
          <div className="flex items-center space-x-4">
            <button
              className="w-10 h-10 border border-gray-700 rounded-md flex items-center justify-center text-white hover:border-neon-green"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              -
            </button>
            <span className="text-white">{quantity}</span>
            <button
              className="w-10 h-10 border border-gray-700 rounded-md flex items-center justify-center text-white hover:border-neon-green"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>
        </div>

        {/* Add to Cart Button */}
        <Button className="neon-button w-full py-6 mt-6" onClick={handleAddToCart} disabled={isLoading}>
          {isLoading ? "Adding to Cart..." : "Add to Cart"}
        </Button>
      </div>
    </div>
  )
}

