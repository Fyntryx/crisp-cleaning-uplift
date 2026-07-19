// utils/pricing.ts

export const CLEANING_TYPE_PRICES = {
  Standard: 45,
  Deep: 135,
  Vacate: 280,
  Hourly: 0,
} as const;

export const ROOM_PRICES = {
  Regular: {
    Bedroom: 25,
    Bathroom: 50,
    Kitchen: 40,
    Living: 20,
    Other: 30,
  },
  Deep: {
    Bedroom: 40,
    Bathroom: 80,
    Kitchen: 64,
    Living: 30,
    Other: 48,
  },
  Vacate: {
    Bedroom: 40,
    Bathroom: 80,
    Kitchen: 64,
    Living: 35,
    Other: 48,
  },
} as const;

export const EXTRA_PRICES = {
  Windows: 30,
  Walls: 45,
  Cabinets: 30,
  Organisation: 50,
  Blinds: 40,
  'Oven/Stovetops': 45,
  Fridge: 30,
  Dishwasher: 25,
  Garage: 40,
  Microwave: 10,
} as const;

export const FREQUENCY_DISCOUNTS = {
  'One time': 0,
  Weekly: 15,
  Fortnightly: 10,
  Monthly: 5,
} as const;

export const ACTION_TAKER_DISCOUNT = 30;

export const DEFAULT_TIME_CONFIG = {
  regular: { bedroom: 15, bathroom: 20, kitchen: 25, living: 15, other: 10, baseTime: 30 },
  deep: { bedroom: 25, bathroom: 35, kitchen: 40, living: 25, other: 20, baseTime: 45 },
  vacate: { bedroom: 30, bathroom: 40, kitchen: 50, living: 30, other: 25, baseTime: 60 }
};

export const DEFAULT_ADDON_TIMES: Record<string, number> = {
  Windows: 20,
  Walls: 30,
  Cabinets: 20,
  Organisation: 40,
  Blinds: 20,
  'Oven/Stovetops': 30,
  Fridge: 20,
  Dishwasher: 15,
  Garage: 20,
  Microwave: 10,
};

// Type definitions
export type CleaningType = keyof typeof CLEANING_TYPE_PRICES;
export type Extra = keyof typeof EXTRA_PRICES;
export type Frequency = keyof typeof FREQUENCY_DISCOUNTS;

export interface PricingRequest {
  cleaningType: CleaningType;
  homeDetails: {
    bedrooms?: number;
    bathrooms?: number;
    kitchens?: number;
    livingRooms?: number;
    other?: number;
  };
  hourlyDetails?: {
    hours: number;
    cleaners: number;
  };
  extras?: Record<string, number>;
  frequency: Frequency;
  actionTakerDiscount?: boolean;
  appliedPromo?: {
    code: string;
    type: 'FIXED_CREDIT' | 'PERCENT_OFF' | 'FREE_CLEAN' | 'REFERRAL';
    value: number;
    isStackable?: boolean;
  };
  outOfAreaFee?: number;
  condition?: string;
}

export interface PricingConfig {
  servicePricingConfig: Record<string, { baseRate: number; multiplier?: number }>;
  smallServiceFeeConfig: { threshold: number; amount: number };
  roomPrices?: Record<string, Record<string, number>>;
  extraPrices: Record<string, number>;
  frequencyDiscounts: Record<string, number>;
  actionTakerDiscount: number;
  timeConfig?: Record<string, {
    bedroom: number;
    bathroom: number;
    kitchen: number;
    living: number;
    other: number;
    baseTime: number;
  }>;
  addonTimes?: Record<string, number>;
  hourlyRatePerHalfHour?: number;
  systemBlockedDates?: string[];
  systemBlockedTimeSlots?: { date: string, start: string, end: string }[];
  serviceRadiusKm?: number;
  conditionMultipliers?: { heavyBuildUp: number };
}

export interface PricingResponse {
  subtotal: number;
  discounts: {
    frequency?: { name: string; percentage: number; amount: number };
    actionTaker?: { name: string; percentage: number; amount: number };
    promo?: { name: string; amount: number };
  };
  totalDiscount: number;
  total: number;
  outOfAreaFee?: number;
  estimatedMinutes?: number;
  largeServiceDiscountAmount?: number;
  breakdown: {
    cleaningType: { name: string; price: number };
    homeDetails: {
      bedrooms?: number;
      bathrooms?: number;
      kitchens?: number;
      livingRooms?: number;
      other?: number;
      total: number;
    };
    extras: { items: Array<{ name: string; count: number; price: number }>; total: number };
    discount?: { name: string; amount: number };
  };
}

