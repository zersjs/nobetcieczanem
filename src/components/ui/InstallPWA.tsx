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
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-black/10 p-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] animate-slide-up">
        <button onClick={handleDismiss} className="absolute top-4 right-4 text-black/40 hover:text-black transition-colors">
          <span className="material-symbols-outlined">close</span>
        </button>
        <div className="flex flex-col gap-4 max-w-md mx-auto">
          <div>
            <h3 className="font-bold text-xl text-black mb-2">Uygulamayı Yükle</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Daha iyi bir deneyim için uygulamayı ana ekranınıza ekleyin.
              Safari menüsündeki <span className="inline-flex items-center mx-1 bg-gray-100 rounded px-1"><span className="material-symbols-outlined text-sm">ios_share</span></span>
              paylaş butonuna tıklayıp <br/><span className="font-semibold">"Ana Ekrana Ekle"</span> seçeneğini kullanın.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-black/10 p-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] animate-slide-up">
      <div className="max-w-md mx-auto flex items-center justify-between gap-4">
        <div className="flex-1">
          <h3 className="font-bold text-lg text-black mb-1">Uygulamayı Yükle</h3>
          <p className="text-gray-500 text-sm">Hızlı erişim için ana ekranınıza ekleyin</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleDismiss}
            className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-black transition-colors"
          >
            Daha Sonra
          </button>
          <button
            onClick={handleInstall}
            className="px-6 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-black/80 transition-colors"
          >
            Yükle
          </button>
        </div>
      </div>
    </div>
  );
}
