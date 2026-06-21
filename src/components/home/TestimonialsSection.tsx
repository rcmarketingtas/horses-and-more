"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    quote:
      "The saddle I bought is genuinely the best I've ever ridden in. The team were incredibly helpful with sizing — I ended up with exactly the right fit for my warmblood.",
    author: "Sarah M.",
    role: "Dressage rider, Victoria",
  },
  {
    id: 2,
    quote:
      "Ordered the turnout rug on a Thursday, had it by Saturday. Exceptional quality and the customer service was second to none. Won't shop anywhere else.",
    author: "James P.",
    role: "Eventing, NSW",
  },
  {
    id: 3,
    quote:
      "As a professional rider, I'm particular about my tack. Horses & More consistently stocks the brands I trust, and their team actually knows horses. Rare these days.",
    author: "Cleo R.",
    role: "Show jumping professional, QLD",
  },
  {
    id: 4,
    quote:
      "The boots I bought are beautiful and incredibly comfortable from the first wear. Sizing advice was spot-on and delivery was fast. Absolutely love them.",
    author: "Amelia T.",
    role: "Pony club coach, SA",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-[#0a0a0a] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#555] mb-3">
            Testimonials
          </p>
          <h2 className="text-4xl md:text-5xl font-light tracking-tight text-white">
            What our customers say
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#222]">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-[#0a0a0a] p-10"
            >
              <div className="text-5xl font-serif text-white/10 leading-none mb-4 select-none">
                "
              </div>
              <p className="text-white/70 text-[15px] leading-relaxed mb-8 italic">
                {t.quote}
              </p>
              <div className="border-l-2 border-white/20 pl-4">
                <p className="text-white text-sm font-semibold">{t.author}</p>
                <p className="text-[#555] text-xs mt-0.5 uppercase tracking-wider">
                  {t.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
