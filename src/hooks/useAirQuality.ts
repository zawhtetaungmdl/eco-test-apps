import { useState, useCallback, useEffect } from 'react';

export interface AirQualityData {
  us_aqi: number;
  pm2_5: number;
  pm10: number;
  carbon_monoxide: number;
  nitrogen_dioxide: number;
  sulphur_dioxide: number;
  ozone: number;
  dust: number;
  uv_index: number;
  ammonia: number;
}

export interface LocationData {
  name: string;
  lat: number;
  lon: number;
}

export interface AqiLevel {
  max: number;
  label: string;
  status: string;
  colorName: 'green' | 'yellow' | 'orange' | 'red' | 'purple' | 'maroon';
}

export const AQI_LEVELS: AqiLevel[] = [
  { max: 50, label: "Good", status: "Good", colorName: 'green' },
  { max: 100, label: "Moderate", status: "Moderate", colorName: 'yellow' },
  { max: 150, label: "Unhealthy for Sensitive Groups", status: "Unhealthy (Sensitive)", colorName: 'orange' },
  { max: 200, label: "Unhealthy", status: "Unhealthy", colorName: 'red' },
  { max: 300, label: "Very Unhealthy", status: "Very Unhealthy", colorName: 'purple' },
  { max: 10000, label: "Hazardous", status: "Hazardous", colorName: 'maroon' },
];

export const getStatus = (aqi: number) => {
  return AQI_LEVELS.find(level => aqi <= level.max) || AQI_LEVELS[AQI_LEVELS.length - 1];
};

export const useAirQuality = () => {
  const [data, setData] = useState<AirQualityData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<LocationData | null>(null);
  const [permissionDenied, setPermissionDenied] = useState(false);
  // Track if we should show the prompt (i.e. if we don't have a saved permission/location yet)
  // We initialize location from localStorage if available to skip prompt

  useEffect(() => {
    // Check local storage on mount
    const savedLoc = localStorage.getItem('ecoHome_location');
    if (savedLoc) {
        try {
            const parsed = JSON.parse(savedLoc);
            if (parsed && parsed.lat && parsed.lon) {
                setLocation(parsed);
                // Fetch data immediately for saved location
                fetchAirQuality(parsed.lat, parsed.lon);
            }
        } catch (e) {
            console.error("Failed to parse saved location", e);
        }
    }
  }, []);

  const fetchAirQuality = async (lat: number, lon: number) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=us_aqi,pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,dust,uv_index,ammonia`
      );
      const result = await response.json();
      if (result.current) {
        setData(result.current);
      }
    } catch (err) {
      setError('Failed to fetch air quality data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchIPLocation = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        'https://api.bigdatacloud.net/data/reverse-geocode-client'
      );
      const result = await response.json();
      const loc = {
        name: result.city || result.locality || "Unknown Location",
        lat: result.latitude,
        lon: result.longitude
      };
      setLocation(loc);
      // Save to local storage
      localStorage.setItem('ecoHome_location', JSON.stringify(loc));
      await fetchAirQuality(loc.lat, loc.lon);
    } catch (err) {
      setError('Failed to fetch location');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAutoLocation = useCallback(async () => {
    setLoading(true);
    setError(null);
    setPermissionDenied(false);

    if (!navigator.geolocation) {
      setError("Geolocation is not supported");
      await fetchIPLocation();
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        // Reverse geocoding to get city name
        try {
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );
          const result = await response.json();
          const loc = {
            name: result.city || result.locality || "Your Location",
            lat: latitude,
            lon: longitude
          };
          setLocation(loc);
          localStorage.setItem('ecoHome_location', JSON.stringify(loc));
          await fetchAirQuality(latitude, longitude);
        } catch (e) {
            console.error(e);
            // Fallback name if reverse geocoding fails but we have coords
            const loc = { name: "Current Location", lat: latitude, lon: longitude };
            setLocation(loc);
            localStorage.setItem('ecoHome_location', JSON.stringify(loc));
            await fetchAirQuality(latitude, longitude);
        }
      },
      async (err) => {
        console.warn("Geolocation denied/failed, falling back to IP", err);
        setPermissionDenied(true);
        // Even if denied, if we get IP location, save it so we don't ask again?
        // Maybe better to ask next time if they denied, but IP location is a good fallback.
        await fetchIPLocation();
      }
    );
  }, []);

  return {
    data,
    loading,
    error,
    location,
    permissionDenied,
    fetchAirQuality,
    handleAutoLocation
  };
};
