import { Metadata } from "next";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { sanityFetch } from "@/sanity/lib/live";
import FinalCTA from "@/components/lp/FinalCTA";
import Services from "@/components/Services";
import Testimonials from "@/components/lp/Testimonials";
import FAQ from "@/components/lp/FAQ";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "House Cleaning Brighton | Same Cleaner Every Visit | Crisp Cleaning",
  description: "House cleaning in Brighton. Victorian and Edwardian homes near Dendy Street Beach and Church Street, same cleaner every visit, fixed pricing. Instant quote.",
  alternates: {
    canonical: '/house-cleaning-brighton/',
  },
};

const faqs = [
  {
    question: "Do you service homes near Dendy Street Beach and Church Street?",
    answer: "Yes — we cover all of Brighton including the Esplanade, Dendy Street, and the pockets around Church Street and Bay Street."
  },
  {
    question: "Are your products safe for original timber floors and period finishes?",
    answer: "Yes. Our product selection is specifically chosen for heritage surfaces including original hardwood floors, polished finishes, and period-era fittings. We don't use steam or high-moisture methods on original floorboards."
  },
  {
    question: "How much does house cleaning cost in Brighton?",
    answer: "Pricing is set by your home's room count and service type. Brighton's larger period homes are quoted accurately for their actual scope, not at a generic rate applied across the suburb. Get an exact price online in under a minute."
  },
  {
    question: "Can I book the same cleaner for a fortnightly clean?",
    answer: "Yes. Your cleaner is assigned from your first booking and returns on your chosen schedule — weekly, fortnightly, or monthly. 97% of recurring clients receive the same cleaner every visit."
  },
  {
    question: "Do I need to be home when the cleaner arrives?",
    answer: "No. Most Brighton clients arrange key safe access or leave a key and aren't home during the clean. Access arrangements are confirmed at booking and stored for every subsequent visit without you resending instructions."
  },
  {
    question: "What if I'm not satisfied with the clean?",
    answer: "Contact us within 72 hours and we'll return to address anything that fell short — at no charge. The re-clean guarantee applies from your very first booking."
  }
];

