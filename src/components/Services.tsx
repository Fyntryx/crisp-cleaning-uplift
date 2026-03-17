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
    className={`bg-gray-900 text-white rounded-3xl p-6 shadow-2xl relative overflow-hidden group hover:shadow-primary/20 transition-all duration-300 ${className}`}>
    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
    <h3 className="text-lg font-display font-bold mb-4 relative z-10">
      Summary
    </h3>
    
    {/* Satisfaction Guaranteed Badge */}
    <div className="relative z-10 group/guarantee mb-4">
      <div className="flex items-center gap-2 bg-green-500/10 text-green-400 border border-green-500/20 px-3 py-2 rounded-lg cursor-help transition-colors hover:bg-green-500/20">
        <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
        <span className="text-sm font-bold">Satisfaction Guaranteed</span>
      </div>
      <div className="absolute top-full left-0 mt-2 w-full bg-gray-800 text-white text-xs p-3 rounded-xl shadow-xl opacity-0 invisible group-hover/guarantee:opacity-100 group-hover/guarantee:visible transition-all duration-300 z-50 border border-gray-700 pointer-events-none">
        Not happy? Receive a 100% refund if you're concerns are not addressed!
      </div>
    </div>

    <div className="space-y-3 relative z-10 text-gray-300 text-sm">
      <div className="flex justify-between border-b border-white/10 pb-3">
        <span>Service Type</span>
        <span className="text-white font-medium capitalize">
          {formData.cleaningType} Clean
        </span>
      </div>
      <div className="flex justify-between border-b border-white/10 pb-3">
        <span>Frequency</span>
        <span className="text-white font-medium capitalize">
          {formData.frequency || "Not Selected"}
        </span>
      </div>
      <div className="py-2">
        <span className="block mb-2 text-xs uppercase tracking-wider text-gray-500">
          Breakdown
        </span>
        {pricingResult?.breakdown.cleaningType && (
          <div className="flex justify-between mb-1">
            <span>{pricingResult.breakdown.cleaningType.name} Clean</span>
            <span>A${pricingResult.breakdown.cleaningType.price}</span>
          </div>
        )}
        {(formData.homeDetails.bedrooms || 0) > 0 && (
          <div className="flex justify-between mb-1">
            <span>{formData.homeDetails.bedrooms}x Bedroom</span>
            <span>
              A$
              {HOME_DETAIL_PRICES.Bedroom *
                (formData.homeDetails.bedrooms || 0)}
            </span>
          </div>
        )}
        {(formData.homeDetails.bathrooms || 0) > 0 && (
          <div className="flex justify-between mb-1">
            <span>{formData.homeDetails.bathrooms}x Bathroom</span>
            <span>
              A$
              {HOME_DETAIL_PRICES.Bathroom *
                (formData.homeDetails.bathrooms || 0)}
            </span>
          </div>
        )}
        {(formData.homeDetails.kitchens || 0) > 0 && (
          <div className="flex justify-between mb-1">
            <span>{formData.homeDetails.kitchens}x Kitchen</span>
            <span>
              A$
              {HOME_DETAIL_PRICES.Kitchen *
                (formData.homeDetails.kitchens || 0)}
            </span>
          </div>
        )}
        {(formData.homeDetails.other || 0) > 0 && (
          <div className="flex justify-between mb-1">
            <span>{formData.homeDetails.other}x Other Area</span>
            <span>
              A${HOME_DETAIL_PRICES.Other * (formData.homeDetails.other || 0)}
            </span>
          </div>
        )}
        {pricingResult?.breakdown.extras.items.map((e: any) => (
          <div key={e.name} className="flex justify-between mb-1">
            <span>+ {e.name}</span>
            <span>A${e.price}</span>
          </div>
        ))}
      </div>

      {/* --- PROMO CODE SECTION --- */}
      <div className="py-2 border-t border-white/10">
        <div className="relative flex items-center mt-2">
          <Tag className="absolute left-3 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Promo Code"
            className="w-full bg-gray-800/50 border border-gray-700 text-white text-sm rounded-xl py-2.5 pl-9 pr-20 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-gray-500"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
          />
          <button className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-gray-700 hover:bg-primary hover:text-white text-gray-300 text-xs font-bold rounded-lg transition-all">
            Apply
          </button>
        </div>
      </div>

      <div className="pt-3 mt-1 border-t border-white/20">
        {pricingResult?.discounts.frequency && (
          <div className="flex justify-between text-green-400 mb-2">
            <span>Discount ({pricingResult.discounts.frequency.name})</span>
            <span>-A${pricingResult.discounts.frequency.amount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between items-end">
          <span className="text-lg">Total</span>
          <span className="text-2xl font-display font-bold text-primary">
            A${(pricingResult?.total || 0).toFixed(2)}
          </span>
        </div>
        {formData.frequency &&
          formData.frequency !== "One time" && (
            <p className="text-xs text-gray-400 mt-2">
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
    serviceCategory: "",
    cleaningType: "Regular" as CleaningType,
    homeDetails: { bedrooms: 0, bathrooms: 0, kitchens: 0, other: 0 },
    extras: [] as Extra[],
    frequency: "One time" as Frequency,
    selectedDays: [] as string[],
    selectedDate: undefined as Date | undefined,
    selectedTime: "",
    instructions: { entry: "", parking: "", pets: "", notes: "" },

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

  const renderStep1 = () => (
    <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto animate-in fade-in slide-in-from-right duration-500 h-full content-center">
      {servicesList.map((service) => (
        <div
          key={service.id}
          onClick={() =>
            setFormData({ ...formData, serviceCategory: service.id })
          }
          className={`group glass-card border-2 rounded-3xl p-8 cursor-pointer transition-all duration-200 relative overflow-hidden hover:shadow-xl hover:border-primary ${formData.serviceCategory === service.id
            ? "bg-primary/5 border-primary shadow-md"
            : "bg-secondary/10 border-transparent hover:border-primary"
            }`}>
          <div
            className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm transition-colors duration-300 ${formData.serviceCategory === service.id
              ? "bg-primary text-white"
              : "bg-white text-primary"
              }`}>
            <service.icon className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-display font-semibold mb-3">
            {service.title}
          </h3>
          <p className="text-muted-foreground leading-relaxed text-sm">
            {service.description}
          </p>
          <div
            className={`absolute top-6 right-6 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${formData.serviceCategory === service.id
              ? "border-primary bg-primary"
              : "border-gray-300"
              }`}>
            {formData.serviceCategory === service.id && (
              <CheckCircle2 className="w-4 h-4 text-white" />
            )}
          </div>
        </div>
      ))}
    </div>
  );

  const renderResStep2 = () => (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-right duration-500 min-h-full flex flex-col justify-start md:justify-center gap-6 py-4 md:py-0">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cleaningTypesUI.map((type) => (
          <button
            key={type.id}
            onClick={() =>
              setFormData({
                ...formData,
                cleaningType: type.id as CleaningType,
              })
            }
            className={`p-6 rounded-2xl border-2 transition-all duration-200 flex flex-col items-center gap-3 hover:shadow-xl hover:border-primary ${formData.cleaningType === type.id
              ? "bg-white border-primary shadow-lg ring-1 ring-primary/20"
              : "bg-white border-gray-100"
              }`}>
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center ${type.bg} ${type.color}`}>
              <type.icon className="w-6 h-6" />
            </div>
            <span className="font-semibold text-gray-800">{type.label}</span>
            {formData.cleaningType === type.id && (
              <div className="w-2 h-2 rounded-full bg-primary mt-1" />
            )}
          </button>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="font-display font-bold text-xl text-foreground text-center md:text-left">
            Room Details <span className="text-red-500 ml-1 font-bold">*</span>
          </h3>
          <div className="space-y-2">
            <RoomCounter
              label="Bedrooms"
              count={formData.homeDetails.bedrooms || 0}
              onUpdate={(v) => updateRooms("bedrooms", v)}
            />
            <RoomCounter
              label="Bathrooms"
              count={formData.homeDetails.bathrooms || 0}
              onUpdate={(v) => updateRooms("bathrooms", v)}
            />
            <RoomCounter
              label="Kitchens"
              count={formData.homeDetails.kitchens || 0}
              onUpdate={(v) => updateRooms("kitchens", v)}
            />
            <div className="relative group">
              <RoomCounter
                label="Other Areas"
                count={formData.homeDetails.other || 0}
                onUpdate={(v) => updateRooms("other", v)}
                hasInfo={true}
              />
              <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 p-3 bg-gray-900 text-white text-xs rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 pointer-events-none">
                This includes living rooms, studies, laundries, theatres, gyms,
                etc.
                <div className="absolute left-1/2 -translate-x-1/2 top-full w-2 h-2 bg-gray-900 rotate-45"></div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h3 className="font-display font-bold text-xl text-foreground mb-4 text-center md:text-left">
            Extras
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {(Object.keys(EXTRA_PRICES) as Extra[])
              .filter(
                (extra) => !["Garage", "Laundry"].includes(extra)
              )
              .map((extra) => (
                <button
                  key={extra}
                  onClick={() => toggleExtra(extra)}
                  className={`p-3 text-xs font-medium rounded-xl border-2 transition-all duration-200 truncate hover:shadow-md hover:border-primary ${formData.extras?.includes(extra)
                    ? "bg-primary/10 border-primary text-primary"
                    : "bg-white border-gray-100 text-gray-500"
                    }`}>
                  {extra}
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );

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

    const frequencyGroups = {
      oneTime: ["One time"],
      regular: ["Weekly", "Fortnightly", "Monthly"],
    };

    return (
      <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-right duration-500 flex flex-col justify-start md:justify-center py-2">
        <div className="mb-6">
          <label className="block text-base font-display font-bold text-foreground mb-3">
            How often?
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() =>
                setFormData({ ...formData, frequency: "One time" })
              }
              className={`p-4 rounded-xl border-2 flex items-center justify-center transition-all duration-200 hover:border-primary/50 ${formData.frequency === "One time"
                ? "bg-white border-primary shadow-md text-primary font-bold"
                : "bg-white border-gray-200 text-gray-600"
                }`}>
              One Time Clean
            </button>
            <div className="flex gap-2">
              {frequencyGroups.regular.map((freq) => (
                <div key={freq} className="flex-1 relative group">
                  <button
                    onClick={() =>
                      setFormData({ ...formData, frequency: freq as Frequency })
                    }
                    className={`w-full h-full p-2 rounded-xl border-2 flex flex-col items-center justify-center transition-all duration-200 hover:border-orange-300 ${formData.frequency === freq
                      ? "bg-orange-50 border-orange-500 shadow-md text-orange-600 font-bold"
                      : "bg-white border-gray-200 text-gray-600"
                      }`}>
                    <span className="text-xs sm:text-sm">{freq}</span>
                    {FREQUENCY_DISCOUNTS[freq as Frequency] > 0 && (
                      <span className="text-[10px] bg-orange-200 text-orange-800 px-1.5 rounded-full mt-1">
                        -{FREQUENCY_DISCOUNTS[freq as Frequency]}%
                      </span>
                    )}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowInfoModal(true);
                    }}
                    className="absolute -top-2 -right-2 p-1 rounded-full bg-gray-200 hover:bg-orange-500 hover:text-white text-gray-500 transition-colors z-10 shadow-sm">
                    <Info className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white border-2 border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <span className="font-display font-bold text-lg text-foreground">
                Select Date{" "}
                <span className="text-red-500 ml-1 font-bold">*</span>
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevMonth}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                  <ChevronLeft className="w-4 h-4 text-gray-600" />
                </button>
                <span className="text-sm text-gray-500 font-medium w-32 text-center">
                  {monthName}
                </span>
                <button
                  onClick={handleNextMonth}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                  <ChevronRight className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2 text-gray-400 font-bold">
              {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                <div key={`${d}-${i}`}>{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                <div key={`empty-${i}`} className="h-10 w-full" />
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
                    className={`h-10 w-full rounded-xl flex flex-col items-center justify-center text-sm transition-all relative ${selected
                      ? "bg-primary text-white shadow-md font-bold"
                      : ""
                      } ${past
                        ? "text-gray-300 cursor-not-allowed bg-gray-50/50"
                        : "hover:bg-gray-100 text-gray-600"
                      } ${todayMark && !selected
                        ? "text-primary font-bold bg-orange-50"
                        : ""
                      }`}>
                    {day}
                    {todayMark && (
                      <span
                        className={`absolute bottom-1.5 w-1 h-1 rounded-full ${selected ? "bg-white" : "bg-primary"
                          }`}></span>
                    )}
                  </button>
                );
              })}
            </div>
            <p className="text-[10px] text-gray-400 mt-2 text-center">
              * Bookings must be made at least 48 hours in advance.
            </p>
          </div>
          <div className="md:col-span-1 flex flex-col">
            <label className="block text-base font-display font-bold text-foreground mb-3">
              Start Time <span className="text-red-500 ml-1 font-bold">*</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-1 gap-2 overflow-y-auto pr-2 custom-scrollbar flex-grow max-h-[300px]">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, selectedTime: time }))
                  }
                  className={`p-3 rounded-xl border-2 text-xs font-medium transition-all duration-200 hover:shadow-md hover:border-primary ${formData.selectedTime === time
                    ? "bg-primary text-white border-primary"
                    : "bg-white border-gray-100 text-gray-600"
                    }`}>
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderResStep4 = () => (
    <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-right duration-500 flex flex-col justify-start md:justify-center gap-4 py-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-3xl border-2 border-gray-100 hover:border-primary/30 hover:shadow-lg transition-all duration-200">
          <label className="block text-base font-display font-bold text-foreground mb-2">
            How do we get in? <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full p-2 bg-gray-50 rounded-xl border-none outline-none focus:ring-2 focus:ring-primary/20 text-gray-700 font-medium cursor-pointer text-sm"
            value={formData.instructions.entry}
            onChange={(e) =>
              setFormData({
                ...formData,
                instructions: {
                  ...formData.instructions,
                  entry: e.target.value,
                },
              })
            }>
            <option value="" disabled>
              Select an option
            </option>
            <option>I will be home</option>
            <option>I will leave a key</option>
            <option>I will provide a lockbox/access key</option>
            <option>Other (Please Specify)</option>
          </select>
        </div>
        <div className="bg-white p-4 rounded-3xl border-2 border-gray-100 hover:border-primary/30 hover:shadow-lg transition-all duration-200">
          <label className="block text-base font-display font-bold text-foreground mb-2">
            Parking <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full p-2 bg-gray-50 rounded-xl border-none outline-none focus:ring-2 focus:ring-primary/20 text-gray-700 font-medium cursor-pointer text-sm"
            value={formData.instructions.parking}
            onChange={(e) =>
              setFormData({
                ...formData,
                instructions: {
                  ...formData.instructions,
                  parking: e.target.value,
                },
              })
            }>
            <option value="" disabled>
              Select an option
            </option>
            <option>I will provide parking onsite</option>
            <option>There is free parking nearby/on the street</option>
            <option>Other (Please Specify)</option>
          </select>
        </div>
        <div className="bg-white p-4 rounded-3xl border-2 border-gray-100 hover:border-primary/30 hover:shadow-lg transition-all duration-200">
          <label className="block text-base font-display font-bold text-foreground mb-2">
            Pets <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full p-2 bg-gray-50 rounded-xl border-none outline-none focus:ring-2 focus:ring-primary/20 text-gray-700 font-medium cursor-pointer text-sm"
            value={formData.instructions.pets}
            onChange={(e) =>
              setFormData({
                ...formData,
                instructions: {
                  ...formData.instructions,
                  pets: e.target.value,
                },
              })
            }>
            <option value="" disabled>
              Select an option
            </option>
            <option>Dog/Cat</option>
            <option>No Pets</option>
            <option>Other</option>
          </select>
        </div>
      </div>
      <div className="bg-white p-4 rounded-3xl border-2 border-gray-100 hover:border-primary/30 hover:shadow-lg transition-all duration-200">
        <label className="block text-base font-display font-bold text-foreground mb-2">
          Additional Notes
        </label>
        <textarea
          className="w-full p-3 bg-gray-50 rounded-xl border-transparent focus:ring-2 focus:ring-primary/20 outline-none resize-none h-24 text-gray-700 text-sm"
          placeholder="Please focus on the kitchen..."
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
    <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-right duration-500 h-full flex flex-col justify-center">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-display font-bold text-gray-900 mb-2">
          Tell Us About Your Business
        </h3>
        <p className="text-gray-500">
          Let's start with some basic information about your business.
        </p>
      </div>
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-bold text-gray-800">
            Business Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter business name"
            className="w-full p-4 bg-white border-2 border-gray-100 rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
            value={formData.commercial.businessName}
            onChange={(e) => updateComm("businessName", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-bold text-gray-800">
            Business Size <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              className="w-full p-4 bg-white border-2 border-gray-100 rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all appearance-none cursor-pointer"
              value={formData.commercial.businessSize}
              onChange={(e) => updateComm("businessSize", e.target.value)}>
              <option value="" disabled>
                Select business size
              </option>
              {commBusinessSizes.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
            <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 rotate-90" />
          </div>
        </div>
      </div>
    </div>
  );

  const renderCommStep3 = () => (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-right duration-500 h-full flex flex-col justify-center">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-display font-bold text-gray-900 mb-2">
          What Needs Cleaning
        </h3>
        <p className="text-gray-500">
          Tell us about your cleaning requirements.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-10">
        <div className="space-y-4">
          <label className="block text-sm font-bold text-gray-800">
            Type of Environment <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            {commEnvironments.map((env) => (
              <button
                key={env}
                onClick={() => updateComm("environment", env)}
                className={`p-3 text-xs font-medium rounded-xl border-2 transition-all duration-200 text-center hover:border-primary hover:shadow-md truncate
                              ${formData.commercial.environment === env
                    ? "bg-primary text-white border-primary shadow-md"
                    : "bg-white border-gray-100 text-gray-600"
                  }
                            `}>
                {env}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <label className="block text-sm font-bold text-gray-800">
            Type of Clean <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 gap-2">
            {commCleanTypes.map((type) => (
              <button
                key={type}
                onClick={() => updateComm("cleanType", type)}
                className={`p-4 text-sm font-medium rounded-xl border-2 transition-all duration-200 text-left px-5 hover:border-primary hover:shadow-md
                              ${formData.commercial.cleanType === type
                    ? "bg-primary text-white border-primary shadow-md"
                    : "bg-white border-gray-100 text-gray-600"
                  }
                            `}>
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderCommStep4 = () => (
    <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-right duration-500 h-full flex flex-col justify-center">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-display font-bold text-gray-900 mb-2">
          How Often
        </h3>
        <p className="text-gray-500">When do you need cleaning services?</p>
      </div>
      <div className="space-y-8">
        <div className="space-y-4">
          <label className="block text-sm font-bold text-gray-800">
            Frequency <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {commFrequencies.map((freq) => (
              <button
                key={freq}
                onClick={() => updateComm("frequency", freq)}
                className={`py-3 rounded-xl border-2 font-medium text-xs sm:text-sm transition-all hover:border-primary
                              ${formData.commercial.frequency === freq
                    ? "bg-primary text-white border-primary shadow-md"
                    : "bg-white border-gray-100 text-gray-600"
                  }
                            `}>
                {freq}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-bold text-gray-800">
            Availability (Days of Week)
          </label>
          <div className="flex gap-2 flex-wrap justify-center">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
              <button
                key={day}
                onClick={() => toggleDay(day)}
                className={`w-12 h-12 rounded-full border-2 text-sm font-bold transition-all hover:border-primary
                              ${formData.commercial.days.includes(day)
                    ? "bg-primary text-white border-primary shadow-md"
                    : "bg-white border-gray-100 text-gray-600"
                  }
                            `}>
                {day}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderCommStep5 = () => (
    <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-right duration-500 h-full flex flex-col justify-center">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-display font-bold text-gray-900 mb-2">
          Insurance & Budget
        </h3>
        <p className="text-gray-500">
          Let's discuss insurance requirements and your budget.
        </p>
      </div>
      <div className="space-y-8">
        <div className="bg-white p-6 rounded-2xl border-2 border-gray-100">
          <label className="flex items-start gap-4 cursor-pointer group">
            <div
              className={`mt-1 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${formData.commercial.insuranceRequired
                ? "bg-primary border-primary"
                : "border-gray-300 bg-gray-50"
                }`}>
              <input
                type="checkbox"
                className="hidden"
                checked={formData.commercial.insuranceRequired}
                onChange={(e) =>
                  updateComm("insuranceRequired", e.target.checked)
                }
              />
              {formData.commercial.insuranceRequired && (
                <CheckCircle2 className="w-4 h-4 text-white" />
              )}
            </div>
            <div>
              <span className="block font-bold text-gray-800 group-hover:text-primary transition-colors">
                Insurance and bonding documentation required
              </span>
              <span className="text-sm text-gray-500 mt-1 block">
                Check this if you require our team to provide insurance and
                bonding documentation before service begins.
              </span>
            </div>
          </label>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-bold text-gray-800">
            Monthly Budget <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {commBudgets.map((bg) => (
              <button
                key={bg}
                onClick={() => updateComm("budget", bg)}
                className={`py-3 px-2 rounded-xl border-2 font-medium text-xs sm:text-sm transition-all hover:border-primary truncate
                              ${formData.commercial.budget === bg
                    ? "bg-primary text-white border-primary shadow-md"
                    : "bg-white border-gray-100 text-gray-600"
                  }
                            `}>
                {bg}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderCommStep6 = () => (
    <div className="max-w-xl mx-auto animate-in fade-in slide-in-from-right duration-500 h-full flex flex-col justify-center">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-display font-bold text-gray-900 mb-2">
          Sign Up
        </h3>
        <p className="text-gray-500">
          Provide your business contact information for the service agreement.
        </p>
      </div>
      <div className="space-y-4 bg-white p-8 rounded-3xl border-2 border-gray-100 shadow-xl">
        <div className="space-y-1">
          <label className="text-xs font-display font-bold uppercase text-foreground">
            Primary Contact <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Primary contact person name"
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-primary transition-all"
            value={formData.contact.firstName}
            onChange={(e) => updateContact("firstName", e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-display font-bold uppercase text-foreground">
              Business Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="business@company.com"
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-primary transition-all"
              value={formData.contact.email}
              onChange={(e) => updateContact("email", e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-display font-bold uppercase text-foreground">
              Business Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              placeholder="(03) 1234 5678"
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-primary transition-all"
              value={formData.contact.phone}
              onChange={(e) => updateContact("phone", e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-xs font-display font-bold uppercase text-foreground">
            Business Address <span className="text-red-500">*</span>
          </label>
          <AddressAutocomplete
            value={formData.contact.address}
            onChange={(value) => updateContact("address", value)}
            placeholder="Full business address"
            inputClassName="p-3 border border-gray-200 rounded-lg"
            onValidityChange={setIsAddressValid} // Pass validity handler
          />
        </div>

        <div className="pt-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary accent-primary"
              checked={formData.contact.terms}
              onChange={(e) => updateContact("terms", e.target.checked)}
            />
            <span className="text-xs text-gray-500">
              I accept the{" "}
              <a href="#" className="underline text-primary">
                Commercial Service Agreement
              </a>
            </span>
          </label>
        </div>

        {submitError && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
            {submitError}
          </div>
        )}
        {submitSuccess && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">
            {submitSuccess}
          </div>
        )}
        <button
          onClick={handleSubmit}
          disabled={isSubmitting || !isAddressValid} // Block if invalid
          className="w-full mt-4 bg-primary text-white py-4 rounded-xl font-bold shadow-lg shadow-primary/25 hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
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
    <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-right duration-500 flex flex-col justify-start md:justify-center py-2">
      <div className="items-start">
        <div className="space-y-4">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-display font-bold text-gray-900 mb-2">Finalise Booking</h3>
            <p className="text-gray-500">Just a few more details to secure your booking.</p>
          </div>
          <h3 className="text-xl font-display font-bold mb-4">
            Contact Details
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <InputField
              icon={User}
              label="First Name"
              placeholder="John"
              value={formData.contact.firstName}
              onChange={(v: string) => updateContact("firstName", v)}
            />
            <InputField
              icon={User}
              label="Last Name"
              placeholder="Doe"
              value={formData.contact.lastName}
              onChange={(v: string) => updateContact("lastName", v)}
            />
          </div>
          <InputField
            icon={Mail}
            label="Email Address"
            placeholder="john@example.com"
            type="email"
            value={formData.contact.email}
            onChange={(v: string) => updateContact("email", v)}
          />
          <div className="space-y-1 group">
            <label className="text-[10px] font-semibold text-gray-500 uppercase">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full pl-4 pr-10 py-2.5 bg-gray-50 rounded-xl outline-none border-2 border-transparent focus:border-primary focus:bg-white transition-all hover:border-gray-200 text-sm"
                placeholder="Create a password"
                value={formData.contact.password}
                onChange={(e) => updateContact("password", e.target.value)}
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600">
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
          <InputField
            icon={Phone}
            label="Phone Number"
            placeholder="+61 ..."
            type="tel"
            value={formData.contact.phone}
            onChange={(v: string) => updateContact("phone", v)}
          />
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-500 uppercase">
              Service Address
            </label>
            <AddressAutocomplete
              value={formData.contact.address}
              onChange={(value) => updateContact("address", value)}
              placeholder="123 Clean St..."
              showLocationButton={true}
              onLocationClick={handleUseCurrentLocation}
              isLoadingLocation={isLoadingLoc}
              onValidityChange={setIsAddressValid} // Pass validity handler
            />
          </div>
          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="terms"
              className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary/20 accent-primary cursor-pointer"
              checked={formData.contact.terms}
              onChange={(e) => updateContact("terms", e.target.checked)}
            />
            <label
              htmlFor="terms"
              className="text-xs text-gray-500 cursor-pointer select-none">
              I accept the{" "}
              <a
                href="#"
                className="underline hover:text-primary transition-colors">
                Terms & Conditions
              </a>
            </label>
          </div>
          {submitError && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
              {submitError}
            </div>
          )}
          {submitSuccess && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">
              {submitSuccess}
            </div>
          )}
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !isAddressValid} // Block if invalid
            className="w-full mt-4 bg-primary text-white py-4 rounded-xl font-bold shadow-lg shadow-primary/25 hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                Book Now & Pay <CreditCard className="w-4 h-4" />
              </>
            )}
          </button>
          <p className="text-center text-xs text-gray-500 mt-4">
            Already have an account?{" "}
            <button className="font-bold text-primary hover:underline transition-all">
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
    if (isCommercial) return "";

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
        className="w-full relative flex flex-col justify-center">
        
        {/* INLINE STEP 1 CONTAINER */}
        <div className="w-full bg-white rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden pt-10 pb-10 px-6 sm:px-8 flex flex-col items-center">
            
          <div className="text-center mb-6">
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider rounded-full mb-3">
               Step 1 of {totalSteps}
            </span>
            <h2 className="text-2xl md:text-3xl font-display font-bold">Choose Service</h2>
            <p className="text-gray-500 mt-2 text-sm">Select the type of cleaning service you require.</p>
          </div>

          <div className="w-full mb-6">
             {renderStep1()}
          </div>

          <button
             onClick={() => {
               if (currentStep === 1 && isStepValid()) {
                 setCurrentStep(2);
                 setIsModalOpen(true);
               } else if (currentStep > 1) {
                 setIsModalOpen(true);
               }
             }}
             disabled={currentStep === 1 && !isStepValid()}
             className={`px-10 py-3.5 text-base rounded-full font-bold transition-all shadow-lg hover:shadow-xl flex items-center gap-2 ${
               (currentStep === 1 && !isStepValid())
                 ? "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none hover:shadow-none"
                 : "bg-black text-white hover:bg-gray-800 hover:scale-[1.02]"
             }`}>
             {currentStep > 1 ? "Resume Booking" : "Continue"}
             <ChevronRight className="w-5 h-5 ml-1" />
          </button>
        </div>
      </section>

      {/* OVERLAY BOOKING MODAL FOR STEPS >= 2 */}
      {mounted && isModalOpen && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-6xl h-[90vh] md:h-[85vh] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col relative animate-in zoom-in-95 duration-300">
              
              {/* Modal Header */}
              <div className="flex-none bg-white px-6 py-4 border-b border-gray-100 flex items-center justify-between relative shadow-sm z-20">
                <div className="flex items-center gap-4">
                  <button
                    onClick={handlePrevModal}
                    className="w-10 h-10 bg-gray-50 hover:bg-gray-100 rounded-full flex items-center justify-center shadow-sm transition-all text-gray-600">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <div>
                    <span className="block text-[10px] sm:text-xs font-bold uppercase text-primary tracking-wider">
                      Step {currentStep} of {totalSteps}
                    </span>
                    <h2 className="text-lg sm:text-xl md:text-2xl font-display font-bold">
                      {getStepTitle()}
                    </h2>
                  </div>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-10 h-10 bg-gray-50 hover:bg-red-50 rounded-full flex items-center justify-center transition-colors text-gray-500 hover:text-red-500">
                  <X className="w-5 h-5" />
                </button>
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
                       <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
                         <button
                           onClick={handleNext}
                           disabled={!isStepValid()}
                           className={`px-8 py-3 rounded-full font-bold text-sm transition-all flex items-center gap-2 ${
                             !isStepValid()
                               ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                               : "bg-black text-white hover:bg-gray-800 shadow-md hover:shadow-lg"
                           }`}>
                           Continue
                           <ChevronRight className="w-4 h-4 ml-1" />
                         </button>
                       </div>
                    )}
                 </div>

                 {/* Right Column (Sticky Summary - Only for Residential) */}
                 {!isCommercial && (
                   <div className="w-full xl:w-[35%] bg-gray-50 border-t xl:border-t-0 xl:border-l border-gray-200 overflow-y-auto custom-scrollbar flex-col justify-between hidden xl:flex">
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
                 <div className="xl:hidden flex-none bg-gray-900 p-4 flex items-center justify-between z-30">
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
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full relative shadow-2xl animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowInfoModal(false)}
              className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
              <X className="w-5 h-5 text-gray-500" />
            </button>
            <h3 className="text-2xl font-display font-bold mb-4 text-gray-900">
              Cleaners Pass
            </h3>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Schedule regular cleans with us and instantly save up to{" "}
                <span className="font-bold text-primary">15% off</span> per
                clean! Also gain access to our loyalty and rewards systems to
                earn up to 25% off per clean, for life!
              </p>
              <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 text-sm">
                <span className="font-bold text-orange-600">Note:</span> Weekly
                cleans earn the highest discount. The higher the frequency the
                higher the discount! Regardless of the frequency, our rewards
                system will increase your discount
              </div>
              <div className="border-t pt-4">
                <h4 className="font-bold text-gray-900 mb-1">Cancellations</h4>
                <p className="text-sm mb-3">
                  Please note, cancellation fees may apply if you opt out of
                  your cleaner's pass within the first 3 cleans.
                </p>
                <button className="px-4 py-2 bg-black text-white rounded-lg text-sm font-bold">
                  Learn more on our FAQs
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MOBILE STICKY SUMMARY (RESIDENTIAL ONLY) */}
     {/* MOBILE STICKY SUMMARY (RESIDENTIAL ONLY) */}
      {mounted &&
        currentStep >= 2 &&
        currentStep < totalSteps &&
        !isCommercial &&
        createPortal(
          <div className="xl:hidden fixed bottom-6 left-4 right-4 z-[9999] animate-in slide-in-from-bottom duration-300 pointer-events-auto">
            <div className="bg-gray-900 text-white p-4 rounded-2xl flex items-center justify-between border border-gray-700 shadow-2xl transition-all duration-300">
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
                    // Simply scroll back to the form
                    formObserverRef.current?.scrollIntoView({ 
                      behavior: "smooth", 
                      block: "center" 
                    });
                  }}
                  className="px-6 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 bg-white text-gray-900 hover:bg-gray-100 animate-in fade-in slide-in-from-right-4 duration-300"
                >
                  Book Now <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>,
          document.body
        )}
      <div className="container mx-auto px-4 md:px-6 relative z-10 h-full py-4 md:py-8 flex items-center justify-center gap-8">
        <div
          ref={formObserverRef}
          className={`bg-white rounded-[2.5rem] border border-gray-100 relative overflow-hidden w-full h-auto max-h-[90vh] flex flex-col transition-all duration-500 shadow-2xl ${!isCommercial && currentStep >= 2 && currentStep < totalSteps
            ? "max-w-4xl"
            : "max-w-6xl"
            }`}>
          {/* Header */}
          <div className="flex-none px-8 pt-8 pb-2 text-center relative">
            {currentStep > 1 && (
              <button
                onClick={handlePrev}
                className="absolute left-8 top-8 w-10 h-10 bg-white hover:bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center shadow-md transition-all z-20 group hover:scale-110">
                <ChevronLeft className="w-5 h-5 text-gray-400 group-hover:text-gray-900" />
              </button>
            )}
            {currentStep < totalSteps && (
              <button
                onClick={handleNext}
                disabled={!validStep}
                className={`absolute right-8 top-8 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all z-20 group ${!validStep
                  ? "bg-gray-100 cursor-not-allowed opacity-50"
                  : "bg-black hover:bg-gray-800 hover:scale-110 cursor-pointer"
                  }`}>
                <ChevronRight
                  className={`w-5 h-5 ${!validStep ? "text-gray-400" : "text-white"
                    }`}
                />
              </button>
            )}
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider rounded-full mb-2">
              Step {currentStep} of {totalSteps}
            </span>
            <h2 className="text-2xl md:text-3xl font-display font-bold">
              {getStepTitle()}
            </h2>
          </div>

          {/* FIXED: Added md:pb-12 to the main content container to mirror top padding */}
          <div 
            ref={formContentRef}
            className="flex-grow overflow-y-auto px-6 md:px-16 py-4 md:pb-12 custom-scrollbar">
            {renderContent()}
          </div>

          <div className="flex-none pb-6 pt-2 flex justify-center gap-2 relative z-20">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <div
                key={index}
                className={`h-1.5 rounded-full transition-all duration-500 ease-out ${index + 1 === currentStep
                  ? "w-8 bg-black"
                  : "w-1.5 bg-gray-200"
                  }`}
              />
            ))}
          </div>
        </div>

        {/* Desktop Sidebar Summary (RESIDENTIAL ONLY) */}
        {!isCommercial && currentStep >= 2 && currentStep < totalSteps && (
          <div className="hidden xl:block w-80 flex-shrink-0 animate-in fade-in slide-in-from-right duration-500">
            <BookingSummaryCard
              formData={formData}
              pricingResult={pricingResult}
              promoCode={promoCode}
              setPromoCode={setPromoCode}
            />
          </div>
        )}
      </div>
    </section>
  );
};

const RoomCounter = ({ label, count, onUpdate, hasInfo = false }: any) => (
  <div
    className={`flex items-center justify-between bg-gray-50 p-3 rounded-2xl border-2 border-transparent hover:border-gray-100 hover:shadow-md transition-all ${hasInfo ? "group" : ""
      }`}>
    <div className="flex items-center gap-1.5">
      <span className="capitalize font-medium text-gray-700 text-sm">
        {label}
      </span>
      {hasInfo && (
        <Info className="w-3.5 h-3.5 text-gray-400 group-hover:text-primary transition-colors cursor-help" />
      )}
    </div>
    <div className="flex items-center gap-3">
      <button
        onClick={() => onUpdate(-1)}
        className="w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition-colors border border-gray-100">
        <Minus className="w-3 h-3" />
      </button>
      <span className="w-4 text-center font-bold text-base">{count}</span>
      <button
        onClick={() => onUpdate(1)}
        className="w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-600 hover:bg-orange-50 hover:text-orange-500 transition-colors border border-gray-100">
        <Plus className="w-3 h-3" />
      </button>
    </div>
  </div>
);

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
