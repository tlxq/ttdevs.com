import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimization enabled for better performance

  // The site used to have /en and /sv prefixes; keep old links working
  // Basic security headers. A full Content-Security-Policy is intentionally left out for now.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },

  async redirects() {
    return [
      { source: "/:locale(en|sv)", destination: "/", permanent: true },
      { source: "/:locale(en|sv)/:path*", destination: "/:path*", permanent: true },
      // /portfolio used to render the same content as the home page
      { source: "/portfolio", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
