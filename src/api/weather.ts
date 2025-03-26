import { API_CONFIG } from './config';
import { Coordinates, ForecastData, GeocodingResponse, WeatherData } from "./types";

class WeatherAPI {
    // Helper function to create URL with search params
    private createUrl(
        endpoint: string,
        params: Record<string, string | number>
    ) {
        const searchParams = new URLSearchParams({
            appid: API_CONFIG.API_KEY,
            ...params,
        });

        // Log the final URL for debugging purposes
        const url = `${endpoint}?${searchParams.toString()}`;
        console.log("Constructed URL:", url);  // Debugging the URL
        return url;
    }

    // Helper function to fetch data
    private async fetchData<T>(url: string): Promise<T> {
        const response = await fetch(url);

        // Log the response status for debugging
        console.log("Response Status:", response.status);

        // Get the raw text response and log it for debugging
        const responseText = await response.text();
        console.log("Raw Response:", responseText);

        // Check if the response is not OK and log the error message
        if (!response.ok) {
            throw new Error(`Weather API Error: ${response.statusText}`);
        }

        // If the response is valid JSON, parse it
        try {
            return JSON.parse(responseText);
        } catch (error) {
            console.error("Failed to parse JSON response:", error);
            throw new Error("Failed to parse JSON from API response");
        }
    }

    // Fetch current weather data
    async getCurrentWeather({ lat, lon }: Coordinates): Promise<WeatherData> {
        const url = this.createUrl(API_CONFIG.BASE_URL, {
            lat: lat.toString(),
            lon: lon.toString(),
            units: API_CONFIG.DEFAULT_PARAMS.units,
        });

        return this.fetchData<WeatherData>(url);
    }

    // Fetch weather forecast data (updated to the correct forecast endpoint)
    async getForecast({ lat, lon }: Coordinates): Promise<ForecastData> {
        // Correct the URL to point to the /forecast endpoint
        const url = this.createUrl("https://api.openweathermap.org/data/2.5/forecast", {
            lat: lat.toString(),
            lon: lon.toString(),
            units: API_CONFIG.DEFAULT_PARAMS.units,
        });

        return this.fetchData<ForecastData>(url);
    }

    // Fetch reverse geocode data (corrected URL)
    async getreverseGeocode({ lat, lon }: Coordinates): Promise<GeocodingResponse[]> {
        // Use the correct API URL for reverse geocoding with HTTPS
        const url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_CONFIG.API_KEY}`;

        // Log the URL for debugging purposes
        console.log("Reverse Geocode URL:", url);

        return this.fetchData<GeocodingResponse[]>(url);
    }

    async searchLocations(query: string): Promise<GeocodingResponse[]> {
    const url = this.createUrl(`${API_CONFIG.GEO}/direct`, {
      q: query,
      limit: "5",
    });
    return this.fetchData<GeocodingResponse[]>(url);
  }
}

export const weatherAPI = new WeatherAPI();
