export const getUSAQIWarn = (val) => {
  if (val <= 50) return { color: "green", message: "Good" };
  else if (val > 50 && val <= 100)
    return { color: "yellow", message: "Moderate" };
  else if (val > 100 && val <= 150)
    return { color: "Orange", message: "Unhealthy for Sensitive Groups" };
  else if (val > 150 && val <= 200)
    return { color: "red", message: "Unhealthy" };
  else if (val > 200 && val <= 300)
    return { color: "purple", message: "Very Unhealthy" };
  else if (val > 300 && val <= 500)
    return { color: "maroon", message: "Hazardous" };
  else return { color: "white", message: "No Data" };
};

export const getChinaAQIWarn = (val) => {
  if (val <= 50) {
    return {
      color: "green",
      message: "Excellent",
      health_implications: "No health implications.",
      recommended_precautions:
        "Everyone can continue their outdoor activities normally.",
    };
  } else if (val > 50 && val <= 100) {
    return {
      color: "yellow",
      message: "Good",
      health_implications:
        "Some pollutants may slightly affect very few hypersensitive individuals.",
      recommended_precautions:
        "Only very few hypersensitive people should reduce outdoor activities.",
    };
  } else if (val > 100 && val <= 150) {
    return {
      color: "brown",
      message: "Lightly Polluted",
      health_implications:
        "Healthy people may experience slight irritations and sensitive individuals will be slightly affected to a larger extent.",
      recommended_precautions:
        "Children, seniors and individuals with respiratory or heart diseases should reduce sustained and high-intensity outdoor exercises.",
    };
  } else if (val > 150 && val <= 200) {
    return {
      color: "red",
      message: "Moderately Polluted",
      health_implications:
        "Sensitive individuals will experience more serious conditions. The hearts and respiratory systems of healthy people may be affected.",
      recommended_precautions:
        "Children, seniors and individuals with respiratory or heart diseases should avoid sustained and high-intensity outdoor exercises. General population should moderately reduce outdoor activities.",
    };
  } else if (val > 200 && val <= 300) {
    return {
      color: "purple",
      message: "Heavily Polluted",
      health_implications:
        "Healthy people will commonly show symptoms. People with respiratory or heart diseases will be significantly affected and will experience reduced endurance in activities.",
      recommended_precautions:
        "Children, seniors and individuals with heart or lung diseases should stay indoors and avoid outdoor activities. General population should reduce outdoor activities.",
    };
  } else if (val > 300) {
    return {
      color: "crimson",
      message: "Severely Polluted",
      health_implications:
        "Healthy people will experience reduced endurance in activities and may also show noticeably strong symptoms. Other illnesses may be triggered in healthy people. Elders and the sick should remain indoors and avoid exercise. Healthy individuals should avoid outdoor activities.",
      recommended_precautions:
        "Children, seniors and the sick should stay indoors and avoid physical exertion. General population should avoid outdoor activities.",
    };
  } else {
    return {
      color: "white",
      message: "No Data",
      health_implications: "",
      recommended_precautions: "",
    };
  }
};
