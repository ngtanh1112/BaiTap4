// src/App.jsx
import React, { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './redux/store';
import { setLoading, setWeatherData, setError } from './redux/weatherSlice';
import { fetchWeather } from './services/weatherApi';
import LeftContent from './components/LeftContent';
import TemperatureChart from './components/TemperatureChart';
import PredictionBoxes from './components/PredictionBoxes';
import './styles/WeatherApp.css';

const WeatherApp = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.weather);

  useEffect(() => {
    const loadInitialWeather = async () => {
      dispatch(setLoading(true));
      try {
        const data = await fetchWeather('hanoi');
        console.log(data.forecast.forecastday);
        dispatch(setWeatherData(data));
      } catch (error) {
        dispatch(setError(error.message));
      } finally {
        dispatch(setLoading(false));
      }
    };

    loadInitialWeather();
  }, [dispatch]);

  return (
    <div className="container">
      <div className="content">
        <LeftContent />
        <div className="right-content">
          <TemperatureChart />
          <PredictionBoxes />
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <WeatherApp />
    </Provider>
  );
};

export default App;