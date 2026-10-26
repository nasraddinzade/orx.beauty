"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import type { Product } from "@/data/products";
import { useLocale } from "@/context/LocaleContext";
import { useCart } from "@/context/CartContext";
import { fmt } from "@/i18n";
import { formatPrice } from "@/lib/format";
import { ProductImage } from "./ProductImage";
import { Price } from "./Price";
import { CheckIcon } from "./Icons";

type Props = {
  product: Product;
  priority?: boolean;
  className?: string;
};

export function ProductCard({ product, priority, className = "" }: Props) {
  const { t, tr } = useLocale();
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const timer = useRef<number | null>(null);

  const href = `/product/${product.slug}`;
  const name = tr(product.name);

  function handleAdd() {
    add(product.slug, 1);
    setAdded(true);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setAdded(false), 1200);
  }

  return (
    <article
      className={`flex min-w-0 flex-col rounded-2xl bg-ivory p-2.5 shadow-soft transition-shadow hover:shadow-card ${className}`}
    >
      <Link href={href} className="relative block">
        <ProductImage
          product={product}
          alt={fmt(t.product.imageAlt, { name })}
          priority={priority}
        />
        {product.isNew && (
          <span className="absolute left-2 top-2 rounded-full bg-gold px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-ivory">
            {t.product.new}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col px-1 pt-2.5">
        <div className="min-h-[14px] text-[11px] font-semibold tracking-wider text-muted">
          {product.brand.toUpperCase()}
        </div>
        <Link
          href={href}
          className="mt-0.5 line-clamp-2 text-sm font-medium leading-snug text-navy hover:text-teal"
          title={name}
        >
          {name}
        </Link>
        <div className="mt-auto pt-2">
          <Price price={product.price} oldPrice={product.oldPrice} size="sm" />
        </div>
      </div>

      <button
        type="button"
        onClick={handleAdd}
        className={`mt-2.5 inline-flex h-10 w-full items-center justify-center gap-1.5 rounded-xl px-2 text-sm font-semibold transition-colors ${
          added ? "bg-teal/15 text-teal" : "bg-navy text-ivory hover:bg-teal"
        }`}
      >
        {added ? (
          <>
            <CheckIcon className="h-4 w-4" />
            {t.product.added}
          </>
        ) : (
          <span className="truncate">
            {fmt(t.product.addToCart, { price: formatPrice(product.price) })}
          </span>
        )}
      </button>
    </article>
  );
}
