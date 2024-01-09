import { loadCurrentWeather } from "./api/currentWeather.js";
import { buildWeatherSection } from "./sections/weather.js";

const initApp = async () => {
  const initalLocation = "București";
  const locationLabelEl = document.getElementById("location-label");
  const locationsListEl = document.getElementById("locations-list");

  const { isOk, weather } = await loadCurrentWeather(initalLocation);

  if (isOk) {
    console.log(weather);
    buildWeatherSection(weather);
  }

  const handleLocationsListClick = async (e) => {
    const locationName = e.target.childNodes[0].textContent;
    const { isOk, weather } = await loadCurrentWeather(locationName);

    if (isOk) {
      console.log(weather);
      buildWeatherSection(weather);
    }

    locationLabelEl.textContent = locationName;
  };

  locationsListEl.addEventListener("click", handleLocationsListClick);

  locationLabelEl.textContent = initalLocation;
};

initApp();
