import Link from "next/link"
import Image from "next/image"
import { formatCurrency } from "@/lib/utils"

type ProductCardProps = {
  product: {
    id: number
    name: string
    brand_name?: string
    price: number
    image_url: string
  }
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`}>
      <div className="group neon-card hover:shadow-neon-purple hover:border-neon-purple transition-all duration-300 h-full flex flex-col">
        <div className="relative aspect-square overflow-hidden rounded-t-md bg-gray-900">
          <Image
            src={product.image_url || "/placeholder.svg?height=400&width=400"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="flex-1 p-4 flex flex-col">
          {product.brand_name && <p className="text-neon-purple text-sm">{product.brand_name}</p>}
          <h3 className="font-semibold text-white mt-1 group-hover:text-neon-green transition-colors">
            {product.name}
          </h3>
          <p className="mt-auto pt-2 font-bold text-neon-green">{formatCurrency(product.price)}</p>
        </div>
      </div>
    </Link>
  )
}

