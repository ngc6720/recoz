import { cookies } from "next/headers";
import { ApiErrorSpotify } from "@/types/types";

const baseUrl = "https://api.spotify.com/v1/";

const refreshToken = async () => {
  const cookieStore = await cookies();
  const r_t = cookieStore.get("r_t");

  if (!r_t) {
    throw new Error("no refresh token stored");
  }

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
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: r_t.value,
    }),
  };

  const res = await fetch(
    "https://accounts.spotify.com/api/token",
    authOptions
  );

  const { access_token, expires_in } = await res.json();

  cookieStore.set({
    name: "a_t",
    value: access_token,
    path: "/",
    maxAge: process.env.SPOTIFY_A_T ?? expires_in,
    httpOnly: true,
    secure: true,
  });
};

const getToken = async () => {
  let cookieStore = await cookies();
  let a_t = cookieStore.get("a_t");
  if (!a_t) {
    await refreshToken();
    cookieStore = await cookies();
    a_t = cookieStore.get("a_t");
  }
  if (!a_t) throw new Error("Error retrieving cookie token");
  return a_t;
};

export const transferRequest = async (type: string, q: URLSearchParams) => {
  const a_t = await getToken();

  return await fetch(baseUrl + type + q, {
    headers: {
      Authorization: "Bearer " + a_t.value,
    },
  });
};

export const makeError = (res: Response): ApiErrorSpotify => {
  if (res.status === 429) {
    const waitInSeconds = parseInt(res.headers.get("retry-after") ?? "0");
    return {
      status: res.status,
      message: `${res.statusText} : try again in ${Math.ceil(
        waitInSeconds / 60
      )} minutes`,
    };
  }

  return { status: res.status, message: res.statusText };
};

export const getUsername = async () => {
  const a_t = await getToken();

  const res = await fetch(baseUrl + "me", {
    headers: {
      Authorization: "Bearer " + a_t.value,
    },
  });
  const { display_name } = await res.json();

  return display_name;
};
