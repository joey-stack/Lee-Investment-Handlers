import type { Metadata } from "next";
import { Didact_Gothic, Geist } from "next/font/google";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const didactGothic = Didact_Gothic({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-heading",
});

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://leeinvestments.com"),
  title: {
    default: "LEE Investment Handlers | Managing Wealth. Building Legacies.",
    template: "%s | LEE Investment Handlers",
  },
  description: "Disciplined wealth management and institutional-grade portfolio strategies for high-net-worth individuals, families, and organizations.",
  openGraph: {
    title: "LEE Investment Handlers | Managing Wealth. Building Legacies.",
    description: "Disciplined wealth management and institutional-grade portfolio strategies for high-net-worth individuals, families, and organizations.",
    url: "https://leeinvestments.com",
    siteName: "LEE Investment Handlers",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "LEE Investment Handlers Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LEE Investment Handlers | Managing Wealth. Building Legacies.",
    description: "Disciplined wealth management and institutional-grade portfolio strategies for high-net-worth individuals, families, and organizations.",
    images: ["/og-image.png"],
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
      className={`${didactGothic.variable} ${geistSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col bg-brand-bg-primary text-brand-primary"
        suppressHydrationWarning
      >
        <Nav />
        <div className="flex-1">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
