"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import EnquiryForm from "@/components/enquiry/EnquiryForm";

const contactInfo = [
  {
    icon: Phone,
    label: "Phone",
    value: "(02) 9876 5432",
    href: "tel:+61298765432",
    sub: "Mon–Sat 9am–5pm AEST",
  },
  {
    icon: Mail,
    label: "Email",
    value: "hello@horsesandmore.com.au",
    href: "mailto:hello@horsesandmore.com.au",
    sub: "Replies within 1 business day",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "42 Paddock Lane, Camden NSW 2570",
    href: "https://maps.google.com/?q=Camden+NSW",
    sub: "Free onsite parking",
  },
];

const hours = [
  { day: "Monday – Friday", hours: "9:00am – 5:00pm" },
  { day: "Saturday", hours: "9:00am – 4:00pm" },
  { day: "Sunday", hours: "Closed" },
  { day: "Public Holidays", hours: "Closed" },
];

export default function ContactClient() {
  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Header */}
      <div className="bg-[#0a0a0a] text-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-semibold uppercase tracking-[0.25em] text-[#555] mb-3"
          >
            Reach Out
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-light tracking-tight"
          >
            Contact
          </motion.h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left — info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-light tracking-tight mb-2">
                We'd love to hear from you
              </h2>
              <p className="text-[15px] text-[#444] leading-relaxed mb-10">
                Whether you have a question about a product, need advice on what
                to buy, or want to visit the store — get in touch and one of our
                team will be in touch promptly.
              </p>
            </motion.div>

            {/* Contact cards */}
            <div className="space-y-0 border border-[#e5e5e5] mb-10">
              {contactInfo.map((item, i) => (
                <motion.a
                  key={i}
                  href={item.href}
                  target={item.icon === MapPin ? "_blank" : undefined}
                  rel={item.icon === MapPin ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="group flex items-center gap-5 p-6 hover:bg-black transition-colors border-b border-[#e5e5e5] last:border-b-0"
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
                </motion.a>
              ))}
            </div>

            {/* Hours */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="border border-[#e5e5e5] p-6"
            >
              <div className="flex items-center gap-3 mb-5">
                <Clock className="h-4 w-4 text-[#888]" />
                <p className="text-xs font-semibold uppercase tracking-widest text-[#888]">
                  Trading Hours
                </p>
              </div>
              <table className="w-full text-sm">
                <tbody>
                  {hours.map((h) => (
                    <tr key={h.day} className="border-b border-[#f0f0f0] last:border-b-0">
                      <td className="py-2.5 font-medium text-black">{h.day}</td>
                      <td className="py-2.5 text-right text-[#444]">
                        {h.hours}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </div>

          {/* Right — enquiry form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="border border-[#e5e5e5] p-8">
              <h2 className="text-xl font-light tracking-tight mb-2">
                Send an Enquiry
              </h2>
              <p className="text-sm text-[#888] mb-8">
                Fill in the form below. We reply within one business day.
              </p>
              <EnquiryForm />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Map placeholder */}
      <div
        className="w-full h-64 bg-[#0a0a0a] flex items-center justify-center"
        id="map"
        aria-label="Store location map"
      >
        <div className="text-center">
          <MapPin className="h-8 w-8 text-white/20 mx-auto mb-3" />
          <p className="text-white/30 text-sm">42 Paddock Lane, Camden NSW 2570</p>
          <a
            href="https://maps.google.com/?q=Camden+NSW"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-white/20 hover:text-white/50 transition-colors mt-2 inline-block underline"
          >
            Open in Google Maps
          </a>
        </div>
      </div>
    </div>
  );
}
