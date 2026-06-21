"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const values = [
  {
    title: "Quality Over Quantity",
    description:
      "We stock fewer lines than the big chains and know every product deeply. Every item we carry has been tested by a rider on our team.",
  },
  {
    title: "Expert Advice",
    description:
      "Every enquiry is answered by a genuine equestrian, not a call centre. We're here to help you find the right product, not just any product.",
  },
  {
    title: "Australian Owned",
    description:
      "We've been based in Camden, NSW since 2008. Our team understands Australian conditions, seasons, and the practical realities of keeping horses here.",
  },
  {
    title: "Honest Pricing",
    description:
      "We don't inflate prices to inflate apparent discounts. You'll always see our real, honest pricing — with a clear 'POA' where custom pricing is needed.",
  },
];

const team = [
  {
    name: "Margaret Sullivan",
    role: "Founder & Managing Director",
    bio: "A lifelong horsewoman with 35 years in the saddle across dressage, showjumping, and eventing. Margaret founded Horses & More after growing frustrated with the lack of premium, genuine equestrian retail in Australia.",
  },
  {
    name: "Tom Sullivan",
    role: "Operations & Stable Equipment",
    bio: "A cattle station veteran with 20 years of practical horse management experience. Tom oversees our stable equipment and feed range.",
  },
  {
    name: "Claire Devereaux",
    role: "Tack & Apparel Specialist",
    bio: "A former provincial dressage champion, Claire curates our tack and apparel range with an exacting standard. If it doesn't pass her test, it doesn't make the catalogue.",
  },
  {
    name: "Ryan Mitchell",
    role: "Health & Nutrition Advisor",
    bio: "A qualified equine nutritionist with a background in sports science, Ryan guides our feed and supplement range and handles the more technical customer enquiries.",
  },
];

export default function AboutClient() {
  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero */}
      <div className="bg-[#0a0a0a] text-white py-28 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold uppercase tracking-[0.25em] text-[#555] mb-4"
          >
            Our Story
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-light tracking-tight mb-8 leading-[1.05]"
          >
            Built by riders,
            <br />
            <span className="font-bold italic">for riders.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[#555] max-w-xl mx-auto text-[15px] leading-relaxed"
          >
            We started because we couldn't find what we needed. Fifteen years
            later, thousands of Australian equestrians trust us to help them
            find it.
          </motion.p>
        </div>
      </div>

      {/* Story */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-8">
                How it started
              </h2>
              <div className="space-y-5 text-[15px] text-[#444] leading-relaxed">
                <p>
                  In 2008, Margaret Sullivan was preparing her mare for the
                  Sydney Royal. She needed a specific close-contact saddle from
                  a maker she trusted from her years competing in Ireland. It
                  wasn't available in Australia. At all.
                </p>
                <p>
                  That frustration — shared by so many competitive equestrians —
                  was the seed of Horses & More. With a background in retail
                  management and a lifetime of riding, Margaret opened our first
                  store in Camden, NSW, with a simple promise: stock only the
                  best, know it inside out, and give real advice.
                </p>
                <p>
                  Fifteen years on, we carry over 500 products from the finest
                  makers in Europe, the UK, and Australia. Our team rides — most
                  of us compete — and every product in our catalogue has been
                  genuinely tested by someone on our team.
                </p>
                <p>
                  We don't do online checkout. We believe the best tack
                  purchase is one made with guidance, and we'd rather take ten
                  minutes to answer your enquiry properly than process a sale
                  that leaves you with the wrong product.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-6"
            >
              {/* Stats */}
              <div className="grid grid-cols-2 gap-px bg-[#e5e5e5]">
                {[
                  { number: "2008", label: "Year founded" },
                  { number: "500+", label: "Products" },
                  { number: "8,000+", label: "Customers served" },
                  { number: "15+", label: "Years of expertise" },
                ].map((s) => (
                  <div key={s.label} className="bg-white p-8">
                    <p className="text-4xl font-bold text-black mb-1">
                      {s.number}
                    </p>
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#888]">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Quote */}
              <div className="border border-[#e5e5e5] p-8">
                <p className="text-lg font-light italic text-[#444] leading-relaxed mb-4">
                  "The best piece of tack is the one that fits your horse
                  perfectly and suits your riding style. We're here to help you
                  find that piece — not just make a sale."
                </p>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#888]">
                  Margaret Sullivan, Founder
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-[#fafafa] px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#888] mb-3">
              What we stand for
            </p>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight">
              Our values
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#e5e5e5]">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-[#fafafa] p-10"
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-[#888] mb-3">
                  0{i + 1}
                </p>
                <h3 className="text-xl font-semibold text-black mb-3">
                  {v.title}
                </h3>
                <p className="text-[15px] text-[#444] leading-relaxed">
                  {v.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#888] mb-3">
              The people behind it
            </p>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight">
              Our team
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                {/* Avatar placeholder */}
                <div className="aspect-square bg-[#0a0a0a] mb-5 flex items-center justify-center">
                  <span className="text-4xl font-bold text-white/10">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <h3 className="font-semibold text-black mb-1">{member.name}</h3>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#888] mb-3">
                  {member.role}
                </p>
                <p className="text-sm text-[#444] leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0a0a0a] px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto"
        >
          <h2 className="text-3xl font-light text-white mb-4">
            Have a question?
          </h2>
          <p className="text-[#555] mb-8 text-[15px]">
            Our team is happy to help — whether you're looking for the right
            saddle, the best rug for your climate, or anything in between.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              asChild
              className="bg-white text-black border-white hover:bg-transparent hover:text-white hover:border-white"
            >
              <Link href="/contact">
                Get in Touch <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="text-white border-white/20 hover:bg-white/10"
            >
              <Link href="/shop">Browse Products</Link>
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
