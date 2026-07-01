import type { NextConfig } from "next";

// GitHub Pages serves a project site from /<repo>/, so production builds are
// served under a subpath. Local dev stays at the root (http://localhost:3000).
const isProd = process.env.NODE_ENV === "production";
const basePath = isProd ? "/osiris-exe" : "";

const nextConfig: NextConfig = {
  output: "export", // static HTML export for GitHub Pages (no server runtime)
  basePath,
  trailingSlash: true, // emit /route/index.html so Pages resolves clean URLs
  images: { unoptimized: true }, // next/image can't use the optimizer on export
  env: {
    // Exposed to the client so raw asset URLs (e.g. the motion-comic iframe)
    // can prepend the same subpath basePath uses.
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
