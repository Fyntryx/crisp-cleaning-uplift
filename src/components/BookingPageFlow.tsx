"use client";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { createPortal } from "react-dom";
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
  checkAddressServiceability,
  type AddressSuggestion
} from "@/utils/geolocation";
import { ConditionQuiz } from "./ConditionQuiz";

const servicesList = [
  {
    id: "residential",
    icon: Home,
    title: "Residential",
    description:
      "Bring a breath of fresh air and elevate your living spaces with our residential cleaning services.",
  },
  {
    id: "commercial",
    icon: Building2,
    title: "Commercial",
    description:
      "Our commercial cleaning services are tailored to meet the unique demands of offices, schools, and gyms.",
  },
];

const cleaningTypesUI = [
  {
    id: "Standard",
    label: "Standard Clean",
    icon: Sparkles,
    color: "text-[#FB8C42]",
    bg: "bg-orange-50",
  },
  {
    id: "Deep",
    label: "Deep Clean",
    icon: SprayCan,
    color: "text-rose-500",
    bg: "bg-rose-50",
  },
  {
    id: "Vacate",
    label: "Vacate Clean",
    icon: DoorOpen,
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    id: "Hourly",
    label: "Hourly Rate",
    icon: Clock,
    color: "text-[#F5B041]",
    bg: "bg-amber-50",
  },
];

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

const BookingSummaryCard = ({
  className = "",
  formData,
  pricingConfig,
  pricingResult,
  promoCode,
  setPromoCode,
  isValidatingPromo,
  setIsValidatingPromo,
  appliedPromo,
  setAppliedPromo,
  appliedReferral,
  setAppliedReferral,
  apiBaseUrl,
  outOfAreaFee = 0,
  currentStep = 1,
}: {
  className?: string;
  formData: any;
  pricingConfig: PricingConfig | undefined;
  pricingResult: PricingResponse | null;
  promoCode: string;
  setPromoCode: (val: string) => void;
  isValidatingPromo: boolean;
  setIsValidatingPromo: (val: boolean) => void;
  appliedPromo?: { code: string; type: string; value: number; isStackable?: boolean; referralType?: string; category?: string };
  setAppliedPromo: (val: any) => void;
  appliedReferral?: { code: string; type: string; value: number; referralType?: string; category?: string };
  setAppliedReferral: (val: any) => void;
  apiBaseUrl: string;
  outOfAreaFee?: number;
  currentStep?: number;
}) => (
  <div
    className={`bg-cream px-6 py-[calc(1.625*var(--scale-unit))] gap-2.5 text-[calc(0.78125*var(--scale-unit))] relative overflow-visible border-l border-[#f2eadf] ${className}`}
  >
    <div className="mb-6 relative z-10 flex flex-col items-start gap-2">
      <div className="w-full mb-3">
        <h2 className="text-[11px] font-[700] text-[#8d8378] tracking-[0.1em] uppercase">
          BOOKING SUMMARY
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
          if (formData.frequency === "Weekly") badges.push(`${pricingConfig?.frequencyDiscounts?.Weekly ?? 15}% OFF LOCKED IN`);
          else if (formData.frequency === "Fortnightly") badges.push(`${pricingConfig?.frequencyDiscounts?.Fortnightly ?? 10}% OFF LOCKED IN`);
          else if (formData.frequency === "Monthly") badges.push(`${pricingConfig?.frequencyDiscounts?.Monthly ?? 5}% OFF LOCKED IN`);
          
          if (formData.cleaningType === "Vacate") badges.push("BOND BACK GUARANTEE");
          
          if (appliedPromo) {
            badges.push(
              <span key="promo" className="flex items-center gap-1">
                {appliedPromo.code} APPLIED
                <button onClick={() => setAppliedPromo(undefined)} className="ml-0.5 text-[#e0731f] hover:text-red-500 font-bold text-[11px]" title="Remove promo code">✕</button>
              </span>
            );
          }

          return badges.map((badge, i) => (
            <div key={i} className="inline-flex items-center justify-center px-2.5 py-1 rounded-full bg-[#fff4ea] text-[#e0731f] text-[10px] font-bold tracking-wider uppercase border border-[#f6d3b3]/50">
              {badge}
            </div>
          ));
        })()}
      </div>
    </div>

    <div className="relative z-10 text-[calc(0.90625*var(--scale-unit))]">

      <div className="flex justify-between items-center py-3.5">
        <span className="text-[12.5px] font-medium text-[#8d8378]">Service Type</span>
        <span className="text-[12.5px] font-normal text-[#2b2523]">{formData.cleaningType || "Standard"} Clean</span>
      </div>

      {formData.selectedDate && formData.selectedTime && (
        <>
          <div className="flex justify-between items-center py-3.5 gap-4">
            <span className="text-[12.5px] font-medium text-[#8d8378] whitespace-nowrap">Date & Time</span>
            <span className="text-[12.5px] font-normal text-[#2b2523] text-right">
              {formData.selectedDate.toLocaleDateString("en-AU", { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} at {formData.selectedTime}
            </span>
          </div>
        </>
      )}

      <div className="flex justify-between items-center py-3.5 mb-2">
        <span className="text-[12.5px] font-medium text-[#8d8378]">Frequency</span>
        <span className="text-[12.5px] font-normal text-[#2b2523]">{formData.frequency || "One time"}</span>
      </div>

      <div className="pt-1">
        <span className="block mb-4 text-[calc(0.6875*var(--scale-unit))] font-semibold uppercase tracking-widest text-gray-400">
          BREAKDOWN
        </span>

        <div className="space-y-3">
          {pricingResult?.breakdown.cleaningType && (
            <div className="flex justify-between">
              <span className="text-[12.5px] font-medium text-[#8d8378]">
                {formData.cleaningType === 'Hourly' 
                  ? `${formData.hourlyDetails?.hours || 2} Hrs × ${formData.hourlyDetails?.cleaners || 1} Cleaner${(formData.hourlyDetails?.cleaners || 1) > 1 ? 's' : ''}` 
                  : `${pricingResult.breakdown.cleaningType.name} Clean Base`}
              </span>
              <span className="text-[12.5px] font-normal text-[#2b2523]">${pricingResult.breakdown.cleaningType.price.toFixed(2)}</span>
            </div>
          )}
          {(() => {
            if (formData.cleaningType === 'Hourly') return null;

            const mappedCleaningType = formData.cleaningType === "Standard" ? "Regular" : formData.cleaningType;
            const currentRoomPrices = pricingConfig?.roomPrices?.[mappedCleaningType] || pricingConfig?.roomPrices?.Regular || ROOM_PRICES.Regular;
            return (
              <>
                {(formData.homeDetails.bedrooms || 0) > 0 && (
                  <div className="flex justify-between">
                    <span className="text-[12.5px] font-medium text-[#8d8378]">{formData.homeDetails.bedrooms}x Bedroom</span>
                    <span className="text-[12.5px] font-normal text-[#2b2523]">
                      ${(currentRoomPrices.Bedroom * (formData.homeDetails.bedrooms || 0)).toFixed(2)}
                    </span>
                  </div>
                )}
                {(formData.homeDetails.bathrooms || 0) > 0 && (
                  <div className="flex justify-between">
                    <span className="text-[12.5px] font-medium text-[#8d8378]">{formData.homeDetails.bathrooms}x Bathroom</span>
                    <span className="text-[12.5px] font-normal text-[#2b2523]">
                      ${(currentRoomPrices.Bathroom * (formData.homeDetails.bathrooms || 0)).toFixed(2)}
                    </span>
                  </div>
                )}
                {(formData.homeDetails.kitchens || 0) > 0 && (
                  <div className="flex justify-between">
                    <span className="text-[12.5px] font-medium text-[#8d8378]">{formData.homeDetails.kitchens}x Kitchen</span>
                    <span className="text-[12.5px] font-normal text-[#2b2523]">
                      ${(currentRoomPrices.Kitchen * (formData.homeDetails.kitchens || 0)).toFixed(2)}
                    </span>
                  </div>
                )}
                {(formData.homeDetails.livingRooms || 0) > 0 && (
                  <div className="flex justify-between">
                    <span className="text-[12.5px] font-medium text-[#8d8378]">{formData.homeDetails.livingRooms}x Living & Dining</span>
                    <span className="text-[12.5px] font-normal text-[#2b2523]">
                      ${(currentRoomPrices.Living * (formData.homeDetails.livingRooms || 0)).toFixed(2)}
                    </span>
                  </div>
                )}
                {(formData.homeDetails.other || 0) > 0 && (
                  <div className="flex justify-between">
                    <span className="text-[12.5px] font-medium text-[#8d8378]">{formData.homeDetails.other}x Other Area</span>
                    <span className="text-[12.5px] font-normal text-[#2b2523]">
                      ${(currentRoomPrices.Other * (formData.homeDetails.other || 0)).toFixed(2)}
                    </span>
                  </div>
                )}
              </>
            );
          })()}
          {pricingResult?.breakdown.extras.items.map((e: any) => (
            <div key={e.name} className="flex justify-between">
              <span className="text-[12.5px] font-medium text-[#8d8378]">+ {e.count > 1 ? `${e.count}x ` : ''}{e.name}</span>
              <span className="text-[12.5px] font-normal text-[#2b2523]">${e.price}</span>
            </div>
          ))}
          {outOfAreaFee > 0 && (
             <div className="flex justify-between text-[calc(0.84375*var(--scale-unit))] font-medium text-amber-600 pt-1">
               <span>+ Travel Fee (Extended Area)</span>
               <span>A${outOfAreaFee.toFixed(2)}</span>
             </div>
          )}
          {(pricingResult?.largeServiceDiscountAmount ?? 0) > 0 && (
            <div className="flex justify-between text-[calc(0.84375*var(--scale-unit))] font-semibold text-[#FB8C42] pt-2 h-px bg-tan-soft border-0">
              <span>Large Service Discount</span>
              <span>-A${pricingResult!.largeServiceDiscountAmount!.toFixed(2)}</span>
            </div>
          )}

          {pricingResult?.discounts?.frequency && (
            <div className="flex justify-between text-[calc(0.84375*var(--scale-unit))] font-semibold text-[#FB8C42] pt-1">
              <span>Discount ({pricingResult?.discounts?.frequency?.name})</span>
              <span>-A${pricingResult?.discounts?.frequency?.amount?.toFixed(2)}</span>
            </div>
          )}

          {/* Referral Applied Confirmation */}
          {appliedReferral && (
            <div className="flex flex-col gap-0.5 pt-2 h-px bg-tan-soft border-0">
              <div className="flex justify-between text-[calc(0.84375*var(--scale-unit))] font-semibold text-[#FB8C42]">
                <span className="flex items-center gap-1.5">
                  ✓ {appliedReferral.referralType === 'CLEANER_REFERRAL' ? 'Cleaner Referral Applied' : 'Customer Referral Applied'}
                  <button onClick={() => setAppliedReferral(undefined)} className="ml-1 text-gray-400 hover:text-red-500 text-xs" title="Remove referral code">✕</button>
                </span>
              </div>
              <p className="text-[calc(0.6875*var(--scale-unit))] text-gray-400 font-medium">$10 credit will be emailed to you after booking</p>
            </div>
          )}

        </div>
      </div>



      {/* --- PROMO CODE SECTION --- */}
      <div className="py-1">
        <div className="relative flex items-center">
          <Tag className="absolute left-3.5 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Promo Code"
            className="w-full bg-white border border-gray-200 text-gray-800 text-xs rounded-xl py-3 pl-10 pr-20 focus:outline-none focus:border-[#FB8C42] focus:ring-1 focus:ring-[#FB8C42]/10 transition-all placeholder:text-gray-400 font-semibold"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
          />
          <button 
            type="button"
            disabled={isValidatingPromo || !promoCode.trim()}
            onClick={async (e) => {
              e.preventDefault();
              if (promoCode.trim()) {
                setIsValidatingPromo(true);
                try {
                  const res = await fetch(`${apiBaseUrl}/api/validate-promo`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                      code: promoCode,
                      frequency: formData.frequency || "One time"
                    }),
                  });
                  const data = await res.json();
                  if (data.valid) {
                    if (data.promo.category === 'REFERRAL') {
                      setAppliedReferral(data.promo);
                    } else {
                      setAppliedPromo(data.promo);
                    }
                    setPromoCode('');
                  } else {
                    alert(data.error || 'Invalid promo code');
                  }
                } catch (error) {
                  console.error('Error validating promo code:', error);
                  alert('Error validating promo code. Please try again.');
                } finally {
                  setIsValidatingPromo(false);
                }
              }
            }}
            className="absolute right-1.5 top-1.5 bottom-1.5 px-4 bg-[#FB8C42]/10 hover:bg-[#FB8C42] hover:text-white disabled:opacity-50 text-[#FB8C42] text-[calc(0.625*var(--scale-unit))] font-semibold uppercase tracking-wider rounded-lg transition-all"
          >
            {isValidatingPromo ? '...' : 'Apply'}
          </button>
        </div>
      </div>



      {/* Out of Area Fee Banner */}
      {outOfAreaFee > 0 && (
        <div className="flex items-start gap-2.5 p-3 bg-amber-50 border border-amber-200 rounded-xl my-2">
          <span className="text-amber-600 text-base mt-0.5">⚠️</span>
          <div>
            <p className="text-[calc(0.6875*var(--scale-unit))] font-bold text-amber-800 uppercase tracking-wide">Extended Service Area</p>
            <p className="text-[calc(0.6875*var(--scale-unit))] text-amber-700 leading-relaxed mt-0.5">
              Your address is outside our standard {pricingConfig?.serviceRadiusKm || 40}km radius. A one-time <strong>+A${outOfAreaFee.toFixed(0)}</strong> travel fee applies.
            </p>
          </div>
        </div>
      )}



      <div className="flex justify-between items-end pt-4">
        <span className="text-[12.5px] font-[600] text-[#2b2523] mb-1">Estimated total</span>
        <span className="text-[19px] font-[700] text-[#2b2523] tracking-tight leading-none">
          ${(pricingResult?.total || 0).toFixed(2)}
        </span>
      </div>

      <div className="mt-2 text-[10.5px] font-[400] text-[#8d8378] leading-[1.55]">
        {currentStep === 1 ? (
          <p>Your price updates live as you build your quote.</p>
        ) : formData.cleaningType === 'Hourly' ? (
          <p>Billed on time worked &mdash; this is your cap.</p>
        ) : (
          (pricingResult?.estimatedMinutes ?? 0) > 0 && (
            <p>Est. duration {formatEta(pricingResult!.estimatedMinutes)} &middot; fixed price once confirmed.</p>
          )
        )}
      </div>

      {formData.frequency &&
        formData.frequency !== "One time" && (
          <p className="text-[calc(0.625*var(--scale-unit))] text-gray-400 mt-2 leading-relaxed font-medium">
            You&apos;ll be charged this amount every{" "}
            {formData.frequency === "Weekly"
              ? "week"
              : formData.frequency === "Fortnightly"
                ? "fortnight"
                : formData.frequency === "Monthly"
                  ? "month"
                  : "period"}
            . Cancel anytime.
          </p>
        )}
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
        isInitiallyExpired.current = true; // prevent firing again
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

  if (timeLeft === null) return null; // Avoid hydration mismatch

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
    
    // If no timer or timer expired, start a fresh 10 minute timer
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
      - Booking reserved for {mins.toString().padStart(2, '0')}:{secs.toString().padStart(2, '0')}
    </span>
  );
};

