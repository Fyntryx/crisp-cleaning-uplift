const MELBOURNE_CBD = { lat: -37.8136, lon: 144.9631 };

function deg2rad(deg) { return deg * (Math.PI / 180); }

function calculateHaversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Number((R * c).toFixed(2));
}

// Seaford approx coordinates
const SEAFORD = { lat: -38.1066, lon: 145.1278 }; 
console.log("Distance:", calculateHaversineDistance(MELBOURNE_CBD.lat, MELBOURNE_CBD.lon, SEAFORD.lat, SEAFORD.lon));
