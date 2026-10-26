"use client";

import Link from "next/link";
import { useLocale } from "@/context/LocaleContext";
import { Logo } from "@/components/Logo";

export function Hero() {
  const { t } = useLocale();
  return (
    <section className="relative mt-2 overflow-hidden rounded-2xl border border-gold/30 bg-ivory px-5 py-8 shadow-soft sm:px-10 sm:py-14">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-teal/15 sm:h-72 sm:w-72"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-rose/30"
      />
      <div className="relative flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
        <Logo size={88} />
        <div className="max-w-xl">
          <h1 className="font-serif text-3xl font-semibold leading-tight text-navy sm:text-5xl">
            {t.hero.title}
          </h1>
          <p className="mt-3 text-[15px] leading-relaxed text-navy/80 sm:text-base">
            {t.hero.subtitle}
          </p>
          <Link
            href="/catalog"
            className="mt-5 inline-flex h-12 items-center justify-center rounded-xl bg-teal px-6 text-sm font-semibold text-ivory shadow-soft transition-colors hover:bg-navy"
          >
            {t.hero.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
