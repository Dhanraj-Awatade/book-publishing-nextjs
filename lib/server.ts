import express from "express";
import { getPayloadClient } from "./get-payload";
import { nextApp, nextHandler } from "./next-utils";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "../trpc";
import { inferAsyncReturnType } from "@trpc/server";
import Razorpay from "razorpay";
import { PayloadRequest } from "payload/types";
import { parse } from "url";
import payload from "payload";
import path from "path";
import nextBuild from "next/dist/build";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Credentials", "true");
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   next();
// });

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "shabdashivar.in");
  return { req, res };
};
export type ExpressContext = inferAsyncReturnType<typeof createContext>;

const start = async () => {
  const payload = await getPayloadClient({
    initOptions: {
      express: app,
      onInit: async (cms) => {
        cms.logger.info(`Admin URL ${cms.getAdminURL()}`);
      },
    },
  });

  app.disable("x-powered-by");
  // app.use(cors());
  // app.get("/api/trpc", cors(), (req, res) => {});
  // app.use(function (req, res, next) {
  //   // const allowedOrigins = [
  //   //   "https://shabdashivar.in",
  //   //   "https://www.shabdashivar.in",
  //   //   "https://saptarshee.in",
  //   //   "https://www.saptarshee.in",
  //   //   "http://localhost:3000",
  //   // ];
  //   // const corsOptions = {
  //   //   "Access-Control-Allow-Credentials": "true",
  //   //   "Access-Control-Allow-Methods": "GET,DELETE,PATCH,POST,PUT",
  //   //   "Access-Control-Allow-Headers":
  //   //     "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
  //   // };

  //   // const origin = req.headers.host ?? "";
  //   // const isAllowedOrigin = allowedOrigins.includes(origin);

  //   // // Handle preflighted requests
  //   // const isPreflight = req.method === "OPTIONS";

  //   // if (isPreflight) {
  //   //   const preflightHeaders = {
  //   //     ...(isAllowedOrigin && { "Access-Control-Allow-Origin": origin }),
  //   //     ...corsOptions,
  //   //   };
  //   //   return NextResponse.json({}, { headers: preflightHeaders });
  //   // }

  //   // if (isAllowedOrigin) {
  //   // res.setHeader("Access-Control-Allow-Origin", s);
  //   // }
  //   res.setHeader("Access-Control-Allow-Origin", "https://www.shabdashivar.in");
  //   next();
  // });

  // // const corsOptions = {
  // //   origin: [
  // //     "https://shabdashivar.in",
  // //     "https://www.shabdashivar.in",
  // //     "https://saptarshee.in",
  // //     "https://www.saptarshee.in",
  // //   ],
  // // };
  // // app.use(cors(corsOptions));

  if (process.env.NEXT_BUILD) {
    app.listen(PORT, async () => {
      payload.logger.info("NextJS in Production");
      //@ts-expect-error
      await nextBuild(path.join(__dirname, "../../"));
      process.exit();
    });
    return;
  }

  const cartRouter = express.Router();
  cartRouter.use(payload.authenticate);
  cartRouter.get("/", (req, res) => {
    const request = req as PayloadRequest;

    if (!request.user) return res.redirect("/sign-in?origin=cart");

    const parsedUrl = parse(req.url, true);

    return nextApp.render(req, res, "/cart", parsedUrl.query);
  });

  app.use("/cart", cartRouter);

  app.use(
    "/api/trpc",
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  app.use((req, res) => {
    // res.setHeader("Access-Control-Allow-Credentials", "true");
    // res.setHeader("Access-Control-Allow-Origin", "*");
    return nextHandler(req, res);
  });
  nextApp.prepare().then(() => {
    // payload.console.logger.info("NextJS Started");
  });

  app.listen(PORT, async () => {
    // payload.console.logger.info(
    //   `NextJS App URL: ${process.env.NEXT_PUBLIC_SERVER_URL}`
    // );
  });
};
start();
