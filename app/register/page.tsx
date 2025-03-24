"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { NeonCard } from "@/components/ui/neon-card"
import { NeonInput } from "@/components/ui/neon-input"
import { NeonButton } from "@/components/ui/neon-button"

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
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

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Registration failed")
      }

      // Redirect to home page on successful registration
      router.push("/")
      router.refresh()
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred during registration")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <NeonCard className="w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-neon-green animate-glow">Create Account</h1>
            <p className="text-gray-400 mt-2">Join the neon revolution</p>
          </div>

          {error && <div className="bg-red-900/50 border border-red-500 text-white p-3 rounded-md mb-6">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-white mb-2">
                  First Name
                </label>
                <NeonInput
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-white mb-2">
                  Last Name
                </label>
                <NeonInput
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>
            </div>

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
                className="w-full"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-white mb-2">
                Confirm Password
              </label>
              <NeonInput
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>

            <div>
              <NeonButton type="submit" className="w-full" isLoading={isLoading}>
                Register
              </NeonButton>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Already have an account?{" "}
              <Link href="/login" className="text-neon-green hover:underline">
                Login
              </Link>
            </p>
          </div>
        </NeonCard>
      </div>
    </div>
  )
}

