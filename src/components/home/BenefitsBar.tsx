"use client";

import { useLocale } from "@/context/LocaleContext";
import { MailIcon, SplitIcon, TruckIcon } from "@/components/Icons";

export function BenefitsBar() {
  const { t } = useLocale();
  const items = [
    { icon: TruckIcon, text: t.benefits.delivery },
    { icon: MailIcon, text: t.benefits.post },
    { icon: SplitIcon, text: t.benefits.installment },
  ];
  return (
    <ul className="no-scrollbar -mx-4 flex snap-x gap-2 overflow-x-auto px-4 py-3 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0">
      {items.map(({ icon: Icon, text }) => (
        <li
          key={text}
          className="flex shrink-0 snap-start items-center gap-2 rounded-full border border-gold/30 bg-ivory px-3.5 py-2 text-[13px] font-medium text-navy sm:justify-center"
        >
          <Icon className="h-4.5 w-4.5 shrink-0 text-teal" />
          <span className="whitespace-nowrap">{text}</span>
        </li>
      ))}
    </ul>
  );
}
