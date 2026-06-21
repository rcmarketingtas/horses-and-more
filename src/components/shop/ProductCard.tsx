"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  price: string | null;
  stockStatus: string;
  featured: boolean;
  images: string[];
  category: { name: string; slug: string };
}

interface Props {
  product: Product;
  index?: number;
}

const PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='600'%3E%3Crect width='600' height='600' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='14' fill='%23888'%3ENo Image%3C/text%3E%3C/svg%3E";

function stockBadgeVariant(status: string) {
  switch (status) {
    case "OUT_OF_STOCK":
      return "muted";
    case "MADE_TO_ORDER":
      return "outline";
    default:
      return "default";
  }
}

function stockLabel(status: string) {
  switch (status) {
    case "OUT_OF_STOCK":
      return "Out of Stock";
    case "MADE_TO_ORDER":
      return "Made to Order";
    default:
      return "In Stock";
  }
}

export default function ProductCard({ product, index = 0 }: Props) {
  const imageSrc = product.images?.[0] ?? PLACEHOLDER;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="group"
    >
      <Link href={`/shop/product/${product.slug}`} className="block">
        {/* Image */}
        <div className="relative overflow-hidden bg-[#f5f5f5] aspect-square mb-4">
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = PLACEHOLDER;
            }}
          />
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.featured && (
              <Badge variant="default" className="text-[9px]">
                Featured
              </Badge>
            )}
            <Badge
              variant={stockBadgeVariant(product.stockStatus)}
              className={cn(
                "text-[9px]",
                product.stockStatus !== "IN_STOCK" && "bg-white text-black"
              )}
            >
              {stockLabel(product.stockStatus)}
            </Badge>
          </div>

          {/* Quick enquire overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-black text-white text-center py-3 text-xs font-semibold uppercase tracking-widest translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <span className="flex items-center justify-center gap-1.5">
              Enquire Now <ArrowRight className="h-3 w-3" />
            </span>
          </div>
        </div>

        {/* Info */}
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#888] mb-1">
            {product.category.name}
          </p>
          <h3 className="text-base font-medium text-black mb-1.5 leading-snug group-hover:underline underline-offset-2">
            {product.name}
          </h3>
          <p className="text-sm text-[#888] line-clamp-1 mb-2">
            {product.shortDescription}
          </p>
          <p className="text-base font-semibold text-black">
            {product.price ?? "POA"}
          </p>
        </div>
      </Link>
    </motion.article>
  );
}
