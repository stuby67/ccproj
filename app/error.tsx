"use client"

import { useEffect } from "react"
import Link from "next/link"
import { NeonButton } from "@/components/ui/neon-button"

interface ErrorProps {
  error: Error
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error)
  }, [error])

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-neon-purple animate-glow mb-4">Oops!</h1>
        <h2 className="text-3xl font-bold text-white mb-6">Something went wrong</h2>
        <p className="text-gray-400 max-w-md mx-auto mb-8">
          We apologize for the inconvenience. Please try again or return to the home page.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <NeonButton onClick={reset}>Try Again</NeonButton>
          <Link href="/">
            <NeonButton variant="purple">Return to Home</NeonButton>
          </Link>
        </div>
      </div>
    </div>
  )
}

