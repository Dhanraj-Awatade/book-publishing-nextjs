import dotenv from "dotenv";
import path from "path";
import payload, { Payload } from "payload";
import type { InitOptions } from "payload/config";
import nodemailer from "nodemailer";

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

const payload_secret = "aedascca9f4eccac";

const transporter = nodemailer.createTransport({
  // host: "smtp.hostinger.com",
  // secure: true,
  // port: 465,
  // auth: {
  //   user: "info@saptarshee.in",
  //   pass: "Kumudinee@7",
  // },
  service: "gmail",
  auth: {
    user: "info.saptarshee.publications@gmail.com",
    pass: "twrpsjqhkorjfxuz",
  },
});

let cached = (global as any).payload;

if (!cached) {
  cached = (global as any).payload = {
    client: null,
    promise: null,
  };
}

interface Args {
  initOptions?: Partial<InitOptions>;
}
export const getPayloadClient = async ({
  initOptions,
}: Args = {}): Promise<Payload> => {
  // if (!process.env.PAYLOAD_SECRET) {
  //   throw new Error(
  //     `PAYLOAD_SECRET is missing ,${process.env.NEXT_PUBLIC_SERVER_URL}`
  //   );
  // }
  if (cached.client) {
    return cached.client;
  }
  if (!cached.promise) {
    cached.promise = payload.init({
      email: {
        transport: transporter,
        fromAddress: "info.saptarshee.publications@gmail.com",
        fromName: "Saptarshee Publications",
      },
      // secret: process.env.PAYLOAD_SECRET,
      secret: payload_secret,
      local: initOptions?.express ? false : true,
      ...(initOptions || {}),
    });

    try {
      cached.client = await cached.promise;
    } catch (e: unknown) {
      cached.promise = null;
      throw e;
    }
  }
  return cached.client;
};
