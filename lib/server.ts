import express from "express";
import { getPayloadClient } from "./get-payload";
import { nextApp, nextHandler } from "./next-utils";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "../trpc";
import { inferAsyncReturnType } from "@trpc/server";
import { PayloadRequest } from "payload/types";
import { parse } from "url";
import payload from "payload";
import path from "path";
import nextBuild from "next/dist/build";
import { IncomingMessage } from "http";
import bodyParser from "body-parser";
import { razorpayWebhookHandler, shiprocketWebhookHandler } from "./webhooks";
import cors from "cors";

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const allowedOrigins = [
    "https://saptarshee.in",
    "https://www.saptarshee.in",
    "https://saptarshee-nextjs-docker-398070399895.asia-southeast1.run.app",
    "http://localhost:3000",
    process.env.NEXT_PUBLIC_SERVER_URL as string,
];
const allowedHostnames = [
    "saptarshee.in",
    "www.saptarshee.in",
    "saptarshee-nextjs-docker-398070399895.asia-southeast1.run.app",
    "localhost",
];

const createContext = ({
    req,
    res,
}: trpcExpress.CreateExpressContextOptions) => {
    return { req, res };
};

export type ExpressContext = inferAsyncReturnType<typeof createContext>;

const start = async () => {
    app.use(
        cors({
            origin: function (origin, callback) {
                if (!origin || allowedOrigins.includes(origin)) {
                    callback(null, true);
                } else {
                    callback(new Error("Origin not allowed by CORS"));
                }
            },
            methods: "GET, POST, PUT, DELETE,PATCH",
            allowedHeaders: ["Content-Type", "Authorization"],
            credentials: true,
        })
    );

    // redirect to main domain because setting cookies failed on subdomain leading to sign-in issues
    app.use((req, res, next) => {
        // console.log(req.hostname, "1");
        // const url = req.url;
        // console.log(url);
        if (
            allowedHostnames.includes(req.hostname) &&
            req.hostname !== "saptarshee.in" &&
            req.hostname !== "localhost"
        ) {
            console.log("req.host check", req.hostname);
            res.writeHead(301, {
                Location: process.env.NEXT_PUBLIC_SERVER_URL as string,
            });
            // res.redirect(process.env.NEXT_PUBLIC_SERVER_URL as string);
            res.end();
        } else {
            next();
        }
    });

    app.use(bodyParser.json());

    app.post("/api/webhooks/razorpay", razorpayWebhookHandler);
    app.post("/api/webhooks/shipping", shiprocketWebhookHandler);

    const payload = await getPayloadClient({
        initOptions: {
            express: app,
            onInit: async (cms) => {
                cms.logger.info(`Admin URL ${cms.getAdminURL()}`);
            },
        },
    });

    app.disable("x-powered-by");

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

        // if (!request.user) return res.redirect("/sign-in?origin=cart");
        if (!request.user) return res.redirect("/sign-up?origin=cart");

        const parsedUrl = parse(req.url, true);

        return nextApp.render(req, res, "/cart", parsedUrl.query);
    });

    app.use("/cart", cartRouter);

    const libraryRouter = express.Router();
    libraryRouter.use(payload.authenticate);
    libraryRouter.get("/", (req, res) => {
        const request = req as PayloadRequest;

        if (!request.user) return res.redirect("/sign-in?origin=library");

        const parsedUrl = parse(req.url, true);

        return nextApp.render(req, res, "/library", parsedUrl.query);
    });

    app.use("/library", libraryRouter);

    app.use(
        "/api/trpc",
        trpcExpress.createExpressMiddleware({
            router: appRouter,
            createContext,
        })
    );

    app.use((req, res) => nextHandler(req, res));
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
