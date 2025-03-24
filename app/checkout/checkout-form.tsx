"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AddressSelector } from "@/components/checkout/address-selector"
import { PaymentForm } from "@/components/checkout/payment-form"
import type { Address } from "@/lib/addresses"

interface CheckoutFormProps {
  addresses: Address[]
}

export function CheckoutForm({ addresses }: CheckoutFormProps) {
  const router = useRouter()
  const [selectedAddressId, setSelectedAddressId] = useState<number | undefined>(addresses.find((a) => a.isDefault)?.id)
  const [isAddingAddress, setIsAddingAddress] = useState(false)
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  const handleAddAddress = async (address: Omit<Address, "id">) => {
    setIsAddingAddress(true)

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

      const newAddress = await response.json()
      setSelectedAddressId(newAddress.id)
      router.refresh()
    } catch (error) {
      console.error("Error adding address:", error)
    } finally {
      setIsAddingAddress(false)
    }
  }

  const handleCompleteOrder = async () => {
    if (!selectedAddressId) return

    setIsProcessingPayment(true)

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          addressId: selectedAddressId,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create order")
      }

      const order = await response.json()
      router.push(`/orders/${order.id}/confirmation`)
    } catch (error) {
      console.error("Error creating order:", error)
    } finally {
      setIsProcessingPayment(false)
    }
  }

  return (
    <div className="space-y-8">
      {currentStep === 1 && (
        <>
          <AddressSelector
            addresses={addresses}
            onAddAddress={handleAddAddress}
            onSelectAddress={setSelectedAddressId}
            selectedAddressId={selectedAddressId}
            isSubmitting={isAddingAddress}
          />

          {selectedAddressId && (
            <div className="flex justify-end">
              <button onClick={() => setCurrentStep(2)} className="neon-button-purple">
                Continue to Payment
              </button>
            </div>
          )}
        </>
      )}

      {currentStep === 2 && (
        <>
          <button onClick={() => setCurrentStep(1)} className="text-neon-purple hover:underline mb-4 inline-block">
            &larr; Back to Shipping
          </button>

          <PaymentForm onSubmit={handleCompleteOrder} isSubmitting={isProcessingPayment} />
        </>
      )}
    </div>
  )
}

