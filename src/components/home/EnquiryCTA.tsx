"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react";

export default function EnquiryCTA() {
  return (
    <section className="py-24 bg-white border-t border-[#e5e5e5]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#888] mb-4">
              Get in Touch
            </p>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-black mb-6 leading-[1.1]">
              Not sure what
              <br />
              <span className="font-bold">you need?</span>
            </h2>
            <p className="text-[15px] text-[#444] leading-relaxed mb-10 max-w-md">
              Our team of experienced equestrians is here to help you find the
              right product for your horse, discipline, and budget. Send us an
              enquiry and we'll get back to you within one business day.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg">
                <Link href="/contact">
                  Send an Enquiry <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/shop">Browse Products</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="space-y-0 border border-[#e5e5e5]"
          >
            {[
              {
                icon: Phone,
                label: "Phone",
                value: "(02) 9876 5432",
                sub: "Mon–Sat 9am–5pm AEST",
                href: "tel:+61298765432",
              },
              {
                icon: Mail,
                label: "Email",
                value: "hello@horsesandmore.com.au",
                sub: "We reply within 1 business day",
                href: "mailto:hello@horsesandmore.com.au",
              },
              {
                icon: MapPin,
                label: "Visit us",
                value: "42 Paddock Lane, Camden NSW 2570",
                sub: "Open Mon–Sat 9am–5pm",
                href: "#map",
              },
            ].map((item, i) => (
              <a
                key={i}
                href={item.href}
                className="group flex items-center gap-6 p-7 hover:bg-black transition-colors border-b border-[#e5e5e5] last:border-b-0"
              >
                <div className="w-10 h-10 border border-[#e5e5e5] group-hover:border-white/20 flex items-center justify-center flex-shrink-0 transition-colors">
                  <item.icon className="h-4 w-4 text-[#888] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-[#888] group-hover:text-white/50 transition-colors mb-0.5">
                    {item.label}
                  </p>
                  <p className="text-sm font-medium text-black group-hover:text-white transition-colors">
                    {item.value}
                  </p>
                  <p className="text-xs text-[#888] group-hover:text-white/50 transition-colors mt-0.5">
                    {item.sub}
                  </p>
                </div>
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
