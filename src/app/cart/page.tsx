import type { Metadata } from "next";
import { getServerDict } from "@/i18n/server";
import { CartView } from "@/components/cart/CartView";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getServerDict();
  return { title: t.cart.title };
}

export default function CartPage() {
  return <CartView />;
}
