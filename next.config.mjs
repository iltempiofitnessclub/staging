/** @type {import('next').NextConfig} */
const isGitHub = process.env.NEXT_PUBLIC_ENV === 'github';

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    path: isGitHub ? '/staging/_next/image' : '/_next/image',
  },
  basePath: isGitHub ? '/staging' : '',
  assetPrefix: isGitHub ? '/staging' : '',
};

export default nextConfig;
