export function withBasePath(path: string): string {
  if (typeof window === "undefined") return path;

  const isGitHubStaging =
    window.location.hostname === "iltempiofitnessclub.github.io";

  if (!isGitHubStaging) return path;

  if (!path.startsWith("/")) path = `/${path}`;

  if (path === "/staging" || path.startsWith("/staging/")) {
    return path;
  }

  return `/staging${path}`;
}
