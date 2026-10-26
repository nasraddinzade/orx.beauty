/**
 * Глобальные настройки прототипа.
 * Тексты, зависящие от языка, лежат в src/i18n.
 */

/** Узкая плашка «демо-версия» вверху каждой страницы. false — скрыть. */
export const SHOW_DEMO_BANNER = true;

/** Контакты магазина (не зависят от языка). */
export const STORE = {
  name: "ORX beauty",
  phone: "+994 51 399 42 20",
  phoneHref: "tel:+994513994220",
  instagram: "@orx.beauty",
  instagramUrl: "https://instagram.com/orx.beauty",
  hours: "10:00–20:00",
  street: "Şəmsi Bədəlbəyli 100A",
} as const;

/** Стоимость доставки, ₼. qiymət dəqiqləşdirilməlidir */
export const DELIVERY_PRICE = {
  pickup: 0,
  baku: 5,
  post: 8,
} as const;

export type DeliveryMethod = keyof typeof DELIVERY_PRICE;

/** Максимальный срок внутренней рассрочки BÖL ÖDƏ, месяцев. */
export const BOL_ODE_MAX_MONTHS = 35;

/** Ключ localStorage для корзины. */
export const CART_STORAGE_KEY = "orx_cart_v1";

/** Cookie с выбранным языком. */
export const LOCALE_COOKIE = "orx_locale";
