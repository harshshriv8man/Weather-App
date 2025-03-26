import CurrentWeather from '@/components/current-weather';
import FavoriteButton from '@/components/favorite-button';
import HourlyTemperature from '@/components/hourly-temperature';
import WeatherSkeleton from '@/components/loading-skeleton';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import WeatherDetails from '@/components/weather-details';
import WeatherForecast from '@/components/weather-forecast';
import { useWeatherQuery, useForecastQuery } from '@/hooks/use-weather';
import { AlertTriangle } from 'lucide-react';
import { useParams, useSearchParams } from 'react-router-dom';
import GoogleMapCard from '@/components/google-map'; 
import { useState, useEffect } from 'react';
import YouTubeVideoCard from '@/components/youtube-video'; // Import the YouTube component

const CityPage = () => {
    const [searchParams] = useSearchParams();
    const params = useParams();
    const lat = parseFloat(searchParams.get('lat') || '0');
    const lon = parseFloat(searchParams.get('lon') || '0');
    const coordinates = { lat, lon };
    const weatherQuery = useWeatherQuery(coordinates);
    const forecastQuery = useForecastQuery(coordinates);
    const [mapReady, setMapReady] = useState(false);

    useEffect(() => {
        if (coordinates && coordinates.lat && coordinates.lon) {
            setMapReady(true);
        }
    }, [coordinates]);

    if (weatherQuery.error || forecastQuery.error) {
        return (
            <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription className="flex flex-col gap-4">
                    Failed to load weather data. Please try again.
                </AlertDescription>
            </Alert>
        );
    }

    const locationName = params.cityName || weatherQuery.data?.name || "Unknown Location";

    if (!weatherQuery.data || !forecastQuery.data || !locationName) {
        return <WeatherSkeleton />;
    }

    return (
        <div className="space y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">
                    {`${locationName}, ${weatherQuery.data.sys.country}`}
                </h1>
                <div>
                    <FavoriteButton data={{ ...weatherQuery.data, name: locationName }} />
                </div>
            </div>

            <div className="grid gap-6">
                <div className="flex flex-col gap-4">
                    <CurrentWeather data={weatherQuery.data} />
                    <HourlyTemperature data={forecastQuery.data} />
                </div>

                {/* Add the YouTube Video Card */}
                <div className="grid gap-6 md:grid-cols-1">
                    <YouTubeVideoCard locationName={locationName} />
                </div>

                {/* Google Map */}
                {mapReady && (
                    <div className="grid gap-6 md:grid-cols-1">
                        <GoogleMapCard lat={lat} lon={lon} />
                    </div>
                )}

                <div className="grid gap-6 md:grid-cols-2 items-start">
                    <WeatherDetails data={weatherQuery.data} />
                    <WeatherForecast data={forecastQuery.data} />
                </div>
            </div>
        </div>
    );
};

export default CityPage;
