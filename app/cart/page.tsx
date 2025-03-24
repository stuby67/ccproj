import Link from "next/link"
import { redirect } from "next/navigation"
import { NeonCard } from "@/components/ui/neon-card"
import { NeonButton } from "@/components/ui/neon-button"
import { CartItemRow } from "@/components/cart/cart-item"
import { CartSummary } from "@/components/cart/cart-summary"
import { getCart } from "@/lib/cart"
import { getSession } from "@/lib/auth"
import { CartActions } from "./cart-actions"

export default async function CartPage() {
  const session = await getSession()

  if (!session) {
    redirect("/login?redirect=/cart")
  }

  const cart = await getCart()
  const items = cart?.items || []
  const subtotal = cart?.total || 0
  const tax = subtotal * 0.08 // 8% tax rate
  const total = subtotal + tax

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-neon-green mb-8">Your Cart</h1>

      {items.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
          <NeonCard>
            <h2 className="text-xl font-bold text-neon-green mb-6">Cart Items</h2>

            <CartActions />

            <div className="divide-y divide-neon-green/30">
              {items.map((item) => (
                <CartItemRow key={item.id} item={item} onUpdateQuantity={() => {}} onRemove={() => {}} />
              ))}
            </div>
          </NeonCard>

          <CartSummary subtotal={subtotal} tax={tax} total={total} itemCount={items.length} />
        </div>
      ) : (
        <div className="text-center py-12">
          <NeonCard className="max-w-md mx-auto">
            <h2 className="text-2xl text-neon-green mb-4">Your cart is empty</h2>
            <p className="text-gray-400 mb-6">Looks like you haven't added any items to your cart yet.</p>
            <Link href="/products">
              <NeonButton className="w-full">Continue Shopping</NeonButton>
            </Link>
          </NeonCard>
        </div>
      )}
    </div>
  )
}

