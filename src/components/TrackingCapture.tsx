'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function TrackingCapture() {
  const searchParams = useSearchParams();

  useEffect(() => {
    try {
      const gclid = searchParams.get('gclid');
      const fbclid = searchParams.get('fbclid');
      const utm_source = searchParams.get('utm_source');
      const utm_medium = searchParams.get('utm_medium');
      const utm_campaign = searchParams.get('utm_campaign');
      
      if (gclid || fbclid || utm_source || utm_medium || utm_campaign) {
        let cleanSource = 'Direct';
        if (gclid) cleanSource = 'Google Ads';
        else if (fbclid) cleanSource = 'Meta Ads';
        else if (utm_source) {
          cleanSource = utm_source.charAt(0).toUpperCase() + utm_source.slice(1);
        }
        
        const trackingData = {
          gclid,
          fbclid,
          utm_source,
          utm_medium,
          utm_campaign,
          landing_page: window.location.pathname,
          referrer: document.referrer || null,
          capturedAt: new Date().toISOString()
        };
        
        const cookiePayload = encodeURIComponent(JSON.stringify({
          source: cleanSource,
          data: trackingData
        }));
        
        const expires = new Date();
        expires.setTime(expires.getTime() + (30 * 24 * 60 * 60 * 1000));
        document.cookie = `crisp_tracking_data=${cookiePayload};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
      } 
      else if (!document.cookie.includes('crisp_tracking_data=')) {
        const referrer = document.referrer;
        let cleanSource = 'Direct';
        
        if (referrer) {
           try {
               const refUrl = new URL(referrer);
               if (!refUrl.hostname.includes(window.location.hostname)) {
                   if (refUrl.hostname.includes('google') || refUrl.hostname.includes('bing') || refUrl.hostname.includes('yahoo')) {
                       cleanSource = 'Organic Search';
                   } else {
                       cleanSource = `Referral (${refUrl.hostname})`;
                   }
               }
           } catch(e) {}
        }
        
        const trackingData = {
            landing_page: window.location.pathname,
            referrer: referrer || null,
            capturedAt: new Date().toISOString()
        };
        
        const cookiePayload = encodeURIComponent(JSON.stringify({
          source: cleanSource,
          data: trackingData
        }));
        
        const expires = new Date();
        expires.setTime(expires.getTime() + (30 * 24 * 60 * 60 * 1000));
        document.cookie = `crisp_tracking_data=${cookiePayload};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
      }
    } catch (err) {
      console.error('[TRACKING] Error capturing lead source:', err);
    }
  }, [searchParams]);

  return null;
}
