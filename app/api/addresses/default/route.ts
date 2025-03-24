import { type NextRequest, NextResponse } from "next/server"
import { setDefaultAddress, getUserAddresses } from "@/lib/addresses"

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id } = body

    if (!id) {
      return NextResponse.json({ error: "Address ID is required" }, { status: 400 })
    }

    const success = await setDefaultAddress(id)

    if (!success) {
      return NextResponse.json({ error: "Failed to set default address" }, { status: 500 })
    }

    const addresses = await getUserAddresses()
    return NextResponse.json(addresses)
  } catch (error) {
    console.error("Set default address error:", error)
    return NextResponse.json({ error: "An error occurred while setting the default address" }, { status: 500 })
  }
}

