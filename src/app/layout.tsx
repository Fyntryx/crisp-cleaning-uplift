import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import Providers from "./providers";
import StickyPhoneWidget from "@/components/StickyPhoneWidget";
import RadiusInitializer from "@/components/RadiusInitializer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Crisp Cleaning",
  description: "Transforming spaces, one clean at a time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`overflow-x-hidden ${poppins.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NJ7235LM');`
        }} />
      </head>
      <body className={`${poppins.className} font-sans antialiased text-gray-800 overflow-x-hidden w-full relative`}>
        <noscript dangerouslySetInnerHTML={{
          __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NJ7235LM" height="0" width="0" style="display:none;visibility:hidden"></iframe>`
        }} />
        <Providers>
          <RadiusInitializer />
          {children}
          <Toaster />
          <Sonner />
          <StickyPhoneWidget />
        </Providers>
      </body>
    </html>
  );
}
