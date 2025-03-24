import { redirect } from "next/navigation"
import Link from "next/link"
import { NeonCard } from "@/components/ui/neon-card"
import { NeonButton } from "@/components/ui/neon-button"
import { getUserAddresses } from "@/lib/addresses"
import { getSession } from "@/lib/auth"
import { AddressActions } from "./address-actions"

export default async function AddressesPage() {
  const session = await getSession()

  if (!session) {
    redirect("/login?redirect=/profile/addresses")
  }

  const addresses = await getUserAddresses()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <Link href="/profile" className="text-neon-green hover:underline">
          &larr; Back to Profile
        </Link>
      </div>

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-neon-green">Your Addresses</h1>

        <Link href="/profile/addresses/new">
          <NeonButton>Add New Address</NeonButton>
        </Link>
      </div>

      <AddressActions />

      {addresses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {addresses.map((address) => (
            <NeonCard key={address.id} className="relative">
              {address.isDefault && (
                <span className="absolute top-2 right-2 text-xs bg-neon-green/20 text-neon-green px-2 py-1 rounded">
                  Default
                </span>
              )}

              <div className="mb-4">
                <p className="text-white">{address.addressLine1}</p>
                {address.addressLine2 && <p className="text-white">{address.addressLine2}</p>}
                <p className="text-white">
                  {address.city}, {address.state} {address.postalCode}
                </p>
                <p className="text-white">{address.country}</p>
              </div>

              <div className="flex space-x-2">
                <Link href={`/profile/addresses/${address.id}/edit`}>
                  <NeonButton size="sm">Edit</NeonButton>
                </Link>

                {!address.isDefault && (
                  <button
                    className="text-neon-purple hover:underline text-sm"
                    data-address-id={address.id}
                    data-action="set-default"
                  >
                    Set as Default
                  </button>
                )}

                <button
                  className="text-red-500 hover:underline text-sm ml-auto"
                  data-address-id={address.id}
                  data-action="delete"
                >
                  Delete
                </button>
              </div>
            </NeonCard>
          ))}
        </div>
      ) : (
        <NeonCard className="text-center py-12">
          <h2 className="text-2xl text-neon-green mb-4">No addresses yet</h2>
          <p className="text-gray-400 mb-6">You haven't added any addresses yet.</p>
          <Link href="/profile/addresses/new">
            <NeonButton>Add New Address</NeonButton>
          </Link>
        </NeonCard>
      )}
    </div>
  )
}

