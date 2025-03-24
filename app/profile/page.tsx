import { redirect } from "next/navigation"
import Link from "next/link"
import { NeonCard } from "@/components/ui/neon-card"
import { NeonButton } from "@/components/ui/neon-button"
import { getUserDetails } from "@/lib/auth"
import { getUserAddresses } from "@/lib/addresses"
import { getUserOrders } from "@/lib/orders"
import { LogoutButton } from "./logout-button"

export default async function ProfilePage() {
  const user = await getUserDetails()

  if (!user) {
    redirect("/login?redirect=/profile")
  }

  const addresses = await getUserAddresses()
  const orders = await getUserOrders()
  const recentOrders = orders.slice(0, 3)

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-neon-green mb-8">Your Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
        <div className="space-y-8">
          {/* Account Information */}
          <NeonCard>
            <h2 className="text-xl font-bold text-neon-green mb-6">Account Information</h2>

            <div className="space-y-4">
              <div>
                <p className="text-gray-400">Email</p>
                <p className="text-white">{user.email}</p>
              </div>

              <div>
                <p className="text-gray-400">Name</p>
                <p className="text-white">
                  {user.firstName || user.lastName ? `${user.firstName || ""} ${user.lastName || ""}` : "Not provided"}
                </p>
              </div>
            </div>

            <div className="mt-6 flex space-x-4">
              <Link href="/profile/edit">
                <NeonButton>Edit Profile</NeonButton>
              </Link>

              <LogoutButton />
            </div>
          </NeonCard>

          {/* Recent Orders */}
          <NeonCard>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-neon-green">Recent Orders</h2>
              <Link href="/orders">
                <NeonButton variant="purple" size="sm">
                  View All
                </NeonButton>
              </Link>
            </div>

            {recentOrders.length > 0 ? (
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex justify-between items-center border-b border-neon-green/30 pb-4 last:border-0"
                  >
                    <div>
                      <p className="text-white">Order #{order.id}</p>
                      <p className="text-gray-400 text-sm">
                        {new Date(order.createdAt).toLocaleDateString()} | {order.items.length} items
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-white font-bold">${order.totalAmount.toFixed(2)}</p>
                      <p className="text-neon-green text-sm uppercase">{order.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">You haven't placed any orders yet.</p>
            )}
          </NeonCard>
        </div>

        {/* Addresses */}
        <div>
          <NeonCard variant="purple">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-neon-purple">Your Addresses</h2>
              <Link href="/profile/addresses">
                <NeonButton variant="purple" size="sm">
                  Manage
                </NeonButton>
              </Link>
            </div>

            {addresses.length > 0 ? (
              <div className="space-y-4">
                {addresses.map((address) => (
                  <div key={address.id} className="border-b border-neon-purple/30 pb-4 last:border-0">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-white">{address.addressLine1}</p>
                        {address.addressLine2 && <p className="text-white">{address.addressLine2}</p>}
                        <p className="text-white">
                          {address.city}, {address.state} {address.postalCode}
                        </p>
                        <p className="text-white">{address.country}</p>
                      </div>

                      {address.isDefault && (
                        <span className="text-xs bg-neon-purple/20 text-neon-purple px-2 py-1 h-fit rounded">
                          Default
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <p className="text-gray-400 mb-4">You haven't added any addresses yet.</p>
                <Link href="/profile/addresses/new">
                  <NeonButton variant="purple">Add Address</NeonButton>
                </Link>
              </div>
            )}
          </NeonCard>
        </div>
      </div>
    </div>
  )
}

