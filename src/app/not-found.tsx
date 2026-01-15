import Link from "next/link";
import { Header, Footer } from "@/components";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-1 flex items-center justify-center py-20">
        <div className="text-center px-6">
          <div className="size-32 bg-[var(--color-primary-muted)] rounded-full flex items-center justify-center text-[var(--color-primary)] mx-auto mb-8">
            <span className="material-symbols-outlined text-7xl">search_off</span>
          </div>
          <h1 className="text-4xl font-black mb-4 text-[var(--color-text)]">Sayfa Bulunamadı</h1>
          <p className="text-lg text-[var(--color-text-secondary)] mb-8 max-w-md mx-auto">
            Aradığınız sayfa mevcut değil veya taşınmış olabilir.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 h-14 bg-[var(--color-primary)] text-white rounded-lg font-bold text-lg hover:bg-[var(--color-primary-hover)] shadow-lg shadow-[var(--color-primary-shadow)] transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined">home</span>
            Ana Sayfaya Dön
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
