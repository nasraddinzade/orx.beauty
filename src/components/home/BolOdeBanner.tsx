"use client";

import Link from "next/link";
import { BOL_ODE_MAX_MONTHS } from "@/config";
import { useLocale } from "@/context/LocaleContext";
import { fmt } from "@/i18n";
import { formatPrice, monthlyPayment } from "@/lib/format";
import { SplitIcon } from "@/components/Icons";

const EXAMPLE_PRICE = 155;

export function BolOdeBanner() {
  const { t } = useLocale();
  return (
    <section className="relative mt-10 overflow-hidden rounded-2xl border border-gold/40 bg-linear-to-br from-rose via-rose/60 to-ivory px-5 py-7 text-navy shadow-card sm:px-10 sm:py-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-12 -right-8 h-48 w-48 rounded-full bg-gold/20"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-10 -top-16 h-40 w-40 rounded-full bg-ivory/50"
      />
      <div className="relative grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-navy px-3 py-1 text-xs font-semibold uppercase tracking-wider text-ivory">
            <SplitIcon className="h-4 w-4" />
            0%
          </div>
          <h2 className="mt-3 font-serif text-3xl font-bold sm:text-4xl">{t.bolOde.title}</h2>
          <p className="mt-1 font-serif text-lg sm:text-xl">
            {fmt(t.bolOde.subtitle, { months: BOL_ODE_MAX_MONTHS })}
          </p>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-navy/80">{t.bolOde.text}</p>
          <p className="mt-3 inline-block rounded-xl border border-gold/40 bg-ivory/80 px-3 py-1.5 text-sm font-medium">
            {fmt(t.bolOde.example, {
              price: formatPrice(EXAMPLE_PRICE),
              monthly: formatPrice(monthlyPayment(EXAMPLE_PRICE, BOL_ODE_MAX_MONTHS)),
            })}
          </p>
        </div>
        <Link
          href="/catalog"
          className="inline-flex h-12 items-center justify-center rounded-xl bg-navy px-6 text-sm font-semibold text-ivory transition-colors hover:bg-ivory hover:text-navy"
        >
          {t.bolOde.cta}
        </Link>
      </div>
    </section>
  );
}
