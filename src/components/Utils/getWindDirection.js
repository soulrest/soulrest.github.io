const getWindDirection = (angle) => {
  const degreePerDirection = 360 / 8;
  const offsetAngle = angle + degreePerDirection / 2;
  return offsetAngle >= 0 * degreePerDirection &&
    offsetAngle < 1 * degreePerDirection
    ? "North"
    : offsetAngle >= 1 * degreePerDirection &&
      offsetAngle < 2 * degreePerDirection
    ? "North-East"
    : offsetAngle >= 2 * degreePerDirection &&
      offsetAngle < 3 * degreePerDirection
    ? "East"
    : offsetAngle >= 3 * degreePerDirection &&
      offsetAngle < 4 * degreePerDirection
    ? "South-East"
    : offsetAngle >= 4 * degreePerDirection &&
      offsetAngle < 5 * degreePerDirection
    ? "South"
    : offsetAngle >= 5 * degreePerDirection &&
      offsetAngle < 6 * degreePerDirection
    ? "South-West"
    : offsetAngle >= 6 * degreePerDirection &&
      offsetAngle < 7 * degreePerDirection
    ? "West"
    : "North-West";
};

export default getWindDirection;
