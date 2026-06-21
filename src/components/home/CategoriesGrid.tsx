"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
}

interface Props {
  categories: Category[];
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function CategoriesGrid({ categories }: Props) {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#888] mb-3">
            Browse by Category
          </p>
          <h2 className="text-4xl md:text-5xl font-light tracking-tight text-black">
            Everything your horse needs
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#e5e5e5]"
        >
          {categories.map((cat) => (
            <motion.div key={cat.id} variants={itemVariants}>
              <Link
                href={`/shop/category/${cat.slug}`}
                className="group block bg-white p-8 hover:bg-black transition-colors duration-300 min-h-[200px] flex flex-col justify-between"
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#888] group-hover:text-white/50 transition-colors mb-3">
                    Category
                  </p>
                  <h3 className="text-2xl font-light text-black group-hover:text-white transition-colors mb-3">
                    {cat.name}
                  </h3>
                  {cat.description && (
                    <p className="text-sm text-[#888] group-hover:text-white/60 transition-colors leading-relaxed line-clamp-2">
                      {cat.description}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-black group-hover:text-white transition-colors">
                    Shop Now
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 text-black group-hover:text-white transition-all group-hover:translate-x-1" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-center"
        >
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#888] hover:text-black transition-colors border-b border-transparent hover:border-black pb-0.5"
          >
            View all products <ArrowRight className="h-3 w-3" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
