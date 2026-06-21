"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/shop/ProductCard";

interface Product {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  price: string | null;
  stockStatus: string;
  featured: boolean;
  images: string[];
  category: { id: string; name: string; slug: string };
}

interface Props {
  products: Product[];
}

export default function FeaturedProducts({ products }: Props) {
  return (
    <section className="py-24 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between mb-14"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#888] mb-3">
              Featured Selection
            </p>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-black">
              Handpicked for you
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden md:flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#888] hover:text-black transition-colors border-b border-transparent hover:border-black pb-0.5"
          >
            All Products <ArrowRight className="h-3 w-3" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {products.slice(0, 8).map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#888] hover:text-black transition-colors border-b border-transparent hover:border-black pb-0.5"
          >
            View All Products <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </section>
  );
}
