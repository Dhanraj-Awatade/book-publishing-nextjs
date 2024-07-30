import { NextRequest, NextResponse } from "next/server";
import * as crypto from "crypto";
import { getPayloadClient } from "@/lib/get-payload";
import { User } from "../../../payload-types";
import { validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils";

export async function POST(req: Request, res: NextResponse) {
  const data = await req.json();
  const payload = await getPayloadClient();

  const webhookSignature = req.headers.get("X-Razorpay-Signature") as string;
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET as string;
  const isValidated = validateWebhookSignature(
    JSON.stringify(data),
    webhookSignature,
    webhookSecret
  );

  console.log(
    "Webhook Body:",
    JSON.stringify(data),
    "isvalidated:",
    isValidated
  );
  return NextResponse.json(data);
}
