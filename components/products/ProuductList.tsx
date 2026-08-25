import { Product } from "@/lib/data"
import ProductCard from "./ProductCard"

type Props = {
    products: Product[]
}

function ProductList({ products }: Props) {
  return (
    <div>
      {products.length === 0 ? (
        <p className="text-center text-[#6B6152] py-20">Nothing in your shelf</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
export default ProductList