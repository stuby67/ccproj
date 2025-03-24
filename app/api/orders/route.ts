import { type NextRequest, NextResponse } from "next/server"
import { createOrder, getUserOrders, getOrderById } from "@/lib/orders"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (id) {
      const order = await getOrderById(Number.parseInt(id))

      if (!order) {
        return NextResponse.json({ error: "Order not found" }, { status: 404 })
      }

      return NextResponse.json(order)
    }

    const orders = await getUserOrders()
    return NextResponse.json(orders)
  } catch (error) {
    console.error("Get orders error:", error)
    return NextResponse.json({ error: "An error occurred while fetching orders" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { addressId } = body

    if (!addressId) {
      return NextResponse.json({ error: "Address ID is required" }, { status: 400 })
    }

    const orderId = await createOrder(addressId)

    if (!orderId) {
      return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
    }

    const order = await getOrderById(orderId)
    return NextResponse.json(order)
  } catch (error) {
    console.error("Create order error:", error)
    return NextResponse.json({ error: "An error occurred while creating the order" }, { status: 500 })
  }
}

