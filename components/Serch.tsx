'use client';

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function Serch() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [search, setSearch] = useState(searchParams.get("search") || "");

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const timer = setTimeout(() => {
      if (!search.trim()) {
        params.delete("search");
      } else {
        params.set("search", search);
      }
      router.push(`${pathname}?${params.toString()}`);
    }, 500); // Debounce the search input by 500ms

    return () => clearTimeout(timer); // Cleanup the timer on unmount or when search changes
  }, [search]);

  return (
  
  <div className="w-full max-w-md">
    <input
      type="text"
      placeholder="Search by title..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full px-4 py-3 rounded-lg border border-[#D8CFC0] bg-white text-[#1F1B16] placeholder:text-[#9C9284] focus:outline-none focus:ring-2 focus:ring-[#3D5A44] focus:border-transparent transition"
    />
  </div>
);
  
}

export default Serch; // 👈 this was missing
