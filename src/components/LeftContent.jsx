// src/components/LeftContent.jsx
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import SearchBar from './SearchBar';
import { celsiusToFahrenheit, mphToKmh, getWeatherIcon, formatDateTime } from '../utils/weatherUtils';

const LeftContent = () => {
    const { currentWeather } = useSelector(state => state.weather);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    if (!currentWeather) return null;

    const formattedDateTime = formatDateTime(currentTime);

    return (
        <div className="left-content">
            <SearchBar />

            <div className="weather-info">
                <p className="datetime">{formattedDateTime}</p>

                <div className="icon-container">
                    <div className="weather-icon">
                        <img
                            src={getWeatherIcon(currentWeather.condition.icon)}
                            alt={currentWeather.condition.text}
                            className="weather-icon-img"
                        />
                    </div>
                    <p className="temperature">
                        {celsiusToFahrenheit(currentWeather.temp_c)}°F
                    </p>
                </div>

                <p className="weather-condition">
                    {currentWeather.condition.text}
                </p>

                <div className="left-content-bottom">
                    <div className="humidity">
                        <p className="label">Humidity</p>
                        <p className="value">{currentWeather.humidity}%</p>
                    </div>
                    <div className="wind-speed">
                        <p className="label">Wind Speed</p>
                        <p className="value">{mphToKmh(currentWeather.wind_mph)} km/h</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeftContent;