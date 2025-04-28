/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  future: {
    webpack5: true,
  },
  webpack: (config) => {
    if (config.target === "web") config.externals = ["fs", "os"];
    return config;
  },
};

module.exports = nextConfig;
