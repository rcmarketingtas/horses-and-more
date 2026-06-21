import { prisma } from "@/lib/prisma";
import EnquiriesClient from "./EnquiriesClient";

export default async function AdminEnquiriesPage() {
  const enquiries = await prisma.enquiry.findMany({
    include: { product: { select: { id: true, name: true, slug: true } } },
    orderBy: { createdAt: "desc" },
  });

  const serialised = enquiries.map((e) => ({
    ...e,
    createdAt: e.createdAt.toISOString(),
    updatedAt: e.updatedAt.toISOString(),
  }));

  return <EnquiriesClient enquiries={serialised} />;
}
