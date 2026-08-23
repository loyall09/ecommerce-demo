import Category from "@/components/Category";
import Serch from "@/components/Serch";
import { Product, products } from "@/lib/data"

type Props = {
  searchParams: {
    category?: string
    search?: string
  }
}

async function page({ searchParams }: Props) {
  const { category, search } = await searchParams;

  const filteredProducts = products.filter((product: Product) => {
    const matchesCategory = !category || category === "ALL" || product.category === category;
    const matchesSearch = !search || product.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const productCard = "grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-3 p-4 border-4 rounded-lg shadow-md"

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Serch />
      <Category />
      <div className={productCard}>
        {filteredProducts.map((product: Product) => (
          <div key={product.id} className="border rounded-lg p-4 shadow-sm">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Category: {product.category}</p>
          </div>
        ))}
      </div>
    </main>
  )
}

export default page