"use client";

import { useState, useMemo } from "react";
import debounce from "lodash/debounce";
import {
  ChevronDown,
  ChevronUp,
  Search,
  Building,
  MapPin,
  Home,
} from "lucide-react";

const quickPriceRanges = [
  { label: "Under 100K", min: 0, max: 100000 },
  { label: "100K - 300K", min: 100000, max: 300000 },
  { label: "300K - 500K", min: 300000, max: 500000 },
  { label: "500K - 1M", min: 500000, max: 1000000 },
  { label: "Above 1M", min: 1000000, max: null },
];

export default function Filters({ filters, updateFilter, resetFilters }: any) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const debouncedUpdate = useMemo(
    () =>
      debounce((key: string, value: string) => {
        updateFilter(key, value);
      }, 500),
    [updateFilter]
  );

  return (
    <div className="mt-6 space-y-4 bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-md border border-gray-100 transition">
      {/* Top row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {/* Search */}
        <div className="relative flex items-center">
          <Search
            size={18}
            className="absolute left-3 text-gray-400 pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search Keywords..."
            defaultValue={filters.search}
            onChange={(e) => debouncedUpdate("search", e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        {/* City */}
        <div className="relative flex items-center">
          <Building
            size={18}
            className="absolute left-3 text-gray-400 pointer-events-none"
          />
          <input
            type="text"
            placeholder="City..."
            defaultValue={filters.city}
            onChange={(e) => debouncedUpdate("city", e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        {/* Province */}
        <div className="relative flex items-center">
          <MapPin
            size={18}
            className="absolute left-3 text-gray-400 pointer-events-none"
          />
          <input
            type="text"
            placeholder="Province..."
            defaultValue={filters.province}
            onChange={(e) => debouncedUpdate("province", e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        {/* Category */}
        <div className="relative flex items-center">
          <Home
            size={18}
            className="absolute left-3 text-gray-400 pointer-events-none"
          />
          <select
            value={filters.category}
            onChange={(e) => updateFilter("category", e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition"
          >
            <option value="">All Categories</option>
            <option value="Villa">Villa</option>
            <option value="Apartment">Apartment</option>
            <option value="Hotel">Hotel</option>
          </select>
        </div>
      </div>

      {/* Toggle Advanced */}
      <div className="flex justify-between items-center pt-1">
        <button
          type="button"
          onClick={() => setShowAdvanced((prev) => !prev)}
          className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition"
        >
          {showAdvanced ? (
            <>
              Hide Advanced Filters <ChevronUp size={16} />
            </>
          ) : (
            <>
              Show Advanced Filters <ChevronDown size={16} />
            </>
          )}
        </button>
      </div>

      {/* Advanced Filters */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          showAdvanced ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mt-4 space-y-5">
          {/* Quick Price */}
          <div className="flex flex-wrap gap-2">
            {quickPriceRanges.map((range) => {
              const active =
                filters.minPrice === range.min.toString() &&
                filters.maxPrice === (range.max?.toString() || "");
              return (
                <button
                  key={range.label}
                  onClick={() => {
                    updateFilter("minPrice", range.min.toString());
                    updateFilter(
                      "maxPrice",
                      range.max ? range.max.toString() : ""
                    );
                  }}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium border transition ${
                    active
                      ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                      : "bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {range.label}
                </button>
              );
            })}
          </div>

          {/* Min / Max Price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="Min Price (IDR)"
              value={filters.minPrice}
              onChange={(e) => updateFilter("minPrice", e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <input
              type="number"
              placeholder="Max Price (IDR)"
              value={filters.maxPrice}
              onChange={(e) => updateFilter("maxPrice", e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
        </div>
      </div>

      {/* Reset */}
      <div className="flex justify-end mt-4">
        <button
          type="button"
          onClick={resetFilters}
          className="px-5 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-100 text-gray-700 font-medium transition"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}
