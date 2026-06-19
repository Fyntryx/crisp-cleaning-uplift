import React from "react";
import { sanityFetch } from "@/sanity/lib/live";

export default async function SchemaMarkup() {
  const { data: siteSettings } = await sanityFetch({
    query: `*[_type == "siteSettings"][0]{ googleReviewCount, googleRatingValue }`
  });

  const googleReviewCount = siteSettings?.googleReviewCount || 14;
  const googleRatingValue = siteSettings?.googleRatingValue || 4.9;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "LocalBusiness"],
        "@id": "https://crispcleaning.com.au/#organization",
        "name": "Crisp Cleaning",
        "telephone": "0451433786",
        "email": "hello@crispcleaning.com.au",
        "url": "https://www.crispcleaning.com.au",
        "logo": "https://crispcleaning.com.au/crisp-cleaning-logo.webp",
        "image": "https://crispcleaning.com.au/crisp-cleaning-logo.webp",
        "address": { 
          "@type": "PostalAddress", 
          "addressLocality": "Melbourne", 
          "addressRegion": "VIC", 
          "addressCountry": "AU" 
        },
        "areaServed": {
          "@type": "GeoCircle",
          "geoMidpoint": {
            "@type": "GeoCoordinates",
            "latitude": -37.8136,
            "longitude": 144.9631
          },
          "geoRadius": "50000"
        },
        "openingHours": ["Mo-Fr 07:00-18:00", "Sa 08:00-16:00"],
        "priceRange": "$$",
        "aggregateRating": { 
          "@type": "AggregateRating", 
          "ratingValue": googleRatingValue.toString(), 
          "reviewCount": googleReviewCount.toString() 
        }
      },
      {
        "@type": "WebPage",
        "@id": "https://crispcleaning.com.au/#webpage",
        "url": "https://www.crispcleaning.com.au/",
        "name": "Crisp Cleaning | Professional Cleaners in Melbourne",
        "isPartOf": {
          "@id": "https://crispcleaning.com.au/#organization"
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
