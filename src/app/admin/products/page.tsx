import { getProducts, getCategories } from "@/lib/data";
import Link from "next/link";
import { ExternalLink, Info } from "lucide-react";

export default function AdminProductsPage() {
  const products = getProducts();
  const categories = getCategories();

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-2">Products</h1>
      <p className="text-sm text-[#888] mb-6">
        {products.length} products across {categories.length} categories
      </p>

      <div className="flex items-start gap-3 bg-[#fafafa] border border-[#e5e5e5] p-5 mb-6 text-sm text-[#444]">
        <Info className="h-4 w-4 text-[#888] mt-0.5 flex-shrink-0" />
        <p>
          Prototype mode — products are defined in{" "}
          <code className="text-xs bg-[#f0f0f0] px-1.5 py-0.5">src/data/products.json</code>.
          Edit that file and push to GitHub to update products.
        </p>
      </div>

      <div className="bg-white border border-[#e5e5e5] overflow-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#e5e5e5] text-left">
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#888]">Product</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#888] hidden md:table-cell">Category</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#888] hidden sm:table-cell">Price</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#888] hidden lg:table-cell">Stock</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#888]">Featured</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#888]">View</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-[#f5f5f5] last:border-b-0 hover:bg-[#fafafa] transition-colors">
                <td className="px-4 py-3.5">
                  <p className="font-medium text-black">{p.name}</p>
                  <p className="text-xs text-[#888] mt-0.5 hidden sm:block">{p.slug}</p>
                </td>
                <td className="px-4 py-3.5 hidden md:table-cell text-[#444]">{p.category.name}</td>
                <td className="px-4 py-3.5 hidden sm:table-cell font-medium">{p.price ?? "POA"}</td>
                <td className="px-4 py-3.5 hidden lg:table-cell">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 ${
                    p.stockStatus === "IN_STOCK" ? "bg-black text-white" :
                    p.stockStatus === "MADE_TO_ORDER" ? "bg-[#e5e5e5] text-black" :
                    "bg-[#f5f5f5] text-[#888]"
                  }`}>
                    {p.stockStatus === "IN_STOCK" ? "In Stock" : p.stockStatus === "MADE_TO_ORDER" ? "Made to Order" : "Out of Stock"}
                  </span>
                </td>
                <td className="px-4 py-3.5 text-center">
                  {p.featured ? <span className="text-black font-bold">★</span> : <span className="text-[#ddd]">★</span>}
                </td>
                <td className="px-4 py-3.5">
                  <Link
                    href={`/shop/product/${p.slug}`}
                    target="_blank"
                    className="text-[#888] hover:text-black transition-colors"
                    title="View on site"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
