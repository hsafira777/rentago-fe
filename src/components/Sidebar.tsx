"use client";

import { Home, Building2, Calendar, Users } from "lucide-react";
import Link from "next/link";

export function Sidebar() {
  return (
    <aside className="bg-white border-r shadow-sm w-64 p-4 hidden md:block">
      <h2 className="text-xl font-bold mb-6">Rentago</h2>
      <nav className="space-y-4">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
        >
          <Home className="h-5 w-5" /> Dashboard
        </Link>
        <Link
          href="/dashboard/properties"
          className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
        >
          <Building2 className="h-5 w-5" /> Properties
        </Link>
        <Link
          href="/dashboard/events"
          className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
        >
          <Calendar className="h-5 w-5" /> Events
        </Link>
        <Link
          href="/dashboard/users"
          className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
        >
          <Users className="h-5 w-5" /> Users
        </Link>
      </nav>
    </aside>
  );
}
