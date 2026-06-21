import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import ShopClient from "./ShopClient";

export const metadata: Metadata = {
  title: "Shop All Products",
  description:
    "Browse our full range of premium horse supplies, tack, rugs, feed, grooming, apparel and more at Horses and More.",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string; sort?: string }>;
}) {
  const params = await searchParams;
  const { category, search, sort } = params;

  const [categories, products] = await Promise.all([
    prisma.category.findMany({ orderBy: { name: "asc" } }),
    prisma.product.findMany({
      where: {
        ...(category ? { category: { slug: category } } : {}),
        ...(search
          ? {
              OR: [
                { name: { contains: search } },
                { shortDescription: { contains: search } },
                { description: { contains: search } },
              ],
            }
          : {}),
      },
      include: { category: true },
      orderBy:
        sort === "price-asc"
          ? { price: "asc" }
          : sort === "price-desc"
            ? { price: "desc" }
            : sort === "name"
              ? { name: "asc" }
              : { createdAt: "desc" },
    }),
  ]);

  const serialisedProducts = products.map((p) => ({
    ...p,
    images: JSON.parse(p.images) as string[],
    specs: p.specs ? (JSON.parse(p.specs) as Record<string, string>) : null,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  }));

  return (
    <ShopClient
      products={serialisedProducts}
      categories={categories.map((c) => ({
        ...c,
        createdAt: c.createdAt.toISOString(),
        updatedAt: c.updatedAt.toISOString(),
      }))}
      initialSearch={search ?? ""}
      initialCategory={category ?? ""}
      initialSort={sort ?? "newest"}
    />
  );
}
