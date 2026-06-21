"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import EnquiryModal from "@/components/enquiry/EnquiryModal";
import { cn } from "@/lib/utils";

const PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='800'%3E%3Crect width='800' height='800' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='16' fill='%23888'%3EProduct Image%3C/text%3E%3C/svg%3E";

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: string | null;
  stockStatus: string;
  featured: boolean;
  images: string[];
  specs: Record<string, string> | null;
  category: { id: string; name: string; slug: string };
}

interface Props {
  product: Product;
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

export default function ProductDetailClient({ product }: Props) {
  const images = product.images.length > 0 ? product.images : [PLACEHOLDER];
  const [activeImg, setActiveImg] = useState(0);

  function prev() {
    setActiveImg((i) => (i === 0 ? images.length - 1 : i - 1));
  }
  function next() {
    setActiveImg((i) => (i === images.length - 1 ? 0 : i + 1));
  }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#888] mb-10">
        <Link href="/shop" className="hover:text-black transition-colors flex items-center gap-1">
          <ArrowLeft className="h-3 w-3" /> Shop
        </Link>
        <span>/</span>
        <Link
          href={`/shop/category/${product.category.slug}`}
          className="hover:text-black transition-colors"
        >
          {product.category.name}
        </Link>
        <span>/</span>
        <span className="text-black truncate max-w-[200px]">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 xl:gap-20">
        {/* Image gallery */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Main image */}
          <div className="relative aspect-square bg-[#f5f5f5] overflow-hidden mb-3">
            <Image
              src={images[activeImg] ?? PLACEHOLDER}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = PLACEHOLDER;
              }}
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 hover:bg-white flex items-center justify-center transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={next}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 hover:bg-white flex items-center justify-center transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-2">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={cn(
                    "relative w-20 h-20 bg-[#f5f5f5] overflow-hidden flex-shrink-0 border-2 transition-colors",
                    activeImg === i ? "border-black" : "border-transparent hover:border-[#e5e5e5]"
                  )}
                  aria-label={`View image ${i + 1}`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Product info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Link
              href={`/shop/category/${product.category.slug}`}
              className="text-xs font-semibold uppercase tracking-widest text-[#888] hover:text-black transition-colors"
            >
              {product.category.name}
            </Link>
            {product.featured && (
              <Badge variant="default" className="text-[9px]">
                Featured
              </Badge>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-light tracking-tight text-black mb-4 leading-[1.15]">
            {product.name}
          </h1>

          <p className="text-[15px] text-[#444] leading-relaxed mb-6">
            {product.shortDescription}
          </p>

          {/* Price + Stock */}
          <div className="flex items-center gap-4 mb-8 pb-8 border-b border-[#e5e5e5]">
            <span className="text-3xl font-semibold text-black">
              {product.price ?? "POA"}
            </span>
            <Badge
              variant={
                product.stockStatus === "IN_STOCK"
                  ? "default"
                  : product.stockStatus === "MADE_TO_ORDER"
                    ? "outline"
                    : "muted"
              }
            >
              {stockLabel(product.stockStatus)}
            </Badge>
          </div>

          {/* Enquire CTA */}
          <div className="mb-10">
            <EnquiryModal
              productId={product.id}
              productName={product.name}
              triggerLabel="Enquire About This Product"
              triggerVariant="default"
              triggerSize="lg"
            />
            <p className="text-xs text-[#888] mt-3">
              We reply within one business day. No commitment required.
            </p>
          </div>

          {/* Full description */}
          <div className="mb-10">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-[#888] mb-4">
              Description
            </h2>
            <p className="text-[15px] text-[#444] leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Specs table */}
          {product.specs && Object.keys(product.specs).length > 0 && (
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-[#888] mb-4">
                Specifications
              </h2>
              <table className="w-full text-sm">
                <tbody>
                  {Object.entries(product.specs).map(([key, value]) => (
                    <tr key={key} className="border-b border-[#f0f0f0]">
                      <td className="py-2.5 pr-6 font-medium text-black w-2/5">
                        {key}
                      </td>
                      <td className="py-2.5 text-[#444]">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
