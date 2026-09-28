import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const SITE_TITLE = "TTdevs | Full-stack Developers";
const SITE_DESCRIPTION = "Crafting minimalist, high-performance digital experiences.";

export const metadata: Metadata = {
  metadataBase: new URL("https://ttdevs.com"),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  // The og:image comes from app/opengraph-image.tsx.
  openGraph: {
    type: "website",
    siteName: "TTdevs",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${jetbrainsMono.variable} antialiased font-sans`}>
        <div className="min-h-screen bg-black">
          {children}
        </div>
      </body>
    </html>
  );
}
