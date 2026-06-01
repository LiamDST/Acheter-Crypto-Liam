import { NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_MAX_AGE,
  createAdminSessionToken,
  getAdminConfigError,
  isSafeAdminNextPath,
  isValidAdminCredentials
} from "@/lib/admin-auth";

function wantsJson(request: Request) {
  return request.headers.get("x-admin-login-mode") === "json";
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const nextPath = String(formData.get("next") || "");
  const safeNextPath = isSafeAdminNextPath(nextPath) ? nextPath : "/admin";

  if (getAdminConfigError()) {
    if (wantsJson(request)) {
      return NextResponse.json({ error: "Configuration admin manquante." }, { status: 500 });
    }
    return NextResponse.redirect(new URL("/admin/login?error=config", request.url), { status: 303 });
  }

  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");

  if (!isValidAdminCredentials(email, password)) {
    if (wantsJson(request)) {
      return NextResponse.json({ error: "Identifiants admin incorrects." }, { status: 401 });
    }

    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("error", "credentials");
    loginUrl.searchParams.set("next", safeNextPath);
    return NextResponse.redirect(loginUrl, { status: 303 });
  }

  const response = wantsJson(request)
    ? NextResponse.json({ redirectTo: safeNextPath })
    : NextResponse.redirect(new URL(safeNextPath, request.url), { status: 303 });

  response.cookies.set(ADMIN_SESSION_COOKIE, await createAdminSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/admin",
    maxAge: ADMIN_SESSION_MAX_AGE
  });

  return response;
}
