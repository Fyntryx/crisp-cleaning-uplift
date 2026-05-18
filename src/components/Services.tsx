"use client";
import Link from "next/link";
import { createPortal } from "react-dom";
import {
  Home,
  Building2,
  ChevronLeft,
  ChevronRight,
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
  HOME_DETAIL_PRICES,
  EXTRA_PRICES,
  FREQUENCY_DISCOUNTS,
  type PricingRequest,
  type PricingResponse,
  type CleaningType,
  type Extra,
  type Frequency,
} from "@/utils/pricing";

import {
  getCurrentAddress,
  searchAddresses,
  checkAddressServiceability,
  type AddressSuggestion
} from "@/utils/geolocation";

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
    id: "Regular",
    label: "Regular Clean",
    icon: Sparkles,
    color: "text-orange-500",
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
  "Regular Maintenance",
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

const BookingSummaryCard = ({
  className = "",
  formData,
  pricingResult,
  promoCode,
  setPromoCode,
}: {
  className?: string;
  formData: any;
  pricingResult: PricingResponse | null;
  promoCode: string;
  setPromoCode: (val: string) => void;
}) => (
  <div
    className={`bg-[#1E1915] text-white rounded-[28px] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.15)] relative overflow-hidden group hover:shadow-orange-500/5 transition-all duration-300 ${className}`}
  >
    {/* Soft Orange Glow */}
    <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
    <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

    <h3 className="text-xl font-extrabold mb-5 relative z-10 tracking-tight text-white">
      Booking Summary
    </h3>

    {/* Satisfaction Guaranteed Badge */}
    <div className="relative z-10 group/guarantee mb-6">
      <div className="flex items-center gap-3 bg-green-500/10 text-green-400 border border-green-500/10 px-4 py-3 rounded-2xl cursor-help transition-all hover:bg-green-500/15">
        <Check className="w-5 h-5 flex-shrink-0" strokeWidth={3} />
        <span className="text-xs font-extrabold uppercase tracking-wider">Satisfaction Guaranteed</span>
      </div>
      <div className="absolute top-full left-0 mt-2 w-full bg-[#27211C] text-gray-300 text-xs p-3.5 rounded-2xl shadow-2xl opacity-0 invisible group-hover/guarantee:opacity-100 group-hover/guarantee:visible transition-all duration-300 z-50 border border-[#362D27] pointer-events-none leading-relaxed">
        Not completely satisfied? We will return and clean it again for free!
      </div>
    </div>

    <div className="space-y-4 relative z-10 text-gray-300 text-xs">
      <div className="flex justify-between border-b border-white/5 pb-3">
        <span className="text-gray-400 font-semibold">Service Type</span>
        <span className="text-white font-extrabold capitalize">
          {formData.cleaningType} Clean
        </span>
      </div>
      <div className="flex justify-between border-b border-white/5 pb-3">
        <span className="text-gray-400 font-semibold">Frequency</span>
        <span className="text-white font-extrabold capitalize">
          {formData.frequency || "Not Selected"}
        </span>
      </div>
      
      <div className="py-2">
        <span className="block mb-3 text-[10px] font-extrabold uppercase tracking-widest text-gray-500">
          Price Breakdown
        </span>
        
        <div className="space-y-2.5">
          {pricingResult?.breakdown.cleaningType && (
            <div className="flex justify-between font-semibold">
              <span className="text-gray-400">{pricingResult.breakdown.cleaningType.name} Base Clean</span>
              <span className="text-white font-bold">A${pricingResult.breakdown.cleaningType.price}</span>
            </div>
          )}
          {(formData.homeDetails.bedrooms || 0) > 0 && (
            <div className="flex justify-between font-semibold">
              <span className="text-gray-400">{formData.homeDetails.bedrooms}x Bedroom</span>
              <span className="text-white font-bold">
                A$
                {HOME_DETAIL_PRICES.Bedroom *
                  (formData.homeDetails.bedrooms || 0)}
              </span>
            </div>
          )}
          {(formData.homeDetails.bathrooms || 0) > 0 && (
            <div className="flex justify-between font-semibold">
              <span className="text-gray-400">{formData.homeDetails.bathrooms}x Bathroom</span>
              <span className="text-white font-bold">
                A$
                {HOME_DETAIL_PRICES.Bathroom *
                  (formData.homeDetails.bathrooms || 0)}
              </span>
            </div>
          )}
          {(formData.homeDetails.kitchens || 0) > 0 && (
            <div className="flex justify-between font-semibold">
              <span className="text-gray-400">{formData.homeDetails.kitchens}x Kitchen</span>
              <span className="text-white font-bold">
                A$
                {HOME_DETAIL_PRICES.Kitchen *
                  (formData.homeDetails.kitchens || 0)}
              </span>
            </div>
          )}
          {(formData.homeDetails.other || 0) > 0 && (
            <div className="flex justify-between font-semibold">
              <span className="text-gray-400">{formData.homeDetails.other}x Other Area</span>
              <span className="text-white font-bold">
                A${HOME_DETAIL_PRICES.Other * (formData.homeDetails.other || 0)}
              </span>
            </div>
          )}
          {pricingResult?.breakdown.extras.items.map((e: any) => (
            <div key={e.name} className="flex justify-between font-semibold">
              <span className="text-gray-400">+ {e.name}</span>
              <span className="text-white font-bold">A${e.price}</span>
            </div>
          ))}
        </div>
      </div>

      {/* --- PROMO CODE SECTION --- */}
      <div className="py-2 border-t border-white/5">
        <div className="relative flex items-center mt-3">
          <Tag className="absolute left-3.5 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Promo Code"
            className="w-full bg-white/5 border border-white/5 text-white text-xs rounded-xl py-3 pl-10 pr-20 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/10 transition-all placeholder:text-gray-500 font-semibold"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
          />
          <button className="absolute right-1.5 top-1.5 bottom-1.5 px-4 bg-white/10 hover:bg-primary hover:text-white text-gray-200 text-[10px] font-extrabold uppercase tracking-wider rounded-lg transition-all">
            Apply
          </button>
        </div>
      </div>

      <div className="pt-4 mt-2 border-t border-white/10">
        {pricingResult?.discounts.frequency && (
          <div className="flex justify-between text-green-400 mb-3 font-semibold">
            <span>Discount ({pricingResult.discounts.frequency.name})</span>
            <span className="font-bold">-A${pricingResult.discounts.frequency.amount.toFixed(2)}</span>
          </div>
        )}
        
        <div className="flex justify-between items-end">
          <span className="text-base font-extrabold text-white">Total</span>
          <span className="text-3xl font-extrabold text-primary tracking-tight">
            A${(pricingResult?.total || 0).toFixed(2)}
          </span>
        </div>

        {formData.frequency &&
          formData.frequency !== "One time" && (
            <p className="text-[10px] text-gray-500 mt-3 leading-relaxed font-medium">
              You&apos;ll be charged this amount every{" "}
              {formData.frequency === "Weekly"
                ? "week"
                : formData.frequency === "Fortnightly"
                  ? "fortnight"
                  : formData.frequency === "Monthly"
                    ? "month"
                    : "period"}
              .
            </p>
          )}
      </div>
    </div>
  </div>
);

