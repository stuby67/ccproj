import { executeQuery } from "./db"

export type Product = {
  id: number
  name: string
  description: string
  brandId: number
  brandName: string
  categoryId: number
  categoryName: string
  price: number
  imageUrl: string
}

export type ProductSize = {
  size: string
  stock: number
}

export type ProductDetail = Product & {
  sizes: ProductSize[]
}

export type Brand = {
  id: number
  name: string
  logoUrl: string | null
}

export type Category = {
  id: number
  name: string
}

// Get all products with optional filtering
export async function getProducts(options?: {
  brandId?: number
  categoryId?: number
  search?: string
  limit?: number
  offset?: number
}): Promise<{ products: Product[]; total: number }> {
  const { brandId, categoryId, search, limit = 12, offset = 0 } = options || {}

  try {
    let query = `
      SELECT 
        p.id, 
        p.name, 
        p.description, 
        p.brand_id, 
        b.name as brand_name, 
        p.category_id, 
        c.name as category_name, 
        p.price, 
        p.image_url
      FROM products p
      JOIN brands b ON p.brand_id = b.id
      JOIN categories c ON p.category_id = c.id
      WHERE 1=1
    `

    const params: any[] = []
    let paramIndex = 1

    if (brandId) {
      query += ` AND p.brand_id = $${paramIndex}`
      params.push(brandId)
      paramIndex++
    }

    if (categoryId) {
      query += ` AND p.category_id = $${paramIndex}`
      params.push(categoryId)
      paramIndex++
    }

    if (search) {
      query += ` AND (p.name ILIKE $${paramIndex} OR p.description ILIKE $${paramIndex})`
      params.push(`%${search}%`)
      paramIndex++
    }

    // Get total count
    const countQuery = `SELECT COUNT(*) as total FROM (${query}) as filtered_products`
    const countResult = await executeQuery(countQuery, params)
    const total = Number.parseInt(countResult[0].total)

    // Add pagination
    query += ` ORDER BY p.id LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`
    params.push(limit, offset)

    const result = await executeQuery(query, params)

    const products: Product[] = result.map((row: any) => ({
      id: row.id,
      name: row.name,
      description: row.description,
      brandId: row.brand_id,
      brandName: row.brand_name,
      categoryId: row.category_id,
      categoryName: row.category_name,
      price: Number.parseFloat(row.price),
      imageUrl: row.image_url,
    }))

    return { products, total }
  } catch (error) {
    console.error("Error getting products:", error)
    return { products: [], total: 0 }
  }
}

// Get featured products
export async function getFeaturedProducts(limit = 6): Promise<Product[]> {
  try {
    const query = `
      SELECT 
        p.id, 
        p.name, 
        p.description, 
        p.brand_id, 
        b.name as brand_name, 
        p.category_id, 
        c.name as category_name, 
        p.price, 
        p.image_url
      FROM products p
      JOIN brands b ON p.brand_id = b.id
      JOIN categories c ON p.category_id = c.id
      ORDER BY RANDOM()
      LIMIT $1
    `

    const result = await executeQuery(query, [limit])

    return result.map((row: any) => ({
      id: row.id,
      name: row.name,
      description: row.description,
      brandId: row.brand_id,
      brandName: row.brand_name,
      categoryId: row.category_id,
      categoryName: row.category_name,
      price: Number.parseFloat(row.price),
      imageUrl: row.image_url,
    }))
  } catch (error) {
    console.error("Error getting featured products:", error)
    return []
  }
}

// Get product by ID with sizes
export async function getProductById(id: number): Promise<ProductDetail | null> {
  try {
    const productQuery = `
      SELECT 
        p.id, 
        p.name, 
        p.description, 
        p.brand_id, 
        b.name as brand_name, 
        p.category_id, 
        c.name as category_name, 
        p.price, 
        p.image_url
      FROM products p
      JOIN brands b ON p.brand_id = b.id
      JOIN categories c ON p.category_id = c.id
      WHERE p.id = $1
    `

    const productResult = await executeQuery(productQuery, [id])

    if (!productResult || productResult.length === 0) {
      return null
    }

    const product = productResult[0]

    // Get sizes for the product
    const sizesQuery = `
      SELECT size, stock
      FROM product_sizes
      WHERE product_id = $1
      ORDER BY size
    `

    const sizesResult = await executeQuery(sizesQuery, [id])

    const sizes: ProductSize[] = sizesResult.map((row: any) => ({
      size: row.size,
      stock: row.stock,
    }))

    return {
      id: product.id,
      name: product.name,
      description: product.description,
      brandId: product.brand_id,
      brandName: product.brand_name,
      categoryId: product.category_id,
      categoryName: product.category_name,
      price: Number.parseFloat(product.price),
      imageUrl: product.image_url,
      sizes,
    }
  } catch (error) {
    console.error("Error getting product by ID:", error)
    return null
  }
}

// Get all brands
export async function getBrands(): Promise<Brand[]> {
  try {
    const result = await executeQuery("SELECT id, name, logo_url FROM brands ORDER BY name")

    return result.map((row: any) => ({
      id: row.id,
      name: row.name,
      logoUrl: row.logo_url,
    }))
  } catch (error) {
    console.error("Error getting brands:", error)
    return []
  }
}

// Get all categories
export async function getCategories(): Promise<Category[]> {
  try {
    const result = await executeQuery("SELECT id, name FROM categories ORDER BY name")

    return result.map((row: any) => ({
      id: row.id,
      name: row.name,
    }))
  } catch (error) {
    console.error("Error getting categories:", error)
    return []
  }
}

