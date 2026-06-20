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
  // Generate BreadcrumbList JSON-LD Schema
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": `https://www.crispcleaning.com.au${item.href === "/" ? "" : item.href}`
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav aria-label="Breadcrumb" className="mb-4 flex items-center text-[13px] font-medium text-gray-500">
        <ol className="flex items-center gap-1.5">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={item.href} className="flex items-center">
                <Link 
                  href={item.href}
                  className={`hover:text-[#FB8C42] transition-colors ${isLast ? 'text-gray-900 pointer-events-none' : ''}`}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </Link>
                {!isLast && (
                  <ChevronRight className="w-3.5 h-3.5 mx-1 opacity-50" />
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
