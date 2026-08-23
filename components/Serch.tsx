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
    <div>
      <input
        type="text"
        placeholder="search.."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}

export default Serch; // 👈 this was missing
