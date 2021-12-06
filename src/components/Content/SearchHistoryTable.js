import React from "react";
import { useDispatch } from "react-redux";

import WeatherAndAirQualityTable from "./WeatherAndPollutionTable/WeatherAndAirQualityTable";
import { weatherActions } from "../../store/weather-slice";

const SearchHistoryTable = (props) => {
  const dispatch = useDispatch();
  const citiesSearchHistory = props.history;
  let output;
  if (citiesSearchHistory.length === 0)
    output = <div>No search history yet!</div>;
  else
    output = citiesSearchHistory.map((city) => (
      <WeatherAndAirQualityTable
        key={city.id}
        data={city}
        onClick={() => dispatch(weatherActions.removeFromHistory(city.id))}
        buttonMessage="Delete from history"
      />
    ));

  return output;
};

export default SearchHistoryTable;
