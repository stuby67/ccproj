import { type NextRequest, NextResponse } from "next/server"
import { getUserAddresses, addAddress, updateAddress, deleteAddress } from "@/lib/addresses"

export async function GET() {
  try {
    const addresses = await getUserAddresses()
    return NextResponse.json(addresses)
  } catch (error) {
    console.error("Get addresses error:", error)
    return NextResponse.json({ error: "An error occurred while fetching addresses" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { addressLine1, addressLine2, city, state, postalCode, country, isDefault } = body

    if (!addressLine1 || !city || !state || !postalCode || !country) {
      return NextResponse.json({ error: "Required address fields are missing" }, { status: 400 })
    }

    const address = await addAddress({
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
      isDefault: isDefault || false,
    })

    if (!address) {
      return NextResponse.json({ error: "Failed to add address" }, { status: 500 })
    }

    return NextResponse.json(address)
  } catch (error) {
    console.error("Add address error:", error)
    return NextResponse.json({ error: "An error occurred while adding the address" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, addressLine1, addressLine2, city, state, postalCode, country, isDefault } = body

    if (!id || !addressLine1 || !city || !state || !postalCode || !country) {
      return NextResponse.json({ error: "Required address fields are missing" }, { status: 400 })
    }

    const success = await updateAddress(id, {
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
      isDefault: isDefault || false,
    })

    if (!success) {
      return NextResponse.json({ error: "Failed to update address" }, { status: 500 })
    }

    const addresses = await getUserAddresses()
    return NextResponse.json(addresses)
  } catch (error) {
    console.error("Update address error:", error)
    return NextResponse.json({ error: "An error occurred while updating the address" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Address ID is required" }, { status: 400 })
    }

    const success = await deleteAddress(Number.parseInt(id))

    if (!success) {
      return NextResponse.json({ error: "Failed to delete address" }, { status: 500 })
    }

    const addresses = await getUserAddresses()
    return NextResponse.json(addresses)
  } catch (error) {
    console.error("Delete address error:", error)
    return NextResponse.json({ error: "An error occurred while deleting the address" }, { status: 500 })
  }
}

