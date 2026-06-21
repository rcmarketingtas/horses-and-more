import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { generateToken, ADMIN_COOKIE_NAME } from "@/lib/admin-auth";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = schema.parse(body);

    const adminEmail = process.env.ADMIN_EMAIL ?? "admin@horsesandmore.com.au";
    const adminPassword = process.env.ADMIN_PASSWORD ?? "admin123";

    if (email !== adminEmail || password !== adminPassword) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = generateToken(email);
    const res = NextResponse.json({ success: true });
    res.cookies.set(ADMIN_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 8,
      path: "/",
    });
    return res;
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
