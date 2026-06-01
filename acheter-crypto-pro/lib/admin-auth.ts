export const ADMIN_SESSION_COOKIE = "acheter_crypto_admin_session";
export const ADMIN_SESSION_MAX_AGE = 60 * 60 * 8;

export function getAdminEmail() {
  return process.env.ADMIN_EMAIL || "";
}

export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || "";
}

function getAdminSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET || "";
}

export function getAdminConfigError() {
  if (!getAdminEmail() || !getAdminPassword() || !getAdminSessionSecret()) {
    return "Configuration admin manquante. Renseignez ADMIN_EMAIL, ADMIN_PASSWORD et ADMIN_SESSION_SECRET.";
  }
  return null;
}

export function isSafeAdminNextPath(nextPath: string | null | undefined) {
  return Boolean(nextPath && nextPath.startsWith("/admin") && !nextPath.startsWith("/admin/login") && !nextPath.startsWith("/admin/logout"));
}

function bytesToHex(buffer: ArrayBuffer) {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function signAdminPayload(payload: string) {
  const secret = getAdminSessionSecret();
  if (!secret) return "";

  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  return bytesToHex(signature);
}

export async function createAdminSessionToken() {
  const issuedAt = Date.now().toString();
  const payload = `admin.${issuedAt}`;
  const signature = await signAdminPayload(payload);
  return `${payload}.${signature}`;
}

export async function verifyAdminSessionToken(token: string | undefined) {
  if (!token || getAdminConfigError()) return false;

  const [scope, issuedAt, signature] = token.split(".");
  if (scope !== "admin" || !issuedAt || !signature) return false;

  const issuedAtNumber = Number(issuedAt);
  if (!Number.isFinite(issuedAtNumber)) return false;

  const maxAgeMs = ADMIN_SESSION_MAX_AGE * 1000;
  if (Date.now() - issuedAtNumber > maxAgeMs) return false;

  const expectedSignature = await signAdminPayload(`${scope}.${issuedAt}`);
  return signature === expectedSignature;
}

export function isValidAdminCredentials(email: string, password: string) {
  return email.trim().toLowerCase() === getAdminEmail().toLowerCase() && password === getAdminPassword();
}
