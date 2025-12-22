/** @type {import('next').NextConfig} */
const isGitHub = process.env.NEXT_PUBLIC_ENV === "github";

const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: isGitHub ? "/staging" : "",
  assetPrefix: isGitHub ? "/staging" : "",
};

export default nextConfig;
