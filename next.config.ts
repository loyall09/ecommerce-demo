import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "your-image-host.com" },
    ],
  },
};


export default nextConfig;
