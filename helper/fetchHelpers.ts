import { Context } from "../deps.ts";
import { urlfetch } from "../utils.ts";

// Fetch simple static endpoints
export async function handleSimpleFetch(ctx: Context, endpoint: string) {
  await urlfetch(endpoint, ctx);
}

// Fetch endpoints with required query params
export async function handleQueryFetch(
  ctx: Context,
  endpoint: string,
  requiredParams: string[],
) {
  const url = new URL(ctx.request.url);
  const searchParams = url.searchParams;

  const missing = requiredParams.filter((param) => !searchParams.get(param));
  if (missing.length > 0) {
    ctx.response.status = 400;
    ctx.response.body = {
      error: `Missing required params: ${missing.join(", ")}`,
    };
    return;
  }

  const queryString = new URLSearchParams(searchParams).toString();
  const fullEndpoint = `${endpoint}?${queryString}`;

  await urlfetch(fullEndpoint, ctx);
}

// Fetch endpoints with path replacement {force} etc
export async function handlePathReplace(
  ctx: Context,
  endpoint: string,
  replacements: Record<string, string>,
) {
  for (const [key, value] of Object.entries(replacements)) {
    if (!value) {
      ctx.response.status = 400;
      ctx.response.body = { error: `${key} is required.` };
      return;
    }
    endpoint = endpoint.replace(`{${key}}`, value);
  }

  await urlfetch(endpoint, ctx);
}

// Flexible fetch for lat/lng OR poly based endpoints
export async function handleFlexibleQueryFetch(ctx: Context, endpoint: string) {
  const url = new URL(ctx.request.url);
  const searchParams = url.searchParams;

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const poly = searchParams.get("poly");

  if ((lat && lng) || poly) {
    const queryString = new URLSearchParams(searchParams).toString();
    const fullEndpoint = `${endpoint}?${queryString}`;

    await urlfetch(fullEndpoint, ctx);
  } else {
    ctx.response.status = 400;
    ctx.response.body = { error: "Either lat/lng or poly must be provided." };
  }
}
