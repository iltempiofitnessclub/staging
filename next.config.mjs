/** @type {import('next').NextConfig} */
const isGitHub = process.env.NEXT_PUBLIC_ENV === 'github';

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: isGitHub ? '/staging' : '',
  assetPrefix: isGitHub ? '/staging/' : '',
  
  // Ottimizzazioni per performance
  compress: true,
  poweredByHeader: false,
  
  // Ottimizzazione build
  swcMinify: true,
  
  // Headers per cache
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png|webp|gif|ico)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
