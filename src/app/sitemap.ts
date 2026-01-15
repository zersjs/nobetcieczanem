import { MetadataRoute } from "next";
import { ILLER } from "@/constants/iller";
import { normalizeForUrl } from "@/lib/url-utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nobetcieczanem.com";
  const today = new Date().toISOString();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: today,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/nasil-calisir`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/iletisim`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/kullanim-kosullari`,
      lastModified: today,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/gizlilik-politikasi`,
      lastModified: today,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/kvkk`,
      lastModified: today,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  const cityPages: MetadataRoute.Sitemap = ILLER.map((il) => ({
    url: `${baseUrl}/${normalizeForUrl(il.label)}-nobetci-eczane`,
    lastModified: today,
    changeFrequency: "daily" as const,
    priority: 0.9,
  }));

  return [...staticPages, ...cityPages];
}
