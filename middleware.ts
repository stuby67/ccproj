import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Get the pathname
  const path = request.nextUrl.pathname

  // Define public paths that don't require authentication
  const publicPaths = ["/", "/login", "/register", "/products", "/brands", "/categories"]

  // Check if the path is public or starts with /api
  const isPublicPath =
    publicPaths.includes(path) ||
    path.startsWith("/api/") ||
    path.startsWith("/products/") ||
    path.startsWith("/_next/") ||
    path.includes(".")

  // Get the token from cookies
  const token = request.cookies.get("token")?.value

  // If the path requires authentication and there's no token, redirect to login
  if (!isPublicPath && !token) {
    const url = new URL("/login", request.url)
    url.searchParams.set("redirect", path)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}

