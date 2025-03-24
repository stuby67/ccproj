import Link from "next/link"
import Image from "next/image"
import { NeonButton } from "@/components/ui/neon-button"
import { ProductGrid } from "@/components/products/product-grid"
import { getFeaturedProducts, getBrands } from "@/lib/products"

export default async function Home() {
  const featuredProducts = await getFeaturedProducts(8)
  const brands = await getBrands()

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image src="/images/hero-bg.jpg" alt="Hero Background" fill className="object-cover brightness-50" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-glow">
              <span className="text-white">Step Into The </span>
              <span className="text-neon-green">Neon</span>
              <span className="text-neon-purple"> Future</span>
            </h1>

            <p className="text-xl text-gray-300 mb-8">
              Discover premium sneakers with a neon twist. Limited editions, exclusive drops, and classic styles.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/products">
                <NeonButton size="lg">Shop Now</NeonButton>
              </Link>

              <Link href="/categories">
                <NeonButton variant="purple" size="lg">
                  Browse Categories
                </NeonButton>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-neon-green">Featured Products</h2>
            <Link href="/products">
              <NeonButton>View All</NeonButton>
            </Link>
          </div>

          <ProductGrid products={featuredProducts} alternateColors />
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-16 bg-black/60">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-neon-purple text-center mb-12">Top Brands</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {brands.map((brand) => (
              <Link key={brand.id} href={`/products?brand=${brand.id}`} className="flex flex-col items-center group">
                <div className="w-24 h-24 rounded-full bg-black/80 flex items-center justify-center border-2 border-neon-purple mb-4 transition-all duration-300 group-hover:shadow-[0_0_15px_#BC13FE]">
                  {brand.logoUrl ? (
                    <Image
                      src={brand.logoUrl || "/placeholder.svg"}
                      alt={brand.name}
                      width={60}
                      height={60}
                      className="object-contain"
                    />
                  ) : (
                    <span className="text-neon-purple font-bold text-xl">
                      {brand.name.substring(0, 2).toUpperCase()}
                    </span>
                  )}
                </div>
                <span className="text-white group-hover:text-neon-purple transition-colors">{brand.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 relative">
        <div className="absolute inset-0 z-0">
          <Image src="/images/cta-bg.jpg" alt="CTA Background" fill className="object-cover brightness-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl font-bold mb-4 animate-glow">
            <span className="text-neon-green">Join</span>
            <span className="text-white"> The Neon </span>
            <span className="text-neon-purple">Revolution</span>
          </h2>

          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Sign up for exclusive access to limited drops, special offers, and early access to new releases.
          </p>

          <Link href="/register">
            <NeonButton size="lg">Create Account</NeonButton>
          </Link>
        </div>
      </section>
    </div>
  )
}

