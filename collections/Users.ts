import { Access, CollectionConfig } from "payload/types";

export const Users: CollectionConfig = {
    slug: "users",
    admin: {
        hidden: ({ user }) => user.role !== "admin",
        defaultColumns: ["id"],
    },
    hooks: {
        //   beforeChange: [addPurchasedProducts],
        // afterLogin: [addPurchasedProducts],
    },
    auth: {
        // verify: {
        //   generateEmailHTML: ({ token }) => {
        //     return PrimaryActionEmailHtml({
        //       actionLabel: "Verify Your Account",
        //       buttonText: "Verify Account",
        //       href: `https://saptarshee.in/verify-email?token=${token}`,
        //     });
        //     // `<a href='${process.env.NEXT_PUBLIC_URL}/verify-email?token=${token}'>Verify Email</a>`; //TO-DO: Beautify this
        //   },
        // },
    },
    access: {
        // read: adminsAndUser,
        read: () => true,
        create: () => true,
        update: () => true,
        // update: ({ req }) => req.user.role === "admin",
        delete: ({ req }) => req.user.role === "admin",
    },

    fields: [
        {
            name: "addresses",
            type: "relationship",
            relationTo: "addresses",
            hasMany: true,
        },
        {
            name: "products",
            label: "Products",
            admin: {
                condition: () => true,
            },
            type: "relationship",
            relationTo: "products",
            hasMany: true,
            // access: {
            //   create: () => true,
            //   update: () => true,
            // },
        },
        {
            name: "product_files",
            label: "Products Files",
            admin: {
                condition: () => false,
            },
            type: "relationship",
            relationTo: "product_files",
            hasMany: true,
        },
        {
            name: "role",
            type: "select",
            required: true,
            defaultValue: "customer",
            // saveToJWT: true,
            // admin: {
            //   condition: ({ user }) => user.role === "admin",
            // },
            access: {
                read: () => true,
                // create: () => false,
                // update: () => false,
                update: ({ req }) => req.user.role === "admin",
            },
            options: [
                { label: "Admin", value: "admin" },
                { label: "Customer", value: "customer" },
                { label: "Author", value: "author" },
                { label: "Editor", value: "editor" },
            ],
        },
        {
            name: "name",
            type: "text",
            required: true,
            admin: {
                readOnly: false,
                //TO-DO: Add functionality to change name later
            },
        },
    ],
};
