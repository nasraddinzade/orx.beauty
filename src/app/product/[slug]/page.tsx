import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, products } from "@/data/products";
import { getServerDict } from "@/i18n/server";
import { ProductView } from "@/components/product/ProductView";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  const { locale, t } = await getServerDict();
  if (!product) return { title: t.product.notFound };
  const title = product.brand
    ? `${product.brand} ${product.name[locale]}`
    : product.name[locale];
  return { title, description: product.description[locale] };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  // «С этим покупают»: четыре товара той же категории, при нехватке — соседние.
  const sameCategory = products.filter(
    (p) => p.category === product.category && p.slug !== product.slug,
  );
  const others = products.filter(
    (p) => p.category !== product.category && p.slug !== product.slug,
  );
  const related = [...sameCategory, ...others].slice(0, 4);

  return <ProductView product={product} related={related} />;
}
