// import type { NextAuthConfig } from "next-auth";
// import Google from "next-auth/providers/google";

// export const authConfig = {
//   pages: {
//     signIn: "/sign-in",
//   },
//   callbacks: {
//     authorized({ auth, request: { nextUrl } }) {
//       const isLoggedIn = !!auth?.user;
//       const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
//       if (isOnDashboard) {
//         if (isLoggedIn) return true;
//         return false; // Redirect unauthenticated users to login page
//       } else if (isLoggedIn) {
//         return Response.redirect(new URL("/dashboard", nextUrl));
//       }
//       return true;
//     },
//   },
//   providers: [Google],
// } satisfies NextAuthConfig;
