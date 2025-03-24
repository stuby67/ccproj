import { redirect, notFound } from "next/navigation"
import Link from "next/link"
import { NeonCard } from "@/components/ui/neon-card"
import { getAddressById } from "@/lib/addresses"
import { getSession } from "@/lib/auth"
import { EditAddressAction } from "./edit-address-action"

interface EditAddressPageProps {
  params: {
    id: string
  }
}

export default async function EditAddressPage({ params }: EditAddressPageProps) {
  const session = await getSession()

  if (!session) {
    redirect("/login")
  }

  const addressId = Number.parseInt(params.id)

  if (isNaN(addressId)) {
    notFound()
  }

  const address = await getAddressById(addressId)

  if (!address) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <Link href="/profile/addresses" className="text-neon-green hover:underline">
          &larr; Back to Addresses
        </Link>
      </div>

      <h1 className="text-4xl font-bold text-neon-green mb-8">Edit Address</h1>

      <NeonCard className="max-w-2xl">
        <EditAddressAction address={address} />
      </NeonCard>
    </div>
  )
}

