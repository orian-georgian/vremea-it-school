import { loadData } from "./api/weatherApis.js";
import { buildWeatherSection } from "./sections/weather.js";
import { buildForecastSection } from "./sections/forecast.js";

const initApp = async () => {
  const initalLocation = "București";
  const locationLabelEl = document.getElementById("location-label");
  const locationsListEl = document.getElementById("locations-list");

  const [weatherResponse, forecastResponse] = await Promise.all([
    loadData(initalLocation, "weather"),
    loadData(initalLocation, "forecast"),
  ]);

  console.log(weatherResponse, forecastResponse);

  if (weatherResponse.isOk) {
    buildWeatherSection(weatherResponse.data);
  }

  if (forecastResponse.isOk) {
    buildForecastSection(forecastResponse.data);
  }

  const handleLocationsListClick = async (e) => {
    const locationName = e.target.childNodes[0].textContent;
    const { isOk, data } = await loadCurrentWeather(locationName, "weather");

    if (isOk) {
      buildWeatherSection(data);
    }

    locationLabelEl.textContent = locationName;
  };

  locationsListEl.addEventListener("click", handleLocationsListClick);

  locationLabelEl.textContent = initalLocation;
};

initApp();
