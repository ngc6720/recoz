import * as CONFIG from "@/app/lib/utils/config";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();

  const code: string = request.nextUrl.searchParams.get("code") ?? "";
  const state = request.nextUrl.searchParams.get("state") ?? null;
  const storedState = request.cookies.get("st")?.value ?? null;

  if (state === null || state !== storedState) {
    const q = new URLSearchParams({
      message:
        "It looks like you are not allowing cookies and browser data on this site, but this app needs it for the authentication to work properly.",
    });
    return NextResponse.redirect(new URL("/error?" + q, request.url));
  }

  cookieStore.delete("st");

  const q = new URLSearchParams({
    grant_type: "authorization_code",
    code: code,
    redirect_uri: CONFIG.url + process.env.SPOTIFY_REDIRECT_URI,
  }).toString();

  const authOptions = {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(
          process.env.SPOTIFY_CLIENT_ID +
            ":" +
            process.env.SPOTIFY_CLIENT_SECRET
        ).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  const res = await fetch(
    "https://accounts.spotify.com/api/token?" + q,
    authOptions
  );

  const { access_token, expires_in, refresh_token } = await res.json();

  const response = NextResponse.redirect(new URL("/dashboard", request.url));

  cookieStore.set({
    name: "a_t",
    value: access_token,
    path: "/",
    maxAge: process.env.SPOTIFY_A_T ?? expires_in,
    httpOnly: true,
    secure: true,
  });

  cookieStore.set({
    name: "r_t",
    value: refresh_token,
    path: "/",
    maxAge: process.env.SPOTIFY_R_T ?? expires_in,
    httpOnly: true,
    secure: true,
  });

  return response;
}
