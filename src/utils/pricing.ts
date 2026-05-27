// utils/pricing.ts

export const CLEANING_TYPE_PRICES = {
  Standard: 45,
  Deep: 135,
  Vacate: 280,
} as const;

export const HOME_DETAIL_PRICES = {
  Bedroom: 20,
  Bathroom: 45,
  Kitchen: 35,
  Other: 20,
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
    other?: number;
  };
  extras?: Extra[];
  frequency: Frequency;
  actionTakerDiscount?: boolean;
  appliedPromo?: {
    code: string;
    type: 'FIXED_CREDIT' | 'PERCENT_OFF' | 'FREE_CLEAN' | 'REFERRAL';
    value: number;
  };
}

export interface PricingConfig {
  servicePricingConfig: Record<string, { baseRate: number; multiplier: number }>;
  smallServiceFeeConfig: { threshold: number; amount: number };
  homeDetailPrices: Record<string, number>;
  extraPrices: Record<string, number>;
  frequencyDiscounts: Record<string, number>;
  actionTakerDiscount: number;
  timeConfig?: Record<string, number>;
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
  breakdown: {
    cleaningType: { name: string; price: number };
    homeDetails: {
      bedrooms?: number;
      bathrooms?: number;
      kitchens?: number;
      other?: number;
      total: number;
    };
    extras: { items: Array<{ name: string; price: number }>; total: number };
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
    Standard: { baseRate: CLEANING_TYPE_PRICES.Standard, multiplier: 1 },
    Deep: { baseRate: CLEANING_TYPE_PRICES.Deep, multiplier: 1.6 },
    Vacate: { baseRate: CLEANING_TYPE_PRICES.Vacate, multiplier: 1.6 },
  };
  const homeDetailPrices = config?.homeDetailPrices || HOME_DETAIL_PRICES;
  const extraPrices = config?.extraPrices || EXTRA_PRICES;
  const frequencyDiscounts = config?.frequencyDiscounts || FREQUENCY_DISCOUNTS;
  const actionTakerDiscount = config?.actionTakerDiscount ?? ACTION_TAKER_DISCOUNT;
  
  // NOTE: If backend uses multiplier logic, it calculates (rooms * multiplier) + baseRate.
  // The frontend was previously just doing `CLEANING_TYPE_PRICES[request.cleaningType]`.
  // To keep exactly aligned with backend:
  const baseRate = Number(servicePricingConfig[request.cleaningType]?.baseRate ?? 60);
  const multiplier = Number(servicePricingConfig[request.cleaningType]?.multiplier ?? 1);

  // Calculate home details total (roomSum in backend)
  const homeDetailsTotal =
    (request.homeDetails.bedrooms || 0) * (homeDetailPrices['Bedroom'] ?? 20) +
    (request.homeDetails.bathrooms || 0) * (homeDetailPrices['Bathroom'] ?? 45) +
    (request.homeDetails.kitchens || 0) * (homeDetailPrices['Kitchen'] ?? 35) +
    (request.homeDetails.other || 0) * (homeDetailPrices['Other'] ?? 20);

  // Calculate base cleaning type price (aligned with backend logic)
  const cleaningTypePrice = baseRate;
  
  // Subtotal for rooms + baseRate based on multiplier
  const cleaningAndRoomsTotal = (homeDetailsTotal * multiplier) + baseRate;

  // Calculate extras total
  const extrasItems =
    request.extras?.map((extra) => ({
      name: extra,
      price: extraPrices[extra as keyof typeof extraPrices] ?? 0,
    })) || [];

  const extrasTotal = extrasItems.reduce((sum, item) => sum + item.price, 0);

  // Calculate subtotal
  const subtotal = cleaningAndRoomsTotal + extrasTotal;

  // Calculate discounts
  const discounts: PricingResponse['discounts'] = {};
  let totalDiscount = 0;

  // Frequency discount
  const frequencyDiscountPercent = frequencyDiscounts[request.frequency] ?? 0;
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

  // Calculate final total (ensure it doesn't go below 0)
  const total = Math.max(0, subtotal - totalDiscount);

  return {
    subtotal,
    discounts,
    totalDiscount,
    total: Math.round(total * 100) / 100,
    breakdown: {
      cleaningType: { name: request.cleaningType, price: cleaningTypePrice },
      homeDetails: {
        bedrooms: request.homeDetails.bedrooms,
        bathrooms: request.homeDetails.bathrooms,
        kitchens: request.homeDetails.kitchens,
        other: request.homeDetails.other,
        total: homeDetailsTotal,
      },
      extras: { items: extrasItems, total: extrasTotal },
      ...(discounts.promo && { discount: { name: discounts.promo.name, amount: discounts.promo.amount } })
    },
  };
}
