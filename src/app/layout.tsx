import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { cookies } from "next/headers";
import { LOCALE_COOKIE } from "@/config";
import { DEFAULT_LOCALE, dictionaries, isLocale } from "@/i18n";
import { LocaleProvider } from "@/context/LocaleContext";
import { CartProvider } from "@/context/CartContext";
import { DemoBanner } from "@/components/DemoBanner";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

// Оба шрифта проверены: ə, ı и кириллица есть в latin-ext/cyrillic.
// Знака ₼ нет в Playfair Display — цены всегда набираем Inter (font-sans).
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext", "cyrillic"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ORX beauty",
    template: "%s · ORX beauty",
  },
  description:
    "ORX beauty — kosmetika mağazası, Bakı. Faizsiz taksit BÖL ÖDƏ 35 ayadək.",
};

export const viewport: Viewport = {
  themeColor: "#F6EEDF",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const cookieStore = await cookies();
  const saved = cookieStore.get(LOCALE_COOKIE)?.value;
  const locale = isLocale(saved) ? saved : DEFAULT_LOCALE;

  return (
    <html
      lang={dictionaries[locale].htmlLang}
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <LocaleProvider initialLocale={locale}>
          <CartProvider>
            <DemoBanner />
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </CartProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
