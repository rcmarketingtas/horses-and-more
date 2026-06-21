"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { Mail, Phone, Package } from "lucide-react";

type EnquiryStatus = "NEW" | "CONTACTED" | "CLOSED";

interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  status: string;
  createdAt: string;
  product: { id: string; name: string; slug: string } | null;
}

const STATUS_OPTIONS: EnquiryStatus[] = ["NEW", "CONTACTED", "CLOSED"];

function statusStyle(status: string) {
  switch (status) {
    case "NEW":
      return "bg-black text-white";
    case "CONTACTED":
      return "bg-[#e5e5e5] text-black";
    default:
      return "bg-[#f5f5f5] text-[#888]";
  }
}

export default function EnquiriesClient({
  enquiries: initial,
}: {
  enquiries: Enquiry[];
}) {
  const [enquiries, setEnquiries] = useState(initial);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selected, setSelected] = useState<Enquiry | null>(null);

  const filtered =
    filterStatus === "all"
      ? enquiries
      : enquiries.filter((e) => e.status === filterStatus);

  async function updateStatus(id: string, status: EnquiryStatus) {
    try {
      const res = await fetch("/api/admin/enquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (!res.ok) throw new Error();
      setEnquiries((prev) =>
        prev.map((e) => (e.id === id ? { ...e, status } : e))
      );
      if (selected?.id === id) setSelected((s) => s && { ...s, status });
      toast({ title: "Status updated", variant: "success" });
    } catch {
      toast({ title: "Failed to update status", variant: "error" });
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Enquiries</h1>
        <div className="flex gap-2">
          {["all", ...STATUS_OPTIONS].map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={cn(
                "text-xs font-semibold uppercase tracking-wider px-3 py-1.5 border transition-colors",
                filterStatus === s
                  ? "bg-black text-white border-black"
                  : "border-[#e5e5e5] text-[#888] hover:border-black hover:text-black"
              )}
            >
              {s === "all" ? "All" : s}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
        {/* List */}
        <div className="bg-white border border-[#e5e5e5]">
          {filtered.length === 0 ? (
            <p className="p-8 text-sm text-[#888] text-center">
              No enquiries found.
            </p>
          ) : (
            filtered.map((e) => (
              <div
                key={e.id}
                onClick={() => setSelected(e)}
                className={cn(
                  "flex items-start justify-between p-5 border-b border-[#f5f5f5] last:border-b-0 cursor-pointer transition-colors",
                  selected?.id === e.id
                    ? "bg-[#fafafa]"
                    : "hover:bg-[#fafafa]"
                )}
              >
                <div className="flex-1 min-w-0 mr-4">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-semibold text-black truncate">
                      {e.name}
                    </p>
                    <span
                      className={`flex-shrink-0 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 ${statusStyle(e.status)}`}
                    >
                      {e.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#888] truncate">{e.email}</p>
                  {e.product && (
                    <p className="text-xs text-[#888] truncate flex items-center gap-1 mt-0.5">
                      <Package className="h-3 w-3" /> {e.product.name}
                    </p>
                  )}
                  <p className="text-xs text-[#aaa] mt-1 line-clamp-1">
                    {e.message}
                  </p>
                </div>
                <p className="text-[11px] text-[#aaa] flex-shrink-0">
                  {new Date(e.createdAt).toLocaleDateString("en-AU")}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Detail pane */}
        {selected ? (
          <div className="bg-white border border-[#e5e5e5] p-6 self-start sticky top-20">
            <div className="flex items-start justify-between mb-5">
              <div>
                <h2 className="font-semibold text-lg">{selected.name}</h2>
                <p className="text-xs text-[#888]">
                  {new Date(selected.createdAt).toLocaleString("en-AU")}
                </p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="text-[#888] hover:text-black text-xs"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 mb-6 text-sm">
              <a
                href={`mailto:${selected.email}`}
                className="flex items-center gap-2 text-black hover:underline"
              >
                <Mail className="h-4 w-4 text-[#888]" />
                {selected.email}
              </a>
              {selected.phone && (
                <a
                  href={`tel:${selected.phone}`}
                  className="flex items-center gap-2 text-black hover:underline"
                >
                  <Phone className="h-4 w-4 text-[#888]" />
                  {selected.phone}
                </a>
              )}
              {selected.product && (
                <p className="flex items-center gap-2 text-black">
                  <Package className="h-4 w-4 text-[#888]" />
                  {selected.product.name}
                </p>
              )}
            </div>

            <div className="bg-[#fafafa] border border-[#e5e5e5] p-4 mb-6 rounded-none">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#888] mb-2">
                Message
              </p>
              <p className="text-sm text-black leading-relaxed whitespace-pre-wrap">
                {selected.message}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#888] mb-3">
                Update Status
              </p>
              <div className="flex gap-2">
                {STATUS_OPTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => updateStatus(selected.id, s)}
                    className={cn(
                      "flex-1 text-[10px] font-bold uppercase tracking-wider py-2 border transition-colors",
                      selected.status === s
                        ? "bg-black text-white border-black"
                        : "border-[#e5e5e5] text-[#888] hover:border-black hover:text-black"
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="hidden lg:flex bg-white border border-[#e5e5e5] items-center justify-center text-[#888] text-sm">
            Select an enquiry to view details
          </div>
        )}
      </div>
    </div>
  );
}
