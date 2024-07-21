import { User } from "../../payload-types";
import { BeforeChangeHook } from "payload/dist/collections/config/types";
import { Access, CollectionConfig } from "payload/types";

const yourOwn: Access = ({ req: { user } }) => {
  if (user.role === "admin") return true;

  return {
    user: {
      equals: user?.id,
    },
  };
};

// const addPurchasedProducts: BeforeChangeHook = async ({
//   data,
//   req,
//   operation,
//   collection,
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

//     user.products = purchasedProducts;
//     // return { ...data, products: purchasedProducts };
//   }
// };

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
        read: ({ req }) => req.user.role === "admin",
        create: () => false,
        update: ({ req }) => req.user.role === "admin",
      },
      admin: {
        hidden: false,
      },
      required: true,
    },
    {
      name: "user",
      type: "relationship",
      admin: {
        hidden: true,
      },
      relationTo: "users",
      required: true,
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
        hidden: true,
      },
      access: {
        create: () => false,
        update: () => false,
        read: ({ req }) => req.user.role === "admin",
      },
    },
  ],
};
