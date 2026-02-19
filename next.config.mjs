/** @type {import('next').NextConfig} */
const isGitHub = process.env.NEXT_PUBLIC_ENV === 'github';
const isNetlify = process.env.NETLIFY === 'true';

const nextConfig = {
  // Rimosso output: 'export' per abilitare API routes su Netlify
  images: {
    unoptimized: true,
  },
  basePath: isGitHub && !isNetlify ? '/staging' : '',
  assetPrefix: isGitHub && !isNetlify ? '/staging/' : '',
};

export default nextConfig;
