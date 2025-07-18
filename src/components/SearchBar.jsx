// src/components/SearchBar.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setWeatherData, setError, setCity } from '../redux/weatherSlice';
import { fetchWeather } from '../services/weatherApi';

const SearchBar = () => {
    const [inputValue, setInputValue] = useState('');
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.weather);

    const handleSearch = async () => {
        if (!inputValue.trim()) return;

        dispatch(setLoading(true));
        try {
            const data = await fetchWeather(inputValue);
            dispatch(setWeatherData(data));
            dispatch(setCity(inputValue));
        } catch (error) {
            dispatch(setError(error.message));
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="header">
            <p className="city-label">Your city: </p>
            <input
                className="city-input"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter city name..."
            />
        </div>
    );
};

export default SearchBar;