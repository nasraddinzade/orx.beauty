"use client";

import { SHOW_DEMO_BANNER } from "@/config";
import { useLocale } from "@/context/LocaleContext";

export function DemoBanner() {
  const { t } = useLocale();
  if (!SHOW_DEMO_BANNER) return null;
  return (
    <div
      role="note"
      className="bg-rose px-4 py-1.5 text-center text-[12px] font-medium leading-snug text-navy"
    >
      {t.demo.banner}
    </div>
  );
}
