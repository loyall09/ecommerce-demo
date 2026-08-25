import Category from "@/components/Category";
import PriceFilter from "@/components/PriceFilter";
import Serch from "@/components/Serch";
import Pagination from "@/components/Pagination";
import { Product, products } from "@/lib/data"
import ProuductList from "@/components/products/ProuductList";

type Props = {
  searchParams: {
    category?: string
    search?: string
    minPrice?: string
    maxPrice?: string
    page?: string
  }
}

const PAGE_SIZE = 8; // books per page

async function page({ searchParams }: Props) {
  const { category, search, minPrice, maxPrice, page: pageParam } = await searchParams;

  const filteredProducts = products.filter((product: Product) => {
    const matchesCategory = !category || category === "ALL" || product.category === category;
    const matchesSearch = !search || product.name.toLowerCase().includes(search.toLowerCase());
    const matchesMinPrice = !minPrice || product.price >= Number(minPrice);
    const matchesMaxPrice = !maxPrice || product.price <= Number(maxPrice);
    return matchesCategory && matchesSearch && matchesMinPrice && matchesMaxPrice;
  });

  const currentPage = Number(pageParam) || 1;
  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + PAGE_SIZE);

  return (
    <main className="min-h-screen bg-[#FAF7F2] px-6 py-12 md:px-16">
      <div className="max-w-6xl mx-auto">

        <header className="mb-10 text-center">
          <h1 className="font-serif text-4xl md:text-5xl text-[#1F1B16] tracking-tight">
            The Reading Room
          </h1>
          <p className="mt-2 text-[#6B6152] text-sm">
            {filteredProducts.length} {filteredProducts.length === 1 ? "book" : "books"} on the shelf
          </p>
        </header>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Serch />
          <Category />
          <PriceFilter />
        </div>

<ProuductList products={paginatedProducts} />
      
            </div>

            <Pagination currentPage={currentPage} totalPages={totalPages} />
          

      
    </main>
  );
}

export default page