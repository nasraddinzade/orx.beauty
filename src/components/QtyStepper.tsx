"use client";

import { useLocale } from "@/context/LocaleContext";

type Props = {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md";
};

export function QtyStepper({ value, onChange, min = 1, max = 99, size = "md" }: Props) {
  const { t } = useLocale();
  const btn =
    size === "sm"
      ? "h-8 w-8 text-base"
      : "h-11 w-11 text-lg";
  const field = size === "sm" ? "w-8 text-sm" : "w-10 text-base";

  return (
    <div
      role="group"
      aria-label={t.product.qty}
      className="inline-flex items-center rounded-xl border border-gold/50 bg-ivory"
    >
      <button
        type="button"
        aria-label={t.product.decrease}
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
        className={`${btn} rounded-l-xl font-medium text-navy transition-colors hover:bg-cream disabled:opacity-40 disabled:hover:bg-transparent`}
      >
        −
      </button>
      <span className={`${field} text-center font-semibold tabular-nums text-navy`} aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        aria-label={t.product.increase}
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
        className={`${btn} rounded-r-xl font-medium text-navy transition-colors hover:bg-cream disabled:opacity-40 disabled:hover:bg-transparent`}
      >
        +
      </button>
    </div>
  );
}
