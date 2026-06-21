"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ExternalLink, Star, Trash2, ToggleLeft, ToggleRight } from "lucide-react";

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
  category: { id: string; name: string };
  createdAt: string;
}

interface Props {
  products: Product[];
  categories: Category[];
}

function stockLabel(status: string) {
  switch (status) {
    case "OUT_OF_STOCK": return "Out of Stock";
    case "MADE_TO_ORDER": return "Made to Order";
    default: return "In Stock";
  }
}

export default function AdminProductsClient({ products: initial, categories }: Props) {
  const [products, setProducts] = useState(initial);
  const [filterCat, setFilterCat] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = products.filter((p) => {
    const catMatch = filterCat === "all" || p.category.id === filterCat;
    const searchMatch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.shortDescription.toLowerCase().includes(search.toLowerCase());
    return catMatch && searchMatch;
  });

  async function toggleFeatured(id: string, current: boolean) {
    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: !current }),
      });
      if (!res.ok) throw new Error();
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, featured: !current } : p))
      );
    } catch {
      toast({ title: "Failed to update", variant: "error" });
    }
  }

  async function deleteProduct(id: string, name: string) {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setProducts((prev) => prev.filter((p) => p.id !== id));
      toast({ title: "Product deleted", variant: "success" });
    } catch {
      toast({ title: "Failed to delete", variant: "error" });
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Products</h1>
        <span className="text-sm text-[#888]">
          {filtered.length} / {products.length} products
        </span>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <input
          type="text"
          placeholder="Search products…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-[#e5e5e5] px-3 py-2 text-sm focus:border-black focus:outline-none w-full sm:w-64"
        />
        <select
          value={filterCat}
          onChange={(e) => setFilterCat(e.target.value)}
          className="border border-[#e5e5e5] px-3 py-2 text-sm focus:border-black focus:outline-none bg-white"
        >
          <option value="all">All Categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#e5e5e5] overflow-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#e5e5e5] text-left">
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#888]">
                Product
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#888] hidden md:table-cell">
                Category
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#888] hidden sm:table-cell">
                Price
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#888] hidden lg:table-cell">
                Stock
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#888]">
                Featured
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#888]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr
                key={p.id}
                className="border-b border-[#f5f5f5] last:border-b-0 hover:bg-[#fafafa] transition-colors"
              >
                <td className="px-4 py-3.5">
                  <p className="font-medium text-black">{p.name}</p>
                  <p className="text-xs text-[#888] mt-0.5 hidden sm:block">
                    {p.slug}
                  </p>
                </td>
                <td className="px-4 py-3.5 hidden md:table-cell text-[#444]">
                  {p.category.name}
                </td>
                <td className="px-4 py-3.5 hidden sm:table-cell font-medium">
                  {p.price ?? "POA"}
                </td>
                <td className="px-4 py-3.5 hidden lg:table-cell">
                  <span
                    className={cn(
                      "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5",
                      p.stockStatus === "IN_STOCK"
                        ? "bg-black text-white"
                        : p.stockStatus === "MADE_TO_ORDER"
                          ? "bg-[#e5e5e5] text-black"
                          : "bg-[#f5f5f5] text-[#888]"
                    )}
                  >
                    {stockLabel(p.stockStatus)}
                  </span>
                </td>
                <td className="px-4 py-3.5">
                  <button
                    onClick={() => toggleFeatured(p.id, p.featured)}
                    className="hover:opacity-70 transition-opacity"
                    title={p.featured ? "Remove featured" : "Set as featured"}
                  >
                    {p.featured ? (
                      <ToggleRight className="h-5 w-5 text-black" />
                    ) : (
                      <ToggleLeft className="h-5 w-5 text-[#ccc]" />
                    )}
                  </button>
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/shop/product/${p.slug}`}
                      target="_blank"
                      className="text-[#888] hover:text-black transition-colors"
                      title="View on site"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={() => deleteProduct(p.id, p.name)}
                      className="text-[#ccc] hover:text-black transition-colors"
                      title="Delete product"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="text-center py-10 text-sm text-[#888]">
            No products match your filters.
          </p>
        )}
      </div>
    </div>
  );
}
