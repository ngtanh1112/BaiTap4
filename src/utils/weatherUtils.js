// src/utils/weatherUtils.js
export const celsiusToFahrenheit = (celsius) => {
    return Math.round((celsius * 9 / 5) + 32);
};

export const mphToKmh = (mph) => {
    return Math.round(mph * 1.60934);
};

export const getWeatherIcon = (iconUrl) => {
    return iconUrl.startsWith('//') ? `https:${iconUrl}` : iconUrl;
};

export const formatDateTime = (date) => {
    const options = {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
};