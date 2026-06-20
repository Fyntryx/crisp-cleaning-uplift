import Link from "next/link";
import Image from "next/image";
import { Star, ArrowRight } from "lucide-react";
import { getLiveSuburbs } from "@/lib/suburbs";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/#services" },
  { name: "— Standard House Clean", href: "/house-cleaning-melbourne", isSub: true },
  { name: "— Deep Clean", href: "/deep-cleaning-melbourne", isSub: true },
  { name: "— Vacate Clean", href: "/end-of-lease-cleaning-melbourne", isSub: true },
  { name: "Reviews", href: "/#testimonials" },
  { name: "Contact", href: "/contact" },
];

interface FooterProps {
  googleRatingValue?: number;
}

const Footer = ({ googleRatingValue = 4.9 }: FooterProps = {}) => {
  const liveSuburbs = getLiveSuburbs();
  
  return (
    <footer className="relative w-full rounded-t-[3rem] overflow-hidden border-t border-white/40 shadow-[0_-10px_40px_rgba(0,0,0,0.03)]">

      {/* 1. MINIMALIST COLORED GRADIENT (No Images) */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-primary/5 z-0"></div>

      {/* 2. GLASSMORPHISM BLUR LAYER */}
      <div className="absolute inset-0 backdrop-blur-[100px] bg-white/40 z-0"></div>

      {/* 3. MAIN CONTENT */}
      <div className="relative z-10 w-full px-6 py-12 md:px-12 md:py-20 max-w-7xl mx-auto">

        {/* Inline Glass Trust Banner */}
        <div className="mb-16 flex flex-col md:flex-row items-center justify-between gap-4 p-6 bg-white/50 backdrop-blur-md border border-white/60 rounded-3xl shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-5 h-5 fill-primary text-primary" />
              ))}
            </div>
            <span className="font-bold text-foreground">{googleRatingValue}/5 Average Rating</span>
          </div>
          <p className="text-muted-foreground font-medium text-sm md:text-base text-center">
            Trusted by hundreds of homes across Melbourne
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid md:grid-cols-12 gap-12 md:gap-8 text-center md:text-left">

          {/* Logo & About */}
          <div className="md:col-span-5 flex flex-col items-center md:items-start">
            {/* <-- Replaced Text with Logo Image --> */}
            <Image
              src="/crisp-cleaning-logo.webp?v=3"
              alt="Crisp Cleaning Logo"
              width={200}
              height={48}
              // Added md:-ml-3 to pull it left and optically align the logo text with the paragraph
              className="h-12 w-auto mb-6 object-contain md:-ml-3"
            />
            <p className="text-muted-foreground max-w-sm leading-relaxed font-medium mb-8">
              Transforming spaces, one clean at a time. We're committed to delivering exceptional, reliable cleaning services across Melbourne.
            </p>
          </div>

          {/* Sitemap */}
          <div className="hidden md:flex md:col-span-3 flex-col items-center md:items-start">
            <h4 className="font-bold mb-6 text-foreground text-lg tracking-wide">Sitemap</h4>
            <nav className="flex flex-col gap-3 w-full items-center md:items-start">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`group flex items-center transition-all font-medium py-1 ${link.isSub ? "ml-4 text-sm text-muted-foreground/80 hover:text-primary" : "text-muted-foreground hover:text-primary"}`}
                >
                  <ArrowRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 mr-2" />
                  <span>{link.name}</span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Service Areas (Dynamic) */}
          {liveSuburbs.length > 0 && (
            <div className="hidden lg:flex md:col-span-2 flex-col items-start">
              <h4 className="font-bold mb-6 text-foreground text-lg tracking-wide">Service Areas</h4>
              <nav className="flex flex-col gap-2 w-full items-start">
                {liveSuburbs.map((suburb) => (
                  <Link
                    key={suburb.slug}
                    href={`/house-cleaning-${suburb.slug}`}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium"
                  >
                    {suburb.name}
                  </Link>
                ))}
              </nav>
            </div>
          )}

          {/* Help & Support */}
          <div className={`md:col-span-4 lg:col-span-${liveSuburbs.length > 0 ? '2' : '4'} flex flex-col items-center md:items-start md:items-end`}>
            <div className="flex flex-col items-center md:items-start">
              <h4 className="font-bold mb-6 text-foreground text-lg tracking-wide">Help & Support</h4>
              <div className="space-y-3 flex flex-col items-center md:items-start">
                {/* <-- Updated Phone Number --> */}
                <a href="tel:0451433786" className="text-foreground hover:text-primary transition-colors block text-2xl font-bold mb-2">
                  0451 433 786
                </a>
                <a href="mailto:crispcleaningmelbourne@gmail.com" className="text-muted-foreground hover:text-primary transition-colors block font-medium">
                  crispcleaningmelbourne@gmail.com
                </a>
                <Link href="/contact" className="text-primary font-bold hover:underline transition-all mt-2 inline-flex items-center gap-2">
                  Send us a message <span className="text-xl">&rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="border-t border-border/40 pt-8 mt-16 flex flex-col-reverse md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <p className="text-muted-foreground text-sm font-medium">
            © {new Date().getFullYear()} Crisp Cleaning. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            <Link href="/refund-cancellation" className="text-muted-foreground hover:text-primary text-sm transition-colors font-medium">Refund Policy</Link>
            <Link href="/privacy-policy" className="text-muted-foreground hover:text-primary text-sm transition-colors font-medium">Privacy Policy</Link>
            <Link href="/terms-conditions" className="text-muted-foreground hover:text-primary text-sm transition-colors font-medium">Terms & Conditions</Link>
            <Link href="/commercial-agreement" className="text-muted-foreground hover:text-primary text-sm transition-colors font-medium">Commercial Service Agreement</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
