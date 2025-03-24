import { ProductGrid } from "@/components/products/product-grid"
import { ProductFilters } from "@/components/products/product-filters"
import { getProducts, getBrands, getCategories } from "@/lib/products"

interface ProductsPageProps {
  searchParams: {
    search?: string
    brand?: string
    category?: string
    page?: string
  }
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const page = searchParams.page ? Number.parseInt(searchParams.page) : 1
  const limit = 12
  const offset = (page - 1) * limit

  const { products, total } = await getProducts({
    brandId: searchParams.brand ? Number.parseInt(searchParams.brand) : undefined,
    categoryId: searchParams.category ? Number.parseInt(searchParams.category) : undefined,
    search: searchParams.search,
    limit,
    offset,
  })

  const brands = await getBrands()
  const categories = await getCategories()

  const totalPages = Math.ceil(total / limit)

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-neon-green mb-8">All Products</h1>

      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
        <div>
          <ProductFilters brands={brands} categories={categories} />
        </div>

        <div>
          {products.length > 0 ? (
            <>
              <ProductGrid products={products} />

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-12">
                  <div className="flex space-x-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                      const isCurrentPage = pageNum === page

                      // Create URL with current filters
                      const url = new URLSearchParams(searchParams)
                      url.set("page", pageNum.toString())

                      return (
                        <a
                          key={pageNum}
                          href={`/products?${url.toString()}`}
                          className={`inline-flex items-center justify-center w-10 h-10 rounded-md ${
                            isCurrentPage
                              ? "bg-neon-green text-black font-bold"
                              : "bg-black/60 text-white border border-neon-green hover:bg-neon-green/20"
                          }`}
                        >
                          {pageNum}
                        </a>
                      )
                    })}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl text-white mb-4">No products found</h2>
              <p className="text-gray-400">Try adjusting your filters or search criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

