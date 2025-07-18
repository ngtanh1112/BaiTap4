// src/redux/weatherSlice.js
import { createSlice } from '@reduxjs/toolkit';

const weatherSlice = createSlice({
    name: 'weather',
    initialState: {
        currentWeather: null,
        forecast: null,
        loading: false,
        error: null,
        city: 'hanoi'
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setWeatherData: (state, action) => {
            state.currentWeather = action.payload.current;
            state.forecast = action.payload.forecast;
            state.error = null;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        setCity: (state, action) => {
            state.city = action.payload;
        }
    }
});

export const { setLoading, setWeatherData, setError, setCity } = weatherSlice.actions;
export default weatherSlice.reducer;