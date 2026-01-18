'use server';

import { fetchEczaneler } from "@/lib/api-client";
import { getTodayDate } from "@/lib/date-utils";

export async function getDistricts(il: string) {
  try {
    const today = getTodayDate();
    const eczaneler = await fetchEczaneler({ 
      il, 
      tarih: today 
    });
    
    // İlçeleri ayıkla ve sırala
    const districts = [...new Set(eczaneler.map((e) => e.ilce))].filter(Boolean).sort();
    
    return { success: true, data: districts };
  } catch (error) {
    console.error("Districts fetch error:", error);
    return { success: false, error: "İlçeler yüklenemedi" };
  }
}
