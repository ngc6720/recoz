import * as CONFIG from "@/app/lib/utils/config";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const generateRandomString = (length: number) => {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return [...new Array(length)]
    .map(() => possible.charAt(Math.floor(Math.random() * possible.length)))
    .join("");
};

export async function GET() {
  const cookieStore = await cookies();

  const state = generateRandomString(16);

  cookieStore.set({
    name: "st",
    value: state ?? "",
    path: "/",
    maxAge: 30,
    httpOnly: true,
    secure: true,
  });

  const scope: string = [
    // "streaming",
    // "user-read-email",
    // "user-read-private",
    // "playlist-modify-public",
    // "user-read-playback-state",
    // "user-modify-playback-state",
  ].join(" ");

  const q = new URLSearchParams({
    client_id: process.env.SPOTIFY_CLIENT_ID ?? "",
    response_type: "code",
    redirect_uri: CONFIG.url + process.env.SPOTIFY_REDIRECT_URI,
    scope: scope,
    state: state,
  }).toString();

  return NextResponse.redirect("https://accounts.spotify.com/authorize?" + q);
}
