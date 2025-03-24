import { ProductCard } from "@/components/product-card"

type Product = {
  id: number
  name: string
  brand_name?: string
  price: number
  image_url: string
}

type ProductGridProps = {
  products: Product[]
  title?: string
}

export function ProductGrid({ products, title }: ProductGridProps) {
  return (
    <div className="w-full">
      {title && <h2 className="text-2xl font-bold mb-6 neon-text-green">{title}</h2>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

