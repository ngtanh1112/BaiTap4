// src/components/TemperatureChart.jsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useSelector } from 'react-redux';
import { celsiusToFahrenheit } from '../utils/weatherUtils';

const TemperatureChart = () => {
    const { forecast, currentWeather } = useSelector(state => state.weather);

    if (!forecast || !currentWeather) return null;

    const today = forecast.forecastday[0];
    const hourlyData = today.hour.map(hour => ({
        time: new Date(hour.time).getHours(),
        temperature: celsiusToFahrenheit(hour.temp_c),
        isNow: new Date(hour.time).getHours() === new Date().getHours()
    }));

    return (
        <div className="temperature-table">
            <h3 className="chart-title">Temperature Chart</h3>
            <div className="chart-container">
                <ResponsiveContainer width="100%" height={180}>
                    <LineChart data={hourlyData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis
                            dataKey="time"
                            stroke="#374151"
                            fontSize={12}
                            tickFormatter={(value) => `${value}:00`}
                        />
                        <YAxis
                            stroke="#374151"
                            fontSize={12}
                            tickFormatter={(value) => `${value}°`}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#f9fafb',
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px',
                                color: '#374151'
                            }}
                            formatter={(value) => [`${value}°F`, 'Temperature']}
                            labelFormatter={(label) => `${label}:00`}
                        />
                        <Line
                            type="monotone"
                            dataKey="temperature"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            dot={(props) => {
                                const { cx, cy, payload } = props;
                                return payload.isNow ? (
                                    <circle cx={cx} cy={cy} r={5} fill="#3b82f6" stroke="#fff" strokeWidth={2} />
                                ) : (
                                    <circle cx={cx} cy={cy} r={2} fill="#3b82f6" />
                                );
                            }}
                            activeDot={{ r: 5 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default TemperatureChart;