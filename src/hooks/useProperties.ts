"use client";

import { useState, useCallback, useEffect } from "react";

const LIMIT = 9;

export function useProperties() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Filters
  const [filters, setFilters] = useState({
    search: "",
    city: "",
    province: "",
    category: "",
    minPrice: "",
    maxPrice: "",
    capacity: "",
    sortBy: "name_asc",
  });

  const updateFilter = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    try {
      const url = new URL("http://localhost:8080/api/properties/filter");
      url.searchParams.append("page", page.toString());
      url.searchParams.append("limit", LIMIT.toString());

      Object.entries(filters).forEach(([key, value]) => {
        if (value) url.searchParams.append(key, value.toString());
      });

      const res = await fetch(url.toString());
      const data = await res.json();

      setProperties(data.properties || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error("❌ Failed to fetch properties:", err);
    } finally {
      setLoading(false);
    }
  }, [page, filters]);

  useEffect(() => {
    fetchProperties();
  }, [page, filters, fetchProperties]);

  const resetFilters = () => {
    setFilters({
      search: "",
      city: "",
      province: "",
      category: "",
      minPrice: "",
      maxPrice: "",
      capacity: "",
      sortBy: "name_asc",
    });
    setPage(1);
  };

  return {
    properties,
    loading,
    page,
    setPage,
    totalPages,
    filters,
    updateFilter,
    fetchProperties,
    resetFilters,
  };
}
