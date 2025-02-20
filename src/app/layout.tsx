import type { Metadata } from "next";
import { Inter, Fraunces, JetBrains_Mono, Caveat } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SmoothScroll } from '@/components/SmoothScroll'
import { Analytics } from '@vercel/analytics/react';
import { PageTransition } from '@/components/PageTransition';

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  axes: ["SOFT", "WONK", "opsz"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
});

const caveat = Caveat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-caveat',
});

export const metadata: Metadata = {
  title: "NextStage - Turn Your Vision into Reality",
  description: "Strategic design and coaching for founders who want to make an impact.",
  icons: [
    { rel: 'icon', url: '/favicon.ico' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', url: '/favicon-32x32.png' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', url: '/favicon-16x16.png' },
    { rel: 'apple-touch-icon', sizes: '180x180', url: '/apple-touch-icon.png' }
  ]
};

const globalStyles = `
  link[rel*="icon"] {
    border-radius: 50%;
    mask-image: url("data:image/svg+xml,%3Csvg width='100%' height='100%' viewBox='0 0 100 100' version='1.1' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='50' cy='50' r='50'/%3E%3C/svg%3E");
    mask-mode: alpha;
    -webkit-mask-image: url("data:image/svg+xml,%3Csvg width='100%' height='100%' viewBox='0 0 100 100' version='1.1' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='50' cy='50' r='50'/%3E%3C/svg%3E");
    -webkit-mask-mode: alpha;
  }
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(
      inter.variable,
      fraunces.variable,
      jetbrainsMono.variable,
      caveat.variable,
      'font-sans'
    )}>
      <head>
        <style type="text/css">{globalStyles}</style>
      </head>
      <body className="bg-surface-50 text-secondary-900 antialiased">
        <SmoothScroll>
          <PageTransition>
            {children}
          </PageTransition>
        </SmoothScroll>
        <Analytics />
      </body>
    </html>
  );
}
