// import NextAuth from "next-auth";
// import { authConfig } from "@/lib/auth.config";
// import { mongooseAdapter } from "@payloadcms/db-mongodb";
// import { MongoDBAdapter } from "@auth/mongodb-adapter";

// export const { handlers, signIn, signOut, auth } = NextAuth({
//  ...authConfig,

//  session: {
//   strategy: "jwt",
//  },
//  pages: {
//   signIn: "/login",
//  },
//  callbacks: {
//   async jwt({ token, user }) {
//    if (user) {
//     // get user from db with the email
//     // if there is no user with the email, create new user
//     // else set the user data to token
//    }

//    return token;
//   },

//   async session({ session, token }) {
//    if (token) {
//     // set the token data to session
//    }

//    return session;
//   },

//   redirect() {
//    return "/login";
//   },
//  },
// });
