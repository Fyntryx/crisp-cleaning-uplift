'use client';

import { useEffect } from 'react';
import { syncServiceRadius } from '@/utils/geolocation';

export default function RadiusInitializer() {
  useEffect(() => {
    // This runs once when the browser loads the app
    syncServiceRadius();
  }, []);

  return null; // This component doesn't render anything
}
