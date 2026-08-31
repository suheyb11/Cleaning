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
};

export default nextConfig;
