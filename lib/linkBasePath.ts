export function withBasePath(path: string): string {
  if (typeof window === "undefined") return path;

  const isGitHubStaging =
    window.location.hostname === "iltempiofitnessclub.github.io";

  if (!isGitHubStaging) return path;

  // normalizza
  if (!path.startsWith("/")) path = `/${path}`;

  // se è già /staging o /staging/qualcosa → NON riaggiungere
  if (path === "/staging" || path.startsWith("/staging/")) {
    return path;
  }

  return `/staging${path}`;
}
