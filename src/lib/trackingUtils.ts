export function getTrackingPayload(baseSource: string) {
  let trackingData = null;
  let finalSource = baseSource;
  
  if (typeof document !== 'undefined') {
    try {
      const match = document.cookie.match(/crisp_tracking_data=([^;]+)/);
      if (match && match[1]) {
        const parsed = JSON.parse(decodeURIComponent(match[1]));
        if (parsed.source) finalSource = `${parsed.source} (${baseSource})`;
        if (parsed.data) trackingData = parsed.data;
      }
    } catch (e) {
      console.error("Failed to parse tracking cookie", e);
    }
  }
  
  return { source: finalSource, trackingData };
}
