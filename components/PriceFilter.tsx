'use client';

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react"

function PriceFilter() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const timer = setTimeout(() => {
      if (!minPrice) {
        params.delete("minPrice");
      } else {
        params.set("minPrice", minPrice);
      }
      if (!maxPrice) {
        params.delete("maxPrice");
      } else {
        params.set("maxPrice", maxPrice);
      }
      router.push(`${pathname}?${params.toString()}`);
    }, 500);
    return () => clearTimeout(timer);
  }, [minPrice, maxPrice]);

  return (
    <div className="flex items-center gap-2 px-1 py-1 rounded-lg border border-[#D8CFC0] bg-white">
      <span className="pl-2 text-sm text-[#9C9284]">$</span>
      <input
        type="number"
        placeholder="Min"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        className="w-16 py-2 bg-transparent text-[#1F1B16] placeholder:text-[#9C9284] focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />
      <span className="text-[#D8CFC0]">—</span>
      <span className="text-sm text-[#9C9284]">$</span>
      <input
        type="number"
        placeholder="Max"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        className="w-16 py-2 pr-2 bg-transparent text-[#1F1B16] placeholder:text-[#9C9284] focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />
    </div>
  )
}
export default PriceFilter