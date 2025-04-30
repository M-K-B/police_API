import { Context } from "./deps.ts";
import { cache, CACHE_TTL } from "./cache.ts";
export enum Endpoint {
  // Static endpoints (no parameters needed)
  AVAILABILITY = "/crimes-street-dates",
  CATEGORIES = "/crime-categories",
  FORCES = "/forces",
  LAST_UPDATED = "/crime-last-updated",
  STREET_LEVEL = "/crimes-street/all-crime",

  // Stop and Search static
  STOP_SEARCH_AREA = "/stops-street",
  STOP_SEARCH_LOCATION = "/stops-at-location",
  STOP_SEARCH_NO_LOCATION = "/stops-no-location",
  STOP_SEARCH_FORCE = "/stops-force",

  // Dynamic endpoints (parameters needed)
  FORCE = "/forces/{force}", // {force} = police force ID
  FORCE_PEOPLE = "/forces/{force}/people", // {force} = police force ID

  OUTCOMES_AT_LOCATION = "/outcomes-at-location", // needs query params (lat, lng)
  CRIMES_AT_LOCATION = "/crimes-at-location", // needs query params (lat, lng)
  CRIMES_NO_LOCATION = "/crimes-no-location", // needs query params (category, force, date)

  OUTCOMES_FOR_CRIME = "/outcomes-for-crime/{crime_id}", // {crime_id} = ID of a crime

  NEIGHBOURHOODS = "/{force}/neighbourhoods",

  // {force}
  NEIGHBOURHOOD = "/{force}/{neighbourhood}",
  NEIGHBOURHOOD_BOUNDARY = "/{force}/{neighbourhood}/boundary",
  NEIGHBOURHOOD_TEAM = "/{force}/{neighbourhood}/people",

  NEIGHBOURHOOD_EVENTS = "/{force}/{neighbourhood}/events",
  NEIGHBOURHOOD_PRIORITIES = "/{force}/{neighbourhood}/priorities",

  LOCATE_NEIGHBOURHOOD = "/locate-neighbourhood",
}
export async function urlfetch<
  T extends Record<string, unknown> | unknown[] = any,
>(
  endpoint: string,
  ctx: Context,
  customTTL?: number,
): Promise<T | void> {
  const cacheKey = endpoint;
  const cached = cache.get(cacheKey);

  if (cached && (Date.now() - cached.timestamp) < cached.ttl) {
    ctx.response.status = 200;
    ctx.response.body = cached.data; // ✅ Type now safe
    ctx.response.headers.set("X-Cache", "HIT");
    return cached.data as T;
  }

  const response = await fetch(`https://data.police.uk/api${endpoint}`);

  console.log(`${endpoint}`);
  if (!response.ok) {
    ctx.response.status = response.status;
    ctx.response.body = { error: "External API error." };
    return;
  }

  const data = await response.json() as T;

  cache.set(cacheKey, {
    timestamp: Date.now(),
    ttl: customTTL ?? CACHE_TTL,
    data,
  });

  ctx.response.status = response.status;
  ctx.response.body = data;
  ctx.response.headers.set("X-Cache", "MISS");

  return data;
}
