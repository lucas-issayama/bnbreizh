/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ["active-ants-7480a709ab.media.strapiapp.com"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
};

module.exports = nextConfig;
