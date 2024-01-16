import { loadData } from "./api/weatherApis.js";
import { buildWeatherSection } from "./sections/weather.js";
import { buildForecastSection } from "./sections/forecast.js";

const toggleArrowByDisplaySize = (innerWidth) => {
  const cityButtonEl = document.getElementById("city-button");

  if (innerWidth > 576) {
    cityButtonEl.classList.add("dropend");
  } else if (cityButtonEl.classList.contains("dropend")) {
    cityButtonEl.classList.remove("dropend");
  }
};

const initApp = async () => {
  const initalLocation = "București";
  const locationLabelEl = document.getElementById("location-label");
  const locationsListEl = document.getElementById("locations-list");

  const [weatherResponse, forecastResponse] = await Promise.all([
    loadData(initalLocation, "weather"),
    loadData(initalLocation, "forecast"),
  ]);

  if (weatherResponse.isOk) {
    buildWeatherSection(weatherResponse.data);
  }

  if (forecastResponse.isOk) {
    buildForecastSection(forecastResponse.data);
  }

  const handleLocationsListClick = async (e) => {
    const locationName = e.target.childNodes[0].textContent;

    const [weatherResponse, forecastResponse] = await Promise.all([
      loadData(locationName, "weather"),
      loadData(locationName, "forecast"),
    ]);

    if (weatherResponse.isOk) {
      buildWeatherSection(weatherResponse.data);
    }

    if (forecastResponse.isOk) {
      buildForecastSection(forecastResponse.data);
    }

    locationLabelEl.textContent = locationName;
  };

  const handleWindowResize = ({ target: { innerWidth } }) => {
    toggleArrowByDisplaySize(innerWidth);
  };

  toggleArrowByDisplaySize(window.innerWidth);

  locationsListEl.addEventListener("click", handleLocationsListClick);

  locationLabelEl.textContent = initalLocation;

  window.addEventListener("resize", handleWindowResize);
};

initApp();
