import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimization enabled for better performance

  // The site used to have /en and /sv prefixes; keep old links working
  async redirects() {
    return [
      { source: "/:locale(en|sv)", destination: "/", permanent: true },
      { source: "/:locale(en|sv)/:path*", destination: "/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
