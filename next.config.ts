import type { NextConfig } from "next";
import type { Configuration } from "webpack";
// BundleAnalyzerPlugin -> let us see which file is making our website heavy. -> useful for optimisation
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

//Did developer run the build command with anlayze=true? if yes show the bundle analyzer
const isAnalyze = process.env.ANALYZE === "true"; 

const nextConfig: NextConfig = {
  // Enable experimental features for better performance
  experimental: {
    optimizeCss: true, // reduce and optimize the css size. 
    optimizePackageImports: ["lucide-react", "@radix-ui/react-icons"], // Only imports what we actually use 
  },

  // Image optimization -> nextjs auto converts images to  newer, smaller formats to load faster.
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840], // define width for the responsive image -> picks the closest one
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], //-> size to manually set the small images like avatar 
    domains: ["images.unsplash.com", "cdn.shopify.com", "your-cdn-domain.com"], // Only allow images from there sources n these only.
  },

  // Compression
  compress: true, // gzip compresses the HTML/CSS/JS , reduces the size before sending it to the browser basically  -> makes eveything load fast 

  // Headers for security and caching
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" }, // stops site from showing in the <iframe> , prevents clickjacking
          { key: "X-Content-Type-Options", value: "nosniff" }, // stops browser from guessing file types
          { key: "Referrer-Policy", value: "origin-when-cross-origin" }, // controls what referral data is sent 
          { key: "X-DNS-Prefetch-Control", value: "on" }, // browser preloads the domain lookups -> speeds up future loads
        ],
      },
      {
        source: "/api/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, stale-while-revalidate=60", // telling the browser and CDN-> cache this api response for 1 hour (3600)
            // If its stale -> use it for 60 seconds more while fetching a fresh one -> great for speed  
          },
        ],
      },
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable", // Cache these static files ( compliled JS/CSS) for 1 Full year because they never change 
            //! #### IMMUTABLE #### 
            // -< this means dont even ask browser if it changed or not , just use the cached version
          },
        ],
      },
    ];
  },

  // Custom webpack config
  webpack: (config: Configuration) => {
    // Tweaking the webpack for certain command -> uses Bundle analyser tells us which of the file is bottleneck and keeping our website slow af 
    if (isAnalyze) {
      config.plugins = config.plugins || [];
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: "server",
          openAnalyzer: true,
        })
      );
    }
    return config; // return a modified config 
  },
};

export default nextConfig;
