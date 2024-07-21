import { NextRequest, NextResponse } from "next/server";
import * as crypto from "crypto";
import { getPayloadClient } from "@/lib/get-payload";
import { User } from "../../../payload-types";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { PayloadRequest } from "payload/types";
import { request } from "express";

export async function GET(req: Request) {
  return NextResponse.json({
    message: "Success",
  });
}

//Done(Completed): Debug API POST with body
//To-Do: Add Product to User Collection
export async function POST(req: Request, res: NextResponse) {
  const data = await req.json();
  const payload = await getPayloadClient();
  // const payloadRequest = request as PayloadRequest;

  const key = process.env.RAZORPAY_KEY as crypto.BinaryLike;
  const body = data.razorpay_order_id + "|" + data.razorpay_payment_id;
  // const { user } = payloadRequest as { user: User | null };

  const expectedSignature = crypto
    .createHmac("sha256", key)
    .update(body.toString())
    .digest("hex");

  const isPaymentVerified = expectedSignature === data.razorpay_signature;
  /*
  // const cookies: NextRequest["cookies"] | ReadonlyRequestCookies = data.cookies;
  const token = data.token;
  // cookies.get("payload-token")?.value;
  const meRes = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`,
    {
      headers: {
        Authorization: `JWT ${token}`,
      },
    }
  );
  const { user } = (await meRes.json()) as { user: User | null };
*/
  if (isPaymentVerified) {
    const { docs: updatedOrders } = await payload.update({
      // id: payloadOrderId,
      collection: "orders",
      depth: 1,
      where: {
        razorpayOrderId: {
          equals: data.razorpay_order_id,
        },
      },
      data: {
        _isPaid: true,
      },
    });
    /*
    const [updatedOrder] = updatedOrders;
    // const productsInOrder = updatedOrder.map(({ products }) => products);

    const { docs: updatedUser } = await payload.update({
      collection: "users",
      where: {
        id: {
          equals: user!.id,
        },
      },
      data: {
        products: Array.from(new Set([...updatedOrder.products])),
      },
    });
*/
    return NextResponse.json(
      { updatedOrders, /*updatedUser,*/ isPaymentVerified }
      // {
      // headers: {
      //   "Content-Type": "application/json",
      // },
      // }
    );
  } else return NextResponse.json({ error: "Error while verifying payment" });
}
