import az, { type Dict } from "./az";
import ru from "./ru";

export type Locale = "az" | "ru";

export const LOCALES: Locale[] = ["az", "ru"];
export const DEFAULT_LOCALE: Locale = "az";

export const dictionaries: Record<Locale, Dict> = { az, ru };

/** Двуязычное поле в данных: { az, ru }. */
export type Localized = { az: string; ru: string };

export function isLocale(value: unknown): value is Locale {
  return value === "az" || value === "ru";
}

/** Подстановка {name} в строку словаря. */
export function fmt(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    key in vars ? String(vars[key]) : `{${key}}`,
  );
}

export type { Dict };
