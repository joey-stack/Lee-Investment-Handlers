import type { Metadata } from "next";
import { Didact_Gothic, Geist } from "next/font/google";
import { ScrollTrigger } from "@/components/layout/ScrollTrigger";
import { AuthProvider } from "@/context/AuthContext";
import { StructuredData } from "@/components/seo/StructuredData";
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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.leeinvestmenthandlers.com"),
  title: {
    default: "LEE Investment Handlers | Managing Wealth. Building Legacies.",
    template: "%s | LEE Investment Handlers",
  },
  description: "Disciplined wealth management and institutional portfolio strategies operating across Lagos and Venice.",
  keywords: [
    "LEE Investment Handlers",
    "Lee Wealth Management",
    "Wealth Management Lagos",
    "Wealth Management Venice",
    "Portfolio Management",
    "Investment Advisory",
    "Capital Preservation"
  ],
  authors: [{ name: "LEE Investment Handlers" }],
  creator: "LEE Investment Handlers",
  publisher: "LEE Investment Handlers",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "LEE Investment Handlers | Managing Wealth. Building Legacies.",
    description: "Disciplined wealth management and institutional portfolio strategies operating across Lagos and Venice.",
    url: "https://www.leeinvestmenthandlers.com",
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
    description: "Disciplined wealth management and institutional portfolio strategies operating across Lagos and Venice.",
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
      <head>
        <StructuredData />
      </head>
      <body
        className="min-h-full flex flex-col bg-brand-bg-primary text-brand-primary"
        suppressHydrationWarning
      >
        <AuthProvider>
          <ScrollTrigger />
          <div className="flex-1 flex flex-col">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
