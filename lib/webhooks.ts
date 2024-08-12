import express, { RequestHandler } from "express";
// import { WebhookRequest } from "./server";
import Razorpay from "razorpay";
import { getPayloadClient } from "./get-payload";
import { Product } from "../payload-types";
import { Resend } from "resend";
import { RecieptEmailHtml } from "../components/emails/RecieptEmail";
import { Webhooks } from "razorpay/dist/types/webhooks";
import * as crypto from "crypto";

const resend = new Resend(process.env.RESEND_API_KEY);
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_ID as string,
//   key_secret: process.env.RAZORPAY_KEY as string,
// });

export const webhookHandler: RequestHandler = async (req, res) => {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET as string;

  const shaKey = crypto.createHmac("sha256", secret);
  shaKey.update(JSON.stringify(req.body));
  const digest = shaKey.digest("hex");

  console.log(digest, req.headers["x-razorpay-signature"]);

  if (digest === req.headers["x-razorpay-signature"]) {
    console.log("Valid Request", "body:", req.body);

    if (req.body.event === "order.paid") {
      const isPaid = req.body.payload.order.entity.status === "paid";
      const orderId = req.body.payload.order.entity.id;
      const payload = await getPayloadClient();

      const { docs: updatedOrders } = await payload.update({
        // id: payloadOrderId,
        collection: "orders",
        depth: 1,
        where: {
          razorpayOrderId: {
            equals: orderId,
          },
        },
        data: {
          _isPaid: isPaid,
        },
      });

      console.log("updated Order via webhook:", [updatedOrders]);
      return res.status(200).send("Success");
    }
  } else {
    console.log("Invalid Request");
    return res.status(502).send("Invalid Request");
  }
};

/*
export const razorpayWebhookHandler = async (
  req: express.Request,
  res: express.Response
) => {
  const webhookRequest = req as any as WebhookRequest;
  const body = webhookRequest.rawBody;
  const signature = req.headers["stripe-signature"] || "";
  

  console.log(body.toJSON());
  //   let event;
  //   try {
  //     event = razorpay.webhooks.all();
  //     //   stripe.webhooks.constructEvent(
  //     //     body,
  //     //     signature,
  //     //     process.env.STRIPE_WEBHOOK_SECRET || ''
  //     //   )
  //   } catch (err) {
  //     return res
  //       .status(400)
  //       .send(
  //         `Webhook Error: ${err instanceof Error ? err.message : "Unknown Error"}`
  //       );
  //   }

  // const session = event.data
  //   .object as Webhooks.RazorpayWebhook

  // if (
  //   !session?.metadata?.userId ||
  //   !session?.metadata?.orderId
  // ) {
  //   return res
  //     .status(400)
  //     .send(`Webhook Error: No user present in metadata`)
  // }

  // if (event.type === 'checkout.session.completed') {
  //   const payload = await getPayloadClient()

  //   const { docs: users } = await payload.find({
  //     collection: 'users',
  //     where: {
  //       id: {
  //         equals: session.metadata.userId,
  //       },
  //     },
  //   })

  //   const [user] = users

  //   if (!user)
  //     return res
  //       .status(404)
  //       .json({ error: 'No such user exists.' })

  //   const { docs: orders } = await payload.find({
  //     collection: 'orders',
  //     depth: 2,
  //     where: {
  //       id: {
  //         equals: session.metadata.orderId,
  //       },
  //     },
  //   })

  //   const [order] = orders

  //   if (!order)
  //     return res
  //       .status(404)
  //       .json({ error: 'No such order exists.' })

  //   await payload.update({
  //     collection: 'orders',
  //     data: {
  //       _isPaid: true,
  //     },
  //     where: {
  //       id: {
  //         equals: session.metadata.orderId,
  //       },
  //     },
  //   })

  // send receipt
  //   try {
  //     const data = await resend.emails.send({
  //       from: 'Saptarshee Publications <saptarsheebooks@gmail.com>',
  //       to: [user.email],
  //       subject:
  //         'Thanks for your order! This is your receipt.',
  //       html: RecieptEmailHtml({
  //         date: new Date(),
  //         email: user.email,
  //         orderId: session.metadata.orderId,
  //         products: order.products as Product[],
  //       }),
  //     })
  //     res.status(200).json({ data })
  //   } catch (error) {
  //     res.status(500).json({ error })
  //   }
  // }

  return res.status(200).send("Success");
};
*/
