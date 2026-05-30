"use client";

import React, { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Star, Clock, ArrowRightLeft, ArrowRight, ExternalLink } from "lucide-react";

// Placeholder BeforeAfterSlider
const BeforeAfterSlider = ({ beforeImage, afterImage, title }: { beforeImage: string, afterImage: string, title?: string }) => {
  const [sliderPosition, setSliderPosition] = React.useState(50);
  const [isDragging, setIsDragging] = React.useState(false);

  return (
    <div 
      className="w-full h-full aspect-[4/5] bg-muted rounded-3xl overflow-hidden relative shadow-sm group select-none cursor-ew-resize"
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onTouchStart={() => setIsDragging(true)}
      onTouchEnd={() => setIsDragging(false)}
      onMouseMove={(e) => {
        if (!isDragging) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        setSliderPosition(Math.max(0, Math.min(100, (x / rect.width) * 100)));
      }}
      onTouchMove={(e) => {
        if (!isDragging) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.touches[0].clientX - rect.left;
        setSliderPosition(Math.max(0, Math.min(100, (x / rect.width) * 100)));
      }}
    >
      <div className="absolute inset-0 z-10">
        <img src={afterImage} alt="After clean" className="w-full h-full object-cover pointer-events-none" />
        <div className="absolute top-4 right-4 bg-[#FB8C42] text-white text-[12px] font-bold px-3 py-1.5 rounded-full pointer-events-none">After</div>
      </div>
      <div 
        className="absolute inset-0 z-20 pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img src={beforeImage} alt="Before clean" className="w-full h-full object-cover" />
        <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm text-white text-[12px] font-bold px-3 py-1.5 rounded-full pointer-events-none">Before</div>
      </div>
      <div className="absolute inset-y-0 w-0.5 bg-white cursor-ew-resize pointer-events-none z-30" style={{ left: `${sliderPosition}%` }}>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg border border-gray-100 group-hover:scale-110 transition-transform">
          <ArrowRightLeft className="w-4 h-4 text-gray-500" />
        </div>
      </div>
      {title && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm text-gray-900 text-sm font-bold px-4 py-2 rounded-full z-30 shadow-sm pointer-events-none">
          {title}
        </div>
      )}
    </div>
  );
};

const defaultReviews = [
  { text: "Honestly felt like a brand new home.", author: "Andre B" },
  { text: "Team took great care, really appreciated the communication - the small details dont go unnoticed! keep it up crisp", author: "Natch L" },
  { text: "Really impressed with the detail, even the little things like skirting boards were spotless. It's clear the team takes pride in their work.", author: "Kaan S" },
  { text: "One of the best decisions we've made. Coming home to a clean house every week has made life much easier.", author: "Aiden A" },
  { text: "Honestly the best cleaning service we've used. The house looked and smelled amazing when we got home.", author: "Ardi T" },
  { text: "Super impressed. Our place looked like a display home afterwards.", author: "Ben A" }
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
  const [beforeAfterRef, beforeAfterApi] = useEmblaCarousel({ loop: true, align: 'center', watchDrag: false, breakpoints: { '(min-width: 768px)': { active: false } } });
  const [reviewsRef] = useEmblaCarousel({ loop: false, align: 'start', breakpoints: { '(min-width: 768px)': { active: false } } });
  const [isInteracting, setIsInteracting] = React.useState(false);

  useEffect(() => {
    if (!beforeAfterApi || isInteracting) return;
    const interval = setInterval(() => {
      // Only scroll automatically if viewport is mobile (embla is active)
      if (window.innerWidth < 768) {
        beforeAfterApi.scrollNext();
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [beforeAfterApi, isInteracting]);

  return (
    <section id="testimonials" className="py-12 md:py-24 bg-[#FAF9F6]">
      <div className={`container mx-auto px-6 md:px-8 ${layout === "left" ? "max-w-[1216px]" : "max-w-6xl"}`}>
        <div className={`mb-6 md:mb-12 ${layout === "left" ? "max-w-[896px]" : ""}`}>
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
          <div 
            className="-mx-6 px-6 md:mx-0 md:px-0 overflow-hidden mb-8 md:mb-12" 
            ref={beforeAfterRef}
            onMouseEnter={() => setIsInteracting(true)}
            onMouseLeave={() => setIsInteracting(false)}
            onTouchStart={() => setIsInteracting(true)}
            onTouchEnd={() => setIsInteracting(false)}
          >
            <div className="flex md:grid md:grid-cols-3 gap-4 md:gap-6 touch-pan-y">
              <div className="flex-[0_0_85%] md:flex-none min-w-0">
                <BeforeAfterSlider beforeImage="/images/KitchenSinkBefore.png" afterImage="/images/KitchenSinkAfter.jpg" title="Kitchen Sink" />
              </div>
              <div className="flex-[0_0_85%] md:flex-none min-w-0">
                <BeforeAfterSlider beforeImage="/images/BathtubeBefore.jpg" afterImage="/images/BathTubeAfter.jpg" title="Bathtub" />
              </div>
              <div className="flex-[0_0_85%] md:flex-none min-w-0 pr-6 md:pr-0">
                <BeforeAfterSlider beforeImage="/images/StoveTopBefore.jpg" afterImage="/images/StoveTopAfter.jpg" title="Stovetop" />
              </div>
            </div>
          </div>
        )}

        {/* Bottom Grid: Reviews */}
        {!hideReviews && (
          <div className="-mx-6 px-6 md:mx-0 md:px-0 overflow-hidden" ref={reviewsRef}>
            <div className="flex md:block md:columns-2 lg:columns-3 gap-4 md:gap-6 touch-pan-y">
              {reviews.map((review, i) => (
                <div key={i} className="flex-[0_0_85%] md:flex-none min-w-0 md:mb-6 bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-orange-50 flex flex-col md:h-fit hover:shadow-md transition-shadow break-inside-avoid">
                  <div className="flex gap-1 mb-3 md:mb-4">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} className="w-3.5 h-3.5 md:w-4 md:h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-foreground font-medium text-[13px] md:text-sm leading-relaxed mb-4 md:mb-5">"{review.text}"</p>
                  <p className="font-bold text-muted-foreground text-[9px] md:text-[10px] tracking-wider uppercase mt-auto pt-1 md:pt-2">{review.author}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {!hideReviews && (
          <div className="mt-8 md:mt-12 flex flex-col md:flex-row justify-center items-center gap-4">
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
              <img src="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png" alt="Google" className="w-3.5 h-3.5" />
              <span>View on Google</span>
              <ExternalLink size={14} />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
