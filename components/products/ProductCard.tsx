import Image from "next/image"
import { Product } from "@/lib/data"
import Link from "next/link"

type Props = {
  product: Product
}

function ProductCard({ product }: Props) {
  return (
    <Link href={`/books/${product.slug}`}>
    <div className="bg-white border-l-4 border-[#3D5A44] rounded-r-lg shadow-sm hover:shadow-md transition-shadow flex flex-col overflow-hidden">
      <div className="relative w-full h-48 bg-[#EFE9DE]">
        <Image
          src={product.img}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h2 className="font-serif text-lg text-[#1F1B16] mb-1">{product.name}</h2>
        <p className="text-sm text-[#6B6152] mb-4 flex-grow line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between text-sm pt-3 border-t border-[#EFE9DE]">
          <span className="font-medium text-[#1F1B16]">${product.price}</span>
          <span className="text-xs uppercase tracking-wide text-[#3D5A44] bg-[#3D5A44]/10 px-2 py-1 rounded">
            {product.category}
          </span>
        </div>
      </div>
    </div>
    </Link>
  )
}

export default ProductCard