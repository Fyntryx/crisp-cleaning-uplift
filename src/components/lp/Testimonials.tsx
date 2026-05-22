import React from "react";
import { Star, Clock, ArrowRightLeft, ArrowRight, ExternalLink } from "lucide-react";

// Placeholder BeforeAfterSlider
const BeforeAfterSlider = () => (
  <div className="w-full h-full aspect-[4/5] bg-muted rounded-3xl overflow-hidden relative shadow-sm group">
    <div className="absolute inset-0 flex">
      <div className="w-1/2 relative bg-gray-200">
        <img src="https://via.placeholder.com/400x500/e5e7eb/e5e7eb?text=Before" alt="Before clean" className="w-full h-full object-cover" />
      </div>
      <div className="w-1/2 relative bg-white">
        <img src="https://via.placeholder.com/400x500/ffffff/ffffff?text=After" alt="After clean" className="w-full h-full object-cover" />
      </div>
    </div>
    
    {/* Badges */}
    <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full z-10">Before</div>
    <div className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full z-10">After</div>

    {/* Slider Handle */}
    <div className="absolute inset-y-0 left-1/2 w-0.5 bg-white transform -translate-x-1/2 cursor-ew-resize flex items-center justify-center">
      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg border border-gray-100 group-hover:scale-110 transition-transform">
        <ArrowRightLeft className="w-4 h-4 text-gray-500" />
      </div>
    </div>
  </div>
);

const ComingSoonCard = ({ title }: { title: string }) => (
  <div className="w-full h-full aspect-[4/5] rounded-3xl border border-dashed border-gray-200 flex flex-col items-center justify-center p-8 text-center bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#f9fafb_10px,#f9fafb_20px)]">
    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-orange-100 text-primary text-[10px] font-bold tracking-wider uppercase mb-4 bg-white">
      <Clock className="w-3 h-3" /> Coming soon
    </div>
    <h3 className="text-xl font-bold text-foreground mb-2">{title} • Coming soon</h3>
    <p className="text-sm text-muted-foreground max-w-[200px]">We're photographing real Melbourne jobs. Drop in soon.</p>
  </div>
);

const defaultReviews = [
  { text: "Honestly felt like a brand new home.", author: "VERIFIED GOOGLE REVIEW" },
  { text: "I must say this was the most streamlined service I have experienced — from the quoting, to the scheduling, and not to mention the service quality. 5 stars.", author: "VERIFIED GOOGLE REVIEW" },
  { text: "Really impressed with the detail, even the little things like skirting boards were spotless. It's clear the team takes pride in their work.", author: "VERIFIED GOOGLE REVIEW" },
  { text: "One of the best decisions we've made. Coming home to a clean house every week has made life much easier.", author: "VERIFIED GOOGLE REVIEW" },
  { text: "Honestly the best cleaning service we've used. The house looked and smelled amazing when we got home.", author: "VERIFIED GOOGLE REVIEW" },
  { text: "Super impressed. Our place looked like a display home afterwards.", author: "VERIFIED GOOGLE REVIEW" }
];

interface TestimonialsProps {
  title?: React.ReactNode;
  subtitle?: string;
  topTitle?: string | null;
  hideBeforeAfter?: boolean;
  hideReviews?: boolean;
  layout?: "center" | "left";
  reviews?: { text: string; author: string }[];
}

export default function Testimonials({ title, subtitle, topTitle, hideBeforeAfter, hideReviews, layout = "center", reviews = defaultReviews }: TestimonialsProps) {
  return (
    <section className="py-24 bg-[#FAF9F6]">
      <div className={`container mx-auto px-4 ${layout === "left" ? "max-w-[1216px]" : "max-w-6xl"}`}>
        <div className={`mb-12 ${layout === "left" ? "max-w-[896px]" : ""}`}>
          {topTitle !== null && (
            layout === "left" ? (
              <div className="mb-3">
                <span className="text-[#FB8C42] font-semibold text-[12px] uppercase tracking-[0.22em] leading-[16px]">
                  {topTitle || "Testimonials"}
                </span>
              </div>
            ) : (
              <h4 className="text-primary font-bold tracking-widest text-xs uppercase mb-3 bg-primary/10 inline-block px-2 py-1 rounded">{topTitle || "Testimonials"}</h4>
            )
          )}
          <h2 
            style={layout === "left" ? { letterSpacing: "-1.2px", lineHeight: "48px" } : undefined}
            className={`mb-4 ${layout === "left" ? "text-[48px] font-semibold text-gray-900 mt-3" : "text-4xl md:text-5xl font-bold text-foreground tracking-tight"}`}
          >
            {title || "Stop settling for average."}
          </h2>
          <p className={`${layout === "left" ? "text-[18px] text-gray-500 font-normal leading-[28px] max-w-[600px]" : "text-lg text-muted-foreground"}`}>{subtitle || "Here's what happened when they switched to Crisp."}</p>
        </div>

        {/* Top Grid: Before/After */}
        {!hideBeforeAfter && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="col-span-1">
              <BeforeAfterSlider />
            </div>
            <div className="col-span-1">
              <ComingSoonCard title="Kitchen" />
            </div>
            <div className="col-span-1">
              <ComingSoonCard title="Living room" />
            </div>
          </div>
        )}

        {/* Bottom Grid: Reviews */}
        {!hideReviews && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-orange-50 flex flex-col hover:shadow-md transition-shadow h-full">
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-foreground font-medium text-sm leading-relaxed mb-6">"{review.text}"</p>
              <p className="font-bold text-muted-foreground text-[10px] tracking-wider uppercase mt-auto pt-2">{review.author}</p>
            </div>
          ))}
        </div>
        )}

        {!hideReviews && (
          <div className="mt-12 flex flex-col md:flex-row justify-center items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} className="w-5 h-5 fill-[#FB8C42] text-[#FB8C42]" />
                ))}
              </div>
              <span className="font-bold text-sm text-gray-900">Rated 4.9 on Google · 14 verified reviews</span>
            </div>
            
            <a 
              href="https://www.google.com/maps/place/Crisp+Cleaning/@-37.9725665,145.0531353,9z/data=!4m8!3m7!1s0x6e098402deb63a2b:0x31de0e2a713fa297!8m2!3d-37.9725665!4d145.0531353!9m1!1b1!16s%2Fg%2F11nb2s2grt" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-200 text-[#FB8C42] text-[12px] font-bold hover:bg-orange-50 transition-colors"
            >
              <span className="font-extrabold text-[13px]">G</span>
              <span>View on Google</span>
              <ExternalLink size={14} />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
