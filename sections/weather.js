export const buildWeatherSection = ({ weather, main, wind: { speed }, dt }) => {
  const currentWeatherEl = document.getElementById("current-weather");
  const { description, icon } = weather[0];
  const { temp, humidity, feels_like, pressure } = main;

  currentWeatherEl.innerHTML = `<div class="d-flex flex-column gap-4">
    <div>Data curenta: ${new Date(dt).toUTCString()}</div>
    <div>Temperatura: ${Math.round(temp)}℃</div>
    <div>Real feel: ${Math.round(feels_like)}℃</div>
    <div>Umiditate: ${humidity}%</div>
    <div>Presiune atmosferica: ${pressure}</div>
    <div>Viteza vantului: ${speed}</div>
    <div><img src="https://openweathermap.org/img/wn/${icon}@2x.png"/></div>
    <div>${description}</div>
  <div>`;
};
