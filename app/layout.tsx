import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

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
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "3 Birds Studio",
  },
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
