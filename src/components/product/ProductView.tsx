"use client";

import { useRef, useState } from "react";
import type { Product } from "@/data/products";
import { BOL_ODE_MAX_MONTHS } from "@/config";
import { useLocale } from "@/context/LocaleContext";
import { useCart } from "@/context/CartContext";
import { fmt } from "@/i18n";
import { formatPrice, monthlyPayment } from "@/lib/format";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Price } from "@/components/Price";
import { QtyStepper } from "@/components/QtyStepper";
import { ProductCard } from "@/components/ProductCard";
import { CheckIcon, ChevronDown } from "@/components/Icons";
import { Gallery } from "./Gallery";

type Props = { product: Product; related: Product[] };

export function ProductView({ product, related }: Props) {
  const { t, tr } = useLocale();
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const timer = useRef<number | null>(null);

  const name = tr(product.name);
  const inStock = true;

  function handleAdd() {
    add(product.slug, qty);
    setAdded(true);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setAdded(false), 1500);
  }

  const addButton = (
    <button
      type="button"
      onClick={handleAdd}
      className={`inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold transition-colors ${
        added ? "bg-rose/35 text-navy" : "bg-navy text-ivory hover:bg-rose hover:text-navy"
      }`}
    >
      {added ? (
        <>
          <CheckIcon className="h-5 w-5" />
          {t.product.added}
        </>
      ) : (
        fmt(t.product.addToCart, { price: formatPrice(product.price * qty) })
      )}
    </button>
  );

  return (
    <div className="mx-auto max-w-6xl px-4 pb-28 md:pb-6">
      <Breadcrumbs
        items={[
          { label: t.common.home, href: "/" },
          { label: t.catalog.title, href: "/catalog" },
          { label: t.categories[product.category], href: `/catalog?cat=${product.category}` },
          { label: name },
        ]}
      />

      <div className="mt-4 grid gap-6 md:grid-cols-2 md:gap-10">
        <Gallery product={product} alt={fmt(t.product.imageAlt, { name })} />

        <div className="min-w-0">
          {product.brand && (
            <div className="text-xs font-semibold tracking-wider text-muted">
              {product.brand.toUpperCase()}
            </div>
          )}
          <h1 className="mt-1 font-serif text-2xl font-semibold leading-tight text-navy sm:text-3xl">
            {name}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <Price price={product.price} oldPrice={product.oldPrice} size="lg" />
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                inStock ? "bg-rose/35 text-navy" : "bg-rose/40 text-navy"
              }`}
            >
              <span
                aria-hidden="true"
                className={`h-1.5 w-1.5 rounded-full ${inStock ? "bg-rose" : "bg-navy"}`}
              />
              {inStock ? t.product.inStock : t.product.outOfStock}
            </span>
          </div>

          <p className="mt-2 text-xs text-muted">
            {fmt(t.product.installmentHint, {
              months: BOL_ODE_MAX_MONTHS,
              monthly: formatPrice(monthlyPayment(product.price, BOL_ODE_MAX_MONTHS)),
            })}
          </p>

          <p className="mt-4 text-[15px] leading-relaxed text-navy/85">{tr(product.description)}</p>

          <div className="mt-5 hidden items-center gap-3 md:flex">
            <QtyStepper value={qty} onChange={setQty} />
            {addButton}
          </div>

          <div className="mt-6 divide-y divide-gold/20 rounded-2xl border border-gold/30 bg-ivory px-4">
            <details open className="group py-1">
              <summary className="flex cursor-pointer items-center justify-between py-3 font-serif text-base font-semibold text-navy">
                {t.product.ingredients}
                <ChevronDown className="accordion-chevron h-4 w-4 text-muted transition-transform" />
              </summary>
              <p className="pb-4 text-sm leading-relaxed text-navy/80">{tr(product.ingredients)}</p>
            </details>
            <details className="group py-1">
              <summary className="flex cursor-pointer items-center justify-between py-3 font-serif text-base font-semibold text-navy">
                {t.product.usage}
                <ChevronDown className="accordion-chevron h-4 w-4 text-muted transition-transform" />
              </summary>
              <p className="pb-4 text-sm leading-relaxed text-navy/80">{tr(product.usage)}</p>
            </details>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-3 font-serif text-2xl font-semibold text-navy">{t.product.related}</h2>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Телефон: липкая кнопка внизу экрана */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gold/30 bg-ivory/95 p-3 pb-[max(12px,env(safe-area-inset-bottom))] backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-6xl items-center gap-3">
          <QtyStepper value={qty} onChange={setQty} />
          {addButton}
        </div>
      </div>
    </div>
  );
}
