import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/toaster";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Horses and More — Premium Equestrian Supplies",
    template: "%s | Horses and More",
  },
  description:
    "Premium horse supplies, tack, rugs, feed, grooming and equestrian apparel. Australian owned. Enquire online or visit our store.",
  keywords: [
    "horse supplies",
    "equestrian tack",
    "horse rugs",
    "riding equipment",
    "horse grooming",
    "equestrian Australia",
  ],
  openGraph: {
    title: "Horses and More — Premium Equestrian Supplies",
    description:
      "Premium horse supplies and equestrian tack. Australian owned and operated.",
    type: "website",
    locale: "en_AU",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geist.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased bg-white text-black">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
