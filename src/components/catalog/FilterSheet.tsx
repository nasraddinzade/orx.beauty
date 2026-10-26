"use client";

import { useEffect } from "react";
import { useLocale } from "@/context/LocaleContext";
import { fmt } from "@/i18n";
import { CloseIcon } from "@/components/Icons";
import { BrandOptions, CategoryOptions, type FilterCommonProps } from "./FilterOptions";

type Props = FilterCommonProps & {
  open: boolean;
  onClose: () => void;
  onClear: () => void;
  resultCount: number;
};

/** Нижняя шторка с фильтрами для телефона. */
export function FilterSheet(props: Props) {
  const { t } = useLocale();
  const { open, onClose, onClear, resultCount } = props;

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <div
      className={`fixed inset-0 z-50 md:hidden ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-navy/40 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t.catalog.filters}
        className={`absolute inset-x-0 bottom-0 flex max-h-[85vh] flex-col rounded-t-2xl bg-ivory shadow-card transition-transform duration-300 ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-gold/20 px-4 py-3">
          <h2 className="font-serif text-lg font-semibold text-navy">{t.catalog.filters}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.catalog.close}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-navy hover:bg-cream"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-2">
          <h3 className="px-2 pb-1 pt-2 text-xs font-semibold uppercase tracking-wider text-muted">
            {t.catalog.category}
          </h3>
          <CategoryOptions {...props} />
          <h3 className="px-2 pb-1 pt-4 text-xs font-semibold uppercase tracking-wider text-muted">
            {t.catalog.brand}
          </h3>
          <BrandOptions {...props} />
        </div>

        <div className="flex gap-2 border-t border-gold/20 p-3 pb-[max(12px,env(safe-area-inset-bottom))]">
          <button
            type="button"
            onClick={onClear}
            className="h-11 shrink-0 rounded-xl border border-gold/40 px-4 text-sm font-medium text-navy hover:bg-cream"
          >
            {t.catalog.clearAll}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="h-11 flex-1 rounded-xl bg-navy text-sm font-semibold text-ivory hover:bg-teal"
          >
            {fmt(t.catalog.apply, { n: resultCount })}
          </button>
        </div>
      </div>
    </div>
  );
}
