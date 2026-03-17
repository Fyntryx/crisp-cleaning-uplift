import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQs from "@/components/FAQs"; // Make sure this path matches where your FAQs component is!
import {
  ArrowRight,
  CheckCircle2,
  Shield,
  CalendarClock,
  Star,
  DollarSign,
  Phone,
} from "lucide-react";
import QuoteRequestPanel from "@/components/QuoteRequestPanel";
import ParallaxBubbles from "@/components/ParallaxBubbles";
import { CTASection } from "@/components/CTASection";

// --- DATA OBJECT ---
const deepCleaningData = {
  hero: {
    headline: "Professional Deep Cleaning in Melbourne",
    subheadline: "Reliable cleaners. Instant online quote. Book in 60 seconds.",
    primaryCta: "Get Instant Quote",
    secondaryCta: "Call Now",
    secondaryCtaLink: "tel:+61000000000",
  },
  trustBar: [
    { text: "4.9 Google Rating", icon: Star },
    { text: "Fully Insured Cleaners", icon: Shield },
    { text: "100% Satisfaction Guarantee", icon: CheckCircle2 },
  ],
  whatsIncluded: {
    targetKeyword: "deep cleaning melbourne",
    headline: <>What's Included in Our <span className="text-primary">Deep Cleaning</span>?</>,
    seoParagraph: (
      <>
        Our deep cleaning service provides a more thorough and intensive clean than a standard house cleaning. This service is ideal for homes that require extra attention, including properties that have not been professionally cleaned recently or areas where dirt, dust, and grime have built up over time. Our experienced cleaners carefully clean high-touch surfaces, hidden areas, and detailed spaces throughout your home to restore a higher level of cleanliness. A deep house cleaning typically includes detailed kitchen and bathroom sanitisation, dust removal from hard-to-reach areas, and comprehensive floor cleaning. The checklist below outlines the key tasks included in our professional deep cleaning service.
      </>
    ),
    items: [
      "Detailed kitchen degreasing",
      "Bathroom grout and tile scrubbing",
      "Interior cabinet and drawer cleaning",
      "Skirting boards and wall spot cleaning",
      "Deep carpet vacuuming",
      "Appliance exterior cleaning"
    ],
    cta: "Get Instant Price",
  },
  features: {
    headline: <>Why Choose <span className="text-primary">Crisp Cleaning</span></>,
    items: [
      { title: "Transparent pricing", icon: DollarSign },
      { title: "Instant online booking", icon: CalendarClock },
      { title: "Professional vetted cleaners", icon: Shield },
      { title: "Satisfaction guarantee", icon: Star },
    ],
  },
  pricingExplanation: {
    headline: "Flat-Rate Pricing. No Surprises.",
    description:
      "Our pricing is incredibly simple. We charge a flat rate based on the number of bedrooms and bathrooms in your home. No hidden fees, no hourly milkers—just a perfectly clean home.",
    cta: "Get Instant Quote",
  },
  finalCta: {
    headline: "Ready for a spotless home?",
    buttonText: "Book Your Cleaning Today",
  },
  faqs: [
    {
      _id: "faq-1",
      question: "What is exactly included in a standard house cleaning?",
      answer: "Our standard house cleaning includes dusting all surfaces, vacuuming carpets, mopping hard floors, and fully sanitizing your kitchen and bathrooms.",
      category: "booking",
    },
    {
      _id: "faq-2",
      question: "Do I need to be home while the cleaners are there?",
      answer: "Not at all! You can simply provide entry instructions (like a hidden key or lockbox code) when you book online.",
      category: "booking",
    },
    {
      _id: "faq-3",
      question: "Are your cleaners background-checked and insured?",
      answer: "Yes, 100%. Every single Crisp Cleaning professional undergoes a strict police background check and is fully insured for your peace of mind.",
      category: "safety",
    },
    {
      _id: "faq-4",
      question: "What kind of cleaning products do you use?",
      answer: "We use high-quality, eco-friendly cleaning solutions that are tough on dirt but completely safe for your pets and children.",
      category: "safety",
    },
  ],
};

