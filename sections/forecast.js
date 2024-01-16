import { formatDate, getHour } from "../utils/dateModification.js";
import { convertWindSpeed } from "../utils/general.js";

export const buildForecastSection = ({ list }) => {
  const forecastEl = document.getElementById("forecast-weather");

  if (forecastEl.childNodes.length > 0) {
    const length = forecastEl.childNodes.length;
    for (let i = 0; i < length; i++) {
      forecastEl.childNodes[0].remove();
    }
  }

  let prevItemDay = 0;
  let count = 0;

  const grouppedList = Object.groupBy(list, ({ dt }) => {
    const date = new Date(dt * 1000);
    const day = date.getDay();

    if (day !== prevItemDay) {
      count++;
    }

    prevItemDay = day;
    return count;
  });

  const listOfDaysForecast = Object.values(grouppedList);

  const title = document.createElement("h2");
  const forecastContainerEl = document.createElement("div");

  title.setAttribute("class", "h2 fw-bold mb-5 text-center");
  title.textContent = "Prognoză pe 5 zile";

  forecastContainerEl.setAttribute("class", "d-flex flex-column gap-5");

  forecastEl.appendChild(title);
  forecastEl.appendChild(forecastContainerEl);

  listOfDaysForecast.forEach((dayForcasts) => {
    const dayContainerEl = document.createElement("div");
    const dayForcastEl = document.createElement("div");
    const dayTitle = document.createElement("h3");
    const dayName = formatDate(dayForcasts[0].dt);

    dayForcastEl.setAttribute("class", "d-flex gap-5 flex-wrap");

    dayTitle.style = `font-family: "Poppins"; font-weight:600; margin-bottom: 20px`;
    dayTitle.textContent = dayName;

    dayForcasts.forEach(({ weather, main, wind: { speed }, dt }) => {
      const cardEl = document.createElement("div");
      const cardHourEl = document.createElement("div");
      const cardBodyEl = document.createElement("div");
      const imageContainerEl = document.createElement("div");
      const imageEl = document.createElement("img");
      const temperatureEl = document.createElement("div");
      const descriptionEl = document.createElement("div");

      const realFeelEl = document.createElement("div");
      const humidityEl = document.createElement("div");
      const pressureEl = document.createElement("div");
      const windSpeedEl = document.createElement("div");

      const { description, icon } = weather[0];
      const windSpeed = convertWindSpeed(speed);
      const { temp, humidity, feels_like, pressure } = main;
      const hour = getHour(dt);

      imageContainerEl.setAttribute(
        "class",
        "d-flex align-items-center justify-content-between pe-4"
      );

      dayContainerEl.setAttribute("class", "mb-5");

      temperatureEl.setAttribute("class", "bold-info fs-lg");
      temperatureEl.textContent = `${Math.round(temp)}°C`;

      descriptionEl.setAttribute("class", "bold-info fs-sm");
      descriptionEl.textContent = description;

      realFeelEl.innerHTML = `<div class="forecast-values d-flex align-items-center justify-content-between gap-3">
        <div>Real feel:</div>
        <div>${Math.round(feels_like)}°C</div>
      </div>`;

      humidityEl.innerHTML = `<div class="forecast-values d-flex align-items-center justify-content-between gap-3">
        <div>Umiditate:</div>
        <div>${humidity}%</div>
      </div>`;

      pressureEl.innerHTML = `<div class="forecast-values d-flex align-items-center justify-content-between gap-3">
        <div>Presiune atmosferica:</div>
        <div>${pressure} hPa</div>
      </div>`;

      windSpeedEl.innerHTML = `<div class="forecast-values d-flex align-items-center justify-content-between gap-3">
        <div>Viteza vantului:</div>
        <div>${windSpeed} km/h</div>
      </div>`;

      cardBodyEl.setAttribute("class", "card-body d-flex flex-column gap-3");
      cardEl.setAttribute("class", "card p-4");
      cardHourEl.setAttribute(
        "class",
        "card-hour position-absolute d-flex justify-content-center align-items-center"
      );
      cardHourEl.textContent = hour;

      imageEl.setAttribute(
        "src",
        `https://openweathermap.org/img/wn/${icon}@2x.png`
      );

      imageContainerEl.appendChild(imageEl);
      imageContainerEl.appendChild(temperatureEl);

      cardBodyEl.appendChild(descriptionEl);
      cardBodyEl.appendChild(realFeelEl);
      cardBodyEl.appendChild(humidityEl);
      cardBodyEl.appendChild(pressureEl);
      cardBodyEl.appendChild(windSpeedEl);

      cardEl.appendChild(imageContainerEl);
      cardEl.appendChild(cardBodyEl);
      cardEl.appendChild(cardHourEl);

      dayForcastEl.appendChild(cardEl);
    });

    dayContainerEl.appendChild(dayTitle);
    dayContainerEl.appendChild(dayForcastEl);
    forecastContainerEl.appendChild(dayContainerEl);
  });
};
