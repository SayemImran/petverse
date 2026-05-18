/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // Google profile pictures
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com", // GitHub (if needed later)
      },
      {
        protocol: "https",
        hostname: "**", // allow any domain (use only in dev)
      },
    ],
  },
};

export default nextConfig;
