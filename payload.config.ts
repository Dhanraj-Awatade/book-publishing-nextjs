import { buildConfig } from "payload/config";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { slateEditor } from "@payloadcms/richtext-slate";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import path from "path";
import { Users } from "./collections/Users";
import dotenv from "dotenv";
import { Products } from "./collections/Products/Products";
import { ProductFiles } from "./collections/Products/ProductFile";
import { Media } from "./collections/Media";
import { Orders } from "./collections/Products/Orders";
import { Addresses } from "./collections/Addresses";
// import { PurchasedProducts } from "./collections/Products/PurchasedProducts";

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL,
  collections: [
    Users,
    Products,
    Media,
    ProductFiles,
    Orders,
    Addresses,
    // PurchasedProducts,
  ],
  routes: {
    admin: "/admin",
  },
  admin: {
    user: "users",
    bundler: webpackBundler(),
    meta: {
      titleSuffix: " - Saptarshee",
      favicon: "/icon.png",
      ogImage: "/icon.png",
    },
  },
  rateLimit: { max: 2000 },
  editor: slateEditor({}),
  db: mongooseAdapter({
    url: process.env.MONGODB_URL!,
  }),
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
});
