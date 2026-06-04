import { useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';

export const useTracker = () => {
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;

    const trackVisit = async () => {
      try {
        let visitorId = localStorage.getItem('visitor_id');
        if (!visitorId) {
          visitorId = crypto.randomUUID();
          localStorage.setItem('visitor_id', visitorId);
        }

        let country: string | null = null;
        let city: string | null = null;
        
        const fetchGeoWithFallbacks = async () => {
          // Primary: ipapi.co
          try {
            const res = await fetch('https://ipapi.co/json/');
            if (res.ok) {
              const data = await res.json();
              if (data.country_name) return { country: data.country_name, city: data.city || null };
            }
          } catch {
            console.warn('Geolocation Provider 1 (ipapi.co) failed. Trying fallback 1...');
          }

          // Fallback 1: ipwho.is
          try {
            const res = await fetch('https://ipwho.is/');
            if (res.ok) {
              const data = await res.json();
              if (data.success && data.country) return { country: data.country, city: data.city || null };
            }
          } catch {
            console.warn('Geolocation Provider 2 (ipwho.is) failed. Trying fallback 2...');
          }

          // Fallback 2: geojs.io
          try {
            const res = await fetch('https://get.geojs.io/v1/ip/geo.json');
            if (res.ok) {
              const data = await res.json();
              if (data.country) return { country: data.country, city: data.city || null };
            }
          } catch {
            console.error('All geolocation providers failed.');
          }

          return null;
        };

        const geo = await fetchGeoWithFallbacks();
        if (geo) {
          country = geo.country;
          city = geo.city;
        } else {
          console.warn('Could not determine visitor geolocation. Storing NULL values.');
        }

        await supabase.from('portfolio_visits').insert([
          {
            visitor_id: visitorId,
            country: country,
            city: city,
            user_agent: navigator.userAgent
          }
        ]);
      } catch (err) {
        console.error('Failed to track visit:', err);
      }
    };

    trackVisit();
  }, []);
};
