/** Цена в манатах: "19.90 ₼" с неразрывным пробелом перед символом. */
export function formatPrice(value: number): string {
  return `${value.toFixed(2)} ₼`;
}

/** Ежемесячный платёж по BÖL ÖDƏ при равных долях. */
export function monthlyPayment(price: number, months: number): number {
  return Math.ceil((price / months) * 100) / 100;
}
