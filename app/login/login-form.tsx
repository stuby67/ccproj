"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Login failed")
      }

      toast({
        title: "Success!",
        description: "You have been logged in",
      })

      // Redirect to home page
      router.push("/")
      router.refresh()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Login failed",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="neon-card">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold neon-text-green">Login</h1>
        <p className="text-gray-400 mt-2">Welcome back! Please login to your account.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
            Email
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="neon-input w-full"
            placeholder="your@email.com"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
            Password
          </label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="neon-input w-full"
            placeholder="••••••••"
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-600 bg-gray-800 text-neon-green focus:ring-neon-green"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <Link href="/forgot-password" className="text-neon-green hover:text-neon-purple">
              Forgot your password?
            </Link>
          </div>
        </div>

        <Button type="submit" className="neon-button w-full py-6" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </Button>

        <div className="text-center mt-4">
          <p className="text-gray-400">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-neon-purple hover:text-neon-green">
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  )
}

