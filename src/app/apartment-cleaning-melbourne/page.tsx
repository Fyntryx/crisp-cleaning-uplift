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

export const metadata: Metadata = {
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
  const googleRatingValue = siteSettings?.googleRatingValue || 4.9;

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
                "@type": "BreadcrumbList",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://www.crispcleaning.com.au"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Apartment Cleaning",
                    "item": "https://www.crispcleaning.com.au/apartment-cleaning-melbourne"
                  }
                ]
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

      {/* 6. Our Promise / Satisfaction Guarantee */}
      <Guarantee />

      {/* 7. Service Areas Card Section */}
      <section className="py-24 bg-white relative z-10 overflow-hidden">
        <div className="container mx-auto px-6 md:px-8 max-w-5xl">
          <div className="text-center mb-12">
            <span className="text-primary font-bold tracking-widest text-sm uppercase mb-4 block">Service Areas</span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-6">
              Where we clean in Melbourne
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We provide premium apartment and unit cleaning across Melbourne and surrounding suburbs within a 50km radius.
            </p>
          </div>

          <div className="bg-[#FAF9F6] rounded-[2rem] border border-orange-100/70 p-8 md:p-12 shadow-sm relative overflow-hidden grid md:grid-cols-12 gap-8 items-center">
            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

            <div className="md:col-span-6 relative z-10 flex flex-col gap-6">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-foreground">Melbourne Metropolitan Coverage</h3>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                Crisp Cleaning covers all suburbs in metropolitan Melbourne. Our professional teams service areas from Melbourne CBD, South Yarra, Richmond, Fitzroy, and St Kilda to outer growth zones like Box Hill, Doncaster, Glen Waverley, Frankston, and Craigieburn.
              </p>
              <div>
                <a
                  href="https://maps.app.goo.gl/Uz5ANCsisxJQEnc6A"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full px-8 py-3.5 text-sm font-semibold bg-primary text-white hover:bg-primary/95 transition-all shadow-md shadow-primary/10 hover:shadow-lg"
                >
                  View Service Area Map
                </a>
              </div>
            </div>

            <div className="md:col-span-6 w-full h-[350px] relative rounded-2xl overflow-hidden border border-orange-100/50 shadow-sm bg-white">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.95373531531688!3d-37.81627977975171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf0456760532d400!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1625584852925!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQs Accordion */}
      <FAQ data={faqs} />

      {/* 9. Final CTA Section */}
      <FinalCTA />

      <Footer googleRatingValue={googleRatingValue} />
    </main>
  );
}
