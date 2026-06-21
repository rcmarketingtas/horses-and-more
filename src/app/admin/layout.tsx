import AdminNav from "./AdminNav";

export const metadata = { title: "Admin Dashboard | Horses and More" };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col">
      <AdminNav />
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 lg:px-8 py-10">
        {children}
      </main>
    </div>
  );
}
