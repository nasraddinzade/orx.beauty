"use client";

import Link from "next/link";
import { useLocale } from "@/context/LocaleContext";
import { useCart } from "@/context/CartContext";
import { LOCALES } from "@/i18n";
import { Logo } from "./Logo";
import { CartIcon } from "./Icons";

export function Header() {
  const { t, locale, setLocale } = useLocale();
  const { count, hydrated } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-gold/30 bg-ivory/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-2 px-4 md:h-16 md:gap-6">
        <Link href="/" className="flex items-center gap-2.5" aria-label={t.nav.home}>
          <Logo size={40} />
          <span className="hidden font-serif text-lg font-semibold text-navy sm:inline">
            ORX beauty
          </span>
        </Link>

        <nav className="flex flex-1 items-center justify-end gap-1 md:gap-2">
          <Link
            href="/catalog"
            className="rounded-lg px-2.5 py-2 text-sm font-medium text-navy transition-colors hover:bg-cream"
          >
            {t.nav.catalog}
          </Link>

          <div
            role="group"
            aria-label={t.nav.language}
            className="ml-1 inline-flex rounded-full border border-gold/50 bg-ivory p-0.5 text-xs font-semibold"
          >
            {LOCALES.map((code) => {
              const active = code === locale;
              return (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLocale(code)}
                  aria-pressed={active}
                  className={`rounded-full px-2.5 py-1 transition-colors ${
                    active ? "bg-teal text-ivory" : "text-navy hover:bg-cream"
                  }`}
                >
                  {code.toUpperCase()}
                </button>
              );
            })}
          </div>

          <Link
            href="/cart"
            aria-label={t.nav.cart}
            className="relative ml-1 inline-flex h-10 w-10 items-center justify-center rounded-full text-navy transition-colors hover:bg-cream"
          >
            <CartIcon />
            {hydrated && count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-teal px-1 text-[11px] font-bold leading-none text-ivory">
                {count}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