export function calculatePricing(request: PricingRequest, config?: PricingConfig): PricingResponse {
  // Validate required fields
  if (!request.cleaningType || !request.frequency) {
    throw new Error('Missing required fields: cleaningType and frequency');
  }

  // Use dynamic config if provided, otherwise fallback to static constants
  const servicePricingConfig = config?.servicePricingConfig || {
    Standard: { baseRate: CLEANING_TYPE_PRICES.Standard },
    Deep: { baseRate: CLEANING_TYPE_PRICES.Deep },
    Vacate: { baseRate: CLEANING_TYPE_PRICES.Vacate },
  };
  const roomPrices = config?.roomPrices || ROOM_PRICES;
  const extraPrices = config?.extraPrices || EXTRA_PRICES;
  const frequencyDiscounts = config?.frequencyDiscounts || FREQUENCY_DISCOUNTS;
  const actionTakerDiscount = config?.actionTakerDiscount ?? ACTION_TAKER_DISCOUNT;
  
  const mappedCleaningType = request.cleaningType === 'Standard' ? 'Regular' : request.cleaningType;
  const baseRate = Number(servicePricingConfig[mappedCleaningType]?.baseRate ?? 60);

  // Get current room prices
  const currentRoomPrices = roomPrices[mappedCleaningType] || roomPrices.Regular || ROOM_PRICES.Regular;

  // Calculate home details total based on selected service type
  const homeDetailsTotal =
    (request.homeDetails.bedrooms || 0) * (currentRoomPrices.Bedroom ?? 25) +
    (request.homeDetails.bathrooms || 0) * (currentRoomPrices.Bathroom ?? 50) +
    (request.homeDetails.kitchens || 0) * (currentRoomPrices.Kitchen ?? 40) +
    (request.homeDetails.livingRooms || 0) * (currentRoomPrices.Living ?? 20) +
    (request.homeDetails.other || 0) * (currentRoomPrices.Other ?? 30);

  // Calculate baseline home details total for threshold check
  const baselineRoomPrices = roomPrices.Regular || ROOM_PRICES.Regular;
  const baselineHomeDetailsTotal =
    (request.homeDetails.bedrooms || 0) * (baselineRoomPrices.Bedroom ?? 25) +
    (request.homeDetails.bathrooms || 0) * (baselineRoomPrices.Bathroom ?? 50) +
    (request.homeDetails.kitchens || 0) * (baselineRoomPrices.Kitchen ?? 40) +
    (request.homeDetails.livingRooms || 0) * (baselineRoomPrices.Living ?? 20) +
    (request.homeDetails.other || 0) * (baselineRoomPrices.Other ?? 30);

  let cleaningAndRoomsTotal = 0;
  let cleaningTypePrice = baseRate;

  if (request.cleaningType === 'Hourly') {
    const hours = request.hourlyDetails?.hours || 0;
    const cleaners = request.hourlyDetails?.cleaners || 1;
    const ratePerHalfHour = config?.hourlyRatePerHalfHour ?? 47.50;
    
    // Formula: (hours / 0.5) * ratePerHalfHour * cleaners
    cleaningTypePrice = (hours * 2) * ratePerHalfHour * cleaners;
    cleaningAndRoomsTotal = cleaningTypePrice;
  } else {
    cleaningAndRoomsTotal = homeDetailsTotal + baseRate;
    
    if (request.condition === 'Overdue') {
      // Overdue applies a +15% multiplier
      const multiplier = 1.15;
      cleaningAndRoomsTotal = Math.round(cleaningAndRoomsTotal * multiplier);
    } else if (request.condition === 'Heavy Build Up') {
      // Heavy build up applies a +30% multiplier (or custom config)
      const multiplier = config?.conditionMultipliers?.heavyBuildUp ?? 1.3;
      cleaningAndRoomsTotal = Math.round(cleaningAndRoomsTotal * multiplier);
    }
  }

  // Calculate extras total and addon time total
  let extrasItems: Array<{name: string, count: number, price: number, time: number}> = [];
  let extrasTotal = 0;
  let addonTimeTotal = 0;
  
  if (request.cleaningType !== 'Hourly') {
    const addonTimes = config?.addonTimes || DEFAULT_ADDON_TIMES;
    extrasItems = Object.entries(request.extras || {}).map(([extra, count]) => {
      const price = (extraPrices[extra as keyof typeof extraPrices] ?? 0) * count;
      const time = (addonTimes[extra] ?? 0) * count;
      return { name: extra, count, price, time };
    });
    extrasTotal = extrasItems.reduce((sum, item) => sum + item.price, 0);
    addonTimeTotal = extrasItems.reduce((sum, item) => sum + item.time, 0);
  }

  // Calculate subtotal
  const subtotal = cleaningAndRoomsTotal + extrasTotal;

  // Calculate discounts
  const discounts: PricingResponse['discounts'] = {};
  let totalDiscount = 0;

  // Frequency discount
  let frequencyDiscountPercent = frequencyDiscounts[request.frequency] ?? 0;
  if (request.appliedPromo && request.appliedPromo.isStackable === false) {
    frequencyDiscountPercent = 0;
  }
  if (frequencyDiscountPercent > 0) {
    const frequencyDiscountAmount = (subtotal * frequencyDiscountPercent) / 100;
    discounts.frequency = {
      name: `${request.frequency} discount`,
      percentage: frequencyDiscountPercent,
      amount: frequencyDiscountAmount,
    };
    totalDiscount += frequencyDiscountAmount;
  }

  // Action taker discount (applied after frequency discount)
  const discountedSubtotal = subtotal - totalDiscount;
  if (request.actionTakerDiscount) {
    const actionTakerDiscountAmount = actionTakerDiscount; // In backend, it's a flat amount, not a percentage of subtotal! Wait, let's look at backend...
    // Actually, backend does: let actionTakerDiscountAmount = atDiscount;
    discounts.actionTaker = {
      name: 'Action taker discount',
      percentage: actionTakerDiscount, // Misnomer in frontend type, it's actually an amount
      amount: actionTakerDiscountAmount,
    };
    totalDiscount += actionTakerDiscountAmount;
  }

  // Large Service Discount
  let largeServiceDiscountAmount = 0;
  if (config?.smallServiceFeeConfig) {
    if (baselineHomeDetailsTotal > config.smallServiceFeeConfig.threshold) {
      largeServiceDiscountAmount = config.smallServiceFeeConfig.amount;
      // You can add it to the discounts breakdown if you want it to show in UI
      // but in backend it just gets added to totalDiscount.
      totalDiscount += largeServiceDiscountAmount;
    }
  }

  // Promo discount (applied to the subtotal before frequency, or after?
  // Let's apply it to the base subtotal, matching backend logic.
  let promoDiscountAmount = 0;
  if (request.appliedPromo && request.appliedPromo.type !== 'REFERRAL') {
    if (request.appliedPromo.type === 'FREE_CLEAN') {
      promoDiscountAmount = subtotal;
    } else if (request.appliedPromo.type === 'FIXED_CREDIT') {
      promoDiscountAmount = request.appliedPromo.value;
    } else if (request.appliedPromo.type === 'PERCENT_OFF') {
      promoDiscountAmount = (subtotal * request.appliedPromo.value) / 100;
    }
    
    if (promoDiscountAmount > 0) {
      discounts.promo = {
        name: `Promo code (${request.appliedPromo.code})`,
        amount: promoDiscountAmount,
      };
      totalDiscount += promoDiscountAmount;
    }
  }

  const outOfAreaFee = request.outOfAreaFee || 0;

  // Calculate final total (ensure it doesn't go below 0)
  const total = Math.max(0, subtotal - totalDiscount) + outOfAreaFee;

  let estimatedMinutes: number | undefined = undefined;
  if (request.cleaningType === 'Hourly') {
    estimatedMinutes = (request.hourlyDetails?.hours || 0) * 60;
  } else {
    const timeConfigToUse = (config?.timeConfig && Object.keys(config.timeConfig).length > 0) ? config.timeConfig : DEFAULT_TIME_CONFIG;
    const serviceKey = request.cleaningType === 'Standard' ? 'regular' : request.cleaningType.toLowerCase();
    const tc = timeConfigToUse[serviceKey as keyof typeof timeConfigToUse] || timeConfigToUse.regular || DEFAULT_TIME_CONFIG.regular;
    if (tc) {
      const defaultTc = DEFAULT_TIME_CONFIG.regular;
      let mins = (tc.baseTime ?? defaultTc.baseTime) +
        ((request.homeDetails.bedrooms || 0) * (tc.bedroom ?? defaultTc.bedroom)) +
        ((request.homeDetails.bathrooms || 0) * (tc.bathroom ?? defaultTc.bathroom)) +
        ((request.homeDetails.kitchens || 0) * (tc.kitchen ?? defaultTc.kitchen)) +
        ((request.homeDetails.livingRooms || 0) * (tc.living ?? defaultTc.living)) +
        ((request.homeDetails.other || 0) * (tc.other ?? defaultTc.other)) +
        addonTimeTotal;
      
      estimatedMinutes = isNaN(mins) ? undefined : Math.round(mins);
    }
  }

  return {
    subtotal,
    discounts,
    totalDiscount,
    total: Math.round(total * 100) / 100,
    outOfAreaFee,
    estimatedMinutes,
    largeServiceDiscountAmount,
    breakdown: {
      cleaningType: { name: request.cleaningType, price: cleaningTypePrice },
      homeDetails: {
        bedrooms: request.homeDetails.bedrooms,
        bathrooms: request.homeDetails.bathrooms,
        kitchens: request.homeDetails.kitchens,
        livingRooms: request.homeDetails.livingRooms,
        other: request.homeDetails.other,
        total: homeDetailsTotal,
      },
      extras: { items: extrasItems, total: extrasTotal },
      ...(discounts.promo && { discount: { name: discounts.promo.name, amount: discounts.promo.amount } })
    },
  };
}
