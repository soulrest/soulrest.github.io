import React from "react";

import getWindDirection from "../../Utils/getWindDirection";

const WeatherTable = (props) => {
  const { weather } = props;
  return (
    <React.Fragment>
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
          <span className="fw-bold">Wind Speed:</span> {weather.wind_speed} m/s
        </p>
        <p>
          <span className="fw-bold">Atmospheric Presure:</span>{" "}
          {weather.atmospheric_presure} hPa
        </p>
      </dd>
    </React.Fragment>
  );
};

export default WeatherTable;
