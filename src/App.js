import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";

import { fetchCitiesData } from "./store/cities-slice";
import {
  fetchWeatherAndAirQualityData,
  weatherActions,
} from "./store/weather-slice";
import Header from "./components/Layout/Header";
import Form from "./components/Content/Form";
import CitiesTable from "./components/Content/CitiesTable";
import WeatherAndAirQualityTable from "./components/Content/WeatherAndPollutionTable/WeatherAndAirQualityTable";
import SearchHistoryTable from "./components/Content/SearchHistoryTable";
import PageNotFound from "./components/UI/PageNotFound";
import LoadingSpinner from "./components/UI/LoadingSpinner";
import "./App.css";

function App() {
  const [city, setSity] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { results, isFetchingData } = useSelector((state) => state.cities);
  const weatherAndAirQualityData = useSelector((state) => state.weather.city);
  const citiesHistory = useSelector((state) => state.weather.history);

  useEffect(() => {
    dispatch(weatherActions.getHistoryFromStorage());
  }, [dispatch]);

  const handleCityChange = (value) => {
    setSity(value);
  };

  const onHandleWeaterDataChange = async (value) => {
    const { lat, lng } = value.geometry;
    const data = await dispatch(fetchWeatherAndAirQualityData(lat, lng));
    if (data) navigate(`/info/${lat}/${lng}`);
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
          exact
          element={
            <React.Fragment>
              <Form
                value={city}
                handleCityChange={handleCityChange}
                onSubmit={handleCitySubmit}
              />
              {isFetchingData ? (
                <LoadingSpinner />
              ) : (
                results.length > 0 && (
                  <CitiesTable
                    handleWeaterDataChange={onHandleWeaterDataChange}
                    cities={results}
                  />
                )
              )}
            </React.Fragment>
          }
        />
        <Route
          path="/history"
          element={<SearchHistoryTable history={citiesHistory} />}
        />
        <Route
          exact
          path={`/info/:lat/:lng`}
          element={
            <WeatherAndAirQualityTable
              onClick={() => navigate("/")}
              buttonMessage="Back to search"
              message="If we do not find the city you requested, we display the data of the
                nearest city by geolocation."
              data={weatherAndAirQualityData}
              reset={onHandleWeaterDataChange}
            />
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
