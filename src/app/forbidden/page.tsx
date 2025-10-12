"use client";

import Link from "next/link";

export default function ForbiddenPage() {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold text-red-600 mb-4">403 Forbidden</h1>
      <p className="text-gray-600 mb-6">
        You don’t have permission to access this page.
      </p>
      <Link
        href="/"
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Go back Home
      </Link>
    </div>
  );
}
