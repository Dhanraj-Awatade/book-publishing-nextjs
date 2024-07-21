import { NextRequest, NextResponse } from "next/server";
import { getPayloadClient } from "@/lib/get-payload";
import { request } from "express";
import { PayloadRequest } from "payload/types";
import { User } from "../../../payload-types";
import payload from "payload";
import express from "express";

export async function POST(req: Request, res: NextResponse) {
  const data = await req.json();
  // const payload = await getPayloadClient();
  //
  // const payloadRequest = req;
  // const user = payloadRequest ;
  // const { user } = payloadRequest as { user: User | null };

  const app = express();
  const user = app.use(async (req, res) => {
    const payloadRequest = req as PayloadRequest;
    return await payloadRequest.user;
  });

  console.log(user);
  // const { docs: updatedUser } = await payload.update({
  //   collection: "users",
  //   where: {
  //     id: {
  //       equals: userId,
  //     },
  //   },
  //   data: {
  //     // products: Array.from(new Set([...data.products])),
  //     products: [...data.products],
  //   },
  // });

  return NextResponse.json({ user });
}
