import { createSlice } from "@reduxjs/toolkit";

const OC_URL = process.env.REACT_APP_OC_URL;
const OC_KEY = process.env.REACT_APP_OC_KEY;

const citiesSlice = createSlice({
  name: "cities",
  initialState: {
    results: [],
  },
  reducers: {
    replaceCitiesData(state, action) {
      const { citiesData } = action.payload;
      const formatedData = citiesData
        .map((el) => {
          return {
            [el.components?.city ? "city" : el.components._type]:
              el.components?.city ||
              el.components[`${el.components._type}`] ||
              "",
            country: el.components.country || "",
            formatted: el.formatted || "",
            flag: el.annotations.flag || "",
            continent: el.components.continent || "",
            district: el.components.district || "",
            state: el.components.state || "",
            type: el.components._type || "",
            geometry: el.geometry,
            id: el.annotations.Maidenhead + el.annotations.geohash,
          };
        })
        .reduce((unique, o) => {
          if (
            !unique.some(
              (obj) =>
                parseInt(obj.geometry.lat) === parseInt(o.geometry.lat) &&
                parseInt(obj.geometry.lng) === parseInt(o.geometry.lng)
            )
          ) {
            unique.push(o);
          }
          return unique;
        }, []);
      state.results = formatedData;
    },
  },
});

export const fetchCitiesData = (city) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        `${OC_URL}json?q=${city}&language=en&key=${OC_KEY}`
      );
      if (!response.ok) throw new Error("Could not fetch city data.");
      const data = await response.json();
      return data;
    };
    try {
      const citiesData = await fetchData();
      dispatch(
        citiesActions.replaceCitiesData({
          citiesData: citiesData.results,
        })
      );
    } catch (err) {
      console.error(err);
    }
  };
};

export const citiesActions = citiesSlice.actions;

export default citiesSlice;
