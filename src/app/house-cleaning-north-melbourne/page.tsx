import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NorthMelbourneClient from '@/components/lp/NorthMelbourneClient';

export const metadata: Metadata = {
  title: 'House Cleaning North Melbourne | Same Cleaner Every Visit | Crisp Cleaning',
  description: 'House cleaning in North Melbourne. Terraces, share houses and Arden-fringe apartments near Errol Street. Same cleaner every visit, fixed pricing. Instant quote.',
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://crispcleaning.com.au/house-cleaning-north-melbourne'
  }
};

const faqData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Do you clean share houses and rental properties in North Melbourne?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes - share houses and rentals are central to North Melbourne's housing mix. Fixed pricing per property, same cleaner every visit, and property manager or landlord bookings are all welcome."
      }
    },
    {
      "@type": "Question",
      "name": "How much does house cleaning cost in North Melbourne?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pricing depends on property type and room count. A two-bedroom apartment and a four-bedroom share house are priced differently. Get an exact online quote based on your specific layout."
      }
    },
    {
      "@type": "Question",
      "name": "Can multiple tenants arrange a shared cleaning booking?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes - one booking covers the whole property. Any occupant can manage the account on behalf of the household; access arrangements are confirmed per property, not per tenant."
      }
    },
    {
      "@type": "Question",
      "name": "Do you service the Arden precinct and new apartment developments?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes - including buildings near the Arden Metro Tunnel precinct and along Flemington Road. Provide building access requirements when you book and we coordinate everything ahead of the first clean."
      }
    },
    {
      "@type": "Question",
      "name": "Are cleaning products included for all property types?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes - eco-friendly products are included in every clean. No additional charge for share houses or properties that require higher product volume."
      }
    },
    {
      "@type": "Question",
      "name": "What's the difference between a standard clean and a deep clean?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A standard clean covers maintenance - surfaces, floors, bathrooms, kitchen, bedrooms. A deep clean adds oven interior, inside cabinets, grout scrubbing, and harder-to-reach areas. Both at a fixed, pre-confirmed price."
      }
    }
  ]
};

export default async function NorthMelbournePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />
      <Navbar />
      <NorthMelbourneClient googleRatingValue={googleRatingValue} googleReviewCount={googleReviewCount} />
      <Footer />
    </>
  );
}
