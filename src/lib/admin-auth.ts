import crypto from "crypto";

const COOKIE_NAME = "admin_session";

function sign(payload: string): string {
  return crypto
    .createHmac("sha256", process.env.ADMIN_SECRET!)
    .update(payload)
    .digest("hex");
}

export function createSessionToken(): string {
  const payload = `admin:${Date.now()}`;
  const signature = sign(payload);
  return `${payload}.${signature}`;
}

export function verifySessionToken(token: string): boolean {
  const lastDot = token.lastIndexOf(".");
  if (lastDot === -1) return false;
  const payload = token.substring(0, lastDot);
  const signature = token.substring(lastDot + 1);
  const expected = sign(payload);
  if (signature.length !== expected.length) return false;
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}

export { COOKIE_NAME };
