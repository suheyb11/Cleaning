import { NextResponse } from "next/server";

import {
  ADMIN_COOKIE_NAME,
  expectedAdminCookieValue,
  isCorrectAdminPassword,
} from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

const ONE_WEEK = 60 * 60 * 24 * 7;

export async function POST(request: Request) {
  const { password } = (await request.json().catch(() => ({}))) as {
    password?: string;
  };

  if (!password || !isCorrectAdminPassword(password)) {
    return NextResponse.json(
      { ok: false, error: "Incorrect password." },
      { status: 401 },
    );
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE_NAME, await expectedAdminCookieValue(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ONE_WEEK,
  });
  return response;
}
