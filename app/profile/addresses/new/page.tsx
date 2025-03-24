import { redirect } from "next/navigation"
import Link from "next/link"
import { NeonCard } from "@/components/ui/neon-card"
import { getSession } from "@/lib/auth"
import { AddAddressAction } from "./add-address-action"

export default async function NewAddressPage() {
  const session = await getSession()

  if (!session) {
    redirect("/login?redirect=/profile/addresses/new")
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <Link href="/profile/addresses" className="text-neon-green hover:underline">
          &larr; Back to Addresses
        </Link>
      </div>

      <h1 className="text-4xl font-bold text-neon-green mb-8">Add New Address</h1>

      <NeonCard className="max-w-2xl">
        <AddAddressAction />
      </NeonCard>
    </div>
  )
}

