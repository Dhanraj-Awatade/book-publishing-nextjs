import {
  AfterChangeHook,
  AfterLoginHook,
  BeforeChangeHook,
} from "payload/dist/collections/config/types";
import { PrimaryActionEmailHtml } from "../components/emails/PrimaryActionEmail";
import { Access, CollectionConfig } from "payload/types";
import { User } from "../payload-types";

// const adminsAndUser: Access = ({ req: { user } }) => {
//   if (user.role === "admin") return true;
//   return {
//     id: {
//       equals: user.id,
//     },
//   };
// };

// const addPurchasedProducts: AfterLoginHook = async ({
//   req,
//   collection,
//   // user,
// }) => {
//   const user = req.user as User;

//   const { docs: orders } = await req.payload.find({
//     collection: "orders",
//     depth: 2,
//     where: {
//       user: {
//         equals: user.id,
//       },
//       _isPaid: {
//         equals: true,
//       },
//     },
//   });

//   const purchasedProductsArray = orders.map((order) => order.products);
//   const purchasedProducts = purchasedProductsArray.flatMap((prod) => prod);

//   user.products = purchasedProducts;
//   return purchasedProducts;
// };

// const addPurchasedProducts: BeforeChangeHook = async ({
//   data,
//   req,
//   operation,
// }) => {
//   if (operation === "update") {
//     const user = req.user as User;

//     const { docs: orders } = await req.payload.find({
//       collection: "orders",
//       depth: 2,
//       where: {
//         user: {
//           equals: user.id,
//         },
//         _isPaid: {
//           equals: true,
//         },
//       },
//     });

//     const purchasedProductsArray = orders.map((order) => order.products);
//     const purchasedProducts = purchasedProductsArray.flatMap((prod) => prod);

//     return { ...data, products: purchasedProducts };
//   }
// };

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
    verify: {
      generateEmailHTML: ({ token }) => {
        return PrimaryActionEmailHtml({
          actionLabel: "Verify Your Account",
          buttonText: "Verify Account",
          href: `${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${token}`,
        });
        // `<a href='${process.env.NEXT_PUBLIC_URL}/verify-email?token=${token}'>Verify Email</a>`; //TO-DO: Beautify this
      },
    },
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
      // admin: {
      //   condition: ({ user }) => user.role === "admin",
      // },
      access: {
        read: () => true,
        // create: () => false,
        update: () => false,
        // update: ({ req }) => req.user.role === "admin",
      },
      options: [
        { label: "Admin", value: "admin" },
        { label: "Customer", value: "customer" },
        { label: "Author", value: "author" },
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
