"use client"

import type React from "react"

import { useState } from "react"
import { NeonInput } from "@/components/ui/neon-input"
import { NeonButton } from "@/components/ui/neon-button"
import { NeonCard } from "@/components/ui/neon-card"
import { CreditCard, Calendar, Lock } from "lucide-react"

interface PaymentFormProps {
  onSubmit: () => Promise<void>
  isSubmitting?: boolean
}

export function PaymentForm({ onSubmit, isSubmitting = false }: PaymentFormProps) {
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    // Format card number with spaces
    if (name === "cardNumber") {
      const formatted = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim()
      setFormData({
        ...formData,
        [name]: formatted,
      })
      return
    }

    // Format expiry date with slash
    if (name === "expiryDate") {
      const cleaned = value.replace(/\D/g, "")
      let formatted = cleaned

      if (cleaned.length > 2) {
        formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`
      }

      setFormData({
        ...formData,
        [name]: formatted,
      })
      return
    }

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit()
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-neon-purple">Payment Information</h2>

      <NeonCard variant="purple">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="cardNumber" className="block text-white mb-1">
              Card Number
            </label>
            <div className="relative">
              <NeonInput
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                required
                className="w-full pl-10"
                variant="purple"
              />
              <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            </div>
          </div>

          <div>
            <label htmlFor="cardName" className="block text-white mb-1">
              Name on Card
            </label>
            <NeonInput
              id="cardName"
              name="cardName"
              value={formData.cardName}
              onChange={handleChange}
              placeholder="John Doe"
              required
              className="w-full"
              variant="purple"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="expiryDate" className="block text-white mb-1">
                Expiry Date
              </label>
              <div className="relative">
                <NeonInput
                  id="expiryDate"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  placeholder="MM/YY"
                  maxLength={5}
                  required
                  className="w-full pl-10"
                  variant="purple"
                />
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              </div>
            </div>

            <div>
              <label htmlFor="cvv" className="block text-white mb-1">
                CVV
              </label>
              <div className="relative">
                <NeonInput
                  id="cvv"
                  name="cvv"
                  type="password"
                  value={formData.cvv}
                  onChange={handleChange}
                  placeholder="123"
                  maxLength={4}
                  required
                  className="w-full pl-10"
                  variant="purple"
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              </div>
            </div>
          </div>

          <div className="pt-4">
            <NeonButton type="submit" variant="purple" className="w-full" isLoading={isSubmitting}>
              Complete Order
            </NeonButton>
          </div>
        </form>
      </NeonCard>
    </div>
  )
}

