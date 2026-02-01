"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Reviews", href: "/review" },
  { name: "FAQs", href: "/faq" },
  { name: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isHomePage = pathname === "/";

  const [radius, setRadius] = useState(0);
  const ANIMATION_END_POINT = 300;

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > ANIMATION_END_POINT);

      const progress = Math.min(scrollY / 200, 1);
      const newRadius = progress * 40;
      setRadius(newRadius);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showScrolledStyle = !isHomePage || isScrolled;

  const textColorClass = showScrolledStyle
    ? "text-foreground/70"
    : "text-white/90";
  const hoverColorClass = "hover:text-primary";

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);

    if (href.startsWith("/#")) {
      const hash = href.substring(1);
      if (pathname === "/") {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ease-linear ${
        showScrolledStyle
          ? "bg-card/90 backdrop-blur-lg shadow-sm py-3"
          : "bg-transparent py-6"
      }`}
      style={{
        borderBottomLeftRadius: !isHomePage ? "0px" : `${radius}px`,
        borderBottomRightRadius: !isHomePage ? "0px" : `${radius}px`,
      }}>
      <div className="container mx-auto px-6 flex items-center justify-between relative">
        <Link
          href="/"
          className="flex items-center gap-2 outline-none border-none ring-0 focus:outline-none focus:ring-0">
          <img
            src="/logo.png"
            alt="Crisp Logo"
            className="h-14 w-auto object-contain outline-none border-none"
          />
        </Link>

        <nav
          className="hidden md:flex items-center gap-6 max-[990px]:flex-1 max-[990px]:justify-center min-[991px]:absolute min-[991px]:left-1/2 min-[991px]:top-1/2 
  min-[991px]:-translate-x-1/2 min-[991px]:-translate-y-1/2 min-[991px]:gap-8">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/" ? pathname === "/" : pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`text-sm font-medium transition-colors duration-300 ${hoverColorClass} ${
                  isActive ? "text-primary" : textColorClass
                }`}>
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className={
              showScrolledStyle
                ? ""
                : "text-white hover:bg-white/20 hover:text-white"
            }>
            <Link
              href={
                process.env.NEXT_PUBLIC_API_BASE_URL ||
                "https://crisp-cleaning-app-seven.vercel.app/"
              }>
              Login
            </Link>
          </Button>
          <Button variant="hero" size="default" className="mr-10">
            Get Started Now
          </Button>
        </div>

        <button
          className={`md:hidden p-2 transition-colors ${
            showScrolledStyle ? "text-foreground" : "text-white"
          }`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border animate-fade-in">
          <nav className="container mx-auto px-6 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-base font-medium text-foreground/70 hover:text-primary transition-colors"
                onClick={() => handleNavClick(link.href)}>
                {link.name}
              </Link>
            ))}
            <div className="flex flex-col gap-3 pt-4 border-t border-border">
              <Button variant="ghost" asChild>
                <Link
                  href={
                    process.env.NEXT_PUBLIC_API_BASE_URL ||
                    "https://crisp-cleaning-app-seven.vercel.app/"
                  }>
                  Login
                </Link>
              </Button>
              <Button variant="hero">Get Started Now</Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
