// import { BeforeChangeHook } from "payload/dist/collections/config/types";
// import { PRODUCT_CATEGORIES } from "../../lib/config";
// import { Access, CollectionConfig, PayloadRequest } from "payload/types";
// import { Product, User } from "../../payload-types";

// //TO - DO: Link Products to Library

// // const addUser: BeforeChangeHook<Product> = async ({ req, data }) => {
// //   const user = req.user;

// //   return { ...data, user: user.id };
// // };

// // const yourOwn: Access = ({ req: { user } }) => {
// //   if (user.role === "admin") return true;

// //   return {
// //     user: {
// //       equals: user?.id,
// //     },
// //   };
// // };

// const purchasedProducts = async (req: PayloadRequest) => {
//   const user = req.user as User | null;
//   if (!user) return null;

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

//   return orders
//     .map((order) => {
//       return order.products.map((product) => {
//         if (typeof product === "string")
//           return req.payload.logger.error(
//             "Search Depth not sufficient to find Purchased File IDs"
//           );

//         return product;
//       });
//     })
//     .flat();
// };
// // if(getPurchasedProducts===null)
// // const purchasedProducts:(void | Product)[] = getPurchasedProducts
// const adminAndPurchased: Access = async ({ req }) => {
//   const user = req.user as User | null;

//   if (user?.role === "admin") return true;
//   if (!user) return false;

//   // const { docs: products } = await req.payload.find({
//   //   collection: "products",
//   //   depth: 0,
//   //   where: {
//   //     user: {
//   //       equals: user.id,
//   //     },
//   //   },
//   // });

//   // const ownProductFileIds = products.map((prod) => prod.product_files).flat();

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
//     .flat();import { BeforeChangeHook } from "payload/dist/collections/config/types";
// import { PRODUCT_CATEGORIES } from "../../lib/config";
// import { Access, CollectionConfig, PayloadRequest } from "payload/types";
// import { Product, User } from "../../payload-types";

// //TO - DO: Link Products to Library

// // const addUser: BeforeChangeHook<Product> = async ({ req, data }) => {
// //   const user = req.user;

// //   return { ...data, user: user.id };
// // };

// // const yourOwn: Access = ({ req: { user } }) => {
// //   if (user.role === "admin") return true;

// //   return {
// //     user: {
// //       equals: user?.id,
// //     },
// //   };
// // };

// const purchasedProducts = async (req: PayloadRequest) => {
//   const user = req.user as User | null;
//   if (!user) return null;

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

//   return orders
//     .map((order) => {
//       return order.products.map((product) => {
//         if (typeof product === "string")
//           return req.payload.logger.error(
//             "Search Depth not sufficient to find Purchased File IDs"
//           );

//         return product;
//       });
//     })
//     .flat();
// };
// // if(getPurchasedProducts===null)
// // const purchasedProducts:(void | Product)[] = getPurchasedProducts
// const adminAndPurchased: Access = async ({ req }) => {
//   const user = req.user as User | null;

//   if (user?.role === "admin") return true;
//   if (!user) return false;

//   // const { docs: products } = await req.payload.find({
//   //   collection: "products",
//   //   depth: 0,
//   //   where: {
//   //     user: {
//   //       equals: user.id,
//   //     },
//   //   },
//   // });

//   // const ownProductFileIds = products.map((prod) => prod.product_files).flat();

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

