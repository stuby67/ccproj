import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { removeCartItem } from "@/lib/cart"

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { cartItemId } = await request.json()

    if (!cartItemId) {
      return NextResponse.json({ message: "Cart item ID is required" }, { status: 400 })
    }

    await removeCartItem(cartItemId)

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Failed to remove item" }, { status: 500 })
  }
}

