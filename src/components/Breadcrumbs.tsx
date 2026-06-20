import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (!items || items.length === 0) return null;

  // Generate BreadcrumbList JSON-LD Schema
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": `https://crispcleaning.com.au${item.href === "/" ? "" : item.href}`
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-[13px] md:text-[14px] font-medium text-gray-500">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <div key={item.href} className="flex items-center gap-2">
              {isLast ? (
                <span className="text-gray-900" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <>
                  <Link href={item.href} className="hover:text-primary transition-colors">
                    {item.label}
                  </Link>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" strokeWidth={3} />
                </>
              )}
            </div>
          );
        })}
      </nav>
    </>
  );
}
