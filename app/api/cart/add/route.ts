import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { getOrCreateCart, addToCart } from "@/lib/cart"

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { productId, size, quantity } = await request.json()

    if (!productId || !size || !quantity) {
      return NextResponse.json({ message: "Product ID, size, and quantity are required" }, { status: 400 })
    }

    const cart = await getOrCreateCart(user.id)
    const cartItem = await addToCart(cart.id, productId, size, quantity)

    return NextResponse.json({ cartItem })
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Failed to add to cart" }, { status: 500 })
  }
}

