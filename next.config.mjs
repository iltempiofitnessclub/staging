/** @type {import('next').NextConfig} */
const isGitHub = process.env.NEXT_PUBLIC_ENV === "github";

const nextConfig = {
  images: { unoptimized: true },
  basePath: isGitHub ? "/staging" : "",
  assetPrefix: isGitHub ? "/staging" : "",
};

export default nextConfig;
