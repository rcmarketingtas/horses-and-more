import { Info } from "lucide-react";

export default function AdminEnquiriesPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-2">Enquiries</h1>
      <p className="text-sm text-[#888] mb-8">
        Enquiries submitted via the site are emailed directly to the store owner.
      </p>

      <div className="flex items-start gap-3 bg-[#fafafa] border border-[#e5e5e5] p-6 text-sm text-[#444]">
        <Info className="h-4 w-4 text-[#888] mt-0.5 flex-shrink-0" />
        <div>
          <p className="font-semibold text-black mb-2">Prototype mode — no database connected</p>
          <p className="leading-relaxed">
            When a customer submits an enquiry on the site, it is emailed immediately to the
            address set in the <code className="text-xs bg-[#f0f0f0] px-1.5 py-0.5">STORE_OWNER_EMAIL</code> environment variable.
            To connect a database and store enquiries for review here, set up a PostgreSQL
            database (e.g. Neon or Supabase) and update the <code className="text-xs bg-[#f0f0f0] px-1.5 py-0.5">DATABASE_URL</code> environment variable in Vercel.
          </p>
        </div>
      </div>
    </div>
  );
}
