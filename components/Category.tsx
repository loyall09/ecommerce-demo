'use client' // fix #4 — needed for hooks + event handlers

import { useRouter, useSearchParams, usePathname } from "next/navigation";

function Category() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname(); // fix #8 — get current path dynamically

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value; // fix #3 — get the selected value
    const params = new URLSearchParams(searchParams.toString()); // fix #1/#2 — mutable copy

    if (category === "ALL") {
      params.delete("category");
    } else {
      params.set("category", category);
    }

    router.push(`${pathname}?${params.toString()}`); // fix #8
  };

  return (
   <select
  onChange={handleChange}
  name="category"
  id="category"
  className="px-4 py-3 rounded-lg border border-[#D8CFC0] bg-white text-[#1F1B16] focus:outline-none focus:ring-2 focus:ring-[#3D5A44] cursor-pointer"
>
  <option value="ALL">All Categories</option>
  <option value="Fiction">Fiction</option>
  <option value="Non-Fiction">Non-Fiction</option>
  <option value="Information">Information</option>
</select>
  );
}

export default Category;