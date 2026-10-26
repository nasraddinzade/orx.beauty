"use client";

import { useLocale } from "@/context/LocaleContext";
import { CategoryTiles } from "@/components/CategoryTiles";

export function HomeCategories() {
  const { t } = useLocale();
  return (
    <section className="mt-8">
      <h2 className="mb-3 font-serif text-2xl font-semibold text-navy">
        {t.home.categories}
      </h2>
      <CategoryTiles />
    </section>
  );
}
