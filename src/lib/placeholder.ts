import type { Category, Product } from "@/data/products";

/** Цвета плитки-плейсхолдера по категории: [фон, текст]. */
const PALETTE: Record<Category, [bg: string, fg: string]> = {
  uz: ["F6EEDF", "1B2A4A"],
  goz: ["1B2A4A", "F6EEDF"],
  dodaq: ["E3A2A8", "1B2A4A"],
  enlik: ["F6EEDF", "C9A227"],
  baxim: ["2FA8A0", "FFFBF4"],
  sac: ["FFFBF4", "2FA8A0"],
  firca: ["8A8578", "FFFBF4"],
  dest: ["C9A227", "1B2A4A"],
};

/** Разбивает название на строки не длиннее maxLen символов (по словам). */
function wrapWords(text: string, maxLen: number, maxLines: number): string[] {
  const lines: string[] = [];
  let current = "";
  for (const word of text.split(/\s+/)) {
    if (!word) continue;
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > maxLen && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
    if (lines.length === maxLines) break;
  }
  if (current && lines.length < maxLines) lines.push(current);
  return lines;
}

/** Строка для параметра text: пробелы как +, перенос как %0A, остальное percent-encoding. */
function encodeLine(line: string): string {
  return encodeURIComponent(line).replace(/%20/g, "+");
}

/**
 * Ссылка на плитку placehold.co в фирменных цветах с брендом и названием товара.
 * Пример: https://placehold.co/800x800/F6EEDF/1B2A4A.png?text=Technic%0ATriple+Wave&font=noto-sans
 * Расширение .png нужно, чтобы next/image не требовал разрешения SVG.
 */
export function placeholderUrl(
  product: Pick<Product, "brand" | "name" | "category">,
  size = 800,
): string {
  const [bg, fg] = PALETTE[product.category];
  const lines = [
    ...(product.brand ? [product.brand] : []),
    ...wrapWords(product.name.az, 18, 3),
  ];
  const text = lines.map(encodeLine).join("%0A");
  // Шрифт noto-sans: у playfair-display на placehold.co нет буквы ə.
  return `https://placehold.co/${size}x${size}/${bg}/${fg}.png?text=${text}&font=noto-sans`;
}
