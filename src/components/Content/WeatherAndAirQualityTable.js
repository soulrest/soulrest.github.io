import React from "react";
import { useNavigate } from "react-router-dom";

import getWindDirection from "../Utils/getWindDirection";
import { getChinaAQIWarn, getUSAQIWarn } from "../Utils/getInfoByAQIValue";

const WeatherAndAirQualityTable = (props) => {
  const navigate = useNavigate();
  const { city, country, state, weather, pollution } = props.data;
  const {
    color: cnAQIColor,
    message: cnAQIMessage,
    health_implications: cnAQIHealthImplications,
    recommended_precautions: cnAQIRecommendedPrecautions,
  } = getChinaAQIWarn(pollution.aqicn);

  const { color: usAQIcolor, message: usAQImessage } = getUSAQIWarn(
    pollution.aqius
  );

  return (
    <React.Fragment>
      <p className="text-center fw-lighter">
        If we do not find the city you requested, we display the data of the
        nearest city by geolocation.
      </p>
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
        <dt className="col-sm-3">Weather</dt>
        <dd className="col-sm-9">
          <img
            src={`/images/weather-icons/${weather.icon}.png`}
            style={{ width: "50px", height: "50px" }}
            alt=""
          />
          <p>
            <span className="fw-bold">Temperature:</span> {weather.temperature}
            °C
          </p>
          <p>
            <span className="fw-bold">Humidity:</span> {weather.humidity}%
          </p>
          <p>
            <span className="fw-bold">Wind Direction:</span>{" "}
            {getWindDirection(weather.wind_direction)}
          </p>
          <p>
            <span className="fw-bold">Wind Speed:</span> {weather.wind_speed}{" "}
            m/s
          </p>
          <p>
            <span className="fw-bold">Atmospheric Presure:</span>{" "}
            {weather.atmospheric_presure} hPa
          </p>
        </dd>

        <dt className="col-sm-3">Pollution</dt>
        <dd className="col-sm-9">
          <p>
            <span className="fw-bold">
              Air Quality Index (China MEP standard):
            </span>{" "}
            {pollution.aqicn} AQI{" "}
            <span
              className="warn-box"
              style={{ backgroundColor: `${cnAQIColor}` }}
            >
              {cnAQIMessage}
            </span>
          </p>
          <dl className="row">
            <dt className="col-sm-4">Health Implications</dt>
            <dd className="col-sm-8">{cnAQIHealthImplications}</dd>
          </dl>
          <dl className="row">
            <dt className="col-sm-4">Recommended Precautions</dt>
            <dd className="col-sm-8">{cnAQIRecommendedPrecautions}</dd>
          </dl>
          <p>
            <span className="fw-bold">
              Air Quality Index (USA EPA standard):
            </span>{" "}
            {pollution.aqius} AQI
            <span
              className="warn-box"
              style={{ backgroundColor: `${usAQIcolor}` }}
            >
              {usAQImessage}
            </span>
          </p>
          <p></p>
        </dd>
      </dl>
      <button
        type="button"
        onClick={() => navigate("/")}
        className="btn btn-outline-primary"
      >
        Back to Search
      </button>
    </React.Fragment>
  );
};

export default WeatherAndAirQualityTable;
