import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone", // ✅ vercel에서 기본 라우팅 문제 방지
};

export default nextConfig;
