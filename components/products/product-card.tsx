import Link from "next/link"
import Image from "next/image"
import { NeonCard } from "@/components/ui/neon-card"
import { NeonButton } from "@/components/ui/neon-button"
import type { Product } from "@/lib/products"

interface ProductCardProps {
  product: Product
  variant?: "green" | "purple"
}

export function ProductCard({ product, variant = "green" }: ProductCardProps) {
  return (
    <NeonCard variant={variant} className="h-full flex flex-col">
      <Link href={`/products/${product.id}`} className="group">
        <div className="relative aspect-square mb-4 overflow-hidden rounded-md">
          <Image
            src={product.imageUrl || `/placeholder.svg?height=400&width=400&text=${encodeURIComponent(product.name)}`}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        <div className="flex-1">
          <h3 className={`text-lg font-semibold ${variant === "green" ? "text-neon-green" : "text-neon-purple"}`}>
            {product.name}
          </h3>

          <p className="text-sm text-gray-400 mb-2">{product.brandName}</p>

          <p className="text-white font-bold mb-4">${product.price.toFixed(2)}</p>
        </div>
      </Link>

      <div className="mt-auto">
        <Link href={`/products/${product.id}`}>
          <NeonButton variant={variant} className="w-full">
            View Details
          </NeonButton>
        </Link>
      </div>
    </NeonCard>
  )
}

