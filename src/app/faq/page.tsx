import type { Metadata } from "next";
import FAQClient from "./FAQClient";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about shopping at Horses and More — enquiries, delivery, product advice, returns and more.",
};

export default function FAQPage() {
  return <FAQClient />;
}
