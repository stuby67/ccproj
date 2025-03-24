"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

export function RegisterForm() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Registration failed")
      }

      toast({
        title: "Success!",
        description: "Your account has been created",
      })

      // Redirect to login page
      router.push("/login")
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Registration failed",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="neon-card-purple">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold neon-text-purple">Register</h1>
        <p className="text-gray-400 mt-2">Create your account to start shopping</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="first-name" className="block text-sm font-medium text-gray-300 mb-1">
              First Name
            </label>
            <Input
              id="first-name"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="neon-input-purple w-full"
              placeholder="John"
              required
            />
          </div>

          <div>
            <label htmlFor="last-name" className="block text-sm font-medium text-gray-300 mb-1">
              Last Name
            </label>
            <Input
              id="last-name"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="neon-input-purple w-full"
              placeholder="Doe"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
            Email
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="neon-input-purple w-full"
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
            className="neon-input-purple w-full"
            placeholder="••••••••"
            required
          />
        </div>

        <div>
          <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-300 mb-1">
            Confirm Password
          </label>
          <Input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="neon-input-purple w-full"
            placeholder="••••••••"
            required
          />
        </div>

        <Button type="submit" className="neon-button-purple w-full py-6" disabled={isLoading}>
          {isLoading ? "Creating account..." : "Register"}
        </Button>

        <div className="text-center mt-4">
          <p className="text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="text-neon-green hover:text-neon-purple">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  )
}