// --- PLACEHOLDER COMPONENTS ---
const BeforeAfterSlider = () => (
  <div className="w-full aspect-video bg-gray-100 rounded-2xl border border-gray-200 flex items-center justify-center overflow-hidden relative">
    <div className="absolute inset-0 flex">
      <div className="w-1/2 relative bg-gray-200">
        <img src="https://via.placeholder.com/800x600/e5e7eb/e5e7eb" alt="Professional kitchen cleaning by Crisp Cleaning Melbourne - Before" className="w-full h-full object-cover" />
      </div>
      <div className="w-1/2 relative bg-white">
        <img src="https://via.placeholder.com/800x600/ffffff/ffffff" alt="Professional kitchen cleaning by Crisp Cleaning Melbourne - After" className="w-full h-full object-cover" />
      </div>
    </div>
    <div className="z-10 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-sm font-medium text-gray-600">
      [ Before &amp; After Slider Placeholder ]
    </div>
    <div className="absolute inset-y-0 left-1/2 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.3)] transform -translate-x-1/2 cursor-ew-resize">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md border border-gray-100">
        <div className="w-4 h-1 flex justify-between">
          <div className="w-1 h-full bg-gray-300 rounded-full"></div>
          <div className="w-1 h-full bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  </div>
);

const GoogleReviewsCarousel = () => (
  <div className="w-full py-16 bg-gray-50 rounded-3xl flex flex-col items-center justify-center border border-gray-100 overflow-hidden relative">
    <div className="text-gray-400 font-medium mb-8 z-10 bg-white px-4 py-1 rounded-full text-sm">
      [ Google Reviews Carousel Placeholder ]
    </div>
    <div className="flex gap-4 opacity-50 absolute inset-0 items-center justify-center">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="w-64 h-32 bg-white rounded-xl shadow-sm border border-gray-100 p-4 shrink-0"
        >
          <div className="flex gap-1 mb-3">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                className="w-4 h-4 fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full mb-2"></div>
          <div className="w-3/4 h-2 bg-gray-100 rounded-full"></div>
        </div>
      ))}
    </div>
  </div>
);

