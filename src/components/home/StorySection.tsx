"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function StorySection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — decorative number + image placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-[4/5] bg-[#0a0a0a] relative overflow-hidden">
              {/* Textured placeholder */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
                  backgroundSize: "10px 10px",
                }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
                <span className="text-[8rem] font-bold text-white/5 leading-none select-none">
                  15+
                </span>
                <p className="text-white/40 text-sm font-medium uppercase tracking-widest mt-4">
                  Years of Excellence
                </p>
              </div>
              {/* Year badge */}
              <div className="absolute bottom-6 right-6 border border-white/20 p-4 text-center">
                <p className="text-xs font-semibold uppercase tracking-widest text-white/50">
                  Est.
                </p>
                <p className="text-2xl font-bold text-white">2008</p>
              </div>
            </div>
          </motion.div>

          {/* Right — copy */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#888] mb-4">
              Our Story
            </p>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-black mb-8 leading-[1.1]">
              Built by riders,
              <br />
              <span className="font-bold">for riders.</span>
            </h2>
            <div className="space-y-5 text-[#444] leading-relaxed text-[15px]">
              <p>
                Horses & More was founded in 2008 by a family of passionate
                equestrians who were frustrated by the lack of truly premium
                supplies available in Australia. We set out to change that —
                sourcing only from the best makers in Europe, the UK, and
                locally, and testing everything ourselves in the saddle.
              </p>
              <p>
                Today we carry over 500 products across tack, rugs, feed,
                grooming, stable equipment, apparel, and health supplies — all
                curated with a single standard: would we use it with our own
                horses?
              </p>
              <p>
                Every enquiry is answered personally. We believe the best
                product for your horse depends on the individual, and we're here
                to help you find exactly that.
              </p>
            </div>

            <div className="mt-10 flex items-center gap-8">
              <div className="border-l-2 border-black pl-5">
                <p className="text-3xl font-bold text-black">500+</p>
                <p className="text-xs text-[#888] uppercase tracking-wider mt-1">
                  Products
                </p>
              </div>
              <div className="border-l-2 border-[#e5e5e5] pl-5">
                <p className="text-3xl font-bold text-black">8,000+</p>
                <p className="text-xs text-[#888] uppercase tracking-wider mt-1">
                  Happy customers
                </p>
              </div>
              <div className="border-l-2 border-[#e5e5e5] pl-5">
                <p className="text-3xl font-bold text-black">15+</p>
                <p className="text-xs text-[#888] uppercase tracking-wider mt-1">
                  Years trading
                </p>
              </div>
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 mt-10 text-xs font-semibold uppercase tracking-widest text-black border-b border-black pb-0.5 hover:gap-3 transition-all"
            >
              Our full story <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
