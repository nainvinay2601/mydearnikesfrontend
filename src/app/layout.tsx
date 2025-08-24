
import type { Metadata, Viewport } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import localfont from "next/font/local"
import { SpeedInsights } from "@vercel/speed-insights/next";

import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import AnalyticsWrapper from "@/components/analytics/AnalyticsWrapper";
import Header from "@/components/basics/Header";

// Optimized font loading with variable fonts
const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
  preload: true,
});


const ispire = localfont(
  {
    src:[
      {
        path:"../../public/fonts/OPTISpire.woff2",
        weight:"400",
      }
    ], 
    variable:"--font-ispire"
  }
)

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-bebas-neue",
  preload: true,
});



// Separate viewport export (Next.js 14+ requirement)
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://mydearnikes.com"
  ),
  title: {
    template: "%s | MyDearNikes",
    default: "MyDearNikes - T-shirts and Tops | Shop Online",
  },
  description:
    "MyDearNikes offers unique Tees with bold, statements designs. Shop now for premium, limited-edition Tees and look Cool",
  keywords: [
    // Original e-commerce keywords
    "ecommerce",
    "online store",
    "premium products",
    "fast shipping",
    "quality products",
    "online shopping",
    // Product-specific keywords
    "statement tees",
    "graphic tees",
    "t-shirts online",
    "bold design shirts",
    "limited edition apparel",
    "MyDearNikes",
    "designer t-shirts",
    "men's tops",
    "women's tees",
    "buy t-shirts online",
  ],
  authors: [{ name: "MyDearNikes Design Team" }],
  creator: "MyDearNikes",
  publisher: "MyDearNikes",
  category: "fashion",
  classification: "Business",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "MyDearNikes",
    title: "T-shirts and Tops | Shop Online - MyDearNikes",
    description:
      "MyDearNikes offers unique Tees with bold, statements designs. Shop now for premium, limited-edition Tees and look Cool",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MyDearNikes - Bold Statement Streetwear",
        type: "image/jpeg",
      },
      {
        url: "/og-image-square.jpg",
        width: 1200,
        height: 1200,
        alt: "MyDearNikes Collection",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@mydearnikes",
    creator: "@mydearnikes",
    title: "T-shirts and Tops | Shop Online - MyDearNikes",
    description:
      "MyDearNikes offers unique Tees with bold, statements designs. Shop now for premium, limited-edition Tees and look Cool",
    images: [
      {
        url: "/twitter-image.jpg",
        alt: "MyDearNikes Statement Tees",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    yandex: process.env.YANDEX_VERIFICATION,
    other: {
      "msvalidate.01": process.env.BING_SITE_VERIFICATION || "",
    },
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "format-detection": "telephone=no",
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/greenapplejuice.ico", sizes: "any" },
      
    ],
   
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={"scroll-smooth antialiased"}
    >
      <head>
        {/* Critical resource hints for performance */}
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://images.unsplash.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://cdn.shopify.com"
          crossOrigin="anonymous"
        />

        {/* DNS prefetch for third-party services */}
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//vitals.vercel-analytics.com" />
        <link rel="dns-prefetch" href="//va.vercel-scripts.com" />

        {/* Preload critical CSS/JS if needed */}
        <link
          rel="preload"
          href="/fonts/OPTISpire.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* Security headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta
          httpEquiv="Referrer-Policy"
          content="strict-origin-when-cross-origin"
        />

        {/* Performance optimizations */}
        <meta name="generator" content="Next.js" />
        <meta name="color-scheme" content="light dark" />
      </head>

      <body className={`  ${inter.variable} ${bebasNeue.variable}   ${ispire.variable}`}>
        {/* Skip navigation for accessibility */}
        {/* <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium transition-all focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
        >
          Skip to main content
        </a> */}

        {/* Theme provider for dark/light mode */}
        {/* TODO: Add ThemeProvider component if dark/light mode is needed */}

        {/* Main application structure */}
        <div className="relative flex min-h-screen flex-col">
          {/* Header/Navigation would go here */}
          <Header />

          {/* Main content area */}
          <main id="main-content" className="flex-1">
            {children}
          </main>

          {/* Footer would go here */}
        </div>

        {/* Global UI components */}
        <Toaster position="bottom-right" expand={true} richColors closeButton />

        {/* TODO: Add CookieConsent component if GDPR compliance is needed */}

        {/* Analytics and monitoring (place before closing body) */}
        <AnalyticsWrapper />
        <SpeedInsights
          sampleRate={process.env.NODE_ENV === "production" ? 1 : 0}
        />

        {/* Structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ClothingStore",
              name: "MyDearNikes",
              description:
                "Premium statement tees and streetwear with bold designs",
              url: process.env.NEXT_PUBLIC_APP_URL,
              logo: `${process.env.NEXT_PUBLIC_APP_URL}/logo.png`,
              sameAs: [
                "https://instagram.com/mydearnikes",
                "https://twitter.com/mydearnikes",
                "https://tiktok.com/@mydearnikes",
              ],
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: `${process.env.NEXT_PUBLIC_APP_URL}/search?q={search_term_string}`,
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
