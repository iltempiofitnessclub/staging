/** @type {import('next').NextConfig} */
const isGitHub = process.env.NEXT_PUBLIC_ENV === 'github';

const nextConfig = {
  // Rimosso output: 'export' per abilitare API routes su Netlify
  images: {
    unoptimized: true,
  },
  basePath: isGitHub ? '/staging' : '',
  assetPrefix: isGitHub ? '/staging/' : '',
};

export default nextConfig;
