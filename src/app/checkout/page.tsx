import type { Metadata } from "next";
import { getServerDict } from "@/i18n/server";
import { CheckoutFlow } from "@/components/checkout/CheckoutFlow";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getServerDict();
  return { title: t.checkout.title };
}

export default function CheckoutPage() {
  return <CheckoutFlow />;
}
