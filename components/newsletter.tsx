"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setEmail("")
      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter",
      })
    }, 1000)
  }

  return (
    <div className="py-16 bg-black border-t border-neon-purple shadow-neon-purple">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 neon-text-purple">Join Our Newsletter</h2>
          <p className="text-gray-400 mb-8">Subscribe to get special offers, free giveaways, and exclusive deals.</p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="neon-input-purple flex-1"
              required
            />
            <Button type="submit" className="neon-button-purple" disabled={isLoading}>
              {isLoading ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

