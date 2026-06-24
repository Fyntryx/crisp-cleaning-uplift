import type { Metadata } from "next";
import { Suspense } from "react";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import Providers from "./providers";
import StickyPhoneWidget from "@/components/StickyPhoneWidget";
import RadiusInitializer from "@/components/RadiusInitializer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import GTMTracker from "@/components/GTMTracker";
import SchemaMarkup from "@/components/SchemaMarkup";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://crispcleaning.com.au'),
  title: "Crisp Cleaning",
  description: "Transforming spaces, one clean at a time.",
  verification: {
    google: "e7JFcIzjjtJfxgSxSfDX6GX2Ss22YERkACMyxrf_47k",
    other: {
      "facebook-domain-verification": "xy9zujobkcq3kusurwf2ufscv2xkwv",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`overflow-x-hidden ${poppins.variable}`}>
      <head>
        {/* Google Tag Manager */}
        <script dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-5ZSN38DX');`
        }} />
        {/* Facebook Pixel */}
        <script dangerouslySetInnerHTML={{
          __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1423539059415877');
fbq('track', 'PageView');`
        }} />
      </head>
      <body className={`${poppins.className} font-sans antialiased text-gray-800 overflow-x-hidden w-full relative`}>
        <noscript dangerouslySetInnerHTML={{
          __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5ZSN38DX" height="0" width="0" style="display:none;visibility:hidden"></iframe>`
        }} />
        <noscript dangerouslySetInnerHTML={{
          __html: `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=1423539059415877&ev=PageView&noscript=1" />`
        }} />
        <Providers>
          <RadiusInitializer />
          <Suspense fallback={null}>
            <GTMTracker />
          </Suspense>
          <SchemaMarkup />
          {children}
          <Toaster />
          <Sonner />
          <StickyPhoneWidget />
          <SpeedInsights />
          <Analytics />
        </Providers>

        {/* Google Tag Manager loaded via Next.js Script */}
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-5ZSN38DX');
            `,
          }}
        />
      </body>
    </html>
  );
}
