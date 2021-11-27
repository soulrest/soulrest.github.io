import { createSlice } from "@reduxjs/toolkit";

const IQAIR_URL = process.env.REACT_APP_IQAIR_URL;
const IQAIR_KEY = process.env.REACT_APP_IQAIR_KEY;

const weatherSlice = createSlice({
  name: "cities",
  initialState: {
    country: "",
    state: "",
    city: "",
    weather: {
      temperature: "",
      temperature_min: "",
      atmospheric_presure: "",
      humidity: "",
      wind_speed: "",
      wind_direction: "",
    },
    pollution: {
      aqius: "",
      aqicn: "",
    },
  },
  reducers: {
    updateWeatherAndAirQualityData(state, action) {
      const { data } = action.payload;
      const { weather, pollution } = data.current;
      state.country = data.country;
      state.city = data.city;
      state.state = data.state;
      state.weather = {
        temperature: weather.tp,
        atmospheric_presure: weather.pr,
        humidity: weather.hu,
        wind_speed: weather.ws,
        wind_direction: weather.wd,
        icon: weather.ic,
      };
      state.pollution = {
        aqius: pollution.aqius,
        aqicn: pollution.aqicn,
      };
    },
  },
});

export const fetchWeatherAndAirQualityData = (lat, lon) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        `${IQAIR_URL}nearest_city?lat=${lat}&lon=${lon}&key=${IQAIR_KEY}`
      );
      if (!response.ok) throw new Error("Could not fetch city data.");
      const data = await response.json();
      return data;
    };
    try {
      const weatherData = await fetchData();
      dispatch(weatherActions.updateWeatherAndAirQualityData(weatherData));
      return true;
    } catch (err) {
      console.error(err);
    }
  };
};

export const weatherActions = weatherSlice.actions;

export default weatherSlice;
