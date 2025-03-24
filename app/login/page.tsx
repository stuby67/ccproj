"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { NeonCard } from "@/components/ui/neon-card"
import { NeonInput } from "@/components/ui/neon-input"
import { NeonButton } from "@/components/ui/neon-button"

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Login failed")
      }

      // Redirect to home page on successful login
      router.push("/")
      router.refresh()
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred during login")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <NeonCard variant="purple" className="w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-neon-purple animate-glow">Login</h1>
            <p className="text-gray-400 mt-2">Sign in to your account</p>
          </div>

          {error && <div className="bg-red-900/50 border border-red-500 text-white p-3 rounded-md mb-6">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-white mb-2">
                Email
              </label>
              <NeonInput
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                variant="purple"
                className="w-full"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-white mb-2">
                Password
              </label>
              <NeonInput
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                variant="purple"
                className="w-full"
              />
            </div>

            <div>
              <NeonButton type="submit" variant="purple" className="w-full" isLoading={isLoading}>
                Login
              </NeonButton>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-neon-purple hover:underline">
                Register
              </Link>
            </p>
          </div>
        </NeonCard>
      </div>
    </div>
  )
}

