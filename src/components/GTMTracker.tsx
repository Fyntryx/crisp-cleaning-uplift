"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function GTMTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track page views on route change
  useEffect(() => {
    if (typeof window !== "undefined" && pathname) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");
      
      // Delay slightly to ensure page has settled
      setTimeout(() => {
        (window as any).dataLayer = (window as any).dataLayer || [];
        (window as any).dataLayer.push({
          event: "page_view",
          page_path: url,
          page_title: document.title
        });
      }, 100);
    }
  }, [pathname, searchParams]);

  // Track tel: link clicks sitewide
  useEffect(() => {
    const handlePhoneClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");
      
      if (link && link.href && link.href.startsWith("tel:")) {
        (window as any).dataLayer = (window as any).dataLayer || [];
        (window as any).dataLayer.push({
          event: "phone_call_lead",
          link_url: link.href,
        });
      }
    };

    document.addEventListener("click", handlePhoneClick);
    return () => document.removeEventListener("click", handlePhoneClick);
  }, []);

  return null;
}
