/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb', // Increase the limit to 5 MB or adjust based on your needs
    },
  },
};

export default nextConfig;
