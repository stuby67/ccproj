"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export function CartActions() {
  const router = useRouter()
  const [isUpdating, setIsUpdating] = useState(false)

  const updateCartItem = async (itemId: number, quantity: number) => {
    setIsUpdating(true)

    try {
      const response = await fetch("/api/cart", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId, quantity }),
      })

      if (!response.ok) {
        throw new Error("Failed to update cart")
      }

      router.refresh()
    } catch (error) {
      console.error("Error updating cart:", error)
    } finally {
      setIsUpdating(false)
    }
  }

  const removeCartItem = async (itemId: number) => {
    setIsUpdating(true)

    try {
      const response = await fetch(`/api/cart?itemId=${itemId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to remove item from cart")
      }

      router.refresh()
    } catch (error) {
      console.error("Error removing item from cart:", error)
    } finally {
      setIsUpdating(false)
    }
  }

  return null // This component just provides the actions
}

