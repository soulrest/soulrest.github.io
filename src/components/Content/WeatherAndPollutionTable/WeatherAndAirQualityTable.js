import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import WeatherTable from "./WeatherTable";
import PollutionTable from "./PollutionTable";
import LoadingSpinner from "../../UI/LoadingSpinner";
import {
  fetchWeatherAndAirQualityData,
  weatherActions,
} from "../../../store/weather-slice";

const WeatherAndAirQualityTable = (props) => {
  const dispatch = useDispatch();
  const { lat, lng } = useParams();
  const { city, country, state, weather, pollution } = props.data;
  let output;

  useEffect(() => {
    if (city) dispatch(weatherActions.addToHistory(props.data));
    if (!city) dispatch(fetchWeatherAndAirQualityData(lat, lng));
  }, [dispatch, lat, lng, city, props.data]);

  if (!city) {
    output = <LoadingSpinner />;
  }

  if (city) {
    output = (
      <React.Fragment>
        {props.message && (
          <p className="text-center fw-lighter">{props.message}</p>
        )}
        <table className="table mt-4">
          <thead>
            <tr>
              <th scope="col">Сity</th>
              <th scope="col">Сountry</th>
              <th scope="col">State</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{city}</td>
              <td>{country}</td>
              <td>{state}</td>
            </tr>
          </tbody>
        </table>
        <dl className="row">
          <WeatherTable weather={weather} />
          <PollutionTable pollution={pollution} />
        </dl>
        <button
          type="button"
          onClick={props.onClick}
          className="btn btn-outline-primary"
        >
          {props.buttonMessage}
        </button>
      </React.Fragment>
    );
  }

  return output;
};

export default WeatherAndAirQualityTable;
