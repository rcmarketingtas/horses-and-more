"use client";

import { useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/shop/ProductCard";
import { cn } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  price: string | null;
  stockStatus: string;
  featured: boolean;
  images: string[];
  category: { id: string; name: string; slug: string };
}

interface Props {
  products: Product[];
  categories: Category[];
  initialSearch: string;
  initialCategory: string;
  initialSort: string;
}

const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "name", label: "Name A–Z" },
  { value: "price-asc", label: "Price: Low–High" },
  { value: "price-desc", label: "Price: High–Low" },
];

export default function ShopClient({
  products,
  categories,
  initialSearch,
  initialCategory,
  initialSort,
}: Props) {
  const router = useRouter();
  const [search, setSearch] = useState(initialSearch);
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [sort, setSort] = useState(initialSort);
  const [filterOpen, setFilterOpen] = useState(false);

  function updateURL(
    s: string = search,
    cat: string = activeCategory,
    so: string = sort
  ) {
    const params = new URLSearchParams();
    if (s) params.set("search", s);
    if (cat) params.set("category", cat);
    if (so && so !== "newest") params.set("sort", so);
    router.push(`/shop?${params.toString()}`, { scroll: false });
  }

  function handleCategoryClick(slug: string) {
    const next = slug === activeCategory ? "" : slug;
    setActiveCategory(next);
    updateURL(search, next, sort);
  }

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    updateURL(search, activeCategory, sort);
  }

  function handleSort(value: string) {
    setSort(value);
    updateURL(search, activeCategory, value);
  }

  function clearFilters() {
    setSearch("");
    setActiveCategory("");
    setSort("newest");
    router.push("/shop");
  }

  const hasFilters = !!(search || activeCategory || sort !== "newest");
  const displayedProducts = products; // filtering already done server-side

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Header */}
      <div className="bg-[#0a0a0a] text-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#555] mb-3">
            All Products
          </p>
          <h1 className="text-5xl md:text-6xl font-light tracking-tight">
            Shop
          </h1>
          <p className="text-[#555] mt-3 text-sm">
            {displayedProducts.length} product{displayedProducts.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Filters bar */}
      <div className="sticky top-16 z-30 bg-white border-b border-[#e5e5e5]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-3">
          <div className="flex items-center gap-4">
            {/* Search */}
            <form onSubmit={handleSearchSubmit} className="flex-1 max-w-xs">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#888]" />
                <Input
                  placeholder="Search products…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 h-9 text-sm"
                />
              </div>
            </form>

            {/* Filter toggle mobile */}
            <Button
              variant="outline"
              size="sm"
              className="md:hidden"
              onClick={() => setFilterOpen(!filterOpen)}
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              Filters
            </Button>

            {/* Sort desktop */}
            <div className="hidden md:flex items-center gap-2 ml-auto">
              <span className="text-xs text-[#888] uppercase tracking-wider">
                Sort:
              </span>
              {SORT_OPTIONS.map((o) => (
                <button
                  key={o.value}
                  onClick={() => handleSort(o.value)}
                  className={cn(
                    "text-xs font-medium px-3 py-1.5 transition-colors uppercase tracking-wider",
                    sort === o.value
                      ? "bg-black text-white"
                      : "text-[#888] hover:text-black"
                  )}
                >
                  {o.label}
                </button>
              ))}
            </div>

            {hasFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 text-xs text-[#888] hover:text-black transition-colors"
              >
                <X className="h-3 w-3" /> Clear
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        <div className="flex gap-10">
          {/* Sidebar — categories */}
          <aside className="hidden md:block w-52 flex-shrink-0">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#888] mb-4">
              Categories
            </p>
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => handleCategoryClick("")}
                  className={cn(
                    "w-full text-left text-sm py-1.5 pl-3 border-l-2 transition-colors",
                    !activeCategory
                      ? "border-black text-black font-semibold"
                      : "border-transparent text-[#888] hover:text-black hover:border-[#e5e5e5]"
                  )}
                >
                  All Products
                </button>
              </li>
              {categories.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => handleCategoryClick(cat.slug)}
                    className={cn(
                      "w-full text-left text-sm py-1.5 pl-3 border-l-2 transition-colors",
                      activeCategory === cat.slug
                        ? "border-black text-black font-semibold"
                        : "border-transparent text-[#888] hover:text-black hover:border-[#e5e5e5]"
                    )}
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {/* Mobile category filter */}
          {filterOpen && (
            <div className="md:hidden fixed inset-0 bg-white z-50 p-6 flex flex-col gap-4 overflow-auto">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Filters</h2>
                <button onClick={() => setFilterOpen(false)}>
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#888] mb-3">
                  Category
                </p>
                {[{ name: "All Products", slug: "" }, ...categories].map(
                  (cat) => (
                    <button
                      key={cat.slug}
                      onClick={() => {
                        handleCategoryClick(cat.slug);
                        setFilterOpen(false);
                      }}
                      className={cn(
                        "block w-full text-left py-2.5 text-sm border-b border-[#f0f0f0]",
                        activeCategory === cat.slug && "font-semibold"
                      )}
                    >
                      {cat.name}
                    </button>
                  )
                )}
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#888] mb-3">
                  Sort
                </p>
                {SORT_OPTIONS.map((o) => (
                  <button
                    key={o.value}
                    onClick={() => {
                      handleSort(o.value);
                      setFilterOpen(false);
                    }}
                    className={cn(
                      "block w-full text-left py-2.5 text-sm border-b border-[#f0f0f0]",
                      sort === o.value && "font-semibold"
                    )}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Product grid */}
          <div className="flex-1">
            {displayedProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-4xl mb-4">—</p>
                <h3 className="text-xl font-light mb-2">No products found</h3>
                <p className="text-sm text-[#888] mb-6">
                  Try adjusting your search or filters.
                </p>
                <Button variant="outline" onClick={clearFilters}>
                  Clear filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {displayedProducts.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
