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
import { serviceRegions } from "@/lib/regions";
import { RefreshCw, Sparkles, Key, MapPin } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  {
    name: "Services",
    href: "#",
    subLinks: [
      {
        name: "Standard House Clean",
        desc: "Consistent maintenance on your schedule",
        href: "/house-cleaning-melbourne",
        icon: RefreshCw
      },
      {
        name: "Deep Clean",
        desc: "A thorough reset for every room",
        href: "/deep-cleaning-melbourne",
        icon: Sparkles
      },
      {
        name: "Vacate Clean",
        desc: "Cleaned to inspection standard",
        href: "/end-of-lease-cleaning-melbourne",
        icon: Key
      },
    ],
  },
  { name: "About Us", href: "/about" },
  { 
    name: "Service Areas", 
    href: "/house-cleaning-melbourne#service-area",
    isMegaMenu: true,
  },
  { name: "Contact", href: "/contact" },
];

export default function Navbar({ bookingLink = "/book" }: { bookingLink?: string }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Ensure navbar starts transparent on homepage and v2 (which have dark heroes)
  const isTransparentTop = pathname === "/" || pathname === "/v2";

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

  const textColorClass = isScrolled || !isTransparentTop
    ? "text-neutral-700 hover:text-[#FB8C42]"
    : "text-white/90 hover:text-[#FB8C42]";

  const hoverColorClass = "hover:text-[#FB8C42]";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-[#f2eadf] py-[calc(0.875*var(--scale-unit))]"
          : isTransparentTop
            ? "bg-white md:bg-transparent py-[calc(0.875*var(--scale-unit))] border-b border-[#f2eadf] md:border-transparent shadow-sm md:shadow-none"
            : "bg-white/95 backdrop-blur-md shadow-sm border-b border-[#f2eadf] py-[calc(0.875*var(--scale-unit))]"
      )}
    >
      <div className="container mx-auto px-[calc(1.875*var(--scale-unit))] flex items-center relative">
        <Link
          href="/"
          className="flex items-center outline-none border-none ring-0 focus:outline-none focus:ring-0 shrink-0"
        >
          <img
            src="/crisp-cleaning-logo.webp?v=3"
            alt="Crisp Cleaning"
            className="h-12 md:h-14 w-auto object-contain"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8 absolute left-[46%] top-1/2 -translate-x-1/2 -translate-y-1/2">
          {navLinks.map((link) => {
            if (link.isMegaMenu) {
              const isSubActive = serviceRegions.some(region => 
                region.suburbs.some(sub => (sub.path || `/house-cleaning-${sub.slug}`) === pathname)
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
                  {/* Mega Menu Dropdown */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-xl border border-gray-100 p-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 w-[850px]">
                    <div className="grid grid-cols-5 gap-6">
                      {serviceRegions.map((region) => {
                        const Icon = region.icon;
                        return (
                          <div key={region.region} className="flex flex-col">
                            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-100">
                              <Icon size={20} className={region.iconClass} strokeWidth={2} {...(region.iconProps || {})} />
                              <h4 className="text-[13px] font-bold text-gray-900 uppercase tracking-wide">{region.region}</h4>
                            </div>
                            <div className="flex flex-col gap-2.5">
                              {region.suburbs.map((subLink) => {
                                const href = subLink.path || `/house-cleaning-${subLink.slug}`;
                                return (
                                  <Link
                                    key={href}
                                    href={href}
                                    onClick={() => handleNavClick(href)}
                                    className="text-[13px] font-medium text-gray-600 hover:text-[#FB8C42] transition-colors"
                                  >
                                    {subLink.name}
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            }

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
                  <div className={cn(
                    "absolute top-full left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-xl border border-gray-100 p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0",
                    "w-[340px]"
                  )}>
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
                            {Icon && <Icon size={20} strokeWidth={2.5} /> }
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
        <div className="hidden md:flex items-center gap-4 ml-auto">
          <a
            href="tel:0451433786"
            className={cn(
              "flex items-center gap-2 text-[15px] font-semibold transition-colors duration-300",
              isScrolled || !isTransparentTop
                ? "text-neutral-700 hover:text-[#FB8C42]"
                : "text-white/90 hover:text-[#FB8C42]"
            )}
          >
            <Phone size={16} className="opacity-80" />
            <span>0451 433 786</span>
          </a>

          <a
            href="https://app.crispcleaning.com.au/"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "text-[14.5px] font-bold px-5 py-2 rounded-full border transition-all duration-200 hover:-translate-y-0.5",
              isScrolled || !isTransparentTop
                ? "border-[#FB8C42] text-[#FB8C42] hover:bg-[#FB8C42] hover:text-white"
                : "border-white/60 text-white/90 hover:bg-white hover:text-[#FB8C42]"
            )}
          >
            Login
          </a>

          <div className="hidden lg:block">
            <Link href={bookingLink}>
              <button className="bg-[#FB8C42] hover:bg-[#ea6309] text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-[0_4px_14px_rgba(249,115,22,0.3)] transition-all hover:-translate-y-0.5">
                Get an Instant Quote
              </button>
            </Link>
          </div>
        </div>

        {/* --- MOBILE CTA & TOGGLE --- */}
        <div className="flex md:hidden items-center gap-3 ml-auto">
          <Link
            href={bookingLink}
            className="px-4 py-2 bg-[#FB8C42] hover:bg-[#FB8C42]/90 text-white text-[13px] font-bold rounded-full shadow-[0_4px_14px_rgba(251,140,66,0.35)] transition-colors"
          >
            Get a Quote
          </Link>
          <button
            className={cn(
              "w-9 h-9 flex items-center justify-center transition-colors rounded-full border",
              isScrolled || !isTransparentTop
                ? "text-neutral-800 border-gray-200 bg-white shadow-sm"
                : "text-neutral-800 border-gray-200 bg-white shadow-sm md:text-white md:border-white/20 md:bg-white/10"
            )}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* --- MOBILE MENU CONTENT --- */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-xl border-t border-gray-150 animate-fade-in max-h-[85vh] overflow-y-auto">
          <nav className="container mx-auto px-6 py-6 flex flex-col gap-4">
            {navLinks.map((link) => {
              if (link.isMegaMenu) {
                return (
                  <div key={link.name} className="flex flex-col gap-4 mb-2">
                    <span className="text-xs font-extrabold text-neutral-400 uppercase tracking-widest px-0 py-1">
                      {link.name}
                    </span>
                    <div className="flex flex-col gap-5 pl-4 border-l border-gray-150">
                      {serviceRegions.map((region) => {
                        const Icon = region.icon;
                        return (
                          <div key={region.region} className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                              <Icon size={16} className={region.iconClass} strokeWidth={2} {...(region.iconProps || {})} />
                              <span className="text-[13px] font-bold text-gray-800 uppercase tracking-wide">
                                {region.region}
                              </span>
                            </div>
                            <div className="flex flex-col gap-2 pl-6">
                            {region.suburbs.map((subLink) => {
                              const href = subLink.path || `/house-cleaning-${subLink.slug}`;
                              return (
                                <Link
                                  key={href}
                                  href={href}
                                  className="text-[14.5px] font-medium text-gray-600 hover:text-[#FB8C42] transition-colors"
                                  onClick={() => handleNavClick(href)}
                                >
                                  {subLink.name}
                                </Link>
                              );
                            })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              }

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
              <div className="mt-3 flex flex-col gap-3">
                <a
                  href="https://app.crispcleaning.com.au/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center border border-[#FB8C42] text-[#FB8C42] px-6 py-3 rounded-full font-bold text-sm transition-all hover:bg-[#FB8C42] hover:text-white"
                >
                  Login
                </a>
                <Link href={bookingLink} onClick={() => setIsMobileMenuOpen(false)}>
                  <button className="w-full bg-[#FB8C42] hover:bg-[#ea6309] text-white px-6 py-3 rounded-full font-bold text-sm shadow-md transition-all">
                    Get an Instant Quote
                  </button>
                </Link>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
