"use client";

import { useState, useEffect } from "react";

interface StatusBarProps {
  city: string;
  district?: string;
  count: number;
  lastUpdate: string;
}

export function StatusBar({ city, district, count, lastUpdate }: StatusBarProps) {
  const [dateStr, setDateStr] = useState("");
  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    const today = new Date();
    setDateStr(today.toLocaleDateString("tr-TR", { day: "numeric", month: "long", weekday: "long" }));
    setTimeStr(new Date(lastUpdate).toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }));
  }, [lastUpdate]);

  return (
    <div className="w-full max-w-[1200px] mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center text-sm text-[var(--color-text-secondary)] gap-2">
      <div className="flex items-center gap-2">
        <span className="flex size-2 rounded-full bg-[var(--color-primary)] animate-pulse" />
        <span>
          {city}{district ? `, ${district}` : ""} için <strong className="text-[var(--color-primary)]">{count} nöbetçi eczane</strong> listelendi.
        </span>
      </div>
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">schedule</span>
          Son Güncelleme: {timeStr}
        </span>
        <span className="flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">calendar_today</span>
          {dateStr}
        </span>
      </div>
    </div>
  );
}

export function StatusBarSkeleton() {
  return (
    <div className="w-full max-w-[1200px] mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-2">
      <div className="flex items-center gap-2">
        <div className="skeleton size-2 rounded-full" />
        <div className="skeleton w-48 h-4 rounded" />
      </div>
      <div className="flex items-center gap-4">
        <div className="skeleton w-36 h-4 rounded" />
        <div className="skeleton w-32 h-4 rounded" />
      </div>
    </div>
  );
}
