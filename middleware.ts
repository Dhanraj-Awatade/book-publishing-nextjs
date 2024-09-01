import { NextRequest, NextResponse } from "next/server";
import { getServerSideUser } from "./lib/payload-utils";
// import NextAuth from "next-auth";
// import { authConfig } from "./lib/auth.config";

const allowedOrigins = [
  "https://saptarshee.in",
  "https://www.saptarshee.in",
  // "http://localhost:3000",
  "https://saptarshee-nextjs-docker-398070399895.asia-southeast1.run.app",
];

const corsOptions = {
  // "Access-Control-Allow-Credentials": "true",
  "Access-Control-Allow-Methods": "GET,DELETE,PATCH,POST,PUT",
  "Access-Control-Allow-Headers":
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
};

// export default NextAuth(authConfig).auth;

export async function middleware(req: NextRequest) {
  const response = NextResponse.next();

  const origin = req.headers.get("origin") ?? "";
  const isAllowedOrigin = allowedOrigins.includes(origin);

  // // // Handle preflighted requests
  const isPreflight = req.method === "OPTIONS";

  if (isPreflight) {
    const preflightHeaders = {
      ...(isAllowedOrigin && { "Access-Control-Allow-Origin": origin }),
      ...corsOptions,
    };
    return NextResponse.json({}, { headers: preflightHeaders });
  }

  if (isAllowedOrigin) {
    response.headers.set("Access-Control-Allow-Origin", origin);
  }

  Object.entries(corsOptions).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  const { nextUrl, cookies } = req;

  const signedUser = await getServerSideUser(cookies);

  if (signedUser && ["/sign-in", "/sign-up"].includes(nextUrl.pathname)) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SERVER_URL}/`);
  }

  return response;
}

// export const config = {
//   matcher:
//     // "/api/:path*",
//     ["/((?!api).*)"],
// };

// export function middleware(request: NextRequest) {
//