// export const PurchasedProducts: CollectionConfig = {
//   slug: "purchased_products",
//   admin: {
//     useAsTitle: "Purchased Products",
//     description: "Find all your Purchased Books here.",
//   },
//   access: {
//     read: adminAndPurchased,
//     update: ({ req }) => req.user.role === "admin",
//     delete: ({ req }) => req.user.role === "admin",
//     create: ({ req }) => req.user.role === "admin",
//   },
//   fields: [
//     {
//       name: "user",
//       type: "relationship",
//       relationTo: "users",
//       required: true,
//       hasMany: false,
//       admin: {
//         // condition: ({ req }) => false,
//       },
//     },
//     {
//       name: "name",
//       label: "Name",
//       type: "text",
//       required: true,
//     },
//     {
//       name: "description",
//       type: "textarea",
//       label: "Product Details",
//     },
//     {
//       name: "price",
//       label: "Price in INR",
//       min: 0,
//       max: 1000,
//       type: "number",
//       required: true,
//     },
//     {
//       name: "type",
//       type: "select",
//       label: "Type",
//       options: [
//         {
//           label: "eBook",
//           value: "ebook",
//         },
//         {
//           label: "Paperback",
//           value: "paperback",
//         },
//       ],
//     },
//     {
//       name: "category",
//       type: "select",
//       label: "Category",
//       options: PRODUCT_CATEGORIES.map(({ label, value }) => ({ label, value })),
//       required: true,
//     },
//     {
//       name: "product_files",
//       label: "Product File(s)",
//       type: "relationship",
//       admin: {
//         condition: (/*data,*/ siblingData, { user }) => {
//           if (siblingData.type === "ebook") {
//             return true;
//           } else return false;
//         },
//       },
//       required: false,
//       relationTo: "product_files",
//       hasMany: false,
//     },
//     {
//       name: "approvedForSale",
//       label: "Product Status",
//       type: "select",
//       defaultValue: "pending",
//       access: {
//         create: ({ req }) => req.user.role === "admin",
//         read: ({ req }) => req.user.role === "admin",
//         update: ({ req }) => req.user.role === "admin",
//       },
//       options: [
//         {
//           label: "Pending Verification",
//           value: "pending",
//         },
//         {
//           label: "Approved",
//           value: "approved",
//         },
//         {
//           label: "Denied",
//           value: "denied",
//         },
//       ],
//     },
//     {
//       name: "images",
//       type: "array",
//       label: "Product Images",
//       minRows: 1,
//       maxRows: 4,
//       required: true,
//       labels: {
//         singular: "Image",
//         plural: "Images",
//       },
//       fields: [
//         {
//           name: "image",
//           type: "upload",
//           relationTo: "media",
//           required: true,
//         },
//       ],
//     },
//   ],
// };

//   return {
//     id: {
//       in: [...purchasedProductIds],
//     },
//   };
// };

// export const PurchasedProducts: CollectionConfig = {
//   slug: "purchased_products",
//   admin: {
//     useAsTitle: "Purchased Products",
//     description: "Find all your Purchased Books here.",
//   },
//   access: {
//     read: adminAndPurchased,
//     update: ({ req }) => req.user.role === "admin",
//     delete: ({ req }) => req.user.role === "admin",
//     create: ({ req }) => req.user.role === "admin",
//   },
//   fields: [
//     {
//       name: "user",
//       type: "relationship",
//       relationTo: "users",
//       required: true,
//       hasMany: false,
//       admin: {
//         // condition: ({ req }) => false,
//       },
//     },
//     {
//       name: "name",
//       label: "Name",
//       type: "text",
//       required: true,
//     },
//     {
//       name: "description",
//       type: "textarea",
//       label: "Product Details",
//     },
//     {
//       name: "price",
//       label: "Price in INR",
//       min: 0,
//       max: 1000,
//       type: "number",
//       required: true,
//     },
//     {
//       name: "type",
//       type: "select",
//       label: "Type",
//       options: [
//         {
//           label: "eBook",
//           value: "ebook",
//         },
//         {
//           label: "Paperback",
//           value: "paperback",
//         },
//       ],
//     },
//     {
//       name: "category",
//       type: "select",
//       label: "Category",
//       options: PRODUCT_CATEGORIES.map(({ label, value }) => ({ label, value })),
//       required: true,
//     },
//     {
//       name: "product_files",
//       label: "Product File(s)",
//       type: "relationship",
//       admin: {
//         condition: (/*data,*/ siblingData, { user }) => {
//           if (siblingData.type === "ebook") {
//             return true;
//           } else return false;
//         },
//       },
//       required: false,
//       relationTo: "product_files",
//       hasMany: false,
//     },
//     {
//       name: "approvedForSale",
//       label: "Product Status",
//       type: "select",
//       defaultValue: "pending",
//       access: {
//         create: ({ req }) => req.user.role === "admin",
//         read: ({ req }) => req.user.role === "admin",
//         update: ({ req }) => req.user.role === "admin",
//       },
//       options: [
//         {
//           label: "Pending Verification",
//           value: "pending",
//         },
//         {
//           label: "Approved",
//           value: "approved",
//         },
//         {
//           label: "Denied",
//           value: "denied",
//         },
//       ],
//     },
//     {
//       name: "images",
//       type: "array",
//       label: "Product Images",
//       minRows: 1,
//       maxRows: 4,
//       required: true,
//       labels: {
//         singular: "Image",
//         plural: "Images",
//       },
//       fields: [
//         {
//           name: "image",
//           type: "upload",
//           relationTo: "media",
//           required: true,
//         },
//       ],
//     },
//   ],
// };
