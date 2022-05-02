import { Storage } from "../services/storage";
import { storageKeys } from "../utils/constants";
import getWeather from "../js/weather";
import { setText } from "../js/quotes";
import i18next from "../i18n/config";
import {
  player,
  weather,
  time,
  date,
  greetingContainer,
  quotes,
  todoButton,
} from "../utils/constants";

const settings = document.querySelector(".settings");
const settingsHidden = document.querySelector(".settings--hidden");
const close = document.querySelector(".close");

//Query selectors for translation
const settingsItems = document.querySelectorAll(".block__item");
const settingsTitle = document.querySelector(".settings-title");
const languageTitle = document.querySelector(".language__title");
const langRu = document.querySelector(".lang-ru");
const langEn = document.querySelector(".lang-en");
const playerBlock = document.getElementById("playerBlock");
const weatherBlock = document.getElementById("weatherBlock");
const timeBlock = document.getElementById("timeBlock");
const dateBlock = document.getElementById("dateBlock");
const greetingBlock = document.getElementById("greetingBlock");
const quoteBlock = document.getElementById("quoteBlock");
const todoBlock = document.getElementById("todoBlock");
const bgTitle = document.getElementById("bgTitle");

const settingsArr = [
  player,
  weather,
  time,
  date,
  greetingContainer,
  quotes,
  todoButton,
];

const hiddenArr = [
  document.getElementById("hidePlayer"),
  document.getElementById("hideWeather"),
  document.getElementById("hideTime"),
  document.getElementById("hideDate"),
  document.getElementById("hideGreeting"),
  document.getElementById("hideQuote"),
  document.getElementById("hideTodo"),
];

// Hide settings block
settingsItems.forEach((item, i) => {
  item.addEventListener("click", function () {
    settingsArr[i].classList.toggle("hidden");
    settingsArr[i].classList.contains("hidden")
      ? (hiddenArr[i].checked = false)
      : (hiddenArr[i].checked = true);
  });
});

// Language local storage
let newStorage = new Storage(localStorage);
let userLang = newStorage.get(storageKeys.lang);

function changeSettingsLanguage() {
  settingsTitle.textContent = i18next.t("settings.settingsTitle");
  languageTitle.textContent = i18next.t("settings.lang");
  langRu.textContent = i18next.t("settings.langRu");
  langEn.textContent = i18next.t("settings.langEn");
  playerBlock.textContent = i18next.t("settings.audioPlayer");
  weatherBlock.textContent = i18next.t("settings.weather");
  timeBlock.textContent = i18next.t("settings.time");
  dateBlock.textContent = i18next.t("settings.date");
  greetingBlock.textContent = i18next.t("settings.greeting");
  quoteBlock.textContent = i18next.t("settings.quotes");
  todoBlock.textContent = i18next.t("settings.todoButton");
  bgTitle.textContent = i18next.t("settings.imageSrc");
  todoButton.textContent = i18next.t("settings.todoButton");
}

function openSettings() {
  settingsHidden.style.transform = "translateX(0)";
}

function closeSettings() {
  settingsHidden.style.transform = "translateX(-100vw)";
  event.preventDefault();
}

langRu.addEventListener("click", () => {
  langEn.classList.remove("lang--active");
  langRu.classList.add("lang--active");
  newStorage.save(storageKeys.lang, "ru");
  i18next.changeLanguage("ru");
  getWeather("ru");
  setText();
  changeSettingsLanguage("ru");
});

langEn.addEventListener("click", () => {
  langRu.classList.remove("lang--active");
  langEn.classList.add("lang--active");
  newStorage.save(storageKeys.lang, "en");
  i18next.changeLanguage("en");
  getWeather("en");
  setText();
  changeSettingsLanguage("en");
});

settings.addEventListener("click", openSettings);
close.addEventListener("click", closeSettings);

document.addEventListener("DOMContentLoaded", function (event) {
  if (userLang === "ru") {
    langEn.classList.remove("lang--active");
    langRu.classList.add("lang--active");
    changeSettingsLanguage("ru");
  } else {
    langRu.classList.remove("lang--active");
    langEn.classList.add("lang--active");
    changeSettingsLanguage("en");
  }
});
