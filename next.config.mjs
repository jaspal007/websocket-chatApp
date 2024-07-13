/** @type {import('next').NextConfig} */
const nextConfig =  {
  reactStrictMode: false,
  webpack: async (config) => {
    config.resolve.fallback = { fs: false };

    return config
  },
  experimental: {
    esmExternals: "loose",
    serverComponentsExternalPackages: ["mongoose"],
  },
};

export default nextConfig;