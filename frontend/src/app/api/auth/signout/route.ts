import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const redirectUrl = request.nextUrl.clone();

  redirectUrl.pathname = "/login";
  const cookieStore = cookies();

  cookieStore.delete("jwt");

  return NextResponse.redirect(redirectUrl);
}
