"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { NeonButton } from "@/components/ui/neon-button"
import { NeonInput } from "@/components/ui/neon-input"
import type { Brand, Category } from "@/lib/products"

interface ProductFiltersProps {
  brands: Brand[]
  categories: Category[]
}

export function ProductFilters({ brands, categories }: ProductFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [search, setSearch] = useState(searchParams.get("search") || "")
  const [selectedBrand, setSelectedBrand] = useState(searchParams.get("brand") || "")
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "")

  const handleFilter = () => {
    const params = new URLSearchParams()

    if (search) params.set("search", search)
    if (selectedBrand) params.set("brand", selectedBrand)
    if (selectedCategory) params.set("category", selectedCategory)

    router.push(`/products?${params.toString()}`)
  }

  const handleReset = () => {
    setSearch("")
    setSelectedBrand("")
    setSelectedCategory("")
    router.push("/products")
  }

  return (
    <div className="neon-card mb-8 p-6">
      <h2 className="text-xl font-bold text-neon-green mb-4">Filter Products</h2>

      <div className="space-y-4">
        <div>
          <label htmlFor="search" className="block text-white mb-2">
            Search
          </label>
          <NeonInput
            id="search"
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full"
          />
        </div>

        <div>
          <label htmlFor="brand" className="block text-white mb-2">
            Brand
          </label>
          <select
            id="brand"
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="neon-input w-full"
          >
            <option value="">All Brands</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id.toString()}>
                {brand.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="category" className="block text-white mb-2">
            Category
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="neon-input w-full"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id.toString()}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex space-x-4">
          <NeonButton onClick={handleFilter} className="flex-1">
            Apply Filters
          </NeonButton>
          <NeonButton onClick={handleReset} variant="purple" className="flex-1">
            Reset
          </NeonButton>
        </div>
      </div>
    </div>
  )
}

