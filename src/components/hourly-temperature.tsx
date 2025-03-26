import { useTheme } from '@/context/theme-provider';  // Import the theme provider
import type { ForecastData } from "@/api/types";
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { format } from "date-fns";

interface HourlyTemperatureProps {
    data: ForecastData;
}

interface ChartData {
    time: string;
    temp: number;
    feels_like: number;
}

const HourlyTemperature = ({ data }: HourlyTemperatureProps) => {
    // Get the current theme (dark or light)
    const { theme } = useTheme();

    // Ensure data.list exists and has at least 8 items before trying to slice it
    if (!data?.list || data.list.length === 0) {
        return <p>No forecast data available</p>; // Optional: display a fallback message if no data
    }

    const chartData = data.list.slice(0, 8).map((item) => ({
        time: format(new Date(item.dt * 1000), "ha"),
        temp: Math.round(item.main.temp),
        feels_like: Math.round(item.main.feels_like),
    }));

    // Set the stroke color dynamically based on the current theme
    const axisStrokeColor = theme === "dark" ? "rgba(255, 255, 255, 0.6)" : "rgba(0, 0, 0, 0.6)"; // Faded white for dark mode, faded black for light mode

    return (
        <Card className="flex-1">
            <CardHeader>
                <CardTitle>Today's Temperature</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[200px] w-full">
                    <ResponsiveContainer width={"100%"} height={"100%"}>
                        <LineChart data={chartData}>
                            <XAxis
                                dataKey="time"
                                stroke={axisStrokeColor}  // Dynamic stroke color
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                stroke={axisStrokeColor}  // Dynamic stroke color
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `${value}°`}
                            />
                            <Tooltip
                                content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                        return (
                                            <div className="rounded-lg border bg-background p-2 shadow-sm">
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div className="flex flex-col">
                                                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                                                            Temperature
                                                        </span>
                                                        <span className="font-bold">{payload[0].value}°</span>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                                                            Feels Like
                                                        </span>
                                                        <span className="font-bold">{payload[1].value}°</span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    }
                                }}
                            />
                            <Line type="monotone" dataKey="temp" stroke="#8884d8" />
                            <Line type="monotone" dataKey="feels_like" stroke="#82ca9d" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};

export default HourlyTemperature;
