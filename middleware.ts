import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/auth";

const publicRoutes = ["/", "/not-found"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const isPublicRoute = publicRoutes.includes(path);

  if (!isPublicRoute) {
    try {
      await getSession();
    } catch (error) {
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
