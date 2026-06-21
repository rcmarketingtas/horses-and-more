import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    { message: "Enquiries are emailed to the store owner. No database connected in prototype mode." },
    { status: 200 }
  );
}
