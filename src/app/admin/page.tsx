import { getProducts, getCategories } from "@/lib/data";
import Link from "next/link";
import { ArrowRight, MessageSquare, Package, Info } from "lucide-react";

export default function AdminDashboard() {
  const products = getProducts();
  const featured = products.filter((p) => p.featured).length;
  const categories = getCategories();

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-2">Dashboard</h1>
      <p className="text-sm text-[#888] mb-8">
        Prototype mode — enquiries are emailed to the store owner. No database connected.
      </p>

      {/* Info banner */}
      <div className="flex items-start gap-3 bg-[#fafafa] border border-[#e5e5e5] p-5 mb-8 text-sm text-[#444]">
        <Info className="h-4 w-4 text-[#888] mt-0.5 flex-shrink-0" />
        <p>
          This is a prototype site. Product data is stored in static JSON files at{" "}
          <code className="text-xs bg-[#f0f0f0] px-1.5 py-0.5">src/data/products.json</code>.
          To add or edit products, update that file and redeploy. Enquiries are emailed
          to the store owner address set in the <code className="text-xs bg-[#f0f0f0] px-1.5 py-0.5">STORE_OWNER_EMAIL</code> environment variable.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-white border border-[#e5e5e5] p-6">
          <Package className="h-5 w-5 text-[#888] mb-3" />
          <p className="text-3xl font-bold text-black">{products.length}</p>
          <p className="text-xs text-[#888] uppercase tracking-wider mt-1">Total Products</p>
        </div>
        <div className="bg-white border border-[#e5e5e5] p-6">
          <Package className="h-5 w-5 text-[#888] mb-3" />
          <p className="text-3xl font-bold text-black">{categories.length}</p>
          <p className="text-xs text-[#888] uppercase tracking-wider mt-1">Categories</p>
        </div>
        <div className="bg-white border border-[#e5e5e5] p-6">
          <MessageSquare className="h-5 w-5 text-[#888] mb-3" />
          <p className="text-3xl font-bold text-black">{featured}</p>
          <p className="text-xs text-[#888] uppercase tracking-wider mt-1">Featured Products</p>
        </div>
      </div>

      {/* Quick links */}
      <div className="bg-white border border-[#e5e5e5]">
        <div className="p-6 border-b border-[#e5e5e5]">
          <h2 className="font-semibold text-sm uppercase tracking-widest">Quick Links</h2>
        </div>
        {[
          { label: "View all products", href: "/admin/products" },
          { label: "Browse shop (live)", href: "/shop" },
          { label: "Contact page", href: "/contact" },
        ].map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="flex items-center justify-between p-5 border-b border-[#f5f5f5] last:border-b-0 hover:bg-[#fafafa] transition-colors text-sm"
          >
            {l.label}
            <ArrowRight className="h-4 w-4 text-[#888]" />
          </Link>
        ))}
      </div>
    </div>
  );
}
