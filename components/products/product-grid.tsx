import { ProductCard } from "@/components/products/product-card"
import type { Product } from "@/lib/products"

interface ProductGridProps {
  products: Product[]
  alternateColors?: boolean
}

export function ProductGrid({ products, alternateColors = false }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          variant={alternateColors && index % 2 === 1 ? "purple" : "green"}
        />
      ))}
    </div>
  )
}

