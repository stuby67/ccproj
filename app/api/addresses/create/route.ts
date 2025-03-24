import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { createAddress } from "@/lib/addresses"

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { addressLine1, addressLine2, city, state, postalCode, country, isDefault } = await request.json()

    if (!addressLine1 || !city || !state || !postalCode || !country) {
      return NextResponse.json({ message: "Required fields are missing" }, { status: 400 })
    }

    const address = await createAddress(
      user.id,
      addressLine1,
      city,
      state,
      postalCode,
      country,
      addressLine2,
      isDefault,
    )

    return NextResponse.json({ address: address[0] })
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Failed to create address" }, { status: 500 })
  }
}

