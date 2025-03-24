import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { getOrCreateCart } from "@/lib/cart"
import { createOrder } from "@/lib/orders"

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { addressId } = await request.json()

    if (!addressId) {
      return NextResponse.json({ message: "Address ID is required" }, { status: 400 })
    }

    const cart = await getOrCreateCart(user.id)
    const order = await createOrder(user.id, cart.id, addressId)

    return NextResponse.json({ order })
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Failed to create order" }, { status: 500 })
  }
}

