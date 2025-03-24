import { redirect } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { NeonCard } from "@/components/ui/neon-card"
import { NeonButton } from "@/components/ui/neon-button"
import { getUserOrders } from "@/lib/orders"
import { getSession } from "@/lib/auth"

export default async function OrdersPage() {
  const session = await getSession()

  if (!session) {
    redirect("/login?redirect=/orders")
  }

  const orders = await getUserOrders()

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-neon-green mb-8">Your Orders</h1>

      {orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map((order) => (
            <NeonCard key={order.id}>
              <div className="flex flex-col md:flex-row justify-between mb-4">
                <div>
                  <p className="text-gray-400">Order #{order.id}</p>
                  <p className="text-gray-400">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>

                <div className="mt-2 md:mt-0 text-right">
                  <p className="text-white font-bold">${order.totalAmount.toFixed(2)}</p>
                  <p className="text-neon-green uppercase">{order.status}</p>
                </div>
              </div>

              <div className="border-t border-neon-green/30 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {order.items.slice(0, 3).map((item) => (
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

                      <div className="ml-4">
                        <p className="text-white">{item.productName}</p>
                        <p className="text-gray-400 text-sm">
                          Size: {item.size} | Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}

                  {order.items.length > 3 && (
                    <div className="flex items-center text-gray-400">+{order.items.length - 3} more items</div>
                  )}
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <Link href={`/orders/${order.id}/confirmation`}>
                  <NeonButton variant="purple">View Order Details</NeonButton>
                </Link>
              </div>
            </NeonCard>
          ))}
        </div>
      ) : (
        <NeonCard className="text-center py-12">
          <h2 className="text-2xl text-neon-green mb-4">No orders yet</h2>
          <p className="text-gray-400 mb-6">You haven't placed any orders yet.</p>
          <Link href="/products">
            <NeonButton>Start Shopping</NeonButton>
          </Link>
        </NeonCard>
      )}
    </div>
  )
}

