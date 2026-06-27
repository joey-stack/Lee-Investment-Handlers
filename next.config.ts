import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "labs.google",
        pathname: "/fx/api/**",
      },
    ],
  },
};

export default nextConfig;
