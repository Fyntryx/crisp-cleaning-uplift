/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async redirects() {
    return [
      // existing custom redirects
      {
        source: '/book',
        destination: '/#booking',
        permanent: false,
      },
      // --- SEO REDIRECT MAP (To be populated in Prompt 3) ---
      {
        source: '/services/standard-house-clean',
        destination: '/house-cleaning-melbourne',
        permanent: true,
      },
      {
        source: '/services/deep-clean',
        destination: '/deep-cleaning-melbourne',
        permanent: true,
      },
      {
        source: '/services/vacate-clean',
        destination: '/end-of-lease-cleaning-melbourne',
        permanent: true,
      },
      {
        source: '/apartment-cleaning',
        destination: '/apartment-cleaning-melbourne',
        permanent: true,
      },
      // ------------------------------------------------------
    ]
  },
};

export default nextConfig;
