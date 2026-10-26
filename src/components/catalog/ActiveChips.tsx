"use client";

import type { Category } from "@/data/products";
import { useLocale } from "@/context/LocaleContext";
import { fmt } from "@/i18n";
import type { CatalogState } from "@/lib/catalog";
import { CloseIcon } from "@/components/Icons";

type Props = {
  state: CatalogState;
  brandLabel: (b: string) => string;
  onRemoveCat: (c: Category) => void;
  onRemoveBrand: (b: string) => void;
  onClear: () => void;
};

function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
  const { t } = useLocale();
  return (
    <span className="inline-flex h-8 items-center gap-1 rounded-full bg-navy pl-3 pr-1.5 text-xs font-medium text-ivory">
      {label}
      <button
        type="button"
        onClick={onRemove}
        aria-label={fmt(t.catalog.removeFilter, { name: label })}
        className="inline-flex h-5 w-5 items-center justify-center rounded-full hover:bg-ivory/20"
      >
        <CloseIcon className="h-3 w-3" />
      </button>
    </span>
  );
}

export function ActiveChips({ state, brandLabel, onRemoveCat, onRemoveBrand, onClear }: Props) {
  const { t } = useLocale();
  return (
    <div className="flex flex-wrap items-center gap-2 pt-3">
      {state.cats.map((c) => (
        <Chip key={`c-${c}`} label={t.categories[c]} onRemove={() => onRemoveCat(c)} />
      ))}
      {state.brands.map((b) => (
        <Chip key={`b-${b}`} label={brandLabel(b)} onRemove={() => onRemoveBrand(b)} />
      ))}
      <button
        type="button"
        onClick={onClear}
        className="h-8 rounded-full px-3 text-xs font-semibold text-teal hover:bg-ivory"
      >
        {t.catalog.clearAll}
      </button>
    </div>
  );
}
