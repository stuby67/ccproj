import Link from "next/link"
import Image from "next/image"
import { NeonCard } from "@/components/ui/neon-card"
import { getBrands } from "@/lib/products"

export default async function BrandsPage() {
  const brands = await getBrands()

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-neon-green mb-12">Shop by Brand</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {brands.map((brand) => (
          <Link key={brand.id} href={`/products?brand=${brand.id}`}>
            <NeonCard className="h-full flex flex-col items-center justify-center py-8 transition-all duration-300 hover:scale-105">
              <div className="w-32 h-32 rounded-full bg-black/80 flex items-center justify-center border-2 border-neon-green mb-6">
                {brand.logoUrl ? (
                  <Image
                    src={brand.logoUrl || "/placeholder.svg"}
                    alt={brand.name}
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                ) : (
                  <span className="text-neon-green font-bold text-4xl">{brand.name.substring(0, 2).toUpperCase()}</span>
                )}
              </div>

              <h2 className="text-2xl font-bold text-neon-green text-center">{brand.name}</h2>
              <p className="text-gray-400 mt-2">View Collection</p>
            </NeonCard>
          </Link>
        ))}
      </div>
    </div>
  )
}

