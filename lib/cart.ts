import { executeQuery } from "./db"
import { getSession } from "./auth"

export type CartItem = {
  id: number
  productId: number
  productName: string
  brandName: string
  size: string
  quantity: number
  price: number
  imageUrl: string
}

export type Cart = {
  id: number
  items: CartItem[]
  total: number
}

// Get or create a cart for the current user
export async function getCart(): Promise<Cart | null> {
  const session = await getSession()

  if (!session) {
    return null
  }

  try {
    // Check if user already has a cart
    const cartResult = await executeQuery("SELECT id FROM carts WHERE user_id = $1", [session.id])

    let cartId

    // If no cart exists, create one
    if (!cartResult || cartResult.length === 0) {
      const newCartResult = await executeQuery("INSERT INTO carts (user_id) VALUES ($1) RETURNING id", [session.id])

      if (!newCartResult || newCartResult.length === 0) {
        return null
      }

      cartId = newCartResult[0].id
    } else {
      cartId = cartResult[0].id
    }

    // Get cart items with product details
    const itemsResult = await executeQuery(
      `
      SELECT 
        ci.id, 
        ci.product_id, 
        ci.size, 
        ci.quantity, 
        p.name as product_name, 
        p.price, 
        p.image_url,
        b.name as brand_name
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.id
      JOIN brands b ON p.brand_id = b.id
      WHERE ci.cart_id = $1
    `,
      [cartId],
    )

    const items: CartItem[] = itemsResult.map((item: any) => ({
      id: item.id,
      productId: item.product_id,
      productName: item.product_name,
      brandName: item.brand_name,
      size: item.size,
      quantity: item.quantity,
      price: Number.parseFloat(item.price),
      imageUrl: item.image_url,
    }))

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

    return {
      id: cartId,
      items,
      total,
    }
  } catch (error) {
    console.error("Error getting cart:", error)
    return null
  }
}

// Add an item to the cart
export async function addToCart(productId: number, size: string, quantity: number): Promise<boolean> {
  const session = await getSession()

  if (!session) {
    return false
  }

  try {
    // Get or create cart
    const cartResult = await executeQuery("SELECT id FROM carts WHERE user_id = $1", [session.id])

    let cartId

    if (!cartResult || cartResult.length === 0) {
      const newCartResult = await executeQuery("INSERT INTO carts (user_id) VALUES ($1) RETURNING id", [session.id])

      if (!newCartResult || newCartResult.length === 0) {
        return false
      }

      cartId = newCartResult[0].id
    } else {
      cartId = cartResult[0].id
    }

    // Check if item already exists in cart
    const existingItemResult = await executeQuery(
      "SELECT id, quantity FROM cart_items WHERE cart_id = $1 AND product_id = $2 AND size = $3",
      [cartId, productId, size],
    )

    if (existingItemResult && existingItemResult.length > 0) {
      // Update quantity if item exists
      const existingItem = existingItemResult[0]
      const newQuantity = existingItem.quantity + quantity

      await executeQuery("UPDATE cart_items SET quantity = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2", [
        newQuantity,
        existingItem.id,
      ])
    } else {
      // Add new item if it doesn't exist
      await executeQuery("INSERT INTO cart_items (cart_id, product_id, size, quantity) VALUES ($1, $2, $3, $4)", [
        cartId,
        productId,
        size,
        quantity,
      ])
    }

    return true
  } catch (error) {
    console.error("Error adding to cart:", error)
    return false
  }
}

// Update cart item quantity
export async function updateCartItem(itemId: number, quantity: number): Promise<boolean> {
  const session = await getSession()

  if (!session) {
    return false
  }

  try {
    if (quantity <= 0) {
      // Remove item if quantity is 0 or negative
      await executeQuery("DELETE FROM cart_items WHERE id = $1", [itemId])
    } else {
      // Update quantity
      await executeQuery("UPDATE cart_items SET quantity = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2", [
        quantity,
        itemId,
      ])
    }

    return true
  } catch (error) {
    console.error("Error updating cart item:", error)
    return false
  }
}

// Remove item from cart
export async function removeFromCart(itemId: number): Promise<boolean> {
  const session = await getSession()

  if (!session) {
    return false
  }

  try {
    await executeQuery("DELETE FROM cart_items WHERE id = $1", [itemId])

    return true
  } catch (error) {
    console.error("Error removing from cart:", error)
    return false
  }
}

// Clear cart
export async function clearCart(): Promise<boolean> {
  const session = await getSession()

  if (!session) {
    return false
  }

  try {
    const cartResult = await executeQuery("SELECT id FROM carts WHERE user_id = $1", [session.id])

    if (cartResult && cartResult.length > 0) {
      const cartId = cartResult[0].id

      await executeQuery("DELETE FROM cart_items WHERE cart_id = $1", [cartId])
    }

    return true
  } catch (error) {
    console.error("Error clearing cart:", error)
    return false
  }
}

