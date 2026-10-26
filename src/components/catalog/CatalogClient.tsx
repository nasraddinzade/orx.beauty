"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { useLocale } from "@/context/LocaleContext";
import { fmt } from "@/i18n";
import { NO_BRAND, type Category } from "@/data/products";
import {
  applyCatalog,
  facetCounts,
  parseCatalogParams,
  serializeCatalogParams,
  type CatalogState,
  type SortKey,
} from "@/lib/catalog";
import { ProductCard } from "@/components/ProductCard";
import { FilterBar } from "./FilterBar";
import { FilterSheet } from "./FilterSheet";
import { ActiveChips } from "./ActiveChips";

export function CatalogClient() {
  const { t } = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sheetOpen, setSheetOpen] = useState(false);

  const state = useMemo(
    () => parseCatalogParams(new URLSearchParams(searchParams.toString())),
    [searchParams],
  );

  const update = useCallback(
    (next: CatalogState) => {
      const qs = serializeCatalogParams(next);
      router.replace(qs ? `/catalog?${qs}` : "/catalog", { scroll: false });
    },
    [router],
  );

  const toggleCat = (c: Category) =>
    update({
      ...state,
      cats: state.cats.includes(c) ? state.cats.filter((x) => x !== c) : [...state.cats, c],
    });
  const toggleBrand = (b: string) =>
    update({
      ...state,
      brands: state.brands.includes(b)
        ? state.brands.filter((x) => x !== b)
        : [...state.brands, b],
    });
  const setSort = (sort: SortKey) => update({ ...state, sort });
  const clearAll = () => update({ cats: [], brands: [], sort: state.sort });

  const list = useMemo(() => applyCatalog(state), [state]);
  const counts = useMemo(() => facetCounts(state), [state]);
  const activeCount = state.cats.length + state.brands.length;

  const brandLabel = (b: string) => (b === NO_BRAND ? t.product.noBrand : b);

  const filterProps = {
    state,
    counts,
    toggleCat,
    toggleBrand,
    setSort,
    brandLabel,
    resultCount: list.length,
  };

  return (
    <div className="mx-auto max-w-6xl px-4">
      <nav aria-label="breadcrumb" className="pt-4 text-xs text-muted">
        <Link href="/" className="hover:text-teal">
          {t.common.home}
        </Link>
        <span className="mx-1.5">/</span>
        <span className="text-navy">{t.catalog.title}</span>
      </nav>
      <div className="flex items-baseline justify-between gap-3 pb-3 pt-1">
        <h1 className="font-serif text-2xl font-semibold text-navy sm:text-3xl">
          {t.catalog.title}
        </h1>
        <span className="text-sm text-muted">{fmt(t.catalog.results, { n: list.length })}</span>
      </div>

      <FilterBar
        {...filterProps}
        activeCount={activeCount}
        onOpenSheet={() => setSheetOpen(true)}
      />

      {activeCount > 0 && (
        <ActiveChips
          state={state}
          brandLabel={brandLabel}
          onRemoveCat={toggleCat}
          onRemoveBrand={toggleBrand}
          onClear={clearAll}
        />
      )}

      {list.length === 0 ? (
        <div className="rounded-2xl bg-ivory px-6 py-14 text-center shadow-soft">
          <p className="text-navy">{t.catalog.empty}</p>
          <button
            type="button"
            onClick={clearAll}
            className="mt-4 inline-flex h-11 items-center rounded-xl bg-navy px-5 text-sm font-semibold text-ivory hover:bg-teal"
          >
            {t.catalog.clearAll}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 pt-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {list.map((p, i) => (
            <ProductCard key={p.slug} product={p} priority={i < 4} />
          ))}
        </div>
      )}

      <FilterSheet
        {...filterProps}
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        onClear={clearAll}
      />
    </div>
  );
}
