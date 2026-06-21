import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the Horses and More team. Send an enquiry, call us, or visit our store in Camden, NSW.",
};

export default function ContactPage() {
  return <ContactClient />;
}
