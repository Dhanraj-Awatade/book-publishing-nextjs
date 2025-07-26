import { User } from "../payload-types";
import { Access, CollectionConfig } from "payload/types";

const isAdminOrHasAccessToImages =
    (): Access =>
    async ({ req }) => {
        const user = req.user as User | undefined;

        if (!user) return false;
        // Grant permission to Admin, Editor & the user
        if (user.role === "admin") return true;
        if (user.role === "editor") return true;

        return {
            user: {
                equals: req.user.id,
            },
        };
    };

export const Media: CollectionConfig = {
    slug: "media",
    hooks: {
        beforeChange: [
            ({ req, data }) => {
                return { ...data, user: req.user.id };
            },
        ],
    },
    admin: {
        // hidden: ({ user }) => user.role !== "admin",
        hidden: ({ user }) => {
            if (user.role == "admin") return false;
            if (user.role == "editor") return false;
            else return true;
        },
    },
    access: {
        read: () => true,
        //  async ({ req }) => {
        //   const referer = req.headers.referer;

        //   if (!req.user || !referer?.includes("admin")) {
        //     return true;
        //   }
        //   return await isAdminOrHasAccessToImages()({ req });
        // },
        delete: isAdminOrHasAccessToImages(),
        update: isAdminOrHasAccessToImages(),
        create: isAdminOrHasAccessToImages(), // allow users & editor to create
        // create: ({ req }) => req.user.role === "admin",
    },
    upload: {
        staticURL: "/media",
        staticDir: "media",
        imageSizes: [
            {
                name: "thumbnail",
                width: 400,
                height: 300,
                position: "centre",
            },
            {
                name: "card",
                width: 768,
                height: 1024,
                position: "centre",
            },
            {
                name: "tablet",
                width: 1024,
                height: undefined,
                position: "centre",
            },
        ],
        mimeTypes: ["image/*"],
    },
    fields: [
        {
            name: "user",
            type: "relationship",
            relationTo: "users",
            required: true,
            hasMany: false,
            admin: {
                condition: () => false,
            },
        },
    ],
};
