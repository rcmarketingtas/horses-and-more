import { prisma } from "@/lib/prisma";
import AdminProductsClient from "./AdminProductsClient";

export default async function AdminProductsPage() {
  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      include: { category: { select: { id: true, name: true } } },
      orderBy: { createdAt: "desc" },
    }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  const serialised = products.map((p) => ({
    ...p,
    images: JSON.parse(p.images) as string[],
    specs: p.specs ? (JSON.parse(p.specs) as Record<string, string>) : null,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  }));

  return <AdminProductsClient products={serialised} categories={categories} />;
}
