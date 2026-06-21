"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQ" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-sm border-b border-[#e5e5e5]"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-lg font-semibold tracking-[0.15em] uppercase text-black hover:opacity-70 transition-opacity"
        >
          Horses & More
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={cn(
                  "text-xs font-medium uppercase tracking-widest transition-opacity hover:opacity-60",
                  pathname === l.href || pathname.startsWith(l.href + "/")
                    ? "opacity-100 border-b border-black pb-0.5"
                    : "opacity-80"
                )}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-4">
          <Link
            href="/shop?search="
            className="hidden md:flex items-center justify-center w-9 h-9 hover:bg-black hover:text-white transition-colors border border-transparent hover:border-black"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </Link>

          {/* Mobile toggle */}
          <button
            className="md:hidden flex items-center justify-center w-9 h-9"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-white border-t border-[#e5e5e5] px-6 py-8 flex flex-col gap-6">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium uppercase tracking-widest text-black hover:opacity-60 transition-opacity"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/shop"
            className="text-sm font-medium uppercase tracking-widest text-black hover:opacity-60 transition-opacity"
          >
            Search
          </Link>
        </div>
      )}
    </header>
  );
}
