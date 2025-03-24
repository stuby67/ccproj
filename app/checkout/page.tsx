import { redirect } from "next/navigation"
import { NeonCard } from "@/components/ui/neon-card"
import { getCart } from "@/lib/cart"
import { getSession } from "@/lib/auth"
import { getUserAddresses } from "@/lib/addresses"
import { CheckoutForm } from "./checkout-form"

export default async function CheckoutPage() {
  const session = await getSession()

  if (!session) {
    redirect("/login?redirect=/checkout")
  }

  const cart = await getCart()

  if (!cart || cart.items.length === 0) {
    redirect("/cart")
  }

  const addresses = await getUserAddresses()
  const subtotal = cart.total
  const tax = subtotal * 0.08 // 8% tax rate
  const total = subtotal + tax

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-neon-green mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
        <div>
          <CheckoutForm addresses={addresses} />
        </div>

        <div>
          <NeonCard variant="purple" className="sticky top-4">
            <h2 className="text-xl font-bold text-neon-purple mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              {cart.items.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <div>
                    <p className="text-white">{item.productName}</p>
                    <p className="text-sm text-gray-400">
                      Size: {item.size} | Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="text-white">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-neon-purple/30 pt-4 space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Subtotal</span>
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
          </NeonCard>
        </div>
      </div>
    </div>
  )
}

