import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

interface BreadcrumbProps {
  items: { name: string; href: string }[];
  baseUrl?: string;
}

export function Breadcrumb({ items, baseUrl = "" }: BreadcrumbProps) {
  return (
    <>
      <BreadcrumbJsonLd items={items} baseUrl={baseUrl} />
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-[var(--color-text-secondary)]">
          {items.map((item, index) => (
            <li key={item.href} className="flex items-center">
              {index > 0 && <span className="material-symbols-outlined text-xs mx-2">chevron_right</span>}
              {index === items.length - 1 ? (
                <span className="font-medium text-[var(--color-primary)]">{item.name}</span>
              ) : (
                <Link href={item.href} className="hover:text-[var(--color-primary)] transition-colors cursor-pointer">
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

export function BreadcrumbSkeleton() {
  return (
    <nav className="mb-6">
      <div className="flex items-center gap-2">
        <div className="skeleton w-20 h-4 rounded" />
        <span className="text-[var(--color-text-muted)]">›</span>
        <div className="skeleton w-32 h-4 rounded" />
      </div>
    </nav>
  );
}
