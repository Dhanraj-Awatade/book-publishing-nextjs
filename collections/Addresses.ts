import { CollectionConfig } from "payload/types";

export const Addresses: CollectionConfig = {
  //   admin: {
  //     condition: () => true,
  //   },
  // access: {
  //   create: () => true,
  //   update: () => true,
  // },
  admin: {
    hidden: () => false,
  },
  slug: "addresses",
  fields: [
    {
      name: "adressName",
      type: "text",
      required: true,
      //   defaultValue: "Untitled Address",
    },
    {
      name: "house",
      type: "text",
      required: true,
    },
    {
      name: "road",
      type: "text",
    },
    {
      name: "pin",
      type: "text",
      required: true,
    },
    {
      name: "state",
      type: "text",
      required: true,
    },
  ],
};
