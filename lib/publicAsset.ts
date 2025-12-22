const BASE = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");

export function publicAsset(path: string): string {
  if (!path) return path;
  if (/^https?:\/\//i.test(path)) return path;

  if (!path.startsWith("/")) path = `/${path}`;

  if (!BASE) return path;

  if (path === BASE || path.startsWith(`${BASE}/`)) return path;

  return `${BASE}${path}`;
}