const Services = ({ hiddenInline = false }: { hiddenInline?: boolean }) => {
  const [isFormVisible, setIsFormVisible] = useState(true);
  const formObserverRef = useRef<HTMLDivElement>(null);
  const formContentRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    serviceCategory: "residential",
    cleaningType: "" as any as CleaningType,
    homeDetails: { bedrooms: 0, bathrooms: 0, kitchens: 0, livingRooms: 0, other: 0 },
    hourlyDetails: { hours: 2, cleaners: 1 },
    extras: {} as Record<string, number>,
    condition: "Lived In" as "Lived In" | "Overdue" | "Heavy Build Up",
    frequency: "One time" as Frequency,
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
  const totalSteps = 7;

  const [currentStep, setCurrentStep] = useState(1);
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
    if (typeof window !== "undefined" && isModalOpen) {
      const isLeadCaptured = sessionStorage.getItem("crisp_lead_captured");
      if (isLeadCaptured === "true") {
        setDiscountClaimed(true);
        // Ensure appliedPromo isn't overwritten if already set by referral or something else,
        // but for this flow we assume WELCOME5 is applied.
        setAppliedPromo(prev => prev || { code: "WELCOME5", type: "PERCENT_OFF", value: 5, isStackable: false });
        
        setFormData(prev => ({
          ...prev,
          contact: {
            ...prev.contact,
            firstName: sessionStorage.getItem("crisp_lead_first_name") || prev.contact.firstName,
            email: sessionStorage.getItem("crisp_lead_email") || prev.contact.email,
            phone: sessionStorage.getItem("crisp_lead_phone") || prev.contact.phone,
          }
        }));
      }
    }
  }, [isModalOpen]);

  const prevStepRef = useRef(1);



  useEffect(() => {
    const handleUrlBooking = () => {
      if (typeof window !== "undefined") {
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
          else if (lowerService.includes("standard")) matchedType = "Standard";
          
          if (matchedType) {
            setFormData(prev => ({
              ...prev,
              cleaningType: matchedType,
              serviceCategory: "residential"
            }));
            setCurrentStep(2);
            setIsModalOpen(true);
            
            // Clear hash so it can be triggered again
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

    // Run on mount
    handleUrlBooking();

    // Run on hash change (fallback)
    window.addEventListener("hashchange", handleUrlBooking);

    // Intercept clicks on Next.js Links that point to #booking on the same page
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      if (link && link.href && link.href.includes('#booking')) {
        try {
          const url = new URL(link.href, window.location.origin);
          // Only intercept if the link is for the current page
          if (url.pathname === window.location.pathname || link.getAttribute('href')?.startsWith('#')) {
            e.preventDefault();
            
            // Extract service param
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
                // If not hiddenInline, we might just want to scroll to it
                document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
              }
            }
          }
        } catch (err) {
          // ignore invalid URLs
        }
      }
    };

    document.addEventListener("click", handleGlobalClick, true); // use capture phase to beat Next.js Link

    return () => {
      window.removeEventListener("hashchange", handleUrlBooking);
      document.removeEventListener("click", handleGlobalClick, true);
    };
  }, [hiddenInline]);

  // NEW: State for address validity
  const [isAddressValid, setIsAddressValid] = useState(true);

  const [viewDate, setViewDate] = useState(new Date());

  const [pricingResult, setPricingResult] = useState<PricingResponse | null>(
    null
  );
  const [isLoadingLoc, setIsLoadingLoc] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [showConditionQuiz, setShowConditionQuiz] = useState(false);
  const [isSubmittingDiscount, setIsSubmittingDiscount] = useState(false);
  const [discountError, setDiscountError] = useState<string | null>(null);
  const [pricingConfig, setPricingConfig] = useState<PricingConfig | undefined>(undefined);
  const [isLoadingConfig, setIsLoadingConfig] = useState(true);
  const [outOfAreaFee, setOutOfAreaFee] = useState(0); // $50 if outside standard radius, within service area

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
        fireEvent("service_selected");
        (window as any).dataLayer.push({
          event: "begin_checkout",
          service_type: formData.cleaningType,
          value: pricingResult?.total || 0
        });
      } else if (prevStepRef.current === 2 && currentStep === 3) {
        fireEvent("customise_complete");
      } else if (prevStepRef.current === 2 && currentStep === 4) {
        fireEvent("customise_complete");
      } else if (prevStepRef.current === 3 && currentStep === 4) {
        fireEvent("discount_step_complete");
      } else if (prevStepRef.current === 4 && currentStep === 5) {
        fireEvent("schedule_complete");
      } else if (prevStepRef.current === 5 && currentStep === 6) {
        fireEvent("details_complete");
      }
    }
    prevStepRef.current = currentStep;
  }, [currentStep, formData.serviceCategory, formData.cleaningType, pricingResult?.total]);

  const resetForm = () => {
    setFormData({
      serviceCategory: "residential",
      cleaningType: "" as any as CleaningType,
      homeDetails: { bedrooms: 0, bathrooms: 0, kitchens: 0, livingRooms: 0, other: 0 },
      hourlyDetails: { hours: 2, cleaners: 1 },
      extras: {} as Record<string, number>,
      condition: "Lived In" as "Lived In" | "Overdue" | "Heavy Build Up",
      frequency: "One time" as Frequency,
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



  // API Configuration
  const API_BASE_URL = (
    process.env.NEXT_PUBLIC_API_BASE_URL || "https://crisp-cleaning-app-seven.vercel.app"
  ).replace(/\/$/, "");

  useEffect(() => {
    setMounted(true);
    
    // Fetch dynamic pricing config
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

  // Add this to track if the form is in the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFormVisible(entry.isIntersecting);
      },
      { threshold: 0.1 } // Triggers when at least 10% of the form is visible
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
    if (!formData.frequency) return;

    try {
      const result = calculatePricing({
        cleaningType: formData.cleaningType,
        homeDetails: formData.homeDetails,
        hourlyDetails: formData.hourlyDetails,
        extras: formData.extras,
        frequency: formData.frequency,
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
  const isValidPhone = (phone: string) => /^\d{9,15}$/.test(phone.replace(/\D/g, ''));

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
        case 2: return !!formData.cleaningType;
        case 3: return !!formData.cleaningType && !!formData.condition;
        case 4:
          if (formData.cleaningType === "Hourly") return (formData.hourlyDetails?.hours || 0) > 0;
          return (
            (formData.homeDetails.bedrooms || 0) +
            (formData.homeDetails.bathrooms || 0) +
            (formData.homeDetails.kitchens || 0) +
            (formData.homeDetails.livingRooms || 0) +
            (formData.homeDetails.other || 0) > 0
          );
        case 5: return !!formData.selectedDate && !!formData.selectedTime;
        case 6: return true;
        case 7: return !!formData.contact.address;
        default: return false;
      }
    }
  };

  const handleDiscountSubmit = async () => {
    setIsSubmittingDiscount(true);
    setDiscountError(null);

    const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    const isValidPhone = (phone: string) => /^\d{9,15}$/.test(phone.replace(/\D/g, ''));

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

    let appliedPromoDetails = { code: 'WELCOME15', type: 'PERCENT_OFF', value: 15, source: 'default' };

    try {
      const res = await fetch(`${API_BASE_URL}/api/public/discount-promo`);
      if (!res.ok) throw new Error();
      appliedPromoDetails = await res.json();
    } catch {
      appliedPromoDetails = { code: 'WELCOME15', type: 'PERCENT_OFF', value: 15, source: 'default' };
    }

    const payload = {
      fullName: `${formData.contact.firstName} ${formData.contact.lastName}`.trim(),
      email: formData.contact.email,
      phone: formData.contact.phone,
      source: "Booking Flow Discount Step",
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
      await fetch(`${API_BASE_URL}/api/public/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error("Failed to submit lead (non-blocking)", err);
    }

    try {
      // Push to GTM dataLayer
      if (typeof window !== "undefined") {
        (window as any).dataLayer = (window as any).dataLayer || [];
        (window as any).dataLayer.push({
          event: "generate_lead",
          lead_source: "Booking Flow Discount Step",
          offer: appliedPromoDetails.code,
          offer_source: appliedPromoDetails.source
        });
        sessionStorage.setItem("crisp_lead_captured", "true");
      }

      setPromoCode(appliedPromoDetails.code);
      setAppliedPromo({ code: appliedPromoDetails.code, type: appliedPromoDetails.type as 'PERCENT_OFF' | 'FIXED_CREDIT' | 'FREE_CLEAN' | 'REFERRAL', value: appliedPromoDetails.value, isStackable: false });
      setDiscountClaimed(true);
      
      setSubmitError(null);
      setSubmitSuccess(null);
      setCurrentStep(2);
    } catch (err) {
      console.error("Failed to process discount", err);
      setDiscountError("Failed to claim discount. Please try again.");
    } finally {
      setIsSubmittingDiscount(false);
    }
  };

  const handleNext = () => {
    if (currentStep === 1 && !isCommercial) {
      handleDiscountSubmit();
      return;
    }

    if (isStepValid() && currentStep < totalSteps) {
      setSubmitError(null); 
      setSubmitSuccess(null); 
      
      if (currentStep === 2 && !isCommercial && formData.cleaningType === "Hourly") {
        setCurrentStep(4); // Skip Step 3 (Service & Condition)
      } else {
        setCurrentStep((prev) => prev + 1);
      }
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
    if (currentStep > 1) {
      setSubmitError(null); 
      setSubmitSuccess(null); 
      
      if (currentStep === 4 && !isCommercial && formData.cleaningType === "Hourly") {
        setCurrentStep(2); // Skip back over Step 3
      } else {
        setCurrentStep((prev) => prev - 1);
      }
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

      // Also validate this location since it was auto-detected
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

  // Transform residential form data to API format
  const transformResidentialFormDataToAPI = () => {
    if (!formData.selectedDate || !formData.selectedTime) {
      throw new Error("Date and time are required");
    }

    // Parse time string (e.g., "08:00 AM") and combine with date
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

    // Map frequency
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
      firstName: formData.contact.firstName,
      lastName: formData.contact.lastName,
      email: formData.contact.email,
      password: formData.contact.password,
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
      hourlyHours: formData.hourlyDetails?.hours || 2,
      hourlyCleaners: formData.hourlyDetails?.cleaners || 1,
      condition: formData.condition === "Overdue" ? "Lived In" : formData.condition,
      addons: addonsPayload,
      entryInstructions: formData.instructions.entry || "",
      parkingInstructions: formData.instructions.parking || "",
      petsInstructions: formData.instructions.pets || "",
      preferredChemicals: formData.instructions.chemicals || "",
      notes: formData.instructions.notes || "",
      referralCode: appliedReferral?.code || undefined,
      promoCode: appliedPromo?.code || promoCode || undefined,
      outOfAreaFee: outOfAreaFee || 0,
      estimatedMinutes: pricingResult?.estimatedMinutes || 0,
    };
  };

  // Transform commercial form data to API format
  const transformCommercialFormDataToAPI = () => {
    // Map commercial frequency to API frequency
    const frequencyMap: Record<string, "OneTime" | "Weekly" | "Fortnightly" | "Monthly"> = {
      Daily: "OneTime",
      Weekly: "Weekly",
      "Bi-weekly": "Fortnightly",
      Monthly: "Monthly",
      "One-time": "OneTime",
      Custom: "OneTime",
    };

    const apiFrequency = frequencyMap[formData.commercial.frequency] || "OneTime";

    // Default booking date to 7 days from now
    const bookingDate = new Date();
    bookingDate.setDate(bookingDate.getDate() + 7);
    bookingDate.setHours(9, 0, 0, 0); // Default to 9 AM

    return {
      firstName: formData.contact.firstName,
      lastName: formData.contact.lastName || "",
      email: formData.contact.email,
      phone: formData.contact.phone,
      address: formData.contact.address,
      bookingDate: bookingDate.toISOString(),
      frequency: apiFrequency,
      // Commercial-specific fields
      businessName: formData.commercial.businessName,
      businessSize: formData.commercial.businessSize,
      environment: formData.commercial.environment,
      cleanType: formData.commercial.cleanType,
      days: formData.commercial.days || [],
      insuranceRequired: formData.commercial.insuranceRequired || false,
      budget: formData.commercial.budget,
    };
  };

  // Unified submission handler
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(null);

    try {
      // Validate required fields and formats
      if (!formData.contact.firstName || !formData.contact.email || !formData.contact.phone || !formData.contact.address) {
        setSubmitError("Please fill in all required fields.");
        setIsSubmitting(false);
        return;
      }
      
      const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
      const isValidPhone = (phone: string) => /^\d{9,15}$/.test(phone.replace(/\D/g, ''));

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

      // Check address validity before submitting
      if (!isAddressValid) {
        setSubmitError("We do not service this location. Please check your address.");
        setIsSubmitting(false);
        return;
      }

      // Password is required only for residential bookings
      if (!isCommercial) {
        if (!formData.contact.password || formData.contact.password.length < 8) {
          setSubmitError("Password is required and must be at least 8 characters.");
          setIsSubmitting(false);
          return;
        }
      }

      // Transform form data based on booking type
      const payload = isCommercial
        ? transformCommercialFormDataToAPI()
        : transformResidentialFormDataToAPI();

      // Make API request to appropriate endpoint
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
          "Failed to create booking. Please try again.";
        setSubmitError(errorMessage);
        setIsSubmitting(false);
        return;
      }

      // Handle commercial bookings (no payment, just store data)
      if (isCommercial) {
        if (typeof window !== "undefined") {
          (window as any).dataLayer = (window as any).dataLayer || [];
          (window as any).dataLayer.push({
            event: "commercial_booking_submitted",
            service_type: formData.commercial.cleanType
          });
        }
        setSubmitSuccess(
          "Thank you for your commercial booking request! We'll contact you soon to discuss your cleaning needs."
        );
        setIsSubmitting(false);
        return;
      }

      // Handle residential bookings
      if (result.requiresVerification) {
        setSubmitSuccess(result.message || "Account created! Please check your email to verify your account.");
        setIsSubmitting(false);
        return;
      }

      if (result.checkoutUrl) {
        // Push to GTM dataLayer
        if (typeof window !== "undefined") {
          (window as any).dataLayer = (window as any).dataLayer || [];
          (window as any).dataLayer.push({
            event: "booking_confirmed",
            service_type: formData.cleaningType,
            value: pricingResult?.total || 0
          });
        }
        window.location.href = result.checkoutUrl;
      } else {
        setSubmitError("No checkout URL received. Please contact support.");
        setIsSubmitting(false);
      }
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

    const renderStep1 = () => {
    const isFlatRate = formData.cleaningType !== 'Hourly' && !!formData.cleaningType;
    const isHourly = formData.cleaningType === 'Hourly';

    return (
      <div className="max-w-3xl mx-auto w-full flex flex-col gap-6 animate-in fade-in duration-500 py-2">
        <div className="mb-2">
          <h2 className="text-[calc(1.375*var(--scale-unit))] font-semibold text-gray-900 tracking-tight leading-tight">
            How would you like to be priced?
          </h2>
          <p className="text-gray-500 text-[calc(0.8125*var(--scale-unit))] font-normal mt-1">
            Most whole-home cleans choose flat rate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl">
          {/* Flat Rate Card */}
          <div
            onClick={() => setFormData({ ...formData, cleaningType: 'Standard' })}
            className={`relative border-2 rounded-[20px] p-5 cursor-pointer transition-all duration-300 flex flex-col h-full ${
              isFlatRate
                ? "border-[#FB8C42] bg-[#FFF8F3] shadow-[0_15px_30px_rgba(249,115,22,0.06)] scale-[1.01]"
                : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
            }`}
          >
            <span className="absolute -top-2.5 left-6 bg-[#FB8C42] text-white text-[calc(0.59375*var(--scale-unit))] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full shadow-md z-10">
              MOST POPULAR — BEST VALUE
            </span>
            <div className="mt-1">
              <h3 className="text-[calc(1.0625*var(--scale-unit))] font-semibold text-gray-900 mb-1.5">Flat Rate</h3>
              <p className="text-[calc(0.8125*var(--scale-unit))] font-normal text-gray-600 leading-relaxed mb-4">
                A fixed price for a complete result. Define the size and condition, and we'll stay as long as it takes to leave your space shining.
              </p>
              
              <ul className="space-y-1.5 mb-5">
                <li className="flex items-start gap-2.5 text-[calc(0.78125*var(--scale-unit))] text-gray-700 font-medium">
                  <Check className="w-5 h-5 text-[#FB8C42] shrink-0" strokeWidth={3} />
                  Pay for the result, not the time
                </li>
                <li className="flex items-start gap-2.5 text-[calc(0.78125*var(--scale-unit))] text-gray-700 font-medium">
                  <Check className="w-5 h-5 text-[#FB8C42] shrink-0" strokeWidth={3} />
                  No time limit
                </li>
                <li className="flex items-start gap-2.5 text-[calc(0.78125*var(--scale-unit))] text-gray-700 font-medium">
                  <Check className="w-5 h-5 text-[#FB8C42] shrink-0" strokeWidth={3} />
                  Defined checklist so you know exactly what you're paying for
                </li>
              </ul>
            </div>
            
            <div className="mt-auto pt-6">
              {isFlatRate ? (
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="w-full px-[calc(1.5*var(--scale-unit))] py-[calc(0.6875*var(--scale-unit))] rounded-full bg-[#FB8C42] hover:bg-[#FB8C42]/90 text-white font-semibold text-[calc(0.84375*var(--scale-unit))] whitespace-nowrap shadow-lg shadow-[#FB8C42]/20 transition-colors flex items-center justify-center gap-2"
                >
                  Continue with Flat Rate <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button className="w-full px-[calc(1.5*var(--scale-unit))] py-[calc(0.6875*var(--scale-unit))] rounded-full border-[1.5px] border-gray-200 text-gray-700 font-semibold text-[calc(0.84375*var(--scale-unit))] whitespace-nowrap hover:border-gray-300 hover:bg-gray-50 transition-colors">
                  Select Flat Rate
                </button>
              )}
            </div>
          </div>

          {/* Hourly Card */}
          <div
            onClick={() => setFormData({ ...formData, cleaningType: 'Hourly' })}
            className={`relative border-2 rounded-[20px] p-5 cursor-pointer transition-all duration-300 flex flex-col h-full ${
              isHourly
                  ? "border-[#FB8C42] bg-[#FFF8F3] shadow-[0_15px_30px_rgba(249,115,22,0.06)] scale-[1.01]"
                  : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
            }`}
          >
            {isHourly && (
              <span className="absolute -top-2.5 left-6 bg-orange-100 text-[#FB8C42] text-[calc(0.59375*var(--scale-unit))] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full shadow-sm z-10 border border-orange-200">
                SELECTED
              </span>
            )}
            <div className="mt-1">
              <h3 className="text-[calc(1.0625*var(--scale-unit))] font-semibold text-gray-900 mb-1.5">Hourly</h3>
              <p className="text-[calc(0.8125*var(--scale-unit))] font-normal text-gray-600 leading-relaxed mb-4">
                For specific tasks or targeted areas. You set the priorities and we'll make sure to make the most of each minute!
              </p>
              
              <ul className="space-y-1.5 mb-5">
                <li className="flex items-start gap-2.5 text-[calc(0.78125*var(--scale-unit))] text-gray-700 font-medium">
                  <Check className="w-5 h-5 text-[#FB8C42] shrink-0" strokeWidth={3} />
                  You cap the budget in hours
                </li>
                <li className="flex items-start gap-2.5 text-[calc(0.78125*var(--scale-unit))] text-gray-700 font-medium">
                  <Check className="w-5 h-5 text-[#FB8C42] shrink-0" strokeWidth={3} />
                  We work your priority list top-down
                </li>
                <li className="flex items-start gap-2.5 text-[calc(0.78125*var(--scale-unit))] text-gray-700 font-medium">
                  <span className="w-5 h-5 flex items-center justify-center shrink-0">
                    <span className="w-3.5 h-0.5 bg-gray-400 rounded-full"></span>
                  </span>
                  Result depends on hours booked
                </li>
              </ul>
            </div>

            <div className="mt-auto pt-6">
              {isHourly ? (
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="w-full px-[calc(1.5*var(--scale-unit))] py-[calc(0.6875*var(--scale-unit))] rounded-full bg-[#FB8C42] hover:bg-[#FB8C42]/90 text-white font-semibold text-[calc(0.84375*var(--scale-unit))] whitespace-nowrap shadow-lg shadow-[#FB8C42]/20 transition-colors flex items-center justify-center gap-2"
                >
                  Continue with Hourly <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button className="w-full px-[calc(1.5*var(--scale-unit))] py-[calc(0.6875*var(--scale-unit))] rounded-full border-[1.5px] border-gray-200 text-gray-700 font-semibold text-[calc(0.84375*var(--scale-unit))] whitespace-nowrap hover:border-gray-300 hover:bg-gray-50 transition-colors">
                  Select Hourly
                </button>
              )}
            </div>
          </div>
        </div>

        {isHourly && (
          <div className="max-w-3xl w-full bg-[#FFF4CC] border border-[#FFD966] rounded-xl p-3.5 flex flex-col gap-2 text-[#B38600] shadow-sm animate-in slide-in-from-bottom-2 duration-300 mt-2">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-[#E6A800] shrink-0 mt-0.5" strokeWidth={2.5} />
              <div className="text-[calc(0.78125*var(--scale-unit))] font-normal leading-[1.5]">
                Hourly is built for specific tasks or targeted areas — the best option if you're only after cleaning here and there. You set the priorities and we'll make the most of each minute! If you're looking to get entire rooms or the whole house treated, <span className="font-bold text-[#997300]">flat rate is the most cost-effective option — pay for the result, not the time.</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

const renderResStep2 = () => {
    // Custom description matching selected plan
    const getPlanDescription = () => {
      if (formData.cleaningType === "Deep") {
        return "Complete detailed scrub of every corner of your home, walls & details. Designed to restore freshness to neglected spaces.";
      }
      if (formData.cleaningType === "Vacate") {
        return "Cleaned to rental inspection standards. End of lease specialized service with bond-back assurance checklist.";
      }
      if (formData.cleaningType === "Hourly") {
        return "Built for specific tasks or targeted areas — you set the priorities and we'll make the most of each minute!";
      }
      return "Maintenance clean on your schedule — same cleaner every visit. Defined room-by-room checklist covering general areas, floors, bedrooms, bathroom and kitchen.";
    };

    const getPlanIcon = () => {
      if (formData.cleaningType === "Deep") return Sparkles;
      if (formData.cleaningType === "Vacate") return DoorOpen;
      return Home;
    };

    const SelectedIcon = getPlanIcon();

    return (
      <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-right duration-500 min-h-full flex flex-col justify-start py-2">
        <div className="flex flex-col space-y-4">

          {/* MIDDLE ROW: Selectors */}
          {formData.cleaningType === 'Hourly' ? (
            <div className="flex flex-col gap-6">
              {/* Header */}
              <div>
                <h3 className="text-[calc(1.375*var(--scale-unit))] font-semibold text-gray-900 mb-1">Build your hourly booking</h3>
                <p className="text-[calc(0.8125*var(--scale-unit))] font-normal text-gray-500">We work your priority list top-down and stop at the time cap.</p>
              </div>

              {/* 2-Column Grid for Controls and Notes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
                {/* Left Column: Controls Container */}
                <div className="border-[1.5px] border-tan rounded-2xl p-[calc(1.125*var(--scale-unit))] flex flex-col justify-between bg-white hover:border-gray-300 transition-all shadow-sm">
                  <div className="flex flex-col space-y-4">
                    {/* Hours */}
                    <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                      <span className="text-[calc(0.875*var(--scale-unit))] font-semibold text-gray-800">Hours</span>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            const val = Math.max(2, (formData.hourlyDetails?.hours || 2) - 0.5);
                            setFormData(prev => ({ ...prev, hourlyDetails: { ...prev.hourlyDetails, hours: val, cleaners: prev.hourlyDetails?.cleaners || 1 } }));
                          }}
                          disabled={(formData.hourlyDetails?.hours || 2) <= 2}
                          className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:text-[#FB8C42] hover:border-[#FB8C42] transition-colors disabled:opacity-50 disabled:hover:border-gray-200 disabled:hover:text-gray-600 bg-white"
                        >
                          <Minus strokeWidth={2.5} size={14} />
                        </button>
                        <span className="text-[calc(0.875*var(--scale-unit))] font-semibold text-gray-900 w-6 text-center">
                          {formData.hourlyDetails?.hours || 2}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            const val = (formData.hourlyDetails?.hours || 2) + 0.5;
                            setFormData(prev => ({ ...prev, hourlyDetails: { ...prev.hourlyDetails, hours: val, cleaners: prev.hourlyDetails?.cleaners || 1 } }));
                          }}
                          className="w-8 h-8 rounded-full border border-[#FB8C42] flex items-center justify-center text-[#FB8C42] hover:bg-orange-50 transition-colors bg-white"
                        >
                          <Plus strokeWidth={2.5} size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Cleaners */}
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[calc(0.875*var(--scale-unit))] font-semibold text-gray-800">Cleaners</span>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            const val = Math.max(1, (formData.hourlyDetails?.cleaners || 1) - 1);
                            setFormData(prev => ({ ...prev, hourlyDetails: { ...prev.hourlyDetails, cleaners: val, hours: prev.hourlyDetails?.hours || 2 } }));
                          }}
                          disabled={(formData.hourlyDetails?.cleaners || 1) <= 1}
                          className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:text-[#FB8C42] hover:border-[#FB8C42] transition-colors disabled:opacity-50 disabled:hover:border-gray-200 disabled:hover:text-gray-600 bg-white"
                        >
                          <Minus strokeWidth={2.5} size={14} />
                        </button>
                        <span className="text-[calc(0.875*var(--scale-unit))] font-semibold text-gray-900 w-6 text-center">
                          {formData.hourlyDetails?.cleaners || 1}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            const val = (formData.hourlyDetails?.cleaners || 1) + 1;
                            setFormData(prev => ({ ...prev, hourlyDetails: { ...prev.hourlyDetails, cleaners: val, hours: prev.hourlyDetails?.hours || 2 } }));
                          }}
                          className="w-8 h-8 rounded-full border border-[#FB8C42] flex items-center justify-center text-[#FB8C42] hover:bg-orange-50 transition-colors bg-white"
                        >
                          <Plus strokeWidth={2.5} size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Rate Bottom Label */}
                  <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-center">
                    <span className="text-[calc(0.75*var(--scale-unit))] font-bold text-[#8A6D3B]">
                      Rate: ${pricingConfig?.hourlyRatePerHalfHour ? pricingConfig.hourlyRatePerHalfHour * 2 : 55}/hour/cleaner
                    </span>
                  </div>
                </div>

                {/* Right Column: Priorities Notes */}
                <div className="flex flex-col h-full">
                  <span className="block text-[calc(0.625*var(--scale-unit))] font-semibold text-ink-soft tracking-[0.09em] uppercase mb-2">
                    WHAT SHOULD WE PRIORITISE?
                  </span>
                  <textarea
                    placeholder="e.g. kitchen first, then both bathrooms, then floors throughout..."
                    value={formData.instructions.notes}
                    onChange={(e) => setFormData({
                      ...formData,
                      instructions: { ...formData.instructions, notes: e.target.value }
                    })}
                    className="flex-1 w-full bg-white border-[1.5px] border-tan rounded-2xl p-4 text-[calc(0.875*var(--scale-unit))] text-ink placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all resize-none min-h-[120px]"
                  />
                </div>
              </div>

              {/* Bottom Info Box */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-100 border border-amber-200 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-amber-600" />
                </div>
                <div className="flex-1 text-[calc(0.75*var(--scale-unit))] text-amber-800 leading-relaxed opacity-90">
                  For specific tasks or targeted areas. You set the priorities and we&apos;ll make sure to make the most of each minute! Want whole rooms or the whole house? <button onClick={(e) => { e.preventDefault(); setFormData(prev => ({ ...prev, cleaningType: 'Standard' })); setCurrentStep(2); }} className="font-bold underline underline-offset-2 hover:text-[#8A6D3B] transition-colors inline">Switch to flat rate</button> — pay for the result not the time.
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h3 className="text-[calc(1.375*var(--scale-unit))] font-semibold text-gray-900 mb-1">Tell us about your home</h3>
                <p className="text-[calc(0.8125*var(--scale-unit))] font-normal text-gray-500 mb-4">Count every room we should clean.</p>
                <div className="bg-white rounded-[20px] border border-gray-100 flex flex-col shadow-sm">
                  
                  {/* 1. Living Areas */}
                  <div className="w-full border-b border-gray-100 last:border-0">
                    <RoomCounter
                      label="Living areas"
                      count={formData.homeDetails.livingRooms || 0}
                      onUpdate={(v: number) => updateRooms("livingRooms", v)}
                    />
                  </div>

                  {/* 2. Bedrooms */}
                  <div className="border-b border-gray-100 last:border-0">
                    <RoomCounter
                      label="Bedrooms"
                      count={formData.homeDetails.bedrooms || 0}
                      onUpdate={(v) => updateRooms("bedrooms", v)}
                    />
                  </div>

                  {/* 3. Bathrooms */}
                  <div className="border-b border-gray-100 last:border-0">
                    <RoomCounter
                      label="Bathrooms"
                      count={formData.homeDetails.bathrooms || 0}
                      onUpdate={(v) => updateRooms("bathrooms", v)}
                    />
                  </div>

                  {/* 4. Kitchens */}
                  <div className="border-b border-gray-100 last:border-0">
                    <RoomCounter
                      label="Kitchens"
                      count={formData.homeDetails.kitchens || 0}
                      onUpdate={(v) => updateRooms("kitchens", v)}
                    />
                  </div>

                  {/* 5. Other */}
                  <div className="border-b border-gray-100 last:border-0">
                    <RoomCounter
                      label={
                        <span>
                          Other <span className="text-gray-400 text-[calc(0.71875*var(--scale-unit))] font-normal ml-1">(study, laundry, office...)</span>
                        </span>
                      }
                      count={formData.homeDetails.other || 0}
                      onUpdate={(v) => updateRooms("other", v)}
                    />
                  </div>

                </div>
              </div>

              {/* BOTTOM ROW: Full-width Add-ons */}
              <div className="mt-6">
                <span className="block text-[calc(0.625*var(--scale-unit))] font-semibold uppercase text-ink-soft tracking-widest mb-4 border-b border-gray-50 pb-2">
                  ADD-ONS
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {isLoadingConfig ? (
                    <div className="text-xs text-gray-400 py-2 col-span-3">Loading available add-ons...</div>
                  ) : (Object.keys(pricingConfig?.extraPrices || EXTRA_PRICES) as Extra[])
                    .map((extra) => {
                      const count = formData.extras?.[extra] || 0;
                      const isSelected = count > 0;
                      const isCounterAddon = extra === 'Windows' || extra === 'Walls';
                      const price = (pricingConfig?.extraPrices || EXTRA_PRICES)[extra] || 0;

                      return (
                        <div
                          key={extra}
                          onClick={() => {
                            if (isCounterAddon && !isSelected) updateExtraCount(extra, 1);
                            else if (!isCounterAddon) toggleExtra(extra);
                          }}
                          className={`relative flex flex-wrap items-center justify-between gap-y-1 gap-x-1.5 px-3 py-2.5 rounded-[12px] border transition-all cursor-pointer ${
                            isSelected 
                              ? "border-[#FB8C42] bg-[#FFF8F3]" 
                              : "border-gray-200 bg-white hover:border-[#FB8C42]/50 hover:bg-orange-50/30"
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            {/* Checkmark for non-counter add-ons */}
                            {!isCounterAddon && (
                              <div className={`w-4 h-4 rounded-[4px] border-[1.5px] flex items-center justify-center shrink-0 transition-colors ${isSelected ? "border-[#FB8C42] bg-[#FB8C42]" : "border-gray-300 bg-white"}`}>
                                {isSelected && <Check className="w-3 h-3 text-white" strokeWidth={3.5} />}
                              </div>
                            )}
                            
                            {/* Plus button for unselected counter add-ons */}
                            {isCounterAddon && !isSelected && (
                              <button
                                type="button"
                                onClick={(e) => { e.stopPropagation(); updateExtraCount(extra, 1); }}
                                className="w-4 h-4 rounded-[4px] border-[1.5px] border-gray-300 bg-white flex items-center justify-center text-gray-500 hover:border-[#FB8C42] hover:text-[#FB8C42] transition-colors shrink-0"
                              >
                                <Plus className="w-3 h-3" strokeWidth={3} />
                              </button>
                            )}

                            {/* Small check icon for selected counter add-ons */}
                            {isCounterAddon && isSelected && (
                              <div className="w-4 h-4 rounded-[4px] border-[1.5px] border-[#FB8C42] bg-[#FB8C42] flex items-center justify-center shrink-0">
                                <Check className="w-3 h-3 text-white" strokeWidth={3.5} />
                              </div>
                            )}

                            <span className={`text-[calc(0.78125*var(--scale-unit))] leading-none mt-[1px] truncate ${isSelected ? "font-semibold text-gray-900" : "font-medium text-gray-700"}`}>
                              {extra}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            {/* Counter Controls */}
                            {isCounterAddon && isSelected && (
                              <div className="flex items-center gap-1 bg-white rounded-[6px] px-1 py-0.5 shadow-sm border border-[#FB8C42]/30">
                                <button
                                  type="button"
                                  onClick={(e) => { e.stopPropagation(); updateExtraCount(extra, Math.max(0, count - 1)); }}
                                  className="w-4 h-4 rounded bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-[#FB8C42] hover:text-white transition-colors"
                                >
                                  <Minus className="w-2.5 h-2.5" strokeWidth={3} />
                                </button>
                                <span className="text-[calc(0.75*var(--scale-unit))] font-semibold w-2.5 text-center text-ink">{count}</span>
                                <button
                                  type="button"
                                  onClick={(e) => { e.stopPropagation(); updateExtraCount(extra, count + 1); }}
                                  className="w-4 h-4 rounded bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-[#FB8C42] hover:text-white transition-colors"
                                >
                                  <Plus className="w-2.5 h-2.5" strokeWidth={3} />
                                </button>
                              </div>
                            )}

                            <span className="text-[calc(0.75*var(--scale-unit))] text-gray-500 font-medium">
                              {price ? `+$${price}${isCounterAddon ? '/rm' : ''}` : 'Free'}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </>
          )}

        </div>
      </div>
    );
  };

  const renderResStepDiscount = () => {
    return (
      <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-right duration-500 flex flex-col justify-start">
        <div className="flex flex-col items-start text-left space-y-6">
          <div className="flex flex-col items-start gap-3">
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

          <div className="w-full max-w-[calc(28.75*var(--scale-unit))] space-y-5">
            <div className="flex flex-col space-y-2">
              <label className="text-[calc(0.625*var(--scale-unit))] font-semibold uppercase text-ink-soft tracking-[0.09em]">FIRST NAME</label>
              <input
                type="text"
                placeholder="First name"
                className="w-full px-[calc(0.875*var(--scale-unit))] py-[calc(0.75*var(--scale-unit))] bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#FB8C42]/10 text-stone-900 font-normal text-[calc(0.90625*var(--scale-unit))] shadow-sm transition-all"
                value={`${formData.contact.firstName || ""} ${formData.contact.lastName || ""}`.trim()}
                onChange={(e) => {
                  const val = e.target.value;
                  const parts = val.trimStart().split(/\s+/);
                  updateContact("firstName", parts[0] || "");
                  updateContact("lastName", parts.slice(1).join(" "));
                }}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-[calc(0.625*var(--scale-unit))] font-semibold uppercase text-ink-soft tracking-[0.09em]">MOBILE</label>
              <input
                type="tel"
                placeholder="04XX XXX XXX"
                className="w-full px-[calc(0.875*var(--scale-unit))] py-[calc(0.75*var(--scale-unit))] bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#FB8C42]/10 text-stone-900 font-normal text-[calc(0.90625*var(--scale-unit))] shadow-sm transition-all"
                value={formData.contact.phone}
                onChange={(e) => updateContact("phone", e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-[calc(0.625*var(--scale-unit))] font-semibold uppercase text-ink-soft tracking-[0.09em]">EMAIL</label>
              <input
                type="email"
                placeholder="you@email.com"
                className="w-full px-[calc(0.875*var(--scale-unit))] py-[calc(0.75*var(--scale-unit))] bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#FB8C42]/10 text-stone-900 font-normal text-[calc(0.90625*var(--scale-unit))] shadow-sm transition-all"
                value={formData.contact.email}
                onChange={(e) => updateContact("email", e.target.value)}
              />
            </div>

            {discountError && (
              <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-semibold">
                {discountError}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderConditionAssessmentStep = () => {
    const isHourly = formData.cleaningType === 'Hourly';

    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col h-full w-full max-w-3xl mx-auto">
        <div className="mb-8">
          <h2 className="text-[calc(1.375*var(--scale-unit))] font-semibold text-gray-900 tracking-tight leading-tight">
            What type of clean — and how is the home tracking?
          </h2>
          <p className="text-gray-500 mt-2 text-[calc(0.8125*var(--scale-unit))] font-normal">Both together set your fixed price.</p>
        </div>

        {/* Top section: Service Types */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10 mt-6">
          {[
            { id: 'Standard', label: 'Standard', desc: 'Maintain cleanliness, remove visible dirt, restore order, and leave the home fresh.' },
            { id: 'Deep', label: 'Deep', desc: 'High-detail clean to remove all dirt, grime, and build-up, with added attention to less frequently maintained areas.', badge: 'MOST BOOKED FIRST VISIT', badgeStyle: 'solid' },
            { id: 'Vacate', label: 'Vacate', desc: 'A full-scope, maximum-detail clean — built to meet rental inspection standards.', badge: 'BOND BACK GUARANTEE', badgeStyle: 'soft' }
          ].map((type, index) => {
            const isSelected = formData.cleaningType === type.id;

            return (
              <div 
                key={type.id}
                onClick={() => {
                  let newCondition = formData.condition;
                  if (type.id === 'Standard' && (newCondition === 'Overdue' || newCondition === 'Heavy Build Up')) {
                    newCondition = 'Lived In';
                  }
                  setFormData({ ...formData, cleaningType: type.id as any, condition: newCondition });
                }}
                className={`relative cursor-pointer px-[calc(1.125*var(--scale-unit))] py-[calc(1*var(--scale-unit))] transition-all duration-300 flex flex-col rounded-[20px] border-[1.5px] ${
                  isSelected 
                    ? 'border-[#FB8C42] bg-[#fffaf5] shadow-[0_0_0_3px_rgba(251,140,66,0.16)] z-10 scale-[1.02]' 
                    : 'border-[#ece1d3] bg-[#fff] hover:border-[#f6d3b3] hover:shadow-sm z-0'
                }`}
              >
                {type.badge && (
                  <div className={`absolute -top-3 left-1/2 -translate-x-1/2 text-[calc(0.5625*var(--scale-unit))] font-bold tracking-widest px-3 py-1 rounded-full uppercase whitespace-nowrap shadow-sm ${
                    type.badgeStyle === 'solid' ? 'bg-[#FB8C42] text-[#fff]' : 'bg-[#fff4ea] text-[#e0731f]'
                  }`}>
                    {type.badge}
                  </div>
                )}
                <h3 className="font-semibold text-[calc(1.0625*var(--scale-unit))] text-gray-900 mt-2">{type.label}</h3>
                <p className="text-[calc(0.8125*var(--scale-unit))] font-normal text-[#8d8378] leading-relaxed mt-1 mb-1">{type.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Bottom section: Condition */}
        <div className="grid grid-cols-1 md:grid-cols-[43%_57%] gap-6 mb-8">
          
          {/* Left Column: Condition Options */}
          <div>
            <h3 className="text-[calc(0.625*var(--scale-unit))] font-semibold text-ink-soft tracking-[0.09em] uppercase mb-1.5 mb-4">OVERALL CONDITION</h3>
            <div className="flex flex-col gap-3">
              {[
                { id: 'Lived In', label: 'Lived in', desc: 'Cleaned within the last ~6 weeks' },
                { id: 'Overdue', label: 'Overdue', desc: 'A few months since a proper clean' },
                { id: 'Heavy Build Up', label: 'Heavy build-up', badge: 'custom', desc: 'Long-neglected or post-reno' }
              ].map((cond) => {
                const isSelected = formData.condition === cond.id;
                const isDisabled = formData.cleaningType === 'Standard' && (cond.id === 'Overdue' || cond.id === 'Heavy Build Up');
                
                return (
                  <div 
                    key={cond.id}
                    onClick={() => {
                      if (!isDisabled) {
                        setFormData({ ...formData, condition: cond.id as any });
                      }
                    }}
                    className={`cursor-pointer rounded-2xl border-[1.5px] p-3 transition-all duration-200 flex flex-col ${
                      isDisabled 
                        ? 'opacity-50 cursor-not-allowed border-gray-100 bg-gray-50'
                        : isSelected 
                          ? 'border-[#FB8C42] bg-[#fffaf5] shadow-[0_0_0_3px_rgba(251,140,66,0.16)] z-10 scale-[1.02]' 
                          : 'border-[#ece1d3] bg-[#fff] hover:border-[#f6d3b3] hover:shadow-sm z-0'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[calc(0.84375*var(--scale-unit))] font-semibold text-gray-900">{cond.label}</span>
                      {cond.badge && (
                        <span className="text-[calc(0.6875*var(--scale-unit))] font-semibold text-[#e0731f] bg-[#fff4ea] px-2 py-0.5 rounded-full">
                          {cond.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-[calc(0.71875*var(--scale-unit))] font-normal text-[#8d8378]">{cond.desc}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Explainer Box */}
          <div>
             {showConditionQuiz ? (
               <div className="bg-white border border-[#FB8C42] rounded-2xl p-4 h-full flex flex-col shadow-sm relative overflow-hidden">
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
               <div className="bg-[#fdf9f3] border border-[#eadfce] rounded-2xl p-4 lg:p-5 h-full flex flex-col">
                  <h3 className="text-[calc(0.625*var(--scale-unit))] font-semibold text-ink-soft tracking-[0.09em] uppercase mb-1.5 mb-4">
                    WHAT '{formData.condition ? formData.condition.toUpperCase() : 'OVERDUE'}' LOOKS LIKE
                  </h3>
                  
                  <p className="text-[calc(0.78125*var(--scale-unit))] font-normal text-gray-600 leading-relaxed mb-8 flex-1">
                    {formData.condition === 'Lived In' 
                      ? "Lived-in — Everyday soil from normal living — everything comes up with a standard wipe, vacuum and mop, no scrubbing needed. Dust film on ledges and sills, fingerprints and light grease around the kitchen, water spots and light soap film in the bathroom, floors due for a vacuum and mop."
                      : formData.condition === 'Heavy Build Up'
                      ? "Heavy build-up — Widespread heavy build-up across multiple rooms — grime that needs scrapers or repeated dwell-and-scrub cycles. Scale you can feel on the shower glass, black or widely darkened grout, carbon layers on the stovetop, saturated rangehood filters, pet hair worked into fabric and edges — often accompanied by lingering odour."
                      : "Overdue — Established build-up in the usual hotspots — needs product dwell time and proper scrubbing, but comes up within a single treatment. Cloudy (but smooth) shower glass, dark spots along the silicone, a greasy stovetop with cooked-on spots, tacky cupboard handles, a visible dust layer on ledges and skirting, scattered pet hair."
                    }
                  </p>

                  <div className="border-t border-gray-200 pt-5 mt-8">
                    <div className="flex flex-col items-start gap-4">
                      <p className="text-sm text-[#8d8378] w-full text-justify">
                        <span className="font-bold text-gray-900">Not sure which fits?</span> Answer 8 quick questions (takes ~60 seconds) so your quote is accurate and there are no surprises on the day.
                      </p>
                      <button type="button" onClick={() => setShowConditionQuiz(true)} className="text-[calc(0.78125*var(--scale-unit))] font-semibold text-gray-900 bg-white border border-gray-200 rounded-full px-4 py-2 hover:bg-gray-50 transition-colors whitespace-nowrap w-full">Take the condition check →</button>
                    </div>
                  </div>
               </div>
             )}
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="bg-[#fff4ea] border border-[#f6d3b3] rounded-2xl p-5 mb-8">
          <p className="text-sm text-[#6b5a48] leading-relaxed">
            <span className="font-bold text-gray-900">Your part in a Great Result:</span> To help us deliver the best possible result, please accurately select the overall condition of the property. Our cleaners will do an assessment prior to the clean — where the condition is beyond the scope of the chosen service, we will discuss an uplift or recommend a better suited service before we begin. <a href="#" className="text-[#e0731f] font-semibold hover:underline">View full uplift & scope policy here</a>.
          </p>
        </div>



      </div>
    );
  };

  const renderResStep3 = () => {
    const today = new Date();
    const currentMonth = viewDate.getMonth();
    const currentYear = viewDate.getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = (new Date(currentYear, currentMonth, 1).getDay() + 6) % 7;
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
      <div className="max-w-4xl mx-auto px-[calc(1.875*var(--scale-unit))] animate-in fade-in slide-in-from-right duration-500 flex flex-col gap-8 py-2">
        
        {/* New Header */}
        <div className="mb-2">
          <h2 className="text-[calc(1.375*var(--scale-unit))] font-semibold text-ink leading-[1.12] tracking-[-0.01em] mb-2">When should we come?</h2>
          <p className="text-[calc(0.8125*var(--scale-unit))] font-normal leading-[1.55] text-ink-muted">Regular cleans get a dedicated cleaner — and a lifetime discount.</p>
        </div>

        {/* Frequency */}
        <div className="mb-2">
          <span className="block text-[calc(0.625*var(--scale-unit))] font-semibold text-ink-soft tracking-[0.09em] uppercase mb-1.5 mb-4">
            FREQUENCY
          </span>
          <div className="flex flex-wrap md:flex-nowrap items-center gap-[calc(0.5*var(--scale-unit))]">
            {frequencies.map((freq) => {
              const isSelected = formData.frequency === freq.id;
              return (
                <div key={freq.id} className="relative flex-1 md:flex-none text-center w-full md:w-auto">
                  
                  <button
                    onClick={() => {
                      const newFreq = freq.id;
                      if (appliedPromo && appliedPromo.isStackable === false && newFreq !== "One time") {
                        setAppliedPromo(undefined);
                        setPromoCode("");
                        alert("Your promo code has been removed because it cannot be combined with frequency discounts.");
                      }
                      setFormData({ ...formData, frequency: newFreq as any });
                    }}
                    className={`w-full md:w-auto px-[calc(1.25*var(--scale-unit))] py-2 md:py-2.5 rounded-full text-[calc(0.78125*var(--scale-unit))] font-medium transition-all border-[1.5px] ${isSelected
                      ? "bg-cream-tag border-brand text-brand-dark font-semibold shadow-sm"
                      : "bg-white border-tan text-[#5c534b] hover:border-gray-300 hover:shadow-sm"
                      }`}
                  >
                    {freq.label}
                    {freq.save && (
                      <span className="text-brand-dark ml-1">{freq.save.toLowerCase()}</span>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Grid: Calendar Left & Time Slots Right */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-5 items-stretch">

          {/* Calendar picker Card */}
          <div className="bg-white border-[1.5px] border-tan-card rounded-2xl p-[calc(1.125*var(--scale-unit))] shadow-none hover:shadow-md transition-all duration-300 h-full flex flex-col">
            <div className="flex items-center justify-between mb-4 border-b border-gray-50 pb-3">
              <span className="text-[calc(0.875*var(--scale-unit))] font-semibold text-gray-900 leading-[calc(1.5*var(--scale-unit))]">
                {monthName}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevMonth}
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-55 text-gray-600 transition-colors border border-gray-100">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextMonth}
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-55 text-gray-600 transition-colors border border-gray-100">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Weekdays names */}
            <div className="grid grid-cols-7 gap-1 text-center text-[calc(0.625*var(--scale-unit))] mb-3 text-gray-400 font-semibold uppercase tracking-wider">
              {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                <div key={`${d}-${i}`}>{d}</div>
              ))}
            </div>

            {/* Days Grid */}
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

          {/* Available time slots */}
          {formData.selectedDate && (
            <div className="flex flex-col h-full pt-[calc(0.5*var(--scale-unit))] animate-in fade-in slide-in-from-top-4 duration-500">
              <span className="block text-[calc(0.625*var(--scale-unit))] font-semibold text-ink-soft tracking-[0.09em] uppercase mb-[calc(1*var(--scale-unit))]">
                ARRIVAL WINDOW - {formData.selectedDate.toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short" }).toUpperCase()}
              </span>

              <div className="grid grid-cols-2 gap-[calc(0.5*var(--scale-unit))]">
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
                        className={`w-full py-[calc(0.625*var(--scale-unit))] px-[calc(1*var(--scale-unit))] rounded-full border-[1.5px] text-center text-[calc(0.78125*var(--scale-unit))] transition-all duration-200 ${isSelected
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
          )}

        </div>
      </div>
    );
  };

  const renderResStep4 = () => (
    <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-right duration-500 flex flex-col justify-start gap-6">
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

          {/* Pets Dropdown */}
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
              <ChevronDown className="absolute right-4 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Parking Dropdown */}
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
              <ChevronDown className="absolute right-4 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Entry Dropdown */}
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
              <ChevronDown className="absolute right-4 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Preferred Chemicals Dropdown */}
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
              <ChevronDown className="absolute right-4 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

        </div>

        {/* Notes Textarea */}
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

  const renderCommStep2 = () => (
    <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-right duration-500 h-full flex flex-col justify-center py-4">
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
    <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-right duration-500 h-full flex flex-col justify-center py-4">
      <div className="text-center mb-8">
        <h3 className="text-[calc(1.375*var(--scale-unit))] font-semibold text-gray-900 mb-2">
          What Needs Cleaning
        </h3>
        <p className="text-gray-500 text-sm">
          Tell us about your commercial cleaning requirements.
        </p>
      </div>
      <div className="grid md:grid-cols-12 gap-8 items-start">

        {/* Type of Environment */}
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

        {/* Type of Clean */}
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
    <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-right duration-500 h-full flex flex-col justify-center py-4">
      <div className="text-center mb-8">
        <h3 className="text-[calc(1.375*var(--scale-unit))] font-semibold text-gray-900 mb-2">
          How Often & Availability
        </h3>
        <p className="text-gray-500 text-sm">When do you need cleaning services?</p>
      </div>
      <div className="space-y-8">

        {/* Frequency Select Grid */}
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

        {/* Days of Week availability */}
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
    <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-right duration-500 h-full flex flex-col justify-center py-4">
      <div className="text-center mb-8">
        <h3 className="text-[calc(1.375*var(--scale-unit))] font-semibold text-gray-900 mb-2">
          Insurance & Budget
        </h3>
        <p className="text-gray-500 text-sm">
          Let's discuss insurance requirements and your budget.
        </p>
      </div>
      <div className="space-y-8">

        {/* Insurance Request Toggle */}
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

        {/* Budget Grid */}
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
    <div className="max-w-xl mx-auto animate-in fade-in slide-in-from-right duration-500 h-full flex flex-col justify-center py-4">
      <div className="text-center mb-8">
        <h3 className="text-[calc(1.375*var(--scale-unit))] font-semibold text-gray-900 mb-2">
          Commercial Sign Up
        </h3>
        <p className="text-gray-500 text-sm">
          Provide your business contact information for the service agreement.
        </p>
      </div>

      <div className="space-y-4 bg-white p-8 rounded-[28px] border border-gray-100 shadow-lg">

        {/* Contact Name */}
        <div className="space-y-1">
          <label className="text-[calc(0.625*var(--scale-unit))] font-extrabold uppercase text-muted-foreground/60 tracking-widest">
            Primary Contact <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Primary contact person name"
            className="w-full p-3 bg-gray-50 border border-transparent rounded-xl outline-none focus:border-primary focus:bg-white text-sm font-semibold text-gray-800 transition-all"
            value={formData.contact.firstName}
            onChange={(e) => updateContact("firstName", e.target.value)}
          />
        </div>

        {/* Contact details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[calc(0.625*var(--scale-unit))] font-extrabold uppercase text-muted-foreground/60 tracking-widest">
              Business Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
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
              placeholder="(03) 1234 5678"
              className="w-full p-3 bg-gray-50 border border-transparent rounded-xl outline-none focus:border-primary focus:bg-white text-sm font-semibold text-gray-800 transition-all"
              value={formData.contact.phone}
              onChange={(e) => updateContact("phone", e.target.value)}
            />
          </div>
        </div>

        {/* Address Autocomplete */}
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

        {/* Commercial Terms Acceptance */}
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
              <a href="/commercial-agreement" className="underline text-primary hover:text-primary/80 transition-colors">
                Commercial Service Agreement
              </a>
            </span>
          </label>
        </div>

        {/* Feedback Messages */}
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

        {/* Trigger Button */}
        <button
          onClick={handleSubmit}
          disabled={isSubmitting || !isAddressValid}
          className="w-full mt-4 bg-primary hover:bg-primary/95 text-white py-4 rounded-xl font-bold shadow-lg shadow-[#FB8C42]/10 hover:shadow-xl hover:shadow-[#FB8C42]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Processing...
            </>
          ) : (
            "Request Quote"
          )}
        </button>
      </div>
    </div>
  );

  const renderResStep5 = () => (
    <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-right duration-500 flex flex-col justify-start gap-6 pt-4">
      {/* Title & Subtitle */}
      <div className="mb-2 flex items-start justify-between flex-wrap gap-2">
        <div>
          <h2 className="text-[calc(1.375*var(--scale-unit))] font-semibold text-gray-900 tracking-tight leading-tight">
            Create your account & book
          </h2>
          <p className="text-[calc(0.8125*var(--scale-unit))] font-normal text-gray-500 mt-2">
            Your account gives you booking history, easy rescheduling and loyalty rewards.
          </p>
        </div>
        <ReservationTimer />
      </div>

      <div className="space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* FULL NAME */}
          <div className="flex flex-col space-y-2">
            <label className="text-[calc(0.625*var(--scale-unit))] font-semibold uppercase text-ink-soft tracking-[0.09em]">
              FULL NAME
            </label>
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Sarah Mitchell"
                className="w-full px-[calc(0.875*var(--scale-unit))] py-[calc(0.75*var(--scale-unit))] bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#FB8C42]/10 text-stone-900 font-normal text-[calc(0.90625*var(--scale-unit))] tracking-normal shadow-sm transition-all"
                value={formData.contact.firstName}
                onChange={(e) => updateContact("firstName", e.target.value)}
              />
              {formData.contact.firstName && <Check className="w-4 h-4 text-[#FB8C42] absolute right-4" />}
            </div>
          </div>

          {/* MOBILE */}
          <div className="flex flex-col space-y-2">
            <label className="text-[calc(0.625*var(--scale-unit))] font-semibold uppercase text-ink-soft tracking-[0.09em]">
              MOBILE
            </label>
            <div className="relative flex items-center">
              <input
                type="tel"
                placeholder="0412 345 678"
                className="w-full px-[calc(0.875*var(--scale-unit))] py-[calc(0.75*var(--scale-unit))] bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#FB8C42]/10 text-stone-900 font-normal text-[calc(0.90625*var(--scale-unit))] tracking-normal shadow-sm transition-all"
                value={formData.contact.phone}
                onChange={(e) => updateContact("phone", e.target.value)}
              />
              {formData.contact.phone && <Check className="w-4 h-4 text-[#FB8C42] absolute right-4" />}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* EMAIL */}
          <div className="flex flex-col space-y-2">
            <label className="text-[calc(0.625*var(--scale-unit))] font-semibold uppercase text-ink-soft tracking-[0.09em]">
              EMAIL
            </label>
            <div className="relative flex items-center">
              <input
                type="email"
                placeholder="sarah@email.com"
                className="w-full px-[calc(0.875*var(--scale-unit))] py-[calc(0.75*var(--scale-unit))] bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#FB8C42]/10 text-stone-900 font-normal text-[calc(0.90625*var(--scale-unit))] tracking-normal shadow-sm transition-all"
                value={formData.contact.email}
                onChange={(e) => updateContact("email", e.target.value)}
              />
              {formData.contact.email && <Check className="w-4 h-4 text-[#FB8C42] absolute right-4" />}
            </div>
          </div>

          {/* PASSWORD */}
          <div className="flex flex-col space-y-2">
            <label className="text-[calc(0.625*var(--scale-unit))] font-semibold uppercase text-ink-soft tracking-[0.09em]">
              PASSWORD
            </label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                className="w-full px-[calc(0.875*var(--scale-unit))] py-[calc(0.75*var(--scale-unit))] bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#FB8C42]/10 text-stone-900 font-normal text-[calc(0.90625*var(--scale-unit))] tracking-normal shadow-sm transition-all pr-12"
                value={formData.contact.password}
                onChange={(e) => updateContact("password", e.target.value)}
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* SERVICE ADDRESS */}
        <div className="flex flex-col space-y-2">
          <label className="text-[calc(0.625*var(--scale-unit))] font-semibold uppercase text-ink-soft tracking-[0.09em]">
            ADDRESS
          </label>
          <AddressAutocomplete
            value={formData.contact.address}
            onChange={(value) => updateContact("address", value)}
            placeholder="Street address, suburb, postcode"
            showLocationButton={true}
            onLocationClick={handleUseCurrentLocation}
            isLoadingLocation={isLoadingLoc}
            onValidityChange={setIsAddressValid}
            onOutOfAreaFeeChange={setOutOfAreaFee}
            inputClassName="!py-3.5 !text-xs !font-semibold !text-gray-700 !bg-white !border !border-gray-200 !shadow-sm focus:!ring-2 focus:!ring-[#FB8C42]/10 !pl-4"
            className="[&>div>svg:first-child]:hidden"
          />
        </div>

        {/* Terms checkbox */}
        <div className="flex items-center gap-2.5 pt-2">
          <input
            type="checkbox"
            id="terms"
            className="w-4 h-4 rounded border-orange-300 text-[#FB8C42] focus:ring-[#FB8C42]/20 accent-[#FB8C42] cursor-pointer"
            checked={formData.contact.terms}
            onChange={(e) => updateContact("terms", e.target.checked)}
          />
          <label
            htmlFor="terms"
            className="text-[calc(0.8125*var(--scale-unit))] text-gray-600 font-medium cursor-pointer select-none"
          >
            I agree to the{" "}
            <a
              href="/terms-conditions"
              className="underline text-[#FB8C42] font-semibold hover:text-[#e0731f] transition-colors"
            >
              Terms & Conditions
            </a>
          </label>
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
        <div className="mt-8 flex flex-col gap-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !isAddressValid}
              className="w-full md:w-auto md:min-w-[calc(15*var(--scale-unit))] bg-[#FB8C42] hover:bg-[#FB8C42]/90 text-white py-3 px-6 rounded-full font-semibold text-[calc(0.9375*var(--scale-unit))] shadow-lg shadow-[#FB8C42]/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4.5 h-4.5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <span>Book Now — ${pricingResult?.total || 0}</span>
                  <ArrowRight className="w-4.5 h-4.5 text-white" />
                </>
              )}
            </button>
            <div className="flex text-[calc(0.6875*var(--scale-unit))] font-medium text-gray-500 leading-tight whitespace-nowrap">
              <span>Card saved securely. Charged after the clean.</span>
            </div>
          </div>
          
          <p className="text-left text-xs text-gray-500 font-semibold mt-2">
            Already have an account?{" "}
            <button className="font-semibold text-[#FB8C42] hover:underline transition-all">
              Login
            </button>
          </p>
        </div>

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
        case 1: return renderStep1();
        case 2: return renderCommStep2();
        case 3: return renderCommStep3();
        case 4: return renderCommStep4();
        case 5: return renderCommStep5();
        case 6: return renderCommStep6();
        default: return null;
      }
    } else {
      switch (currentStep) {
        case 1: return renderResStepDiscount();
        case 2: return renderStep1();
        case 3: return renderConditionAssessmentStep();
        case 4: return renderResStep2();
        case 5: return renderResStep3();
        case 6: return renderResStep4();
        case 7: return renderResStep5();
        default: return null;
      }
    }
  };

  const getStepTitle = () => {
    if (currentStep === 1)
      return (
        <span className="text-gray-900">Choose Service</span>
      );

    if (isCommercial) {
      switch (currentStep) {
        case 2:
          return "Tell Us About Your Business";
        case 3:
          return "What Needs Cleaning";
        case 4:
          return "How Often & Availability";
        case 5:
          return "Insurance & Budget";
        case 6:
          return "Commercial Sign Up";
        default:
          return "";
      }
    }

    switch (currentStep) {
      case 2:
        return "Property Details";
      case 3:
        return "Claim Your Discount";
      case 4:
        return "Condition Assessment";
      case 5:
        return "Schedule Cleaning";
      case 6:
        return "Special Instructions";
      case 7:
        return "Finalise Booking";
      default:
        return "";
    }
  };

  const sidebarSteps = [
    { label: "Details", step: 1, icon: User },
    { label: "Price Type", step: 2, icon: Tag },
    { label: "Service & condition", step: 3, icon: Sparkles },
    { label: "Customise", step: 4, icon: Sliders },
    { label: "Schedule", step: 5, icon: Calendar },
    { label: "Instructions", step: 6, icon: FileText },
    { label: "Checkout", step: 7, icon: CreditCard },
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
                    if (isCompleted) {
                      setSubmitError(null);
                      setSubmitSuccess(null);
                      setCurrentStep(item.step);
                    }
                  }}
                  className={`flex items-center gap-2 whitespace-nowrap shrink-0 ${isCompleted ? 'cursor-pointer hover:opacity-80' : 'cursor-default'}`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10 transition-all ${
                    isActive ? "bg-[#FB8C42] text-white shadow-md shadow-[#FB8C42]/20" :
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
             <div className="flex flex-col gap-6 py-[calc(1.625*var(--scale-unit))] px-[calc(1.375*var(--scale-unit))] lg:sticky lg:top-24">
                {sidebarSteps.map((item, idx) => {
                  const isActive = item.step === currentStep;
                  const isCompleted = item.step < currentStep;
                  return (
                    <div 
                      key={idx} 
                      onClick={() => {
                        if (isCompleted) {
                          setSubmitError(null);
                          setSubmitSuccess(null);
                          setCurrentStep(item.step);
                        }
                      }}
                      role={isCompleted ? "button" : "presentation"}
                      tabIndex={isCompleted ? 0 : -1}
                      onKeyDown={(e) => {
                        if (isCompleted && (e.key === "Enter" || e.key === " ")) {
                          e.preventDefault();
                          setSubmitError(null);
                          setSubmitSuccess(null);
                          setCurrentStep(item.step);
                        }
                      }}
                      className={`flex items-center gap-4 relative w-full text-left ${isCompleted ? 'cursor-pointer hover:opacity-80' : 'cursor-default'}`}
                    >
                      {/* Vertical line connector */}
                      {idx < sidebarSteps.length - 1 && (
                        <div className={`absolute left-[calc(0.9375*var(--scale-unit))] top-[calc(1.875*var(--scale-unit))] bottom-[-24px] w-0.5 ${isCompleted ? 'bg-[#FB8C42]' : 'bg-gray-100'}`} />
                      )}
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 transition-all ${
                        isActive ? "bg-[#FB8C42] text-white shadow-md shadow-[#FB8C42]/20" :
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
             </div>
          </div>

          {/* MIDDLE COLUMN - MAIN FORM CONTENT */}
          <div className="w-full min-[880px]:flex-1 shrink-0 bg-transparent px-[calc(1.25*var(--scale-unit))] min-[880px]:px-[calc(1.125*var(--scale-unit))] py-[calc(1.875*var(--scale-unit))] min-[880px]:py-[calc(3.5*var(--scale-unit))] relative flex flex-col items-center">
             <div className="w-full max-w-[calc(48*var(--scale-unit))] flex flex-col flex-1 justify-center min-[880px]:justify-start">
               {renderContent()}
               
               {/* Inner Step Controls (Hidden on Mobile) */}
               {currentStep < totalSteps && (
                  <div className={`hidden min-[880px]:flex mt-8 pt-4 ${
                    currentStep === 1 && !isCommercial 
                      ? "flex-col items-center" 
                      : "items-center justify-between"
                  }`}>
                    {currentStep === 1 && !isCommercial ? (
                      <div className="w-full max-w-sm flex flex-col items-center gap-2 mt-2">
                        <button
                          onClick={handleNext}
                          disabled={!isStepValid()}
                          className={`w-full py-3.5 rounded-full font-semibold text-[calc(0.84375*var(--scale-unit))] transition-all flex items-center justify-center gap-2 ${
                            !isStepValid()
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                              : "bg-[#FB8C42] hover:bg-[#FB8C42]/90 text-white shadow-lg shadow-[#FB8C42]/20 hover:scale-[1.02]"
                          }`}
                        >
                          Continue <ArrowRight className="w-4 h-4" />
                        </button>
                        <span className="text-[calc(0.6875*var(--scale-unit))] text-[#A2968A] font-normal text-center mt-1">
                          No spam — just your quote and booking updates.
                        </span>
                      </div>
                    ) : (
                      <>
                        {currentStep > 1 ? (
                          <button
                            onClick={handlePrev}
                            className="flex items-center gap-1.5 text-gray-500 hover:text-gray-800 font-medium text-[calc(0.84375*var(--scale-unit))] tracking-wide transition-colors"
                          >
                            <ChevronLeft className="w-4 h-4" /> Back
                          </button>
                        ) : <div />}
                        {currentStep !== 2 && (
                          <div className="flex flex-col items-end gap-2">
                            <button
                              onClick={handleNext}
                              disabled={!isStepValid()}
                              className={`px-[calc(1.5*var(--scale-unit))] py-[calc(0.6875*var(--scale-unit))] rounded-full font-semibold text-[calc(0.84375*var(--scale-unit))] transition-all flex items-center gap-2 ${
                                !isStepValid()
                                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                  : "bg-[#FB8C42] hover:bg-[#FB8C42]/90 text-white shadow-lg shadow-[#FB8C42]/20 hover:scale-[1.02]"
                              }`}
                            >
                              Continue <ArrowRight className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}
             </div>
          </div>

          {/* RIGHT COLUMN - BOOKING SUMMARY (Visible >= 880px) */}
          <div className="hidden min-[880px]:block w-[calc(21*var(--scale-unit))] shrink-0 bg-[#fdf9f3] border-l border-[#f2eadf]">
             <div className="sticky top-24">
               <BookingSummaryCard
                className="w-full !bg-transparent !border-none"
                formData={formData}
                pricingConfig={pricingConfig}
                pricingResult={pricingResult}
                promoCode={promoCode}
                setPromoCode={setPromoCode}
                isValidatingPromo={isValidatingPromo}
                setIsValidatingPromo={setIsValidatingPromo}
                appliedPromo={appliedPromo}
                setAppliedPromo={setAppliedPromo}
                appliedReferral={appliedReferral as any}
                setAppliedReferral={setAppliedReferral}
                apiBaseUrl={API_BASE_URL}
                outOfAreaFee={outOfAreaFee}
                currentStep={currentStep}
              />
             </div>
          </div>
        </div>
      </div>

      {/* MOBILE STICKY SUMMARY (< 880px) */}
      <div className="block min-[880px]:hidden fixed bottom-0 left-0 w-full z-50 bg-white border-t border-gray-200 p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-between gap-4 w-full">
          <div className="flex flex-col">
            <span className="text-[12.5px] font-[600] text-[#2b2523] uppercase tracking-wider">Estimated total</span>
            <span className="text-[19px] font-[700] text-[#2b2523]">${pricingResult?.total || 0}</span>
            <span className="text-[10.5px] font-[400] text-[#8d8378] mt-1 leading-[1.55]">
              {currentStep === 1 ? (
                "Your price updates live as you build your quote."
              ) : formData.cleaningType === 'Hourly' ? (
                "Billed on time worked — this is your cap."
              ) : (
                (pricingResult?.estimatedMinutes ?? 0) > 0 && (
                  `Est. duration ${formatEta(pricingResult!.estimatedMinutes)} · fixed price once confirmed.`
                )
              )}
            </span>
          </div>
          {currentStep < totalSteps && currentStep !== 2 && (
            <button
              onClick={handleNext}
              disabled={!isStepValid()}
              className={`px-6 py-3 rounded-full font-semibold text-[calc(0.84375*var(--scale-unit))] transition-all flex items-center gap-2 ${
                !isStepValid()
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-[#FB8C42] hover:bg-[#FB8C42]/90 text-white shadow-lg shadow-[#FB8C42]/20"
              }`}
            >
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};;

const RoomCounter = ({ label, count, onUpdate, hasInfo = false, className = "" }: any) => {
  return (
    <div className={`w-full py-3 px-4 flex items-center justify-between transition-all duration-300 gap-3 ${hasInfo ? "group" : ""} ${className}`}>
      {/* LEFT SIDE */}
      <div className="flex items-center gap-1.5 flex-wrap min-w-0">
        <div className="font-medium text-gray-800 text-[calc(0.875*var(--scale-unit))] whitespace-nowrap flex items-center">
          {label}
        </div>
        {hasInfo && (
          <div className="w-5 h-5 rounded-full border-2 border-red-500/80 text-red-500/80 flex items-center justify-center ml-1 opacity-80 group-hover:opacity-100 transition-opacity cursor-help shrink-0">
            <span className="text-[calc(0.75*var(--scale-unit))] font-bold leading-none -mt-0.5">i</span>
          </div>
        )}
      </div>

      {/* RIGHT SIDE */}
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

  // Debounced search function
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
        const results = await searchAddresses(value, 5);
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

  // Handle click outside to close dropdown
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

  // Handle keyboard navigation
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

    // Check serviceability immediately upon selection
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
    // Force user to select from autocomplete by invalidating raw typed input
    if (onValidityChange) onValidityChange(false);
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
            className="absolute right-2 top-2 p-1.5 hover:bg-gray-200 rounded-lg transition-colors text-gray-500 disabled:opacity-50"
            title="Use Current Location"
            type="button">
            {isLoadingLocation ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <MapPin className="w-4 h-4" />
            )}
          </button>
        )}
      </div>

      {/* ERROR MESSAGE DISPLAY */}
      {localError && (
        <div className="absolute top-full left-0 mt-1 w-full bg-red-50 border border-red-100 text-red-600 text-xs p-2 rounded-lg z-40 animate-in slide-in-from-top-1">
          {localError}
        </div>
      )}

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border-2 border-gray-100 rounded-xl shadow-lg max-h-60 overflow-y-auto">
          {isLoading && (
            <div className="p-3 text-center text-sm text-gray-500">
              <Loader2 className="w-4 h-4 animate-spin mx-auto" />
            </div>
          )}
          {!isLoading &&
            suggestions.map((suggestion, index) => (
              <button
                key={`${suggestion.name}-${index}`}
                type="button"
                onClick={() => handleSelectSuggestion(suggestion)}
                className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors text-sm ${index === selectedIndex ? "bg-primary/10 text-primary" : "text-gray-700"
                  } ${index === 0 ? "rounded-t-xl" : ""} ${index === suggestions.length - 1 ? "rounded-b-xl" : ""
                  }`}>
                {suggestion.name}
              </button>
            ))}
        </div>
      )}
    </div>
  );
};

const InputField = ({ label, icon: Icon, value, onChange, ...props }: any) => (
  <div className="space-y-1 group">
    <label className="text-[calc(0.625*var(--scale-unit))] font-semibold text-gray-500 uppercase">
      {label}
    </label>
    <div className="relative">
      <Icon className="absolute left-3 top-3 w-4 h-4 text-gray-400 group-focus-within:text-primary transition-colors" />
      <input
        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-xl outline-none border-2 border-transparent focus:border-primary focus:bg-white transition-all hover:border-gray-200 text-sm"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        {...props}
      />
    </div>
  </div>
);

export default Services;
