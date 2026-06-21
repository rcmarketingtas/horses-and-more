import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminRequest } from "@/lib/admin-auth";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();

  const updateData: Record<string, unknown> = {};
  if (body.name !== undefined) updateData.name = body.name;
  if (body.shortDescription !== undefined) updateData.shortDescription = body.shortDescription;
  if (body.description !== undefined) updateData.description = body.description;
  if (body.price !== undefined) updateData.price = body.price;
  if (body.stockStatus !== undefined) updateData.stockStatus = body.stockStatus;
  if (body.featured !== undefined) updateData.featured = body.featured;
  if (body.categoryId !== undefined) updateData.categoryId = body.categoryId;
  if (body.images !== undefined) updateData.images = JSON.stringify(body.images);
  if (body.specs !== undefined) updateData.specs = JSON.stringify(body.specs);

  const product = await prisma.product.update({
    where: { id },
    data: updateData,
  });

  return NextResponse.json({
    ...product,
    images: JSON.parse(product.images),
    specs: product.specs ? JSON.parse(product.specs) : null,
  });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  await prisma.enquiry.updateMany({
    where: { productId: id },
    data: { productId: null },
  });

  await prisma.product.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
