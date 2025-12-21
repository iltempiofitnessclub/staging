export function withBasePath(path: string): string {
  if (typeof window === "undefined") return path;

  const isGitHubStaging =
    window.location.hostname === "iltempiofitnessclub.github.io" &&
    window.location.pathname.startsWith("/staging");

  if (!isGitHubStaging) return path;

  if (path.startsWith("/staging")) return path;

  if (path.startsWith("/")) return `/staging${path}`;

  return path;
}
