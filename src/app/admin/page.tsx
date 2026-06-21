import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowRight, MessageSquare, Package, TrendingUp } from "lucide-react";

export default async function AdminDashboard() {
  const [enquiryCount, newEnquiryCount, productCount] = await Promise.all([
    prisma.enquiry.count(),
    prisma.enquiry.count({ where: { status: "NEW" } }),
    prisma.product.count(),
  ]);

  const recentEnquiries = await prisma.enquiry.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: { product: { select: { name: true } } },
  });

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-8">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-white border border-[#e5e5e5] p-6">
          <div className="flex items-center justify-between mb-3">
            <MessageSquare className="h-5 w-5 text-[#888]" />
            {newEnquiryCount > 0 && (
              <span className="text-xs font-bold bg-black text-white px-2 py-0.5">
                {newEnquiryCount} new
              </span>
            )}
          </div>
          <p className="text-3xl font-bold text-black">{enquiryCount}</p>
          <p className="text-xs text-[#888] uppercase tracking-wider mt-1">
            Total Enquiries
          </p>
        </div>
        <div className="bg-white border border-[#e5e5e5] p-6">
          <Package className="h-5 w-5 text-[#888] mb-3" />
          <p className="text-3xl font-bold text-black">{productCount}</p>
          <p className="text-xs text-[#888] uppercase tracking-wider mt-1">
            Products
          </p>
        </div>
        <div className="bg-white border border-[#e5e5e5] p-6">
          <TrendingUp className="h-5 w-5 text-[#888] mb-3" />
          <p className="text-3xl font-bold text-black">{newEnquiryCount}</p>
          <p className="text-xs text-[#888] uppercase tracking-wider mt-1">
            Pending Response
          </p>
        </div>
      </div>

      {/* Recent enquiries */}
      <div className="bg-white border border-[#e5e5e5]">
        <div className="flex items-center justify-between p-6 border-b border-[#e5e5e5]">
          <h2 className="font-semibold text-sm uppercase tracking-widest">
            Recent Enquiries
          </h2>
          <Link
            href="/admin/enquiries"
            className="text-xs text-[#888] hover:text-black flex items-center gap-1 transition-colors"
          >
            View all <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div>
          {recentEnquiries.length === 0 ? (
            <p className="p-6 text-sm text-[#888]">No enquiries yet.</p>
          ) : (
            recentEnquiries.map((e) => (
              <div
                key={e.id}
                className="flex items-center justify-between p-5 border-b border-[#f5f5f5] last:border-b-0 hover:bg-[#fafafa] transition-colors"
              >
                <div>
                  <p className="text-sm font-medium text-black">{e.name}</p>
                  <p className="text-xs text-[#888] mt-0.5">
                    {e.email}
                    {e.product ? ` — ${e.product.name}` : ""}
                  </p>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 ${
                      e.status === "NEW"
                        ? "bg-black text-white"
                        : e.status === "CONTACTED"
                          ? "bg-[#e5e5e5] text-black"
                          : "bg-[#f5f5f5] text-[#888]"
                    }`}
                  >
                    {e.status}
                  </span>
                  <p className="text-[11px] text-[#888] mt-1">
                    {new Date(e.createdAt).toLocaleDateString("en-AU")}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
