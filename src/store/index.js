import { configureStore } from "@reduxjs/toolkit";

import citiesSlice from "./cities-slice";
import weatherSlice from "./weather-slice";

const store = configureStore({
  reducer: {
    cities: citiesSlice.reducer,
    weather: weatherSlice.reducer,
  },
});

export default store;
