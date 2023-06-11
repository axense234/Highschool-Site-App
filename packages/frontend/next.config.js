/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: "build",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "www.gravatar.com",
      },
      {
        protocol: "http",
        hostname: "dummyimage.com",
      },
    ],
  },
};

module.exports = nextConfig;
