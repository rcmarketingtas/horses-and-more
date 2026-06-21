import Link from "next/link";
import { Share2, Globe, Mail } from "lucide-react";

const footerLinks = {
  Shop: [
    { label: "All Products", href: "/shop" },
    { label: "Tack", href: "/shop/category/tack" },
    { label: "Rugs & Blankets", href: "/shop/category/rugs-blankets" },
    { label: "Feed & Supplements", href: "/shop/category/feed-supplements" },
    { label: "Grooming", href: "/shop/category/grooming" },
    { label: "Apparel", href: "/shop/category/apparel" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "FAQ", href: "/faq" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-auto">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <p className="text-xl font-semibold tracking-[0.15em] uppercase mb-4">
              Horses & More
            </p>
            <p className="text-sm text-[#888] leading-relaxed max-w-xs">
              Premium equestrian supplies for horse owners who demand the best.
              Australian owned and operated since 2008.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-[#333] flex items-center justify-center hover:border-white hover:text-white transition-colors text-[#888]"
                aria-label="Instagram / Social"
              >
                <Share2 className="h-4 w-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-[#333] flex items-center justify-center hover:border-white hover:text-white transition-colors text-[#888]"
                aria-label="Facebook / Web"
              >
                <Globe className="h-4 w-4" />
              </a>
              <a
                href="mailto:hello@horsesandmore.com.au"
                className="w-9 h-9 border border-[#333] flex items-center justify-center hover:border-white hover:text-white transition-colors text-[#888]"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#888] mb-5">
                {section}
              </p>
              <ul className="space-y-3">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-white/70 hover:text-white transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-[#222] pt-8 flex flex-col sm:flex-row justify-between gap-4">
          <p className="text-xs text-[#555]">
            © {new Date().getFullYear()} Horses and More. All rights reserved.
          </p>
          <p className="text-xs text-[#555]">
            Enquiries only — no online checkout. Call us on{" "}
            <a
              href="tel:+61298765432"
              className="text-[#888] hover:text-white transition-colors"
            >
              (02) 9876 5432
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
