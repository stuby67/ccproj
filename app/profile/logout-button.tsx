"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { NeonButton } from "@/components/ui/neon-button"

export function LogoutButton() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogout = async () => {
    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      })

      if (!response.ok) {
        throw new Error("Logout failed")
      }

      router.push("/")
      router.refresh()
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <NeonButton variant="purple" onClick={handleLogout} isLoading={isLoading}>
      Logout
    </NeonButton>
  )
}

