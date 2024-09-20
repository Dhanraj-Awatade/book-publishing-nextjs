import { User } from "../../payload-types";
import { BeforeChangeHook } from "payload/dist/collections/config/types";
import { Access, CollectionConfig } from "payload/types";

const yourOwn: Access = ({ req: { user } }) => {
  if (user.role === "admin") return true;
  if (user.role === "editor") return true;

  return {
    user: {
      equals: user?.id,
    },
  };
};

export const Orders: CollectionConfig = {
  slug: "orders",
  admin: {
    useAsTitle: "Your Orders",
    description: "A Summary of all your orders from Saptarshee Publications.",
  },
  // hooks: {
  //   beforeChange: [addPurchasedProducts],
  // },
  access: {
    read: yourOwn,
    update: ({ req }) => req.user.role === "admin",
    delete: ({ req }) => req.user.role === "admin",
    create: ({ req }) => req.user.role === "admin",
  },
  fields: [
    {
      name: "_isPaid",
      type: "checkbox",
      access: {
        // read: ({ req }) => req.user.role === "admin",
        read: ({ req }) => {
          if (req.user.role === "admin" || req.user.role === "editor")
            return true;
          else return false;
        },
        create: () => false,
        update: ({ req }) => req.user.role === "admin",
      },
      admin: {
        hidden: false,
      },
      required: true,
    },
    {
      name: "amount",
      type: "number",
      // access: {
      //   read: ({ req }) => req.user.role === "admin",
      //   create: () => false,
      //   update: ({ req }) => req.user.role === "admin",
      // },
      admin: {
        hidden: false,
      },
      required: true,
    },
    {
      name: "user",
      type: "relationship",
      admin: {
        hidden: false,
      },
      relationTo: "users",
      required: true,
    },
    {
      name: "address",
      type: "relationship",
      admin: {
        hidden: false,
      },
      relationTo: "addresses",
      hasMany: false,
    },
    {
      name: "products",
      type: "relationship",
      relationTo: "products",
      required: true,
      hasMany: true,
    },
    {
      name: "razorpayOrderId",
      type: "text",
      admin: {
        hidden: false,
      },
      access: {
        create: () => false,
        update: () => false,
        read: ({ req }) => req.user.role === "admin",
      },
    },
  ],
};
