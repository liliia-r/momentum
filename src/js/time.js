import i18next from "i18next";
import { time, date, greeting, name } from "../utils/constants";
import { Storage } from "../services/storage";
import { storageKeys } from "../utils/constants";

function showTime() {
  let now = new Date();
  let hour = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  time.innerText = `${zeroBefore(hour)}:${zeroBefore(minutes)}:${zeroBefore(
    seconds
  )}`;

  setTimeout(showTime, 1000);
}

function zeroBefore(element) {
  return (parseInt(element, 10) < 10 ? "0" : "") + element;
}

function showDate() {
  const daysOfWeek = [
    i18next.t("daysOfWeek.sunday"),
    i18next.t("daysOfWeek.monday"),
    i18next.t("daysOfWeek.tuesday"),
    i18next.t("daysOfWeek.wednesday"),
    i18next.t("daysOfWeek.thursday"),
    i18next.t("daysOfWeek.friday"),
    i18next.t("daysOfWeek.saturday"),
  ];

  const months = [
    i18next.t("months.january"),
    i18next.t("months.february"),
    i18next.t("months.march"),
    i18next.t("months.april"),
    i18next.t("months.may"),
    i18next.t("months.june"),
    i18next.t("months.july"),
    i18next.t("months.august"),
    i18next.t("months.september"),
    i18next.t("months.october"),
    i18next.t("months.november"),
    i18next.t("months.december"),
  ];

  let now = new Date();
  let day = daysOfWeek[now.getDay()];
  let month = months[now.getMonth()];
  let dayNumber = now.getDate();

  date.innerText = `${day}, ${month} ${dayNumber}`;

  setTimeout(showDate, 1000);
}

function showGreeting() {
  const now = new Date();
  const hour = now.getHours();

  if (hour < 12 && hour >= 6) {
    greeting.textContent = i18next.t("partsOfDay.morning");
  } else if (hour >= 12 && hour < 18) {
    greeting.textContent = i18next.t("partsOfDay.afternoon");
  } else if (hour >= 18 && hour < 24) {
    greeting.textContent = i18next.t("partsOfDay.evening");
  } else {
    greeting.textContent = i18next.t("partsOfDay.night");
  }

  setTimeout(showGreeting, 1000);
}

function getName() {
  let newStorage = new Storage(localStorage);
  if (newStorage.get(storageKeys.name)) {
    name.value = newStorage.get(storageKeys.name);
  } else {
    name.value = i18next.t("date.placeholder");
  }
}

function setName(e) {
  let newStorage = new Storage(localStorage);
  if (e.type === "keypress") {
    if (e.which == 13 || e.keyCode == 13) {
      if (name.value === "") {
        getName();
        name.blur();
        return;
      }
      newStorage.save(storageKeys.name, `${name.value}`);
      name.blur();
    }
  } else {
    if (name.value === "") {
      getName();
      return;
    }
    newStorage.save(storageKeys.name, `${name.value}`);
  }
}

// Start
showTime();
showDate();
showGreeting();
getName();

name.addEventListener("keypress", setName);
name.addEventListener("blur", setName);
name.addEventListener(
  "click",
  () => (name.placeholder = i18next.t("date.placeholder"))
);
