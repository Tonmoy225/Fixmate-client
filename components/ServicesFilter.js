"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import { categories, serviceModes } from "@/lib/constants";

export default function ServicesFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL-এর একটা param বদলে নতুন URL-এ যাওয়া
  const updateParam = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete("page"); // filter বদলালে প্রথম page থেকে শুরু
    router.push(`/services?${params.toString()}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const value = new FormData(e.target).get("search").trim();
    updateParam("search", value);
  };

  const hasFilters =
    searchParams.get("search") ||
    searchParams.get("category") ||
    searchParams.get("serviceMode") ||
    searchParams.get("sort");

  return (
    <div className="mb-10 rounded-2xl bg-white p-5 shadow-md">
      {/* Search bar */}
      <form onSubmit={handleSearch} className="flex gap-3">
        <input
          key={searchParams.get("search") || ""}
          type="text"
          name="search"
          defaultValue={searchParams.get("search") || ""}
          placeholder="Search by title or category..."
          className="input input-bordered w-full"
        />
        <button type="submit" className="btn btn-fixmate">
          <FaSearch />
          <span className="hidden sm:inline">Search</span>
        </button>
      </form>

      {/* Filters + sort */}
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <select
          value={searchParams.get("category") || ""}
          onChange={(e) => updateParam("category", e.target.value)}
          className="select select-bordered w-full"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select
          value={searchParams.get("serviceMode") || ""}
          onChange={(e) => updateParam("serviceMode", e.target.value)}
          className="select select-bordered w-full"
        >
          <option value="">All Service Modes</option>
          {serviceModes.map((mode) => (
            <option key={mode} value={mode}>
              {mode}
            </option>
          ))}
        </select>

        <select
          value={searchParams.get("sort") || ""}
          onChange={(e) => updateParam("sort", e.target.value)}
          className="select select-bordered w-full"
        >
          <option value="">Sort: Newest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>

        <button
          onClick={() => router.push("/services")}
          disabled={!hasFilters}
          className="btn btn-outline"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
}