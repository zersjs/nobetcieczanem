export function getFormattedDate(date: Date = new Date()): string {
  return date.toLocaleDateString("tr-TR", { 
    day: "numeric", 
    month: "long", 
    year: "numeric",
    timeZone: "Europe/Istanbul"
  });
}

export function getShortDate(date: Date = new Date()): string {
  return date.toLocaleDateString("tr-TR", { 
    day: "numeric", 
    month: "long",
    timeZone: "Europe/Istanbul"
  });
}

export function getISODate(date: Date = new Date()): string {
  const istanbulDate = new Date(date.toLocaleString("en-US", { timeZone: "Europe/Istanbul" }));
  return istanbulDate.toISOString().split("T")[0];
}

export const getTodayDate = getISODate;

export function getDayName(date: Date = new Date()): string {
  return date.toLocaleDateString("tr-TR", { 
    weekday: "long",
    timeZone: "Europe/Istanbul"
  });
}

export function getFullDateString(date: Date = new Date()): string {
  return `${getShortDate(date)} ${getDayName(date)}`;
}

export function getSEODateKeywords(date: Date = new Date()): string[] {
  const shortDate = getShortDate(date);
  const dayName = getDayName(date);
  const formattedDate = getFormattedDate(date);

  return [
    `${shortDate} nöbetçi eczane`,
    `bugün nöbetçi eczane`,
    `${dayName} nöbetçi eczane`,
    `${formattedDate} nöbetçi eczane`,
    `nöbetçi eczane ${shortDate}`,
    `bu gece nöbetçi eczane`,
    `şu an açık eczane`,
  ];
}
