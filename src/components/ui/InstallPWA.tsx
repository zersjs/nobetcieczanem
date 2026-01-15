"use client";

import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstall, setShowInstall] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(isIOSDevice);

    const isStandalone = window.matchMedia("(display-mode: standalone)").matches;
    if (isStandalone) {
      setShowInstall(false);
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowInstall(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setDeferredPrompt(null);
      setShowInstall(false);
    }
  };

  const handleDismiss = () => {
    setShowInstall(false);
    localStorage.setItem("pwa-install-dismissed", Date.now().toString());
  };

  useEffect(() => {
    const dismissed = localStorage.getItem("pwa-install-dismissed");
    if (dismissed) {
      const dismissedTime = parseInt(dismissed);
      const dayInMs = 24 * 60 * 60 * 1000;
      if (Date.now() - dismissedTime < 7 * dayInMs) {
        setShowInstall(false);
      }
    }
  }, []);

  if (!showInstall) return null;

  if (isIOS) {
    return (
      <div className="fixed bottom-20 left-0 right-0 mx-4 z-50 bg-gradient-to-r from-[var(--color-primary)] to-emerald-600 text-white p-4 rounded-xl shadow-2xl border border-white/20 backdrop-blur-sm">
        <button onClick={handleDismiss} className="absolute top-2 right-2 text-white/80 hover:text-white">
          <span className="material-symbols-outlined text-xl">close</span>
        </button>
        <div className="flex items-start gap-3">
          <div className="size-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-3xl">install_mobile</span>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-1">Ana Ekrana Ekle</h3>
            <p className="text-sm text-white/90 mb-2">
              Safari'de <span className="inline-flex items-center mx-1"><span className="material-symbols-outlined text-base">ios_share</span></span> simgesine tıklayıp "Ana Ekrana Ekle" seçin.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-20 left-0 right-0 mx-4 z-50 bg-gradient-to-r from-[var(--color-primary)] to-emerald-600 text-white p-4 rounded-xl shadow-2xl border border-white/20 backdrop-blur-sm animate-slide-up">
      <button onClick={handleDismiss} className="absolute top-2 right-2 text-white/80 hover:text-white">
        <span className="material-symbols-outlined text-xl">close</span>
      </button>
      <div className="flex items-center gap-3">
        <div className="size-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
          <span className="material-symbols-outlined text-3xl">install_mobile</span>
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-lg mb-1">Uygulamayı Yükle</h3>
          <p className="text-sm text-white/90">Hızlı erişim için ana ekranınıza ekleyin</p>
        </div>
        <button
          onClick={handleInstall}
          className="px-6 py-2.5 bg-white text-[var(--color-primary)] rounded-lg font-bold hover:bg-white/90 transition-colors whitespace-nowrap"
        >
          Yükle
        </button>
      </div>
    </div>
  );
}
