"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    category: "Ordering & Enquiries",
    items: [
      {
        q: "How do I buy something from your store?",
        a: "We don't have an online checkout — this is intentional. We believe the best equestrian purchases are made with guidance, not a quick click. Simply click 'Enquire Now' on any product page (or use the Contact form), tell us what you're after, and one of our team will get back to you with availability, sizing help, and a quote if needed. We can take payment over the phone, by bank transfer, or in person at our Camden store.",
      },
      {
        q: "How quickly will you respond to my enquiry?",
        a: "We reply to all enquiries within one business day — usually much sooner. If you're enquiring on a weekday during business hours (Mon–Fri 9am–5pm AEST), you can often expect a response within a few hours.",
      },
      {
        q: "Can I visit the store without an appointment?",
        a: "Absolutely. Our Camden, NSW store is open Monday to Saturday, 9am–5pm (Saturday to 4pm). No appointment is needed, but if you're making a specific trip to try saddles or have a detailed fitting, it's worth calling ahead so we can set aside the right time.",
      },
      {
        q: "Do you offer phone consultations?",
        a: "Yes. Call us on (02) 9876 5432 during business hours and one of our team will be happy to discuss your requirements in detail.",
      },
    ],
  },
  {
    category: "Products & Stock",
    items: [
      {
        q: "What does 'Made to Order' mean?",
        a: "Some items — particularly custom saddles, show rugs, and monogrammed apparel — are made to your specifications by our suppliers. Lead times vary and are listed on each product page. Enquire first and we'll give you a current ETA.",
      },
      {
        q: "Do your prices include GST?",
        a: "Yes. All prices displayed are inclusive of Australian GST.",
      },
      {
        q: "What does 'POA' (Price on Application) mean?",
        a: "Some products — particularly custom-made items or those with variable pricing based on specifications — are listed as POA. Enquire and we'll provide a detailed quote based on your requirements.",
      },
      {
        q: "Can you source products not listed on your website?",
        a: "Very possibly. We have strong relationships with suppliers in Europe, the UK, and Australia. If you're after something specific that you can't find on our site, send us an enquiry describing what you need and we'll do our best to source it.",
      },
    ],
  },
  {
    category: "Delivery & Returns",
    items: [
      {
        q: "Do you deliver?",
        a: "Yes. We deliver Australia-wide and can arrange international shipping for selected items. Delivery costs and timeframes are confirmed at the time of enquiry. We use insured, tracked shipping for all orders.",
      },
      {
        q: "What is your returns policy?",
        a: "We accept returns on most items within 30 days of delivery, provided they are unused and in original condition. Custom-made items (made-to-order saddles, custom rugs, etc.) cannot be returned unless faulty. Contact us to initiate a return.",
      },
      {
        q: "What happens if my item arrives damaged?",
        a: "Please photograph any damage and contact us within 48 hours of delivery. We'll arrange a replacement or refund promptly. All shipments are insured.",
      },
    ],
  },
  {
    category: "Sizing & Advice",
    items: [
      {
        q: "How do I know if a saddle will fit my horse?",
        a: "Saddle fit is critical and depends on your horse's back shape, wither height and width, and your riding discipline. We recommend enquiring with your horse's measurements or, ideally, arranging an in-store fitting. Our tack specialists can also advise remotely based on tracings or photos.",
      },
      {
        q: "How do I measure my horse for a rug?",
        a: "Horse rug sizes are measured from the centre of the chest, over the shoulder and along the body to the tail. Measure in centimetres and convert to the standard feet sizing (a 150cm horse typically suits a 5'0\" rug). When in doubt, size up — a slightly large rug is better than one that's too tight.",
      },
      {
        q: "How do I choose the right bit for my horse?",
        a: "Bit selection depends on your horse's mouth conformation, sensitivity, level of training, and your discipline. Our team can advise based on your riding style and goals. If in doubt, start mild — a simple loose ring snaffle with a gentle mouthpiece is a safe starting point for most horses.",
      },
    ],
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#e5e5e5]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 py-5 text-left group"
        aria-expanded={open}
      >
        <span className="text-[15px] font-medium text-black group-hover:opacity-70 transition-opacity leading-snug">
          {q}
        </span>
        <span className="flex-shrink-0 mt-0.5">
          {open ? (
            <Minus className="h-4 w-4 text-[#888]" />
          ) : (
            <Plus className="h-4 w-4 text-[#888]" />
          )}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="text-[15px] text-[#444] leading-relaxed pb-5 pr-8">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQClient() {
  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Header */}
      <div className="bg-[#0a0a0a] text-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#555] mb-3">
            Help Centre
          </p>
          <h1 className="text-5xl md:text-6xl font-light tracking-tight">
            Frequently Asked
            <br />
            Questions
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-14">
          {/* Sidebar nav */}
          <div className="hidden lg:block">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#888] mb-4">
              Categories
            </p>
            <ul className="space-y-2">
              {faqs.map((section) => (
                <li key={section.category}>
                  <a
                    href={`#${section.category.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-sm text-[#444] hover:text-black transition-colors"
                  >
                    {section.category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* FAQ content */}
          <div className="space-y-16">
            {faqs.map((section, i) => (
              <motion.section
                key={section.category}
                id={section.category.toLowerCase().replace(/\s+/g, "-")}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <h2 className="text-xs font-semibold uppercase tracking-widest text-[#888] mb-6">
                  {section.category}
                </h2>
                <div>
                  {section.items.map((item) => (
                    <FAQItem key={item.q} {...item} />
                  ))}
                </div>
              </motion.section>
            ))}

            {/* CTA */}
            <div className="border border-[#e5e5e5] p-8 text-center">
              <p className="text-lg font-light mb-2">Still have questions?</p>
              <p className="text-sm text-[#888] mb-6">
                Our team is happy to help — just get in touch.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-black border-b border-black pb-0.5 hover:gap-3 transition-all"
              >
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
