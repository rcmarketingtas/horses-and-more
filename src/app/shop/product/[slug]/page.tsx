import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import ProductDetailClient from "./ProductDetailClient";
import ProductCard from "@/components/shop/ProductCard";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
    select: { name: true, shortDescription: true },
  });
  if (!product) return {};
  return {
    title: product.name,
    description: product.shortDescription,
  };
}

export async function generateStaticParams() {
  const products = await prisma.product.findMany({ select: { slug: true } });
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  });

  if (!product) notFound();

  const related = await prisma.product.findMany({
    where: {
      categoryId: product.categoryId,
      id: { not: product.id },
    },
    include: { category: true },
    take: 4,
    orderBy: { createdAt: "desc" },
  });

  const serialised = {
    ...product,
    images: JSON.parse(product.images) as string[],
    specs: product.specs ? (JSON.parse(product.specs) as Record<string, string>) : null,
    createdAt: product.createdAt.toISOString(),
    updatedAt: product.updatedAt.toISOString(),
  };

  const relatedSerialised = related.map((p) => ({
    ...p,
    images: JSON.parse(p.images) as string[],
    specs: p.specs ? (JSON.parse(p.specs) as Record<string, string>) : null,
  }));

  return (
    <div className="min-h-screen bg-white pt-16">
      <ProductDetailClient product={serialised} />

      {/* Related products */}
      {relatedSerialised.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 border-t border-[#e5e5e5]">
          <h2 className="text-2xl font-light tracking-tight mb-10">
            More from{" "}
            <span className="font-semibold">{product.category.name}</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {relatedSerialised.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
