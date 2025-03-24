import { executeQuery } from "./db"
import { getSession } from "./auth"
import { getCart, clearCart } from "./cart"

export type OrderItem = {
  id: number
  productId: number
  productName: string
  size: string
  quantity: number
  price: number
  imageUrl: string
}

export type Order = {
  id: number
  status: string
  totalAmount: number
  createdAt: string
  items: OrderItem[]
  address: {
    addressLine1: string
    addressLine2: string | null
    city: string
    state: string
    postalCode: string
    country: string
  }
}

// Create a new order
export async function createOrder(addressId: number): Promise<number | null> {
  const session = await getSession()

  if (!session) {
    return null
  }

  try {
    // Get the user's cart
    const cart = await getCart()

    if (!cart || cart.items.length === 0) {
      return null
    }

    // Start a transaction
    await executeQuery("BEGIN")

    try {
      // Create the order
      const orderResult = await executeQuery(
        "INSERT INTO orders (user_id, address_id, total_amount, status) VALUES ($1, $2, $3, $4) RETURNING id",
        [session.id, addressId, cart.total, "pending"],
      )

      if (!orderResult || orderResult.length === 0) {
        await executeQuery("ROLLBACK")
        return null
      }

      const orderId = orderResult[0].id

      // Add order items
      for (const item of cart.items) {
        await executeQuery(
          "INSERT INTO order_items (order_id, product_id, size, quantity, price) VALUES ($1, $2, $3, $4, $5)",
          [orderId, item.productId, item.size, item.quantity, item.price],
        )

        // Update product stock
        await executeQuery("UPDATE product_sizes SET stock = stock - $1 WHERE product_id = $2 AND size = $3", [
          item.quantity,
          item.productId,
          item.size,
        ])
      }

      // Clear the cart
      await clearCart()

      // Commit the transaction
      await executeQuery("COMMIT")

      return orderId
    } catch (error) {
      await executeQuery("ROLLBACK")
      throw error
    }
  } catch (error) {
    console.error("Error creating order:", error)
    return null
  }
}

// Get all orders for the current user
export async function getUserOrders(): Promise<Order[]> {
  const session = await getSession()

  if (!session) {
    return []
  }

  try {
    const ordersResult = await executeQuery(
      `SELECT 
        o.id, 
        o.status, 
        o.total_amount, 
        o.created_at,
        a.address_line1,
        a.address_line2,
        a.city,
        a.state,
        a.postal_code,
        a.country
      FROM orders o
      JOIN addresses a ON o.address_id = a.id
      WHERE o.user_id = $1
      ORDER BY o.created_at DESC`,
      [session.id],
    )

    const orders: Order[] = []

    for (const orderRow of ordersResult) {
      // Get order items
      const itemsResult = await executeQuery(
        `SELECT 
          oi.id,
          oi.product_id,
          p.name as product_name,
          oi.size,
          oi.quantity,
          oi.price,
          p.image_url
        FROM order_items oi
        JOIN products p ON oi.product_id = p.id
        WHERE oi.order_id = $1`,
        [orderRow.id],
      )

      const items: OrderItem[] = itemsResult.map((itemRow: any) => ({
        id: itemRow.id,
        productId: itemRow.product_id,
        productName: itemRow.product_name,
        size: itemRow.size,
        quantity: itemRow.quantity,
        price: Number.parseFloat(itemRow.price),
        imageUrl: itemRow.image_url,
      }))

      orders.push({
        id: orderRow.id,
        status: orderRow.status,
        totalAmount: Number.parseFloat(orderRow.total_amount),
        createdAt: new Date(orderRow.created_at).toISOString(),
        items,
        address: {
          addressLine1: orderRow.address_line1,
          addressLine2: orderRow.address_line2,
          city: orderRow.city,
          state: orderRow.state,
          postalCode: orderRow.postal_code,
          country: orderRow.country,
        },
      })
    }

    return orders
  } catch (error) {
    console.error("Error getting user orders:", error)
    return []
  }
}

// Get order by ID
export async function getOrderById(id: number): Promise<Order | null> {
  const session = await getSession()

  if (!session) {
    return null
  }

  try {
    const orderResult = await executeQuery(
      `SELECT 
        o.id, 
        o.status, 
        o.total_amount, 
        o.created_at,
        a.address_line1,
        a.address_line2,
        a.city,
        a.state,
        a.postal_code,
        a.country
      FROM orders o
      JOIN addresses a ON o.address_id = a.id
      WHERE o.id = $1 AND o.user_id = $2`,
      [id, session.id],
    )

    if (!orderResult || orderResult.length === 0) {
      return null
    }

    const orderRow = orderResult[0]

    // Get order items
    const itemsResult = await executeQuery(
      `SELECT 
        oi.id,
        oi.product_id,
        p.name as product_name,
        oi.size,
        oi.quantity,
        oi.price,
        p.image_url
      FROM order_items oi
      JOIN products p ON oi.product_id = p.id
      WHERE oi.order_id = $1`,
      [id],
    )

    const items: OrderItem[] = itemsResult.map((itemRow: any) => ({
      id: itemRow.id,
      productId: itemRow.product_id,
      productName: itemRow.product_name,
      size: itemRow.size,
      quantity: itemRow.quantity,
      price: Number.parseFloat(itemRow.price),
      imageUrl: itemRow.image_url,
    }))

    return {
      id: orderRow.id,
      status: orderRow.status,
      totalAmount: Number.parseFloat(orderRow.total_amount),
      createdAt: new Date(orderRow.created_at).toISOString(),
      items,
      address: {
        addressLine1: orderRow.address_line1,
        addressLine2: orderRow.address_line2,
        city: orderRow.city,
        state: orderRow.state,
        postalCode: orderRow.postal_code,
        country: orderRow.country,
      },
    }
  } catch (error) {
    console.error("Error getting order by ID:", error)
    return null
  }
}

export async function updateOrderStatus(orderId: number, status: string) {
  return executeQuery("UPDATE orders SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *", [
    status,
    orderId,
  ])
}

