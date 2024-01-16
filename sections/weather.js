import { formatDate } from "../utils/dateModification.js";
import { convertWindSpeed } from "../utils/general.js";

export const buildWeatherSection = ({
  weather,
  main,
  wind: { speed },
  dt,
  name,
}) => {
  const currentWeatherEl = document.getElementById("current-weather");
  const { description, icon } = weather[0];
  const { temp, humidity, feels_like, pressure } = main;

  const formattedDate = formatDate(dt);
  const windSpeed = convertWindSpeed(speed);

  currentWeatherEl.innerHTML = `<div class="d-flex flex-column gap-4 w-100 context-max-width-900">
    <h2 class="h2 fw-bold mb-5 text-center">Vremea curentă</h2>
    <div class="current-weather-info d-flex gap-5">
      <div class="left-side-info d-flex gap-3 flex-column">
        <div class="bold-info fs-lg">${name}</div>
        <div class="d-flex align-items-center gap-3">
          <div class="bold-info fs-xlg">${Math.round(temp)}°C</div>
          <div><img src="https://openweathermap.org/img/wn/${icon}@2x.png"/></div>
        </div>
        <div class="bold-info fs-lg">${description}</div>
      </div>

      <div class="right-side-info d-flex gap-3 flex-column ms-auto">
        <div class="bold-info fs-lg">${formattedDate}</div>
        <div class="d-flex fs-sm justify-content-between">
          <div class="label">Real feel:</div>
          <div class="value bold-info">${Math.round(feels_like)}°C</div>
        </div>
        <div class="d-flex fs-sm justify-content-between">
          <div class="label">Umiditate:</div>
          <div class="value bold-info">${humidity}%</div>
        </div>
        <div class="d-flex fs-sm justify-content-between">
          <div class="label">Presiune atmosferica:</div>
          <div class="value bold-info">${pressure} hPa</div>
        </div>
        <div class="d-flex fs-sm justify-content-between">
          <div class="label">Viteza vantului:</div>
          <div class="value bold-info">${windSpeed} km/h</div>
        </div>        
      </div>
    <div>
  <div>`;
};
