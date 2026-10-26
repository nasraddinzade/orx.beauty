import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Единственный внешний источник картинок — плитки-плейсхолдеры.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
