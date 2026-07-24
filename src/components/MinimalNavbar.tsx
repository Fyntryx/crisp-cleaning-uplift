"use client";

import Link from "next/link";


export default function MinimalNavbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-100 py-[calc(0.875*var(--scale-unit))] flex items-center transition-all duration-300">
      <div className="w-full px-[calc(1.875*var(--scale-unit))] flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center outline-none border-none ring-0 focus:outline-none focus:ring-0 shrink-0"
        >
          <img
            src="/crisp-cleaning-logo.webp?v=3"
            alt="Crisp Cleaning"
            className="h-[calc(2.875*var(--scale-unit))] md:h-[calc(3.3125*var(--scale-unit))] w-auto object-contain"
          />
        </Link>

        <div className="flex items-center gap-4 ml-auto">
          <Link
            href="/#faq"
            className="text-[calc(0.875*var(--scale-unit))] md:text-[calc(0.9375*var(--scale-unit))] font-medium text-gray-500 hover:text-[#FB8C42] transition-colors duration-300 hidden md:block"
          >
            Questions?
          </Link>
          <a
            href="tel:0451433786"
            className="text-[calc(0.9375*var(--scale-unit))] font-bold text-gray-900 hover:text-[#FB8C42] transition-colors duration-300"
          >
            0451 433 786
          </a>
        </div>
      </div>
    </header>
  );
}
