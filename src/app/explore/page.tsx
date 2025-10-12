"use client";

import Filters from "@/components/Filters";
import PropertyCard from "@/components/PropertyCard";
import Pagination from "@/components/Pagination";
import { useProperties } from "@/hooks/useProperties";

export default function ExplorePropertiesPage() {
  const {
    properties,
    loading,
    page,
    setPage,
    totalPages,
    filters,
    updateFilter,
    resetFilters,
  } = useProperties();

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800 text-center">
          Search Properties
        </h1>
        <Filters
          filters={filters}
          updateFilter={updateFilter}
          resetFilters={resetFilters}
        />
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading properties...</p>
      ) : (
        <>
          <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {properties.length > 0 ? (
              properties.map((p) => <PropertyCard key={p.id} property={p} />)
            ) : (
              <p className="text-center col-span-full text-gray-500">
                No properties found.
              </p>
            )}
          </section>

          <Pagination page={page} totalPages={totalPages} setPage={setPage} />
        </>
      )}
    </div>
  );
}
