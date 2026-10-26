"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/data/products";
import { placeholderUrl } from "@/lib/placeholder";

type Props = {
  product: Pick<Product, "brand" | "name" | "category" | "images">;
  /** Конкретный кадр (для галереи). По умолчанию images[0]. */
  src?: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  /** Внутренний отступ картинки от края плитки. */
  padding?: string;
};

/**
 * Всегда квадрат 1:1, object-contain, светлая плитка, скелетон на время загрузки.
 * Нет фото или ошибка загрузки — плитка placehold.co в цветах категории.
 */
export function ProductImage({
  product,
  src,
  alt,
  sizes = "(max-width: 768px) 50vw, 25vw",
  priority,
  className = "",
  padding = "p-3",
}: Props) {
  const initial = src ?? product.images[0] ?? placeholderUrl(product);
  const [current, setCurrent] = useState(initial);
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`relative aspect-square w-full overflow-hidden rounded-xl bg-ivory ${className}`}
    >
      {!loaded && (
        <div aria-hidden="true" className="absolute inset-0 animate-pulse bg-cream" />
      )}
      <Image
        src={current}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-contain ${padding} transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setLoaded(true)}
        onError={() => {
          const fallback = placeholderUrl(product);
          if (current !== fallback) setCurrent(fallback);
          else setLoaded(true);
        }}
      />
    </div>
  );
}
