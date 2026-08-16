"use client";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { createPortal } from "react-dom";
import { getTrackingPayload } from "@/lib/trackingUtils";
import {
  Home,
  Building2,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Minus,
  Plus,
  CheckCircle2,
  MapPin,
  User,
  Mail,
  Phone,
  CreditCard,
  Loader2,
  Sparkles,
  SprayCan,
  DoorOpen,
  Info,
  X,
  Eye,
  EyeOff,
  Tag,
  Check,
  ArrowRight,
  Sliders,
  Calendar,
  ClipboardList,
  Bath,
  Bed,
  ChefHat,
  Sofa,
  Clock,
  PawPrint,
  Car,
  Key,
  AlertTriangle,
  FileText,
  Lock,
} from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import useScrollScale from "@/hooks/useScrollScale";

import {
  calculatePricing,
  CLEANING_TYPE_PRICES,
  ROOM_PRICES,
  EXTRA_PRICES,
  FREQUENCY_DISCOUNTS,
  type PricingRequest,
  type PricingResponse,
  type CleaningType,
  type Extra,
  type Frequency,
  type PricingConfig,
} from "@/utils/pricing";

import {
  getCurrentAddress,
  searchAddresses,
  searchSuburbs,
  checkAddressServiceability,
  type AddressSuggestion
} from "@/utils/geolocation";
import { ConditionQuiz } from "./ConditionQuiz";

const commBusinessSizes = [
  { label: "Small (Under 2,000 sq ft)", value: "small" },
  { label: "Medium (2,000 - 10,000 sq ft)", value: "medium" },
  { label: "Large (10,000 - 50,000 sq ft)", value: "large" },
  { label: "Enterprise (Over 50,000 sq ft)", value: "enterprise" },
];
const commEnvironments = [
  "Office Building",
  "Retail Store",
  "Restaurant/Food Service",
  "Medical Facility",
  "School/Educational",
  "Gym/Fitness Center",
  "Warehouse/Industrial",
  "Hotel/Hospitality",
  "Other",
];
const commCleanTypes = [
  "Standard Maintenance",
  "Deep Clean",
  "Post-Construction",
  "Move-in/Move-out",
  "Event Cleanup",
  "Other",
];
const commFrequencies = [
  "Daily",
  "Weekly",
  "Bi-weekly",
  "Monthly",
  "One-time",
  "Custom",
];
const commBudgets = [
  "A$500-A$1,000",
  "A$1,000-A$2,500",
  "A$2,500-A$5,000",
  "A$5,000-A$10,000",
  "A$10,000+",
  "Custom Quote",
];

const formatEta = (minutes?: number) => {
  if (!minutes) return null;
  if (minutes < 60) return `${minutes} mins`;
  const hours = Math.floor(minutes / 60);
  const remainingMins = minutes % 60;
  if (remainingMins === 0) return `${hours} hr${hours > 1 ? 's' : ''}`;
  return `${hours} hr${hours > 1 ? 's' : ''} ${remainingMins} mins`;
};

