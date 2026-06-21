import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCategoryBySlug, getCategorySlugs, getProducts } from "@/lib/data";
import ProductCard from "@/components/shop/ProductCard";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};
  return {
    title: `${category.name} — Shop`,
    description: `Browse ${category.name} products at Horses and More.`,
  };
}

export function generateStaticParams() {
  return getCategorySlugs().map((slug) => ({ slug }));
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const products = getProducts({ categorySlug: slug });

  return (
    <div className="min-h-screen bg-white pt-16">
      <div className="bg-[#0a0a0a] text-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#555] hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="h-3 w-3" /> Back to Shop
          </Link>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#555] mb-3">
            Category
          </p>
          <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-4">
            {category!.name}
          </h1>
          {category!.description && (
            <p className="text-[#555] max-w-xl text-sm leading-relaxed">
              {category!.description}
            </p>
          )}
          <p className="text-[#555] mt-3 text-sm">
            {products.length} product{products.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
        {products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl font-light mb-4">
              No products in this category yet.
            </p>
            <Link href="/shop" className="text-sm underline underline-offset-4">
              Browse all products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
