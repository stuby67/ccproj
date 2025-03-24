"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Trash2 } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import type { CartItem } from "@/lib/cart"

type CartItemsProps = {
  cartItems: CartItem[]
  cartTotal: number
  cartId: number
}

export function CartItems({ cartItems, cartTotal, cartId }: CartItemsProps) {
  const [isUpdating, setIsUpdating] = useState(false)
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const router = useRouter()

  const handleUpdateQuantity = async (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return

    setIsUpdating(true)

    try {
      const response = await fetch("/api/cart/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItemId: itemId,
          quantity: newQuantity,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to update cart")
      }

      toast({
        title: "Cart updated",
        description: "Your cart has been updated",
      })

      router.refresh()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update cart",
        variant: "destructive",
      })
    } finally {
      setIsUpdating(false)
    }
  }

  const handleRemoveItem = async (itemId: number) => {
    setIsUpdating(true)

    try {
      const response = await fetch("/api/cart/remove", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItemId: itemId,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to remove item")
      }

      toast({
        title: "Item removed",
        description: "The item has been removed from your cart",
      })

      router.refresh()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to remove item",
        variant: "destructive",
      })
    } finally {
      setIsUpdating(false)
    }
  }

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Add some items to your cart before checking out",
        variant: "destructive",
      })
      return
    }

    setIsCheckingOut(true)
    router.push("/checkout")
  }

  if (cartItems.length === 0) {
    return (
      <div className="neon-card text-center py-12">
        <h2 className="text-2xl font-semibold text-white mb-4">Your cart is empty</h2>
        <p className="text-gray-400 mb-8">Add some items to your cart to get started</p>
        <Link href="/products">
          <Button className="neon-button">Continue Shopping</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Cart Items */}
      <div className="lg:col-span-2">
        <div className="neon-card">
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row gap-4 pb-6 border-b border-gray-800">
                {/* Product Image */}
                <div className="relative w-full sm:w-24 h-24 bg-gray-900 rounded-md overflow-hidden">
                  <Link href={`/products/${item.product_id}`}>
                    <Image
                      src={item.image_url || "/placeholder.svg?height=200&width=200"}
                      alt={item.product_name || "Product"}
                      fill
                      className="object-cover"
                    />
                  </Link>
                </div>

                {/* Product Info */}
                <div className="flex-1">
                  <Link href={`/products/${item.product_id}`}>
                    <h3 className="font-semibold text-white hover:text-neon-green transition-colors">
                      {item.product_name}
                    </h3>
                  </Link>

                  {item.brand_name && <p className="text-sm text-neon-purple">{item.brand_name}</p>}

                  <p className="text-sm text-gray-400 mt-1">Size: {item.size}</p>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-2">
                      <button
                        className="w-8 h-8 border border-gray-700 rounded-md flex items-center justify-center text-white hover:border-neon-green"
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        disabled={isUpdating}
                      >
                        -
                      </button>
                      <span className="text-white">{item.quantity}</span>
                      <button
                        className="w-8 h-8 border border-gray-700 rounded-md flex items-center justify-center text-white hover:border-neon-green"
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        disabled={isUpdating}
                      >
                        +
                      </button>
                    </div>

                    <div className="flex items-center space-x-4">
                      <p className="font-semibold text-neon-green">
                        {formatCurrency(Number(item.price) * item.quantity)}
                      </p>

                      <button
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        onClick={() => handleRemoveItem(item.id)}
                        disabled={isUpdating}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="lg:col-span-1">
        <div className="neon-card-purple">
          <h2 className="text-xl font-semibold text-white mb-6">Order Summary</h2>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-400">Subtotal</span>
              <span className="text-white">{formatCurrency(cartTotal)}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">Shipping</span>
              <span className="text-white">Free</span>
            </div>

            <div className="border-t border-gray-800 pt-4 mt-4">
              <div className="flex justify-between">
                <span className="text-lg font-semibold text-white">Total</span>
                <span className="text-lg font-semibold text-neon-purple">{formatCurrency(cartTotal)}</span>
              </div>
            </div>
          </div>

          <Button
            className="neon-button-purple w-full mt-8"
            onClick={handleCheckout}
            disabled={isCheckingOut || cartItems.length === 0}
          >
            {isCheckingOut ? "Processing..." : "Proceed to Checkout"}
          </Button>

          <div className="mt-6 text-center">
            <Link href="/products" className="text-gray-400 hover:text-neon-green">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

