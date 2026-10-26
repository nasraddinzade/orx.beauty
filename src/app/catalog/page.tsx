import { Suspense } from "react";
import type { Metadata } from "next";
import { getServerDict } from "@/i18n/server";
import { CatalogClient } from "@/components/catalog/CatalogClient";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getServerDict();
  return { title: t.catalog.title };
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-6xl px-4 py-10" />}>
      <CatalogClient />
    </Suspense>
  );
}
