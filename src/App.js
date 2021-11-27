import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";

import { fetchCitiesData } from "./store/cities-slice";
import { fetchWeatherAndAirQualityData } from "./store/weather-slice";
import Header from "./components/Layout/Header";
import Form from "./components/Content/Form";
import CitiesTable from "./components/Content/CitiesTable";
import WeatherAndAirQualityTable from "./components/Content/WeatherAndAirQualityTable";
import "./App.css";

function App() {
  const [city, setSity] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { results } = useSelector((state) => state.cities);
  const weatherAndAirQualityData = useSelector((state) => state.weather);

  const onHandleCityChange = (value) => {
    setSity(value);
  };

  const onHandleWeaterDataChange = async (value) => {
    const { lat, lng } = value.geometry;
    const data = await dispatch(fetchWeatherAndAirQualityData(lat, lng));
    if (data) navigate("/info");
  };

  const handleCitySubmit = (e) => {
    e.preventDefault();
    dispatch(fetchCitiesData(city));
  };

  return (
    <div className="container-md">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <React.Fragment>
              <Form
                value={city}
                handleCityChange={onHandleCityChange}
                onSubmit={handleCitySubmit}
              />
              {results.length > 0 && (
                <CitiesTable
                  handleWeaterDataChange={onHandleWeaterDataChange}
                  cities={results}
                />
              )}
            </React.Fragment>
          }
        />
        <Route
          path="info"
          element={
            weatherAndAirQualityData.city ? (
              <WeatherAndAirQualityTable data={weatherAndAirQualityData} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
