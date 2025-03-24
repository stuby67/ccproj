"use client"

import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2 } from "lucide-react"
import type { CartItem } from "@/lib/cart"

interface CartItemProps {
  item: CartItem
  onUpdateQuantity: (id: number, quantity: number) => void
  onRemove: (id: number) => void
}

export function CartItemRow({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center py-4 border-b border-neon-green/30">
      <div className="flex-shrink-0 relative w-24 h-24 rounded-md overflow-hidden">
        <Image
          src={item.imageUrl || `/placeholder.svg?height=96&width=96&text=${encodeURIComponent(item.productName)}`}
          alt={item.productName}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex-1 ml-0 sm:ml-4 mt-2 sm:mt-0">
        <Link href={`/products/${item.productId}`} className="text-neon-green hover:underline font-semibold">
          {item.productName}
        </Link>
        <p className="text-gray-400 text-sm">{item.brandName}</p>
        <p className="text-white text-sm">Size: {item.size}</p>
        <p className="text-white font-bold mt-1">${item.price.toFixed(2)}</p>
      </div>

      <div className="flex items-center mt-2 sm:mt-0">
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          className="text-white p-1 hover:text-neon-green transition-colors"
          aria-label="Decrease quantity"
        >
          <Minus size={16} />
        </button>

        <span className="mx-2 w-8 text-center text-white">{item.quantity}</span>

        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          className="text-white p-1 hover:text-neon-green transition-colors"
          aria-label="Increase quantity"
        >
          <Plus size={16} />
        </button>

        <button
          onClick={() => onRemove(item.id)}
          className="ml-4 text-white p-1 hover:text-red-500 transition-colors"
          aria-label="Remove item"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  )
}

