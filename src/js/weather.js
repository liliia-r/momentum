import {
  weatherIcon,
  weatherDescription,
  temperature,
  city,
  wind,
  humidity,
} from "../utils/constants";
import { Storage } from "../services/storage";
import { storageKeys } from "../utils/constants";
import i18next from "i18next";

const newStorage = new Storage(localStorage);

city.value = newStorage.get(storageKeys.city) || "Kyiv";

export default async function getWeather(lang) {
  const apiKey = "a6d71d3b082467f0f1f24a639ed561ba";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${
    city.value
  }&lang=${lang || i18next.lang}&appid=${apiKey}&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  try {
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.ceil(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `${i18next.t("weather.wind")}: ${Math.ceil(
      data.wind.speed
    )} ${i18next.t("weather.windSpeed")}`;
    humidity.textContent = `${i18next.t("weather.humidity")}: ${Math.ceil(
      data.main.humidity
    )}%`;
  } catch {
    if (data.cod === "400" || data.cod === "404") {
      temperature.textContent = "";
      weatherDescription.textContent = i18next.t("weather.placeholder");
      wind.textContent = null;
      humidity.textContent = null;
    }
  }
}

getWeather();

city.addEventListener("input", () => {
  city.value = city.value.trim();
  if (city.value) {
    city.value = city.value[0].toUpperCase() + city.value.slice(1);
  }
  getWeather();
  newStorage.save(storageKeys.city, city.value);
});

city.addEventListener("click", () => {
  city.value = "";
});
