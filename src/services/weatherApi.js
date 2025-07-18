// src/services/weatherApi.js
const API_KEY = 'f5ac4be4a19c47d8a3e42522222112';

export const fetchWeather = async (city) => {
    const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=4&aqi=no&alerts=yes`
    );
    if (!response.ok) {
        throw new Error('Cannot load weather data');
    }
    return response.json();
};