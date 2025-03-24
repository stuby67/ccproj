import { redirect } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { NeonCard } from "@/components/ui/neon-card"
import { NeonButton } from "@/components/ui/neon-button"
import { getOrderById } from "@/lib/orders"
import { getSession } from "@/lib/auth"

interface OrderConfirmationPageProps {
  params: {
    id: string
  }
}

export default async function OrderConfirmationPage({ params }: OrderConfirmationPageProps) {
  const session = await getSession()

  if (!session) {
    redirect("/login")
  }

  const orderId = Number.parseInt(params.id)

  if (isNaN(orderId)) {
    redirect("/orders")
  }

  const order = await getOrderById(orderId)

  if (!order) {
    redirect("/orders")
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <NeonCard className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-900/30 text-neon-green mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-neon-green mb-2">Order Confirmed!</h1>
          <p className="text-gray-400">
            Thank you for your purchase. Your order has been confirmed and will be shipped soon.
          </p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-gray-400">Order Number:</span>
            <span className="text-white font-semibold">#{order.id}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span className="text-gray-400">Date:</span>
            <span className="text-white">{new Date(order.createdAt).toLocaleDateString()}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span className="text-gray-400">Total:</span>
            <span className="text-white font-semibold">${order.totalAmount.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400">Status:</span>
            <span className="text-neon-green font-semibold uppercase">{order.status}</span>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold text-neon-green mb-4">Order Items</h2>

          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center">
                <div className="relative w-16 h-16 rounded overflow-hidden">
                  <Image
                    src={
                      item.imageUrl ||
                      `/placeholder.svg?height=64&width=64&text=${encodeURIComponent(item.productName)}`
                    }
                    alt={item.productName}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="ml-4 flex-1">
                  <p className="text-white font-semibold">{item.productName}</p>
                  <p className="text-gray-400 text-sm">
                    Size: {item.size} | Qty: {item.quantity}
                  </p>
                </div>

                <div className="text-white font-semibold">${(item.price * item.quantity).toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold text-neon-green mb-4">Shipping Address</h2>

          <div className="text-white">
            <p>{order.address.addressLine1}</p>
            {order.address.addressLine2 && <p>{order.address.addressLine2}</p>}
            <p>
              {order.address.city}, {order.address.state} {order.address.postalCode}
            </p>
            <p>{order.address.country}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link href="/orders">
            <NeonButton variant="purple">View All Orders</NeonButton>
          </Link>

          <Link href="/products">
            <NeonButton>Continue Shopping</NeonButton>
          </Link>
        </div>
      </NeonCard>
    </div>
  )
}

