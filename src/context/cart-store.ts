import { CART_STORAGE_KEY } from "@/config";
import { getProduct } from "@/data/products";

export type CartItem = { slug: string; qty: number };

/**
 * Внешнее хранилище корзины поверх localStorage.
 * Читается через useSyncExternalStore: на сервере и при гидратации
 * отдаётся пустой снимок, после гидратации — содержимое localStorage.
 */

const EMPTY: CartItem[] = [];
let cache: CartItem[] | null = null;
const listeners = new Set<() => void>();

function sanitize(raw: unknown): CartItem[] {
  if (!Array.isArray(raw)) return EMPTY;
  const seen = new Set<string>();
  const items: CartItem[] = [];
  for (const entry of raw) {
    if (!entry || typeof entry !== "object") continue;
    const { slug, qty } = entry as Partial<CartItem>;
    if (typeof slug !== "string" || seen.has(slug) || !getProduct(slug)) continue;
    const n = Math.floor(Number(qty));
    if (!Number.isFinite(n) || n < 1) continue;
    seen.add(slug);
    items.push({ slug, qty: Math.min(n, 99) });
  }
  return items;
}

function readStorage(): CartItem[] {
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    return raw ? sanitize(JSON.parse(raw)) : EMPTY;
  } catch {
    return EMPTY;
  }
}

function writeStorage(items: CartItem[]) {
  try {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch {
    /* приватный режим или переполнение — корзина живёт до перезагрузки */
  }
}

function emit() {
  for (const cb of listeners) cb();
}

function onStorage(e: StorageEvent) {
  if (e.key === CART_STORAGE_KEY || e.key === null) {
    cache = readStorage();
    emit();
  }
}

export function subscribe(cb: () => void) {
  listeners.add(cb);
  if (listeners.size === 1) window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    if (listeners.size === 0) window.removeEventListener("storage", onStorage);
  };
}

export function getSnapshot(): CartItem[] {
  if (cache === null) cache = readStorage();
  return cache;
}

export function getServerSnapshot(): CartItem[] {
  return EMPTY;
}

function update(next: CartItem[]) {
  cache = next;
  writeStorage(next);
  emit();
}

export function addItem(slug: string, qty = 1) {
  const items = getSnapshot();
  const existing = items.find((i) => i.slug === slug);
  if (existing) {
    update(
      items.map((i) =>
        i.slug === slug ? { ...i, qty: Math.min(99, i.qty + qty) } : i,
      ),
    );
  } else {
    update([...items, { slug, qty: Math.min(99, Math.max(1, qty)) }]);
  }
}

export function setQty(slug: string, qty: number) {
  const items = getSnapshot();
  if (qty < 1) {
    update(items.filter((i) => i.slug !== slug));
  } else {
    update(items.map((i) => (i.slug === slug ? { ...i, qty: Math.min(99, qty) } : i)));
  }
}

export function removeItem(slug: string) {
  update(getSnapshot().filter((i) => i.slug !== slug));
}

export function clearCart() {
  update(EMPTY);
}
