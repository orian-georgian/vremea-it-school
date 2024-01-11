import { apiKey, baseUrl } from "../constants.js";

export const loadData = async (location, subUrl) => {
  try {
    const url = `${baseUrl}/${subUrl}/?q=${location}&units=metric&lang=Ro&appid=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (response.status === 200) {
      return {
        isOk: true,
        data,
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
