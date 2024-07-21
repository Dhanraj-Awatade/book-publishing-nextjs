import { CollectionConfig } from "payload/types";

export const Categories: CollectionConfig = {
  slug: "categories",
  fields: [
    {
      name: "label",
      label: "Category",
      type: "text",
      required: true,
    },
    {
      name: "Value",
      label: "Category",
      type: "text",
      required: true,
    },
  ],
};
