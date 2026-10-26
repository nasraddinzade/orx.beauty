"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { DELIVERY_PRICE, type DeliveryMethod } from "@/config";
import { useLocale } from "@/context/LocaleContext";
import { useCart } from "@/context/CartContext";
import { fmt } from "@/i18n";
import { formatPrice } from "@/lib/format";
import { formatPhoneInput, isValidPhone } from "@/lib/phone";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProductImage } from "@/components/ProductImage";
import { CheckIcon } from "@/components/Icons";
import { StepIndicator } from "./StepIndicator";

type Form = {
  name: string;
  phone: string;
  method: DeliveryMethod;
  address: string;
  comment: string;
};

type Errors = Partial<Record<"name" | "phone" | "address", string>>;

type Stage = "form" | "confirm" | "paying" | "success";

const METHODS: DeliveryMethod[] = ["pickup", "baku", "post"];

/** Номер заказа вида ORX-2026-0000, генерируется на клиенте. */
function makeOrderNumber(): string {
  const year = new Date().getFullYear();
  const n = Math.floor(Math.random() * 10000);
  return `ORX-${year}-${String(n).padStart(4, "0")}`;
}

export function CheckoutFlow() {
  const { t, tr } = useLocale();
  const { hydrated, lines, subtotal, clear } = useCart();

  const [stage, setStage] = useState<Stage>("form");
  const [form, setForm] = useState<Form>({
    name: "",
    phone: "",
    method: "pickup",
    address: "",
    comment: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [orderNumber, setOrderNumber] = useState("");

  // При смене шага возвращаемся к началу страницы.
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [stage]);

  const needsAddress = form.method !== "pickup";
  const deliveryPrice = DELIVERY_PRICE[form.method];
  const total = Math.round((subtotal + deliveryPrice) * 100) / 100;

  const methodLabel: Record<DeliveryMethod, { title: string; hint: string }> = {
    pickup: { title: t.checkout.pickup, hint: t.checkout.pickupHint },
    baku: { title: t.checkout.baku, hint: t.checkout.bakuHint },
    post: { title: t.checkout.post, hint: t.checkout.postHint },
  };

  function set<K extends keyof Form>(key: K, value: Form[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    if (key in errors) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate(): boolean {
    const next: Errors = {};
    if (form.name.trim().length < 2) next.name = t.checkout.errors.nameRequired;
    if (!isValidPhone(form.phone)) next.phone = t.checkout.errors.phoneInvalid;
    if (needsAddress && form.address.trim().length < 5)
      next.address = t.checkout.errors.addressRequired;
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function goConfirm(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) setStage("confirm");
  }

  /**
   * Имитация оплаты. Реальным платёжным шлюзом в Азербайджане будет epoint.az,
   * здесь заглушка: спиннер 1500 мс, затем экран успеха. Деньги не списываются,
   * заказ никуда не отправляется.
   */
  function pay() {
    setStage("paying");
    window.setTimeout(() => {
      setOrderNumber(makeOrderNumber());
      clear();
      setStage("success");
    }, 1500);
  }

  const inputCls = (invalid?: boolean) =>
    `h-12 w-full rounded-xl border bg-ivory px-3.5 text-[15px] text-navy outline-none transition-colors placeholder:text-muted/70 focus:border-teal ${
      invalid ? "border-rose" : "border-gold/40"
    }`;

  // ---------- Экран успеха ----------
  if (stage === "success") {
    return (
      <div className="mx-auto max-w-lg px-4 py-12 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal text-ivory">
          <CheckIcon className="h-8 w-8" />
        </div>
        <h1 className="mt-5 font-serif text-3xl font-semibold text-navy">{t.success.title}</h1>
        <p className="mt-3 text-sm text-muted">{t.success.orderNumber}</p>
        <p className="mt-1 font-sans text-2xl font-bold tracking-wide text-navy">{orderNumber}</p>
        <p className="mt-4 text-sm leading-relaxed text-navy/80">{t.success.text}</p>
        <div className="mt-5 rounded-xl border border-gold/40 bg-rose/30 px-4 py-3 text-xs leading-relaxed text-navy">
          {t.checkout.demoPay}
        </div>
        <div className="mt-7 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Link
            href="/catalog"
            className="inline-flex h-12 items-center justify-center rounded-xl bg-navy px-6 text-sm font-semibold text-ivory hover:bg-teal"
          >
            {t.success.catalog}
          </Link>
          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center rounded-xl border border-gold/40 bg-ivory px-6 text-sm font-semibold text-navy hover:bg-cream"
          >
            {t.success.home}
          </Link>
        </div>
      </div>
    );
  }

  // ---------- Пустая корзина ----------
  if (hydrated && lines.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4">
        <Breadcrumbs items={[{ label: t.common.home, href: "/" }, { label: t.checkout.title }]} />
        <div className="mt-4 rounded-2xl bg-ivory px-6 py-12 text-center shadow-soft">
          <p className="text-navy">{t.checkout.emptyCart}</p>
          <Link
            href="/catalog"
            className="mt-5 inline-flex h-12 items-center rounded-xl bg-navy px-6 text-sm font-semibold text-ivory hover:bg-teal"
          >
            {t.cart.goCatalog}
          </Link>
        </div>
      </div>
    );
  }

  const step = stage === "form" ? 1 : 2;

  return (
    <div className="mx-auto max-w-3xl px-4 pb-8">
      <Breadcrumbs
        items={[
          { label: t.common.home, href: "/" },
          { label: t.cart.title, href: "/cart" },
          { label: t.checkout.title },
        ]}
      />
      <h1 className="pb-4 pt-1 font-serif text-2xl font-semibold text-navy sm:text-3xl">
        {t.checkout.title}
      </h1>

      <StepIndicator current={step} labels={[t.checkout.step1, t.checkout.step2]} />

      {/* ---------- Шаг 1 ---------- */}
      {stage === "form" && (
        <form onSubmit={goConfirm} noValidate className="mt-6 space-y-5">
          <div className="rounded-2xl bg-ivory p-4 shadow-soft sm:p-5">
            <h2 className="font-serif text-lg font-semibold text-navy">{t.checkout.contact}</h2>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-1 block text-sm font-medium text-navy">
                  {t.checkout.name}
                </label>
                <input
                  id="name"
                  name="name"
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  placeholder={t.checkout.namePlaceholder}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className={inputCls(!!errors.name)}
                />
                {errors.name && (
                  <p id="name-error" className="mt-1 text-xs text-rose">
                    {errors.name}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="phone" className="mb-1 block text-sm font-medium text-navy">
                  {t.checkout.phone}
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={(e) => set("phone", formatPhoneInput(e.target.value))}
                  onFocus={() => {
                    if (!form.phone) set("phone", "+994 ");
                  }}
                  placeholder={t.checkout.phonePlaceholder}
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                  className={inputCls(!!errors.phone)}
                />
                {errors.phone && (
                  <p id="phone-error" className="mt-1 text-xs text-rose">
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>
          </div>

          <fieldset className="rounded-2xl bg-ivory p-4 shadow-soft sm:p-5">
            <legend className="sr-only">{t.checkout.method}</legend>
            <h2 className="font-serif text-lg font-semibold text-navy">{t.checkout.method}</h2>
            <div className="mt-3 space-y-2">
              {METHODS.map((m) => {
                const checked = form.method === m;
                const price = DELIVERY_PRICE[m];
                return (
                  <label
                    key={m}
                    className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition-colors ${
                      checked ? "border-teal bg-teal/10" : "border-gold/30 hover:bg-cream"
                    }`}
                  >
                    <input
                      type="radio"
                      name="method"
                      value={m}
                      checked={checked}
                      onChange={() => set("method", m)}
                      className="mt-1 h-4 w-4 accent-teal"
                    />
                    <span className="flex-1">
                      <span className="block text-sm font-medium text-navy">
                        {methodLabel[m].title}
                      </span>
                      <span className="block text-xs text-muted">{methodLabel[m].hint}</span>
                    </span>
                    <span className="shrink-0 text-sm font-semibold text-navy">
                      {price === 0 ? t.checkout.free : formatPrice(price)}
                    </span>
                  </label>
                );
              })}
            </div>

            {needsAddress && (
              <div className="mt-4">
                <label htmlFor="address" className="mb-1 block text-sm font-medium text-navy">
                  {t.checkout.address}
                </label>
                <input
                  id="address"
                  name="address"
                  autoComplete="street-address"
                  value={form.address}
                  onChange={(e) => set("address", e.target.value)}
                  placeholder={t.checkout.addressPlaceholder}
                  aria-invalid={!!errors.address}
                  aria-describedby={errors.address ? "address-error" : undefined}
                  className={inputCls(!!errors.address)}
                />
                {errors.address && (
                  <p id="address-error" className="mt-1 text-xs text-rose">
                    {errors.address}
                  </p>
                )}
              </div>
            )}

            <div className="mt-4">
              <label htmlFor="comment" className="mb-1 block text-sm font-medium text-navy">
                {t.checkout.comment}
              </label>
              <textarea
                id="comment"
                name="comment"
                rows={3}
                value={form.comment}
                onChange={(e) => set("comment", e.target.value)}
                placeholder={t.checkout.commentPlaceholder}
                className="w-full rounded-xl border border-gold/40 bg-ivory px-3.5 py-3 text-[15px] text-navy outline-none transition-colors placeholder:text-muted/70 focus:border-teal"
              />
            </div>
          </fieldset>

          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-between">
            <Link
              href="/cart"
              className="inline-flex h-12 items-center justify-center rounded-xl px-5 text-sm font-medium text-navy hover:bg-ivory"
            >
              {t.checkout.back}
            </Link>
            <button
              type="submit"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-navy px-6 text-sm font-semibold text-ivory hover:bg-teal"
            >
              {t.checkout.next}
            </button>
          </div>
        </form>
      )}

      {/* ---------- Шаг 2 ---------- */}
      {(stage === "confirm" || stage === "paying") && (
        <div className="mt-6 space-y-5">
          <div className="rounded-xl border border-gold/50 bg-rose/40 px-4 py-3 text-sm leading-relaxed text-navy">
            {t.checkout.demoPay}
          </div>

          <div className="rounded-2xl bg-ivory p-4 shadow-soft sm:p-5">
            <h2 className="font-serif text-lg font-semibold text-navy">{t.checkout.orderSummary}</h2>
            <ul className="mt-3 divide-y divide-gold/20">
              {lines.map(({ product, qty }) => (
                <li key={product.slug} className="flex items-center gap-3 py-3">
                  <div className="w-14 shrink-0">
                    <ProductImage
                      product={product}
                      alt=""
                      sizes="56px"
                      padding="p-1"
                      className="bg-cream"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] font-semibold tracking-wider text-muted">
          {product.brand.toUpperCase()}
                    </div>
                    <div className="line-clamp-2 text-sm text-navy">{tr(product.name)}</div>
                    <div className="text-xs text-muted">
                      {qty} × {formatPrice(product.price)}
                    </div>
                  </div>
                  <div className="shrink-0 text-sm font-semibold text-navy">
                    {formatPrice(product.price * qty)}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-ivory p-4 shadow-soft sm:p-5">
            <h2 className="font-serif text-lg font-semibold text-navy">{t.checkout.contact}</h2>
            <dl className="mt-3 grid gap-x-6 gap-y-1.5 text-sm sm:grid-cols-2">
              <div className="flex justify-between gap-3 sm:block">
                <dt className="text-muted">{t.checkout.name}</dt>
                <dd className="text-navy">{form.name}</dd>
              </div>
              <div className="flex justify-between gap-3 sm:block">
                <dt className="text-muted">{t.checkout.phone}</dt>
                <dd className="text-navy">{form.phone}</dd>
              </div>
              <div className="flex justify-between gap-3 sm:block">
                <dt className="text-muted">{t.checkout.method}</dt>
                <dd className="text-right text-navy sm:text-left">{methodLabel[form.method].title}</dd>
              </div>
              {needsAddress && (
                <div className="flex justify-between gap-3 sm:block">
                  <dt className="text-muted">{t.checkout.address}</dt>
                  <dd className="text-right text-navy sm:text-left">{form.address}</dd>
                </div>
              )}
              {form.comment && (
                <div className="flex justify-between gap-3 sm:col-span-2 sm:block">
                  <dt className="text-muted">{t.checkout.comment}</dt>
                  <dd className="text-right text-navy sm:text-left">{form.comment}</dd>
                </div>
              )}
            </dl>
          </div>

          <div className="rounded-2xl bg-ivory p-4 shadow-soft sm:p-5">
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted">{t.cart.subtotal}</dt>
                <dd className="text-navy">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">{t.cart.delivery}</dt>
                <dd className="text-navy">
                  {deliveryPrice === 0 ? t.checkout.free : formatPrice(deliveryPrice)}
                </dd>
              </div>
              <div className="flex justify-between border-t border-gold/20 pt-3 text-base">
                <dt className="font-semibold text-navy">{t.cart.total}</dt>
                <dd className="font-semibold text-navy">{formatPrice(total)}</dd>
              </div>
            </dl>

            <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-between">
              <button
                type="button"
                disabled={stage === "paying"}
                onClick={() => setStage("form")}
                className="inline-flex h-12 items-center justify-center rounded-xl px-5 text-sm font-medium text-navy hover:bg-cream disabled:opacity-50"
              >
                {t.checkout.back}
              </button>
              <button
                type="button"
                disabled={stage === "paying"}
                onClick={pay}
                aria-busy={stage === "paying"}
                className="inline-flex h-12 min-w-[200px] items-center justify-center gap-2 rounded-xl bg-teal px-6 text-sm font-semibold text-ivory transition-colors hover:bg-navy disabled:cursor-wait disabled:opacity-80"
              >
                {stage === "paying" ? (
                  <>
                    <span
                      aria-hidden="true"
                      className="spinner h-4.5 w-4.5 rounded-full border-2 border-ivory/40 border-t-ivory"
                    />
                    {t.checkout.paying}
                  </>
                ) : (
                  fmt(t.checkout.pay, { total: formatPrice(total) })
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
