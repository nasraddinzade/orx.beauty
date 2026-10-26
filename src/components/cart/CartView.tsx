"use client";

import Link from "next/link";
import { useLocale } from "@/context/LocaleContext";
import { useCart } from "@/context/CartContext";
import { fmt } from "@/i18n";
import { formatPrice } from "@/lib/format";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CategoryTiles } from "@/components/CategoryTiles";
import { ProductImage } from "@/components/ProductImage";
import { Price } from "@/components/Price";
import { QtyStepper } from "@/components/QtyStepper";
import { TrashIcon } from "@/components/Icons";

function Skeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-[1fr_320px]" aria-busy="true">
      <div className="space-y-3">
        {[0, 1].map((i) => (
          <div key={i} className="flex gap-3 rounded-2xl bg-ivory p-3 shadow-soft">
            <div className="h-20 w-20 animate-pulse rounded-xl bg-cream" />
            <div className="flex-1 space-y-2 py-1">
              <div className="h-3 w-16 animate-pulse rounded bg-cream" />
              <div className="h-4 w-3/4 animate-pulse rounded bg-cream" />
              <div className="h-4 w-20 animate-pulse rounded bg-cream" />
            </div>
          </div>
        ))}
      </div>
      <div className="h-48 animate-pulse rounded-2xl bg-ivory" />
    </div>
  );
}

export function CartView() {
  const { t, tr } = useLocale();
  const { hydrated, lines, count, subtotal, setQty, remove } = useCart();

  return (
    <div className="mx-auto max-w-6xl px-4">
      <Breadcrumbs items={[{ label: t.common.home, href: "/" }, { label: t.cart.title }]} />
      <div className="flex items-baseline justify-between gap-3 pb-4 pt-1">
        <h1 className="font-serif text-2xl font-semibold text-navy sm:text-3xl">{t.cart.title}</h1>
        {hydrated && count > 0 && (
          <span className="text-sm text-muted">{fmt(t.cart.items, { n: count })}</span>
        )}
      </div>

      {!hydrated ? (
        <Skeleton />
      ) : lines.length === 0 ? (
        <div>
          <div className="rounded-2xl bg-ivory px-6 py-12 text-center shadow-soft">
            <h2 className="font-serif text-xl font-semibold text-navy">{t.cart.empty}</h2>
            <p className="mt-2 text-sm text-muted">{t.cart.emptyText}</p>
            <Link
              href="/catalog"
              className="mt-5 inline-flex h-12 items-center rounded-xl bg-navy px-6 text-sm font-semibold text-ivory hover:bg-teal"
            >
              {t.cart.goCatalog}
            </Link>
          </div>
          <div className="mt-8">
            <h2 className="mb-3 font-serif text-xl font-semibold text-navy">{t.home.categories}</h2>
            <CategoryTiles compact />
          </div>
        </div>
      ) : (
        <div className="grid items-start gap-4 md:grid-cols-[1fr_320px]">
          <ul className="space-y-3">
            {lines.map(({ product, qty }) => {
              const name = tr(product.name);
              return (
                <li key={product.slug} className="flex gap-3 rounded-2xl bg-ivory p-3 shadow-soft">
                  <Link href={`/product/${product.slug}`} className="w-20 shrink-0 sm:w-24">
                    <ProductImage
                      product={product}
                      alt={fmt(t.product.imageAlt, { name })}
                      sizes="96px"
                      padding="p-1.5"
                      className="bg-cream"
                    />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="text-[11px] font-semibold tracking-wider text-muted">
          {product.brand.toUpperCase()}
                        </div>
                        <Link
                          href={`/product/${product.slug}`}
                          className="line-clamp-2 text-sm font-medium leading-snug text-navy hover:text-teal"
                        >
                          {name}
                        </Link>
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(product.slug)}
                        aria-label={t.cart.remove}
                        className="-mr-1 -mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted hover:bg-cream hover:text-navy"
                      >
                        <TrashIcon className="h-4.5 w-4.5" />
                      </button>
                    </div>
                    <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-2">
                      <QtyStepper value={qty} onChange={(n) => setQty(product.slug, n)} size="sm" />
                      <Price price={product.price * qty} size="sm" />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <aside className="rounded-2xl bg-ivory p-4 shadow-soft md:sticky md:top-20">
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted">{t.cart.subtotal}</dt>
                <dd className="font-medium text-navy">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">{t.cart.delivery}</dt>
                <dd className="text-muted">{t.cart.deliveryCalc}</dd>
              </div>
              <div className="flex justify-between border-t border-gold/20 pt-3 text-base">
                <dt className="font-semibold text-navy">{t.cart.total}</dt>
                <dd className="font-semibold text-navy">{formatPrice(subtotal)}</dd>
              </div>
            </dl>
            <Link
              href="/checkout"
              className="mt-4 inline-flex h-12 w-full items-center justify-center rounded-xl bg-teal text-sm font-semibold text-ivory hover:bg-navy"
            >
              {t.cart.checkout}
            </Link>
            <Link
              href="/catalog"
              className="mt-2 inline-flex h-10 w-full items-center justify-center rounded-xl text-sm font-medium text-navy hover:bg-cream"
            >
              {t.cart.continueShopping}
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
