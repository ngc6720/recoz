import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  cookieStore.delete("r_t");
  cookieStore.delete("a_t");
  return NextResponse.redirect(new URL("/", request.url));
}
