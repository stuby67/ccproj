import { NeonCard } from "@/components/ui/neon-card"
import { NeonButton } from "@/components/ui/neon-button"
import Link from "next/link"

interface CartSummaryProps {
  subtotal: number
  tax: number
  total: number
  itemCount: number
}

export function CartSummary({ subtotal, tax, total, itemCount }: CartSummaryProps) {
  return (
    <NeonCard variant="purple" className="sticky top-4">
      <h2 className="text-xl font-bold text-neon-purple mb-4">Order Summary</h2>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-gray-300">
          <span>Subtotal ({itemCount} items)</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-gray-300">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-white font-bold pt-2 border-t border-neon-purple/30">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <Link href="/checkout">
        <NeonButton variant="purple" className="w-full">
          Proceed to Checkout
        </NeonButton>
      </Link>
    </NeonCard>
  )
}

