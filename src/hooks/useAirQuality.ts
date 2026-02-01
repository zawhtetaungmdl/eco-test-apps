import { useState, useCallback } from 'react';

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

export const AQI_LEVELS = [
  { max: 50, label: "Good", color: "forest", status: "Good" },
  { max: 100, label: "Moderate", color: "urgent", status: "Moderate" },
  { max: 150, label: "Unhealthy (Sensitive)", color: "urgent", status: "Unhealthy" },
  { max: 200, label: "Unhealthy", color: "danger", status: "Unhealthy" },
  { max: 300, label: "Very Unhealthy", color: "danger", status: "Very Unhealthy" },
  { max: 1000, label: "Hazardous", color: "danger", status: "Hazardous" },
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
          await fetchAirQuality(latitude, longitude);
        } catch (e) {
            console.error(e);
            // Fallback name if reverse geocoding fails but we have coords
            setLocation({ name: "Current Location", lat: latitude, lon: longitude });
            await fetchAirQuality(latitude, longitude);
        }
      },
      async (err) => {
        console.warn("Geolocation denied/failed, falling back to IP", err);
        setPermissionDenied(true);
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
