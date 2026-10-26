"use client";

import { useRef, useState } from "react";
import type { Product } from "@/data/products";
import { ProductImage } from "@/components/ProductImage";

type Props = { product: Product; alt: string };

/**
 * Один кадр (или ни одного) — просто картинка.
 * Несколько: на телефоне свайп со снап-скроллом и точками, на десктопе миниатюры.
 */
export function Gallery({ product, alt }: Props) {
  const images = product.images;
  const [index, setIndex] = useState(0);
  const scroller = useRef<HTMLDivElement>(null);

  if (images.length <= 1) {
    return (
      <ProductImage
        product={product}
        alt={alt}
        sizes="(max-width: 768px) 100vw, 50vw"
        priority
        padding="p-6"
        className="shadow-soft"
      />
    );
  }

  function onScroll() {
    const el = scroller.current;
    if (!el) return;
    const i = Math.round(el.scrollLeft / el.clientWidth);
    if (i !== index) setIndex(i);
  }

  function goTo(i: number) {
    setIndex(i);
    const el = scroller.current;
    if (el) el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  }

  return (
    <div>
      {/* Телефон: свайп */}
      <div className="md:hidden">
        <div
          ref={scroller}
          onScroll={onScroll}
          className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto rounded-xl"
        >
          {images.map((src, i) => (
            <div key={src} className="w-full shrink-0 snap-center">
              <ProductImage
                product={product}
                src={src}
                alt={`${alt} ${i + 1}`}
                sizes="100vw"
                priority={i === 0}
                padding="p-6"
              />
            </div>
          ))}
        </div>
        <div className="mt-2 flex justify-center gap-1.5">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              aria-label={`${i + 1}`}
              aria-current={i === index}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-5 bg-teal" : "w-2 bg-navy/25"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Десктоп: большой кадр и миниатюры */}
      <div className="hidden gap-3 md:flex">
        <div className="flex w-20 shrink-0 flex-col gap-2">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              aria-label={`${i + 1}`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
              className={`overflow-hidden rounded-xl border-2 transition-colors ${
                i === index ? "border-teal" : "border-transparent hover:border-gold/50"
              }`}
            >
              <ProductImage product={product} src={src} alt="" sizes="80px" padding="p-1.5" />
            </button>
          ))}
        </div>
        <div className="flex-1">
          <ProductImage
            key={images[index]}
            product={product}
            src={images[index]}
            alt={`${alt} ${index + 1}`}
            sizes="50vw"
            priority
            padding="p-6"
            className="shadow-soft"
          />
        </div>
      </div>
    </div>
  );
}
