"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Phone,
  Home,
  Sparkles,
  Key,
  Building2,
  Briefcase
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const services = [
  { name: "House Cleaning", href: "/house-cleaning", icon: Home, desc: "Standard & recurring residential cleans" },
  { name: "Deep Cleaning", href: "/deep-cleaning", icon: Sparkles, desc: "Intensive top-to-bottom detailing" },
  { name: "Vacate Cleaning", href: "/vacate-cleaning", icon: Key, desc: "100% Bond Back end of lease cleaning" },
  { name: "Apartment Cleaning", href: "/apartment-cleaning", icon: Building2, desc: "Tailored for units & smaller spaces" },
  { name: "Commercial Cleaning", href: "/commercial-cleaning", icon: Briefcase, desc: "Office & professional workspace maintenance" },
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

  // Dynamic colors based on scroll state
  const textColorClass = showScrolledStyle ? "text-foreground/70" : "text-white/90";
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

  // Helper to check active state
  const isLinkActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Helper for applying Shadcn classes WITH your dynamic scroll colors
  const navItemClass = (href: string) => cn(
    navigationMenuTriggerStyle(),
    "bg-transparent hover:bg-transparent focus:bg-transparent text-sm transition-colors duration-300",
    hoverColorClass,
    isLinkActive(href) ? "text-primary font-bold" : textColorClass
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ease-linear ${showScrolledStyle
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
          className="flex items-center gap-2 outline-none border-none ring-0 focus:outline-none focus:ring-0 shrink-0">
          <img
            src="/logo.png"
            alt="Crisp Logo"
            className="h-14 w-auto object-contain outline-none border-none"
          />
        </Link>

        {/* --- DESKTOP NAVIGATION (SHADCN MEGA MENU) --- */}
        <div className="hidden md:flex flex-1 justify-center">
          <NavigationMenu>
            <NavigationMenuList className="gap-2">

              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink onClick={() => handleNavClick("/")} className={navItemClass("/")}>
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/about" legacyBehavior passHref>
                  <NavigationMenuLink onClick={() => handleNavClick("/about")} className={navItemClass("/about")}>
                    About
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              {/* SERVICES DROPDOWN */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className={cn(
                  "bg-transparent hover:bg-transparent focus:bg-transparent text-sm transition-colors duration-300 data-[state=open]:bg-transparent",
                  hoverColorClass,
                  pathname.includes("cleaning") ? "text-primary font-bold" : textColorClass
                )}>
                  Services
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-2 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-white rounded-xl shadow-xl border border-gray-100">
                    {services.map((service) => (
                      <ListItem
                        key={service.name}
                        title={service.name}
                        href={service.href}
                        icon={service.icon}
                        onClick={() => handleNavClick(service.href)}
                      >
                        {service.desc}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/review" legacyBehavior passHref>
                  <NavigationMenuLink onClick={() => handleNavClick("/review")} className={navItemClass("/review")}>
                    Reviews
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/faq" legacyBehavior passHref>
                  <NavigationMenuLink onClick={() => handleNavClick("/faq")} className={navItemClass("/faq")}>
                    FAQs
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/contact" legacyBehavior passHref>
                  <NavigationMenuLink onClick={() => handleNavClick("/contact")} className={navItemClass("/contact")}>
                    Contact
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* --- DESKTOP CTA --- */}
        <div className="hidden md:flex items-center gap-4 shrink-0">
          <a
            href="tel:0451433786"
            className={`flex items-center gap-2 font-medium transition-colors hover:text-primary ${showScrolledStyle ? "text-foreground" : "text-white"
              }`}>
            <Phone size={18} />
            <span>0451 433 786</span>
          </a>
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
          <Button variant="hero" size="default" className="mr-10" asChild>
            <Link href="/#booking">Free Quote</Link>
          </Button>
        </div>

        {/* --- MOBILE MENU TOGGLE --- */}
        <button
          className={`md:hidden p-2 transition-colors ${showScrolledStyle ? "text-foreground" : "text-white"
            }`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* --- MOBILE MENU CONTENT --- */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border animate-fade-in max-h-[85vh] overflow-y-auto">
          <nav className="container mx-auto px-6 py-6 flex flex-col gap-4">
            <Link href="/" className="text-base font-medium text-foreground/70 hover:text-primary transition-colors" onClick={() => handleNavClick("/")}>Home</Link>
            <Link href="/about" className="text-base font-medium text-foreground/70 hover:text-primary transition-colors" onClick={() => handleNavClick("/about")}>About</Link>

            {/* Mobile Services List */}
            <div className="py-2 border-y border-border/50 my-1">
              <span className="text-sm font-semibold text-foreground/40 uppercase tracking-wider mb-3 block">Services</span>
              <div className="flex flex-col gap-3 pl-2">
                {services.map(s => (
                  <Link
                    key={s.name}
                    href={s.href}
                    className="text-base font-medium text-foreground/80 hover:text-primary transition-colors flex items-center gap-3"
                    onClick={() => handleNavClick(s.href)}
                  >
                    <s.icon className="w-4 h-4 text-primary" />
                    {s.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/review" className="text-base font-medium text-foreground/70 hover:text-primary transition-colors" onClick={() => handleNavClick("/review")}>Reviews</Link>
            <Link href="/faq" className="text-base font-medium text-foreground/70 hover:text-primary transition-colors" onClick={() => handleNavClick("/faq")}>FAQs</Link>
            <Link href="/contact" className="text-base font-medium text-foreground/70 hover:text-primary transition-colors" onClick={() => handleNavClick("/contact")}>Contact</Link>

            <div className="flex flex-col gap-3 pt-4 border-t border-border">
              <a href="tel:0451433786" className="flex items-center justify-center gap-2 font-bold py-2 text-foreground">
                <Phone size={18} className="text-primary" /> 0451 433 786
              </a>
              <Button variant="ghost" asChild>
                <Link
                  href={
                    process.env.NEXT_PUBLIC_API_BASE_URL ||
                    "https://crisp-cleaning-app-seven.vercel.app/"
                  }>
                  Login
                </Link>
              </Button>
              <Button variant="hero" asChild>
                <Link href="/#booking" onClick={() => setIsMobileMenuOpen(false)}>Get Started Now</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

// --- CUSTOM SHADCN DROPDOWN ITEM ---
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { title: string; icon: React.ElementType }
>(({ className, title, children, icon: Icon, href, onClick, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href as string}
          ref={ref}
          onClick={onClick}
          className={cn(
            "group block select-none space-y-1 rounded-xl p-3 leading-none no-underline outline-none transition-colors hover:bg-primary/5 focus:bg-primary/5",
            className
          )}
          {...props}
        >
          <div className="flex items-start gap-3 text-left">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold leading-none mb-1 text-foreground">{title}</div>
              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground font-normal">
                {children}
              </p>
            </div>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default Navbar;