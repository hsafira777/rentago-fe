"use client";

import Link from "next/link";
import useAuthStore from "@/store/useAuthStore";

export default function Navbar() {
  const { user, clearAuth } = useAuthStore();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo / Brand */}
        <h1 className="text-2xl font-bold text-blue-600">Rentago</h1>

        {/* Menu */}
        <div className="flex items-center space-x-6">
          <ul className="flex space-x-6">
            <li>
              <Link href="/" className="hover:text-blue-600 transition">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/explore"
                className="hover:text-blue-600 transition"
              >
                Properties
              </Link>
            </li>
          </ul>

          {/* Auth Section */}
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="font-medium">Hi, {user.name}</span>

              {/* Tenant Create Property Button */}
              {user.role === "TENANT" && (
                <Link
                  href="/properties/create"
                  className="bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700 transition text-white"
                >
                  Create Property
                </Link>
              )}

              {/* Dashboard Button */}
              <Link
                href="/dashboard"
                className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition text-white"
              >
                Dashboard
              </Link>

              <button
                onClick={clearAuth}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/auth/login"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