export default async function HouseCleaningBrightonPage() {
  const { data: siteSettings } = await sanityFetch({
    query: `*[_type == "siteSettings"][0]{ googleReviewCount, googleRatingValue }`
  });
  
  const googleRatingValue = siteSettings?.googleRatingValue || 5.0;

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
                "serviceType": "House Cleaning Brighton",
                "provider": {
                  "@id": "https://crispcleaning.com.au/#localbusiness"
                },
                "areaServed": {
                  "@type": "City",
                  "name": "Brighton",
                  "sameAs": "https://en.wikipedia.org/wiki/Brighton,_Victoria"
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
      <Navbar bookingLink="#booking?service=Standard" />

      {/* Hero Section */}
      <section className="relative bg-[#FDF8F4] overflow-hidden">
        <div className="container mx-auto px-6 md:px-8 max-w-[1000px] pt-32 md:pt-40 pb-16 text-center">
          <Breadcrumbs items={[
            { label: "Home", href: "/" },
            { label: "House Cleaning Brighton", href: "/house-cleaning-brighton" }
          ]} />
          
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 mt-6 tracking-tight">
            House Cleaning Brighton Melbourne
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
            Brighton homes are among Melbourne's most demanding to clean consistently — large Victorian and Edwardian houses on generous blocks, original timber floors, leadlight windows, and the kind of surface detail that reveals the quality of a cleaner quickly. The streets between Church Street and Dendy Street Beach are lined with properties that reward a consistent, familiar cleaner and suffer noticeably when that consistency isn't there. Crisp services Brighton homes with a fixed, scope-defined checklist applied the same way on every visit, by the same cleaner, at transparent pricing set by your home's actual room count rather than a generic hourly estimate.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 md:px-8 py-16 md:py-24 max-w-4xl prose prose-lg prose-headings:text-gray-900 prose-p:text-gray-600 prose-headings:font-bold">
        {/* Cleaning Brighton's Heritage Homes the Right Way */}
        <h2 className="text-3xl mt-12 mb-6">Cleaning Brighton's Heritage Homes the Right Way</h2>
        <p>
          Brighton's housing stock is predominantly period — Victorian mansions, Edwardian family homes, and Californian bungalows on the streets between the bay and the Nepean Highway define the suburb's residential character. Getting a consistently high standard across these properties requires a cleaner who knows your home, not a different person starting from scratch every fortnight.
        </p>
        
        <h3 className="text-2xl mt-8 mb-4">Victorian and Edwardian Properties Near the Golden Mile</h3>
        <p>
          The streets closest to the bay between Brighton Beach and Middle Brighton station are among Melbourne's most tightly held — heritage homes with polished timber floors, formal living and dining rooms, and multiple bathrooms across multi-storey layouts. Our fixed pricing accounts for the genuine scope of these larger homes; there's no hourly ambiguity when your property has five rooms and two staircases.
        </p>

        <h3 className="text-2xl mt-8 mb-4">Californian Bungalows and Period Homes on Tree-Lined Streets</h3>
        <p>
          The brick Californian bungalows and 1920s–30s properties on Brighton's quieter residential streets have a different cleaning profile to the bayside mansions — fewer formal rooms, but the same heritage surfaces and original finishes that benefit from consistent, surface-appropriate care. Our eco-friendly product selection accounts for original timber, heritage tiles, and period-era fixings throughout.
        </p>

        <h3 className="text-2xl mt-8 mb-4">Renovated and Contemporary Homes Near Church Street and Bay Street</h3>
        <p>
          Brighton's main commercial strips anchor a ring of renovated and newly built properties sitting alongside the suburb's heritage stock. Stone benchtops, engineered timber floors, and larger contemporary bathrooms have a different scope to a period home, and our pricing reflects your property's actual requirement — not a uniform Brighton rate applied regardless of home type.
        </p>

        {/* What Every Brighton Clean Covers */}
        <h2 className="text-3xl mt-16 mb-6">What Every Brighton Clean Covers</h2>
        <p>
          Every Brighton clean follows a documented checklist covering all main rooms and surfaces within your booking scope. The scope is confirmed before the cleaner arrives — which is what makes a fixed price possible and what prevents the ambiguity about what was actually cleaned that hourly services routinely produce.
        </p>

        <h3 className="text-2xl mt-8 mb-4">Kitchen Surfaces and Bathroom Detailing</h3>
        <p>
          Kitchen benchtops, stovetop, rangehood, splashback, sink, and accessible appliance exteriors are cleaned and wiped on every visit. Bathrooms — shower screens, tub or shower recess, basin, toilet including base, mirror, taps, and tiled floor — are sanitised and polished throughout. Brighton's larger homes with two or three bathrooms have all covered within the standard scope.
        </p>

        <h3 className="text-2xl mt-8 mb-4">Timber Floors, Polished Surfaces and Formal Living Areas</h3>
        <p>
          Hardwood timber floors are swept and mopped with appropriate, low-moisture products — not steam or excess water on original floorboards. Polished and formal surfaces are dusted, mirrors and glass wiped, skirting boards and cornices attended to. Formal living and dining rooms receive the same level of attention as everyday living spaces, which matters significantly in Brighton's larger heritage homes.
        </p>

        <h3 className="text-2xl mt-8 mb-4">Bedrooms, Additional Rooms and Laundry</h3>
        <p>
          All bedrooms are vacuumed, surfaces dusted, and furniture-accessible areas addressed. A Brighton home with four or five bedrooms isn't treated identically to a two-bedroom apartment — your room count and layout determine the price and the time your cleaner spends. The laundry is included as standard: surfaces wiped, appliance exteriors cleaned, floor swept or mopped.
        </p>

        {/* Why Brighton Homeowners Choose Crisp */}
        <h2 className="text-3xl mt-16 mb-6">Why Brighton Homeowners Choose Crisp</h2>
        <p>
          Brighton's cleaning market offers plenty of options. Crisp's operational advantage is specific: the same cleaner, a fixed and documented checklist, and pricing calibrated to what your home genuinely requires. For a large period property near the beach, these three things matter more than any headline discount.
        </p>

        <h3 className="text-2xl mt-8 mb-4">Same Cleaner Every Visit — Your Home's Details Are Never Reset</h3>
        <p>
          When your cleaner returns, they already know which bathroom needs extra attention around the tile grout, that the kitchen splashback requires more care after cooking-heavy weeks, and that you prefer the upstairs rooms addressed first. That accumulated knowledge doesn't transfer to a rotating cleaner. Our 97% same-cleaner continuity rate makes this consistency structurally reliable, not a matter of luck.
        </p>

        <h3 className="text-2xl mt-8 mb-4">Fixed Pricing That Accounts for Larger Brighton Properties</h3>
        <p>
          A five-bedroom heritage home in Brighton requires meaningfully more time and effort than the average Melbourne house clean. Our pricing — set by your actual room count and scope rather than a suburb-wide hourly rate — means your cost reflects your home specifically, not a one-size figure that undercharges compact properties and underdelivers on larger ones.
        </p>

        <h3 className="text-2xl mt-8 mb-4">Eco-Friendly Products Safe on Heritage Surfaces and Original Finishes</h3>
        <p>
          Brighton's period homes have original timber floors, heritage-era tiles, and leadlight or glass fittings that respond badly to harsh chemical cleaning products over time. Our eco-friendly product selection is chosen for effective cleaning without the surface deterioration that commercial-grade chemicals cause on older materials — important in a suburb where original finishes are a significant part of the property's value.
        </p>

        <h3 className="text-2xl mt-8 mb-4">Satisfaction Guarantee on Every Clean</h3>
        <p>
          If anything doesn't meet your standard after a clean, contact us within 72 hours and we'll return to address it at no charge. This guarantee applies from your very first booking with Crisp and maintains across every subsequent visit — it doesn't diminish after a year of regular service.
        </p>
      </div>

      {/* Pricing Widget */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-6 max-w-4xl text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Brighton House Cleaning Prices</h2>
          <p className="mt-4 text-lg text-gray-600">Get an exact price based on your property size.</p>
        </div>
        <Services hiddenInline />
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-4xl text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">What Brighton Homeowners Say</h2>
        </div>
        <Testimonials googleRatingValue={googleRatingValue} />
      </section>

      {/* FAQs */}
      <FAQ data={faqs.map(f => ({ question: f.question, answer: <p>{f.answer}</p> }))} title="Frequently Asked Questions" />

      {/* Final CTA & Internal Linking */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Book a Cleaner in Brighton</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Get an instant, fixed quote for your Brighton home and book online in under a minute. 15% off your first clean.
          </p>
          <a
            href="/#booking"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-primary rounded-xl hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl"
          >
            Get an Instant Quote
          </a>

          <h2 className="text-2xl font-bold text-gray-900 mt-20 mb-6">Nearby Areas We Also Service</h2>
          <div className="flex flex-wrap justify-center gap-4 text-primary font-medium">
            <Link href="#" className="hover:underline">Hampton</Link>
            <span className="text-gray-300">|</span>
            <Link href="#" className="hover:underline">Cheltenham</Link>
            <span className="text-gray-300">|</span>
            <Link href="#" className="hover:underline">Albert Park</Link>
            <span className="text-gray-300">|</span>
            <Link href="#" className="hover:underline">Sandringham</Link>
            <span className="text-gray-300">|</span>
            <Link href="#" className="hover:underline">Malvern</Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
