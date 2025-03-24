"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AddressForm } from "@/components/checkout/address-form"
import type { Address } from "@/lib/addresses"

interface EditAddressActionProps {
  address: Address
}

export function EditAddressAction({ address }: EditAddressActionProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (updatedAddress: Omit<Address, "id">) => {
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/addresses", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: address.id,
          ...updatedAddress,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update address")
      }

      router.push("/profile/addresses")
      router.refresh()
    } catch (error) {
      console.error("Error updating address:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AddressForm
      address={address}
      onSubmit={handleSubmit}
      onCancel={() => router.push("/profile/addresses")}
      isSubmitting={isSubmitting}
    />
  )
}

