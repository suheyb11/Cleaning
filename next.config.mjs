/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Unsplash and Pexels are used for the placeholder photography.
    // TODO: once real Bilic photos are added to /public/images you can remove
    // these two — but keep the wildcard entry below, since blog cover images
    // are plain URLs typed into the admin portal and can come from anywhere.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/photos/**",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  webpack: (config, { dev }) => {
    // Disable webpack's persistent disk cache in dev: on Windows it races
    // with the OpenNext Cloudflare dev runtime's own file writes, corrupting
    // .next/cache/webpack/*.pack.gz mid-session (ENOENT on rename) and
    // leaving stale/missing chunk files (e.g. "Cannot find module './611.js'").
    if (dev) {
      config.cache = false;
    }
    return config;
  },
};

export default nextConfig;

// Gives `next dev` access to the Cloudflare Workers runtime bindings so local
// development matches the OpenNext deploy. No-op in production builds.
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
