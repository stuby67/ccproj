import { type NextRequest, NextResponse } from "next/server"
import { getCart, addToCart, updateCartItem, removeFromCart } from "@/lib/cart"

export async function GET() {
  try {
    const cart = await getCart()

    if (!cart) {
      return NextResponse.json({ error: "Cart not found or user not authenticated" }, { status: 404 })
    }

    return NextResponse.json(cart)
  } catch (error) {
    console.error("Get cart error:", error)
    return NextResponse.json({ error: "An error occurred while fetching the cart" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { productId, size, quantity } = body

    if (!productId || !size || !quantity) {
      return NextResponse.json({ error: "Product ID, size, and quantity are required" }, { status: 400 })
    }

    const success = await addToCart(productId, size, quantity)

    if (!success) {
      return NextResponse.json({ error: "Failed to add item to cart" }, { status: 500 })
    }

    const cart = await getCart()

    return NextResponse.json(cart)
  } catch (error) {
    console.error("Add to cart error:", error)
    return NextResponse.json({ error: "An error occurred while adding to cart" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { itemId, quantity } = body

    if (!itemId || quantity === undefined) {
      return NextResponse.json({ error: "Item ID and quantity are required" }, { status: 400 })
    }

    const success = await updateCartItem(itemId, quantity)

    if (!success) {
      return NextResponse.json({ error: "Failed to update cart item" }, { status: 500 })
    }

    const cart = await getCart()

    return NextResponse.json(cart)
  } catch (error) {
    console.error("Update cart error:", error)
    return NextResponse.json({ error: "An error occurred while updating the cart" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const itemId = searchParams.get("itemId")

    if (!itemId) {
      return NextResponse.json({ error: "Item ID is required" }, { status: 400 })
    }

    const success = await removeFromCart(Number.parseInt(itemId))

    if (!success) {
      return NextResponse.json({ error: "Failed to remove item from cart" }, { status: 500 })
    }

    const cart = await getCart()

    return NextResponse.json(cart)
  } catch (error) {
    console.error("Remove from cart error:", error)
    return NextResponse.json({ error: "An error occurred while removing from cart" }, { status: 500 })
  }
}

