"use client";

import Link from "next/link";
import { useLocale } from "@/context/LocaleContext";

export default function ProductNotFound() {
  const { t } = useLocale();
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 text-center">
      <h1 className="font-serif text-2xl font-semibold text-navy">{t.product.notFound}</h1>
      <Link
        href="/catalog"
        className="mt-5 inline-flex h-11 items-center rounded-xl bg-navy px-5 text-sm font-semibold text-ivory hover:bg-teal"
      >
        {t.cart.goCatalog}
      </Link>
    </div>
  );
}
