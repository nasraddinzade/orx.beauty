"use client";

import Link from "next/link";
import { CATEGORIES, products, type Category } from "@/data/products";
import { useLocale } from "@/context/LocaleContext";
import { fmt } from "@/i18n";

/** Фоны плиток по категориям (те же цвета, что у плейсхолдеров). */
const TILE: Record<Category, string> = {
  uz: "bg-cream text-navy",
  goz: "bg-navy text-cream",
  dodaq: "bg-rose text-navy",
  enlik: "bg-cream text-gold",
  baxim: "bg-teal text-ivory",
  sac: "bg-ivory text-teal",
  firca: "bg-muted text-ivory",
  dest: "bg-gold text-navy",
};

const counts = products.reduce<Record<string, number>>((acc, p) => {
  acc[p.category] = (acc[p.category] ?? 0) + 1;
  return acc;
}, {});

export function CategoryTiles({ compact = false }: { compact?: boolean }) {
  const { t } = useLocale();
  return (
    <div className={`grid grid-cols-2 gap-3 ${compact ? "sm:grid-cols-4" : "sm:grid-cols-4"}`}>
      {CATEGORIES.map((c) => (
        <Link
          key={c}
          href={`/catalog?cat=${c}`}
          className={`group relative flex min-h-[88px] flex-col justify-end overflow-hidden rounded-2xl border border-gold/20 p-3.5 shadow-soft transition-shadow hover:shadow-card ${TILE[c]} ${
            compact ? "min-h-[72px]" : "sm:min-h-[120px]"
          }`}
        >
          <span
            aria-hidden="true"
            className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-current opacity-10 transition-transform group-hover:scale-125"
          />
          <span className="font-serif text-base font-semibold leading-tight sm:text-lg">
            {t.categories[c]}
          </span>
          <span className="mt-0.5 text-xs opacity-70">
            {fmt(t.product.count, { n: counts[c] ?? 0 })}
          </span>
        </Link>
      ))}
    </div>
  );
}
