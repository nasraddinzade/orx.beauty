"use client";

import { STORE } from "@/config";
import { useLocale } from "@/context/LocaleContext";
import { Logo } from "./Logo";
import { ClockIcon, InstagramIcon, PhoneIcon, PinIcon } from "./Icons";

export function Footer() {
  const { t } = useLocale();
  return (
    <footer className="mt-12 bg-navy text-cream">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-[auto_1fr] md:gap-12">
          <div className="flex items-center gap-3">
            <Logo size={52} />
            <div>
              <div className="font-serif text-xl font-semibold">ORX beauty</div>
              <div className="text-sm text-cream/70">{t.footer.near}</div>
            </div>
          </div>

          <dl className="grid gap-5 text-sm sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex gap-3">
              <PinIcon className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
              <div>
                <dt className="text-cream/60">{t.footer.address}</dt>
                <dd className="mt-0.5">{t.footer.addressValue}</dd>
              </div>
            </div>
            <div className="flex gap-3">
              <PhoneIcon className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
              <div>
                <dt className="text-cream/60">{t.footer.phone}</dt>
                <dd className="mt-0.5">
                  <a href={STORE.phoneHref} className="hover:text-rose">
                    {STORE.phone}
                  </a>
                </dd>
              </div>
            </div>
            <div className="flex gap-3">
              <ClockIcon className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
              <div>
                <dt className="text-cream/60">{t.footer.hours}</dt>
                <dd className="mt-0.5">{t.footer.hoursValue}</dd>
              </div>
            </div>
            <div className="flex gap-3">
              <InstagramIcon className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
              <div>
                <dt className="text-cream/60">{t.footer.instagram}</dt>
                <dd className="mt-0.5">
                  <a
                    href={STORE.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-rose"
                  >
                    {STORE.instagram}
                  </a>
                </dd>
              </div>
            </div>
          </dl>
        </div>

        <div className="mt-8 border-t border-cream/15 pt-5 text-xs text-cream/50">
          {t.footer.note}
        </div>
      </div>
    </footer>
  );
}
