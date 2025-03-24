import { type NextRequest, NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"
import { getSession, comparePasswords, hashPassword } from "@/lib/auth"

export async function PUT(request: NextRequest) {
  try {
    const session = await getSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { firstName, lastName, currentPassword, newPassword } = body

    // Start building the update query
    let query = "UPDATE users SET "
    const params: any[] = []
    const updates: string[] = []

    // Add name updates if provided
    if (firstName !== undefined) {
      updates.push("first_name = $" + (params.length + 1))
      params.push(firstName || null)
    }

    if (lastName !== undefined) {
      updates.push("last_name = $" + (params.length + 1))
      params.push(lastName || null)
    }

    // Handle password update if provided
    if (newPassword) {
      if (!currentPassword) {
        return NextResponse.json({ error: "Current password is required to set a new password" }, { status: 400 })
      }

      // Verify current password
      const userResult = await executeQuery("SELECT password_hash FROM users WHERE id = $1", [session.id])

      if (!userResult || userResult.length === 0) {
        return NextResponse.json({ error: "User not found" }, { status: 404 })
      }

      const isValid = await comparePasswords(currentPassword, userResult[0].password_hash)

      if (!isValid) {
        return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 })
      }

      // Hash the new password
      const hashedPassword = await hashPassword(newPassword)

      updates.push("password_hash = $" + (params.length + 1))
      params.push(hashedPassword)
    }

    // If no updates, return success
    if (updates.length === 0) {
      return NextResponse.json({ success: true })
    }

    // Complete the query
    query += updates.join(", ")
    query += ", updated_at = CURRENT_TIMESTAMP WHERE id = $" + (params.length + 1)
    params.push(session.id)

    // Execute the update
    await executeQuery(query, params)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Update user error:", error)
    return NextResponse.json({ error: "An error occurred while updating the user" }, { status: 500 })
  }
}

