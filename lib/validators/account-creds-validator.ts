import { z } from "zod";

export const AuthCredentialsValidator = z.object({
  name: z.string().min(2, { message: "Enter a valid Name" }),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be of minimum 8 characters" }),
});
export const SignInAuthCredentialsValidator = z.object({
  // name: z.string().min(2, { message: "Enter a valid Name" }),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be of minimum 8 characters" }),
});

export type TAuthCredentialsValidator = z.infer<
  typeof AuthCredentialsValidator
>;

export type TSignInAuthCredentialsValidator = z.infer<
  typeof SignInAuthCredentialsValidator
>;
