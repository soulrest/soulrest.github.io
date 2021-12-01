import { createSlice } from "@reduxjs/toolkit";

const IQAIR_URL = process.env.REACT_APP_IQAIR_URL;
const IQAIR_KEY = process.env.REACT_APP_IQAIR_KEY;

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    city: {},
  },
  reducers: {
    updateWeatherAndAirQualityData(state, action) {
      const { data } = action.payload;
      const { weather, pollution } = data.current;
      const cityData = {
        id: data.location.coordinates[1].toString(),
        country: data.country,
        city: data.city,
        state: data.state,
        weather: {
          temperature: weather.tp,
          atmospheric_presure: weather.pr,
          humidity: weather.hu,
          wind_speed: weather.ws,
          wind_direction: weather.wd,
          icon: weather.ic,
        },
        pollution: {
          aqius: pollution.aqius,
          aqicn: pollution.aqicn,
        },
      };
      state.city = cityData;
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
