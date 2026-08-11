import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    // Portfolio assets are already exported as compressed WebP files.
    // Serving them directly also keeps the Cloudflare/Vinext runtime stable.
    unoptimized: true,
  },
};

export default nextConfig;
