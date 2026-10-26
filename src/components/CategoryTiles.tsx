"use client";

import Link from "next/link";
import { getActiveCategories, products, type Category } from "@/data/products";
import { useLocale } from "@/context/LocaleContext";
import { fmt } from "@/i18n";

/** Светлые пастельные плитки: фон, цвет текста и цвет декоративного круга. */
const TILE: Record<Category, string> = {
  uz: "bg-ivory text-navy [--dot:var(--rose)]",
  goz: "bg-cream text-navy [--dot:var(--navy)]",
  dodaq: "bg-rose/40 text-navy [--dot:var(--rose)]",
  enlik: "bg-ivory text-navy [--dot:var(--gold)]",
  baxim: "bg-teal/10 text-navy [--dot:var(--teal)]",
  sac: "bg-gold/15 text-navy [--dot:var(--gold)]",
  firca: "bg-cream text-navy [--dot:var(--muted)]",
  dest: "bg-rose/25 text-navy [--dot:var(--gold)]",
};

const ACTIVE = getActiveCategories();

const counts = products.reduce<Record<string, number>>((acc, p) => {
  acc[p.category] = (acc[p.category] ?? 0) + 1;
  return acc;
}, {});

export function CategoryTiles({ compact = false }: { compact?: boolean }) {
  const { t } = useLocale();
  return (
    <div className={`grid grid-cols-2 gap-3 ${compact ? "sm:grid-cols-4" : "sm:grid-cols-4"}`}>
      {ACTIVE.map((c) => (
        <Link
          key={c}
          href={`/catalog?cat=${c}`}
          className={`group relative flex min-h-[88px] flex-col justify-end overflow-hidden rounded-2xl border border-gold/20 p-3.5 shadow-soft transition-shadow hover:shadow-card ${TILE[c]} ${
            compact ? "min-h-[72px]" : "sm:min-h-[120px]"
          } ${ACTIVE.length % 2 ? "last:col-span-2 sm:last:col-span-1" : ""}`}
        >
          <span
            aria-hidden="true"
            className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-(--dot) opacity-40 transition-transform group-hover:scale-125"
          />
          <span className="font-serif text-base font-semibold leading-tight sm:text-lg">
            {t.categories[c]}
          </span>
          <span className="mt-0.5 text-xs text-muted">
            {fmt(t.product.count, { n: counts[c] ?? 0 })}
          </span>
        </Link>
      ))}
    </div>
  );
}
