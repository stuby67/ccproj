import { cookies } from "next/headers"
import { jwtVerify, SignJWT } from "jose"
import { executeQuery } from "./db"
import bcrypt from "bcryptjs"

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "fallback_secret_for_development_only")

export type User = {
  id: number
  email: string
  firstName: string | null
  lastName: string | null
}

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10)
}

export async function comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword)
}

export async function createUser(
  email: string,
  password: string,
  firstName?: string,
  lastName?: string,
): Promise<User | null> {
  const hashedPassword = await hashPassword(password)

  try {
    const result = await executeQuery(
      "INSERT INTO users (email, password_hash, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING id, email, first_name, last_name",
      [email, hashedPassword, firstName || null, lastName || null],
    )

    if (result && result.length > 0) {
      const user = result[0]
      return {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
      }
    }
    return null
  } catch (error) {
    console.error("Error creating user:", error)
    return null
  }
}

export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const result = await executeQuery("SELECT id, email, first_name, last_name FROM users WHERE email = $1", [email])

    if (result && result.length > 0) {
      const user = result[0]
      return {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
      }
    }
    return null
  } catch (error) {
    console.error("Error getting user by email:", error)
    return null
  }
}

export async function verifyPassword(email: string, password: string): Promise<User | null> {
  try {
    const result = await executeQuery(
      "SELECT id, email, password_hash, first_name, last_name FROM users WHERE email = $1",
      [email],
    )

    if (result && result.length > 0) {
      const user = result[0]
      const isValid = await comparePasswords(password, user.password_hash)

      if (isValid) {
        return {
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
        }
      }
    }
    return null
  } catch (error) {
    console.error("Error verifying password:", error)
    return null
  }
}

export async function createSession(user: User): Promise<string> {
  // Create a JWT token that expires in 7 days
  const token = await new SignJWT({ userId: user.id, email: user.email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET)

  return token
}

export async function getSession(): Promise<User | null> {
  const cookieStore = cookies()
  const token = cookieStore.get("token")?.value

  if (!token) return null

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)

    if (payload.userId && payload.email) {
      return {
        id: payload.userId as number,
        email: payload.email as string,
        firstName: null,
        lastName: null,
      }
    }

    return null
  } catch (error) {
    console.error("Error verifying token:", error)
    return null
  }
}

export async function getUserDetails(userId: number): Promise<User | null> {
  try {
    const result = await executeQuery("SELECT id, email, first_name, last_name FROM users WHERE id = $1", [userId])

    if (result && result.length > 0) {
      const user = result[0]
      return {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
      }
    }
    return null
  } catch (error) {
    console.error("Error getting user details:", error)
    return null
  }
}

