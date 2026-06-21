import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { isAdminRequest } from "@/lib/admin-auth";
import { slugify } from "@/lib/utils";

const productSchema = z.object({
  name: z.string().min(2),
  shortDescription: z.string().min(10),
  description: z.string().min(20),
  price: z.string().optional(),
  categoryId: z.string(),
  stockStatus: z.enum(["IN_STOCK", "MADE_TO_ORDER", "OUT_OF_STOCK"]),
  featured: z.boolean().default(false),
  images: z.array(z.string()).default([]),
  specs: z.record(z.string(), z.string()).optional(),
});

export async function GET(req: NextRequest) {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const products = await prisma.product.findMany({
    include: { category: { select: { id: true, name: true } } },
    orderBy: { createdAt: "desc" },
  });

  const serialised = products.map((p) => ({
    ...p,
    images: JSON.parse(p.images),
    specs: p.specs ? JSON.parse(p.specs) : null,
  }));

  return NextResponse.json(serialised);
}

export async function POST(req: NextRequest) {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const data = productSchema.parse(body);
    const slug = slugify(data.name);

    const product = await prisma.product.create({
      data: {
        name: data.name,
        slug,
        shortDescription: data.shortDescription,
        description: data.description,
        price: data.price,
        categoryId: data.categoryId,
        stockStatus: data.stockStatus,
        featured: data.featured,
        images: JSON.stringify(data.images),
        specs: data.specs ? JSON.stringify(data.specs) : null,
      },
    });

    return NextResponse.json({ ...product, images: data.images }, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", details: err.issues }, { status: 400 });
    }
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
