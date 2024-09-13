import {
  AuthCredentialsValidator,
  SignInAuthCredentialsValidator,
} from "../lib/validators/account-creds-validator";
import { publicProcedure, router } from "./trpc";
import { getPayloadClient } from "../lib/get-payload";
import { TRPCError } from "@trpc/server";
import { string, z } from "zod";

export const authRouter = router({
  createPayloadUser: publicProcedure
    .input(AuthCredentialsValidator)
    .mutation(async ({ input, ctx }) => {
      const { name, email, password } = input;
      const payload = await getPayloadClient();
      const { res } = ctx;

      const { docs: users } = await payload.find({
        collection: "users",
        where: {
          email: { equals: email },
        },
      });
      if (users.length !== 0) {
        throw new TRPCError({ code: "CONFLICT" });
      }

      await payload.create({
        collection: "users",
        data: {
          name: name,
          email: email,
          password: password,
          role: "customer",
        },
      });
      // .then(async ({ email, password }) => {
      // });

      try {
        await payload.login({
          collection: "users",
          data: { email, password },
          res,
        });
      } catch (err) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      return { success: true, sentToEmail: email, name: name };

      // try {
      //   const res = await fetch(
      //     `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/login`,
      //     {
      //       method: "POST",
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //       body: JSON.stringify({
      //         email: email,
      //         password: password,
      //       }),
      //     }
      //   );
      //   const json = await res.json();
      //   console.log(json);
      //   return { success: true, sentToEmail: email, name: name };
      // } catch (error) {
      //   console.log(error);
      //   throw new Error("Something went wrong. Please try again later.");
      // }
    }),

  verifyEmail: publicProcedure
    .input(z.object({ token: z.string() }))
    .query(async ({ input }) => {
      try {
        const { token } = input;
        const payload = await getPayloadClient();

        if (token) {
          const isVerified = await payload.verifyEmail({
            collection: "users",
            token,
          });

          // const isVerified = await fetch(
          //   `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/verify/${token}`,
          //   {
          //     method: "POST",
          //     headers: {
          //       "Content-Type": "application/json",
          //     },
          //   }
          // );

          console.log("verification token valid");

          if (!isVerified) throw new TRPCError({ code: "UNAUTHORIZED" });
        } else {
          console.log("verification token invalid");
        }

        return { success: true };
      } catch (error) {
        console.log(error);
        return { success: false };
      }
    }),
  signIn: publicProcedure
    .input(SignInAuthCredentialsValidator)
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input;
      const { res } = ctx;
      const payload = await getPayloadClient();

      try {
        await payload.login({
          collection: "users",
          data: { email, password },
          res,
        });

        return { success: true };
      } catch (err) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
    }),
});
