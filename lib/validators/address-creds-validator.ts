import { z } from "zod";

export const AddrCredentialsValidator = z.object({
  name: z.string().min(2, { message: "Enter a valid Name" }),
  house: z.string().min(1, "required field"),
  road: z.string().optional(),
  pin: z
    .string()
    .min(6, "Enter a valid Pincode number")
    .max(6, "Enter a valid Pincode number"),
  state: z.string().min(1, "required field"),
  nickname: z.string().min(1, { message: "Enter a valid nick name" }),
});

export type TAddrCredentialsValidator = z.infer<
  typeof AddrCredentialsValidator
>;
