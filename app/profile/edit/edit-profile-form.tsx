"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { NeonInput } from "@/components/ui/neon-input"
import { NeonButton } from "@/components/ui/neon-button"
import type { User } from "@/lib/auth"

interface EditProfileFormProps {
  user: User
}

export function EditProfileForm({ user }: EditProfileFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
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
    setSuccess(null)

    // Validate passwords if trying to change password
    if (formData.newPassword || formData.confirmPassword) {
      if (!formData.currentPassword) {
        setError("Current password is required to set a new password")
        return
      }

      if (formData.newPassword !== formData.confirmPassword) {
        setError("New passwords do not match")
        return
      }
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          currentPassword: formData.currentPassword || undefined,
          newPassword: formData.newPassword || undefined,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to update profile")
      }

      setSuccess("Profile updated successfully")

      // Clear password fields
      setFormData({
        ...formData,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })

      router.refresh()
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
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
        <NeonInput id="email" value={user.email} disabled className="w-full opacity-70" />
        <p className="text-gray-400 text-sm mt-1">Email cannot be changed</p>
      </div>

      <div className="border-t border-neon-green/30 pt-6 mt-6">
        <h2 className="text-xl font-bold text-neon-green mb-4">Change Password</h2>

        <div className="space-y-4">
          <div>
            <label htmlFor="currentPassword" className="block text-white mb-2">
              Current Password
            </label>
            <NeonInput
              id="currentPassword"
              name="currentPassword"
              type="password"
              value={formData.currentPassword}
              onChange={handleChange}
              className="w-full"
            />
          </div>

          <div>
            <label htmlFor="newPassword" className="block text-white mb-2">
              New Password
            </label>
            <NeonInput
              id="newPassword"
              name="newPassword"
              type="password"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-white mb-2">
              Confirm New Password
            </label>
            <NeonInput
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {error && <div className="bg-red-900/50 border border-red-500 text-white p-3 rounded-md">{error}</div>}

      {success && <div className="bg-green-900/50 border border-green-500 text-white p-3 rounded-md">{success}</div>}

      <div className="flex justify-end space-x-4">
        <NeonButton type="button" variant="purple" onClick={() => router.push("/profile")}>
          Cancel
        </NeonButton>

        <NeonButton type="submit" isLoading={isLoading}>
          Save Changes
        </NeonButton>
      </div>
    </form>
  )
}

