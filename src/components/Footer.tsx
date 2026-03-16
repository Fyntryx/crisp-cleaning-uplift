import Link from "next/link";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Reviews", href: "/review" },
  { name: "FAQs", href: "/faq" },
  { name: "Contact", href: "/contact" },
];

const Footer = () => {
  return (
    <footer className="relative w-full mt-10 overflow-hidden rounded-t-[3rem]">

      <div
        className="absolute bottom-0 left-0 w-full h-[90%] bg-cover bg-top bg-no-repeat z-0"
        style={{ backgroundImage: `url(/footer-bg.png)` }} 
      />

      {/* 3. GLASS MORPHISM LAYER */}
      <div className="absolute inset-0 w-full h-full backdrop-blur-sm bg-white/15 border-t border-white/20 z-0" />

      {/* 4. CONTENT CONTAINER */}
      <div className="relative z-10 w-full px-6 py-12 md:px-12 md:py-16">
        {/* Grid Layout */}
        <div className="grid md:grid-cols-7 gap-10 md:gap-8 text-center md:text-left">
          {/* Logo Section */}
          <div className="md:col-span-3 flex flex-col items-center md:items-start">
            <span className="text-3xl font-display font-bold mb-6 block text-foreground">
              crisp.
            </span>
            <p className="text-foreground/80 max-w-md leading-relaxed font-medium">
              Transforming spaces, one clean at a time. We're committed to
              delivering exceptional cleaning services that exceed expectations.
            </p>
          </div>

          {/* Sitemap */}
          <div className="md:col-span-1 flex flex-col items-center md:items-start">
            <h4 className="font-bold mb-6 text-foreground text-lg">Sitemap</h4>
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-foreground/70 hover:text-foreground transition-colors font-medium">
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Help & Support */}
          <div className="md:col-span-3 flex flex-col items-center md:items-end">
            <div className="flex flex-col items-center md:items-start">
              <h4 className="font-bold mb-6 text-foreground text-lg">
                Help & Support
              </h4>
              <div className="space-y-4 flex flex-col items-center md:items-start">
                <a
                  href="tel:1300123456"
                  className="text-foreground/70 hover:text-foreground transition-colors block text-lg font-bold mb-2">
                  1300 123 456
                </a>
                <a
                  href="mailto:crispcleaningmelbourne@outlook.com"
                  className="text-foreground/70 hover:text-foreground transition-colors block text-sm break-all font-medium">
                  crispcleaningmelbourne@outlook.com
                </a>
                <Link
                  href="/contact"
                  className="text-foreground/70 hover:text-foreground transition-colors block font-medium">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="border-t border-foreground/10 pt-8 mt-20 flex flex-col-reverse md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <p className="text-foreground/60 text-sm font-medium">
            © 2024 Crisp Cleaning. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            <a
              href="#"
              className="text-foreground/60 hover:text-foreground/80 text-sm transition-colors font-medium">
              Style Guide
            </a>
            <a
              href="#"
              className="text-foreground/60 hover:text-foreground/80 text-sm transition-colors font-medium">
              Licenses
            </a>
            <a
              href="#"
              className="text-foreground/60 hover:text-foreground/80 text-sm transition-colors font-medium">
              Changelog
            </a>
            <a
              href="#"
              className="text-foreground/60 hover:text-foreground/80 text-sm transition-colors font-medium">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
