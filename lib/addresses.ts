import { executeQuery } from "./db"
import { getSession } from "./auth"

export type Address = {
  id: number
  addressLine1: string
  addressLine2: string | null
  city: string
  state: string
  postalCode: string
  country: string
  isDefault: boolean
}

// Get all addresses for the current user
export async function getUserAddresses(): Promise<Address[]> {
  const session = await getSession()

  if (!session) {
    return []
  }

  try {
    const result = await executeQuery(
      `SELECT 
        id, 
        address_line1, 
        address_line2, 
        city, 
        state, 
        postal_code, 
        country, 
        is_default
      FROM addresses
      WHERE user_id = $1
      ORDER BY is_default DESC, id ASC`,
      [session.id],
    )

    return result.map((row: any) => ({
      id: row.id,
      addressLine1: row.address_line1,
      addressLine2: row.address_line2,
      city: row.city,
      state: row.state,
      postalCode: row.postal_code,
      country: row.country,
      isDefault: row.is_default,
    }))
  } catch (error) {
    console.error("Error getting user addresses:", error)
    return []
  }
}

// Get address by ID
export async function getAddressById(id: number): Promise<Address | null> {
  const session = await getSession()

  if (!session) {
    return null
  }

  try {
    const result = await executeQuery(
      `SELECT 
        id, 
        address_line1, 
        address_line2, 
        city, 
        state, 
        postal_code, 
        country, 
        is_default
      FROM addresses
      WHERE id = $1 AND user_id = $2`,
      [id, session.id],
    )

    if (!result || result.length === 0) {
      return null
    }

    const row = result[0]
    return {
      id: row.id,
      addressLine1: row.address_line1,
      addressLine2: row.address_line2,
      city: row.city,
      state: row.state,
      postalCode: row.postal_code,
      country: row.country,
      isDefault: row.is_default,
    }
  } catch (error) {
    console.error("Error getting address by ID:", error)
    return null
  }
}

// Add a new address
export async function addAddress(address: Omit<Address, "id">): Promise<Address | null> {
  const session = await getSession()

  if (!session) {
    return null
  }

  try {
    // If this is the default address, unset any existing default
    if (address.isDefault) {
      await executeQuery("UPDATE addresses SET is_default = false WHERE user_id = $1", [session.id])
    }

    const result = await executeQuery(
      `INSERT INTO addresses (
        user_id, 
        address_line1, 
        address_line2, 
        city, 
        state, 
        postal_code, 
        country, 
        is_default
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id, address_line1, address_line2, city, state, postal_code, country, is_default`,
      [
        session.id,
        address.addressLine1,
        address.addressLine2,
        address.city,
        address.state,
        address.postalCode,
        address.country,
        address.isDefault,
      ],
    )

    if (!result || result.length === 0) {
      return null
    }

    const row = result[0]
    return {
      id: row.id,
      addressLine1: row.address_line1,
      addressLine2: row.address_line2,
      city: row.city,
      state: row.state,
      postalCode: row.postal_code,
      country: row.country,
      isDefault: row.is_default,
    }
  } catch (error) {
    console.error("Error adding address:", error)
    return null
  }
}

// Update an address
export async function updateAddress(id: number, address: Omit<Address, "id">): Promise<boolean> {
  const session = await getSession()

  if (!session) {
    return false
  }

  try {
    // If this is the default address, unset any existing default
    if (address.isDefault) {
      await executeQuery("UPDATE addresses SET is_default = false WHERE user_id = $1", [session.id])
    }

    const result = await executeQuery(
      `UPDATE addresses SET
        address_line1 = $1,
        address_line2 = $2,
        city = $3,
        state = $4,
        postal_code = $5,
        country = $6,
        is_default = $7,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $8 AND user_id = $9
      RETURNING id`,
      [
        address.addressLine1,
        address.addressLine2,
        address.city,
        address.state,
        address.postalCode,
        address.country,
        address.isDefault,
        id,
        session.id,
      ],
    )

    return result && result.length > 0
  } catch (error) {
    console.error("Error updating address:", error)
    return false
  }
}

// Delete an address
export async function deleteAddress(id: number): Promise<boolean> {
  const session = await getSession()

  if (!session) {
    return false
  }

  try {
    const result = await executeQuery("DELETE FROM addresses WHERE id = $1 AND user_id = $2 RETURNING id", [
      id,
      session.id,
    ])

    return result && result.length > 0
  } catch (error) {
    console.error("Error deleting address:", error)
    return false
  }
}

// Set an address as default
export async function setDefaultAddress(id: number): Promise<boolean> {
  const session = await getSession()

  if (!session) {
    return false
  }

  try {
    // First, unset any existing default
    await executeQuery("UPDATE addresses SET is_default = false WHERE user_id = $1", [session.id])

    // Then set the new default
    const result = await executeQuery(
      "UPDATE addresses SET is_default = true WHERE id = $1 AND user_id = $2 RETURNING id",
      [id, session.id],
    )

    return result && result.length > 0
  } catch (error) {
    console.error("Error setting default address:", error)
    return false
  }
}

