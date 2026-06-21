import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getProductBySlug,
  getProductSlugs,
  getRelatedProducts,
} from "@/lib/data";
import ProductDetailClient from "./ProductDetailClient";
import ProductCard from "@/components/shop/ProductCard";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.shortDescription,
  };
}

export function generateStaticParams() {
  return getProductSlugs().map((slug) => ({ slug }));
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product.id, product.categoryId, 4);

  return (
    <div className="min-h-screen bg-white pt-16">
      <ProductDetailClient product={product} />

      {related.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 border-t border-[#e5e5e5]">
          <h2 className="text-2xl font-light tracking-tight mb-10">
            More from{" "}
            <span className="font-semibold">{product.category.name}</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
