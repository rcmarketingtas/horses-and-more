import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "The story behind Horses and More — a family-owned equestrian store built by riders, for riders. Australian owned since 2008.",
};

export default function AboutPage() {
  return <AboutClient />;
}
