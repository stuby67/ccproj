import Link from "next/link"
import { NeonButton } from "@/components/ui/neon-button"

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-neon-green animate-glow mb-4">404</h1>
        <h2 className="text-3xl font-bold text-white mb-6">Page Not Found</h2>
        <p className="text-gray-400 max-w-md mx-auto mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link href="/">
          <NeonButton>Return to Home</NeonButton>
        </Link>
      </div>
    </div>
  )
}

