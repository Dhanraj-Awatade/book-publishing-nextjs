import { RequestHandler } from "express";
import { getPayloadClient } from "./get-payload";
import { Product } from "../payload-types";
import { RecieptEmailHtml } from "../components/emails/RecieptEmail";
import * as crypto from "crypto";
import nodemailer from "nodemailer";
import { validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "info.saptarshee.publications@gmail.com",
        pass: "twrpsjqhkorjfxuz",
    },
});

export const razorpayWebhookHandler: RequestHandler = async (req, res) => {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET as string;

    const isValidWebhookSignature = validateWebhookSignature(
        JSON.stringify(req.body),
        req.headers["x-razorpay-signature"] as string,
        secret
    );

    // const shaKey = crypto.createHmac("sha256", secret);
    // shaKey.update(JSON.stringify(req.body));
    // const digest = shaKey.digest("hex");

    // console.log(digest, req.headers["x-razorpay-signature"]);

    // if (digest === req.headers["x-razorpay-signature"])
    if (isValidWebhookSignature == true) {
        console.log("Valid Razorpay Webhook Request");

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

            const [updatedOrder] = updatedOrders;
            const user = updatedOrder.user;
            console.log("updated Order via webhook:", updatedOrder);

            // send receipt
            try {
                if (typeof user === "string")
                    return new Error(
                        "Depth not enough to get User details from order."
                    );
                const data = await /*resend.emails.*/ transporter.sendMail({
                    from: "Saptarshee Publications <info.saptarshee.publications@gmail.com>",
                    to: [user.email],
                    subject:
                        "Order Placed Successfully | Saptarshee Publications",
                    html: RecieptEmailHtml({
                        date: new Date(),
                        email: user.email,
                        orderId: orderId,
                        products: updatedOrder.products as Product[],
                        amount: updatedOrder.amount,
                    }),
                });
                res.status(200).json({ data });
            } catch (error) {
                res.status(500).json({ error });
            }
            // }

            // return res.status(200).send("Success");
        }
    } else {
        console.log("Invalid Razorpay Webhook Request");
        return res.status(502).send("Invalid Razorpay Webhook Request");
    }
};

export const shiprocketWebhookHandler: RequestHandler = async (req, res) => {
    console.log("Hit");
    //trpc API call to shippingRouter here
    res.status(200).json({ success: true });
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