// ─── QUOTE SUMMARY CARD (no prices, no promo, no total) ───────────────────────
const QuoteSummaryCard = ({
  className = "",
  formData,
  pricingConfig,
  pricingResult,
  outOfAreaFee = 0,
  currentStep = 1,
}: {
  className?: string;
  formData: any;
  pricingConfig: PricingConfig | undefined;
  pricingResult: PricingResponse | null;
  outOfAreaFee?: number;
  currentStep?: number;
}) => (
  <div
    className={`bg-cream px-6 py-[calc(1.625*var(--scale-unit))] gap-2.5 text-[calc(0.78125*var(--scale-unit))] relative overflow-visible border-l border-[#f2eadf] ${className}`}
  >
    <div className="mb-6 relative z-10 flex flex-col items-start gap-2">
      <div className="w-full mb-3">
        <h2 className="text-[11px] font-[700] text-[#8d8378] tracking-[0.1em] uppercase">
          QUOTE SUMMARY
        </h2>
      </div>
      {formData.contact?.firstName && (
        <h3 className="text-[14px] font-[600] text-[#2b2523]">
          Hi {formData.contact.firstName}
        </h3>
      )}
      <div className="flex flex-wrap gap-2">
        {(() => {
          const badges: any[] = [];
          if (formData.cleaningType === "Vacate") badges.push("BOND BACK GUARANTEE");
          return badges.map((badge, i) => (
            <div key={i} className="inline-flex items-center justify-center px-2.5 py-1 rounded-full bg-[#fff4ea] text-[#e0731f] text-[10px] font-bold tracking-wider uppercase border border-[#f6d3b3]/50">
              {badge}
            </div>
          ));
        })()}
      </div>
    </div>

    <div className="w-full h-px bg-[#f2eadf] my-5" />

    <div className="relative z-10 text-[calc(0.90625*var(--scale-unit))]">
      <>
        <div className="flex justify-between items-center py-3.5">
          <span className="text-[12.5px] font-medium text-[#8d8378]">Service Type</span>
          <span className="text-[12.5px] font-normal text-[#2b2523]">{formData.cleaningType || "—"} Clean</span>
        </div>

        {formData.contact?.suburb && (
          <div className="flex justify-between items-center py-2">
            <span className="text-[12.5px] font-medium text-[#8d8378]">Suburb</span>
            <span className="text-[12.5px] font-normal text-[#2b2523]">{formData.contact.suburb}</span>
          </div>
        )}

        {formData.selectedDate && formData.selectedTime && (
          <>
            <div className="flex justify-between items-center py-2 gap-4">
              <span className="text-[12.5px] font-medium text-[#8d8378] whitespace-nowrap">Date &amp; Time</span>
              <span className="text-[12.5px] font-normal text-[#2b2523] text-right">
                {formData.selectedDate.toLocaleDateString("en-AU", { weekday: 'long', day: 'numeric', month: 'long' })} at {formData.selectedTime}
              </span>
            </div>
          </>
        )}

        <div className="flex justify-between items-center py-2 mb-2">
          <span className="text-[12.5px] font-medium text-[#8d8378]">Frequency</span>
          <span className="text-[12.5px] font-normal text-[#2b2523]">{formData.frequency || "One time"}</span>
        </div>

        {/* Breakdown — labels only, no prices */}
        <div className="pt-1">
          <span className="block mb-4 text-[calc(0.6875*var(--scale-unit))] font-semibold uppercase tracking-widest text-gray-400">
            BREAKDOWN
          </span>

          <div className="space-y-3">
            {(formData.homeDetails.bedrooms || 0) > 0 && (
              <div className="flex justify-between">
                <span className="text-[12.5px] font-medium text-[#8d8378]">{formData.homeDetails.bedrooms}x Bedroom</span>
              </div>
            )}
            {(formData.homeDetails.bathrooms || 0) > 0 && (
              <div className="flex justify-between">
                <span className="text-[12.5px] font-medium text-[#8d8378]">{formData.homeDetails.bathrooms}x Bathroom</span>
              </div>
            )}
            {(formData.homeDetails.kitchens || 0) > 0 && (
              <div className="flex justify-between">
                <span className="text-[12.5px] font-medium text-[#8d8378]">{formData.homeDetails.kitchens}x Kitchen</span>
              </div>
            )}
            {(formData.homeDetails.livingRooms || 0) > 0 && (
              <div className="flex justify-between">
                <span className="text-[12.5px] font-medium text-[#8d8378]">{formData.homeDetails.livingRooms}x Living &amp; Dining</span>
              </div>
            )}
            {(formData.homeDetails.other || 0) > 0 && (
              <div className="flex justify-between">
                <span className="text-[12.5px] font-medium text-[#8d8378]">{formData.homeDetails.other}x Other Area</span>
              </div>
            )}
            {pricingResult?.breakdown.extras.items.map((e: any) => (
              <div key={e.name} className="flex justify-between">
                <span className="text-[12.5px] font-medium text-[#8d8378]">+ {e.count > 1 ? `${e.count}x ` : ''}{e.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3 text-[15px] font-[400] text-[#8d8378] leading-[1.55]">
          {currentStep === 1 ? (
            <p>Your quote builds as you go.</p>
          ) : (
            (pricingResult?.estimatedMinutes ?? 0) > 0 && (
              <div className="flex justify-between w-full pt-1">
                <span className="text-[13px] font-medium text-[#8d8378]">Estimated Time</span>
                <span className="text-[13px] font-medium text-[#2b2523]">{formatEta(pricingResult!.estimatedMinutes)}</span>
              </div>
            )
          )}
        </div>
      </>

      <div className="w-full h-px bg-[#f2eadf] mt-5 mb-4" />

      <div className="relative group cursor-help w-full">
        {/* Tooltip */}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 w-[260px] bg-[#2b2523] text-white text-[12.5px] font-medium text-center px-4 py-3 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 shadow-xl leading-snug">
          Not Happy? Receive a 100% refund if your concerns are not addressed!
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-solid border-t-[#2b2523] border-t-8 border-x-transparent border-x-8 border-b-0 w-0 h-0" />
        </div>

        {/* Pill */}
        <div className="flex items-center justify-center gap-2 bg-[#fff4ea] border border-[#f6d3b3]/50 py-2.5 px-4 rounded-xl w-full transition-colors group-hover:bg-[#ffe9d6]">
          <CheckCircle2 className="w-4 h-4 text-[#e0731f]" strokeWidth={2.5} />
          <span className="text-[13.5px] font-bold text-[#e0731f]">Satisfaction Guaranteed</span>
        </div>
      </div>
    </div>
  </div>
);

const CountdownTimer = ({ onTimeout }: { onTimeout?: () => void }) => {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const isInitiallyExpired = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem("crisp_discount_endtime");
      if (saved) {
        const remaining = Math.floor((parseInt(saved) - Date.now()) / 1000);
        setTimeLeft(Math.max(0, remaining));
      } else {
        const newEndTime = Date.now() + 600 * 1000;
        sessionStorage.setItem("crisp_discount_endtime", newEndTime.toString());
        setTimeLeft(600);
      }
    }
  }, []);

  useEffect(() => {
    if (timeLeft === null) return;

    if (timeLeft <= 0) {
      if (!isInitiallyExpired.current && onTimeout) {
        onTimeout();
        isInitiallyExpired.current = true;
      }
      return;
    }
    const intervalId = setInterval(() => {
      setTimeLeft(t => {
        if (t === null || t <= 1) {
          clearInterval(intervalId);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft, onTimeout]);

  if (timeLeft === null) return null;

  const mins = Math.floor(timeLeft / 60);
  const secs = Math.floor(timeLeft % 60);

  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-600 rounded-full text-xs font-bold tracking-widest mt-2 border border-red-100 shadow-sm uppercase">
      <Clock className="w-3.5 h-3.5" />
      Expires in {mins.toString().padStart(2, '0')}:{secs.toString().padStart(2, '0')}
    </div>
  );
};

const ReservationTimer = () => {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem("crisp_reservation_endtime");
    let remaining = 0;

    if (saved) {
      remaining = Math.floor((parseInt(saved) - Date.now()) / 1000);
    }

    if (!saved || remaining <= 0) {
      const newEndTime = Date.now() + 600 * 1000;
      sessionStorage.setItem("crisp_reservation_endtime", newEndTime.toString());
      setTimeLeft(600);
    } else {
      setTimeLeft(remaining);
    }
  }, []);

  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0) return;
    const intervalId = setInterval(() => {
      setTimeLeft(t => {
        if (t === null || t <= 1) {
          clearInterval(intervalId);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  if (timeLeft === null) return null;

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;

  return (
    <span className="inline-flex items-center gap-1.5 text-red-500 text-[calc(0.6875*var(--scale-unit))] font-bold tracking-wider uppercase">
      Quote reserved for {mins.toString().padStart(2, '0')}:{secs.toString().padStart(2, '0')}
    </span>
  );
};

const QuoteRequestFlow = ({ hiddenInline = false }: { hiddenInline?: boolean }) => {
  const [isFormVisible, setIsFormVisible] = useState(true);
  const formObserverRef = useRef<HTMLDivElement>(null);
  const formContentRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    serviceCategory: "residential",
    cleaningType: "" as any as CleaningType,
    homeDetails: { bedrooms: 0, bathrooms: 0, kitchens: 0, livingRooms: 0, other: 0 },
    hourlyDetails: { hours: 0, cleaners: 1 },
    extras: {} as Record<string, number>,
    condition: "" as any as "Lived In" | "Overdue" | "Heavy Build Up",
    frequency: "" as any as Frequency,
    selectedDays: [] as string[],
    selectedDate: undefined as Date | undefined,
    selectedTime: "",
    instructions: { entry: "", parking: "", pets: "", chemicals: "", notes: "" },

    commercial: {
      businessName: "",
      businessSize: "",
      environment: "",
      cleanType: "",
      frequency: "",
      days: [] as string[],
      insuranceRequired: false,
      budget: "",
    },

    contact: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      suburb: "",
      password: "",
      terms: false,
    },
  });

  const isCommercial = formData.serviceCategory === "commercial";
  const totalSteps = 6;

  const [currentStep, setCurrentStep] = useState(1);
  const [hasClickedService, setHasClickedService] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; type: 'FIXED_CREDIT' | 'PERCENT_OFF' | 'FREE_CLEAN' | 'REFERRAL'; value: number; isStackable?: boolean; referralType?: 'CLEANER_REFERRAL' | 'CUSTOMER_REFERRAL'; category?: string } | undefined>(undefined);
  const [appliedReferral, setAppliedReferral] = useState<{ code: string; type: 'REFERRAL'; value: number; referralType: 'CLEANER_REFERRAL' | 'CUSTOMER_REFERRAL' } | undefined>(undefined);
  const [isValidatingPromo, setIsValidatingPromo] = useState(false);
  const [isMobileSummaryOpen, setIsMobileSummaryOpen] = useState(false);
  const [discountClaimed, setDiscountClaimed] = useState(false);

  const [discountContent, setDiscountContent] = useState({
    heading: "First time? Claim 5% OFF!",
    subheading: "Takes under a minute. Your full price shows on screen"
  });

  useEffect(() => {
    client.fetch(`*[_type == "discountStepSettings"][0]`).then((data) => {
      if (data) {
        setDiscountContent({
          heading: data.heading || "First time? Claim 5% OFF!",
          subheading: data.subheading || "Takes under a minute. Your full price shows on screen"
        });
      }
    }).catch(console.error);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && (isModalOpen || hiddenInline)) {
      const isLeadCaptured = sessionStorage.getItem("crisp_lead_captured");
      if (isLeadCaptured === "true") {
        setDiscountClaimed(true);

        const fetchPromo = async () => {
          try {
            const res = await fetch(`${API_BASE_URL}/api/public/discount-promo`);
            if (res.ok) {
              const appliedPromoDetails = await res.json();
              setPromoCode(appliedPromoDetails.code);
              setAppliedPromo({
                code: appliedPromoDetails.code,
                type: appliedPromoDetails.type as 'PERCENT_OFF' | 'FIXED_CREDIT' | 'FREE_CLEAN' | 'REFERRAL',
                value: appliedPromoDetails.value,
                isStackable: appliedPromoDetails.isStackable ?? true
              });
            }
          } catch (err) {
            console.error("Failed to auto-apply promo", err);
          }
        };
        fetchPromo();

        setFormData(prev => ({
          ...prev,
          contact: {
            ...prev.contact,
            firstName: sessionStorage.getItem("crisp_lead_first_name") || prev.contact.firstName,
            email: sessionStorage.getItem("crisp_lead_email") || prev.contact.email,
            phone: sessionStorage.getItem("crisp_lead_phone") || prev.contact.phone,
          }
        }));
        setCurrentStep(prev => prev === 1 ? 2 : prev);
      }
    }
  }, [isModalOpen, hiddenInline]);

  const prevStepRef = useRef(1);

  useEffect(() => {
    const handleUrlBooking = () => {
      if (typeof window !== "undefined") {
        const isLeadCaptured = sessionStorage.getItem("crisp_lead_captured") === "true";
        if (isLeadCaptured) {
          setCurrentStep(2);
        }

        const url = new URL(window.location.href);
        const params = url.searchParams;
        let serviceParam = params.get("service");

        if (!serviceParam && url.hash.includes("?service=")) {
          const hashParams = new URLSearchParams(url.hash.split("?")[1]);
          serviceParam = hashParams.get("service");
        }

        if (serviceParam || url.hash.includes("booking")) {
          const lowerService = (serviceParam || "").toLowerCase();
          let matchedType: any = null;
          if (lowerService.includes("deep")) matchedType = "Deep";
          else if (lowerService.includes("vacate")) matchedType = "Vacate";
          else if (lowerService.includes("standard") || lowerService.includes("flat")) matchedType = "Standard";

          if (matchedType) {
            setFormData(prev => ({
              ...prev,
              cleaningType: matchedType,
              serviceCategory: "residential"
            }));
            const isLeadCaptured = sessionStorage.getItem("crisp_lead_captured") === "true";
            setCurrentStep(isLeadCaptured ? 2 : 1);
            setIsModalOpen(true);

            if (url.hash) {
              window.history.replaceState(null, "", window.location.pathname + window.location.search);
            }
          } else if (url.hash.includes("booking") && hiddenInline) {
            setIsModalOpen(true);
            if (url.hash) {
              window.history.replaceState(null, "", window.location.pathname + window.location.search);
            }
          }
        }
      }
    };

    handleUrlBooking();

    window.addEventListener("hashchange", handleUrlBooking);

    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      if (link && link.href && link.href.includes('/request-quote')) {
        try {
          const url = new URL(link.href, window.location.origin);
          if (url.pathname === window.location.pathname || link.getAttribute('href')?.startsWith('#')) {
            e.preventDefault();

            let serviceParam = url.searchParams.get("service");
            if (!serviceParam && url.hash.includes("?service=")) {
              const hashParams = new URLSearchParams(url.hash.split("?")[1]);
              serviceParam = hashParams.get("service");
            }

            if (serviceParam || url.hash.includes("booking")) {
              const lowerService = (serviceParam || "").toLowerCase();
              let matchedType: any = null;
              if (lowerService.includes("deep")) matchedType = "Deep";
              else if (lowerService.includes("vacate")) matchedType = "Vacate";
              else if (lowerService.includes("standard")) matchedType = "Standard";

              if (matchedType) {
                setFormData(prev => ({
                  ...prev,
                  cleaningType: matchedType,
                  serviceCategory: "residential"
                }));
                setCurrentStep(2);
                setIsModalOpen(true);
              } else if (hiddenInline) {
                setIsModalOpen(true);
              } else {
                document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
              }
            }
          }
        } catch (err) {
          // ignore invalid URLs
        }
      }
    };

    document.addEventListener("click", handleGlobalClick, true);

    return () => {
      window.removeEventListener("hashchange", handleUrlBooking);
      document.removeEventListener("click", handleGlobalClick, true);
    };
  }, [hiddenInline]);

  const [isAddressValid, setIsAddressValid] = useState(true);
  const [viewDate, setViewDate] = useState(new Date());
  const [pricingResult, setPricingResult] = useState<PricingResponse | null>(null);
  const [isLoadingLoc, setIsLoadingLoc] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [showConditionQuiz, setShowConditionQuiz] = useState(false);
  const [isSubmittingDiscount, setIsSubmittingDiscount] = useState(false);
  const [discountError, setDiscountError] = useState<string | null>(null);
  const [pricingConfig, setPricingConfig] = useState<PricingConfig | undefined>(undefined);
  const [isLoadingConfig, setIsLoadingConfig] = useState(true);
  const [outOfAreaFee, setOutOfAreaFee] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined" && currentStep > prevStepRef.current) {
      (window as any).dataLayer = (window as any).dataLayer || [];

      const fireEvent = (name: string) => {
        (window as any).dataLayer.push({
          event: name,
          step: prevStepRef.current,
          service_category: formData.serviceCategory,
        });
      };

      if (prevStepRef.current === 1 && currentStep === 2) {
        fireEvent("quote_details_complete");
      } else if (prevStepRef.current === 2 && currentStep === 3) {
        fireEvent("quote_service_selected");
      }
    }
    prevStepRef.current = currentStep;
  }, [currentStep, formData.serviceCategory, formData.cleaningType]);

  const resetForm = () => {
    setFormData({
      serviceCategory: "residential",
      cleaningType: "" as any as CleaningType,
      homeDetails: { bedrooms: 0, bathrooms: 0, kitchens: 0, livingRooms: 0, other: 0 },
      hourlyDetails: { hours: 0, cleaners: 1 },
      extras: {} as Record<string, number>,
      condition: "Lived In" as "Lived In" | "Overdue" | "Heavy Build Up",
      frequency: "" as any as Frequency,
      selectedDays: [] as string[],
      selectedDate: undefined as Date | undefined,
      selectedTime: "",
      instructions: { entry: "", parking: "", pets: "", chemicals: "", notes: "" },

      commercial: {
        businessName: "",
        businessSize: "",
        environment: "",
        cleanType: "",
        frequency: "",
        days: [] as string[],
        insuranceRequired: false,
        budget: "",
      },

      contact: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        suburb: "",
        password: "",
        terms: false,
      },
    });
    setCurrentStep(1);
    setSubmitSuccess(null);
    setSubmitError(null);
    setAppliedPromo(undefined);
    setPromoCode("");
    setOutOfAreaFee(0);
    setIsAddressValid(true);
  };

  const API_BASE_URL = (
    process.env.NEXT_PUBLIC_API_BASE_URL || "https://crisp-cleaning-app-seven.vercel.app"
  ).replace(/\/$/, "");

  useEffect(() => {
    setMounted(true);

    const fetchPricingConfig = async () => {
      try {
        setIsLoadingConfig(true);
        const res = await fetch(`${API_BASE_URL}/api/public/pricing-config`);
        if (res.ok) {
          const data = await res.json();
          if (data) {
            setPricingConfig(data);
          }
        }
      } catch (err) {
        console.error("Failed to fetch pricing config:", err);
      } finally {
        setIsLoadingConfig(false);
      }
    };

    fetchPricingConfig();
  }, [API_BASE_URL]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFormVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (formObserverRef.current) {
      observer.observe(formObserverRef.current);
    }

    return () => {
      if (formObserverRef.current) {
        observer.unobserve(formObserverRef.current);
      }
    };
  }, []);

  const timeSlots = Array.from({ length: 12 }, (_, i) => {
    const startHour = 8 + i;
    const ampm = startHour >= 12 ? "PM" : "AM";
    const hour = startHour > 12 ? startHour - 12 : startHour;
    return `${hour.toString().padStart(2, "0")}:00 ${ampm}`;
  });

  useEffect(() => {
    if (isCommercial) return;
    if (!formData.cleaningType) {
      setPricingResult(null);
      return;
    }

    try {
      const result = calculatePricing({
        cleaningType: formData.cleaningType,
        homeDetails: formData.homeDetails,
        hourlyDetails: formData.hourlyDetails,
        extras: formData.extras,
        frequency: formData.frequency || "One time",
        actionTakerDiscount: false,
        appliedPromo,
        outOfAreaFee,
        condition: formData.condition,
      }, pricingConfig);
      setPricingResult(result);
    } catch (e) {
      console.error("Pricing Error", e);
    }
  }, [
    formData.cleaningType,
    formData.homeDetails,
    formData.hourlyDetails,
    formData.extras,
    formData.frequency,
    formData.condition,
    isCommercial,
    appliedPromo,
    pricingConfig,
    outOfAreaFee,
  ]);

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const isValidPhone = (phone: string) => /^\d{10,15}$/.test(phone.replace(/\D/g, ''));

  const isStepValid = () => {
    if (isCommercial) {
      switch (currentStep) {
        case 1: return formData.commercial?.businessName && formData.commercial?.businessSize && formData.commercial?.environment;
        case 2: return formData.commercial?.cleanType;
        case 3: return formData.commercial?.frequency;
        case 4: return formData.commercial?.days && formData.commercial.days.length > 0;
        case 5: return formData.selectedDate && formData.selectedTime;
        case 6: return true;
        default: return false;
      }
    } else {
      switch (currentStep) {
        case 1:
          return !!(
            formData.contact.firstName &&
            formData.contact.email && isValidEmail(formData.contact.email) &&
            formData.contact.phone && isValidPhone(formData.contact.phone)
          );
        // Step 2: suburb + service type (Standard/Deep/Vacate)
        case 2:
          return !!(
            formData.contact.suburb?.trim() &&
            ['Standard', 'Deep', 'Vacate'].includes(formData.cleaningType)
          );
        case 3:
          return (
            (formData.homeDetails.bedrooms || 0) +
            (formData.homeDetails.bathrooms || 0) +
            (formData.homeDetails.kitchens || 0) +
            (formData.homeDetails.livingRooms || 0) +
            (formData.homeDetails.other || 0) > 0
          );
        case 4: return !!formData.frequency && !!formData.selectedDate && !!formData.selectedTime;
        case 5: return !!formData.instructions.entry && !!formData.instructions.parking && !!formData.instructions.pets && !!formData.instructions.chemicals;
        case 6: return formData.contact.address.trim().length >= 10;
        default: return false;
      }
    }
  };

  const handleDiscountSubmit = async () => {
    setIsSubmittingDiscount(true);
    setDiscountError(null);

    const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    const isValidPhone = (phone: string) => /^\d{10,15}$/.test(phone.replace(/\D/g, ''));

    if (!formData.contact.firstName) {
      setDiscountError("Please enter your first name.");
      setIsSubmittingDiscount(false);
      return;
    }

    if (!isValidEmail(formData.contact.email)) {
      setDiscountError("Please enter a valid email address.");
      setIsSubmittingDiscount(false);
      return;
    }

    if (!isValidPhone(formData.contact.phone)) {
      setDiscountError("Please enter a valid phone number.");
      setIsSubmittingDiscount(false);
      return;
    }

    const API_BASE_URL = (
      process.env.NEXT_PUBLIC_API_BASE_URL || "https://crisp-cleaning-app-seven.vercel.app"
    ).replace(/\/$/, "");

    let appliedPromoDetails: { code: string; type: string; value: number; source: string; isStackable?: boolean } = { code: 'WELCOME5', type: 'PERCENT_OFF', value: 5, source: 'default', isStackable: true };

    try {
      const res = await fetch(`${API_BASE_URL}/api/public/discount-promo`);
      if (!res.ok) throw new Error();
      appliedPromoDetails = await res.json();
    } catch {
      appliedPromoDetails = { code: 'WELCOME5', type: 'PERCENT_OFF', value: 5, source: 'default' };
    }

    const { source, trackingData } = getTrackingPayload("Quote Request Flow Details Step");

    const payload = {
      fullName: `${formData.contact.firstName} ${formData.contact.lastName}`.trim(),
      email: formData.contact.email,
      phone: formData.contact.phone,
      source,
      trackingData,
      offer: appliedPromoDetails.code,
      bedrooms: formData.homeDetails.bedrooms || 0,
      bathrooms: formData.homeDetails.bathrooms || 0,
      kitchen: formData.homeDetails.kitchens || 0,
      other: (formData.homeDetails.other || 0) + (formData.homeDetails.livingRooms || 0),
      serviceType: formData.cleaningType || formData.serviceCategory,
      address: formData.contact.address || "",
      addons: Object.entries(formData.extras)
        .map(([key, value]) => `${value}x ${key}`)
        .join(", ") || "None",
      jobValue: pricingResult?.total || 0,
    };

    try {
      const res = await fetch(`${API_BASE_URL}/api/public/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success && data.lead?.id) {
        if (typeof window !== "undefined") {
          sessionStorage.setItem("crisp_lead_id", data.lead.id);
        }
      }
    } catch (err) {
      console.error("Failed to submit lead (non-blocking)", err);
    }

    try {
      if (typeof window !== "undefined") {
        (window as any).dataLayer = (window as any).dataLayer || [];
        (window as any).dataLayer.push({
          event: "generate_lead",
          lead_source: "Quote Request Flow Details Step",
          offer: appliedPromoDetails.code,
          offer_source: appliedPromoDetails.source
        });
        sessionStorage.setItem("crisp_lead_captured", "true");
      }

      setDiscountClaimed(true);
      setAppliedPromo({
        code: appliedPromoDetails.code,
        type: appliedPromoDetails.type as 'PERCENT_OFF' | 'FIXED_CREDIT' | 'FREE_CLEAN' | 'REFERRAL',
        value: appliedPromoDetails.value,
        isStackable: appliedPromoDetails.isStackable ?? true
      });

      setSubmitError(null);
      setSubmitSuccess(null);
      setCurrentStep(2);
    } catch (err) {
      console.error("Failed to process step", err);
      setDiscountError("Something went wrong. Please try again.");
    } finally {
      setIsSubmittingDiscount(false);
    }
  };

  const syncLeadData = async (step: number) => {
    const leadId = typeof window !== "undefined" ? sessionStorage.getItem("crisp_lead_id") : null;
    if (!leadId) return;

    const API_BASE_URL = (
      process.env.NEXT_PUBLIC_API_BASE_URL || "https://crisp-cleaning-app-seven.vercel.app"
    ).replace(/\/$/, "");

    const { trackingData } = getTrackingPayload("Quote Request Flow");

    const payload = {
      id: leadId,
      fullName: `${formData.contact.firstName} ${formData.contact.lastName}`.trim(),
      email: formData.contact.email,
      phone: formData.contact.phone,
      bedrooms: formData.homeDetails.bedrooms || 0,
      bathrooms: formData.homeDetails.bathrooms || 0,
      kitchen: formData.homeDetails.kitchens || 0,
      other: (formData.homeDetails.other || 0) + (formData.homeDetails.livingRooms || 0),
      serviceType: formData.cleaningType || formData.serviceCategory,
      address: formData.contact.address || formData.contact.suburb || "",
      addons: Object.entries(formData.extras)
        .map(([key, value]) => `${value}x ${key}`)
        .join(", ") || "None",
      jobValue: pricingResult?.total || 0,
      trackingData: {
        ...(trackingData || {}),
        latestStep: step,
        condition: formData.condition,
        frequency: formData.frequency,
        dateTime: formData.selectedDate && formData.selectedTime 
           ? `${formData.selectedDate.toLocaleDateString()} ${formData.selectedTime}` 
           : undefined
      }
    };

    try {
      await fetch(`${API_BASE_URL}/api/public/leads`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error("Failed to sync lead data", err);
    }
  };

  const handleNext = () => {
    if (currentStep === 1 && !isCommercial && !discountClaimed) {
      handleDiscountSubmit();
      return;
    }

    if (isStepValid() && currentStep < totalSteps) {
      setSubmitError(null);
      setSubmitSuccess(null);
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      syncLeadData(nextStep);
    }
  };

  const handlePrevModal = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
      setIsModalOpen(false);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("triggerLeadPopup"));
      }
    } else {
      handlePrev();
    }
  };

  const handlePrev = () => {
    if (currentStep > 2) {
      setSubmitError(null);
      setSubmitSuccess(null);
      setCurrentStep((prev) => prev - 1);
    }
  };

  const updateRooms = (
    key: keyof typeof formData.homeDetails,
    change: number
  ) => {
    setFormData((prev) => ({
      ...prev,
      homeDetails: {
        ...prev.homeDetails,
        [key]: Math.max(0, (prev.homeDetails[key] || 0) + change),
      },
    }));
  };

  const toggleExtra = (extraKey: Extra) => {
    setFormData((prev) => {
      const currentExtras = { ...(prev.extras || {}) };
      if (currentExtras[extraKey]) {
        delete currentExtras[extraKey];
      } else {
        currentExtras[extraKey] = 1;
      }
      return { ...prev, extras: currentExtras };
    });
  };

  const updateExtraCount = (extraKey: Extra, count: number) => {
    if (count < 1) {
      toggleExtra(extraKey);
      return;
    }
    setFormData((prev) => ({
      ...prev,
      extras: { ...(prev.extras || {}), [extraKey]: count },
    }));
  };

  const toggleDay = (day: string) => {
    setFormData((prev) => {
      const isRes = !isCommercial;
      const targetArray = isRes
        ? prev.selectedDays || []
        : prev.commercial.days || [];

      const exists = targetArray.includes(day);
      const newArray = exists
        ? targetArray.filter((d) => d !== day)
        : [...targetArray, day];

      if (isRes) return { ...prev, selectedDays: newArray };
      return { ...prev, commercial: { ...prev.commercial, days: newArray } };
    });
  };

  const handleUseCurrentLocation = async () => {
    setIsLoadingLoc(true);
    try {
      const addressData = await getCurrentAddress();
      setFormData((prev) => ({
        ...prev,
        contact: { ...prev.contact, address: addressData.fullAddress },
      }));

      if (addressData.coordinates) {
        const check = checkAddressServiceability(addressData.coordinates.lat, addressData.coordinates.lon);
        setIsAddressValid(check.serviceable);
        if (!check.serviceable) {
          setSubmitError(check.error || "Location outside service area");
          setOutOfAreaFee(0);
        } else {
          setSubmitError(null);
          setOutOfAreaFee(check.outsideAreaFee || 0);
        }
      }
    } catch (error) {
      alert("Could not fetch location. Please enter manually.");
    } finally {
      setIsLoadingLoc(false);
    }
  };

  const transformResidentialFormDataToAPI = () => {
    if (!formData.selectedDate || !formData.selectedTime) {
      throw new Error("Date and time are required");
    }

    const timeMatch = formData.selectedTime.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (!timeMatch) {
      throw new Error("Invalid time format");
    }

    let hours = parseInt(timeMatch[1], 10);
    const minutes = parseInt(timeMatch[2], 10);
    const ampm = timeMatch[3].toUpperCase();

    if (ampm === "PM" && hours !== 12) hours += 12;
    if (ampm === "AM" && hours === 12) hours = 0;

    const bookingDate = new Date(formData.selectedDate);
    bookingDate.setHours(hours, minutes, 0, 0);

    const frequencyMap: Record<Frequency, "OneTime" | "Weekly" | "Fortnightly" | "Monthly"> = {
      "One time": "OneTime",
      Weekly: "Weekly",
      Fortnightly: "Fortnightly",
      Monthly: "Monthly",
    };

    const apiFrequency = frequencyMap[formData.frequency] || "OneTime";

    const addonsPayload: Record<string, number> = {};

    Object.entries(formData.extras).forEach(([key, count]) => {
      let formattedKey = key;
      if (formattedKey === "Oven/Stovetops") formattedKey = "Oven/Stovetop";
      addonsPayload[formattedKey] = count as number;
    });

    return {
      name: formData.contact.firstName,
      firstName: formData.contact.firstName,
      lastName: formData.contact.lastName,
      email: formData.contact.email,
      password: formData.contact.password || "QuoteRequest2024!",
      phone: formData.contact.phone,
      address: formData.contact.address,
      accountType: "residential" as const,
      bookingDate: bookingDate.toISOString(),
      cleaningType: formData.cleaningType === "Standard" ? "Regular" : formData.cleaningType,
      frequency: apiFrequency,
      actionTakerDiscount: false,
      roomsBedrooms: formData.homeDetails.bedrooms || 0,
      roomsBathrooms: formData.homeDetails.bathrooms || 0,
      roomsKitchens: formData.homeDetails.kitchens || 0,
      roomsOther: (formData.homeDetails.other || 0) + (formData.homeDetails.livingRooms || 0),
      condition: formData.condition === "Overdue" ? "Lived In" : formData.condition,
      addons: addonsPayload,
      entryInstructions: formData.instructions.entry || "",
      parkingInstructions: formData.instructions.parking || "",
      petsInstructions: formData.instructions.pets || "",
      preferredChemicals: formData.instructions.chemicals || "",
      notes: formData.instructions.notes || "",
      promoCode: appliedPromo?.code || promoCode || undefined,
      outOfAreaFee: outOfAreaFee || 0,
      estimatedMinutes: pricingResult?.estimatedMinutes || 0,
    };
  };

  const transformCommercialFormDataToAPI = () => {
    const frequencyMap: Record<string, "OneTime" | "Weekly" | "Fortnightly" | "Monthly"> = {
      Daily: "OneTime",
      Weekly: "Weekly",
      "Bi-weekly": "Fortnightly",
      Monthly: "Monthly",
      "One-time": "OneTime",
      Custom: "OneTime",
    };

    const apiFrequency = frequencyMap[formData.commercial.frequency] || "OneTime";

    const bookingDate = new Date();
    bookingDate.setDate(bookingDate.getDate() + 7);
    bookingDate.setHours(9, 0, 0, 0);

    return {
      firstName: formData.contact.firstName,
      lastName: formData.contact.lastName || "",
      email: formData.contact.email,
      phone: formData.contact.phone,
      address: formData.contact.address,
      bookingDate: bookingDate.toISOString(),
      frequency: apiFrequency,
      businessName: formData.commercial.businessName,
      businessSize: formData.commercial.businessSize,
      environment: formData.commercial.environment,
      cleanType: formData.commercial.cleanType,
      days: formData.commercial.days || [],
      insuranceRequired: formData.commercial.insuranceRequired || false,
      budget: formData.commercial.budget,
    };
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(null);

    try {
      if (!formData.contact.firstName || !formData.contact.email || !formData.contact.phone || !formData.contact.address) {
        setSubmitError("Please fill in all required fields.");
        setIsSubmitting(false);
        return;
      }

      const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
      const isValidPhone = (phone: string) => /^\d{10,15}$/.test(phone.replace(/\D/g, ''));

      if (!isValidEmail(formData.contact.email)) {
        setSubmitError("Please enter a valid email address.");
        setIsSubmitting(false);
        return;
      }

      if (!isValidPhone(formData.contact.phone)) {
        setSubmitError("Please enter a valid phone number.");
        setIsSubmitting(false);
        return;
      }

      if (!formData.contact.terms) {
        setSubmitError("Please accept the terms and conditions.");
        setIsSubmitting(false);
        return;
      }

      if (formData.contact.address.trim().length < 10) {
        setSubmitError("Please enter a valid address (at least 10 characters).");
        setIsSubmitting(false);
        return;
      }

      const payload = isCommercial
        ? transformCommercialFormDataToAPI()
        : transformResidentialFormDataToAPI();

      const endpoint = isCommercial
        ? `${API_BASE_URL}/api/commercial`
        : `${API_BASE_URL}/api/signup`;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        const errorMessage =
          result.error ||
          result.details?.[0]?.message ||
          "Failed to submit quote request. Please try again.";
        setSubmitError(errorMessage);
        setIsSubmitting(false);
        return;
      }

      if (isCommercial) {
        if (typeof window !== "undefined") {
          (window as any).dataLayer = (window as any).dataLayer || [];
          (window as any).dataLayer.push({
            event: "quote_request_submitted",
            service_type: formData.commercial.cleanType
          });
        }
        setSubmitSuccess(
          "Thank you for your quote request! We'll be in touch within 2 business hours with your confirmed price."
        );
        setIsSubmitting(false);
        return;
      }

      // Residential quote submitted
      if (typeof window !== "undefined") {
        (window as any).dataLayer = (window as any).dataLayer || [];
        (window as any).dataLayer.push({
          event: "quote_request_submitted",
          service_type: formData.cleaningType,
        });
      }

      setSubmitSuccess(
        "Quote request submitted! We'll review your details and be in touch within 2 business hours with your confirmed price."
      );
      setIsSubmitting(false);

    } catch (error) {
      console.error("Submission error:", error);
      setSubmitError(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please try again."
      );
      setIsSubmitting(false);
    }
  };

  const updateComm = (key: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      commercial: { ...prev.commercial, [key]: value },
    }));
  };
  const updateContact = (key: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      contact: { ...prev.contact, [key]: value },
    }));
  };

  // ─── STEP 1: Details (same as BookingPageFlow discount step) ─────────────────
  const renderResStepDiscount = () => {
    return (
      <div className="w-full max-w-2xl 2xl:max-w-[560px] 2xl:scale-[1.05] 2xl:origin-top mx-auto animate-in fade-in slide-in-from-right duration-500 flex flex-col items-center">
        <div className="flex flex-col items-center text-center space-y-6 w-full">
          <div className="flex flex-col items-center gap-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#FB8C42] text-white text-[calc(0.625*var(--scale-unit))] font-bold tracking-wider uppercase">
              UNLOCK 5% OFF YOUR FIRST CLEAN
            </span>
            <div>
              <h2 className="text-[calc(1.375*var(--scale-unit))] font-semibold text-gray-900 tracking-tight leading-tight mb-2">
                {discountContent.heading}
              </h2>
              <p className="text-[calc(0.8125*var(--scale-unit))] font-normal text-gray-500">
                {discountContent.subheading}
              </p>
            </div>
          </div>

          <div className="w-full flex flex-col gap-3">
            <div className="flex flex-col gap-[6px] w-full text-left">
              <label className="text-[10px] font-[600] uppercase text-[#a2968a]">First name</label>
              <input
                type="text"
                autoComplete="name"
                placeholder="First name"
                className="w-full px-[14px] py-[11px] bg-white border-[1.5px] border-[#e9ddcf] rounded-xl outline-none focus:ring-2 focus:ring-[#FB8C42]/20 focus:border-[#FB8C42] text-[13px] font-[400] text-gray-900 placeholder:text-[#a89c8f] shadow-sm transition-all"
                value={`${formData.contact.firstName || ""} ${formData.contact.lastName || ""}`.trim()}
                onChange={(e) => {
                  const val = e.target.value;
                  const parts = val.trimStart().split(/\s+/);
                  const first = parts[0] || "";
                  const last = parts.slice(1).join(" ");
                  setFormData((prev) => ({
                    ...prev,
                    contact: { ...prev.contact, firstName: first, lastName: last },
                  }));
                }}
              />
            </div>
            <div className="flex flex-col gap-[6px] w-full text-left">
              <label className="text-[10px] font-[600] uppercase text-[#a2968a]">Mobile</label>
              <input
                type="tel"
                autoComplete="tel"
                placeholder="04XX XXX XXX"
                className="w-full px-[14px] py-[11px] bg-white border-[1.5px] border-[#e9ddcf] rounded-xl outline-none focus:ring-2 focus:ring-[#FB8C42]/20 focus:border-[#FB8C42] text-[13px] font-[400] text-gray-900 placeholder:text-[#a89c8f] shadow-sm transition-all"
                value={formData.contact.phone}
                onChange={(e) => updateContact("phone", e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-[6px] w-full text-left">
              <label className="text-[10px] font-[600] uppercase text-[#a2968a]">Email</label>
              <input
                type="email"
                autoComplete="email"
                placeholder="you@email.com"
                className="w-full px-[14px] py-[11px] bg-white border-[1.5px] border-[#e9ddcf] rounded-xl outline-none focus:ring-2 focus:ring-[#FB8C42]/20 focus:border-[#FB8C42] text-[13px] font-[400] text-gray-900 placeholder:text-[#a89c8f] shadow-sm transition-all"
                value={formData.contact.email}
                onChange={(e) => updateContact("email", e.target.value)}
              />
            </div>

            {discountError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-[11px] font-semibold mt-1">
                {discountError}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // ─── STEP 2: Suburb + Service Type (new for quote flow) ──────────────────────
  const renderQuoteServiceStep = () => {
    const suburbFilled = !!(formData.contact.suburb?.trim());

    return (
      <div className="max-w-4xl mx-auto w-full animate-in fade-in slide-in-from-right duration-500 flex flex-col justify-start py-2">
        <div className="flex flex-col space-y-6">
          {/* Header */}
          <div>
            <h2 className="text-[calc(1.375*var(--scale-unit))] font-semibold text-gray-900 tracking-tight leading-tight">
              Where are you located?
            </h2>
            <p className="text-[calc(0.8125*var(--scale-unit))] font-normal text-gray-500 mt-1">
              Enter your suburb, then choose the type of clean.
            </p>
          </div>

          {/* Suburb input */}
          <div className="flex flex-col gap-2">
            <label className="text-[calc(0.625*var(--scale-unit))] font-semibold uppercase text-ink-soft tracking-[0.09em]">
              SUBURB
            </label>
            <div className="relative flex items-center">
              <AddressAutocomplete
                value={formData.contact.suburb}
                onChange={(value) => updateContact("suburb", value)}
                placeholder="e.g. Richmond, VIC..."
                mode="suburb"
                className="w-full"
                inputClassName="!pl-11 !pr-10 !py-[13px] !bg-white !border-[1.5px] !border-[#e9ddcf] !rounded-xl !text-[13.5px] !font-[400] !text-gray-900 placeholder:!text-[#a89c8f] !shadow-sm focus:!border-[#FB8C42] focus:!ring-2 focus:!ring-[#FB8C42]/20"
                showLocationButton={false}
              />
              {suburbFilled && (
                <Check className="absolute right-4 w-4 h-4 text-[#FB8C42] pointer-events-none z-10" />
              )}
            </div>
          </div>

          {/* Service type — revealed after suburb is entered */}
          {suburbFilled && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-[calc(1*var(--scale-unit))] font-semibold text-gray-900 mb-4">
                What type of clean are you looking for?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { id: 'Standard', label: 'Standard', desc: 'Maintain cleanliness, remove visible dirt, restore order, and leave the home fresh.' },
                  { id: 'Deep', label: 'Deep', desc: 'High-detail clean to remove all dirt, grime, and build-up, with added attention to less frequently maintained areas.', badge: 'MOST BOOKED FIRST VISIT', badgeStyle: 'solid' },
                  { id: 'Vacate', label: 'Vacate', desc: 'A full-scope, maximum-detail clean — built to meet rental inspection standards.', badge: 'BOND BACK GUARANTEE', badgeStyle: 'soft' }
                ].map((type) => {
                  const isSelected = formData.cleaningType === type.id;
                  return (
                    <div
                      key={type.id}
                      onClick={() => {
                        setFormData({ ...formData, cleaningType: type.id as any });
                        setHasClickedService(true);
                      }}
                      className={`relative px-[calc(1*var(--scale-unit))] py-[calc(0.75*var(--scale-unit))] transition-all duration-300 flex flex-col h-full rounded-[20px] border-[1.5px] cursor-pointer ${
                        isSelected
                          ? 'border-[#FB8C42] bg-[#fffaf5] shadow-[0_0_0_3px_rgba(251,140,66,0.16)] z-10'
                          : 'border-[#ece1d3] bg-[#fff] hover:border-[#f6d3b3] hover:shadow-sm z-0'
                      }`}
                    >
                      {(type as any).badge && (
                        <div className={`absolute -top-3 left-1/2 -translate-x-1/2 text-[calc(0.5625*var(--scale-unit))] font-bold tracking-widest px-3 py-1 rounded-full uppercase whitespace-nowrap shadow-sm ${(type as any).badgeStyle === 'solid' ? 'bg-[#FB8C42] text-[#fff]' : 'bg-[#fff4ea] text-[#e0731f]'}`}>
                          {(type as any).badge}
                        </div>
                      )}
                      <h3 className="font-semibold text-[calc(1.0625*var(--scale-unit))] text-gray-900 mt-2">{type.label}</h3>
                      <p className="text-[calc(0.8125*var(--scale-unit))] font-normal text-[#8d8378] leading-relaxed mt-1 mb-1">{type.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ─── STEP 3: Condition Assessment (same as BookingPageFlow) ──────────────────
  const renderConditionAssessmentStep = () => {
    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col h-full w-full max-w-4xl mx-auto">
        <div className="mb-6">
          <h2 className="text-[calc(1.375*var(--scale-unit))] font-semibold text-gray-900 tracking-tight leading-tight">
            Service &amp; Condition
          </h2>
          <p className="text-gray-500 mt-2 text-[calc(0.8125*var(--scale-unit))] font-normal">Both together set your fixed price.</p>
        </div>

        <h3 className="text-[calc(1*var(--scale-unit))] font-semibold text-gray-900 mb-3">What type of clean are you looking for?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[
            { id: 'Standard', label: 'Standard', desc: 'Maintain cleanliness, remove visible dirt, restore order, and leave the home fresh.' },
            { id: 'Deep', label: 'Deep', desc: 'High-detail clean to remove all dirt, grime, and build-up, with added attention to less frequently maintained areas.', badge: 'MOST BOOKED FIRST VISIT', badgeStyle: 'solid' },
            { id: 'Vacate', label: 'Vacate', desc: 'A full-scope, maximum-detail clean — built to meet rental inspection standards.', badge: 'BOND BACK GUARANTEE', badgeStyle: 'soft' }
          ].map((type, index) => {
            const isSelected = formData.cleaningType === type.id;
            const isDisabled = type.id === 'Standard' && (formData.condition === 'Overdue' || formData.condition === 'Heavy Build Up');

            return (
              <div
                key={type.id}
                onClick={() => {
                  if (isDisabled) return;
                  let newCondition = formData.condition;
                  if (type.id === 'Standard' && (newCondition === 'Overdue' || newCondition === 'Heavy Build Up')) {
                    newCondition = 'Lived In';
                  }
                  setFormData({ ...formData, cleaningType: type.id as any, condition: newCondition });
                  setHasClickedService(true);
                }}
                className={`relative px-[calc(1*var(--scale-unit))] py-[calc(0.75*var(--scale-unit))] transition-all duration-300 flex flex-col h-full rounded-[20px] border-[1.5px] ${
                  isDisabled ? 'opacity-50 cursor-not-allowed border-[#ece1d3] bg-[#f9f9f9] grayscale-[0.5]' :
                  isSelected
                    ? 'cursor-pointer border-[#FB8C42] bg-[#fffaf5] shadow-[0_0_0_3px_rgba(251,140,66,0.16)] z-10'
                    : 'cursor-pointer border-[#ece1d3] bg-[#fff] hover:border-[#f6d3b3] hover:shadow-sm z-0'
                  }`}
              >
                {(type as any).badge && (
                  <div className={`absolute -top-3 left-1/2 -translate-x-1/2 text-[calc(0.5625*var(--scale-unit))] font-bold tracking-widest px-3 py-1 rounded-full uppercase whitespace-nowrap shadow-sm ${(type as any).badgeStyle === 'solid' ? 'bg-[#FB8C42] text-[#fff]' : 'bg-[#fff4ea] text-[#e0731f]'}`}>
                    {(type as any).badge}
                  </div>
                )}
                <h3 className="font-semibold text-[calc(1.0625*var(--scale-unit))] text-gray-900 mt-2">{type.label}</h3>
                <p className="text-[calc(0.8125*var(--scale-unit))] font-normal text-[#8d8378] leading-relaxed mt-1 mb-1">{type.desc}</p>
              </div>
            );
          })}
        </div>

        {(hasClickedService || !!formData.condition) && (
        <div className="flex flex-col gap-4 mb-5 mt-4 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="w-full">
            <h3 className="text-[calc(1*var(--scale-unit))] font-semibold text-gray-900 mb-3">What is the overall condition of the property?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
              {[
                { id: 'Lived In', label: 'Lived in', desc: 'Cleaned within the last ~6 weeks' },
                { id: 'Overdue', label: 'Overdue', desc: 'A few months since a proper clean' },
                { id: 'Heavy Build Up', label: 'Heavy build-up', badge: '+30%', desc: 'Long-neglected or post-reno' }
              ].map((cond) => {
                const isSelected = formData.condition === cond.id;
                return (
                  <div
                    key={cond.id}
                    onClick={() => {
                      setFormData({ ...formData, condition: cond.id as any });
                    }}
                    className={`cursor-pointer rounded-2xl border-[1.5px] px-4 py-3 transition-all duration-200 flex flex-col justify-center min-h-[72px] ${
                      isSelected
                        ? cond.id === 'Lived In'
                          ? 'border-emerald-500 bg-emerald-50 shadow-[0_0_0_3px_rgba(16,185,129,0.16)] z-10'
                          : cond.id === 'Overdue'
                            ? 'border-amber-500 bg-amber-50 shadow-[0_0_0_3px_rgba(245,158,11,0.16)] z-10'
                            : 'border-red-500 bg-red-50 shadow-[0_0_0_3px_rgba(239,68,68,0.16)] z-10'
                        : 'border-[#ece1d3] bg-[#fff] hover:border-[#f6d3b3] hover:shadow-sm z-0'
                      }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[calc(0.75*var(--scale-unit))] font-bold text-gray-900 leading-snug">{cond.label}</span>
                        <span className="text-[calc(0.78125*var(--scale-unit))] font-normal text-[#8d8378] leading-snug">{cond.desc}</span>
                      </div>
                      {cond.badge && (
                        <span className={`shrink-0 text-[calc(0.6875*var(--scale-unit))] font-semibold px-2 py-0.5 rounded-full ${
                          isSelected && cond.id === 'Heavy Build Up'
                            ? 'text-red-700 bg-red-100'
                            : 'text-[#e0731f] bg-[#fff4ea]'
                        }`}>
                          {cond.badge}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 mt-1">
              <div className="col-span-1 md:col-start-3 flex justify-end">
                <button type="button" onClick={() => setShowConditionQuiz(true)} className="text-[12px] text-[#8d8378] hover:text-[#FB8C42] underline decoration-dashed underline-offset-4 transition-colors font-medium bg-transparent py-1.5 text-right">
                  Not sure which fits?
                </button>
              </div>
            </div>
          </div>

          {formData.condition && (
            <div className="w-full animate-in fade-in slide-in-from-top-4 duration-500">
            {showConditionQuiz ? (
              <div className="bg-white border border-[#FB8C42] rounded-2xl p-4 h-full flex flex-col shadow-sm relative overflow-hidden min-h-[340px] md:min-h-[300px]">
                <button
                  onClick={() => setShowConditionQuiz(false)}
                  className="absolute top-4 right-4 z-10 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
                <ConditionQuiz onComplete={(tier) => {
                  setFormData({ ...formData, condition: tier });
                  setShowConditionQuiz(false);
                }} />
              </div>
            ) : (
              <div className="bg-[#fdf9f3] border border-[#eadfce] rounded-2xl p-4 h-full flex flex-col min-w-0 break-words overflow-hidden">
                <h3 className="text-[calc(0.625*var(--scale-unit))] font-semibold text-ink-soft tracking-[0.09em] uppercase mb-3 break-words">
                  WHAT '{formData.condition ? formData.condition.toUpperCase() : 'OVERDUE'}' LOOKS LIKE
                </h3>

                <p className="text-[calc(0.78125*var(--scale-unit))] font-normal text-gray-600 leading-relaxed mb-4 flex-1 break-words">
                  {formData.condition === 'Lived In'
                    ? "Everyday soil from normal living — everything comes up with a standard wipe, vacuum and mop, no scrubbing needed. Dust film on ledges and sills, fingerprints and light grease around the kitchen, water spots and light soap film in the bathroom, floors due for a vacuum and mop."
                    : formData.condition === 'Heavy Build Up'
                      ? "Widespread heavy build-up across multiple rooms — grime that needs scrapers or repeated dwell-and-scrub cycles. Scale you can feel on the shower glass, black or widely darkened grout, carbon layers on the stovetop, saturated rangehood filters, pet hair worked into fabric and edges — often accompanied by lingering odour."
                      : "Established build-up in the usual hotspots — needs product dwell time and proper scrubbing, but comes up within a single treatment. Cloudy (but smooth) shower glass, dark spots along the silicone, a greasy stovetop with cooked-on spots, tacky cupboard handles, a visible dust layer on ledges and skirting, scattered pet hair."
                  }
                </p>

                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex flex-col items-start gap-4">
                    <p className="text-sm text-[#8d8378] w-full text-justify">
                      <span className="font-bold text-gray-900">Not sure which fits?</span> Answer 8 quick questions (takes ~60 seconds) so your quote is accurate and there are no surprises on the day.
                    </p>
                    <button type="button" onClick={() => setShowConditionQuiz(true)} className="text-[calc(0.6875*var(--scale-unit))] font-semibold text-gray-900 bg-white border border-gray-200 rounded-full px-4 py-1.5 hover:bg-gray-50 transition-colors whitespace-nowrap self-start">Take condition check →</button>
                  </div>
                </div>
              </div>
            )}
            </div>
          )}
        </div>
        )}

        {(hasClickedService || !!formData.condition) && (
        <div className="bg-[#fff4ea] border border-[#f6d3b3] rounded-2xl p-5 mb-8 animate-in fade-in slide-in-from-top-4 duration-500 delay-150 fill-mode-both">
          <p className="text-sm text-[#6b5a48] leading-relaxed">
            <span className="font-bold text-gray-900">Your part in a Great Result:</span> To help us deliver the best possible result, please accurately select the overall condition of the property. Our cleaners will do an assessment prior to the clean — where the condition is beyond the scope of the chosen service, we will discuss an uplift or recommend a better suited service before we begin. <Link href="/uplift-policy" target="_blank" className="text-[#e0731f] font-semibold hover:underline">View full uplift &amp; scope policy here</Link>.
          </p>
        </div>
        )}
      </div>
    );
  };

  // ─── STEP 4: Customise — no prices on add-ons ────────────────────────────────
  const renderResStep2 = () => {
    return (
      <div className="max-w-4xl mx-auto w-full animate-in fade-in slide-in-from-right duration-500 flex flex-col justify-start py-2">
        <div className="flex flex-col space-y-4">
          <>
            <div className="mb-6">
              <h3 className="text-[calc(1.375*var(--scale-unit))] font-semibold text-gray-900 mb-1">Tell us about your home</h3>
              <p className="text-[calc(0.8125*var(--scale-unit))] font-normal text-gray-500 mb-4">Count every room we should clean.</p>
              <div className="bg-white rounded-[20px] border border-gray-100 flex flex-col shadow-sm">

                <div className="w-full border-b border-gray-100 last:border-0">
                  <RoomCounter
                    label={
                      <div className="flex items-center gap-1.5 relative group/info">
                        <span>Living areas</span>
                        <Info className="w-3.5 h-3.5 text-gray-400 cursor-help" />
                        <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 bottom-full mb-2 hidden group-hover/info:block w-[280px] p-3 bg-gray-900 text-white text-xs leading-relaxed rounded-lg shadow-xl z-50 whitespace-normal font-normal">
                          Only select more than one for truly distinct living areas - open plan living/dining count as one and all other general areas are included (hallways, staircases, etc). A separate sitting room or den would be classed as "other".
                          <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-full w-2 h-2 bg-gray-900 transform rotate-45 -mt-1"></div>
                        </div>
                      </div>
                    }
                    count={formData.homeDetails.livingRooms || 0}
                    onUpdate={(v: number) => updateRooms("livingRooms", v)}
                  />
                </div>

                <div className="border-b border-gray-100 last:border-0">
                  <RoomCounter
                    label="Bedrooms"
                    count={formData.homeDetails.bedrooms || 0}
                    onUpdate={(v: number) => updateRooms("bedrooms", v)}
                  />
                </div>

                <div className="border-b border-gray-100 last:border-0">
                  <RoomCounter
                    label="Bathrooms"
                    count={formData.homeDetails.bathrooms || 0}
                    onUpdate={(v: number) => updateRooms("bathrooms", v)}
                  />
                </div>

                <div className="border-b border-gray-100 last:border-0">
                  <RoomCounter
                    label="Kitchens"
                    count={formData.homeDetails.kitchens || 0}
                    onUpdate={(v: number) => updateRooms("kitchens", v)}
                  />
                </div>

                <div className="border-b border-gray-100 last:border-0">
                  <RoomCounter
                    label={
                      <span>
                        Other <span className="text-gray-400 text-[calc(0.71875*var(--scale-unit))] font-normal ml-1">(study, laundry, office...)</span>
                      </span>
                    }
                    count={formData.homeDetails.other || 0}
                    onUpdate={(v: number) => updateRooms("other", v)}
                  />
                </div>

              </div>
            </div>

            {/* Add-ons — no prices shown */}
            <div className="mt-6">
              <span className="block text-[calc(0.625*var(--scale-unit))] font-semibold uppercase text-ink-soft tracking-widest mb-4 border-b border-gray-50 pb-2">
                ADD-ONS
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-[10px]">
                {isLoadingConfig ? (
                  <div className="text-xs text-gray-400 py-2 col-span-3">Loading available add-ons...</div>
                ) : (Object.keys(pricingConfig?.extraPrices || EXTRA_PRICES) as Extra[])
                  .filter(extra => !(formData.cleaningType === 'Vacate' && extra === 'Cabinets'))
                  .map((extra) => {
                    const count = formData.extras?.[extra] || 0;
                    const isSelected = count > 0;
                    const isCounterAddon = extra === 'Windows' || extra === 'Walls';
                    
                    let extraLabel = extra as string;
                    if (formData.cleaningType === 'Vacate') {
                      if (extra === 'Walls') extraLabel = 'Walls (spot cleaning included)';
                      if (extra === 'Windows') extraLabel = 'Windows (first 5 free)';
                    }

                    return (
                      <div
                        key={extra}
                        onClick={() => {
                          if (isCounterAddon && !isSelected) updateExtraCount(extra, 1);
                          else if (!isCounterAddon) toggleExtra(extra);
                        }}
                        className={`flex items-center px-[14px] py-[12px] rounded-2xl border-[1.5px] transition-all cursor-pointer ${isSelected
                          ? "border-[#FB8C42] bg-[#FFF8F3]"
                          : "border-[#ece1d3] bg-white hover:border-[#FB8C42]/50 hover:bg-orange-50/30"
                          }`}
                      >
                        <div className="flex items-center min-w-0">
                          {!isCounterAddon && (
                            <div className={`w-[19px] h-[19px] rounded-[6px] border-[1.5px] flex items-center justify-center shrink-0 transition-colors ${isSelected ? "border-[#FB8C42] bg-[#FB8C42]" : "border-[#ddcfbd] bg-white"}`}>
                              {isSelected && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3.5} />}
                            </div>
                          )}

                          {isCounterAddon && !isSelected && (
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); updateExtraCount(extra, 1); }}
                              className="w-[19px] h-[19px] rounded-[6px] border-[1.5px] border-[#ddcfbd] bg-white flex items-center justify-center text-gray-500 hover:border-[#FB8C42] hover:text-[#FB8C42] transition-colors shrink-0"
                            >
                              <Plus className="w-3 h-3" strokeWidth={3} />
                            </button>
                          )}

                          {isCounterAddon && isSelected && (
                            <div className="w-[19px] h-[19px] rounded-[6px] border-[1.5px] border-[#FB8C42] bg-[#FB8C42] flex items-center justify-center shrink-0">
                              <Check className="w-3.5 h-3.5 text-white" strokeWidth={3.5} />
                            </div>
                          )}

                          <span className={`text-[12.5px] font-[500] leading-none ml-2.5 truncate ${isSelected ? "text-gray-900 font-[600]" : "text-[#4a423b]"}`}>
                            {extraLabel}
                          </span>
                        </div>

                        {/* Counter controls for counter add-ons — no price shown */}
                        {isCounterAddon && isSelected && (
                          <div className="flex items-center gap-1 ml-auto bg-white rounded-[6px] px-1 py-0.5 shadow-sm border border-[#FB8C42]/30">
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); updateExtraCount(extra, Math.max(0, count - 1)); }}
                              className="w-4 h-4 rounded bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-[#FB8C42] hover:text-white transition-colors"
                            >
                              <Minus className="w-2.5 h-2.5" strokeWidth={3} />
                            </button>
                            <span className="text-[12px] font-semibold w-2.5 text-center text-ink">{count}</span>
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); updateExtraCount(extra, count + 1); }}
                              className="w-4 h-4 rounded bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-[#FB8C42] hover:text-white transition-colors"
                            >
                              <Plus className="w-2.5 h-2.5" strokeWidth={3} />
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          </>
        </div>
      </div>
    );
  };

  // ─── STEP 5: Schedule (same as BookingPageFlow renderResStep3) ───────────────
  const renderResStep3 = () => {
    const today = new Date();
    const currentMonth = viewDate.getMonth();
    const currentYear = viewDate.getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const monthName = new Date(currentYear, currentMonth).toLocaleDateString(
      "en-US",
      { month: "long", year: "numeric" }
    );

    const handlePrevMonth = () => {
      const prevMonth = new Date(currentYear, currentMonth - 1, 1);
      const minDate = new Date(today.getFullYear(), today.getMonth(), 1);
      if (prevMonth >= minDate) {
        setViewDate(prevMonth);
      }
    };

    const handleNextMonth = () => {
      const nextMonth = new Date(currentYear, currentMonth + 1, 1);
      const maxDate = new Date(today.getFullYear(), today.getMonth() + 2, 1);
      if (nextMonth <= maxDate) {
        setViewDate(nextMonth);
      }
    };

    const handleDateSelect = (day: number) =>
      setFormData((prev) => ({
        ...prev,
        selectedDate: new Date(currentYear, currentMonth, day),
      }));

    const isDateSelected = (day: number) => {
      if (!formData.selectedDate) return false;
      return (
        formData.selectedDate.getDate() === day &&
        formData.selectedDate.getMonth() === currentMonth &&
        formData.selectedDate.getFullYear() === currentYear
      );
    };

    const isToday = (day: number) =>
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear();

    const isPastDate = (day: number) => {
      const t = new Date(currentYear, currentMonth, day);
      t.setHours(23, 59, 59);
      return t < new Date(today.getTime() + 48 * 60 * 60 * 1000);
    };

    const isBlockedDate = (day: number) => {
      if (!pricingConfig?.systemBlockedDates) return false;
      const mm = String(currentMonth + 1).padStart(2, '0');
      const dd = String(day).padStart(2, '0');
      const dateStr = `${currentYear}-${mm}-${dd}`;
      return pricingConfig.systemBlockedDates.includes(dateStr);
    };

    const frequencies = [
      { id: "One time", label: "One-time", save: null },
      { id: "Weekly", label: "Weekly", save: `SAVE ${pricingConfig?.frequencyDiscounts?.Weekly ?? 15}%` },
      { id: "Fortnightly", label: "Fortnightly", save: `SAVE ${pricingConfig?.frequencyDiscounts?.Fortnightly ?? 10}%` },
      { id: "Monthly", label: "Monthly", save: `SAVE ${pricingConfig?.frequencyDiscounts?.Monthly ?? 5}%` },
    ];

    return (
      <div className="max-w-3xl mx-auto w-full px-[calc(1.875*var(--scale-unit))] animate-in fade-in slide-in-from-right duration-500 flex flex-col gap-8 py-2">

        <div className="mb-2">
          <h2 className="text-[calc(1.375*var(--scale-unit))] font-semibold text-ink leading-[1.12] tracking-[-0.01em] mb-2">When should we come?</h2>
          <p className="text-[calc(0.8125*var(--scale-unit))] font-normal leading-[1.55] text-ink-muted">Regular cleans get a dedicated cleaner — and a lifetime discount.</p>
        </div>

        <div className="mb-2">
          <h3 className="text-[calc(1*var(--scale-unit))] font-semibold text-gray-900 mb-3">
            How often?
          </h3>
          <div className="flex flex-wrap md:flex-nowrap items-center gap-[calc(0.5*var(--scale-unit))]">
            {frequencies.map((freq) => {
              const isSelected = formData.frequency === freq.id;
              return (
                <div key={freq.id} className="relative flex-1 text-center w-full">
                  <button
                    onClick={() => {
                      setFormData({ ...formData, frequency: freq.id as any });
                    }}
                    className={`w-full px-[calc(1.25*var(--scale-unit))] py-2 md:py-2.5 rounded-full text-[calc(0.78125*var(--scale-unit))] font-medium transition-all border-[1.5px] flex items-center justify-center ${isSelected
                      ? "bg-cream-tag border-brand text-brand-dark font-semibold shadow-sm"
                      : "bg-white border-tan text-[#5c534b] hover:border-gray-300 hover:shadow-sm"
                      }`}
                  >
                    {freq.label}
                    {freq.save && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold tracking-widest px-2 py-0.5 rounded-full uppercase whitespace-nowrap bg-[#fff4ea] text-[#e0731f] shadow-sm">
                        {freq.save}
                      </span>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {formData.frequency && (
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-5 items-stretch animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both">

            <div className="bg-white border-[1.5px] border-tan-card rounded-2xl p-[calc(1.125*var(--scale-unit))] shadow-none hover:shadow-md transition-all duration-300 h-full flex flex-col">
              <div className="flex items-center justify-between mb-6 pb-2 relative">
                <button
                  onClick={handlePrevMonth}
                  className="w-[30px] h-[30px] rounded-full flex items-center justify-center hover:bg-gray-50 text-gray-500 transition-colors border border-gray-200 absolute left-0">
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <span className="text-[calc(0.875*var(--scale-unit))] font-bold text-gray-800 leading-[calc(1.5*var(--scale-unit))] w-full text-center">
                  {monthName}
                </span>
                <button
                  onClick={handleNextMonth}
                  className="w-[30px] h-[30px] rounded-full flex items-center justify-center hover:bg-gray-50 text-gray-500 transition-colors border border-gray-200 absolute right-0">
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center text-[calc(0.625*var(--scale-unit))] mb-3 text-gray-500 font-semibold uppercase tracking-wider">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d, i) => (
                  <div key={`${d}-${i}`}>{d}</div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-[calc(0.125*var(--scale-unit))] justify-items-center">
                {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                  <div key={`empty-${i}`} className="h-8 w-full" />
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const past = isPastDate(day);
                  const blocked = isBlockedDate(day);
                  const disabled = past || blocked;
                  const selected = isDateSelected(day);
                  const todayMark = isToday(day);
                  return (
                    <button
                      key={day}
                      onClick={() => !disabled && handleDateSelect(day)}
                      disabled={disabled}
                      className={`h-[calc(2.125*var(--scale-unit))] w-[calc(2.125*var(--scale-unit))] rounded-full flex flex-col items-center justify-center text-[calc(0.75*var(--scale-unit))] font-medium transition-all relative ${selected
                        ? "bg-brand text-white font-semibold"
                        : ""
                        } ${disabled
                          ? "text-gray-200 cursor-not-allowed bg-transparent"
                          : "hover:bg-gray-50 text-[#4a423b]"
                        } ${todayMark && !selected
                          ? "text-[#FB8C42] bg-orange-50/50"
                          : ""
                        }`}
                    >
                      {day}
                      {todayMark && (
                        <span
                          className={`absolute bottom-1 w-1 h-1 rounded-full ${selected ? "bg-white" : "bg-[#FB8C42]"
                            }`}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col h-full pt-0 -mt-1">
              <h3 className="text-[calc(1*var(--scale-unit))] font-semibold text-gray-900 mb-3">
                When works best for you? {formData.selectedDate ? `- ${formData.selectedDate.toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short" })}` : ""}
              </h3>

              <div className="columns-2 gap-[calc(0.5*var(--scale-unit))]">
                {(() => {
                  let availableTimes = timeSlots;
                  if (formData.selectedDate && pricingConfig?.systemBlockedTimeSlots) {
                    const mm = String(formData.selectedDate.getMonth() + 1).padStart(2, '0');
                    const dd = String(formData.selectedDate.getDate()).padStart(2, '0');
                    const dateStr = `${formData.selectedDate.getFullYear()}-${mm}-${dd}`;

                    const toMinutes = (timeStr: string) => {
                      const [time, modifier] = timeStr.split(' ');
                      let [hours, minutes] = time.split(':');
                      if (hours === '12') hours = '0';
                      if (modifier === 'PM') hours = String(parseInt(hours, 10) + 12);
                      return parseInt(hours, 10) * 60 + parseInt(minutes, 10);
                    };

                    const getHoursBetween = (start: string, end: string) => {
                      const startMins = toMinutes(start);
                      const endMins = toMinutes(end);
                      return timeSlots.filter(t => {
                        const tMins = toMinutes(t);
                        return tMins >= startMins && tMins < endMins;
                      });
                    };

                    const blockedTimesForDate = pricingConfig.systemBlockedTimeSlots
                      .filter(slot => slot.date === dateStr)
                      .flatMap(slot => getHoursBetween(slot.start, slot.end));

                    availableTimes = timeSlots.filter(time => !blockedTimesForDate.includes(time));
                  }

                  return availableTimes.map((time) => {
                    const isSelected = formData.selectedTime === time;
                    return (
                      <button
                        key={time}
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, selectedTime: time }))
                        }
                        className={`w-full block mb-[calc(0.5*var(--scale-unit))] break-inside-avoid py-[calc(0.625*var(--scale-unit))] px-[calc(1*var(--scale-unit))] rounded-full border-[1.5px] text-center text-[calc(0.78125*var(--scale-unit))] transition-all duration-200 ${isSelected
                          ? "border-[#FB8C42] bg-[#FFF5EE] text-[#C2580F] font-semibold"
                          : "border-[#FB8C42]/30 bg-white text-[#9C9289] font-medium hover:border-[#FB8C42]/60 hover:bg-[#FFF5EE]/50 hover:text-[#C2580F]"
                          }`}
                      >
                        {time}
                      </button>
                    );
                  });
                })()}
              </div>
            </div>

          </div>
        )}
      </div>
    );
  };

  // ─── STEP 6: Instructions (same as BookingPageFlow renderResStep4) ────────────
  const renderResStep4 = () => (
    <div className="max-w-4xl mx-auto w-full animate-in fade-in slide-in-from-right duration-500 flex flex-col justify-start gap-6">
      <div className="mb-2">
        <h2 className="text-[calc(1.375*var(--scale-unit))] font-semibold text-gray-900 tracking-tight leading-tight">
          Anything we should know?
        </h2>
        <p className="text-[calc(0.8125*var(--scale-unit))] font-normal text-gray-500 mt-2">
          Helps your cleaner arrive prepared — none of this changes your price
        </p>
      </div>
      <div className="space-y-6 mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="flex flex-col space-y-2">
            <label className="text-[calc(0.625*var(--scale-unit))] font-semibold uppercase text-ink-soft tracking-[0.09em]">
              PETS
            </label>
            <div className="relative flex items-center">
              <select
                className="w-full px-[calc(0.875*var(--scale-unit))] py-[calc(0.75*var(--scale-unit))] bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#FB8C42]/10 text-stone-900 font-normal text-[calc(0.90625*var(--scale-unit))] tracking-normal cursor-pointer appearance-none pr-10 shadow-sm transition-all"
                value={formData.instructions.pets}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    instructions: {
                      ...formData.instructions,
                      pets: e.target.value,
                    },
                  })
                }
              >
                <option value="" disabled>Select...</option>
                <option>No Pets</option>
                <option>Dog/Cat</option>
                <option>Other</option>
              </select>
              <svg className="absolute right-4 w-3.5 h-3.5 text-[#b4a491] pointer-events-none" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 10l5 5 5-5z" />
              </svg>
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-[calc(0.625*var(--scale-unit))] font-semibold uppercase text-ink-soft tracking-[0.09em]">
              PARKING
            </label>
            <div className="relative flex items-center">
              <select
                className="w-full px-[calc(0.875*var(--scale-unit))] py-[calc(0.75*var(--scale-unit))] bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#FB8C42]/10 text-stone-900 font-normal text-[calc(0.90625*var(--scale-unit))] tracking-normal cursor-pointer appearance-none pr-10 shadow-sm transition-all"
                value={formData.instructions.parking}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    instructions: {
                      ...formData.instructions,
                      parking: e.target.value,
                    },
                  })
                }
              >
                <option value="" disabled>Select...</option>
                <option>I will provide parking onsite</option>
                <option>There is free parking nearby/on the street</option>
                <option>I will provide paid parking nearby</option>
              </select>
              <svg className="absolute right-4 w-3.5 h-3.5 text-[#b4a491] pointer-events-none" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 10l5 5 5-5z" />
              </svg>
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-[calc(0.625*var(--scale-unit))] font-semibold uppercase text-ink-soft tracking-[0.09em]">
              ACCESS
            </label>
            <div className="relative flex items-center">
              <select
                className="w-full px-[calc(0.875*var(--scale-unit))] py-[calc(0.75*var(--scale-unit))] bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#FB8C42]/10 text-stone-900 font-normal text-[calc(0.90625*var(--scale-unit))] tracking-normal cursor-pointer appearance-none pr-10 shadow-sm transition-all"
                value={formData.instructions.entry}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    instructions: {
                      ...formData.instructions,
                      entry: e.target.value,
                    },
                  })
                }
              >
                <option value="" disabled>Select...</option>
                <option>I will be home</option>
                <option>I will leave a key</option>
                <option>I will provide a lockbox/access key</option>
                <option>Other (Please Specify)</option>
              </select>
              <svg className="absolute right-4 w-3.5 h-3.5 text-[#b4a491] pointer-events-none" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 10l5 5 5-5z" />
              </svg>
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-[calc(0.625*var(--scale-unit))] font-semibold uppercase text-ink-soft tracking-[0.09em]">
              CHEMICAL PREFERENCE
            </label>
            <div className="relative flex items-center">
              <select
                className="w-full px-[calc(0.875*var(--scale-unit))] py-[calc(0.75*var(--scale-unit))] bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#FB8C42]/10 text-stone-900 font-normal text-[calc(0.90625*var(--scale-unit))] tracking-normal cursor-pointer appearance-none pr-10 shadow-sm transition-all"
                value={formData.instructions.chemicals}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    instructions: {
                      ...formData.instructions,
                      chemicals: e.target.value,
                    },
                  })
                }
              >
                <option value="" disabled>Select...</option>
                <option>No preference</option>
                <option>Eco-friendly only</option>
                <option>Other (please specify below)</option>
              </select>
              <svg className="absolute right-4 w-3.5 h-3.5 text-[#b4a491] pointer-events-none" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 10l5 5 5-5z" />
              </svg>
            </div>
          </div>

        </div>

        <div className="flex flex-col space-y-2 pt-2">
          <label className="text-[calc(0.625*var(--scale-unit))] font-semibold uppercase text-ink-soft tracking-[0.09em]">
            NOTES FOR YOUR CLEANER
          </label>
          <textarea
            className="w-full px-[calc(0.875*var(--scale-unit))] py-[calc(0.75*var(--scale-unit))] bg-white border border-gray-200 rounded-xl outline-none resize-none h-32 text-stone-900 text-[calc(0.90625*var(--scale-unit))] font-normal tracking-normal placeholder:text-gray-400 leading-relaxed focus:ring-2 focus:ring-[#FB8C42]/10 shadow-sm transition-all"
            placeholder="e.g. please focus on the ensuite shower, gate code is 1234, bin day is Thursday..."
            value={formData.instructions.notes}
            onChange={(e) =>
              setFormData({
                ...formData,
                instructions: { ...formData.instructions, notes: e.target.value },
              })
            }
          />
        </div>
      </div>
    </div>
  );

  // ─── STEP 7: Submit — no password, CTA = "Submit Quote Request" ─────────────
  const renderResStep5 = () => {
    const addonsList = Object.entries(formData.extras).filter(([_, count]) => count > 0).map(([key, count]) => `${count}x ${key}`).join(', ');
    const rooms = [
      formData.homeDetails.bedrooms ? `${formData.homeDetails.bedrooms} Bed` : null,
      formData.homeDetails.bathrooms ? `${formData.homeDetails.bathrooms} Bath` : null,
      formData.homeDetails.livingRooms ? `${formData.homeDetails.livingRooms} Living` : null,
      formData.homeDetails.kitchens ? `${formData.homeDetails.kitchens} Kitchen` : null,
      formData.homeDetails.other ? `${formData.homeDetails.other} Other` : null,
    ].filter(Boolean).join(', ');

    return (
    <div className="max-w-4xl mx-auto w-full animate-in fade-in slide-in-from-right duration-500 flex flex-col justify-start gap-6 pt-4">
      <div className="mb-2 flex items-start justify-between flex-wrap gap-2">
        <div>
          <h2 className="text-[calc(1.375*var(--scale-unit))] font-semibold text-gray-900 tracking-tight leading-tight">
            Review your quote details
          </h2>
          <p className="text-[calc(0.8125*var(--scale-unit))] font-normal text-gray-500 mt-2">
            Almost done — just confirm your choices and submit your request.
          </p>
        </div>
        <ReservationTimer />
      </div>

      {/* Beautiful Summary Card */}
      <div className="bg-[#fffdfb] border border-[#f6d3b3] rounded-[24px] overflow-hidden shadow-sm shadow-orange-50/50 mb-4">
        <div className="bg-[#fff4ea] px-6 py-4 border-b border-[#f6d3b3]">
          <h3 className="text-[15px] font-bold text-gray-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#FB8C42]" />
            Quote Summary
          </h3>
        </div>
        
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#a2968a] mb-1">Service & Location</p>
              <p className="text-sm font-semibold text-gray-900">{formData.cleaningType || "Standard"} Clean in {formData.contact.suburb || "TBD"}</p>
            </div>
            
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#a2968a] mb-1">Property Details</p>
              <p className="text-sm font-medium text-gray-800">{rooms || "Not specified"}</p>
              {addonsList && <p className="text-xs text-gray-500 mt-1"><span className="font-semibold text-gray-600">Add-ons:</span> {addonsList}</p>}
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#a2968a] mb-1">Schedule</p>
              <p className="text-sm font-medium text-gray-800">
                {formData.selectedDate ? formData.selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) : "Not selected"} 
                {formData.selectedTime ? ` at ${formData.selectedTime}` : ""}
              </p>
              {formData.frequency && <p className="text-xs font-semibold text-[#FB8C42] mt-0.5">{formData.frequency}</p>}
            </div>
          </div>

          <div className="space-y-4 md:border-l md:border-gray-100 md:pl-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#a2968a] mb-2">Instructions</p>
              <ul className="space-y-2 text-xs text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-gray-800 min-w-[70px]">Entry:</span>
                  <span>{formData.instructions.entry || "Not specified"}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-gray-800 min-w-[70px]">Parking:</span>
                  <span>{formData.instructions.parking || "Not specified"}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-gray-800 min-w-[70px]">Pets:</span>
                  <span>{formData.instructions.pets || "None"}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-gray-800 min-w-[70px]">Chemicals:</span>
                  <span>{formData.instructions.chemicals || "No preference"}</span>
                </li>
              </ul>
            </div>
            
            {formData.instructions.notes && (
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#a2968a] mb-1">Extra Notes</p>
                <p className="text-xs text-gray-600 italic line-clamp-2 bg-gray-50 p-2 rounded-lg border border-gray-100">
                  "{formData.instructions.notes}"
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Feedback Messages */}
      {submitError && (
        <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-semibold">
          {submitError}
        </div>
      )}
      {submitSuccess && (
        <div className="p-3.5 bg-green-50 border border-green-200 rounded-xl text-green-700 text-xs font-semibold">
          {submitSuccess}
        </div>
      )}

      {/* Action controls row */}
      <div className="mt-8 relative w-full flex justify-center">
        <button
          onClick={handlePrev}
          className="absolute left-0 top-3 flex items-center gap-1.5 text-gray-500 hover:text-gray-800 font-medium text-[calc(0.84375*var(--scale-unit))] tracking-wide transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </button>

        <div className="flex flex-col items-center gap-3 w-full md:w-auto">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full md:w-auto md:min-w-[calc(15*var(--scale-unit))] bg-[#FB8C42] hover:bg-[#FB8C42]/90 text-white py-3 px-6 rounded-full font-semibold text-[calc(0.9375*var(--scale-unit))] shadow-lg shadow-[#FB8C42]/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4.5 h-4.5 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <span>Submit Quote Request</span>
                <ArrowRight className="w-4.5 h-4.5 text-white" />
              </>
            )}
          </button>
          <span className="text-[11px] text-[#A2968A] font-normal text-center">
            We'll be in touch within 2 business hours with your confirmed price.
          </span>
        </div>
      </div>
      </div>
    );
  };

  // ─── Commercial steps (unchanged from BookingPageFlow) ───────────────────────
  const renderCommStep2 = () => (
    <div className="max-w-4xl mx-auto w-full animate-in fade-in slide-in-from-right duration-500 h-full flex flex-col justify-center py-4">
      <div className="text-center mb-8">
        <h3 className="text-[calc(1.375*var(--scale-unit))] font-semibold text-gray-900 mb-2">
          Tell Us About Your Business
        </h3>
        <p className="text-gray-500 text-sm">
          Let's start with some basic information about your business.
        </p>
      </div>
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="block text-xs font-extrabold text-gray-700 uppercase tracking-widest">
            Business Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter business name"
            className="w-full p-4 bg-gray-50 border border-transparent rounded-xl outline-none focus:border-primary focus:bg-white transition-all text-sm font-bold text-gray-800"
            value={formData.commercial.businessName}
            onChange={(e) => updateComm("businessName", e.target.value)}
          />
        </div>
        <div className="space-y-2 flex flex-col">
          <label className="block text-xs font-extrabold text-gray-700 uppercase tracking-widest">
            Business Size <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              className="w-full p-4 bg-gray-50 border border-transparent rounded-xl outline-none focus:border-primary focus:bg-white transition-all appearance-none cursor-pointer text-sm font-bold text-gray-800"
              value={formData.commercial.businessSize}
              onChange={(e) => updateComm("businessSize", e.target.value)}
            >
              <option value="" disabled>
                Select business size
              </option>
              {commBusinessSizes.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
            <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 rotate-90 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );

  const renderCommStep3 = () => (
    <div className="max-w-4xl mx-auto w-full animate-in fade-in slide-in-from-right duration-500 h-full flex flex-col justify-center py-4">
      <div className="text-center mb-8">
        <h3 className="text-[calc(1.375*var(--scale-unit))] font-semibold text-gray-900 mb-2">
          What Needs Cleaning
        </h3>
        <p className="text-gray-500 text-sm">
          Tell us about your commercial cleaning requirements.
        </p>
      </div>
      <div className="grid md:grid-cols-12 gap-8 items-start">

        <div className="md:col-span-7 space-y-4">
          <label className="block text-xs font-extrabold text-gray-700 uppercase tracking-widest">
            Type of Environment <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            {commEnvironments.map((env) => {
              const isSelected = formData.commercial.environment === env;
              return (
                <button
                  key={env}
                  onClick={() => updateComm("environment", env)}
                  className={`p-3 text-xs font-bold rounded-xl border-2 transition-all duration-200 text-center hover:border-primary hover:shadow-md truncate ${isSelected
                    ? "bg-primary text-white border-primary shadow-md"
                    : "bg-white border-gray-100 text-gray-600"
                    }`}
                >
                  {env}
                </button>
              );
            })}
          </div>
        </div>

        <div className="md:col-span-5 space-y-4">
          <label className="block text-xs font-extrabold text-gray-700 uppercase tracking-widest">
            Type of Clean <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 gap-2">
            {commCleanTypes.map((type) => {
              const isSelected = formData.commercial.cleanType === type;
              return (
                <button
                  key={type}
                  onClick={() => updateComm("cleanType", type)}
                  className={`p-4 text-xs font-bold rounded-xl border-2 transition-all duration-200 text-left px-5 hover:border-primary hover:shadow-md ${isSelected
                    ? "bg-primary text-white border-primary shadow-md"
                    : "bg-white border-gray-100 text-gray-600"
                    }`}
                >
                  {type}
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );

  const renderCommStep4 = () => (
    <div className="max-w-4xl mx-auto w-full animate-in fade-in slide-in-from-right duration-500 h-full flex flex-col justify-center py-4">
      <div className="text-center mb-8">
        <h3 className="text-[calc(1.375*var(--scale-unit))] font-semibold text-gray-900 mb-2">
          How Often &amp; Availability
        </h3>
        <p className="text-gray-500 text-sm">When do you need cleaning services?</p>
      </div>
      <div className="space-y-8">

        <div className="space-y-4">
          <label className="block text-xs font-extrabold text-gray-700 uppercase tracking-widest">
            Frequency <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {commFrequencies.map((freq) => {
              const isSelected = formData.commercial.frequency === freq;
              return (
                <button
                  key={freq}
                  onClick={() => updateComm("frequency", freq)}
                  className={`py-3 rounded-xl border-2 font-bold text-xs transition-all hover:border-primary ${isSelected
                    ? "bg-primary text-white border-primary shadow-md"
                    : "bg-white border-gray-100 text-gray-600"
                    }`}
                >
                  {freq}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-xs font-extrabold text-gray-700 uppercase tracking-widest text-center">
            Availability (Days of Week)
          </label>
          <div className="flex gap-2 flex-wrap justify-center">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => {
              const isSelected = formData.commercial.days.includes(day);
              return (
                <button
                  key={day}
                  onClick={() => toggleDay(day)}
                  className={`w-12 h-12 rounded-full border-2 text-xs font-bold transition-all hover:border-primary ${isSelected
                    ? "bg-primary text-white border-primary shadow-md"
                    : "bg-white border-gray-100 text-gray-600"
                    }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );

  const renderCommStep5 = () => (
    <div className="max-w-4xl mx-auto w-full animate-in fade-in slide-in-from-right duration-500 h-full flex flex-col justify-center py-4">
      <div className="text-center mb-8">
        <h3 className="text-[calc(1.375*var(--scale-unit))] font-semibold text-gray-900 mb-2">
          Insurance &amp; Budget
        </h3>
        <p className="text-gray-500 text-sm">
          Let's discuss insurance requirements and your budget.
        </p>
      </div>
      <div className="space-y-8">

        <div className="bg-white p-6 rounded-2xl border-2 border-gray-100 shadow-sm">
          <label className="flex items-start gap-4 cursor-pointer group">
            <div
              className={`mt-1 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${formData.commercial.insuranceRequired
                ? "bg-primary border-primary"
                : "border-gray-200 bg-gray-50"
                }`}
            >
              <input
                type="checkbox"
                className="hidden"
                checked={formData.commercial.insuranceRequired}
                onChange={(e) =>
                  updateComm("insuranceRequired", e.target.checked)
                }
              />
              {formData.commercial.insuranceRequired && (
                <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
              )}
            </div>
            <div>
              <span className="block font-bold text-gray-800 group-hover:text-primary transition-colors">
                Insurance and bonding documentation required
              </span>
              <span className="text-xs text-gray-500 mt-1 block">
                Check this if you require our team to provide insurance and
                bonding documentation before service begins.
              </span>
            </div>
          </label>
        </div>

        <div className="space-y-4">
          <label className="block text-xs font-extrabold text-gray-700 uppercase tracking-widest">
            Monthly Budget <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {commBudgets.map((bg) => {
              const isSelected = formData.commercial.budget === bg;
              return (
                <button
                  key={bg}
                  onClick={() => updateComm("budget", bg)}
                  className={`py-3 px-2 rounded-xl border-2 font-bold text-xs transition-all hover:border-primary truncate ${isSelected
                    ? "bg-primary text-white border-primary shadow-md"
                    : "bg-white border-gray-100 text-gray-600"
                    }`}
                >
                  {bg}
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );

  const renderCommStep6 = () => (
    <div className="max-w-4xl mx-auto w-full animate-in fade-in slide-in-from-right duration-500 h-full flex flex-col justify-center py-4">
      <div className="text-center mb-8">
        <h3 className="text-[calc(1.375*var(--scale-unit))] font-semibold text-gray-900 mb-2">
          Commercial Sign Up
        </h3>
        <p className="text-gray-500 text-sm">
          Provide your business contact information for the service agreement.
        </p>
      </div>

      <div className="space-y-4 bg-white p-8 rounded-[28px] border border-gray-100 shadow-lg">

        <div className="space-y-1">
          <label className="text-[calc(0.625*var(--scale-unit))] font-extrabold uppercase text-muted-foreground/60 tracking-widest">
            Primary Contact <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            autoComplete="name"
            placeholder="Primary contact person name"
            className="w-full p-3 bg-gray-50 border border-transparent rounded-xl outline-none focus:border-primary focus:bg-white text-sm font-semibold text-gray-800 transition-all"
            value={formData.contact.firstName}
            onChange={(e) => updateContact("firstName", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[calc(0.625*var(--scale-unit))] font-extrabold uppercase text-muted-foreground/60 tracking-widest">
              Business Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              autoComplete="email"
              placeholder="business@company.com"
              className="w-full p-3 bg-gray-50 border border-transparent rounded-xl outline-none focus:border-primary focus:bg-white text-sm font-semibold text-gray-800 transition-all"
              value={formData.contact.email}
              onChange={(e) => updateContact("email", e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <label className="text-[calc(0.625*var(--scale-unit))] font-extrabold uppercase text-muted-foreground/60 tracking-widest">
              Business Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              autoComplete="tel"
              placeholder="(03) 1234 5678"
              className="w-full p-3 bg-gray-50 border border-transparent rounded-xl outline-none focus:border-primary focus:bg-white text-sm font-semibold text-gray-800 transition-all"
              value={formData.contact.phone}
              onChange={(e) => updateContact("phone", e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[calc(0.625*var(--scale-unit))] font-extrabold uppercase text-muted-foreground/60 tracking-widest">
            Business Address <span className="text-red-500">*</span>
          </label>
          <AddressAutocomplete
            value={formData.contact.address}
            onChange={(value) => updateContact("address", value)}
            placeholder="Full business address"
            inputClassName="p-3 border-transparent"
            onValidityChange={setIsAddressValid}
            onOutOfAreaFeeChange={setOutOfAreaFee}
          />
        </div>

        <div className="pt-2">
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary accent-primary cursor-pointer"
              checked={formData.contact.terms}
              onChange={(e) => updateContact("terms", e.target.checked)}
            />
            <span className="text-xs text-gray-500 font-medium">
              I accept the{" "}
              <Link href="/commercial-agreement" target="_blank" className="underline text-primary hover:text-primary/80 transition-colors">
                Commercial Service Agreement
              </Link>
            </span>
          </label>
        </div>

        {submitError && (
          <div className="mt-4 p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-semibold">
            {submitError}
          </div>
        )}
        {submitSuccess && (
          <div className="mt-4 p-3.5 bg-green-50 border border-green-200 rounded-xl text-green-700 text-xs font-semibold">
            {submitSuccess}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={isSubmitting || !isAddressValid}
          className="w-full mt-4 bg-primary hover:bg-primary/95 text-white py-4 rounded-xl font-bold shadow-lg shadow-[#FB8C42]/10 hover:shadow-xl hover:shadow-[#FB8C42]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Quote Request"
          )}
        </button>
      </div>
    </div>
  );

  const { ref: sectionRef, style: scaleStyle } = useScrollScale({
    threshold: 0.1,
  });
  const validStep = isStepValid();

  const renderContent = () => {
    if (isCommercial) {
      switch (currentStep) {
        case 1: return renderResStepDiscount();
        case 2: return renderCommStep2();
        case 3: return renderCommStep3();
        case 4: return renderCommStep4();
        case 5: return renderCommStep5();
        case 6: return renderCommStep6();
        default: return null;
      }
    } else {
      switch (currentStep) {
        case 1: return renderResStepDiscount();       // Details
        case 2: return renderQuoteServiceStep();       // Suburb + Service Type (NEW)
        case 3: return renderResStep2();               // Customise (no prices)
        case 4: return renderResStep3();               // Schedule
        case 5: return renderResStep4();               // Instructions
        case 6: return renderResStep5();               // Submit (no password)
        default: return null;
      }
    }
  };

  const getStepTitle = () => {
    if (isCommercial) {
      switch (currentStep) {
        case 1: return <span className="text-gray-900">Your Details</span>;
        case 2: return "Tell Us About Your Business";
        case 3: return "What Needs Cleaning";
        case 4: return "How Often & Availability";
        case 5: return "Insurance & Budget";
        case 6: return "Commercial Sign Up";
        default: return "";
      }
    }

    switch (currentStep) {
      case 1: return <span className="text-gray-900">Your Details</span>;
      case 2: return "Location & Service";
      case 3: return "Customise";
      case 4: return "Schedule";
      case 5: return "Instructions";
      case 6: return "Submit Quote";
      default: return "";
    }
  };

  const sidebarSteps = [
    { label: "Details", step: 1, icon: User },
    { label: "Service", step: 2, icon: MapPin },
    { label: "Customise", step: 3, icon: Sliders },
    { label: "Schedule", step: 4, icon: Calendar },
    { label: "Instructions", step: 5, icon: FileText },
    { label: "Submit", step: 6, icon: Check },
  ];

  return (
    <div className="min-h-[100dvh] flex flex-col bg-white font-sans text-gray-900 pb-[calc(5*var(--scale-unit))] min-[880px]:pb-0">
      <div className="w-full flex-1 flex flex-col">

        {/* HORIZONTAL STEPPER (Visible < 1180px) */}
        <div className="block min-[1180px]:hidden w-full border-b border-[#e5e5e5] bg-white sticky top-0 z-40">
          <div className="flex overflow-x-auto no-scrollbar items-center py-4 px-[calc(1.25*var(--scale-unit))] min-[880px]:px-[calc(2.125*var(--scale-unit))] gap-6">
            {sidebarSteps.map((item, idx) => {
              const isActive = item.step === currentStep;
              const isCompleted = item.step < currentStep;
              return (
                <div
                  key={idx}
                  onClick={() => {
                    if (isCompleted && item.step !== 1) {
                      setSubmitError(null);
                      setSubmitSuccess(null);
                      setCurrentStep(item.step);
                    }
                  }}
                  className={`flex items-center gap-2 whitespace-nowrap shrink-0 ${isCompleted && item.step !== 1 ? 'cursor-pointer hover:opacity-80' : 'cursor-default'}`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10 transition-all ${isActive ? "bg-[#FB8C42] text-white shadow-md shadow-[#FB8C42]/20" :
                    isCompleted ? "bg-[#FB8C42]/10 text-[#FB8C42] border border-[#FB8C42]/20" :
                      "bg-gray-50 text-gray-400 border border-gray-100"
                    }`}>
                    {isCompleted ? <Check className="w-3 h-3" strokeWidth={3} /> : <span className="text-[calc(0.625*var(--scale-unit))] font-semibold">{item.step}</span>}
                  </div>
                  <span className={`text-[calc(0.6875*var(--scale-unit))] tracking-wide ${isActive ? "font-semibold text-[#2b2523]" : isCompleted ? "font-medium text-gray-700" : "font-medium text-gray-400"}`}>
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col min-[880px]:flex-row items-stretch w-full flex-1">
          {/* LEFT COLUMN - STEPPER (Visible >= 1180px) */}
          <div className="hidden min-[1180px]:block w-[calc(16*var(--scale-unit))] shrink-0 bg-transparent border-r border-[#f2eadf]">
            <div className="flex flex-col gap-6 py-[calc(1.625*var(--scale-unit))] px-[calc(1.375*var(--scale-unit))] lg:sticky lg:top-20">
              {sidebarSteps.map((item, idx) => {
                const isActive = item.step === currentStep;
                const isCompleted = item.step < currentStep;
                return (
                  <div
                    key={idx}
                    onClick={() => {
                      if (isCompleted && item.step !== 1) {
                        setSubmitError(null);
                        setSubmitSuccess(null);
                        setCurrentStep(item.step);
                      }
                    }}
                    role={isCompleted && item.step !== 1 ? "button" : "presentation"}
                    tabIndex={isCompleted && item.step !== 1 ? 0 : -1}
                    onKeyDown={(e) => {
                      if (isCompleted && item.step !== 1 && (e.key === "Enter" || e.key === " ")) {
                        e.preventDefault();
                        setSubmitError(null);
                        setSubmitSuccess(null);
                        setCurrentStep(item.step);
                      }
                    }}
                    className={`flex items-center gap-4 relative w-full text-left ${isCompleted && item.step !== 1 ? 'cursor-pointer hover:opacity-80' : 'cursor-default'}`}
                  >
                    {idx < sidebarSteps.length - 1 && (
                      <div className={`absolute left-[calc(0.9375*var(--scale-unit))] top-[calc(1.875*var(--scale-unit))] bottom-[-24px] w-0.5 ${isCompleted ? 'bg-[#FB8C42]' : 'bg-gray-100'}`} />
                    )}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 transition-all ${isActive ? "bg-[#FB8C42] text-white shadow-md shadow-[#FB8C42]/20" :
                      isCompleted ? "bg-[#FB8C42]/10 text-[#FB8C42] border border-[#FB8C42]/20" :
                        "bg-gray-50 text-gray-400 border border-gray-100"
                      }`}>
                      {isCompleted ? <Check className="w-4 h-4" strokeWidth={3} /> : <span className="text-[calc(0.6875*var(--scale-unit))] font-semibold">{item.step}</span>}
                    </div>
                    <span className={`text-[calc(0.78125*var(--scale-unit))] tracking-wide ${isActive ? "font-semibold text-[#2b2523]" : isCompleted ? "font-medium text-gray-700" : "font-medium text-gray-400"}`}>
                      {item.label}
                    </span>
                  </div>
                );
              })}

              <div className="w-full h-px bg-[#e5e5e5] my-2" />
              <p className="text-[calc(0.75*var(--scale-unit))] font-medium text-gray-400 leading-[1.6] pr-2">
                Your quote is saved as you go &mdash; finish any time from the link we send you.
              </p>
            </div>
          </div>

          {/* MIDDLE COLUMN - MAIN FORM CONTENT */}
          <div className={`w-full min-[880px]:flex-1 shrink-0 bg-transparent px-[calc(1.25*var(--scale-unit))] min-[880px]:px-[calc(1.125*var(--scale-unit))] pt-[calc(1.875*var(--scale-unit))] pb-[calc(4*var(--scale-unit))] min-[880px]:pt-[calc(1.5*var(--scale-unit))] min-[880px]:pb-[calc(8*var(--scale-unit))] relative flex flex-col items-center ${currentStep === 1 && !isCommercial ? 'min-[880px]:!px-[34px] min-[880px]:!py-[56px] min-[880px]:justify-center' : ''}`}>
            <div className={`w-full max-w-[calc(72*var(--scale-unit))] flex flex-col flex-1 justify-center min-[880px]:justify-start ${currentStep === 1 && !isCommercial ? 'items-center' : ''}`}>
              {renderContent()}

              {/* Inner Step Controls (Hidden on Mobile) */}
              {currentStep < totalSteps && (
                <div className={`hidden min-[880px]:flex w-full ${currentStep === 1 && !isCommercial
                  ? "flex-col items-center"
                  : "mt-10 items-center justify-center gap-6 relative"
                  }`}>
                  {currentStep === 1 && !isCommercial ? (
                    <div className="w-full max-w-[460px] flex flex-col items-center mt-10">
                      <button
                        onClick={handleNext}
                        disabled={!isStepValid() || isSubmittingDiscount}
                        className={`w-full px-[24px] py-[11px] rounded-full font-[600] text-[13.5px] transition-all flex items-center justify-center gap-2 ${!isStepValid() || isSubmittingDiscount
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-[#FB8C42] hover:bg-[#FB8C42]/90 text-white shadow-lg shadow-[#FB8C42]/20 hover:scale-[1.02]"
                          }`}
                      >
                        {isSubmittingDiscount ? "Saving..." : (
                          <>Continue <ArrowRight className="w-4 h-4" /></>
                        )}
                      </button>
                      <span className="text-[11px] text-[#A2968A] font-normal text-center mt-2">
                        No spam — just your quote and booking updates.
                      </span>
                    </div>
                  ) : (
                    <>
                      {currentStep > 2 && (
                        <button
                          onClick={handlePrev}
                          className="flex items-center gap-1.5 text-gray-500 hover:text-gray-800 font-medium text-[calc(0.84375*var(--scale-unit))] tracking-wide transition-colors"
                        >
                          <ChevronLeft className="w-4 h-4" /> Back
                        </button>
                      )}
                      <div className="flex flex-col items-end gap-2">
                        <button
                          onClick={handleNext}
                          disabled={!isStepValid()}
                          className={`px-[calc(1.5*var(--scale-unit))] py-[calc(0.6875*var(--scale-unit))] rounded-full font-semibold text-[calc(0.84375*var(--scale-unit))] transition-all flex items-center gap-2 ${!isStepValid()
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-[#FB8C42] hover:bg-[#FB8C42]/90 text-white shadow-lg shadow-[#FB8C42]/20 hover:scale-[1.02]"
                            }`}
                        >
                          Continue <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="hidden md:flex items-center absolute right-0">
                        <a
                          href="tel:0451433786"
                          className="flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-[calc(0.8125*var(--scale-unit))] text-gray-500 hover:text-gray-900 bg-white border border-gray-200 hover:border-[#FB8C42]/50 hover:bg-orange-50/30 transition-all shadow-sm"
                        >
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span>Need help? <span className="font-bold text-gray-700">0451 433 786</span></span>
                        </a>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN - QUOTE SUMMARY (Visible >= 880px) */}
          <div className="hidden min-[880px]:block w-[calc(21*var(--scale-unit))] shrink-0 bg-[#fdf9f3] border-l border-[#f2eadf]">
            <div className="sticky top-20">
              <QuoteSummaryCard
                className="w-full !bg-transparent !border-none"
                formData={formData}
                pricingConfig={pricingConfig}
                pricingResult={pricingResult}
                outOfAreaFee={outOfAreaFee}
                currentStep={currentStep}
              />
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE STICKY FOOTER (< 880px) */}
      <div className="block min-[880px]:hidden fixed bottom-0 left-0 w-full z-50 bg-white border-t border-gray-200 p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-between gap-4 w-full">
          <div className="flex flex-col">
            <span className="text-[12.5px] font-[600] text-[#2b2523] uppercase tracking-wider">Quote Summary</span>
            <span className="text-[13px] font-[400] text-[#8d8378] mt-0.5 leading-[1.55]">
              {formData.cleaningType ? `${formData.cleaningType} Clean` : "Build your quote"}
              {formData.contact.suburb ? ` · ${formData.contact.suburb}` : ""}
            </span>
          </div>
          {currentStep < totalSteps && (
            <button
              onClick={handleNext}
              disabled={!isStepValid() || isSubmittingDiscount}
              className={`px-6 py-3 rounded-full font-semibold text-[calc(0.84375*var(--scale-unit))] transition-all flex items-center gap-2 ${!isStepValid() || isSubmittingDiscount
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-[#FB8C42] hover:bg-[#FB8C42]/90 text-white shadow-lg shadow-[#FB8C42]/20"
                }`}
            >
              {isSubmittingDiscount ? "Saving..." : (
                <>Continue <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};;

const RoomCounter = ({ label, count, onUpdate, hasInfo = false, className = "" }: any) => {
  const getCounterIcon = (lbl: any) => {
    if (typeof lbl !== 'string') return Sofa;
    const lower = lbl.toLowerCase();
    if (lower.includes("bedroom")) return Bed;
    if (lower.includes("bathroom")) return Bath;
    if (lower.includes("kitchen")) return ChefHat;
    if (lower.includes("living")) return Sofa;
    return Sofa;
  };

  const Icon = getCounterIcon(label);

  return (
    <div className={`w-full py-3 px-4 flex items-center justify-between transition-all duration-300 gap-3 ${hasInfo ? "group" : ""} ${className}`}>
      <div className="flex items-center gap-2.5 flex-wrap min-w-0">
        <div className="w-9 h-9 rounded-xl bg-orange-50/70 border border-orange-100 flex items-center justify-center shadow-sm shrink-0">
          <Icon className="w-4 h-4 text-[#FB8C42]" />
        </div>
        <div className="font-medium text-gray-800 text-[calc(0.875*var(--scale-unit))] flex items-center flex-wrap">
          {label}
        </div>
        {hasInfo && (
          <div className="w-5 h-5 rounded-full border-2 border-red-500/80 text-red-500/80 flex items-center justify-center ml-1 opacity-80 group-hover:opacity-100 transition-opacity cursor-help shrink-0">
            <span className="text-[calc(0.75*var(--scale-unit))] font-bold leading-none -mt-0.5">i</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4 shrink-0">
        <button
          onClick={() => onUpdate(-1)}
          className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-500 hover:text-gray-800 transition-colors border border-gray-200 shrink-0"
        >
          <Minus className="w-3.5 h-3.5" strokeWidth={2} />
        </button>
        <span className="w-4 text-center font-semibold text-[calc(0.875*var(--scale-unit))] text-gray-900 shrink-0">{count}</span>
        <button
          onClick={() => onUpdate(1)}
          className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#FB8C42] hover:bg-orange-50 transition-all border-[1.5px] border-[#FB8C42]/50 shrink-0"
        >
          <Plus className="w-3.5 h-3.5" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
};

interface AddressAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  showLocationButton?: boolean;
  onLocationClick?: () => void;
  isLoadingLocation?: boolean;
  onValidityChange?: (isValid: boolean) => void;
  setExternalError?: (error: string | null) => void;
  onOutOfAreaFeeChange?: (fee: number) => void;
  mode?: "address" | "suburb";
}

const AddressAutocomplete = ({
  value,
  onChange,
  placeholder = "123 Clean St...",
  className = "",
  inputClassName = "",
  showLocationButton = false,
  onLocationClick,
  isLoadingLocation = false,
  onValidityChange,
  setExternalError,
  onOutOfAreaFeeChange,
  mode = "address",
}: AddressAutocompleteProps) => {
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [inputFocused, setInputFocused] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (value.trim().length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    debounceTimerRef.current = setTimeout(async () => {
      try {
        const results = mode === "suburb"
          ? await searchSuburbs(value, 5)
          : await searchAddresses(value, 5);
        setSuggestions(results);
        setShowSuggestions(results.length > 0 && inputFocused);
        setSelectedIndex(-1);
      } catch (error) {
        console.error("Error fetching address suggestions:", error);
        setSuggestions([]);
        setShowSuggestions(false);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [value, inputFocused]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
        setInputFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) {
      if (e.key === "Escape") {
        setShowSuggestions(false);
        setInputFocused(false);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleSelectSuggestion(suggestions[selectedIndex]);
        }
        break;
      case "Escape":
        e.preventDefault();
        setShowSuggestions(false);
        setInputFocused(false);
        inputRef.current?.blur();
        break;
    }
  };

  const handleSelectSuggestion = (suggestion: AddressSuggestion) => {
    onChange(suggestion.name);
    setShowSuggestions(false);
    setSuggestions([]);
    setSelectedIndex(-1);
    inputRef.current?.blur();

    if (suggestion.coordinates) {
      const { lat, lon } = suggestion.coordinates;
      const check = checkAddressServiceability(lat, lon);

      if (!check.serviceable) {
        const msg = check.error || "Sorry, we do not service this area.";
        setLocalError(msg);
        if (setExternalError) setExternalError(msg);
        if (onValidityChange) onValidityChange(false);
        if (onOutOfAreaFeeChange) onOutOfAreaFeeChange(0);
      } else {
        setLocalError(null);
        if (setExternalError) setExternalError(null);
        if (onValidityChange) onValidityChange(true);
        if (onOutOfAreaFeeChange) onOutOfAreaFeeChange(check.outsideAreaFee || 0);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    setInputFocused(true);
    if (localError) {
      setLocalError(null);
      if (setExternalError) setExternalError(null);
    }
    if (onValidityChange) onValidityChange(e.target.value.trim().length >= 10);
  };

  const handleInputFocus = () => {
    setInputFocused(true);
    if (suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <div className="relative group">
        <MapPin className={`absolute left-3 top-3 w-4 h-4 transition-colors z-10 ${localError ? "text-red-500" : "text-gray-400 group-focus-within:text-primary"}`} />
        <input
          ref={inputRef}
          type="text"
          autoComplete="street-address"
          className={`w-full pl-10 ${showLocationButton ? 'pr-12' : 'pr-4'} py-2.5 bg-gray-50 rounded-xl outline-none border-2 transition-all text-sm ${inputClassName} ${localError
            ? "border-red-300 focus:border-red-500 text-red-900 placeholder:text-red-300"
            : "border-transparent focus:border-primary focus:bg-white hover:border-gray-200"
            }`}
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
        />
        {showLocationButton && (
          <button
            onClick={onLocationClick}
            disabled={isLoadingLocation}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors disabled:opacity-50"
            title="Use my location"
          >
            {isLoadingLocation ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <MapPin className="w-4 h-4" />
            )}
          </button>
        )}
      </div>

      {localError && (
        <p className="text-xs text-red-500 font-medium mt-1.5 px-1">{localError}</p>
      )}

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              className={`w-full text-left px-4 py-3 text-sm transition-colors flex items-center gap-3 ${index === selectedIndex
                ? "bg-orange-50 text-gray-900"
                : "text-gray-700 hover:bg-gray-50"
                }`}
              onMouseDown={(e) => {
                e.preventDefault();
                handleSelectSuggestion(suggestion);
              }}
            >
              <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <span className="truncate font-medium">{suggestion.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuoteRequestFlow;
