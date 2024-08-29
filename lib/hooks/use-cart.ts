import { Product } from "../../payload-types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type CartItem = {
  product: Product;
  productCount: number;
};

type CartState = {
  items: CartItem[];
  addItem: (product: Product, productCount: number) => void;
  removeItem: (productId: string) => void;
  removeItemCompletely: (productId: string) => void;
  clearCart: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (product, productCount) =>
        set((state) => {
          // return {items:
          if (state.items.map(({ product }) => product).includes(product)) {
            return {
              items: [
                ...state.items.map((item) => {
                  if (item.product.id === product.id) {
                    if (product.type === "paperback")
                      return {
                        product: item.product,
                        productCount: item.productCount + 1,
                      };
                    else
                      return {
                        product: item.product,
                        productCount: 1,
                      };
                  } else return item;
                }),
              ],
            };
            // state.items.map((item) => item);
            // : {items: [...state.items, { product, productCount }]}}
          } else return { items: [...state.items, { product, productCount }] };
        }),

      removeItem: (id) =>
        set((state) => ({
          // items: state.items.filter((item) => item.product.id !== id),
          items: state.items
            .map(({ product, productCount }) =>
              product.id === id && productCount > 0
                ? { product, productCount: productCount - 1 }
                : { product, productCount }
            )
            .filter(({ productCount }) => productCount !== 0),
        })),
      clearCart: () => set({ items: [] }),
      removeItemCompletely: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== id),
        })),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

//To-Do:Add Qty Logic in Cart

// import { Product } from "../../payload-types";
// import { create } from "zustand";
// import { createJSONStorage, persist } from "zustand/middleware";
// //TO-DO: Implement Same Product Multiple Count
// export type CartItem = {
//   product: Product;
//   qty: number;
// };

// type CartState = {
//   items: CartItem[];
//   // qty: number;
//   addItem: (newProduct: Product) => void;
//   // addExistingItem: (product: Product) => void;
//   removeItem: (productId: string) => void;
//   clearCart: () => void;
// };

// export const useCart = create<CartState>()(
//   persist(
//     (set) => ({
//       items: [],
//       qty: 0,
//       addItem: (newProduct) =>
//         set((state) => {
//           // const existingProductIds = state.items.map(
//           //   ({ product }) => product.id
//           // );
//           // if (existingProductIds.includes(newProduct.id)) {
//           //   const existingProductIndex = state.items.findIndex(
//           //     ({ product }) => newProduct
//           //   );
//           // const newArray= state.items[existingProductIndex].qty + 1;
//           const newArray = state.items.map(({ product, qty }) => {
//             if (product === newProduct) {
//               return { product: product, qty: qty + 1 };
//             } else {
//               return { product: product, qty: qty };
//             }
//           });
//           return { items: [...state.items, newArray] };
//           //   return { items: [...state.items,] };
//           // } else
//           //   return { items: [...state.items, { product: newProduct, qty: 1 }] };
//         }),
//       // addExistingItem: (product) =>
//       //   set((state) => {
//       //     return;
//       //   }),
//       removeItem: (id) =>
//         set((state) => ({
//           items: state.items.filter((item) => item.product.id !== id),
//         })),
//       clearCart: () => set({ items: [] }),
//     }),
//     {
//       name: "cart-storage",
//       storage: createJSONStorage(() => localStorage),
//     }
//   )
// );
