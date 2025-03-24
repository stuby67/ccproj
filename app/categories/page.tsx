import Link from "next/link"
import { NeonCard } from "@/components/ui/neon-card"
import { getCategories } from "@/lib/products"

export default async function CategoriesPage() {
  const categories = await getCategories()

  // Define some icons for categories (you can replace these with actual images if needed)
  const categoryIcons: Record<string, string> = {
    Running: "🏃",
    Basketball: "🏀",
    Lifestyle: "👟",
    Training: "💪",
    Skateboarding: "🛹",
    "Limited Edition": "✨",
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-neon-purple mb-12">Shop by Category</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {categories.map((category) => (
          <Link key={category.id} href={`/products?category=${category.id}`}>
            <NeonCard
              variant="purple"
              className="h-full flex flex-col items-center justify-center py-12 transition-all duration-300 hover:scale-105"
            >
              <div className="text-5xl mb-6">{categoryIcons[category.name] || "👟"}</div>

              <h2 className="text-2xl font-bold text-neon-purple text-center">{category.name}</h2>
              <p className="text-gray-400 mt-2">View Collection</p>
            </NeonCard>
          </Link>
        ))}
      </div>
    </div>
  )
}

