import { cookies } from "next/headers";
import { LOCALE_COOKIE } from "@/config";
import { DEFAULT_LOCALE, dictionaries, isLocale, type Dict, type Locale } from "./index";

/** Язык из cookie — для серверных компонентов и generateMetadata. */
export async function getServerLocale(): Promise<Locale> {
  const saved = (await cookies()).get(LOCALE_COOKIE)?.value;
  return isLocale(saved) ? saved : DEFAULT_LOCALE;
}

export async function getServerDict(): Promise<{ locale: Locale; t: Dict }> {
  const locale = await getServerLocale();
  return { locale, t: dictionaries[locale] };
}
