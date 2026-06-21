import type { Metadata } from "next";
import { getCategories, getProducts } from "@/lib/data";
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

  const categories = getCategories();
  const products = getProducts({
    categorySlug: category,
    search,
    sort,
  });

  return (
    <ShopClient
      products={products}
      categories={categories}
      initialSearch={search ?? ""}
      initialCategory={category ?? ""}
      initialSort={sort ?? "newest"}
    />
  );
}
