import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { NeonCard } from "@/components/ui/neon-card"
import { AddToCartButton } from "./add-to-cart-button"
import { getProductById, getFeaturedProducts } from "@/lib/products"
import { ProductGrid } from "@/components/products/product-grid"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const productId = Number.parseInt(params.id)

  if (isNaN(productId)) {
    notFound()
  }

  const product = await getProductById(productId)

  if (!product) {
    notFound()
  }

  // Get related products (same brand or category)
  const relatedProducts = await getFeaturedProducts(4)

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <Link href="/products" className="text-neon-green hover:underline">
          &larr; Back to Products
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="relative aspect-square">
          <NeonCard className="h-full p-0 overflow-hidden">
            <Image
              src={product.imageUrl || `/placeholder.svg?height=600&width=600&text=${encodeURIComponent(product.name)}`}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </NeonCard>
        </div>

        {/* Product Details */}
        <div>
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-neon-green mb-2">{product.name}</h1>
            <div className="flex items-center mb-4">
              <Link href={`/products?brand=${product.brandId}`} className="text-neon-purple hover:underline">
                {product.brandName}
              </Link>
              <span className="mx-2 text-gray-500">|</span>
              <Link href={`/products?category=${product.categoryId}`} className="text-gray-400 hover:underline">
                {product.categoryName}
              </Link>
            </div>
            <p className="text-2xl font-bold text-white">${product.price.toFixed(2)}</p>
          </div>

          <div className="mb-8">
            <p className="text-gray-300 leading-relaxed">{product.description}</p>
          </div>

          <AddToCartButton product={product} />
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-20">
        <h2 className="text-2xl font-bold text-neon-purple mb-8">You Might Also Like</h2>
        <ProductGrid products={relatedProducts} />
      </div>
    </div>
  )
}

