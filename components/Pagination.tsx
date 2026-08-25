'use client';

import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {
  currentPage: number;
  totalPages: number;
};

function Pagination({ currentPage, totalPages }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (page <= 1) {
      params.delete("page");
    } else {
      params.set("page", String(page));
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-4 mt-12">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-lg border border-[#D8CFC0] bg-white text-[#1F1B16] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#3D5A44] hover:text-white transition"
      >
        Prev
      </button>

      <span className="text-sm text-[#6B6152]">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-lg border border-[#D8CFC0] bg-white text-[#1F1B16] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#3D5A44] hover:text-white transition"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination