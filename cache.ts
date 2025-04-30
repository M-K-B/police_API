// cache.ts
export const cache = new Map<
  string,
  { timestamp: number; ttl: number; data: any }
>();

export const CACHE_TTL = 5 * 60 * 1000; // 5 min

export function clearCache() {
  cache.clear();
}
