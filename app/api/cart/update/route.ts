import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { updateCartItem } from "@/lib/cart"

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { cartItemId, quantity } = await request.json()

    if (!cartItemId || !quantity) {
      return NextResponse.json({ message: "Cart item ID and quantity are required" }, { status: 400 })
    }

    const cartItem = await updateCartItem(cartItemId, quantity)

    return NextResponse.json({ cartItem })
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Failed to update cart" }, { status: 500 })
  }
}

