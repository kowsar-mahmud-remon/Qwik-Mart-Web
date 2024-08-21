/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["qwikmart.pythonanywhere.com","lh3.googleusercontent.com"],
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
  reactStrictMode: true,
  trailingSlash: true,
 
};

module.exports = nextConfig;