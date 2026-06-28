import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MelbourneCBDClient from '@/components/lp/MelbourneCBDClient';

export const metadata: Metadata = {
  title: 'Apartment Cleaning Melbourne CBD | Same Cleaner Every Visit | Crisp Cleaning',
  description: 'Apartment cleaning across Melbourne CBD, Southbank and Docklands. Building access coordinated, same cleaner every visit, fixed pricing. Instant quote.',
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://crispcleaning.com.au/apartment-cleaning-melbourne-cbd'
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "serviceType": "Apartment Cleaning",
      "provider": {
        "@id": "https://crispcleaning.com.au/#localbusiness"
      },
      "areaServed": {
        "@type": "City",
        "name": "Melbourne CBD"
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Do you service apartments in Southbank and Docklands?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes - we service apartments across Melbourne CBD, Southbank and Docklands. Building access requirements vary by precinct and individual building; we coordinate these at the initial booking for every property."
          }
        },
        {
          "@type": "Question",
          "name": "How do you handle concierge access and visitor registration?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Building access requirements - concierge protocols, fob codes, lift booking windows, visitor parking - are collected at your first booking, stored against your property, and used by your cleaner on every subsequent visit without you resending them."
          }
        },
        {
          "@type": "Question",
          "name": "How much does apartment cleaning cost in the CBD?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Pricing is based on your apartment's room count and the service type you select. Get an exact fixed quote online in under a minute - no call-backs, no walkthroughs, no hourly-rate uncertainty."
          }
        },
        {
          "@type": "Question",
          "name": "Can I get the same cleaner for my apartment every fortnight?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Your cleaner is assigned to your apartment at the first booking and returns on your chosen schedule. 97% of recurring Crisp clients receive the same cleaner at every visit."
          }
        },
        {
          "@type": "Question",
          "name": "Are cleaning products included for CBD apartment cleans?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes - eco-friendly cleaning products are included in every clean. If your building or strata specifies product restrictions, advise us at booking and we'll accommodate them."
          }
        },
        {
          "@type": "Question",
          "name": "Do you offer end-of-lease cleaning for CBD apartments?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes - end-of-lease cleaning is available for CBD apartments, including building-access coordination. Get a separate vacate clean quote online; bond-back confidence included as standard."
          }
        }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://crispcleaning.com.au/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Apartment Cleaning Melbourne CBD",
          "item": "https://crispcleaning.com.au/apartment-cleaning-melbourne-cbd/"
        }
      ]
    }
  ]
};

export default function ApartmentCleaningMelbourneCBDPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <MelbourneCBDClient />
      <Footer />
    </>
  );
}
