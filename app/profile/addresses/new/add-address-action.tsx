"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AddressForm } from "@/components/checkout/address-form"
import type { Address } from "@/lib/addresses"

export function AddAddressAction() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (address: Omit<Address, "id">) => {
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/addresses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(address),
      })

      if (!response.ok) {
        throw new Error("Failed to add address")
      }

      router.push("/profile/addresses")
      router.refresh()
    } catch (error) {
      console.error("Error adding address:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AddressForm
      onSubmit={handleSubmit}
      onCancel={() => router.push("/profile/addresses")}
      isSubmitting={isSubmitting}
    />
  )
}

