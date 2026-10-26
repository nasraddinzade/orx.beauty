import { CATEGORIES, NO_BRAND, products, type Category, type Product } from "@/data/products";

export type SortKey = "default" | "asc" | "desc";

export type CatalogState = {
  cats: Category[];
  brands: string[];
  sort: SortKey;
};

const isCategory = (v: string): v is Category => (CATEGORIES as string[]).includes(v);

function splitParam(value: string | null): string[] {
  return value ? value.split(",").map((s) => s.trim()).filter(Boolean) : [];
}

/** ?cat=uz,goz&brand=Technic,_none&sort=asc → состояние фильтров. */
export function parseCatalogParams(params: URLSearchParams): CatalogState {
  const sortRaw = params.get("sort");
  return {
    cats: [...new Set(splitParam(params.get("cat")).filter(isCategory))],
    brands: [...new Set(splitParam(params.get("brand")))],
    sort: sortRaw === "asc" || sortRaw === "desc" ? sortRaw : "default",
  };
}

export function serializeCatalogParams(state: CatalogState): string {
  const params = new URLSearchParams();
  if (state.cats.length) params.set("cat", state.cats.join(","));
  if (state.brands.length) params.set("brand", state.brands.join(","));
  if (state.sort !== "default") params.set("sort", state.sort);
  return params.toString();
}

export const brandKey = (p: Product) => p.brand || NO_BRAND;

function matchesCats(p: Product, cats: Category[]) {
  return cats.length === 0 || cats.includes(p.category);
}
function matchesBrands(p: Product, brands: string[]) {
  return brands.length === 0 || brands.includes(brandKey(p));
}

export function applyCatalog(state: CatalogState): Product[] {
  const list = products.filter(
    (p) => matchesCats(p, state.cats) && matchesBrands(p, state.brands),
  );
  if (state.sort === "asc") return [...list].sort((a, b) => a.price - b.price);
  if (state.sort === "desc") return [...list].sort((a, b) => b.price - a.price);
  return list;
}

/** Счётчики у значений фильтра с учётом другого фильтра (фасетные). */
export function facetCounts(state: CatalogState) {
  const cats: Record<string, number> = {};
  const brands: Record<string, number> = {};
  for (const p of products) {
    if (matchesBrands(p, state.brands)) cats[p.category] = (cats[p.category] ?? 0) + 1;
    if (matchesCats(p, state.cats)) {
      const k = brandKey(p);
      brands[k] = (brands[k] ?? 0) + 1;
    }
  }
  return { cats, brands };
}
