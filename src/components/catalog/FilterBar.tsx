"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/context/LocaleContext";
import type { SortKey } from "@/lib/catalog";
import { ChevronDown, FilterIcon } from "@/components/Icons";
import { BrandOptions, CategoryOptions, type FilterCommonProps } from "./FilterOptions";

type Props = FilterCommonProps & {
  setSort: (s: SortKey) => void;
  activeCount: number;
  resultCount: number;
  onOpenSheet: () => void;
};

function Dropdown({
  label,
  count,
  children,
}: {
  label: string;
  count: number;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex h-10 items-center gap-1.5 rounded-xl border px-3.5 text-sm font-medium transition-colors ${
          count > 0
            ? "border-rose bg-rose/25 text-navy"
            : "border-gold/40 bg-ivory text-navy hover:bg-cream"
        }`}
      >
        {label}
        {count > 0 && (
          <span className="rounded-full bg-navy px-1.5 text-[11px] font-bold text-ivory">
            {count}
          </span>
        )}
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute left-0 top-full z-30 mt-1.5 w-64 rounded-xl border border-gold/30 bg-ivory p-2 shadow-card">
          {children}
        </div>
      )}
    </div>
  );
}

export function FilterBar(props: Props) {
  const { t } = useLocale();
  const { state, setSort, activeCount, onOpenSheet } = props;

  const sortSelect = (
    <label className="inline-flex h-10 items-center gap-2 rounded-xl border border-gold/40 bg-ivory pl-3 pr-2 text-sm text-navy">
      <span className="hidden text-muted sm:inline">{t.catalog.sort}:</span>
      <select
        value={state.sort}
        onChange={(e) => setSort(e.target.value as SortKey)}
        aria-label={t.catalog.sort}
        className="max-w-[150px] bg-transparent pr-1 text-sm font-medium outline-none"
      >
        <option value="default">{t.catalog.sortDefault}</option>
        <option value="asc">{t.catalog.sortAsc}</option>
        <option value="desc">{t.catalog.sortDesc}</option>
      </select>
    </label>
  );

  return (
    <div className="sticky top-14 z-30 -mx-4 border-b border-gold/20 bg-cream/95 px-4 py-2.5 backdrop-blur md:top-16">
      {/* Телефон: кнопка шторки + сортировка */}
      <div className="flex items-center justify-between gap-2 md:hidden">
        <button
          type="button"
          onClick={onOpenSheet}
          className={`inline-flex h-10 items-center gap-2 rounded-xl border px-3.5 text-sm font-medium ${
            activeCount > 0
              ? "border-rose bg-rose/25 text-navy"
              : "border-gold/40 bg-ivory text-navy"
          }`}
        >
          <FilterIcon className="h-4.5 w-4.5" />
          {t.catalog.filters}
          {activeCount > 0 && (
            <span className="rounded-full bg-navy px-1.5 text-[11px] font-bold text-ivory">
              {activeCount}
            </span>
          )}
        </button>
        {sortSelect}
      </div>

      {/* Планшет и десктоп: выпадающие списки */}
      <div className="hidden items-center gap-2 md:flex">
        <Dropdown label={t.catalog.category} count={state.cats.length}>
          <CategoryOptions {...props} />
        </Dropdown>
        <Dropdown label={t.catalog.brand} count={state.brands.length}>
          <div className="max-h-80 overflow-y-auto">
            <BrandOptions {...props} />
          </div>
        </Dropdown>
        <div className="ml-auto">{sortSelect}</div>
      </div>
    </div>
  );
}