export default function DeepCleaningPage() {
  const {
    hero,
    trustBar,
    whatsIncluded,
    features,
    pricingExplanation,
    finalCta,
    faqs,
  } = deepCleaningData;

  return (
    <main className="min-h-screen bg-background selection:bg-primary/20 selection:text-primary overflow-x-hidden font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "LocalBusiness",
                "@id": "https://crisp-cleaning-app-seven.vercel.app/#localbusiness",
                "name": "Crisp Cleaning",
                "image": "https://crisp-cleaning-app-seven.vercel.app/logo.png",
                "description": "Professional deep cleaning service in Melbourne.",
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
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "4.9",
                  "bestRating": "5",
                  "reviewCount": "250"
                }
              },
              {
                "@type": "Service",
                "serviceType": "Deep Cleaning",
                "provider": {
                  "@id": "https://crisp-cleaning-app-seven.vercel.app/#localbusiness"
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
          seoKeyword="deep cleaning"
          contextPoints={[
            "Top-rated deep cleaning professionals in Melbourne.",
            "Flexible scheduling to fit your needs.",
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

      {/* 2.5 Testimonials */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground tracking-tight">
              Loved by <span className="text-primary">Melbourne</span>
            </h2>
          </div>
          <GoogleReviewsCarousel />
        </div>
      </section>

      {/* 3. What's Included */}
      <section className="py-24 bg-background relative overflow-hidden">
        <ParallaxBubbles className="absolute inset-0 z-[-1]" />
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-foreground tracking-tight">
              {whatsIncluded.headline}
            </h2>
            <div className="text-lg text-muted-foreground leading-relaxed text-left md:text-center p-6 bg-muted/20 rounded-2xl border border-border/50">
              {whatsIncluded.seoParagraph}
            </div>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-12">
            {whatsIncluded.items.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-5 rounded-2xl bg-muted/30 border border-border hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                </div>
                <span className="text-lg font-medium text-foreground">
                  {item}
                </span>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/booking">
              <Button
                size="lg"
                className="rounded-full px-10 h-14 text-lg font-semibold shadow-lg shadow-primary/20"
              >
                {whatsIncluded.cta}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Why Choose Crisp Cleaning (Features Grid) */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground tracking-tight">
              {features.headline}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.items.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-background p-8 rounded-3xl shadow-sm border border-border flex flex-col items-center text-center hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary shrink-0">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">
                    {feature.title}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Pricing Explanation Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto bg-primary text-primary-foreground rounded-[2rem] p-10 md:p-16 relative overflow-hidden shadow-2xl">
            {/* Decorative background shapes */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>

            <div className="relative z-10 text-center">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 tracking-tight">
                {pricingExplanation.headline}
              </h2>
              <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
                {pricingExplanation.description}
              </p>
              <Link href="/booking">
                <Button
                  size="xl"
                  variant="secondary"
                  className="rounded-full text-lg px-10 h-14 text-primary font-bold shadow-xl hover:shadow-2xl transition-all"
                >
                  {pricingExplanation.cta}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Visual Proof Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-foreground tracking-tight">
              See The Difference
            </h2>
            <p className="text-lg text-muted-foreground">
              Swipe to see our signature clean.
            </p>
          </div>
          <div className="max-w-5xl mx-auto">
            <BeforeAfterSlider />
          </div>
        </div>
      </section>

      {/* 7. Service Areas & FAQs */}
      <section className="py-24 bg-background relative z-10 overflow-hidden">
        <ParallaxBubbles className="absolute inset-0 z-[-1]" />
        <div className="container mx-auto px-6 space-y-24">
          {/* --- UPDATED SERVICE AREAS DESIGN --- */}
          <div>
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground tracking-tight">
                Service <span className="text-primary">Areas</span>
              </h2>
            </div>

            <div className="max-w-5xl mx-auto bg-muted/20 border border-border/50 rounded-3xl p-8 md:p-12 shadow-sm relative overflow-hidden">
              {/* Subtle background glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

              <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                {/* Location Map Pin Icon */}
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                  <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>

                <p className="text-lg text-muted-foreground leading-relaxed md:text-left text-center">
                  <span className="font-semibold text-foreground">Crisp Cleaning</span> provides professional cleaning services across Melbourne and surrounding suburbs within a 50km radius of the CBD. Our experienced cleaners regularly service homes and businesses throughout Melbourne CBD, Southbank, Docklands, South Yarra, Richmond, Carlton, Fitzroy, St Kilda, Brunswick, Footscray, Essendon, Preston, Coburg, Box Hill, Doncaster, Glen Waverley, Clayton, Dandenong, Frankston, Craigieburn and surrounding areas. Whether you need house cleaning, deep cleaning, end of lease cleaning, apartment cleaning, or commercial cleaning, our team delivers reliable, high-quality cleaning services across metropolitan Melbourne with easy online booking and transparent pricing.
                </p>
              </div>
            </div>
          </div>
          {/* -------------------------------------- */}

          {/* Integrated Interactive FAQ Component */}
          <div className="w-full -mx-6 lg:mx-0">
            <FAQs data={faqs} />
          </div>
        </div>
      </section>

      {/* 8. Final CTA Section */}
      <CTASection
        heading="Experience the Difference"
        description="Ready for a deeper clean? Book our meticulous deep cleaning service today and transform your living space."
        primaryAction={{
          text: "Book Now",
          href: "/booking",
        }}
        secondaryAction={{
          text: "Contact Us",
          href: "/contact",
        }}
      />

      <Footer />
    </main>
  );
}
