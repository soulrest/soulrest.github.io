import React from "react";

import { getChinaAQIWarn, getUSAQIWarn } from "../../Utils/getInfoByAQIValue";

const PollutionTable = (props) => {
  const { pollution } = props;
  const {
    color: cnAQIColor,
    message: cnAQIMessage,
    health_implications: cnAQIHealthImplications,
    recommended_precautions: cnAQIRecommendedPrecautions,
  } = getChinaAQIWarn(pollution?.aqicn);

  const { color: usAQIcolor, message: usAQImessage } = getUSAQIWarn(
    pollution?.aqius
  );

  return (
    <React.Fragment>
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
          <span className="fw-bold">Air Quality Index (USA EPA standard):</span>{" "}
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
    </React.Fragment>
  );
};

export default PollutionTable;
