// import { NextRequest, NextResponse } from "next/server";
// import * as crypto from "crypto";
// import { getPayloadClient } from "@/lib/get-payload";
// import { User } from "../../../payload-types";
// import { validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils";

// // export async function POST(req: NextRequest, res: NextResponse) {
// //   // const data = await req.json();
// //   // const payload = await getPayloadClient();

// //   const webhookSignature = req.headers.get("X-Razorpay-Signature") as string;
// //   const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET as string;
// //   // const isValidated = validateWebhookSignature(
// //   //   JSON.stringify(data),
// //   //   webhookSignature,
// //   //   webhookSecret
// //   // );

// //   console.log(
// //     "Webhook Body:",
// //     // JSON.stringify(data),
// //     "isvalidated:"
// //     // isValidated
// //   );
// //   return NextResponse.json("data");
// // }

// export async function POST(req: NextRequest) {
//   try {
//     // Parse the JSON body from the request
//     // const data = await req.json();

//     // Example: logging the data
//     // console.log(data);

//     // You can now process `data` further

//     return NextResponse.json({ message: "Data received" });
//   } catch (error) {
//     // Handle any errors that occur during parsing or processing
//     console.error("Error processing request:", error);
//     return NextResponse.json(
//       { error: "Error processing request" },
//       { status: 400 }
//     );
//   }
// }
