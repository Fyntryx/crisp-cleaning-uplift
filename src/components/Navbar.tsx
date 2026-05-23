"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Phone,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

import { RefreshCw, Sparkles, Key } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  {
    name: "Services",
    href: "#",
    subLinks: [
      { 
        name: "Standard House Clean", 
        desc: "Consistent maintenance on your schedule",
        href: "/services/standard-house-clean",
        icon: RefreshCw 
      },
      { 
        name: "Deep Clean", 
        desc: "A thorough reset for every room",
        href: "/services/deep-clean",
        icon: Sparkles 
      },
      { 
        name: "Vacate Clean", 
        desc: "Cleaned to inspection standard",
        href: "/services/vacate-clean",
        icon: Key 
      },
    ],
  },
  { name: "About Us", href: "/about" },
  { name: "Service Areas", href: "/#services" },
  { name: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const textColorClass = isScrolled || !isHomePage
    ? "text-neutral-700 hover:text-[#FB8C42]"
    : "text-white/90 hover:text-[#FB8C42]";

  const hoverColorClass = "hover:text-[#FB8C42]";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled 
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 py-3.5" 
          : isHomePage
            ? "bg-transparent py-5 border-b border-transparent shadow-none"
            : "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 py-3.5"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between relative">
        <Link
          href="/"
          className="flex items-center outline-none border-none ring-0 focus:outline-none focus:ring-0 shrink-0"
        >
          <img 
            src="/logo.png?v=3" 
            alt="Crisp Cleaning" 
            className="h-12 md:h-14 w-auto object-contain"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {navLinks.map((link) => {
            if (link.subLinks) {
              const isSubActive = link.subLinks.some(
                (sub) => sub.href === pathname,
              );
              return (
                <div key={link.name} className="relative group">
                  <div
                    className={cn(
                      "flex items-center gap-1 text-[14.5px] font-medium transition-colors duration-300 outline-none cursor-pointer py-6",
                      hoverColorClass,
                      isSubActive ? "text-[#FB8C42]" : textColorClass
                    )}
                  >
                    {link.name}
                    <ChevronDown size={14} className="opacity-70 group-hover:rotate-180 transition-transform duration-300" />
                  </div>
                  {/* Hover Dropdown */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-[340px] bg-white rounded-2xl shadow-xl border border-gray-100 p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    {link.subLinks.map((subLink) => {
                      const Icon = subLink.icon;
                      return (
                        <Link
                          key={subLink.href}
                          href={subLink.href}
                          onClick={() => handleNavClick(subLink.href)}
                          className="flex items-start gap-4 p-3 rounded-xl hover:bg-orange-50/50 transition-colors group/item"
                        >
                          <div className="bg-[#FFF4ED] text-[#FB8C42] p-2.5 rounded-xl shrink-0 group-hover/item:scale-110 transition-transform duration-300">
                            {Icon && <Icon size={20} strokeWidth={2.5} />}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[15px] font-bold text-gray-900 group-hover/item:text-[#FB8C42] transition-colors">{subLink.name}</span>
                            <span className="text-[13px] text-gray-500 font-medium mt-0.5">{subLink.desc}</span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            }

            const isActive =
              link.href === "/" ? pathname === "/" : pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => handleNavClick(link.href)}
                className={cn(
                  "text-[14.5px] font-medium transition-colors duration-300",
                  hoverColorClass,
                  isActive ? "text-[#FB8C42] font-bold" : textColorClass
                )}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-6">
          <a
            href="tel:0451433786"
            className={cn(
              "flex items-center gap-2 text-[15px] font-semibold transition-colors duration-300",
              isScrolled || !isHomePage
                ? "text-neutral-700 hover:text-[#FB8C42]"
                : "text-white/90 hover:text-[#FB8C42]"
            )}
          >
            <Phone size={16} className="opacity-80" />
            <span>0451 433 786</span>
          </a>

          <Button 
            variant="hero" 
            size="default" 
            style={{
              boxShadow: "rgba(251, 140, 66, 0.32) 0px 8px 24px, rgba(251, 140, 66, 0.18) 0px 2px 6px"
            }}
            className="rounded-full px-6 py-2.5 text-[14px] font-semibold bg-[#FB8C42] hover:bg-[#FB8C42]/90 text-white transition-all duration-300 flex items-center justify-center hover:scale-[1.02]"
            asChild
          >
            <Link href="/#booking">Get an Instant Quote</Link>
          </Button>
        </div>

        {/* --- MOBILE MENU TOGGLE --- */}
        <button
          className={cn(
            "md:hidden p-2 transition-colors rounded-xl",
            isScrolled || !isHomePage ? "text-neutral-800" : "text-white"
          )}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* --- MOBILE MENU CONTENT --- */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-xl border-t border-gray-150 animate-fade-in max-h-[85vh] overflow-y-auto">
          <nav className="container mx-auto px-6 py-6 flex flex-col gap-4">
            {navLinks.map((link) => {
              if (link.subLinks) {
                return (
                  <div key={link.name} className="flex flex-col gap-2">
                    <span className="text-xs font-extrabold text-neutral-400 uppercase tracking-widest px-0 py-1">
                      {link.name}
                    </span>
                    <div className="flex flex-col gap-2 pl-4 border-l border-gray-150">
                      {link.subLinks.map((subLink) => (
                        <Link
                          key={subLink.href}
                          href={subLink.href}
                          className="text-[15px] font-semibold text-neutral-700 hover:text-[#FB8C42] transition-colors"
                          onClick={() => handleNavClick(subLink.href)}
                        >
                          {subLink.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-[15px] font-semibold text-neutral-700 hover:text-[#FB8C42] transition-colors"
                  onClick={() => handleNavClick(link.href)}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="flex flex-col gap-3 pt-4 border-t border-gray-150">
              <a href="tel:0451433786" className="flex items-center justify-center gap-2 font-bold py-2 text-neutral-800 hover:text-[#FB8C42] transition-colors">
                <Phone size={16} className="text-[#FB8C42]" /> 0451 433 786
              </a>
              <Button 
                variant="hero" 
                className="w-full rounded-full bg-[#FB8C42] text-white font-bold"
                asChild
              >
                <Link href="/#booking" onClick={() => setIsMobileMenuOpen(false)}>
                  Get an Instant Quote
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
