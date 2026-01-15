"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 280);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between px-6 py-3">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/logo.svg" alt="Logo" width={36} height={36} priority />
            <span className="text-lg font-bold text-gray-900">Nöbetçi Eczanem</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/nasil-calisir" className="text-sm font-medium text-gray-600 hover:text-[var(--color-primary)] transition-colors">
              Nasıl Çalışır?
            </Link>
            <Link href="/iletisim" className="text-sm font-medium text-gray-600 hover:text-[var(--color-primary)] transition-colors">
              İletişim
            </Link>
            <Link href="/hakkimizda" className="text-sm font-medium text-gray-600 hover:text-[var(--color-primary)] transition-colors">
              Hakkımızda
            </Link>
          </nav>
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden flex items-center justify-center size-10 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Menüyü aç"
          >
            <span className="material-symbols-outlined text-gray-700">menu</span>
          </button>
        </div>
      </header>
      <div className="h-[60px]" />

      {isOpen && (
        <div className="fixed inset-0 z-[100] md:hidden">
          <div 
            className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isClosing ? "opacity-0" : "opacity-100"}`}
            onClick={handleClose}
          />
          <div className={`absolute top-0 right-0 h-full w-72 bg-white shadow-2xl transition-transform duration-300 ease-out ${isClosing ? "translate-x-full" : "translate-x-0 animate-slide-in-right"}`}>
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <span className="text-lg font-bold text-gray-900">Menü</span>
              <button
                onClick={handleClose}
                className="flex items-center justify-center size-10 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Menüyü kapat"
              >
                <span className="material-symbols-outlined text-gray-700">close</span>
              </button>
            </div>
            <nav className="flex flex-col p-4 gap-1">
              <Link 
                href="/" 
                onClick={handleClose}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-[var(--color-primary)] transition-colors"
              >
                <span className="material-symbols-outlined text-xl">home</span>
                <span className="font-medium">Ana Sayfa</span>
              </Link>
              <Link 
                href="/nasil-calisir" 
                onClick={handleClose}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-[var(--color-primary)] transition-colors"
              >
                <span className="material-symbols-outlined text-xl">help</span>
                <span className="font-medium">Nasıl Çalışır?</span>
              </Link>
              <Link 
                href="/iletisim" 
                onClick={handleClose}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-[var(--color-primary)] transition-colors"
              >
                <span className="material-symbols-outlined text-xl">mail</span>
                <span className="font-medium">İletişim</span>
              </Link>
              <Link 
                href="/hakkimizda" 
                onClick={handleClose}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-[var(--color-primary)] transition-colors"
              >
                <span className="material-symbols-outlined text-xl">info</span>
                <span className="font-medium">Hakkımızda</span>
              </Link>
            </nav>
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100">
              <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
                <Image src="/logo.svg" alt="Logo" width={32} height={32} />
                <div>
                  <p className="text-sm font-bold text-gray-900">Nöbetçi Eczanem</p>
                  <p className="text-xs text-gray-500">7/24 Eczane Bilgisi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function HeaderSkeleton() {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-2.5">
            <div className="size-9 skeleton rounded-lg" />
            <div className="skeleton w-36 h-5 rounded" />
          </div>
          <div className="hidden md:flex items-center gap-6">
            <div className="skeleton w-24 h-4 rounded" />
            <div className="skeleton w-16 h-4 rounded" />
            <div className="skeleton w-20 h-4 rounded" />
          </div>
          <div className="md:hidden size-10 skeleton rounded-lg" />
        </div>
      </header>
      <div className="h-[60px]" />
    </>
  );
}
