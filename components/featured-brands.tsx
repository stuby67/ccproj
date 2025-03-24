import Link from "next/link"
import Image from "next/image"

type Brand = {
  id: number
  name: string
  logo_url: string
}

type FeaturedBrandsProps = {
  brands: Brand[]
}

export function FeaturedBrands({ brands }: FeaturedBrandsProps) {
  return (
    <div className="py-16 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-10 text-center neon-text-purple">Featured Brands</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {brands.map((brand) => (
            <Link key={brand.id} href={`/brands/${brand.id}`}>
              <div className="neon-card-purple flex items-center justify-center p-6 h-32 hover:shadow-neon-green hover:border-neon-green transition-all duration-300">
                {brand.logo_url ? (
                  <Image
                    src={brand.logo_url || "/placeholder.svg"}
                    alt={brand.name}
                    width={120}
                    height={60}
                    className="object-contain max-h-20"
                  />
                ) : (
                  <span className="text-xl font-bold text-white">{brand.name}</span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

