import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const LOVABLE_ASSET_BASE = "https://kkposusje-digital-court.lovable.app";

/**
 * Normalizes image URLs coming from the database.
 * Relative Lovable asset paths (/__l5e/assets-v1/...) only resolve on the
 * Lovable preview host, so they are rewritten to absolute CDN URLs.
 * Everything else (signed storage URLs, external links) is left untouched.
 */
export function resolveAssetUrl<T extends string | null | undefined>(url: T): T {
  if (typeof url === "string" && url.startsWith("/__l5e/assets-v1/")) {
    return `${LOVABLE_ASSET_BASE}${url}` as T;
  }
  return url;
}
