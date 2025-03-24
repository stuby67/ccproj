"use client"

import type React from "react"

import { useState } from "react"
import { NeonInput } from "@/components/ui/neon-input"
import { NeonButton } from "@/components/ui/neon-button"
import type { Address } from "@/lib/addresses"

interface AddressFormProps {
  address?: Address
  onSubmit: (address: Omit<Address, "id">) => Promise<void>
  onCancel?: () => void
  isSubmitting?: boolean
}

export function AddressForm({ address, onSubmit, onCancel, isSubmitting = false }: AddressFormProps) {
  const [formData, setFormData] = useState({
    addressLine1: address?.addressLine1 || "",
    addressLine2: address?.addressLine2 || "",
    city: address?.city || "",
    state: address?.state || "",
    postalCode: address?.postalCode || "",
    country: address?.country || "United States",
    isDefault: address?.isDefault || false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="addressLine1" className="block text-white mb-1">
          Address Line 1 *
        </label>
        <NeonInput
          id="addressLine1"
          name="addressLine1"
          value={formData.addressLine1}
          onChange={handleChange}
          required
          className="w-full"
        />
      </div>

      <div>
        <label htmlFor="addressLine2" className="block text-white mb-1">
          Address Line 2
        </label>
        <NeonInput
          id="addressLine2"
          name="addressLine2"
          value={formData.addressLine2}
          onChange={handleChange}
          className="w-full"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="city" className="block text-white mb-1">
            City *
          </label>
          <NeonInput id="city" name="city" value={formData.city} onChange={handleChange} required className="w-full" />
        </div>

        <div>
          <label htmlFor="state" className="block text-white mb-1">
            State/Province *
          </label>
          <NeonInput
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
            className="w-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="postalCode" className="block text-white mb-1">
            Postal Code *
          </label>
          <NeonInput
            id="postalCode"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            required
            className="w-full"
          />
        </div>

        <div>
          <label htmlFor="country" className="block text-white mb-1">
            Country *
          </label>
          <NeonInput
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
            className="w-full"
          />
        </div>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="isDefault"
          name="isDefault"
          checked={formData.isDefault}
          onChange={handleChange}
          className="mr-2"
        />
        <label htmlFor="isDefault" className="text-white">
          Set as default address
        </label>
      </div>

      <div className="flex justify-end space-x-4 pt-4">
        {onCancel && (
          <NeonButton type="button" variant="purple" onClick={onCancel}>
            Cancel
          </NeonButton>
        )}

        <NeonButton type="submit" isLoading={isSubmitting}>
          {address ? "Update Address" : "Add Address"}
        </NeonButton>
      </div>
    </form>
  )
}

