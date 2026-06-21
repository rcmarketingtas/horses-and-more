import { getCategories, getProducts } from "@/lib/data";
import HeroSection from "@/components/home/HeroSection";
import CategoriesGrid from "@/components/home/CategoriesGrid";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import StorySection from "@/components/home/StorySection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import EnquiryCTA from "@/components/home/EnquiryCTA";

export default function HomePage() {
  const categories = getCategories().slice(0, 6);
  const featuredProducts = getProducts({ featuredOnly: true, limit: 8 });

  return (
    <>
      <HeroSection />
      <CategoriesGrid categories={categories} />
      <FeaturedProducts products={featuredProducts} />
      <StorySection />
      <TestimonialsSection />
      <EnquiryCTA />
    </>
  );
}
