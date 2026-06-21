import { NextResponse } from "next/server";

export async function PATCH() {
  return NextResponse.json(
    { message: "Edit src/data/products.json and redeploy to update products." },
    { status: 200 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { message: "Edit src/data/products.json and redeploy to delete products." },
    { status: 200 }
  );
}
