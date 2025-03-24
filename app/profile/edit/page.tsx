import { redirect } from "next/navigation"
import Link from "next/link"
import { NeonCard } from "@/components/ui/neon-card"
import { getUserDetails } from "@/lib/auth"
import { EditProfileForm } from "./edit-profile-form"

export default async function EditProfilePage() {
  const user = await getUserDetails()

  if (!user) {
    redirect("/login?redirect=/profile/edit")
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <Link href="/profile" className="text-neon-green hover:underline">
          &larr; Back to Profile
        </Link>
      </div>

      <h1 className="text-4xl font-bold text-neon-green mb-8">Edit Profile</h1>

      <NeonCard className="max-w-2xl">
        <EditProfileForm user={user} />
      </NeonCard>
    </div>
  )
}

