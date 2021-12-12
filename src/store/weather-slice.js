import { createSlice } from "@reduxjs/toolkit";

const IQAIR_URL = process.env.REACT_APP_IQAIR_URL;
const IQAIR_KEY = process.env.REACT_APP_IQAIR_KEY;

const updateLocalStorage = (arr) => {
  let history = JSON.parse(localStorage.getItem("history")) || [];
  if (!arr) return history;
  localStorage.setItem("history", JSON.stringify(arr));
  if (arr.length === 0) return localStorage.removeItem("history");
};

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    city: {},
    history: [],
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
    addToHistory(state, action) {
      const newHistoryItem = action.payload;
      const existingItem = state.history.find(
        (el) => el.id === newHistoryItem.id
      );
      if (!existingItem) {
        state.history.push(newHistoryItem);
        updateLocalStorage(state.history);
      }
    },
    removeFromHistory(state, action) {
      const id = action.payload;
      const history = state.history.filter((el) => el.id !== id);
      state.history = history;
      updateLocalStorage(history);
    },
    getHistoryFromStorage(state) {
      state.history = updateLocalStorage();
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
      return weatherData;
    } catch (err) {
      console.error(err);
    }
  };
};

export const weatherActions = weatherSlice.actions;

export default weatherSlice;
