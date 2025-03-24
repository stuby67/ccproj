import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <div className="relative bg-black py-20 overflow-hidden">
      {/* Background grid effect */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="h-full w-full bg-[linear-gradient(to_right,#39FF14_1px,transparent_1px),linear-gradient(to_bottom,#39FF14_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-glow neon-text-green">STEP INTO THE FUTURE</h1>
          <p className="text-xl md:text-2xl text-white mb-8">
            Discover premium sneakers with our exclusive neon collection. Limited editions that make you stand out.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/products">
              <Button className="neon-button text-lg py-6 px-8">Shop Collection</Button>
            </Link>
            <Link href="/new-arrivals">
              <Button className="neon-button-purple text-lg py-6 px-8">New Arrivals</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

