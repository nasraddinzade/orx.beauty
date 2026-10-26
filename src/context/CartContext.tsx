"use client";

import { createContext, useContext, useMemo, useSyncExternalStore } from "react";
import { getProduct, type Product } from "@/data/products";
import * as store from "./cart-store";

export type CartLine = { product: Product; qty: number };

type CartContextValue = {
  /** false во время SSR и первой отрисовки — показываем скелетон, а не пустую корзину. */
  hydrated: boolean;
  lines: CartLine[];
  count: number;
  subtotal: number;
  add: (slug: string, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const noopSubscribe = () => () => {};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const items = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot,
  );
  // true только после гидратации — без расхождения разметки и без скачка.
  const hydrated = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );

  const value = useMemo<CartContextValue>(() => {
    const lines: CartLine[] = [];
    for (const item of items) {
      const product = getProduct(item.slug);
      if (product) lines.push({ product, qty: item.qty });
    }
    const count = lines.reduce((s, l) => s + l.qty, 0);
    const subtotal = lines.reduce((s, l) => s + l.product.price * l.qty, 0);
    return {
      hydrated,
      lines,
      count,
      subtotal: Math.round(subtotal * 100) / 100,
      add: store.addItem,
      setQty: store.setQty,
      remove: store.removeItem,
      clear: store.clearCart,
    };
  }, [items, hydrated]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
