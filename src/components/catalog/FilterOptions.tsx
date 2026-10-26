"use client";

import { CATEGORIES, NO_BRAND, getBrands, type Category } from "@/data/products";
import { useLocale } from "@/context/LocaleContext";
import type { CatalogState } from "@/lib/catalog";

export type FilterCommonProps = {
  state: CatalogState;
  counts: { cats: Record<string, number>; brands: Record<string, number> };
  toggleCat: (c: Category) => void;
  toggleBrand: (b: string) => void;
  brandLabel: (b: string) => string;
};

const BRAND_VALUES = [...getBrands(), NO_BRAND];

function Option({
  label,
  count,
  checked,
  onChange,
}: {
  label: string;
  count: number;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label
      className={`flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 text-sm transition-colors hover:bg-cream ${
        count === 0 && !checked ? "opacity-50" : ""
      }`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4.5 w-4.5 shrink-0 accent-navy"
      />
      <span className="flex-1 text-navy">{label}</span>
      <span className="text-xs tabular-nums text-muted">{count}</span>
    </label>
  );
}

export function CategoryOptions({ state, counts, toggleCat }: FilterCommonProps) {
  const { t } = useLocale();
  return (
    <div>
      {CATEGORIES.map((c) => (
        <Option
          key={c}
          label={t.categories[c]}
          count={counts.cats[c] ?? 0}
          checked={state.cats.includes(c)}
          onChange={() => toggleCat(c)}
        />
      ))}
    </div>
  );
}

export function BrandOptions({ state, counts, toggleBrand, brandLabel }: FilterCommonProps) {
  return (
    <div>
      {BRAND_VALUES.map((b) => (
        <Option
          key={b}
          label={brandLabel(b)}
          count={counts.brands[b] ?? 0}
          checked={state.brands.includes(b)}
          onChange={() => toggleBrand(b)}
        />
      ))}
    </div>
  );
}
