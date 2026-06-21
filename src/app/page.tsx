import { prisma } from "@/lib/prisma";
import HeroSection from "@/components/home/HeroSection";
import CategoriesGrid from "@/components/home/CategoriesGrid";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import StorySection from "@/components/home/StorySection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import EnquiryCTA from "@/components/home/EnquiryCTA";

async function getData() {
  const [categories, featuredProducts] = await Promise.all([
    prisma.category.findMany({ take: 6, orderBy: { name: "asc" } }),
    prisma.product.findMany({
      where: { featured: true },
      include: { category: true },
      take: 8,
      orderBy: { createdAt: "desc" },
    }),
  ]);
  return { categories, featuredProducts };
}

export default async function HomePage() {
  const { categories, featuredProducts } = await getData();

  const productsWithImages = featuredProducts.map((p) => ({
    ...p,
    images: JSON.parse(p.images) as string[],
    specs: p.specs ? JSON.parse(p.specs) : null,
  }));

  return (
    <>
      <HeroSection />
      <CategoriesGrid categories={categories} />
      <FeaturedProducts products={productsWithImages} />
      <StorySection />
      <TestimonialsSection />
      <EnquiryCTA />
    </>
  );
}
