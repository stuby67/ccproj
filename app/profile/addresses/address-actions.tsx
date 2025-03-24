"use client"

import type React from "react"

import { useRouter } from "next/navigation"

export function AddressActions() {
  const router = useRouter()

  const handleAddressAction = async (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement

    if (!target.dataset.action) return

    const action = target.dataset.action
    const addressId = target.dataset.addressId

    if (!addressId) return

    if (action === "set-default") {
      try {
        const response = await fetch("/api/addresses/default", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: Number.parseInt(addressId) }),
        })

        if (!response.ok) {
          throw new Error("Failed to set default address")
        }

        router.refresh()
      } catch (error) {
        console.error("Error setting default address:", error)
      }
    } else if (action === "delete") {
      if (!confirm("Are you sure you want to delete this address?")) return

      try {
        const response = await fetch(`/api/addresses?id=${addressId}`, {
          method: "DELETE",
        })

        if (!response.ok) {
          throw new Error("Failed to delete address")
        }

        router.refresh()
      } catch (error) {
        console.error("Error deleting address:", error)
      }
    }
  }

  // Add event listener to the document to handle address actions
  if (typeof window !== "undefined") {
    document.addEventListener("click", handleAddressAction as any)
  }

  return null // This component just provides the actions
}

