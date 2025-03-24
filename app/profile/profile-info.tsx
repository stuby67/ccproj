"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/utils"
import { formatDate } from "@/lib/utils"

type ProfileInfoProps = {
  user: {
    id: number
    email: string
    first_name?: string
    last_name?: string
    created_at: string
  }
  orders: any[]
  addresses: any[]
}

export function ProfileInfo({ user, orders, addresses }: ProfileInfoProps) {
  const [activeTab, setActiveTab] = useState("orders")

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      {/* Sidebar */}
      <div className="md:col-span-1">
        <div className="neon-card">
          <div className="space-y-6">
            <div className="pb-6 border-b border-gray-800">
              <h2 className="text-xl font-semibold text-white mb-2">
                {user.first_name} {user.last_name}
              </h2>
              <p className="text-gray-400">{user.email}</p>
            </div>

            <nav className="space-y-2">
              <button
                className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                  activeTab === "orders" ? "bg-neon-green/10 text-neon-green" : "text-gray-400 hover:text-white"
                }`}
                onClick={() => setActiveTab("orders")}
              >
                Orders
              </button>

              <button
                className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                  activeTab === "addresses" ? "bg-neon-green/10 text-neon-green" : "text-gray-400 hover:text-white"
                }`}
                onClick={() => setActiveTab("addresses")}
              >
                Addresses
              </button>

              <button
                className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                  activeTab === "account" ? "bg-neon-green/10 text-neon-green" : "text-gray-400 hover:text-white"
                }`}
                onClick={() => setActiveTab("account")}
              >
                Account Details
              </button>
            </nav>

            <div className="pt-6 border-t border-gray-800">
              <Link href="/api/auth/logout">
                <Button className="neon-button w-full">Logout</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="md:col-span-3">
        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="neon-card">
            <h2 className="text-xl font-semibold text-white mb-6">My Orders</h2>

            {orders.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-400 mb-4">You haven&apos;t placed any orders yet.</p>
                <Link href="/products">
                  <Button className="neon-button">Start Shopping</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div key={order.id} className="border border-gray-800 rounded-md p-4">
                    <div className="flex flex-col sm:flex-row justify-between mb-4">
                      <div>
                        <p className="text-sm text-gray-400">Order #{order.id}</p>
                        <p className="text-sm text-gray-400">Placed on {formatDate(order.created_at)}</p>
                      </div>

                      <div className="mt-2 sm:mt-0">
                        <span
                          className={`inline-block px-3 py-1 text-xs rounded-full ${
                            order.status === "completed"
                              ? "bg-green-500/20 text-green-500"
                              : order.status === "shipped"
                                ? "bg-blue-500/20 text-blue-500"
                                : "bg-yellow-500/20 text-yellow-500"
                          }`}
                        >
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <p className="font-semibold text-white">Total: {formatCurrency(order.total_amount)}</p>

                      <Link href={`/orders/${order.id}`}>
                        <Button variant="outline" size="sm">
                          View Order
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Addresses Tab */}
        {activeTab === "addresses" && (
          <div className="neon-card">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">My Addresses</h2>

              <Link href="/addresses/new">
                <Button className="neon-button">Add New Address</Button>
              </Link>
            </div>

            {addresses.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-400 mb-4">You haven&apos;t added any addresses yet.</p>
                <Link href="/addresses/new">
                  <Button className="neon-button">Add Address</Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses.map((address) => (
                  <div key={address.id} className="border border-gray-800 rounded-md p-4 relative">
                    {address.is_default && (
                      <span className="absolute top-2 right-2 text-xs bg-neon-green text-black px-2 py-1 rounded-full">
                        Default
                      </span>
                    )}

                    <div className="mt-4">
                      <p className="text-white">
                        {address.address_line1}
                        {address.address_line2 && `, ${address.address_line2}`}
                      </p>
                      <p className="text-gray-400">
                        {address.city}, {address.state} {address.postal_code}
                      </p>
                      <p className="text-gray-400">{address.country}</p>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <Link href={`/addresses/${address.id}/edit`}>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </Link>

                      {!address.is_default && (
                        <Link href={`/api/addresses/${address.id}/set-default`}>
                          <Button variant="outline" size="sm">
                            Set as Default
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Account Details Tab */}
        {activeTab === "account" && (
          <div className="neon-card">
            <h2 className="text-xl font-semibold text-white mb-6">Account Details</h2>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-400">First Name</p>
                  <p className="text-white">{user.first_name || "Not set"}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-400">Last Name</p>
                  <p className="text-white">{user.last_name || "Not set"}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-400">Email</p>
                <p className="text-white">{user.email}</p>
              </div>

              <div>
                <p className="text-sm text-gray-400">Member Since</p>
                <p className="text-white">{formatDate(user.created_at)}</p>
              </div>

              <div className="pt-6 border-t border-gray-800">
                <Link href="/profile/edit">
                  <Button className="neon-button">Edit Profile</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

