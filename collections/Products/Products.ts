import {
  AfterChangeHook,
  BeforeChangeHook,
} from "payload/dist/collections/config/types";
import { PRODUCT_CATEGORIES, PRODUCT_TYPES } from "../../lib/config";
import { Access, CollectionConfig } from "payload/types";
import { Product, User } from "../../payload-types";
import payload from "payload";

// const addUser: BeforeChangeHook<Product> = async ({ req, data }) => {
//   const user = req.user;

//   return { ...data, user: user.id };
// };

// const yourOwn: Access = ({ req: { user } }) => {
//   if (user.role === "admin") return true;

//   return {
//     user: {
//       equals: user?.id,
//     },
//   };
// };
// const adminAndPurchased: Access = async ({ req }) => {
//   const user = req.user as User | null;

//   if (user?.role === "admin") return true;
//   if (!user) return false;

// const { docs: products } = await req.payload.find({
//   collection: "products",
//   depth: 0,
//   where: {
//     user: {
//       equals: user.id,
//     },
//   },
// });

// const ownProductFileIds = products.map((prod) => prod.product_files).flat();

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

//   const purchasedProductIds = orders
//     .map((order) => {
//       return order.products.map((product) => {
//         if (typeof product === "string")
//           return req.payload.logger.error(
//             "Search Depth not sufficient to find Purchased File IDs"
//           );

//         return product.id;
//       });
//     })
//     .filter(Boolean)
//     .flat();

//   return {
//     id: {
//       in: [...purchasedProductIds],
//     },
//   };
// };

const syncUser: AfterChangeHook<Product> = async ({ req, doc }) => {
  const fullUser = await payload.findByID({
    collection: "users",
    id: req.user.id,
  });
  if (fullUser && typeof fullUser === "object") {
    const { products } = fullUser;

    const allIds = [
      ...(products?.map((product) =>
        typeof product === "object" ? product.id : product
      ) || []),
    ];
    const createdProductIds = allIds.filter(
      (id, index) => allIds.indexOf(id) === index
    );

    const dataToUpdate = [...createdProductIds, doc.id];

    await req.payload.update({
      collection: "users",
      id: fullUser.id,
      data: {
        products: dataToUpdate,
      },
    });
  }
};

const isAdminOrHasAccess =
  (): Access =>
  ({ req: { user: _user } }) => {
    const user = _user as User | undefined;

    if (!user) return false;
    if (user.role === "admin") return true;

    const userProductIds = (user.products || []).reduce<Array<string>>(
      (acc, product) => {
        if (!product) return acc;
        if (typeof product === "string") {
          acc.push(product);
        } else {
          acc.push(product.id);
        }
        return acc;
      },
      []
    );
    return {
      id: {
        in: userProductIds,
      },
    };
  };

export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    useAsTitle: "Products",
    description: "Find all your Published Books here.",
    hidden: ({ user }) => user.role !== "admin",
  },
  access: {
    read: isAdminOrHasAccess(),
    update: isAdminOrHasAccess(),
    delete: isAdminOrHasAccess(),
    // create: ({ req }) => req.user.role === "admin",
  },
  hooks: {
    afterChange: [syncUser],
    beforeChange: [
      // addUser,
      // async (args) => {
      //   if (args.operation === "create") {
      //     const data = args.data as Product;
      //     // const createdProduct = await razorpay.orders.create({
      //     //   amount: ,
      //     //   currency: "INR",
      //     // });
      //     const updated: Product = {
      //       ...data,
      //       // razorId: createdProduct.id,
      //       // priceId:createdProduct.
      //     };
      //   } else if (args.operation === "update") {
      //   }
      // },
    ],
  },
  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
      hasMany: false,
      admin: {
        condition: ({ req }) => false,
      },
    },
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      label: "Product Details",
    },
    {
      name: "attributes",
      type: "group",
      label: "Attributes",
      fields: [
        {
          name: "author",
          label: "Author(s) Name(s)",
          type: "text",
        },
        {
          name: "isbn",
          label: "ISBN Number",
          type: "text",
        },
        {
          name: "language",
          label: "Language",
          type: "text",
        },
        {
          name: "publication",
          label: "Publication",
          type: "text",
        },
        {
          name: "pages",
          label: "Number of Pages",
          type: "text",
        },
      ],
    },
    {
      name: "mrp",
      label: "MRP in INR",
      min: 1,
      max: 1000,
      type: "number",
      required: true,
    },
    {
      name: "price",
      label: "Price in INR",
      min: 1,
      // max: 1000,
      type: "number",
      required: true,
    },
    {
      name: "type",
      type: "select",
      required: true,
      label: "Type",
      options: PRODUCT_TYPES.map(({ label, value }) => ({ label, value })),
      // [
      //   {
      //     label: "eBook",
      //     value: "ebook",
      //   },
      //   {
      //     label: "Paperback",
      //     value: "paperback",
      //   },
      // ],
    },
    {
      name: "category",
      type: "select",
      label: "Category",
      options: PRODUCT_CATEGORIES.map(({ label, value }) => ({ label, value })),
      required: true,
    },
    {
      name: "product_files",
      label: "Product File(s)",
      type: "relationship",
      admin: {
        condition: (/*data,*/ siblingData, { user }) => {
          if (siblingData.type === "ebook") {
            return true;
          } else return false;
        },
      },
      required: false,
      relationTo: "product_files",
      hasMany: false,
    },
    {
      name: "stock",
      label: "In Stock?",
      defaultValue: false,
      type: "checkbox",
      admin: {
        condition: (siblingData) => {
          if (siblingData.type === "paperback") {
            return true;
          } else return false;
        },
      },
      required: true,
    },
    {
      name: "approvedForSale",
      label: "Product Status",
      type: "select",
      defaultValue: "pending",
      access: {
        create: ({ req }) => req.user.role === "admin",
        read: ({ req }) => req.user.role === "admin",
        update: ({ req }) => req.user.role === "admin",
      },
      options: [
        {
          label: "Pending Verification",
          value: "pending",
        },
        {
          label: "Approved",
          value: "approved",
        },
        {
          label: "Denied",
          value: "denied",
        },
      ],
    },
    {
      name: "images",
      type: "array",
      label: "Product Images",
      minRows: 1,
      maxRows: 4,
      required: true,
      labels: {
        singular: "Image",
        plural: "Images",
      },
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
  ],
};
