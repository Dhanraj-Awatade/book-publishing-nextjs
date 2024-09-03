import { User } from "@/payload-types";
import { Access, CollectionConfig } from "payload/types";

const isAdminOrHasAccess: Access = ({ req }) => {
  const user = req.user as User | undefined;
  if (!user) return false;
  if (user.role === "admin") return true;
  if (user.role === "editor") return true;

  // const addressUserIds = (data || []).reduce<Array<string>>(
  //   (acc, address) => {
  //     if (!address) return acc;

  //     if (typeof address === "string") {
  //       acc.push(address);
  //     } else {
  //       acc.push(address.id);
  //     }

  //     return acc;
  //   },
  //   []
  // );
  // const addressUser = data.user;

  return {
    user: {
      equals: req.user.id,
    },
  };
};

export const Addresses: CollectionConfig = {
  // access: {
  //   create: () => true,
  //   update: () => true,
  // },
  admin: {
    hidden: () => false,
  },
  slug: "addresses",
  access: {
    create: () => true,
    read: isAdminOrHasAccess,
    update: isAdminOrHasAccess,
    delete: isAdminOrHasAccess,
  },
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
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      hasMany: false,
      access: {
        read: () => true,
        update: ({ req }) => req.user.role === "admin",
      },
      admin: {
        // condition: (req) => req.user.role === "admin",
      },
    },
  ],
};
