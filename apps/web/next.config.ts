import type { NextConfig } from "next";
const remoteHost = new URL(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string
).hostname;

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: remoteHost,
        pathname: "/images/**",
      },
    ],
    unoptimized: process.env.NODE_ENV === "development",
  },
  reactCompiler: true,
};

export default nextConfig;
