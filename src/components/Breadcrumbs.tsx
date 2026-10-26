import Link from "next/link";
import { Fragment } from "react";

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="breadcrumb" className="pt-4 text-xs text-muted">
      <ol className="flex flex-wrap items-center">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <Fragment key={`${item.label}-${i}`}>
              {i > 0 && <span className="mx-1.5">/</span>}
              <li className={last ? "line-clamp-1 text-navy" : ""}>
                {item.href && !last ? (
                  <Link href={item.href} className="hover:text-navy/60">
                    {item.label}
                  </Link>
                ) : (
                  item.label
                )}
              </li>
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
