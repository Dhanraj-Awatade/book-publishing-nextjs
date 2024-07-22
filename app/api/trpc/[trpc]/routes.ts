import { appRouter } from "@/trpc";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { NextApiResponse } from "next";

const handler = (req: Request, res: NextApiResponse) => {
  // res.setHeader("Access-Control-Allow-Origin", "*");
  // res.setHeader("Access-Control-Request-Method", "*");
  // res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET");
  // res.setHeader("Access-Control-Allow-Headers", "*");

  // // res.setHeader('Access-Control-Allow-Origin', 'https://example:6006');
  // // res.setHeader('Access-Control-Request-Method', '*');
  // // res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  // // res.setHeader('Access-Control-Allow-Headers', 'content-type');
  // // res.setHeader('Referrer-Policy', 'no-referrer');
  // // res.setHeader('Access-Control-Allow-Credentials', 'true');

  // if (req.method === "OPTIONS") {
  //   res.writeHead(200);
  //   return res.end();
  // }

  fetchRequestHandler({
    endpoint: "api/trpc",
    req,
    router: appRouter,
    // @ts-expect-error context already passed from express middleware
    createContext: () => ({}),
  });
};

export { handler as GET, handler as POST };
