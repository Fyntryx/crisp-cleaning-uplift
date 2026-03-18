/* eslint-disable @typescript-eslint/no-explicit-any */

// IMPORTANT: Set this to your main application's URL
const MAIN_APP_URL = process.env.NEXT_PUBLIC_MAIN_APP_URL || 'https://your-main-app.com';

const MELBOURNE_CBD = { lat: -37.8136, lon: 144.9631 };
let MAX_RADIUS_KM = 50; // Dynamic default
const GEOAPIFY_API_KEY = process.env.NEXT_PUBLIC_GEOAPIFY_KEY;

/**
 * NEW: Call this function on app load (or start of booking) to sync with Admin settings
 */
export async function syncServiceRadius() {
  try {
    const response = await fetch(`${MAIN_APP_URL}/api/settings`);
    const data = await response.json();
    if (data.success && data.pricing?.serviceRadiusKm) {
        MAX_RADIUS_KM = Number(data.pricing.serviceRadiusKm);
        console.log(`[GEO] Service radius synced: ${MAX_RADIUS_KM}km`);
    }
  } catch (error) {
    console.warn("[GEO] Could not sync radius, using fallback 50km:", error);
  }
}

export interface Address {
  street?: string;
  houseNumber?: string;
  city?: string;
  state?: string;
  postcode?: string;
  country?: string;
  fullAddress: string;
  coordinates: { lat: number; lon: number; };
}

export interface ServiceabilityResult {
  serviceable: boolean;
  distanceKm: number;
  error?: string;
}

function deg2rad(deg: number): number { return deg * (Math.PI / 180); }

function calculateHaversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Number((R * c).toFixed(2));
}

/**
 * Checks serviceability. If syncServiceRadius() was called, it uses the Admin's value.
 */
export function checkAddressServiceability(lat: number, lon: number): ServiceabilityResult {
  const distance = calculateHaversineDistance(MELBOURNE_CBD.lat, MELBOURNE_CBD.lon, lat, lon);
  
  return {
    serviceable: distance <= MAX_RADIUS_KM,
    distanceKm: distance,
    error: distance > MAX_RADIUS_KM 
      ? `Sorry, we are currently only serving locations within ${MAX_RADIUS_KM}km of Melbourne CBD. You are ${distance}km away.` 
      : undefined
  };
}

// ... rest of your existing getCurrentLocation, reverseGeocode, and searchAddresses functions ...


export async function getCurrentLocation(): Promise<{ lat: number; lon: number }> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        let message = 'Failed to get location';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            message = 'Location permission denied by user';
            break;
          case error.POSITION_UNAVAILABLE:
            message = 'Location information is unavailable';
            break;
          case error.TIMEOUT:
            message = 'Location request timed out';
            break;
        }
        reject(new Error(message));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  });
}

/**
 * Reverse Geocode using Geoapify
 */
export async function reverseGeocode(lat: number, lon: number): Promise<Address> {
  if (!GEOAPIFY_API_KEY) {
    throw new Error('Geoapify API Key is missing in .env');
  }

  try {
    const response = await fetch(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${GEOAPIFY_API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`Reverse geocoding failed: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.features || data.features.length === 0) {
      throw new Error('No address data found');
    }

    const props = data.features[0].properties;

    return {
      street: props.street,
      houseNumber: props.housenumber,
      city: props.city || props.suburb,
      state: props.state,
      postcode: props.postcode,
      country: props.country,
      fullAddress: props.formatted,
      coordinates: {
        lat: props.lat,
        lon: props.lon,
      },
    };
  } catch (error) {
    console.error("Reverse geocode error:", error);
    throw new Error('Failed to find address details.');
  }
}

export async function getCurrentAddress(): Promise<Address> {
  try {
    const location = await getCurrentLocation();
    const address = await reverseGeocode(location.lat, location.lon);
    return address;
  } catch (error) {
    throw error;
  }
}

export interface AddressSuggestion {
  name: string;
  coordinates?: {
    lat: number;
    lon: number;
  };
  fullDetails?: any; // To store raw Geoapify data if needed
}

/**
 * Search addresses using Geoapify Autocomplete
 * Restricted to Australia (au)
 */
export async function searchAddresses(
  query: string,
  limit: number = 5
): Promise<AddressSuggestion[]> {
  if (!query || query.trim().length < 3) {
    return [];
  }

  if (!GEOAPIFY_API_KEY) {
    console.error("Geoapify API key missing");
    return [];
  }

  try {
    const encodedQuery = encodeURIComponent(query.trim());
    // filter=countrycode:au restricts results to Australia
    const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodedQuery}&limit=${limit}&filter=countrycode:au&apiKey=${GEOAPIFY_API_KEY}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Geoapify API request failed: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data || !data.features || !Array.isArray(data.features)) {
      return [];
    }

    return data.features.map((feature: any) => {
      const props = feature.properties;
      return {
        name: props.formatted, // "123 Main St, Melbourne VIC 3000, Australia"
        coordinates: {
          lat: props.lat,
          lon: props.lon,
        },
        fullDetails: props
      };
    });
  } catch (error) {
    console.error('Error searching addresses:', error);
    return [];
  }
}
