/** Телефон в формате +994 XX XXX XX XX. */
export const PHONE_RE = /^\+994 \d{2} \d{3} \d{2} \d{2}$/;

/**
 * Маска ввода: из любых символов оставляем цифры, подставляем +994
 * и расставляем пробелы по группам 2-3-2-2.
 */
export function formatPhoneInput(raw: string): string {
  let digits = raw.replace(/\D/g, "");
  if (digits.startsWith("994")) digits = digits.slice(3);
  else if (digits.startsWith("0")) digits = digits.slice(1);
  digits = digits.slice(0, 9);

  const groups = [2, 3, 2, 2];
  let out = "+994";
  let pos = 0;
  for (const len of groups) {
    if (pos >= digits.length) break;
    out += " " + digits.slice(pos, pos + len);
    pos += len;
  }
  return out;
}

export function isValidPhone(value: string): boolean {
  return PHONE_RE.test(value);
}
