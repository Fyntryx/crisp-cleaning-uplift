import { Metadata } from "next";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteRequestPanel from "@/components/QuoteRequestPanel";
import Checklist from "@/components/lp/Checklist";
import Process from "@/components/lp/Process";
import Guarantee from "@/components/lp/Guarantee";
import FAQ from "@/components/lp/FAQ";
import FinalCTA from "@/components/lp/FinalCTA";
import Testimonials from "@/components/lp/Testimonials";
import { Shield, Star, CheckCircle2 } from "lucide-react";
import { sanityFetch } from "@/sanity/lib/live";
import Breadcrumbs from "@/components/Breadcrumbs";
import ServiceAreas from "@/components/lp/ServiceAreas";

export const metadata: Metadata = {
  title: "Apartment Cleaning Melbourne | Vetted Local Cleaners",
  description: "Specialised apartment cleaning across Melbourne. Flexible scheduling, transparent flat-rate pricing, and a 100% satisfaction guarantee. Get a quote today.",
  alternates: {
    canonical: '/apartment-cleaning-melbourne',
  },
};

// --- DATA OBJECT ---
const apartmentCleaningData = {
  hero: {
    headline: "Professional Apartment Cleaning in Melbourne",
    subheadline: "Reliable cleaners. Instant online quote. Book in 60 seconds.",
  },
  faqs: [
    {
      question: "What is included in an apartment cleaning?",
      answer: "Our apartment cleaning includes a comprehensive room-by-room clean: dusting surfaces, sanitising kitchens and bathrooms, vacuuming carpets, mopping hard floors, and keeping high-touch zones spotless. It is completely tailored for compact spaces, including balconies."
    },
    {
      question: "Do I need to be home for the cleaning?",
      answer: "No, you do not. Many of our apartment clients provide key box codes, leave keys with building concierge/reception, or let our cleaners in before heading out."
    },
    {
      question: "Are your cleaners background-checked and insured?",
      answer: "Yes, 100%. Every professional cleaner undergoes strict police checks and carries full liability insurance for your absolute peace of mind."
    },
    {
      question: "What kind of cleaning products do you use?",
      answer: "We use high-quality, eco-friendly, non-toxic cleaning products that are extremely tough on dirt but completely safe for your pets and children."
    }
  ],
};

export default async function ApartmentCleaningPage() {
  const { data: siteSettings } = await sanityFetch({
    query: `*[_type == "siteSettings"][0]{ googleReviewCount, googleRatingValue }`
  });
  
  const googleReviewCount = siteSettings?.googleReviewCount || 14;
  const googleRatingValue = siteSettings?.googleRatingValue || 5.0;

  const { hero, faqs } = apartmentCleaningData;

  const trustBar = [
    { text: `${googleRatingValue} Google Rating`, icon: Star },
    { text: "Fully Insured Cleaners", icon: Shield },
    { text: "100% Satisfaction Guarantee", icon: CheckCircle2 },
  ];

  return (
    <main className="min-h-screen bg-background selection:bg-primary/20 selection:text-primary overflow-x-hidden font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Service",
                "serviceType": "Apartment Cleaning",
                "provider": {
                  "@id": "https://crispcleaning.com.au/#localbusiness"
                }
              },
              {
                "@type": "FAQPage",
                "mainEntity": faqs.map(faq => ({
                  "@type": "Question",
                  "name": faq.question,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.answer
                  }
                }))
              },
              {
                "@type": "HowTo",
                "name": "How to Book an Apartment Clean",
                "step": [
                  {
                    "@type": "HowToStep",
                    "name": "Get a Quote",
                    "text": "Fill out our online form to get an instant quote."
                  },
                  {
                    "@type": "HowToStep",
                    "name": "Schedule Your Clean",
                    "text": "Choose a date and time that works for you."
                  },
                  {
                    "@type": "HowToStep",
                    "name": "Relax and Enjoy",
                    "text": "Our professionals will clean your home to perfection."
                  }
                ]
              }
            ]
          })
        }}
      />
      <Navbar />

      {/* 1. Hero / Quote Request Section */}
      <div className="pt-24 lg:pt-32">
        <div className="container mx-auto px-6 mb-4 max-w-7xl">
          <Breadcrumbs items={[
            { label: "Home", href: "/" },
            { label: "Apartment Cleaning", href: "/apartment-cleaning-melbourne" }
          ]} />
        </div>
        <QuoteRequestPanel
          headline={
            <>
              {hero.headline.split("Melbourne")[0]}
              <span className="text-primary">Melbourne</span>
              {hero.headline.split("Melbourne")[1]}
            </>
          }
          subheadline={hero.subheadline}
          seoKeyword="apartment cleaning"
          contextPoints={[
            "Top-rated apartment cleaning professionals in Melbourne.",
            "Tailored solutions for high-rises and smaller units.",
            "100% Satisfaction Guarantee.",
          ]}
        />
      </div>

      {/* 2. Trust Indicators Bar */}
      <section className="bg-primary/5 border-y border-primary/10 py-6">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center lg:justify-between items-center gap-6 lg:gap-12">
            {trustBar.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0 text-primary">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-semibold text-foreground text-sm md:text-base">
                    {item.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Testimonials (Google reviews & Before/After slider) */}
      <Testimonials googleRatingValue={googleRatingValue} googleReviewCount={googleReviewCount} />

      {/* 4. Process Section (How It Works) */}
      <Process />

      {/* 5. Inclusions Checklist Tabbed Section */}
      <Checklist defaultTab="Standard" />

      {/* 5.5. Cross-Sell */}
      <section className="bg-[#FAF9F6] py-12 border-y border-gray-100">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <p className="text-lg text-gray-700 font-medium">
            Need a deeper reset for your apartment? <br className="hidden md:block" />
            Check out our <a href="/deep-cleaning-melbourne" className="text-primary hover:underline font-bold">Deep Cleaning service</a> for an intensive top-to-bottom clean.
          </p>
        </div>
      </section>

      {/* 6. Our Promise / Satisfaction Guarantee */}
      <Guarantee />

      {/* 7. Service Areas Card Section */}
      <ServiceAreas />

      {/* 8. FAQs Accordion */}
      <FAQ data={faqs} />

      {/* 9. Final CTA Section */}
      <FinalCTA />

      <Footer />
    </main>
  );
}
