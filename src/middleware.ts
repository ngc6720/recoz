import { NextResponse, NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    if (request.cookies.has("r_t")) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  } else if (!request.nextUrl.pathname.startsWith("/api")) {
    if (!request.cookies.has("r_t")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith("/api/spotify")) {
    if (!request.cookies.has("r_t")) {
      return NextResponse.json({
        error: {
          message: "Session Expired : please reload the page",
          status: 401,
        },
      });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/api/:path*"],
};
