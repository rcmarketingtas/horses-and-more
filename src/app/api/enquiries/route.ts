import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendEnquiryEmail } from "@/lib/email";
import { getProductBySlug } from "@/lib/data";

const enquirySchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10),
  productId: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = enquirySchema.parse(body);

    // Look up product name from static data if a productId was provided
    let productName: string | undefined;
    if (data.productId) {
      const product = getProductBySlug(data.productId);
      productName = product?.name;
    }

    const enquiry = {
      id: `enq_${Date.now()}`,
      name: data.name,
      email: data.email,
      phone: data.phone ?? null,
      message: data.message,
      createdAt: new Date(),
    };

    await sendEnquiryEmail({ enquiry, productName });

    return NextResponse.json({ success: true, id: enquiry.id }, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: err.issues },
        { status: 400 }
      );
    }
    console.error("Enquiry error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
