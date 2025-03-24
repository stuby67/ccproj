import Link from "next/link"
import Image from "next/image"

type Category = {
  id: number
  name: string
  image_url?: string
}

type CategoryShowcaseProps = {
  categories: Category[]
}

export function CategoryShowcase({ categories }: CategoryShowcaseProps) {
  return (
    <div className="py-16 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-10 text-center neon-text-green">Shop By Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link key={category.id} href={`/categories/${category.id}`}>
              <div className="relative h-64 rounded-lg overflow-hidden group">
                <Image
                  src={category.image_url || "/placeholder.svg?height=400&width=600"}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white group-hover:text-neon-green transition-colors">
                    {category.name}
                  </h3>
                </div>
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-neon-green transition-all duration-300 rounded-lg"></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

