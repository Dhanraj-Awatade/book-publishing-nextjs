import {
    AfterChangeHook,
    BeforeChangeHook,
} from "payload/dist/collections/config/types";
import { PRODUCT_CATEGORIES, PRODUCT_TYPES } from "../../lib/config";
import { Access, CollectionConfig } from "payload/types";
import { Product, User } from "../../payload-types";
import payload from "payload";

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
        if (user.role === "editor") return true;

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
        // hidden: ({ user }) => user.role === "admin",
        hidden: ({ user }) => {
            if (user.role === "admin" || user.role === "editor") return false;
            else return true;
        },
    },
    access: {
        read: isAdminOrHasAccess(),
        update: isAdminOrHasAccess(),
        delete: isAdminOrHasAccess(),
        // create: ({ req }) => req.user.role === "admin",
    },
    hooks: {
        afterChange: [syncUser],
        beforeChange: [],
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
                // req.user.role === "admin",
            },
            // access: {
            //   read: () => true,
            //   update: ({ req }) => req.user.role === "admin",
            // },
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
            min: 0,
            // max: 1000,
            type: "number",
            required: true,
        },
        {
            name: "type",
            type: "select",
            required: true,
            label: "Type",
            options: PRODUCT_TYPES.map(({ label, value }) => ({
                label,
                value,
            })),
        },
        {
            name: "category",
            type: "select",
            label: "Category",
            options: PRODUCT_CATEGORIES.map(({ label, value }) => ({
                label,
                value,
            })),
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
            name: "dimensions",
            label: "Dimensions",
            type: "group",
            fields: [
                {
                    name: "length",
                    type: "number",
                },
                {
                    name: "breadth",
                    type: "number",
                },
                {
                    name: "height",
                    type: "number",
                },
                {
                    name: "weight",
                    type: "number",
                },
            ],
            // admin: {
            //   condition: ( siblingData, { user }) => {
            //     if (siblingData.type === "paperback") {
            //       return true;
            //     } else return false;
            //   },
            // },
        },
        {
            name: "stock",
            label: "In Stock?",
            defaultValue: false,
            type: "checkbox",
            // admin: {
            //   condition: (siblingData) => {
            //     if (siblingData.type === "paperback") {
            //       return true;
            //     } else return false;
            //   },
            // },
            required: true,
        },
        {
            name: "approvedForSale",
            label: "Product Status",
            type: "select",
            defaultValue: "pending",
            admin: {
                condition: () => true,
            },
            access: {
                create: ({ req }) =>
                    req.user.role === "admin" || req.user.role === "editor",
                read: ({ req }) =>
                    req.user.role === "admin" || req.user.role === "editor",
                update: ({ req }) =>
                    req.user.role === "admin" || req.user.role === "editor",
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
