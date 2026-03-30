import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://craf-t-studio.vercel.app'),
  title: "G-Park Case Study | CRAF-T Studio",
  description:
    "How G-Park turned seven videos into one powerful story. A 56-second 3D animation that consolidated an entire product line into a single marketing asset.",
  keywords: [
    "G-Park",
    "CRAF-T Studio",
    "3D Animation",
    "Smart Parking",
    "Automated Parking Systems",
    "Motion Design",
    "Case Study",
  ],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "G-Park Case Study | CRAF-T Studio",
    description:
      "How G-Park turned seven videos into one powerful story.",
    type: "article",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
