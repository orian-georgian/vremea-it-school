import { apiKey, baseUrl } from "../constants.js";

export const loadCurrentWeather = async (location) => {
  try {
    const weatherWrl = `${baseUrl}/weather/?q=${location}&units=metric&lang=Ro&appid=${apiKey}`;

    const response = await fetch(weatherWrl);
    const weather = await response.json();

    if (response.status === 200) {
      return {
        isOk: true,
        weather,
      };
    }

    return {
      isOk: false,
    };
  } catch {
    return {
      isOk: false,
    };
  }
};
