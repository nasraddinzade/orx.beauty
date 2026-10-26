"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { products } from "@/data/products";
import { useLocale } from "@/context/LocaleContext";
import { ProductCard } from "@/components/ProductCard";
import { ChevronLeft, ChevronRight } from "@/components/Icons";

type Tab = "new" | "best" | "sale";
const TABS: Tab[] = ["new", "best", "sale"];

export function HomeCarousel() {
  const { t } = useLocale();
  const [tab, setTab] = useState<Tab>("new");
  const scroller = useRef<HTMLDivElement>(null);

  const list = useMemo(() => {
    switch (tab) {
      case "new":
        return products.filter((p) => p.isNew);
      case "best":
        return products.filter((p) => p.isBestseller);
      case "sale":
        return products.filter((p) => p.oldPrice !== undefined);
    }
  }, [tab]);

  const labels: Record<Tab, string> = {
    new: t.home.tabNew,
    best: t.home.tabBest,
    sale: t.home.tabSale,
  };

  function scrollBy(dir: 1 | -1) {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  }

  return (
    <section className="mt-10">
      <div className="flex items-end justify-between gap-3">
        <div
          role="tablist"
          className="no-scrollbar -mx-4 flex gap-1 overflow-x-auto px-4 sm:mx-0 sm:px-0"
        >
          {TABS.map((key) => {
            const active = key === tab;
            return (
              <button
                key={key}
                role="tab"
                type="button"
                aria-selected={active}
                onClick={() => {
                  setTab(key);
                  scroller.current?.scrollTo({ left: 0 });
                }}
                className={`shrink-0 whitespace-nowrap rounded-full px-3.5 py-2 font-serif text-base font-semibold transition-colors sm:text-lg ${
                  active ? "bg-navy text-ivory" : "text-navy hover:bg-ivory"
                }`}
              >
                {labels[key]}
              </button>
            );
          })}
        </div>
        <div className="hidden shrink-0 items-center gap-1 md:flex">
          <button
            type="button"
            aria-label={t.home.prev}
            onClick={() => scrollBy(-1)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 bg-ivory text-navy hover:bg-cream"
          >
            <ChevronLeft />
          </button>
          <button
            type="button"
            aria-label={t.home.next}
            onClick={() => scrollBy(1)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 bg-ivory text-navy hover:bg-cream"
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      <div
        ref={scroller}
        className="no-scrollbar -mx-4 mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0"
      >
        {list.map((p) => (
          <ProductCard
            key={p.slug}
            product={p}
            className="w-[46%] shrink-0 snap-start sm:w-[220px]"
          />
        ))}
      </div>

      <div className="mt-2 text-right">
        <Link
          href={tab === "sale" ? "/catalog?sort=asc" : "/catalog"}
          className="text-sm font-semibold text-navy underline decoration-gold underline-offset-4 hover:decoration-rose"
        >
          {t.home.seeAll} →
        </Link>
      </div>
    </section>
  );
}
