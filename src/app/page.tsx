import { getCategories } from "@/lib/data";
import HeroSection from "@/components/home/HeroSection";
import CategoriesGrid from "@/components/home/CategoriesGrid";
import StorySection from "@/components/home/StorySection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import EnquiryCTA from "@/components/home/EnquiryCTA";

export default function HomePage() {
  const categories = getCategories().slice(0, 6);

  return (
    <>
      <HeroSection />
      <CategoriesGrid categories={categories} />
      <StorySection />
      <TestimonialsSection />
      <EnquiryCTA />
    </>
  );
}
