"use client";

import Link from "next/link";
import { buildCityUrl } from "@/lib/url-utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  il: string;
  ilce?: string;
}

export function Pagination({ currentPage, totalPages, il, ilce }: PaginationProps) {
  const getPageUrl = (page: number) => buildCityUrl(il, ilce, page > 1 ? page : undefined);

  const getVisiblePages = () => {
    const pages: (number | "...")[] = [];
    const showPages = 5;
    const halfShow = Math.floor(showPages / 2);

    let start = Math.max(1, currentPage - halfShow);
    let end = Math.min(totalPages, currentPage + halfShow);

    if (currentPage - halfShow < 1) {
      end = Math.min(totalPages, end + (halfShow - currentPage + 1));
    }
    if (currentPage + halfShow > totalPages) {
      start = Math.max(1, start - (currentPage + halfShow - totalPages));
    }

    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push("...");
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <nav className="flex justify-center items-center gap-1 mt-12" aria-label="Sayfalama">
      {currentPage > 1 && (
        <Link
          href={getPageUrl(currentPage - 1)}
          className="px-4 py-2 rounded-lg bg-[var(--color-bg-card)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)] text-[var(--color-text)] text-sm font-medium transition-all"
        >
          Önceki
        </Link>
      )}

      <div className="flex items-center gap-1">
        {getVisiblePages().map((page, index) =>
          page === "..." ? (
            <span key={`ellipsis-${index}`} className="px-3 py-2 text-[var(--color-text-muted)]">
              ...
            </span>
          ) : (
            <Link
              key={page}
              href={getPageUrl(page)}
              className={`min-w-[40px] px-3 py-2 rounded-lg text-sm font-medium text-center transition-all ${
                currentPage === page
                  ? "bg-[var(--color-primary)] text-white"
                  : "bg-[var(--color-bg-card)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)] text-[var(--color-text)]"
              }`}
            >
              {page}
            </Link>
          )
        )}
      </div>

      {currentPage < totalPages && (
        <Link
          href={getPageUrl(currentPage + 1)}
          className="px-4 py-2 rounded-lg bg-[var(--color-bg-card)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)] text-[var(--color-text)] text-sm font-medium transition-all"
        >
          Sonraki
        </Link>
      )}
    </nav>
  );
}
