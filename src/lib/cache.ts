import { CacheEntry } from '@/types';
import { CACHE_CONFIG } from '@/constants';

class MemoryCache {
  private cache: Map<string, CacheEntry<unknown>> = new Map();

  set<T>(key: string, data: T, ttl: number = CACHE_CONFIG.defaultTTL): void {
    const now = Date.now();
    this.cache.set(key, {
      data,
      timestamp: now,
      expiresAt: now + ttl,
    });
    this.cleanup();
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }
    return entry.data as T;
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  private cleanup(): void {
    if (this.cache.size <= CACHE_CONFIG.maxEntries) return;
    const now = Date.now();
    const entries = Array.from(this.cache.entries());
    entries
      .filter(([, entry]) => entry.expiresAt < now)
      .forEach(([key]) => this.cache.delete(key));
    if (this.cache.size > CACHE_CONFIG.maxEntries) {
      const sortedEntries = entries.sort((a, b) => a[1].timestamp - b[1].timestamp);
      const toRemove = sortedEntries.slice(0, this.cache.size - CACHE_CONFIG.maxEntries);
      toRemove.forEach(([key]) => this.cache.delete(key));
    }
  }

  getStats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
    };
  }
}

export const cache = new MemoryCache();

export function generateCacheKey(params: Record<string, string | undefined>): string {
  const filtered = Object.entries(params)
    .filter(([, value]) => value !== undefined)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
  return `eczane:${filtered}`;
}
