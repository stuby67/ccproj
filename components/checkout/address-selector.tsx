"use client"

import { useState } from "react"
import { NeonCard } from "@/components/ui/neon-card"
import { NeonButton } from "@/components/ui/neon-button"
import type { Address } from "@/lib/addresses"
import { AddressForm } from "./address-form"

interface AddressSelectorProps {
  addresses: Address[]
  onAddAddress: (address: Omit<Address, "id">) => Promise<void>
  onSelectAddress: (addressId: number) => void
  selectedAddressId?: number
  isSubmitting?: boolean
}

export function AddressSelector({
  addresses,
  onAddAddress,
  onSelectAddress,
  selectedAddressId,
  isSubmitting = false,
}: AddressSelectorProps) {
  const [showAddForm, setShowAddForm] = useState(false)

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-neon-green">Shipping Address</h2>

      {addresses.length > 0 && !showAddForm && (
        <div className="space-y-4">
          {addresses.map((address) => (
            <div
              key={address.id}
              className={`p-4 rounded-md border cursor-pointer transition-all ${
                selectedAddressId === address.id
                  ? "border-neon-green shadow-[0_0_10px_#39FF14] bg-black/60"
                  : "border-gray-700 hover:border-neon-green"
              }`}
              onClick={() => onSelectAddress(address.id)}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-white">{address.addressLine1}</p>
                  {address.addressLine2 && <p className="text-white">{address.addressLine2}</p>}
                  <p className="text-white">
                    {address.city}, {address.state} {address.postalCode}
                  </p>
                  <p className="text-white">{address.country}</p>
                </div>

                {address.isDefault && (
                  <span className="text-xs bg-neon-green/20 text-neon-green px-2 py-1 rounded">Default</span>
                )}
              </div>
            </div>
          ))}

          <NeonButton onClick={() => setShowAddForm(true)}>Add New Address</NeonButton>
        </div>
      )}

      {(showAddForm || addresses.length === 0) && (
        <NeonCard>
          <h3 className="text-lg font-semibold text-neon-green mb-4">
            {addresses.length === 0 ? "Add Shipping Address" : "Add New Address"}
          </h3>

          <AddressForm
            onSubmit={async (address) => {
              await onAddAddress(address)
              setShowAddForm(false)
            }}
            onCancel={addresses.length > 0 ? () => setShowAddForm(false) : undefined}
            isSubmitting={isSubmitting}
          />
        </NeonCard>
      )}
    </div>
  )
}

