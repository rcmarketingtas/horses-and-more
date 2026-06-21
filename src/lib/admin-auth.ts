import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const COOKIE_NAME = "ham_admin";
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET ?? "dev-admin-secret";

export function generateToken(email: string): string {
  // Simple HMAC-like token for dev; in production use a proper JWT library
  const payload = `${email}:${Date.now()}:${SESSION_SECRET}`;
  return Buffer.from(payload).toString("base64url");
}

export function verifyToken(token: string): boolean {
  try {
    const decoded = Buffer.from(token, "base64url").toString("utf-8");
    return decoded.endsWith(`:${SESSION_SECRET}`);
  } catch {
    return false;
  }
}

export async function getAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return verifyToken(token);
}

export function isAdminRequest(req: NextRequest): boolean {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return verifyToken(token);
}

export const ADMIN_COOKIE_NAME = COOKIE_NAME;
