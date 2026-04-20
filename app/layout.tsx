import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import MetaPixel from "@/components/MetaPixel";
import PixelPageViewTracker from "@/components/PixelPageViewTracker";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://3birdsstudio.com"),
  title: {
    default: "3 Birds Studio | Fine Art Portraits in Missoula, Montana",
    template: "%s | 3 Birds Studio",
  },
  description:
    "Professional portrait photography by Jesse & Nelli. Outdoor sessions at Council Grove State Park and Legacy studio sessions. Missoula, Montana.",
  keywords: [
    "portrait photography",
    "Missoula Montana photographer",
    "family portraits",
    "fine art portraits",
    "3 Birds Studio",
    "Council Grove State Park",
    "legacy portraits",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "3 Birds Studio",
    url: "/",
    images: [
      {
        url: "/images/summer-banner.jpg",
        width: 1200,
        height: 630,
        alt: "3 Birds Studio portrait session",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/summer-banner.jpg"],
  },
  verification: {
    other: {
      // From Meta Business Settings → Brand Safety → Domains.
      // Required to associate this domain with the Meta Pixel + Ads Manager.
      'facebook-domain-verification': '1nz6ktghi5my4ogfdhlwq6tith1jdj',
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#0d1b2a", // navy — matches site brand
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <MetaPixel />
        <PixelPageViewTracker />
        {children}
      </body>
    </html>
  );
}
