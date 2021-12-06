import { createSlice } from "@reduxjs/toolkit";

const IQAIR_URL = process.env.REACT_APP_IQAIR_URL;
const IQAIR_KEY = process.env.REACT_APP_IQAIR_KEY;

const updateLocalStorage = (action, value) => {
  let history = JSON.parse(localStorage.getItem("history"));
  switch (action) {
    case "add":
      if (!history && typeof value === "object") {
        localStorage.setItem("history", JSON.stringify([value]));
        return;
      } else if (typeof value === "object") {
        history.push(value);
      }
      break;
    case "delete":
      if (typeof value === "string")
        history = history.filter((el) => el.id !== value);
      break;
    default:
      if (history) return history;
      else return [];
  }
  localStorage.setItem("history", JSON.stringify(history));
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
        updateLocalStorage("add", newHistoryItem);
      }
    },
    removeFromHistory(state, action) {
      const id = action.payload;
      state.history = state.history.filter((item) => item.id !== id);
      updateLocalStorage("delete", id);
    },
    getHistoryFromStorage(state) {
      const history = updateLocalStorage();
      state.history = history;
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
