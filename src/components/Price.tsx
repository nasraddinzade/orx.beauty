import { formatPrice } from "@/lib/format";

type Props = {
  price: number;
  oldPrice?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizes = {
  sm: { price: "text-[15px]", old: "text-xs" },
  md: { price: "text-lg", old: "text-sm" },
  lg: { price: "text-2xl", old: "text-base" },
};

/** Цена и зачёркнутая старая цена. Всегда font-sans: в Playfair нет знака ₼. */
export function Price({ price, oldPrice, size = "md", className = "" }: Props) {
  const s = sizes[size];
  const discounted = oldPrice !== undefined && oldPrice > price;
  return (
    <span className={`inline-flex flex-wrap items-baseline gap-x-2 font-sans ${className}`}>
      <span className={`font-semibold ${s.price} ${discounted ? "text-rose" : "text-navy"}`}>
        {formatPrice(price)}
      </span>
      {discounted && (
        <span className={`${s.old} text-muted line-through`}>{formatPrice(oldPrice)}</span>
      )}
    </span>
  );
}
