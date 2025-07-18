// src/components/PredictionBoxes.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { getWeatherIcon } from '../utils/weatherUtils';

const PredictionBoxes = () => {
    const { forecast } = useSelector(state => state.weather);

    if (!forecast) return null;

    const formatDate = (dateStr, index) => {
        if (index === 0) return 'Today';
        const date = new Date(dateStr);
        return `${date.getDate()}/${date.getMonth() + 1}`;
    };

    return (
        <div className="prediction-boxes">
            {forecast.forecastday.map((day, index) => (
                <div key={index} className="prediction-box">
                    <div className="box-date">
                        {formatDate(day.date, index)}
                    </div>
                    <div className="box-icon">
                        <img
                            src={getWeatherIcon(day.day.condition.icon)}
                            alt={day.day.condition.text}
                            className="prediction-icon-img"
                        />
                    </div>
                    <div className="box-humidity-label">
                        Humidity
                    </div>
                    <div className="box-humidity-value">
                        {day.day.avghumidity}%
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PredictionBoxes;