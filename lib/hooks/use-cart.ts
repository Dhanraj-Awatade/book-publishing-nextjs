import { Product } from "../../payload-types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type CartItem = {
  product: Product;
};

type CartState = {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (product) =>
        set((state) => {
          return { items: [...state.items, { product }] };
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== id),
        })),
      clearCart: () => set({ items: [] }),
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
