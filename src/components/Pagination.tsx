"use client";

export default function Pagination({ page, totalPages, setPage }: any) {
  if (totalPages <= 1) return null;
  return (
    <div className="flex justify-center gap-2 mt-8">
      <button
        onClick={() => setPage((p: number) => Math.max(p - 1, 1))}
        disabled={page === 1}
        className="px-4 py-2 text-sm bg-[#0e5bff] hover:bg-[#1040a8] rounded-md text-white disabled:opacity-50"
      >
        Previous
      </button>
      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i}
          onClick={() => setPage(i + 1)}
          className={`px-4 py-2 text-sm rounded-md ${
            page === i + 1
              ? "bg-black text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          {i + 1}
        </button>
      ))}
      <button
        onClick={() => setPage((p: number) => Math.min(p + 1, totalPages))}
        disabled={page === totalPages}
        className="px-4 py-2 text-sm bg-[#0e5bff] hover:bg-[#1040a8] rounded-md text-white disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