const Services = () => {
  const [isFormVisible, setIsFormVisible] = useState(true);
const formObserverRef = useRef<HTMLDivElement>(null);
const formContentRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    serviceCategory: "residential",
    cleaningType: "Regular" as CleaningType,
    homeDetails: { bedrooms: 0, bathrooms: 0, kitchens: 0, other: 0 },
    extras: [] as Extra[],
    frequency: "One time" as Frequency,
    selectedDays: [] as string[],
    selectedDate: undefined as Date | undefined,
    selectedTime: "",
    instructions: { entry: "", parking: "", pets: "", areasToAvoid: "", notes: "" },

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
  const totalSteps = isCommercial ? 6 : 5;

  const [currentStep, setCurrentStep] = useState(1);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [promoCode, setPromoCode] = useState("");

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

  // API Configuration
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "https://crisp-cleaning-app-seven.vercel.app/";

  useEffect(() => {
    setMounted(true);
  }, []);

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
        extras: formData.extras,
        frequency: formData.frequency,
        actionTakerDiscount: false,
      });
      setPricingResult(result);
    } catch (e) {
      console.error("Pricing Error", e);
    }
  }, [
    formData.cleaningType,
    formData.homeDetails,
    formData.extras,
    formData.frequency,
    isCommercial,
  ]);

  const isStepValid = () => {
    if (currentStep === 1) return !!formData.serviceCategory;

    if (isCommercial) {
      switch (currentStep) {
        case 2:
          return (
            !!formData.commercial.businessName &&
            !!formData.commercial.businessSize
          );
        case 3:
          return (
            !!formData.commercial.environment && !!formData.commercial.cleanType
          );
        case 4:
          return !!formData.commercial.frequency;
        case 5:
          return !!formData.commercial.budget;
        case 6:
          return (
            !!formData.contact.firstName &&
            !!formData.contact.email &&
            !!formData.contact.phone &&
            !!formData.contact.address &&
            formData.contact.terms &&
            isAddressValid // Check validity here too
          );
        default:
          return true;
      }
    } else {
      switch (currentStep) {
        case 2:
          return (
            (formData.homeDetails.bedrooms || 0) +
            (formData.homeDetails.bathrooms || 0) +
            (formData.homeDetails.kitchens || 0) +
            (formData.homeDetails.other || 0) >
            0
          );
        case 3:
          return (
            !!formData.selectedDate &&
            !!formData.selectedTime &&
            !!formData.frequency
          );
        case 4:
          return (
            !!formData.instructions.entry &&
            !!formData.instructions.parking &&
            !!formData.instructions.pets
          );
        case 5:
          return (
            !!formData.contact.firstName &&
            !!formData.contact.email &&
            !!formData.contact.password &&
            formData.contact.password.length >= 8 &&
            !!formData.contact.phone &&
            !!formData.contact.address &&
            formData.contact.terms &&
            isAddressValid // Check validity here too
          );
        default:
          return true;
      }
    }
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
          // You might want to set a transient error state to pass down if needed, 
          // or rely on the user seeing the red outline in the input if they interact
          setSubmitError(check.error || "Location outside service area");
        } else {
          setSubmitError(null);
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

    // Map extras array to individual count fields
    const extrasMap: Record<Exclude<Extra, "Garage" | "Laundry">, string> = {
      Windows: "extraWindows",
      Walls: "extraWalls",
      Cabinets: "extraCabinets",
      Organisation: "extraOrganisation",
      Blinds: "extraBlinds",
      "Oven/Stovetops": "extraOvenStovetop",
      Fridge: "extraFridge",
      Dishwasher: "extraDishwasher",
      Microwave: "extraMicrowave",
    };

    const extrasPayload: Record<string, number> = {
      extraWalls: 0,
      extraWindows: 0,
      extraCabinets: 0,
      extraOrganisation: 0,
      extraBlinds: 0,
      extraOvenStovetop: 0,
      extraFridge: 0,
      extraDishwasher: 0,
      extraMicrowave: 0,
    };

    formData.extras.forEach((extra) => {
      // Use a type guard or check if the extra exists in our map
      if (extra in extrasMap) {
        const fieldName = extrasMap[extra as keyof typeof extrasMap];
        extrasPayload[fieldName] = 1;
      }
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
      cleaningType: formData.cleaningType,
      frequency: apiFrequency,
      actionTakerDiscount: false,
      roomsBedrooms: formData.homeDetails.bedrooms || 0,
      roomsBathrooms: formData.homeDetails.bathrooms || 0,
      roomsKitchens: formData.homeDetails.kitchens || 0,
      roomsOther: formData.homeDetails.other || 0,
      ...extrasPayload,
      entryInstructions: formData.instructions.entry || "",
      parkingInstructions: formData.instructions.parking || "",
      petsInstructions: formData.instructions.pets || "",
      notes: formData.instructions.notes || "",
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
      // Validate required fields
      if (!formData.contact.firstName || !formData.contact.email || !formData.contact.phone || !formData.contact.address) {
        setSubmitError("Please fill in all required fields.");
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

  const handleNext = () => {
    if (isStepValid() && currentStep < totalSteps) {
      setSubmitError(null); // Clear errors when navigating
      setSubmitSuccess(null); // Clear success message when navigating
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevModal = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
      setIsModalOpen(false);
    } else {
      handlePrev();
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setSubmitError(null); // Clear errors when navigating
      setSubmitSuccess(null); // Clear success message when navigating
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
      const currentExtras = prev.extras || [];
      const exists = currentExtras.includes(extraKey);
      return {
        ...prev,
        extras: exists
          ? currentExtras.filter((e) => e !== extraKey)
          : [...currentExtras, extraKey],
      };
    });
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
    const step1Types = [
      {
        id: "Regular",
        label: "Regular Clean",
        desc: "Consistent, detailed maintenance on your schedule",
        icon: Home,
      },
      {
        id: "Deep",
        label: "Deep Clean",
        desc: "A full reset for every room, every corner",
        icon: Sparkles,
        badge: "MOST THOROUGH",
      },
      {
        id: "Vacate",
        label: "Vacate Clean",
        desc: "Cleaned to rental inspection standard",
        icon: DoorOpen,
      },
    ];

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto animate-in fade-in duration-500 py-2">
        {step1Types.map((type) => {
          const isSelected = formData.cleaningType === type.id;
          const Icon = type.icon;

          return (
            <div
              key={type.id}
              onClick={() =>
                setFormData({
                  ...formData,
                  cleaningType: type.id as CleaningType,
                })
              }
              className={`group bg-white border-2 rounded-[24px] p-6 cursor-pointer transition-all duration-300 relative overflow-visible flex flex-col items-start min-h-[200px] ${
                isSelected
                  ? "border-[#F97316] shadow-[0_15px_30px_rgba(249,115,22,0.06)] scale-[1.01]"
                  : "border-gray-100 hover:border-gray-200 hover:shadow-md"
              }`}
            >
              {/* MOST THOROUGH Badge */}
              {type.badge && (
                <span className="absolute -top-3.5 left-6 bg-[#F97316] text-white text-[8px] font-black tracking-widest uppercase px-3 py-1 rounded-full shadow-md z-10">
                  {type.badge}
                </span>
              )}

              {/* Top Row: Icon container & Custom Checkbox */}
              <div className="flex items-center justify-between w-full mb-5">
                <div className="w-12 h-12 rounded-xl bg-orange-50/70 border border-orange-100 text-[#F97316] flex items-center justify-center shadow-sm">
                  <Icon className="w-5 h-5" />
                </div>

                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                    isSelected
                      ? "border-[#F97316] bg-[#F97316] shadow-sm"
                      : "border-gray-200 group-hover:border-gray-300"
                  }`}
                >
                  {isSelected && (
                    <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                  )}
                </div>
              </div>

              {/* Description Block */}
              <h3 className="text-base font-extrabold text-gray-900 mb-1 group-hover:text-[#F97316] transition-colors">
                {type.label}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                {type.desc}
              </p>
            </div>
          );
        })}
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
      return "Maintenance clean on your schedule — same cleaner every visit. Defined room-by-room checklist covering general areas, floors, bedrooms, bathroom and kitchen.";
    };

    const getPlanIcon = () => {
      if (formData.cleaningType === "Deep") return Sparkles;
      if (formData.cleaningType === "Vacate") return DoorOpen;
      return Home;
    };

    const SelectedIcon = getPlanIcon();

    return (
      <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-right duration-500 min-h-full flex flex-col justify-start py-2">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Title Block & Selected Service Card & Add-ons */}
          <div className="md:col-span-5 flex flex-col items-stretch space-y-6">
            
            {/* Title Block */}
            <div className="text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-orange-100 text-primary text-[9px] font-extrabold tracking-wider uppercase mb-3 bg-orange-50/50">
                <Sliders className="w-2.5 h-2.5" /> CUSTOMISE
              </span>
              <h2 className="text-3xl font-black text-gray-900 tracking-tight leading-tight">Customise your clean.</h2>
              <p className="text-xs text-gray-500 mt-1.5 font-medium">Select your rooms and any add-ons.</p>
            </div>

            {/* Selected Service Card */}
            <div className="bg-white rounded-3xl border border-gray-100 p-6 flex flex-col items-start space-y-4 shadow-sm relative overflow-hidden group hover:border-gray-200 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-orange-50/70 border border-orange-100 text-primary flex items-center justify-center shadow-sm shrink-0">
                  <SelectedIcon className="w-5 h-5 text-[#F97316]" />
                </div>
                <div>
                  <span className="block text-[9px] font-black uppercase text-[#F97316] tracking-wider">
                    SELECTED SERVICE
                  </span>
                  <span className="font-extrabold text-lg text-gray-900 leading-tight">
                    {formData.cleaningType} Clean
                  </span>
                </div>
              </div>
              
              <p className="text-xs text-gray-500 leading-relaxed font-medium">
                {getPlanDescription()}
              </p>

              <a
                href="#what-is-included"
                onClick={(e) => {
                  e.preventDefault();
                  // Toggles standard checklist info or scrolls
                }}
                className="text-xs font-bold text-[#F97316] hover:underline flex items-center gap-1 mt-2 transition-all cursor-pointer"
              >
                What's included <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* ADD-ONS Section */}
            <div className="space-y-3">
              <span className="block text-[10px] font-black uppercase text-gray-400 tracking-widest">
                ADD-ONS
              </span>
              <div className="flex flex-wrap gap-2">
                {(Object.keys(EXTRA_PRICES) as Extra[])
                  .filter((extra) => !["Garage", "Laundry"].includes(extra))
                  .map((extra) => {
                    const isSelected = formData.extras?.includes(extra);
                    return (
                      <button
                        key={extra}
                        onClick={() => toggleExtra(extra)}
                        className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full border text-xs font-bold transition-all duration-200 ${
                          isSelected
                            ? "bg-[#F97316] border-[#F97316] text-white shadow-md shadow-orange-500/10"
                            : "bg-white border-gray-100 text-gray-600 hover:border-gray-200 hover:shadow-sm"
                        }`}
                      >
                        {isSelected ? (
                          <Check className="w-3 h-3 text-white" strokeWidth={3} />
                        ) : (
                          <span>+</span>
                        )}
                        <span>{extra}</span>
                      </button>
                    );
                  })}
              </div>
            </div>

          </div>

          {/* Right Column: Counters list */}
          <div className="md:col-span-7 space-y-4">
            
            {/* Counters ordered Bathroom first, then Bedroom, Kitchen, Other */}
            <RoomCounter
              label="Bathroom"
              count={formData.homeDetails.bathrooms || 0}
              onUpdate={(v) => updateRooms("bathrooms", v)}
            />

            <RoomCounter
              label="Bedroom"
              count={formData.homeDetails.bedrooms || 0}
              onUpdate={(v) => updateRooms("bedrooms", v)}
            />

            <RoomCounter
              label="Kitchen"
              count={formData.homeDetails.kitchens || 0}
              onUpdate={(v) => updateRooms("kitchens", v)}
            />

            <div className="relative group w-full">
              <RoomCounter
                label="Other Areas"
                count={formData.homeDetails.other || 0}
                onUpdate={(v) => updateRooms("other", v)}
                hasInfo={true}
              />
              <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 p-3 bg-gray-900 text-white text-xs rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 pointer-events-none">
                This includes living rooms, studies, laundries, theatres, gyms, etc.
                <div className="absolute left-1/2 -translate-x-1/2 top-full w-2 h-2 bg-gray-900 rotate-45"></div>
              </div>
            </div>

          </div>

        </div>
      </div>
    );
  };

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

    const frequencies = [
      { id: "One time", label: "One-time", save: null },
      { id: "Weekly", label: "Weekly", save: "SAVE 15%" },
      { id: "Fortnightly", label: "Fortnightly", save: "SAVE 10%" },
      { id: "Monthly", label: "Monthly", save: "SAVE 5%" },
    ];

    return (
      <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-right duration-500 flex flex-col gap-6 py-2">
        
        {/* Title Block */}
        <div className="text-left mb-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-orange-100 text-primary text-[9px] font-extrabold tracking-wider uppercase mb-3 bg-orange-50/50">
            <Calendar className="w-2.5 h-2.5" /> SCHEDULE
          </span>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight leading-tight">When would you like your clean?</h2>
          <p className="text-xs text-gray-500 mt-1.5 font-medium">Select a date, frequency, and time slot.</p>
        </div>

        {/* Dynamic Rounded Frequency Tabs bar */}
        <div className="relative inline-flex items-center justify-between bg-gray-50/50 border border-gray-100 rounded-full p-1.5 max-w-lg w-full mb-4">
          {frequencies.map((freq) => {
            const isSelected = formData.frequency === freq.id;
            return (
              <div key={freq.id} className="relative flex-1 text-center">
                
                {/* Floating Orange SAVE Badge */}
                {freq.save && (
                  <span className="bg-[#F97316] text-white text-[8px] font-black px-2 py-0.5 rounded-full absolute -top-3.5 left-1/2 -translate-x-1/2 shadow-sm border border-white">
                    {freq.save}
                  </span>
                )}

                <button
                  onClick={() =>
                    setFormData({ ...formData, frequency: freq.id as any })
                  }
                  className={`w-full py-2.5 rounded-full text-xs font-black transition-all ${
                    isSelected
                      ? "bg-[#F97316] text-white shadow-md shadow-orange-500/10"
                      : "text-gray-500 hover:text-gray-950 hover:bg-gray-100/50"
                  }`}
                >
                  {freq.label}
                </button>
              </div>
            );
          })}
        </div>

        {/* Grid: Calendar Left & Time Slots Right */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Calendar picker Card */}
          <div className="md:col-span-6 bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between mb-6 border-b border-gray-50 pb-4">
              <span className="font-extrabold text-sm text-gray-900">
                Select Date <span className="text-red-500 font-bold">*</span>
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevMonth}
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-50 text-gray-600 transition-colors border border-gray-100"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-black text-gray-900 w-24 text-center">
                  {monthName}
                </span>
                <button
                  onClick={handleNextMonth}
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-50 text-gray-600 transition-colors border border-gray-100"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Weekdays names */}
            <div className="grid grid-cols-7 gap-1 text-center text-[10px] mb-3 text-gray-400 font-black uppercase tracking-wider">
              {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                <div key={`${d}-${i}`}>{d}</div>
              ))}
            </div>
            
            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-1.5">
              {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                <div key={`empty-${i}`} className="h-9 w-full" />
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const past = isPastDate(day);
                const selected = isDateSelected(day);
                const todayMark = isToday(day);
                return (
                  <button
                    key={day}
                    onClick={() => !past && handleDateSelect(day)}
                    disabled={past}
                    className={`h-9 w-full rounded-xl flex flex-col items-center justify-center text-xs font-bold transition-all relative ${
                      selected
                        ? "bg-[#F97316] text-white shadow-md shadow-orange-500/10"
                        : ""
                    } ${
                      past
                        ? "text-gray-200 cursor-not-allowed bg-transparent"
                        : "hover:bg-gray-50 text-gray-700"
                    } ${
                      todayMark && !selected
                        ? "text-[#F97316] bg-orange-50/50"
                        : ""
                    }`}
                  >
                    {day}
                    {todayMark && (
                      <span
                        className={`absolute bottom-1 w-1 h-1 rounded-full ${
                          selected ? "bg-white" : "bg-[#F97316]"
                        }`}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
          
          {/* Available time slots Card */}
          <div className="md:col-span-6 bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
            <span className="flex items-center gap-2 font-extrabold text-sm text-gray-900 mb-6 border-b border-gray-50 pb-4">
              <Clock className="w-4 h-4 text-[#F97316]" /> Available time slots
            </span>

            <div className="grid grid-cols-3 gap-3">
              {timeSlots.map((time) => {
                const isSelected = formData.selectedTime === time;
                // Mock unavailable slots for gorgeous high-fidelity accuracy matching the screenshot
                const isUnavailable = ["12:00 PM", "2:00 PM"].includes(time);
                
                return (
                  <button
                    key={time}
                    disabled={isUnavailable}
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, selectedTime: time }))
                    }
                    className={`py-3.5 rounded-xl border text-center text-xs font-bold transition-all ${
                      isSelected
                        ? "bg-[#F97316] border-[#F97316] text-white shadow-md shadow-orange-500/10 hover:scale-105"
                        : isUnavailable
                          ? "opacity-30 cursor-not-allowed select-none bg-gray-50 border-transparent text-gray-400 font-medium"
                          : "bg-white border-gray-100 text-gray-700 hover:border-gray-200 hover:shadow-sm"
                    }`}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    );
  };

  const renderResStep4 = () => (
    <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-right duration-500 flex flex-col justify-start gap-6 py-2">
      
      {/* Title Block */}
      <div className="text-left mb-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-orange-100 text-primary text-[9px] font-extrabold tracking-wider uppercase mb-3 bg-orange-50/50">
          <ClipboardList className="w-2.5 h-2.5" /> DETAILS
        </span>
        <h2 className="text-3xl font-black text-gray-900 tracking-tight leading-tight">A few quick questions before your clean.</h2>
        <p className="text-xs text-gray-500 mt-1.5 font-medium">This helps your cleaner prepare and arrive ready.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Pets Dropdown */}
        <div className="bg-white p-5 rounded-[24px] border border-gray-100 hover:shadow-md transition-all duration-300 flex flex-col">
          <span className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-400 tracking-wider mb-2.5">
            <PawPrint className="w-4 h-4 text-[#F97316]" />
            DO YOU HAVE ANY PETS?
          </span>
          <div className="relative">
            <select
              className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-orange-500/10 text-gray-800 font-extrabold text-xs cursor-pointer appearance-none pr-10 bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23F97316%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:10px_auto] bg-[right_1.25rem_center] bg-no-repeat"
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
              <option>Yes cat</option>
              <option>Dog/Cat</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        {/* Parking Dropdown */}
        <div className="bg-white p-5 rounded-[24px] border border-gray-100 hover:shadow-md transition-all duration-300 flex flex-col">
          <span className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-400 tracking-wider mb-2.5">
            <Car className="w-4 h-4 text-[#F97316]" />
            IS PARKING AVAILABLE?
          </span>
          <div className="relative">
            <select
              className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-orange-500/10 text-gray-800 font-extrabold text-xs cursor-pointer appearance-none pr-10 bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23F97316%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:10px_auto] bg-[right_1.25rem_center] bg-no-repeat"
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
              <option>Street parking</option>
              <option>I will provide parking onsite</option>
              <option>There is free parking nearby/on the street</option>
              <option>Other (Please Specify)</option>
            </select>
          </div>
        </div>

        {/* Entry Dropdown */}
        <div className="bg-white p-5 rounded-[24px] border border-gray-100 hover:shadow-md transition-all duration-300 flex flex-col">
          <span className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-400 tracking-wider mb-2.5">
            <Key className="w-4 h-4 text-[#F97316]" />
            HOW WILL WE GET IN?
          </span>
          <div className="relative">
            <select
              className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-orange-500/10 text-gray-800 font-extrabold text-xs cursor-pointer appearance-none pr-10 bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23F97316%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:10px_auto] bg-[right_1.25rem_center] bg-no-repeat"
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
              <option>Key lockbox</option>
              <option>I will be home</option>
              <option>I will leave a key</option>
              <option>I will provide a lockbox/access key</option>
              <option>Other (Please Specify)</option>
            </select>
          </div>
        </div>

        {/* Areas to Avoid Dropdown */}
        <div className="bg-white p-5 rounded-[24px] border border-gray-100 hover:shadow-md transition-all duration-300 flex flex-col">
          <span className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-400 tracking-wider mb-2.5">
            <AlertTriangle className="w-4 h-4 text-[#F97316]" />
            ANY AREAS TO AVOID?
          </span>
          <div className="relative">
            <select
              className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-orange-500/10 text-gray-800 font-extrabold text-xs cursor-pointer appearance-none pr-10 bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23F97316%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:10px_auto] bg-[right_1.25rem_center] bg-no-repeat"
              value={formData.instructions.areasToAvoid}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  instructions: {
                    ...formData.instructions,
                    areasToAvoid: e.target.value,
                  },
                })
              }
            >
              <option value="" disabled>Select...</option>
              <option>None</option>
              <option>Specific rooms</option>
              <option>Other</option>
            </select>
          </div>
        </div>

      </div>

      {/* Notes Textarea */}
      <div className="bg-white p-6 rounded-[24px] border border-gray-100 hover:shadow-md transition-all duration-300 flex flex-col">
        <span className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-400 tracking-wider mb-2.5">
          <FileText className="w-4 h-4 text-[#F97316]" />
          ANYTHING ELSE WE SHOULD KNOW?
        </span>
        <textarea
          className="w-full p-4 bg-gray-50 rounded-2xl border-transparent focus:ring-2 focus:ring-orange-500/10 outline-none resize-none h-28 text-gray-800 text-xs font-extrabold placeholder:text-gray-400 leading-relaxed"
          placeholder="e.g. fragile items, allergies, specific instructions..."
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
  );

  const renderCommStep2 = () => (
    <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-right duration-500 h-full flex flex-col justify-center py-4">
      <div className="text-center mb-8">
        <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">
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
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-right duration-500 h-full flex flex-col justify-center py-4">
      <div className="text-center mb-8">
        <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">
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
                  className={`p-3 text-xs font-bold rounded-xl border-2 transition-all duration-200 text-center hover:border-primary hover:shadow-md truncate ${
                    isSelected
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
                  className={`p-4 text-xs font-bold rounded-xl border-2 transition-all duration-200 text-left px-5 hover:border-primary hover:shadow-md ${
                    isSelected
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
        <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">
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
                  className={`py-3 rounded-xl border-2 font-bold text-xs transition-all hover:border-primary ${
                    isSelected
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
                  className={`w-12 h-12 rounded-full border-2 text-xs font-bold transition-all hover:border-primary ${
                    isSelected
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
        <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">
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
              className={`mt-1 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
                formData.commercial.insuranceRequired
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
                  className={`py-3 px-2 rounded-xl border-2 font-bold text-xs transition-all hover:border-primary truncate ${
                    isSelected
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
        <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">
          Commercial Sign Up
        </h3>
        <p className="text-gray-500 text-sm">
          Provide your business contact information for the service agreement.
        </p>
      </div>
      
      <div className="space-y-4 bg-white p-8 rounded-[28px] border border-gray-100 shadow-lg">
        
        {/* Contact Name */}
        <div className="space-y-1">
          <label className="text-[10px] font-extrabold uppercase text-muted-foreground/60 tracking-widest">
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
            <label className="text-[10px] font-extrabold uppercase text-muted-foreground/60 tracking-widest">
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
            <label className="text-[10px] font-extrabold uppercase text-muted-foreground/60 tracking-widest">
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
          <label className="text-[10px] font-extrabold uppercase text-muted-foreground/60 tracking-widest">
            Business Address <span className="text-red-500">*</span>
          </label>
          <AddressAutocomplete
            value={formData.contact.address}
            onChange={(value) => updateContact("address", value)}
            placeholder="Full business address"
            inputClassName="p-3 border-transparent"
            onValidityChange={setIsAddressValid}
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
              <a href="#" className="underline text-primary hover:text-primary/80 transition-colors">
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
          className="w-full mt-4 bg-primary hover:bg-primary/95 text-white py-4 rounded-xl font-bold shadow-lg shadow-orange-500/10 hover:shadow-xl hover:shadow-orange-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
    <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-right duration-500 flex flex-col justify-start gap-6 py-2">
      
      {/* Title Block */}
      <div className="text-left mb-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-orange-100 text-primary text-[9px] font-extrabold tracking-wider uppercase mb-3 bg-orange-50/50">
          <CreditCard className="w-2.5 h-2.5" /> CONFIRM
        </span>
        <h2 className="text-3xl font-black text-gray-900 tracking-tight leading-tight">Finalise your booking.</h2>
        <p className="text-xs text-gray-500 mt-1.5 font-medium">Enter your details and complete payment.</p>
      </div>

      <div className="space-y-5">
        
        {/* Name and Phone Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* Full Name */}
          <div className="bg-white p-5 rounded-[24px] border border-gray-100 hover:shadow-md transition-all duration-300 flex flex-col">
            <span className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-400 tracking-wider mb-2.5">
              <User className="w-4 h-4 text-[#F97316]" />
              FULL NAME
            </span>
            <input
              type="text"
              placeholder="e.g. John Doe"
              className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-orange-500/10 text-gray-800 font-extrabold text-xs placeholder:text-gray-400"
              value={formData.contact.firstName}
              onChange={(e) => updateContact("firstName", e.target.value)}
            />
          </div>

          {/* Phone Number */}
          <div className="bg-white p-5 rounded-[24px] border border-gray-100 hover:shadow-md transition-all duration-300 flex flex-col">
            <span className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-400 tracking-wider mb-2.5">
              <Phone className="w-4 h-4 text-[#F97316]" />
              PHONE NUMBER
            </span>
            <input
              type="tel"
              placeholder="e.g. +61 400 000 000"
              className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-orange-500/10 text-gray-800 font-extrabold text-xs placeholder:text-gray-400"
              value={formData.contact.phone}
              onChange={(e) => updateContact("phone", e.target.value)}
            />
          </div>

        </div>

        {/* Email Address */}
        <div className="bg-white p-5 rounded-[24px] border border-gray-100 hover:shadow-md transition-all duration-300 flex flex-col">
          <span className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-400 tracking-wider mb-2.5">
            <Mail className="w-4 h-4 text-[#F97316]" />
            EMAIL ADDRESS
          </span>
          <input
            type="email"
            placeholder="e.g. john@example.com"
            className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-orange-500/10 text-gray-800 font-extrabold text-xs placeholder:text-gray-400"
            value={formData.contact.email}
            onChange={(e) => updateContact("email", e.target.value)}
          />
        </div>

        {/* Create Password */}
        <div className="bg-white p-5 rounded-[24px] border border-gray-100 hover:shadow-md transition-all duration-300 flex flex-col">
          <span className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-400 tracking-wider mb-2.5">
            <Key className="w-4 h-4 text-[#F97316]" />
            CREATE ACCOUNT PASSWORD (MIN 8 CHARACTERS)
          </span>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create a secure password"
              className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-orange-500/10 text-gray-800 font-extrabold text-xs placeholder:text-gray-400 pr-12"
              value={formData.contact.password}
              onChange={(e) => updateContact("password", e.target.value)}
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Full Address autocomplete */}
        <div className="bg-white p-5 rounded-[24px] border border-gray-100 hover:shadow-md transition-all duration-300 flex flex-col">
          <span className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-400 tracking-wider mb-2.5">
            <MapPin className="w-4 h-4 text-[#F97316]" />
            FULL ADDRESS
          </span>
          <AddressAutocomplete
            value={formData.contact.address}
            onChange={(value) => updateContact("address", value)}
            placeholder="123 Clean St..."
            showLocationButton={true}
            onLocationClick={handleUseCurrentLocation}
            isLoadingLocation={isLoadingLoc}
            onValidityChange={setIsAddressValid}
          />
        </div>

        {/* Suburb */}
        <div className="bg-white p-5 rounded-[24px] border border-gray-100 hover:shadow-md transition-all duration-300 flex flex-col">
          <span className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-400 tracking-wider mb-2.5">
            <Building2 className="w-4 h-4 text-[#F97316]" />
            SUBURB
          </span>
          <input
            type="text"
            placeholder="e.g. Richmond"
            className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-orange-500/10 text-gray-800 font-extrabold text-xs placeholder:text-gray-400"
            value={formData.contact.suburb}
            onChange={(e) => updateContact("suburb", e.target.value)}
          />
        </div>

        {/* Terms checkbox */}
        <div className="flex items-center gap-2.5 pt-2">
          <input
            type="checkbox"
            id="terms"
            className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary/20 accent-primary cursor-pointer"
            checked={formData.contact.terms}
            onChange={(e) => updateContact("terms", e.target.checked)}
          />
          <label
            htmlFor="terms"
            className="text-xs text-gray-500 cursor-pointer select-none font-bold"
          >
            I accept the{" "}
            <a
              href="#"
              className="underline text-primary hover:text-primary/80 transition-colors"
            >
              Terms & Conditions
            </a>
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

        {/* Action controls row matching premium Step 5 design */}
        <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between gap-4">
          <button
            onClick={handlePrevModal}
            className="flex items-center gap-1.5 text-[#F97316] hover:text-[#F97316]/80 font-extrabold text-[10px] uppercase tracking-widest transition-all shrink-0"
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </button>

          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !isAddressValid}
            className="flex-grow max-w-md bg-[#111827] hover:bg-black text-white py-4 px-6 rounded-full font-black text-xs uppercase tracking-wider shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4.5 h-4.5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Lock className="w-4 h-4 text-gray-400" />
                Pay Now — Confirm Booking
              </>
            )}
          </button>
        </div>

        <p className="text-center text-xs text-gray-500 mt-4 font-medium">
          Already have an account?{" "}
          <button className="font-extrabold text-primary hover:underline transition-all">
            Login
          </button>
        </p>

      </div>
    </div>
  );

  const { ref: sectionRef, style: scaleStyle } = useScrollScale({
    threshold: 0.1,
  });
  const validStep = isStepValid();

  const renderContent = () => {
    if (currentStep === 1) return renderStep1();
    if (isCommercial) {
      switch (currentStep) {
        case 2:
          return renderCommStep2();
        case 3:
          return renderCommStep3();
        case 4:
          return renderCommStep4();
        case 5:
          return renderCommStep5();
        case 6:
          return renderCommStep6();
        default:
          return null;
      }
    } else {
      switch (currentStep) {
        case 2:
          return renderResStep2();
        case 3:
          return renderResStep3();
        case 4:
          return renderResStep4();
        case 5:
          return renderResStep5();
        default:
          return null;
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
        return "Schedule Cleaning";
      case 4:
        return "Special Instructions";
      case 5:
        return "Finalise Booking";
      default:
        return "";
    }
  };

  return (
    <>
      <section
        id="services"
        ref={formObserverRef}
        className="w-full relative flex flex-col justify-center"
      >
        {/* INLINE STEP 1 CONTAINER */}
        <div className="w-full max-w-4xl mx-auto bg-white rounded-[32px] md:rounded-[40px] border border-gray-100 shadow-[0_15px_50px_rgba(0,0,0,0.05)] overflow-hidden p-6 md:p-8 flex flex-col items-stretch">
          
          {/* Top Bar: Logo & Step Fractional Badge */}
          <div className="flex items-center justify-between w-full border-b border-gray-100 pb-5 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center text-white shadow-sm shadow-orange-500/20">
                <Sparkles className="w-4.5 h-4.5" />
              </div>
              <span className="font-display font-extrabold text-lg text-gray-900 tracking-tight">crisp cleaning</span>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">
                STEP <span className="text-primary font-black">1</span> OF 5
              </span>
              <button className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Connected Stepper Row */}
          <div className="w-full flex items-center justify-between pb-6 mb-8 border-b border-gray-50 overflow-x-auto custom-scrollbar">
            {[
              { label: "Service", active: true, icon: Sparkles },
              { label: "Customise", active: false, icon: Sliders },
              { label: "Schedule", active: false, icon: Calendar },
              { label: "Details", active: false, icon: ClipboardList },
              { label: "Confirm", active: false, icon: CreditCard },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 shrink-0">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  item.active 
                    ? "bg-primary text-white shadow-sm shadow-orange-500/20" 
                    : "bg-gray-50 border border-gray-100 text-gray-400"
                }`}>
                  <item.icon className="w-4 h-4" />
                </div>
                <span className={`text-[10px] font-extrabold uppercase tracking-wider ${
                  item.active ? "text-gray-900" : "text-gray-400"
                }`}>
                  {item.label}
                </span>
                {idx < 4 && (
                  <div className="w-6 md:w-12 h-0.5 bg-gray-100 mx-2" />
                )}
              </div>
            ))}
          </div>

          {/* Header Block */}
          <div className="text-left mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-orange-100 text-primary text-[9px] font-extrabold tracking-wider uppercase mb-3 bg-orange-50/50">
              <Sparkles className="w-2.5 h-2.5" /> SERVICE
            </span>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight leading-tight">What type of clean do you need?</h2>
            <p className="text-xs text-gray-500 mt-1.5 font-medium">Select a service to get started.</p>
          </div>

          {/* Cards Grid */}
          <div className="w-full mb-8">
            {renderStep1()}
          </div>

          {/* Bottom Bar: Action Trigger Row */}
          <div className="flex items-center justify-between border-t border-gray-100 pt-6">
            <div className="flex items-center">
              <div className="flex items-center gap-1.5 text-gray-300 font-extrabold text-[10px] uppercase tracking-widest cursor-not-allowed select-none mr-6">
                <ChevronLeft className="w-4 h-4" /> Back
              </div>
              <a href="#plans" className="text-xs font-extrabold text-primary hover:underline transition-all">
                Compare all plans &rarr;
              </a>
            </div>

            <button
              onClick={() => {
                if (currentStep === 1 && isStepValid()) {
                  setCurrentStep(2);
                  setIsModalOpen(true);
                }
              }}
              disabled={currentStep === 1 && !isStepValid()}
              className="bg-primary hover:bg-primary/95 text-white px-8 py-3.5 rounded-full font-bold text-sm shadow-lg shadow-orange-500/10 transition-all hover:scale-[1.02] flex items-center gap-2"
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* OVERLAY BOOKING MODAL FOR STEPS >= 2 */}
        {mounted && isModalOpen && createPortal(
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8 bg-[#1E1915]/60 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-6xl h-[90vh] md:h-[85vh] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col relative animate-in zoom-in-95 duration-300 border border-gray-100">

              {/* Modal Header */}
              <div className="flex-none bg-white px-6 py-4 border-b border-gray-100 flex flex-col gap-4 relative shadow-sm z-20">
                {/* Top Bar: Logo & Step Fractional Badge */}
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-[#F97316] flex items-center justify-center text-white shadow-sm shadow-orange-500/20">
                      <Sparkles className="w-4.5 h-4.5" />
                    </div>
                    <span className="font-display font-extrabold text-lg text-gray-900 tracking-tight">crisp cleaning</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">
                      STEP <span className="text-[#F97316] font-black">{currentStep}</span> OF 5
                    </span>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Connected Stepper Row */}
                <div className="w-full flex items-center justify-between pb-1 overflow-x-auto custom-scrollbar">
                  {[
                    { label: "Service", step: 1, icon: Sparkles },
                    { label: "Customise", step: 2, icon: Sliders },
                    { label: "Schedule", step: 3, icon: Calendar },
                    { label: "Details", step: 4, icon: ClipboardList },
                    { label: "Confirm", step: 5, icon: CreditCard },
                  ].map((item, idx) => {
                    const isCompleted = item.step < currentStep;
                    const isActive = item.step === currentStep;

                    return (
                      <div key={idx} className="flex items-center gap-2 shrink-0">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                          isActive 
                            ? "bg-[#F97316] text-white shadow-sm shadow-orange-500/20" 
                            : isCompleted
                              ? "bg-orange-50 border border-orange-100 text-[#F97316]"
                              : "bg-gray-50 border border-gray-100 text-gray-400"
                        }`}>
                          {isCompleted ? (
                            <Check className="w-4 h-4 text-[#F97316]" strokeWidth={3} />
                          ) : (
                            <item.icon className="w-4 h-4" />
                          )}
                        </div>
                        <span className={`text-[10px] font-extrabold uppercase tracking-wider ${
                          isActive ? "text-gray-900" : "text-gray-400"
                        }`}>
                          {item.label}
                        </span>
                        {idx < 4 && (
                          <div className="w-6 md:w-12 h-0.5 bg-gray-100 mx-2" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Modal Body (Two Column Layout) */}
              <div className="flex-grow overflow-hidden flex flex-col xl:flex-row relative">
                {/* Left Column (Active Step Content) */}
                <div className={`w-full ${isCommercial ? "" : "xl:w-[65%]"} h-full overflow-y-auto px-6 md:px-12 py-8 bg-white custom-scrollbar flex flex-col`}>
                  <div className="flex-grow">
                    {currentStep >= 2 && renderContent()}
                  </div>

                  {/* Inner Step Controls */}
                  {currentStep < totalSteps && (
                    <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                      <button
                        onClick={handlePrevModal}
                        className="flex items-center gap-1.5 text-[#F97316] hover:text-[#F97316]/80 font-extrabold text-[10px] uppercase tracking-widest transition-all"
                      >
                        <ChevronLeft className="w-4 h-4" /> Back
                      </button>

                      <button
                        onClick={handleNext}
                        disabled={!isStepValid()}
                        className={`px-8 py-3.5 rounded-full font-bold text-sm transition-all flex items-center gap-2 ${
                          !isStepValid()
                            ? "bg-gray-150 text-gray-400 cursor-not-allowed"
                            : "bg-[#F97316] hover:bg-[#F97316]/95 text-white shadow-lg shadow-orange-500/10 hover:scale-[1.02]"
                        }`}
                      >
                        Continue
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Right Column (Sticky Summary - Only for Residential) */}
                {!isCommercial && (
                  <div className="w-full xl:w-[35%] bg-gray-50 border-t xl:border-t-0 xl:border-l border-gray-100 overflow-y-auto custom-scrollbar flex-col justify-between hidden xl:flex">
                    <div className="p-6 md:p-8 sticky top-0">
                      <BookingSummaryCard
                        formData={formData}
                        pricingResult={pricingResult}
                        promoCode={promoCode}
                        setPromoCode={setPromoCode}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Sticky Footer Summary */}
              {mounted && !isCommercial && currentStep >= 2 && currentStep < totalSteps && (
                <div className="xl:hidden flex-none bg-gray-950 p-4 flex items-center justify-between z-30">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider">Total</span>
                    <span className="text-xl font-display font-bold text-primary">A${(pricingResult?.total || 0).toFixed(2)}</span>
                  </div>
                </div>
              )}
            </div>
          </div>,
          document.body
        )}

        {/* Info Modal / Cleaners Pass */}
        {showInfoModal && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full relative shadow-2xl animate-in zoom-in-95 duration-200 border border-gray-50">
              <button
                onClick={() => setShowInfoModal(false)}
                className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
              <h3 className="text-2xl font-extrabold text-gray-900 mb-4 tracking-tight">
                Cleaners Pass
              </h3>
              <div className="space-y-4 text-gray-600 leading-relaxed text-sm font-medium">
                <p>
                  Schedule regular cleans with us and instantly save up to{" "}
                  <span className="font-extrabold text-primary">15% off</span> per
                  clean! Also gain access to our loyalty and rewards systems to
                  earn up to 25% off per clean, for life!
                </p>
                <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 text-xs">
                  <span className="font-extrabold text-orange-600">Note:</span> Weekly
                  cleans earn the highest discount. The higher the frequency the
                  higher the discount! Regardless of the frequency, our rewards
                  system will increase your discount.
                </div>
                <div className="border-t pt-4">
                  <h4 className="font-bold text-gray-900 mb-1">Cancellations</h4>
                  <p className="text-xs mb-3">
                    Please note, cancellation fees may apply if you opt out of
                    your cleaner's pass within the first 3 cleans.
                  </p>
                  <button className="px-5 py-2.5 bg-black hover:bg-gray-800 text-white rounded-xl text-xs font-bold transition-all">
                    Learn more on our FAQs
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MOBILE STICKY SUMMARY (RESIDENTIAL ONLY) */}
        {mounted &&
          currentStep >= 2 &&
          currentStep < totalSteps &&
          !isCommercial &&
          createPortal(
            <div className="xl:hidden fixed bottom-6 left-4 right-4 z-[9999] animate-in slide-in-from-bottom duration-300 pointer-events-auto">
              <div className="bg-gray-950 text-white p-4 rounded-2xl flex items-center justify-between border border-gray-800 shadow-2xl transition-all duration-300">
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider">
                    Total
                  </span>
                  <span className="text-xl font-display font-bold text-primary">
                    A${(pricingResult?.total || 0).toFixed(2)}
                  </span>
                </div>

                {/* Only show the button when the form is scrolled out of view */}
                {!isFormVisible && (
                  <button
                    onClick={() => {
                      formObserverRef.current?.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                      });
                    }}
                    className="px-6 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 bg-white text-gray-900 hover:bg-gray-100 animate-in fade-in"
                  >
                    Book Now <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>,
            document.body
          )}
      </section>
    </>
  );
};

const RoomCounter = ({ label, count, onUpdate, hasInfo = false }: any) => {
  const getCounterIcon = (lbl: string) => {
    const lower = lbl.toLowerCase();
    if (lower.includes("bedroom")) return Bed;
    if (lower.includes("bathroom")) return Bath;
    if (lower.includes("kitchen")) return ChefHat;
    return Sofa;
  };

  const Icon = getCounterIcon(label);

  return (
    <div className={`w-full bg-white p-4 rounded-[20px] border border-gray-100 flex items-center justify-between shadow-sm transition-all duration-300 hover:border-gray-200 hover:shadow-md ${hasInfo ? "group" : ""}`}>
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-orange-50/70 border border-orange-100 text-primary flex items-center justify-center shadow-sm shrink-0">
          <Icon className="w-5 h-5 text-[#F97316]" />
        </div>
        <div className="flex items-center gap-1">
          <span className="capitalize font-bold text-gray-800 text-sm">
            {label}
          </span>
          {hasInfo && (
            <Info className="w-3.5 h-3.5 text-gray-400 group-hover:text-primary transition-colors cursor-help" />
          )}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => onUpdate(-1)}
          className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors border border-gray-100"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>
        <span className="w-5 text-center font-extrabold text-base text-gray-900">{count}</span>
        <button
          onClick={() => onUpdate(1)}
          className="w-8 h-8 rounded-full bg-[#F97316] flex items-center justify-center text-white hover:bg-[#F97316]/95 transition-all shadow-md shadow-orange-500/10 hover:shadow-orange-500/20 hover:scale-105"
        >
          <Plus className="w-3.5 h-3.5" />
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
      } else {
        setLocalError(null);
        if (setExternalError) setExternalError(null);
        if (onValidityChange) onValidityChange(true);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    setInputFocused(true);
    // Clear error when user starts typing again
    if (localError) {
      setLocalError(null);
      if (setExternalError) setExternalError(null);
      // We don't necessarily set validity to true here, as the new input is unverified,
      // but blocking them from typing is bad UX. 
    }
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
    <label className="text-[10px] font-semibold text-gray-500 uppercase">
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
