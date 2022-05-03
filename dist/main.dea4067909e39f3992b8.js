/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./i18n/config.js":
/*!************************!*\
  !*** ./i18n/config.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var i18next__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! i18next */ "../node_modules/i18next/dist/esm/i18next.js");
/* harmony import */ var _services_storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/storage */ "./services/storage.js");
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/constants */ "./utils/constants.js");
/* harmony import */ var _translations_en_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./translations/en.json */ "./i18n/translations/en.json");
/* harmony import */ var _translations_ru_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./translations/ru.json */ "./i18n/translations/ru.json");
/* harmony import */ var _translations_quotesEn_json__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./translations/quotesEn.json */ "./i18n/translations/quotesEn.json");
/* harmony import */ var _translations_quotesRu_json__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./translations/quotesRu.json */ "./i18n/translations/quotesRu.json");








function checkLocalStorage() {
  const newStorage = new _services_storage__WEBPACK_IMPORTED_MODULE_1__.Storage(localStorage);
  let lang = newStorage.get(_utils_constants__WEBPACK_IMPORTED_MODULE_2__.storageKeys.lang);
  return lang ? `${lang}` : "en";
}

i18next__WEBPACK_IMPORTED_MODULE_0__["default"].init({
  lng: checkLocalStorage(),
  debug: true,
  resources: {
    en: {
      translation: { ..._translations_en_json__WEBPACK_IMPORTED_MODULE_3__,
        ..._translations_quotesEn_json__WEBPACK_IMPORTED_MODULE_5__
      }
    },
    ru: {
      translation: { ..._translations_ru_json__WEBPACK_IMPORTED_MODULE_4__,
        ..._translations_quotesRu_json__WEBPACK_IMPORTED_MODULE_6__
      }
    }
  }
}); // initialized and ready to go!
// i18next is already initialized, because the translation resources where passed via init function
// document.querySelector(".date").innerHTML = i18next.t("key");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (i18next__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./js/audio.js":
/*!*********************!*\
  !*** ./js/audio.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/constants */ "./utils/constants.js");
/* harmony import */ var _utils_songs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/songs */ "./utils/songs.js");


let audio = new Audio();
let playNum = 0;
let isPlay = false;
let init = false;
let mouseDown = false;
let curDuration;
let currentTime;
let currentPlayItem;
let curAudioTitle;
_utils_songs__WEBPACK_IMPORTED_MODULE_1__.songs.forEach((song, i) => {
  const audioItem = document.createElement("li");
  const btn = document.createElement("button");
  const p = document.createElement("p");
  audioItem.classList.add("audio-item");
  btn.classList.add("play");
  btn.classList.add("player-icon");
  btn.classList.add("player-btn");
  audioItem.dataset.playListNum = i;
  p.textContent = song.title;
  _utils_constants__WEBPACK_IMPORTED_MODULE_0__.playList.appendChild(audioItem);
  audioItem.appendChild(p);
  audioItem.prepend(btn);
  if (i === 0) currentPlayItem = audioItem;
});
audio.src = _utils_songs__WEBPACK_IMPORTED_MODULE_1__.songs[playNum].src;
curDuration = _utils_songs__WEBPACK_IMPORTED_MODULE_1__.songs[playNum].duration;
curAudioTitle = _utils_songs__WEBPACK_IMPORTED_MODULE_1__.songs[playNum].title;

const playAudio = () => {
  if (!isPlay) audio.play();else audio.pause();
  isPlay = !isPlay;
};

const toggleBtn = () => {
  _utils_constants__WEBPACK_IMPORTED_MODULE_0__.play.classList.toggle("pause");
  document.querySelector(`[data-play-list-num="${playNum}"]`).querySelector(".player-btn").classList.toggle("pause");
  document.querySelector(`[data-play-list-num="${playNum}"]`).querySelector(".player-btn").classList.toggle("pause-active");
};

const toggleActive = () => {
  if (!isPlay) return;
  const newCurPlayItem = document.querySelector(`[data-play-list-num="${playNum}"]`);
  if (!currentPlayItem.classList.contains("active")) newCurPlayItem.classList.toggle("active");else {
    currentPlayItem.classList.toggle("active");
    currentPlayItem = newCurPlayItem;
    currentPlayItem.classList.toggle("active");
  }
  currentPlayItem = newCurPlayItem;
};

const changePlayAudio = () => {
  if (!init) {
    audio.addEventListener("timeupdate", nextOnTime);
    _utils_constants__WEBPACK_IMPORTED_MODULE_0__.progressTime.addEventListener("click", scrub);
    _utils_constants__WEBPACK_IMPORTED_MODULE_0__.progressTime.addEventListener("mousemove", e => {
      if (mouseDown) scrub(e);
    });
    _utils_constants__WEBPACK_IMPORTED_MODULE_0__.progressTime.addEventListener("mousedown", () => {
      audio.pause();
      audio.removeEventListener("timeupdate", nextOnTime);
      mouseDown = true;
    });
    _utils_constants__WEBPACK_IMPORTED_MODULE_0__.progressTime.addEventListener("mouseup", () => {
      if (_utils_constants__WEBPACK_IMPORTED_MODULE_0__.play.classList.contains("pause")) audio.play();
      audio.addEventListener("timeupdate", nextOnTime);
      mouseDown = false;
    });
    init = !init;
  }

  _utils_constants__WEBPACK_IMPORTED_MODULE_0__.songDuration.textContent = curDuration;
  _utils_constants__WEBPACK_IMPORTED_MODULE_0__.songTitle.textContent = curAudioTitle;
  playAudio();
  toggleBtn();
  toggleActive();
};

const playNextAudio = () => {
  if (isPlay) changePlayAudio();
  playNum = playNum === _utils_songs__WEBPACK_IMPORTED_MODULE_1__.songs.length - 1 ? 0 : playNum + 1;
  audio.src = _utils_songs__WEBPACK_IMPORTED_MODULE_1__.songs[playNum].src;
  curDuration = _utils_songs__WEBPACK_IMPORTED_MODULE_1__.songs[playNum].duration;
  curAudioTitle = _utils_songs__WEBPACK_IMPORTED_MODULE_1__.songs[playNum].title;
  changePlayAudio();
};

const playPrevAudio = () => {
  if (isPlay) changePlayAudio();
  playNum = playNum === 0 ? _utils_songs__WEBPACK_IMPORTED_MODULE_1__.songs.length - 1 : playNum - 1;
  audio.src = _utils_songs__WEBPACK_IMPORTED_MODULE_1__.songs[playNum].src;
  curDuration = _utils_songs__WEBPACK_IMPORTED_MODULE_1__.songs[playNum].duration;
  curAudioTitle = _utils_songs__WEBPACK_IMPORTED_MODULE_1__.songs[playNum].title;
  changePlayAudio();
};

const nextOnTime = () => {
  _utils_constants__WEBPACK_IMPORTED_MODULE_0__.currentSound.textContent = updateTimeProgress();
  if (audio.currentTime === audio.songDuration) playNextAudio();
};

function updateTimeProgress() {
  let minutes = Math.floor(audio.currentTime / 60);
  let seconds = Math.floor(audio.currentTime % 60);

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  if (seconds) {
    _utils_constants__WEBPACK_IMPORTED_MODULE_0__.currentSound.textContent = `${minutes}:${seconds}`;
  }

  _utils_constants__WEBPACK_IMPORTED_MODULE_0__.progressTime.value = audio.currentTime / audio.duration * 100;
  audio.currentTime = _utils_constants__WEBPACK_IMPORTED_MODULE_0__.progressTime.offsetX / _utils_constants__WEBPACK_IMPORTED_MODULE_0__.progressTime.offsetWidth * audio.duration;
}

function scrub(event) {
  audio.currentTime = event.target.value * (audio.duration / 100);
}

function updateProgressBarVol() {
  audio.volume = _utils_constants__WEBPACK_IMPORTED_MODULE_0__.progressSound.value / 100;
  audio.volume === 0 ? _utils_constants__WEBPACK_IMPORTED_MODULE_0__.sound.style.backgroundImage = 'url("assets/svg/soundfalse.svg")' : _utils_constants__WEBPACK_IMPORTED_MODULE_0__.sound.style.backgroundImage = 'url("assets/svg/sound.svg")';
}

function mute() {
  audio.muted = audio.muted === false ? true : false;

  if (_utils_constants__WEBPACK_IMPORTED_MODULE_0__.progressSound.value === 0 || audio.muted) {
    _utils_constants__WEBPACK_IMPORTED_MODULE_0__.sound.style.backgroundImage = 'url("assets/svg/soundfalse.svg")';
    _utils_constants__WEBPACK_IMPORTED_MODULE_0__.progressSound.value = 0;
  } else {
    _utils_constants__WEBPACK_IMPORTED_MODULE_0__.sound.style.backgroundImage = 'url("assets/svg/sound.svg")';
    _utils_constants__WEBPACK_IMPORTED_MODULE_0__.progressSound.value = 40;
  }
}

_utils_constants__WEBPACK_IMPORTED_MODULE_0__.play.addEventListener("click", changePlayAudio);
_utils_constants__WEBPACK_IMPORTED_MODULE_0__.prevSong.addEventListener("click", playPrevAudio);
_utils_constants__WEBPACK_IMPORTED_MODULE_0__.nextSong.addEventListener("click", playNextAudio);
audio.addEventListener("ended", playNextAudio);
_utils_constants__WEBPACK_IMPORTED_MODULE_0__.progressTime.addEventListener("input", scrub);
_utils_constants__WEBPACK_IMPORTED_MODULE_0__.progressSound.addEventListener("input", updateProgressBarVol);
_utils_constants__WEBPACK_IMPORTED_MODULE_0__.sound.addEventListener("click", mute);
const btns = document.querySelectorAll(".player-btn");
btns.forEach(elem => {
  elem.addEventListener("click", () => {
    console.log(elem);
    const curPN = +elem.parentNode.dataset.playListNum;
    const a = audio.src.split("/").pop().split("%20").join(" ");
    const b = _utils_songs__WEBPACK_IMPORTED_MODULE_1__.songs[curPN].src.split("/").pop();

    if (isPlay) {
      changePlayAudio();

      if (a !== b) {
        playNum = curPN;
        audio.src = _utils_songs__WEBPACK_IMPORTED_MODULE_1__.songs[playNum].src;
        curDuration = _utils_songs__WEBPACK_IMPORTED_MODULE_1__.songs[playNum].duration;
        curAudioTitle = _utils_songs__WEBPACK_IMPORTED_MODULE_1__.songs[playNum].title;
        changePlayAudio();
      }
    } else {
      if (a !== b) {
        playNum = curPN;
        audio.src = _utils_songs__WEBPACK_IMPORTED_MODULE_1__.songs[playNum].src;
        curDuration = _utils_songs__WEBPACK_IMPORTED_MODULE_1__.songs[playNum].duration;
        curAudioTitle = _utils_songs__WEBPACK_IMPORTED_MODULE_1__.songs[playNum].title;
        changePlayAudio();
      }

      if (!init || a === b) changePlayAudio();
    }
  });
});

/***/ }),

/***/ "./js/background.js":
/*!**************************!*\
  !*** ./js/background.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/constants */ "./utils/constants.js");
/* harmony import */ var _services_storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/storage */ "./services/storage.js");
/* harmony import */ var _getRandomNum__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getRandomNum */ "./js/getRandomNum.js");




(0,_getRandomNum__WEBPACK_IMPORTED_MODULE_2__.getRandomNum)(1, 20);
let locRandomNum = _getRandomNum__WEBPACK_IMPORTED_MODULE_2__.randomNum;
const newStorage = new _services_storage__WEBPACK_IMPORTED_MODULE_1__.Storage(localStorage);

const getLinkToImage = async (api, img, randomNum) => {
  const url = api === "unsplash" ? `https://api.unsplash.com/photos/random?query=nature&client_id=CpIz-7cJQ28Juh8IPCc1x5BLWNFzt4lrTe5cgTp5uT8` : `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=649b25d311697ca9cd2604bffa8c8dd5&tags=tree&extras=url_l&format=json&nojsoncallback=1&`;
  const res = await fetch(url);
  const data = await res.json();

  if (api === "unsplash") {
    img.src = data.urls.regular;
  } else {
    img.src = data.photos.photo[randomNum - 1].url_l;
  }
};

const getSlideNext = () => {
  _utils_constants__WEBPACK_IMPORTED_MODULE_0__.next.removeEventListener("click", getSlideNext);
  _utils_constants__WEBPACK_IMPORTED_MODULE_0__.body.addEventListener("transitionend", transitionBg);
  locRandomNum = +locRandomNum === 20 ? "1" : (+locRandomNum + 1).toString().padStart(2, "0");
  setBg();
};

const getSlidePrev = () => {
  _utils_constants__WEBPACK_IMPORTED_MODULE_0__.prev.removeEventListener("click", getSlidePrev);
  _utils_constants__WEBPACK_IMPORTED_MODULE_0__.body.addEventListener("transitionend", transitionBg);
  locRandomNum = +locRandomNum === 1 ? "20" : (+locRandomNum - 1).toString().padStart(2, "0");
  setBg();
};

const transitionBg = e => {
  if (_utils_constants__WEBPACK_IMPORTED_MODULE_0__.body != e.target) return;
  _utils_constants__WEBPACK_IMPORTED_MODULE_0__.next.addEventListener("click", getSlideNext);
  _utils_constants__WEBPACK_IMPORTED_MODULE_0__.prev.addEventListener("click", getSlidePrev);
  _utils_constants__WEBPACK_IMPORTED_MODULE_0__.body.removeEventListener("transitionend", transitionBg);
};

const getTimeOfDay = () => {
  const now = new Date();
  const hour = now.getHours();
  return Math.floor(hour / 6);
}; // Background image Local Storage


const changeSource = () => {
  let sourceForm = new FormData(document.querySelector(".background__inputs"));
  let source = sourceForm.get("bgSrc");
  newStorage.save(_utils_constants__WEBPACK_IMPORTED_MODULE_0__.storageKeys.backgroundSource, source);
};

const setBg = () => {
  let source = newStorage.get("backgroundSource") || "gitHub";
  const partsOfDay = ["night", "morning", "afternoon", "evening"];
  const dayPart = getTimeOfDay();
  let currentTime = partsOfDay[dayPart];
  const img = new Image();

  if (source === "gitHub") {
    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${currentTime}/${locRandomNum.toString().padStart(2, "0")}.jpg`;
  } else {
    if (source === "unsplash") {
      getLinkToImage("unsplash", img);
    }

    if (source === "flickr") {
      let rn = _getRandomNum__WEBPACK_IMPORTED_MODULE_2__.randomNum;

      while (rn === _getRandomNum__WEBPACK_IMPORTED_MODULE_2__.randomNum) {
        (0,_getRandomNum__WEBPACK_IMPORTED_MODULE_2__.getRandomNum)(1, 100);
      }

      getLinkToImage("flickr", img, _getRandomNum__WEBPACK_IMPORTED_MODULE_2__.randomNum);
    }
  }

  img.addEventListener("load", () => {
    _utils_constants__WEBPACK_IMPORTED_MODULE_0__.body.style.backgroundImage = `url(${img.src})`;
  });
};

window.addEventListener("load", setBg);
_utils_constants__WEBPACK_IMPORTED_MODULE_0__.body.addEventListener("DOMContentLoaded", setBg);
_utils_constants__WEBPACK_IMPORTED_MODULE_0__.next.addEventListener("click", getSlideNext);
_utils_constants__WEBPACK_IMPORTED_MODULE_0__.prev.addEventListener("click", getSlidePrev);
_utils_constants__WEBPACK_IMPORTED_MODULE_0__.radioButtons.forEach(radioButton => radioButton.onchange = function () {
  changeSource();
  setBg();
});

/***/ }),

/***/ "./js/getRandomNum.js":
/*!****************************!*\
  !*** ./js/getRandomNum.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getRandomNum": () => (/* binding */ getRandomNum),
/* harmony export */   "randomNum": () => (/* binding */ randomNum)
/* harmony export */ });
const getRandomNum = (min, max) => {
  randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
};
let randomNum;

/***/ }),

/***/ "./js/quotes.js":
/*!**********************!*\
  !*** ./js/quotes.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setText": () => (/* binding */ setText),
/* harmony export */   "default": () => (/* binding */ getQuote)
/* harmony export */ });
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/constants */ "./utils/constants.js");
/* harmony import */ var i18next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! i18next */ "../node_modules/i18next/dist/esm/i18next.js");


let currentKey;
const setText = () => {
  _utils_constants__WEBPACK_IMPORTED_MODULE_0__.quote.textContent = i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t(`quotesData.${currentKey}.text`);
  _utils_constants__WEBPACK_IMPORTED_MODULE_0__.author.textContent = i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t(`quotesData.${currentKey}.author`);
};
async function getQuote() {
  const res = await fetch("../i18n/translations/quotesEn.json");
  const data = await res.json();
  const keys = Object.keys(data);
  let current = Math.floor(Math.random() * (keys.length - 1));
  currentKey = keys[current];
  setText();
}
document.addEventListener("DOMContentLoaded", getQuote);
_utils_constants__WEBPACK_IMPORTED_MODULE_0__.changeQuote.addEventListener("click", getQuote);

/***/ }),

/***/ "./js/settings.js":
/*!************************!*\
  !*** ./js/settings.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/storage */ "./services/storage.js");
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/constants */ "./utils/constants.js");
/* harmony import */ var _js_weather__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../js/weather */ "./js/weather.js");
/* harmony import */ var _js_quotes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../js/quotes */ "./js/quotes.js");
/* harmony import */ var _i18n_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../i18n/config */ "./i18n/config.js");






const settings = document.querySelector(".settings");
const settingsHidden = document.querySelector(".settings--hidden");
const close = document.querySelector(".close"); //Query selectors for translation

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
const settingsArr = [_utils_constants__WEBPACK_IMPORTED_MODULE_1__.player, _utils_constants__WEBPACK_IMPORTED_MODULE_1__.weather, _utils_constants__WEBPACK_IMPORTED_MODULE_1__.time, _utils_constants__WEBPACK_IMPORTED_MODULE_1__.date, _utils_constants__WEBPACK_IMPORTED_MODULE_1__.greetingContainer, _utils_constants__WEBPACK_IMPORTED_MODULE_1__.quotes, _utils_constants__WEBPACK_IMPORTED_MODULE_1__.todoButton];
const hiddenArr = [document.getElementById("hidePlayer"), document.getElementById("hideWeather"), document.getElementById("hideTime"), document.getElementById("hideDate"), document.getElementById("hideGreeting"), document.getElementById("hideQuote"), document.getElementById("hideTodo")]; // Hide settings block

settingsItems.forEach((item, i) => {
  item.addEventListener("click", function () {
    settingsArr[i].classList.toggle("hidden");
    settingsArr[i].classList.contains("hidden") ? hiddenArr[i].checked = false : hiddenArr[i].checked = true;
  });
}); // Language local storage

let newStorage = new _services_storage__WEBPACK_IMPORTED_MODULE_0__.Storage(localStorage);
let userLang = newStorage.get(_utils_constants__WEBPACK_IMPORTED_MODULE_1__.storageKeys.lang);

function changeSettingsLanguage() {
  settingsTitle.textContent = _i18n_config__WEBPACK_IMPORTED_MODULE_4__["default"].t("settings.settingsTitle");
  languageTitle.textContent = _i18n_config__WEBPACK_IMPORTED_MODULE_4__["default"].t("settings.lang");
  langRu.textContent = _i18n_config__WEBPACK_IMPORTED_MODULE_4__["default"].t("settings.langRu");
  langEn.textContent = _i18n_config__WEBPACK_IMPORTED_MODULE_4__["default"].t("settings.langEn");
  playerBlock.textContent = _i18n_config__WEBPACK_IMPORTED_MODULE_4__["default"].t("settings.audioPlayer");
  weatherBlock.textContent = _i18n_config__WEBPACK_IMPORTED_MODULE_4__["default"].t("settings.weather");
  timeBlock.textContent = _i18n_config__WEBPACK_IMPORTED_MODULE_4__["default"].t("settings.time");
  dateBlock.textContent = _i18n_config__WEBPACK_IMPORTED_MODULE_4__["default"].t("settings.date");
  greetingBlock.textContent = _i18n_config__WEBPACK_IMPORTED_MODULE_4__["default"].t("settings.greeting");
  quoteBlock.textContent = _i18n_config__WEBPACK_IMPORTED_MODULE_4__["default"].t("settings.quotes");
  todoBlock.textContent = _i18n_config__WEBPACK_IMPORTED_MODULE_4__["default"].t("settings.todoButton");
  bgTitle.textContent = _i18n_config__WEBPACK_IMPORTED_MODULE_4__["default"].t("settings.imageSrc");
  _utils_constants__WEBPACK_IMPORTED_MODULE_1__.todoButton.textContent = _i18n_config__WEBPACK_IMPORTED_MODULE_4__["default"].t("settings.todoButton");
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
  newStorage.save(_utils_constants__WEBPACK_IMPORTED_MODULE_1__.storageKeys.lang, "ru");
  _i18n_config__WEBPACK_IMPORTED_MODULE_4__["default"].changeLanguage("ru");
  (0,_js_weather__WEBPACK_IMPORTED_MODULE_2__["default"])("ru");
  (0,_js_quotes__WEBPACK_IMPORTED_MODULE_3__.setText)();
  changeSettingsLanguage("ru");
});
langEn.addEventListener("click", () => {
  langRu.classList.remove("lang--active");
  langEn.classList.add("lang--active");
  newStorage.save(_utils_constants__WEBPACK_IMPORTED_MODULE_1__.storageKeys.lang, "en");
  _i18n_config__WEBPACK_IMPORTED_MODULE_4__["default"].changeLanguage("en");
  (0,_js_weather__WEBPACK_IMPORTED_MODULE_2__["default"])("en");
  (0,_js_quotes__WEBPACK_IMPORTED_MODULE_3__.setText)();
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

/***/ }),

/***/ "./js/time.js":
/*!********************!*\
  !*** ./js/time.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var i18next__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! i18next */ "../node_modules/i18next/dist/esm/i18next.js");
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/constants */ "./utils/constants.js");
/* harmony import */ var _services_storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/storage */ "./services/storage.js");





function showTime() {
  let now = new Date();
  let hour = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  _utils_constants__WEBPACK_IMPORTED_MODULE_1__.time.innerText = `${zeroBefore(hour)}:${zeroBefore(minutes)}:${zeroBefore(seconds)}`;
  setTimeout(showTime, 1000);
}

function zeroBefore(element) {
  return (parseInt(element, 10) < 10 ? "0" : "") + element;
}

function showDate() {
  const daysOfWeek = [i18next__WEBPACK_IMPORTED_MODULE_0__["default"].t("daysOfWeek.sunday"), i18next__WEBPACK_IMPORTED_MODULE_0__["default"].t("daysOfWeek.monday"), i18next__WEBPACK_IMPORTED_MODULE_0__["default"].t("daysOfWeek.tuesday"), i18next__WEBPACK_IMPORTED_MODULE_0__["default"].t("daysOfWeek.wednesday"), i18next__WEBPACK_IMPORTED_MODULE_0__["default"].t("daysOfWeek.thursday"), i18next__WEBPACK_IMPORTED_MODULE_0__["default"].t("daysOfWeek.friday"), i18next__WEBPACK_IMPORTED_MODULE_0__["default"].t("daysOfWeek.saturday")];
  const months = [i18next__WEBPACK_IMPORTED_MODULE_0__["default"].t("months.january"), i18next__WEBPACK_IMPORTED_MODULE_0__["default"].t("months.february"), i18next__WEBPACK_IMPORTED_MODULE_0__["default"].t("months.march"), i18next__WEBPACK_IMPORTED_MODULE_0__["default"].t("months.april"), i18next__WEBPACK_IMPORTED_MODULE_0__["default"].t("months.may"), i18next__WEBPACK_IMPORTED_MODULE_0__["default"].t("months.june"), i18next__WEBPACK_IMPORTED_MODULE_0__["default"].t("months.july"), i18next__WEBPACK_IMPORTED_MODULE_0__["default"].t("months.august"), i18next__WEBPACK_IMPORTED_MODULE_0__["default"].t("months.september"), i18next__WEBPACK_IMPORTED_MODULE_0__["default"].t("months.october"), i18next__WEBPACK_IMPORTED_MODULE_0__["default"].t("months.november"), i18next__WEBPACK_IMPORTED_MODULE_0__["default"].t("months.december")];
  let now = new Date();
  let day = daysOfWeek[now.getDay()];
  let month = months[now.getMonth()];
  let dayNumber = now.getDate();
  _utils_constants__WEBPACK_IMPORTED_MODULE_1__.date.innerText = `${day}, ${month} ${dayNumber}`;
  setTimeout(showDate, 1000);
}

function showGreeting() {
  const now = new Date();
  const hour = now.getHours();

  if (hour < 12 && hour >= 6) {
    _utils_constants__WEBPACK_IMPORTED_MODULE_1__.greeting.textContent = i18next__WEBPACK_IMPORTED_MODULE_0__["default"].t("partsOfDay.morning");
  } else if (hour >= 12 && hour < 18) {
    _utils_constants__WEBPACK_IMPORTED_MODULE_1__.greeting.textContent = i18next__WEBPACK_IMPORTED_MODULE_0__["default"].t("partsOfDay.afternoon");
  } else if (hour >= 18 && hour < 24) {
    _utils_constants__WEBPACK_IMPORTED_MODULE_1__.greeting.textContent = i18next__WEBPACK_IMPORTED_MODULE_0__["default"].t("partsOfDay.evening");
  } else {
    _utils_constants__WEBPACK_IMPORTED_MODULE_1__.greeting.textContent = i18next__WEBPACK_IMPORTED_MODULE_0__["default"].t("partsOfDay.night");
  }

  setTimeout(showGreeting, 1000);
}

function getName() {
  let newStorage = new _services_storage__WEBPACK_IMPORTED_MODULE_2__.Storage(localStorage);

  if (newStorage.get(_utils_constants__WEBPACK_IMPORTED_MODULE_1__.storageKeys.name)) {
    _utils_constants__WEBPACK_IMPORTED_MODULE_1__.name.value = newStorage.get(_utils_constants__WEBPACK_IMPORTED_MODULE_1__.storageKeys.name);
  } else {
    _utils_constants__WEBPACK_IMPORTED_MODULE_1__.name.value = i18next__WEBPACK_IMPORTED_MODULE_0__["default"].t("date.placeholder");
  }
}

function setName(e) {
  let newStorage = new _services_storage__WEBPACK_IMPORTED_MODULE_2__.Storage(localStorage);

  if (e.type === "keypress") {
    if (e.which == 13 || e.keyCode == 13) {
      if (_utils_constants__WEBPACK_IMPORTED_MODULE_1__.name.value === "") {
        getName();
        _utils_constants__WEBPACK_IMPORTED_MODULE_1__.name.blur();
        return;
      }

      newStorage.save(_utils_constants__WEBPACK_IMPORTED_MODULE_1__.storageKeys.name, `${_utils_constants__WEBPACK_IMPORTED_MODULE_1__.name.value}`);
      _utils_constants__WEBPACK_IMPORTED_MODULE_1__.name.blur();
    }
  } else {
    if (_utils_constants__WEBPACK_IMPORTED_MODULE_1__.name.value === "") {
      getName();
      return;
    }

    newStorage.save(_utils_constants__WEBPACK_IMPORTED_MODULE_1__.storageKeys.name, `${_utils_constants__WEBPACK_IMPORTED_MODULE_1__.name.value}`);
  }
} // Start


showTime();
showDate();
showGreeting();
getName();
_utils_constants__WEBPACK_IMPORTED_MODULE_1__.name.addEventListener("keypress", setName);
_utils_constants__WEBPACK_IMPORTED_MODULE_1__.name.addEventListener("blur", setName);
_utils_constants__WEBPACK_IMPORTED_MODULE_1__.name.addEventListener("click", () => _utils_constants__WEBPACK_IMPORTED_MODULE_1__.name.placeholder = i18next__WEBPACK_IMPORTED_MODULE_0__["default"].t("date.placeholder"));

/***/ }),

/***/ "./js/todo.js":
/*!********************!*\
  !*** ./js/todo.js ***!
  \********************/
/***/ (() => {

const todoButton = document.querySelector(".button-todo");
const todo = document.querySelector(".todo");
let todoOpen = false;

function toggleTodo() {
  if (todoOpen === false) {
    todoOpen = true;
    todo.style.transform = "translateX(0)";
  } else if (todoOpen === true) {
    todoOpen = false;
    todo.style.transform = "translateX(120%)";
  }
}

const todoFunction = {
  action(e) {
    if (e.target.classList.contains("todo-action")) {
      const action = e.target.dataset.todoAction;
      const elemItem = e.target.closest(".todo-item");

      if (action === "deleted" && elemItem.dataset.todoState === "deleted") {
        elemItem.remove();
      } else {
        elemItem.dataset.todoState = action;
      }

      this.save();
    } else if (e.target.classList.contains("todo-icon")) {
      this.add();
      this.save();
    }
  },

  add() {
    const elemText = document.querySelector(".todo-text");

    if (elemText.disabled || !elemText.value.length) {
      return;
    }

    document.querySelector(".todo-items").insertAdjacentHTML("beforeend", this.create(elemText.value));
    elemText.value = "";
  },

  create(text) {
    return `<li class="todo-item" data-todo-state="active">
    <span class="todo-task">${text}</span>
    <span class="todo-action todo-action_restore" data-todo-action="active"></span>
    <span class="todo-action todo-action_complete" data-todo-action="completed"></span>
    <span class="todo-action todo-action_delete" data-todo-action="deleted"></span></li>`;
  },

  init() {
    const fromStorage = localStorage.getItem("todo");

    if (fromStorage) {
      document.querySelector(".todo-items").innerHTML = fromStorage;
    }

    document.querySelector(".todo-options").addEventListener("change", this.update);
    document.addEventListener("click", this.action.bind(this));
  },

  update() {
    const option = document.querySelector(".todo-options").value;
    document.querySelector(".todo-items").dataset.todoOption = option;
    document.querySelector(".todo-text").disabled = option !== "active";
  },

  save() {
    localStorage.setItem("todo", document.querySelector(".todo__items").innerHTML);
  }

};
todoFunction.init();
todoButton.addEventListener("click", toggleTodo);

/***/ }),

/***/ "./js/weather.js":
/*!***********************!*\
  !*** ./js/weather.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getWeather)
/* harmony export */ });
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/constants */ "./utils/constants.js");
/* harmony import */ var _services_storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/storage */ "./services/storage.js");
/* harmony import */ var i18next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! i18next */ "../node_modules/i18next/dist/esm/i18next.js");




const newStorage = new _services_storage__WEBPACK_IMPORTED_MODULE_1__.Storage(localStorage);
_utils_constants__WEBPACK_IMPORTED_MODULE_0__.city.value = newStorage.get(_utils_constants__WEBPACK_IMPORTED_MODULE_0__.storageKeys.city) || "Kyiv";
async function getWeather(lang) {
  const apiKey = "a6d71d3b082467f0f1f24a639ed561ba";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${_utils_constants__WEBPACK_IMPORTED_MODULE_0__.city.value}&lang=${lang || i18next__WEBPACK_IMPORTED_MODULE_2__["default"].lang}&appid=${apiKey}&units=metric`;
  const res = await fetch(url);
  const data = await res.json();

  try {
    _utils_constants__WEBPACK_IMPORTED_MODULE_0__.weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    _utils_constants__WEBPACK_IMPORTED_MODULE_0__.temperature.textContent = `${Math.ceil(data.main.temp)}°C`;
    _utils_constants__WEBPACK_IMPORTED_MODULE_0__.weatherDescription.textContent = data.weather[0].description;
    _utils_constants__WEBPACK_IMPORTED_MODULE_0__.wind.textContent = `${i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t("weather.wind")}: ${Math.ceil(data.wind.speed)} ${i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t("weather.windSpeed")}`;
    _utils_constants__WEBPACK_IMPORTED_MODULE_0__.humidity.textContent = `${i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t("weather.humidity")}: ${Math.ceil(data.main.humidity)}%`;
  } catch {
    if (data.cod === "400" || data.cod === "404") {
      _utils_constants__WEBPACK_IMPORTED_MODULE_0__.temperature.textContent = "";
      _utils_constants__WEBPACK_IMPORTED_MODULE_0__.weatherDescription.textContent = i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t("weather.placeholder");
      _utils_constants__WEBPACK_IMPORTED_MODULE_0__.wind.textContent = null;
      _utils_constants__WEBPACK_IMPORTED_MODULE_0__.humidity.textContent = null;
    }
  }
}
getWeather();
_utils_constants__WEBPACK_IMPORTED_MODULE_0__.city.addEventListener("input", () => {
  _utils_constants__WEBPACK_IMPORTED_MODULE_0__.city.value = _utils_constants__WEBPACK_IMPORTED_MODULE_0__.city.value.trim();

  if (_utils_constants__WEBPACK_IMPORTED_MODULE_0__.city.value) {
    _utils_constants__WEBPACK_IMPORTED_MODULE_0__.city.value = _utils_constants__WEBPACK_IMPORTED_MODULE_0__.city.value[0].toUpperCase() + _utils_constants__WEBPACK_IMPORTED_MODULE_0__.city.value.slice(1);
  }

  getWeather();
  newStorage.save(_utils_constants__WEBPACK_IMPORTED_MODULE_0__.storageKeys.city, _utils_constants__WEBPACK_IMPORTED_MODULE_0__.city.value);
});
_utils_constants__WEBPACK_IMPORTED_MODULE_0__.city.addEventListener("click", () => {
  _utils_constants__WEBPACK_IMPORTED_MODULE_0__.city.value = "";
});

/***/ }),

/***/ "./services/storage.js":
/*!*****************************!*\
  !*** ./services/storage.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Storage": () => (/* binding */ Storage)
/* harmony export */ });
class Storage {
  constructor(storage) {
    this.storage = storage;
  }

  get(key) {
    const items = this.storage.getItem(key);
    return items ? JSON.parse(items) : null;
  }

  save(key, value) {
    try {
      this.storage.setItem(key, JSON.stringify(value));
    } catch (err) {
      throw new Error();
    }
  }

  remove(key) {
    try {
      this.storage.removeItem(key);
    } catch (err) {
      throw new Error();
    }
  }

}

/***/ }),

/***/ "./utils/constants.js":
/*!****************************!*\
  !*** ./utils/constants.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "time": () => (/* binding */ time),
/* harmony export */   "greeting": () => (/* binding */ greeting),
/* harmony export */   "greetingContainer": () => (/* binding */ greetingContainer),
/* harmony export */   "name": () => (/* binding */ name),
/* harmony export */   "date": () => (/* binding */ date),
/* harmony export */   "weather": () => (/* binding */ weather),
/* harmony export */   "weatherIcon": () => (/* binding */ weatherIcon),
/* harmony export */   "temperature": () => (/* binding */ temperature),
/* harmony export */   "weatherDescription": () => (/* binding */ weatherDescription),
/* harmony export */   "wind": () => (/* binding */ wind),
/* harmony export */   "humidity": () => (/* binding */ humidity),
/* harmony export */   "city": () => (/* binding */ city),
/* harmony export */   "quote": () => (/* binding */ quote),
/* harmony export */   "quotes": () => (/* binding */ quotes),
/* harmony export */   "author": () => (/* binding */ author),
/* harmony export */   "changeQuote": () => (/* binding */ changeQuote),
/* harmony export */   "radioButtons": () => (/* binding */ radioButtons),
/* harmony export */   "next": () => (/* binding */ next),
/* harmony export */   "prev": () => (/* binding */ prev),
/* harmony export */   "body": () => (/* binding */ body),
/* harmony export */   "player": () => (/* binding */ player),
/* harmony export */   "play": () => (/* binding */ play),
/* harmony export */   "playList": () => (/* binding */ playList),
/* harmony export */   "songTitle": () => (/* binding */ songTitle),
/* harmony export */   "songDuration": () => (/* binding */ songDuration),
/* harmony export */   "currentSound": () => (/* binding */ currentSound),
/* harmony export */   "prevSong": () => (/* binding */ prevSong),
/* harmony export */   "nextSong": () => (/* binding */ nextSong),
/* harmony export */   "progressTime": () => (/* binding */ progressTime),
/* harmony export */   "progressSound": () => (/* binding */ progressSound),
/* harmony export */   "sound": () => (/* binding */ sound),
/* harmony export */   "todoButton": () => (/* binding */ todoButton),
/* harmony export */   "storageKeys": () => (/* binding */ storageKeys)
/* harmony export */ });
const time = document.querySelector(".time"),
      greeting = document.querySelector(".greeting"),
      greetingContainer = document.querySelector(".greeting-container"),
      name = document.querySelector(".name"),
      date = document.querySelector(".date"),
      // Weather constants
weather = document.querySelector(".weather"),
      weatherIcon = document.querySelector(".weather-icon"),
      temperature = document.querySelector(".temperature"),
      weatherDescription = document.querySelector(".weather-description"),
      wind = document.querySelector(".wind"),
      humidity = document.querySelector(".humidity"),
      city = document.querySelector(".city"),
      // Quote constants
quote = document.querySelector(".quote"),
      quotes = document.querySelector(".quotes"),
      author = document.querySelector(".author"),
      changeQuote = document.querySelector(".change-quote"),
      // Background constants
radioButtons = document.querySelectorAll(".background__radio"),
      next = document.querySelector(".slide-next"),
      prev = document.querySelector(".slide-prev"),
      body = document.querySelector("body"),
      // Audio player constants
player = document.querySelector(".player"),
      play = document.querySelector(".play"),
      playList = document.querySelector(".play-list"),
      songTitle = document.querySelector(".song-title"),
      songDuration = document.querySelector(".finish-sound"),
      currentSound = document.querySelector(".current-sound"),
      prevSong = document.querySelector(".play-prev"),
      nextSong = document.querySelector(".play-next"),
      progressTime = document.querySelector(".progress"),
      progressSound = document.querySelector(".sound-progress"),
      sound = document.querySelector(".sound"),
      // Todo constant
todoButton = document.querySelector(".button-todo");
const storageKeys = Object.freeze({
  name: "name",
  city: "city",
  lang: "lang",
  backgroundSource: "backgroundSource",
  todo: "todo"
});

/***/ }),

/***/ "./utils/songs.js":
/*!************************!*\
  !*** ./utils/songs.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "songs": () => (/* binding */ songs)
/* harmony export */ });
const songs = [{
  title: "Aqua Caelestis",
  src: "../assets/sounds/Aqua Caelestis.mp3",
  duration: "0:39"
}, {
  title: "Ennio Morricone",
  src: "../assets/sounds/Ennio Morricone.mp3",
  duration: "1:37"
}, {
  title: "River Flows In You",
  src: "../assets/sounds/River Flows In You.mp3",
  duration: "1:37"
}, {
  title: "Summer Wind",
  src: "../assets/sounds/Summer Wind.mp3",
  duration: "1:50"
}];

/***/ }),

/***/ "../node_modules/i18next/dist/esm/i18next.js":
/*!***************************************************!*\
  !*** ../node_modules/i18next/dist/esm/i18next.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/typeof */ "../node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectSpread */ "../node_modules/@babel/runtime/helpers/esm/objectSpread.js");
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "../node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "../node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/esm/possibleConstructorReturn */ "../node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/esm/getPrototypeOf */ "../node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/esm/assertThisInitialized */ "../node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inherits */ "../node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime/helpers/esm/slicedToArray */ "../node_modules/@babel/runtime/helpers/esm/slicedToArray.js");










var consoleLogger = {
  type: 'logger',
  log: function log(args) {
    this.output('log', args);
  },
  warn: function warn(args) {
    this.output('warn', args);
  },
  error: function error(args) {
    this.output('error', args);
  },
  output: function output(type, args) {
    if (console && console[type]) console[type].apply(console, args);
  }
};

var Logger = function () {
  function Logger(concreteLogger) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    (0,_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_2__["default"])(this, Logger);

    this.init(concreteLogger, options);
  }

  (0,_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3__["default"])(Logger, [{
    key: "init",
    value: function init(concreteLogger) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.prefix = options.prefix || 'i18next:';
      this.logger = concreteLogger || consoleLogger;
      this.options = options;
      this.debug = options.debug;
    }
  }, {
    key: "setDebug",
    value: function setDebug(bool) {
      this.debug = bool;
    }
  }, {
    key: "log",
    value: function log() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return this.forward(args, 'log', '', true);
    }
  }, {
    key: "warn",
    value: function warn() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return this.forward(args, 'warn', '', true);
    }
  }, {
    key: "error",
    value: function error() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      return this.forward(args, 'error', '');
    }
  }, {
    key: "deprecate",
    value: function deprecate() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      return this.forward(args, 'warn', 'WARNING DEPRECATED: ', true);
    }
  }, {
    key: "forward",
    value: function forward(args, lvl, prefix, debugOnly) {
      if (debugOnly && !this.debug) return null;
      if (typeof args[0] === 'string') args[0] = "".concat(prefix).concat(this.prefix, " ").concat(args[0]);
      return this.logger[lvl](args);
    }
  }, {
    key: "create",
    value: function create(moduleName) {
      return new Logger(this.logger, (0,_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, {
        prefix: "".concat(this.prefix, ":").concat(moduleName, ":")
      }, this.options));
    }
  }]);

  return Logger;
}();

var baseLogger = new Logger();

var EventEmitter = function () {
  function EventEmitter() {
    (0,_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_2__["default"])(this, EventEmitter);

    this.observers = {};
  }

  (0,_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3__["default"])(EventEmitter, [{
    key: "on",
    value: function on(events, listener) {
      var _this = this;

      events.split(' ').forEach(function (event) {
        _this.observers[event] = _this.observers[event] || [];

        _this.observers[event].push(listener);
      });
      return this;
    }
  }, {
    key: "off",
    value: function off(event, listener) {
      if (!this.observers[event]) return;

      if (!listener) {
        delete this.observers[event];
        return;
      }

      this.observers[event] = this.observers[event].filter(function (l) {
        return l !== listener;
      });
    }
  }, {
    key: "emit",
    value: function emit(event) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      if (this.observers[event]) {
        var cloned = [].concat(this.observers[event]);
        cloned.forEach(function (observer) {
          observer.apply(void 0, args);
        });
      }

      if (this.observers['*']) {
        var _cloned = [].concat(this.observers['*']);

        _cloned.forEach(function (observer) {
          observer.apply(observer, [event].concat(args));
        });
      }
    }
  }]);

  return EventEmitter;
}();

function defer() {
  var res;
  var rej;
  var promise = new Promise(function (resolve, reject) {
    res = resolve;
    rej = reject;
  });
  promise.resolve = res;
  promise.reject = rej;
  return promise;
}
function makeString(object) {
  if (object == null) return '';
  return '' + object;
}
function copy(a, s, t) {
  a.forEach(function (m) {
    if (s[m]) t[m] = s[m];
  });
}

function getLastOfPath(object, path, Empty) {
  function cleanKey(key) {
    return key && key.indexOf('###') > -1 ? key.replace(/###/g, '.') : key;
  }

  function canNotTraverseDeeper() {
    return !object || typeof object === 'string';
  }

  var stack = typeof path !== 'string' ? [].concat(path) : path.split('.');

  while (stack.length > 1) {
    if (canNotTraverseDeeper()) return {};
    var key = cleanKey(stack.shift());
    if (!object[key] && Empty) object[key] = new Empty();

    if (Object.prototype.hasOwnProperty.call(object, key)) {
      object = object[key];
    } else {
      object = {};
    }
  }

  if (canNotTraverseDeeper()) return {};
  return {
    obj: object,
    k: cleanKey(stack.shift())
  };
}

function setPath(object, path, newValue) {
  var _getLastOfPath = getLastOfPath(object, path, Object),
      obj = _getLastOfPath.obj,
      k = _getLastOfPath.k;

  obj[k] = newValue;
}
function pushPath(object, path, newValue, concat) {
  var _getLastOfPath2 = getLastOfPath(object, path, Object),
      obj = _getLastOfPath2.obj,
      k = _getLastOfPath2.k;

  obj[k] = obj[k] || [];
  if (concat) obj[k] = obj[k].concat(newValue);
  if (!concat) obj[k].push(newValue);
}
function getPath(object, path) {
  var _getLastOfPath3 = getLastOfPath(object, path),
      obj = _getLastOfPath3.obj,
      k = _getLastOfPath3.k;

  if (!obj) return undefined;
  return obj[k];
}
function getPathWithDefaults(data, defaultData, key) {
  var value = getPath(data, key);

  if (value !== undefined) {
    return value;
  }

  return getPath(defaultData, key);
}
function deepExtend(target, source, overwrite) {
  for (var prop in source) {
    if (prop !== '__proto__' && prop !== 'constructor') {
      if (prop in target) {
        if (typeof target[prop] === 'string' || target[prop] instanceof String || typeof source[prop] === 'string' || source[prop] instanceof String) {
          if (overwrite) target[prop] = source[prop];
        } else {
          deepExtend(target[prop], source[prop], overwrite);
        }
      } else {
        target[prop] = source[prop];
      }
    }
  }

  return target;
}
function regexEscape(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}
var _entityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;'
};
function escape(data) {
  if (typeof data === 'string') {
    return data.replace(/[&<>"'\/]/g, function (s) {
      return _entityMap[s];
    });
  }

  return data;
}
var isIE10 = typeof window !== 'undefined' && window.navigator && window.navigator.userAgent && window.navigator.userAgent.indexOf('MSIE') > -1;
var chars = [' ', ',', '?', '!', ';'];
function looksLikeObjectPath(key, nsSeparator, keySeparator) {
  nsSeparator = nsSeparator || '';
  keySeparator = keySeparator || '';
  var possibleChars = chars.filter(function (c) {
    return nsSeparator.indexOf(c) < 0 && keySeparator.indexOf(c) < 0;
  });
  if (possibleChars.length === 0) return true;
  var r = new RegExp("(".concat(possibleChars.map(function (c) {
    return c === '?' ? '\\?' : c;
  }).join('|'), ")"));
  var matched = !r.test(key);

  if (!matched) {
    var ki = key.indexOf(keySeparator);

    if (ki > 0 && !r.test(key.substring(0, ki))) {
      matched = true;
    }
  }

  return matched;
}

function deepFind(obj, path) {
  var keySeparator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '.';
  if (!obj) return undefined;
  if (obj[path]) return obj[path];
  var paths = path.split(keySeparator);
  var current = obj;

  for (var i = 0; i < paths.length; ++i) {
    if (!current) return undefined;

    if (typeof current[paths[i]] === 'string' && i + 1 < paths.length) {
      return undefined;
    }

    if (current[paths[i]] === undefined) {
      var j = 2;
      var p = paths.slice(i, i + j).join(keySeparator);
      var mix = current[p];

      while (mix === undefined && paths.length > i + j) {
        j++;
        p = paths.slice(i, i + j).join(keySeparator);
        mix = current[p];
      }

      if (mix === undefined) return undefined;
      if (typeof mix === 'string') return mix;
      if (p && typeof mix[p] === 'string') return mix[p];
      var joinedPath = paths.slice(i + j).join(keySeparator);
      if (joinedPath) return deepFind(mix, joinedPath, keySeparator);
      return undefined;
    }

    current = current[paths[i]];
  }

  return current;
}

var ResourceStore = function (_EventEmitter) {
  (0,_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_7__["default"])(ResourceStore, _EventEmitter);

  function ResourceStore(data) {
    var _this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      ns: ['translation'],
      defaultNS: 'translation'
    };

    (0,_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_2__["default"])(this, ResourceStore);

    _this = (0,_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__["default"])(this, (0,_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(ResourceStore).call(this));

    if (isIE10) {
      EventEmitter.call((0,_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6__["default"])(_this));
    }

    _this.data = data || {};
    _this.options = options;

    if (_this.options.keySeparator === undefined) {
      _this.options.keySeparator = '.';
    }

    if (_this.options.ignoreJSONStructure === undefined) {
      _this.options.ignoreJSONStructure = true;
    }

    return _this;
  }

  (0,_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3__["default"])(ResourceStore, [{
    key: "addNamespaces",
    value: function addNamespaces(ns) {
      if (this.options.ns.indexOf(ns) < 0) {
        this.options.ns.push(ns);
      }
    }
  }, {
    key: "removeNamespaces",
    value: function removeNamespaces(ns) {
      var index = this.options.ns.indexOf(ns);

      if (index > -1) {
        this.options.ns.splice(index, 1);
      }
    }
  }, {
    key: "getResource",
    value: function getResource(lng, ns, key) {
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var keySeparator = options.keySeparator !== undefined ? options.keySeparator : this.options.keySeparator;
      var ignoreJSONStructure = options.ignoreJSONStructure !== undefined ? options.ignoreJSONStructure : this.options.ignoreJSONStructure;
      var path = [lng, ns];
      if (key && typeof key !== 'string') path = path.concat(key);
      if (key && typeof key === 'string') path = path.concat(keySeparator ? key.split(keySeparator) : key);

      if (lng.indexOf('.') > -1) {
        path = lng.split('.');
      }

      var result = getPath(this.data, path);
      if (result || !ignoreJSONStructure || typeof key !== 'string') return result;
      return deepFind(this.data && this.data[lng] && this.data[lng][ns], key, keySeparator);
    }
  }, {
    key: "addResource",
    value: function addResource(lng, ns, key, value) {
      var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {
        silent: false
      };
      var keySeparator = this.options.keySeparator;
      if (keySeparator === undefined) keySeparator = '.';
      var path = [lng, ns];
      if (key) path = path.concat(keySeparator ? key.split(keySeparator) : key);

      if (lng.indexOf('.') > -1) {
        path = lng.split('.');
        value = ns;
        ns = path[1];
      }

      this.addNamespaces(ns);
      setPath(this.data, path, value);
      if (!options.silent) this.emit('added', lng, ns, key, value);
    }
  }, {
    key: "addResources",
    value: function addResources(lng, ns, resources) {
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {
        silent: false
      };

      for (var m in resources) {
        if (typeof resources[m] === 'string' || Object.prototype.toString.apply(resources[m]) === '[object Array]') this.addResource(lng, ns, m, resources[m], {
          silent: true
        });
      }

      if (!options.silent) this.emit('added', lng, ns, resources);
    }
  }, {
    key: "addResourceBundle",
    value: function addResourceBundle(lng, ns, resources, deep, overwrite) {
      var options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {
        silent: false
      };
      var path = [lng, ns];

      if (lng.indexOf('.') > -1) {
        path = lng.split('.');
        deep = resources;
        resources = ns;
        ns = path[1];
      }

      this.addNamespaces(ns);
      var pack = getPath(this.data, path) || {};

      if (deep) {
        deepExtend(pack, resources, overwrite);
      } else {
        pack = (0,_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, pack, resources);
      }

      setPath(this.data, path, pack);
      if (!options.silent) this.emit('added', lng, ns, resources);
    }
  }, {
    key: "removeResourceBundle",
    value: function removeResourceBundle(lng, ns) {
      if (this.hasResourceBundle(lng, ns)) {
        delete this.data[lng][ns];
      }

      this.removeNamespaces(ns);
      this.emit('removed', lng, ns);
    }
  }, {
    key: "hasResourceBundle",
    value: function hasResourceBundle(lng, ns) {
      return this.getResource(lng, ns) !== undefined;
    }
  }, {
    key: "getResourceBundle",
    value: function getResourceBundle(lng, ns) {
      if (!ns) ns = this.options.defaultNS;
      if (this.options.compatibilityAPI === 'v1') return (0,_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, {}, this.getResource(lng, ns));
      return this.getResource(lng, ns);
    }
  }, {
    key: "getDataByLanguage",
    value: function getDataByLanguage(lng) {
      return this.data[lng];
    }
  }, {
    key: "hasLanguageSomeTranslations",
    value: function hasLanguageSomeTranslations(lng) {
      var data = this.getDataByLanguage(lng);
      var n = data && Object.keys(data) || [];
      return !!n.find(function (v) {
        return data[v] && Object.keys(data[v]).length > 0;
      });
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return this.data;
    }
  }]);

  return ResourceStore;
}(EventEmitter);

var postProcessor = {
  processors: {},
  addPostProcessor: function addPostProcessor(module) {
    this.processors[module.name] = module;
  },
  handle: function handle(processors, value, key, options, translator) {
    var _this = this;

    processors.forEach(function (processor) {
      if (_this.processors[processor]) value = _this.processors[processor].process(value, key, options, translator);
    });
    return value;
  }
};

var checkedLoadedFor = {};

var Translator = function (_EventEmitter) {
  (0,_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_7__["default"])(Translator, _EventEmitter);

  function Translator(services) {
    var _this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    (0,_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_2__["default"])(this, Translator);

    _this = (0,_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__["default"])(this, (0,_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(Translator).call(this));

    if (isIE10) {
      EventEmitter.call((0,_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6__["default"])(_this));
    }

    copy(['resourceStore', 'languageUtils', 'pluralResolver', 'interpolator', 'backendConnector', 'i18nFormat', 'utils'], services, (0,_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6__["default"])(_this));
    _this.options = options;

    if (_this.options.keySeparator === undefined) {
      _this.options.keySeparator = '.';
    }

    _this.logger = baseLogger.create('translator');
    return _this;
  }

  (0,_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3__["default"])(Translator, [{
    key: "changeLanguage",
    value: function changeLanguage(lng) {
      if (lng) this.language = lng;
    }
  }, {
    key: "exists",
    value: function exists(key) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        interpolation: {}
      };

      if (key === undefined || key === null) {
        return false;
      }

      var resolved = this.resolve(key, options);
      return resolved && resolved.res !== undefined;
    }
  }, {
    key: "extractFromKey",
    value: function extractFromKey(key, options) {
      var nsSeparator = options.nsSeparator !== undefined ? options.nsSeparator : this.options.nsSeparator;
      if (nsSeparator === undefined) nsSeparator = ':';
      var keySeparator = options.keySeparator !== undefined ? options.keySeparator : this.options.keySeparator;
      var namespaces = options.ns || this.options.defaultNS;
      var wouldCheckForNsInKey = nsSeparator && key.indexOf(nsSeparator) > -1;
      var seemsNaturalLanguage = !this.options.userDefinedKeySeparator && !options.keySeparator && !this.options.userDefinedNsSeparator && !options.nsSeparator && !looksLikeObjectPath(key, nsSeparator, keySeparator);

      if (wouldCheckForNsInKey && !seemsNaturalLanguage) {
        var m = key.match(this.interpolator.nestingRegexp);

        if (m && m.length > 0) {
          return {
            key: key,
            namespaces: namespaces
          };
        }

        var parts = key.split(nsSeparator);
        if (nsSeparator !== keySeparator || nsSeparator === keySeparator && this.options.ns.indexOf(parts[0]) > -1) namespaces = parts.shift();
        key = parts.join(keySeparator);
      }

      if (typeof namespaces === 'string') namespaces = [namespaces];
      return {
        key: key,
        namespaces: namespaces
      };
    }
  }, {
    key: "translate",
    value: function translate(keys, options, lastKey) {
      var _this2 = this;

      if ((0,_babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(options) !== 'object' && this.options.overloadTranslationOptionHandler) {
        options = this.options.overloadTranslationOptionHandler(arguments);
      }

      if (!options) options = {};
      if (keys === undefined || keys === null) return '';
      if (!Array.isArray(keys)) keys = [String(keys)];
      var keySeparator = options.keySeparator !== undefined ? options.keySeparator : this.options.keySeparator;

      var _this$extractFromKey = this.extractFromKey(keys[keys.length - 1], options),
          key = _this$extractFromKey.key,
          namespaces = _this$extractFromKey.namespaces;

      var namespace = namespaces[namespaces.length - 1];
      var lng = options.lng || this.language;
      var appendNamespaceToCIMode = options.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode;

      if (lng && lng.toLowerCase() === 'cimode') {
        if (appendNamespaceToCIMode) {
          var nsSeparator = options.nsSeparator || this.options.nsSeparator;
          return namespace + nsSeparator + key;
        }

        return key;
      }

      var resolved = this.resolve(keys, options);
      var res = resolved && resolved.res;
      var resUsedKey = resolved && resolved.usedKey || key;
      var resExactUsedKey = resolved && resolved.exactUsedKey || key;
      var resType = Object.prototype.toString.apply(res);
      var noObject = ['[object Number]', '[object Function]', '[object RegExp]'];
      var joinArrays = options.joinArrays !== undefined ? options.joinArrays : this.options.joinArrays;
      var handleAsObjectInI18nFormat = !this.i18nFormat || this.i18nFormat.handleAsObject;
      var handleAsObject = typeof res !== 'string' && typeof res !== 'boolean' && typeof res !== 'number';

      if (handleAsObjectInI18nFormat && res && handleAsObject && noObject.indexOf(resType) < 0 && !(typeof joinArrays === 'string' && resType === '[object Array]')) {
        if (!options.returnObjects && !this.options.returnObjects) {
          if (!this.options.returnedObjectHandler) {
            this.logger.warn('accessing an object - but returnObjects options is not enabled!');
          }

          return this.options.returnedObjectHandler ? this.options.returnedObjectHandler(resUsedKey, res, (0,_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, options, {
            ns: namespaces
          })) : "key '".concat(key, " (").concat(this.language, ")' returned an object instead of string.");
        }

        if (keySeparator) {
          var resTypeIsArray = resType === '[object Array]';
          var copy = resTypeIsArray ? [] : {};
          var newKeyToUse = resTypeIsArray ? resExactUsedKey : resUsedKey;

          for (var m in res) {
            if (Object.prototype.hasOwnProperty.call(res, m)) {
              var deepKey = "".concat(newKeyToUse).concat(keySeparator).concat(m);
              copy[m] = this.translate(deepKey, (0,_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, options, {
                joinArrays: false,
                ns: namespaces
              }));
              if (copy[m] === deepKey) copy[m] = res[m];
            }
          }

          res = copy;
        }
      } else if (handleAsObjectInI18nFormat && typeof joinArrays === 'string' && resType === '[object Array]') {
        res = res.join(joinArrays);
        if (res) res = this.extendTranslation(res, keys, options, lastKey);
      } else {
        var usedDefault = false;
        var usedKey = false;
        var needsPluralHandling = options.count !== undefined && typeof options.count !== 'string';
        var hasDefaultValue = Translator.hasDefaultValue(options);
        var defaultValueSuffix = needsPluralHandling ? this.pluralResolver.getSuffix(lng, options.count, options) : '';
        var defaultValue = options["defaultValue".concat(defaultValueSuffix)] || options.defaultValue;

        if (!this.isValidLookup(res) && hasDefaultValue) {
          usedDefault = true;
          res = defaultValue;
        }

        if (!this.isValidLookup(res)) {
          usedKey = true;
          res = key;
        }

        var missingKeyNoValueFallbackToKey = options.missingKeyNoValueFallbackToKey || this.options.missingKeyNoValueFallbackToKey;
        var resForMissing = missingKeyNoValueFallbackToKey && usedKey ? undefined : res;
        var updateMissing = hasDefaultValue && defaultValue !== res && this.options.updateMissing;

        if (usedKey || usedDefault || updateMissing) {
          this.logger.log(updateMissing ? 'updateKey' : 'missingKey', lng, namespace, key, updateMissing ? defaultValue : res);

          if (keySeparator) {
            var fk = this.resolve(key, (0,_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, options, {
              keySeparator: false
            }));
            if (fk && fk.res) this.logger.warn('Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.');
          }

          var lngs = [];
          var fallbackLngs = this.languageUtils.getFallbackCodes(this.options.fallbackLng, options.lng || this.language);

          if (this.options.saveMissingTo === 'fallback' && fallbackLngs && fallbackLngs[0]) {
            for (var i = 0; i < fallbackLngs.length; i++) {
              lngs.push(fallbackLngs[i]);
            }
          } else if (this.options.saveMissingTo === 'all') {
            lngs = this.languageUtils.toResolveHierarchy(options.lng || this.language);
          } else {
            lngs.push(options.lng || this.language);
          }

          var send = function send(l, k, fallbackValue) {
            if (_this2.options.missingKeyHandler) {
              _this2.options.missingKeyHandler(l, namespace, k, updateMissing ? fallbackValue : resForMissing, updateMissing, options);
            } else if (_this2.backendConnector && _this2.backendConnector.saveMissing) {
              _this2.backendConnector.saveMissing(l, namespace, k, updateMissing ? fallbackValue : resForMissing, updateMissing, options);
            }

            _this2.emit('missingKey', l, namespace, k, res);
          };

          if (this.options.saveMissing) {
            if (this.options.saveMissingPlurals && needsPluralHandling) {
              lngs.forEach(function (language) {
                _this2.pluralResolver.getSuffixes(language).forEach(function (suffix) {
                  send([language], key + suffix, options["defaultValue".concat(suffix)] || defaultValue);
                });
              });
            } else {
              send(lngs, key, defaultValue);
            }
          }
        }

        res = this.extendTranslation(res, keys, options, resolved, lastKey);
        if (usedKey && res === key && this.options.appendNamespaceToMissingKey) res = "".concat(namespace, ":").concat(key);
        if ((usedKey || usedDefault) && this.options.parseMissingKeyHandler) res = this.options.parseMissingKeyHandler(res);
      }

      return res;
    }
  }, {
    key: "extendTranslation",
    value: function extendTranslation(res, key, options, resolved, lastKey) {
      var _this3 = this;

      if (this.i18nFormat && this.i18nFormat.parse) {
        res = this.i18nFormat.parse(res, options, resolved.usedLng, resolved.usedNS, resolved.usedKey, {
          resolved: resolved
        });
      } else if (!options.skipInterpolation) {
        if (options.interpolation) this.interpolator.init((0,_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, options, {
          interpolation: (0,_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, this.options.interpolation, options.interpolation)
        }));
        var skipOnVariables = options.interpolation && options.interpolation.skipOnVariables || this.options.interpolation.skipOnVariables;
        var nestBef;

        if (skipOnVariables) {
          var nb = res.match(this.interpolator.nestingRegexp);
          nestBef = nb && nb.length;
        }

        var data = options.replace && typeof options.replace !== 'string' ? options.replace : options;
        if (this.options.interpolation.defaultVariables) data = (0,_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, this.options.interpolation.defaultVariables, data);
        res = this.interpolator.interpolate(res, data, options.lng || this.language, options);

        if (skipOnVariables) {
          var na = res.match(this.interpolator.nestingRegexp);
          var nestAft = na && na.length;
          if (nestBef < nestAft) options.nest = false;
        }

        if (options.nest !== false) res = this.interpolator.nest(res, function () {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          if (lastKey && lastKey[0] === args[0] && !options.context) {
            _this3.logger.warn("It seems you are nesting recursively key: ".concat(args[0], " in key: ").concat(key[0]));

            return null;
          }

          return _this3.translate.apply(_this3, args.concat([key]));
        }, options);
        if (options.interpolation) this.interpolator.reset();
      }

      var postProcess = options.postProcess || this.options.postProcess;
      var postProcessorNames = typeof postProcess === 'string' ? [postProcess] : postProcess;

      if (res !== undefined && res !== null && postProcessorNames && postProcessorNames.length && options.applyPostProcessor !== false) {
        res = postProcessor.handle(postProcessorNames, res, key, this.options && this.options.postProcessPassResolved ? (0,_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({
          i18nResolved: resolved
        }, options) : options, this);
      }

      return res;
    }
  }, {
    key: "resolve",
    value: function resolve(keys) {
      var _this4 = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var found;
      var usedKey;
      var exactUsedKey;
      var usedLng;
      var usedNS;
      if (typeof keys === 'string') keys = [keys];
      keys.forEach(function (k) {
        if (_this4.isValidLookup(found)) return;

        var extracted = _this4.extractFromKey(k, options);

        var key = extracted.key;
        usedKey = key;
        var namespaces = extracted.namespaces;
        if (_this4.options.fallbackNS) namespaces = namespaces.concat(_this4.options.fallbackNS);
        var needsPluralHandling = options.count !== undefined && typeof options.count !== 'string';
        var needsContextHandling = options.context !== undefined && (typeof options.context === 'string' || typeof options.context === 'number') && options.context !== '';
        var codes = options.lngs ? options.lngs : _this4.languageUtils.toResolveHierarchy(options.lng || _this4.language, options.fallbackLng);
        namespaces.forEach(function (ns) {
          if (_this4.isValidLookup(found)) return;
          usedNS = ns;

          if (!checkedLoadedFor["".concat(codes[0], "-").concat(ns)] && _this4.utils && _this4.utils.hasLoadedNamespace && !_this4.utils.hasLoadedNamespace(usedNS)) {
            checkedLoadedFor["".concat(codes[0], "-").concat(ns)] = true;

            _this4.logger.warn("key \"".concat(usedKey, "\" for languages \"").concat(codes.join(', '), "\" won't get resolved as namespace \"").concat(usedNS, "\" was not yet loaded"), 'This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!');
          }

          codes.forEach(function (code) {
            if (_this4.isValidLookup(found)) return;
            usedLng = code;
            var finalKey = key;
            var finalKeys = [finalKey];

            if (_this4.i18nFormat && _this4.i18nFormat.addLookupKeys) {
              _this4.i18nFormat.addLookupKeys(finalKeys, key, code, ns, options);
            } else {
              var pluralSuffix;
              if (needsPluralHandling) pluralSuffix = _this4.pluralResolver.getSuffix(code, options.count, options);
              if (needsPluralHandling && needsContextHandling) finalKeys.push(finalKey + pluralSuffix);
              if (needsContextHandling) finalKeys.push(finalKey += "".concat(_this4.options.contextSeparator).concat(options.context));
              if (needsPluralHandling) finalKeys.push(finalKey += pluralSuffix);
            }

            var possibleKey;

            while (possibleKey = finalKeys.pop()) {
              if (!_this4.isValidLookup(found)) {
                exactUsedKey = possibleKey;
                found = _this4.getResource(code, ns, possibleKey, options);
              }
            }
          });
        });
      });
      return {
        res: found,
        usedKey: usedKey,
        exactUsedKey: exactUsedKey,
        usedLng: usedLng,
        usedNS: usedNS
      };
    }
  }, {
    key: "isValidLookup",
    value: function isValidLookup(res) {
      return res !== undefined && !(!this.options.returnNull && res === null) && !(!this.options.returnEmptyString && res === '');
    }
  }, {
    key: "getResource",
    value: function getResource(code, ns, key) {
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      if (this.i18nFormat && this.i18nFormat.getResource) return this.i18nFormat.getResource(code, ns, key, options);
      return this.resourceStore.getResource(code, ns, key, options);
    }
  }], [{
    key: "hasDefaultValue",
    value: function hasDefaultValue(options) {
      var prefix = 'defaultValue';

      for (var option in options) {
        if (Object.prototype.hasOwnProperty.call(options, option) && prefix === option.substring(0, prefix.length) && undefined !== options[option]) {
          return true;
        }
      }

      return false;
    }
  }]);

  return Translator;
}(EventEmitter);

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

var LanguageUtil = function () {
  function LanguageUtil(options) {
    (0,_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_2__["default"])(this, LanguageUtil);

    this.options = options;
    this.supportedLngs = this.options.supportedLngs || false;
    this.logger = baseLogger.create('languageUtils');
  }

  (0,_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3__["default"])(LanguageUtil, [{
    key: "getScriptPartFromCode",
    value: function getScriptPartFromCode(code) {
      if (!code || code.indexOf('-') < 0) return null;
      var p = code.split('-');
      if (p.length === 2) return null;
      p.pop();
      if (p[p.length - 1].toLowerCase() === 'x') return null;
      return this.formatLanguageCode(p.join('-'));
    }
  }, {
    key: "getLanguagePartFromCode",
    value: function getLanguagePartFromCode(code) {
      if (!code || code.indexOf('-') < 0) return code;
      var p = code.split('-');
      return this.formatLanguageCode(p[0]);
    }
  }, {
    key: "formatLanguageCode",
    value: function formatLanguageCode(code) {
      if (typeof code === 'string' && code.indexOf('-') > -1) {
        var specialCases = ['hans', 'hant', 'latn', 'cyrl', 'cans', 'mong', 'arab'];
        var p = code.split('-');

        if (this.options.lowerCaseLng) {
          p = p.map(function (part) {
            return part.toLowerCase();
          });
        } else if (p.length === 2) {
          p[0] = p[0].toLowerCase();
          p[1] = p[1].toUpperCase();
          if (specialCases.indexOf(p[1].toLowerCase()) > -1) p[1] = capitalize(p[1].toLowerCase());
        } else if (p.length === 3) {
          p[0] = p[0].toLowerCase();
          if (p[1].length === 2) p[1] = p[1].toUpperCase();
          if (p[0] !== 'sgn' && p[2].length === 2) p[2] = p[2].toUpperCase();
          if (specialCases.indexOf(p[1].toLowerCase()) > -1) p[1] = capitalize(p[1].toLowerCase());
          if (specialCases.indexOf(p[2].toLowerCase()) > -1) p[2] = capitalize(p[2].toLowerCase());
        }

        return p.join('-');
      }

      return this.options.cleanCode || this.options.lowerCaseLng ? code.toLowerCase() : code;
    }
  }, {
    key: "isSupportedCode",
    value: function isSupportedCode(code) {
      if (this.options.load === 'languageOnly' || this.options.nonExplicitSupportedLngs) {
        code = this.getLanguagePartFromCode(code);
      }

      return !this.supportedLngs || !this.supportedLngs.length || this.supportedLngs.indexOf(code) > -1;
    }
  }, {
    key: "getBestMatchFromCodes",
    value: function getBestMatchFromCodes(codes) {
      var _this = this;

      if (!codes) return null;
      var found;
      codes.forEach(function (code) {
        if (found) return;

        var cleanedLng = _this.formatLanguageCode(code);

        if (!_this.options.supportedLngs || _this.isSupportedCode(cleanedLng)) found = cleanedLng;
      });

      if (!found && this.options.supportedLngs) {
        codes.forEach(function (code) {
          if (found) return;

          var lngOnly = _this.getLanguagePartFromCode(code);

          if (_this.isSupportedCode(lngOnly)) return found = lngOnly;
          found = _this.options.supportedLngs.find(function (supportedLng) {
            if (supportedLng.indexOf(lngOnly) === 0) return supportedLng;
          });
        });
      }

      if (!found) found = this.getFallbackCodes(this.options.fallbackLng)[0];
      return found;
    }
  }, {
    key: "getFallbackCodes",
    value: function getFallbackCodes(fallbacks, code) {
      if (!fallbacks) return [];
      if (typeof fallbacks === 'function') fallbacks = fallbacks(code);
      if (typeof fallbacks === 'string') fallbacks = [fallbacks];
      if (Object.prototype.toString.apply(fallbacks) === '[object Array]') return fallbacks;
      if (!code) return fallbacks["default"] || [];
      var found = fallbacks[code];
      if (!found) found = fallbacks[this.getScriptPartFromCode(code)];
      if (!found) found = fallbacks[this.formatLanguageCode(code)];
      if (!found) found = fallbacks[this.getLanguagePartFromCode(code)];
      if (!found) found = fallbacks["default"];
      return found || [];
    }
  }, {
    key: "toResolveHierarchy",
    value: function toResolveHierarchy(code, fallbackCode) {
      var _this2 = this;

      var fallbackCodes = this.getFallbackCodes(fallbackCode || this.options.fallbackLng || [], code);
      var codes = [];

      var addCode = function addCode(c) {
        if (!c) return;

        if (_this2.isSupportedCode(c)) {
          codes.push(c);
        } else {
          _this2.logger.warn("rejecting language code not found in supportedLngs: ".concat(c));
        }
      };

      if (typeof code === 'string' && code.indexOf('-') > -1) {
        if (this.options.load !== 'languageOnly') addCode(this.formatLanguageCode(code));
        if (this.options.load !== 'languageOnly' && this.options.load !== 'currentOnly') addCode(this.getScriptPartFromCode(code));
        if (this.options.load !== 'currentOnly') addCode(this.getLanguagePartFromCode(code));
      } else if (typeof code === 'string') {
        addCode(this.formatLanguageCode(code));
      }

      fallbackCodes.forEach(function (fc) {
        if (codes.indexOf(fc) < 0) addCode(_this2.formatLanguageCode(fc));
      });
      return codes;
    }
  }]);

  return LanguageUtil;
}();

var sets = [{
  lngs: ['ach', 'ak', 'am', 'arn', 'br', 'fil', 'gun', 'ln', 'mfe', 'mg', 'mi', 'oc', 'pt', 'pt-BR', 'tg', 'tl', 'ti', 'tr', 'uz', 'wa'],
  nr: [1, 2],
  fc: 1
}, {
  lngs: ['af', 'an', 'ast', 'az', 'bg', 'bn', 'ca', 'da', 'de', 'dev', 'el', 'en', 'eo', 'es', 'et', 'eu', 'fi', 'fo', 'fur', 'fy', 'gl', 'gu', 'ha', 'hi', 'hu', 'hy', 'ia', 'it', 'kk', 'kn', 'ku', 'lb', 'mai', 'ml', 'mn', 'mr', 'nah', 'nap', 'nb', 'ne', 'nl', 'nn', 'no', 'nso', 'pa', 'pap', 'pms', 'ps', 'pt-PT', 'rm', 'sco', 'se', 'si', 'so', 'son', 'sq', 'sv', 'sw', 'ta', 'te', 'tk', 'ur', 'yo'],
  nr: [1, 2],
  fc: 2
}, {
  lngs: ['ay', 'bo', 'cgg', 'fa', 'ht', 'id', 'ja', 'jbo', 'ka', 'km', 'ko', 'ky', 'lo', 'ms', 'sah', 'su', 'th', 'tt', 'ug', 'vi', 'wo', 'zh'],
  nr: [1],
  fc: 3
}, {
  lngs: ['be', 'bs', 'cnr', 'dz', 'hr', 'ru', 'sr', 'uk'],
  nr: [1, 2, 5],
  fc: 4
}, {
  lngs: ['ar'],
  nr: [0, 1, 2, 3, 11, 100],
  fc: 5
}, {
  lngs: ['cs', 'sk'],
  nr: [1, 2, 5],
  fc: 6
}, {
  lngs: ['csb', 'pl'],
  nr: [1, 2, 5],
  fc: 7
}, {
  lngs: ['cy'],
  nr: [1, 2, 3, 8],
  fc: 8
}, {
  lngs: ['fr'],
  nr: [1, 2],
  fc: 9
}, {
  lngs: ['ga'],
  nr: [1, 2, 3, 7, 11],
  fc: 10
}, {
  lngs: ['gd'],
  nr: [1, 2, 3, 20],
  fc: 11
}, {
  lngs: ['is'],
  nr: [1, 2],
  fc: 12
}, {
  lngs: ['jv'],
  nr: [0, 1],
  fc: 13
}, {
  lngs: ['kw'],
  nr: [1, 2, 3, 4],
  fc: 14
}, {
  lngs: ['lt'],
  nr: [1, 2, 10],
  fc: 15
}, {
  lngs: ['lv'],
  nr: [1, 2, 0],
  fc: 16
}, {
  lngs: ['mk'],
  nr: [1, 2],
  fc: 17
}, {
  lngs: ['mnk'],
  nr: [0, 1, 2],
  fc: 18
}, {
  lngs: ['mt'],
  nr: [1, 2, 11, 20],
  fc: 19
}, {
  lngs: ['or'],
  nr: [2, 1],
  fc: 2
}, {
  lngs: ['ro'],
  nr: [1, 2, 20],
  fc: 20
}, {
  lngs: ['sl'],
  nr: [5, 1, 2, 3],
  fc: 21
}, {
  lngs: ['he', 'iw'],
  nr: [1, 2, 20, 21],
  fc: 22
}];
var _rulesPluralsTypes = {
  1: function _(n) {
    return Number(n > 1);
  },
  2: function _(n) {
    return Number(n != 1);
  },
  3: function _(n) {
    return 0;
  },
  4: function _(n) {
    return Number(n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
  },
  5: function _(n) {
    return Number(n == 0 ? 0 : n == 1 ? 1 : n == 2 ? 2 : n % 100 >= 3 && n % 100 <= 10 ? 3 : n % 100 >= 11 ? 4 : 5);
  },
  6: function _(n) {
    return Number(n == 1 ? 0 : n >= 2 && n <= 4 ? 1 : 2);
  },
  7: function _(n) {
    return Number(n == 1 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
  },
  8: function _(n) {
    return Number(n == 1 ? 0 : n == 2 ? 1 : n != 8 && n != 11 ? 2 : 3);
  },
  9: function _(n) {
    return Number(n >= 2);
  },
  10: function _(n) {
    return Number(n == 1 ? 0 : n == 2 ? 1 : n < 7 ? 2 : n < 11 ? 3 : 4);
  },
  11: function _(n) {
    return Number(n == 1 || n == 11 ? 0 : n == 2 || n == 12 ? 1 : n > 2 && n < 20 ? 2 : 3);
  },
  12: function _(n) {
    return Number(n % 10 != 1 || n % 100 == 11);
  },
  13: function _(n) {
    return Number(n !== 0);
  },
  14: function _(n) {
    return Number(n == 1 ? 0 : n == 2 ? 1 : n == 3 ? 2 : 3);
  },
  15: function _(n) {
    return Number(n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
  },
  16: function _(n) {
    return Number(n % 10 == 1 && n % 100 != 11 ? 0 : n !== 0 ? 1 : 2);
  },
  17: function _(n) {
    return Number(n == 1 || n % 10 == 1 && n % 100 != 11 ? 0 : 1);
  },
  18: function _(n) {
    return Number(n == 0 ? 0 : n == 1 ? 1 : 2);
  },
  19: function _(n) {
    return Number(n == 1 ? 0 : n == 0 || n % 100 > 1 && n % 100 < 11 ? 1 : n % 100 > 10 && n % 100 < 20 ? 2 : 3);
  },
  20: function _(n) {
    return Number(n == 1 ? 0 : n == 0 || n % 100 > 0 && n % 100 < 20 ? 1 : 2);
  },
  21: function _(n) {
    return Number(n % 100 == 1 ? 1 : n % 100 == 2 ? 2 : n % 100 == 3 || n % 100 == 4 ? 3 : 0);
  },
  22: function _(n) {
    return Number(n == 1 ? 0 : n == 2 ? 1 : (n < 0 || n > 10) && n % 10 == 0 ? 2 : 3);
  }
};
var deprecatedJsonVersions = ['v1', 'v2', 'v3'];
var suffixesOrder = {
  zero: 0,
  one: 1,
  two: 2,
  few: 3,
  many: 4,
  other: 5
};

function createRules() {
  var rules = {};
  sets.forEach(function (set) {
    set.lngs.forEach(function (l) {
      rules[l] = {
        numbers: set.nr,
        plurals: _rulesPluralsTypes[set.fc]
      };
    });
  });
  return rules;
}

var PluralResolver = function () {
  function PluralResolver(languageUtils) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    (0,_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_2__["default"])(this, PluralResolver);

    this.languageUtils = languageUtils;
    this.options = options;
    this.logger = baseLogger.create('pluralResolver');

    if ((!this.options.compatibilityJSON || this.options.compatibilityJSON === 'v4') && (typeof Intl === 'undefined' || !Intl.PluralRules)) {
      this.options.compatibilityJSON = 'v3';
      this.logger.error('Your environment seems not to be Intl API compatible, use an Intl.PluralRules polyfill. Will fallback to the compatibilityJSON v3 format handling.');
    }

    this.rules = createRules();
  }

  (0,_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3__["default"])(PluralResolver, [{
    key: "addRule",
    value: function addRule(lng, obj) {
      this.rules[lng] = obj;
    }
  }, {
    key: "getRule",
    value: function getRule(code) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (this.shouldUseIntlApi()) {
        try {
          return new Intl.PluralRules(code, {
            type: options.ordinal ? 'ordinal' : 'cardinal'
          });
        } catch (_unused) {
          return;
        }
      }

      return this.rules[code] || this.rules[this.languageUtils.getLanguagePartFromCode(code)];
    }
  }, {
    key: "needsPlural",
    value: function needsPlural(code) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var rule = this.getRule(code, options);

      if (this.shouldUseIntlApi()) {
        return rule && rule.resolvedOptions().pluralCategories.length > 1;
      }

      return rule && rule.numbers.length > 1;
    }
  }, {
    key: "getPluralFormsOfKey",
    value: function getPluralFormsOfKey(code, key) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.getSuffixes(code, options).map(function (suffix) {
        return "".concat(key).concat(suffix);
      });
    }
  }, {
    key: "getSuffixes",
    value: function getSuffixes(code) {
      var _this = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var rule = this.getRule(code, options);

      if (!rule) {
        return [];
      }

      if (this.shouldUseIntlApi()) {
        return rule.resolvedOptions().pluralCategories.sort(function (pluralCategory1, pluralCategory2) {
          return suffixesOrder[pluralCategory1] - suffixesOrder[pluralCategory2];
        }).map(function (pluralCategory) {
          return "".concat(_this.options.prepend).concat(pluralCategory);
        });
      }

      return rule.numbers.map(function (number) {
        return _this.getSuffix(code, number, options);
      });
    }
  }, {
    key: "getSuffix",
    value: function getSuffix(code, count) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var rule = this.getRule(code, options);

      if (rule) {
        if (this.shouldUseIntlApi()) {
          return "".concat(this.options.prepend).concat(rule.select(count));
        }

        return this.getSuffixRetroCompatible(rule, count);
      }

      this.logger.warn("no plural rule found for: ".concat(code));
      return '';
    }
  }, {
    key: "getSuffixRetroCompatible",
    value: function getSuffixRetroCompatible(rule, count) {
      var _this2 = this;

      var idx = rule.noAbs ? rule.plurals(count) : rule.plurals(Math.abs(count));
      var suffix = rule.numbers[idx];

      if (this.options.simplifyPluralSuffix && rule.numbers.length === 2 && rule.numbers[0] === 1) {
        if (suffix === 2) {
          suffix = 'plural';
        } else if (suffix === 1) {
          suffix = '';
        }
      }

      var returnSuffix = function returnSuffix() {
        return _this2.options.prepend && suffix.toString() ? _this2.options.prepend + suffix.toString() : suffix.toString();
      };

      if (this.options.compatibilityJSON === 'v1') {
        if (suffix === 1) return '';
        if (typeof suffix === 'number') return "_plural_".concat(suffix.toString());
        return returnSuffix();
      } else if (this.options.compatibilityJSON === 'v2') {
        return returnSuffix();
      } else if (this.options.simplifyPluralSuffix && rule.numbers.length === 2 && rule.numbers[0] === 1) {
        return returnSuffix();
      }

      return this.options.prepend && idx.toString() ? this.options.prepend + idx.toString() : idx.toString();
    }
  }, {
    key: "shouldUseIntlApi",
    value: function shouldUseIntlApi() {
      return !deprecatedJsonVersions.includes(this.options.compatibilityJSON);
    }
  }]);

  return PluralResolver;
}();

var Interpolator = function () {
  function Interpolator() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    (0,_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_2__["default"])(this, Interpolator);

    this.logger = baseLogger.create('interpolator');
    this.options = options;

    this.format = options.interpolation && options.interpolation.format || function (value) {
      return value;
    };

    this.init(options);
  }

  (0,_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3__["default"])(Interpolator, [{
    key: "init",
    value: function init() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      if (!options.interpolation) options.interpolation = {
        escapeValue: true
      };
      var iOpts = options.interpolation;
      this.escape = iOpts.escape !== undefined ? iOpts.escape : escape;
      this.escapeValue = iOpts.escapeValue !== undefined ? iOpts.escapeValue : true;
      this.useRawValueToEscape = iOpts.useRawValueToEscape !== undefined ? iOpts.useRawValueToEscape : false;
      this.prefix = iOpts.prefix ? regexEscape(iOpts.prefix) : iOpts.prefixEscaped || '{{';
      this.suffix = iOpts.suffix ? regexEscape(iOpts.suffix) : iOpts.suffixEscaped || '}}';
      this.formatSeparator = iOpts.formatSeparator ? iOpts.formatSeparator : iOpts.formatSeparator || ',';
      this.unescapePrefix = iOpts.unescapeSuffix ? '' : iOpts.unescapePrefix || '-';
      this.unescapeSuffix = this.unescapePrefix ? '' : iOpts.unescapeSuffix || '';
      this.nestingPrefix = iOpts.nestingPrefix ? regexEscape(iOpts.nestingPrefix) : iOpts.nestingPrefixEscaped || regexEscape('$t(');
      this.nestingSuffix = iOpts.nestingSuffix ? regexEscape(iOpts.nestingSuffix) : iOpts.nestingSuffixEscaped || regexEscape(')');
      this.nestingOptionsSeparator = iOpts.nestingOptionsSeparator ? iOpts.nestingOptionsSeparator : iOpts.nestingOptionsSeparator || ',';
      this.maxReplaces = iOpts.maxReplaces ? iOpts.maxReplaces : 1000;
      this.alwaysFormat = iOpts.alwaysFormat !== undefined ? iOpts.alwaysFormat : false;
      this.resetRegExp();
    }
  }, {
    key: "reset",
    value: function reset() {
      if (this.options) this.init(this.options);
    }
  }, {
    key: "resetRegExp",
    value: function resetRegExp() {
      var regexpStr = "".concat(this.prefix, "(.+?)").concat(this.suffix);
      this.regexp = new RegExp(regexpStr, 'g');
      var regexpUnescapeStr = "".concat(this.prefix).concat(this.unescapePrefix, "(.+?)").concat(this.unescapeSuffix).concat(this.suffix);
      this.regexpUnescape = new RegExp(regexpUnescapeStr, 'g');
      var nestingRegexpStr = "".concat(this.nestingPrefix, "(.+?)").concat(this.nestingSuffix);
      this.nestingRegexp = new RegExp(nestingRegexpStr, 'g');
    }
  }, {
    key: "interpolate",
    value: function interpolate(str, data, lng, options) {
      var _this = this;

      var match;
      var value;
      var replaces;
      var defaultData = this.options && this.options.interpolation && this.options.interpolation.defaultVariables || {};

      function regexSafe(val) {
        return val.replace(/\$/g, '$$$$');
      }

      var handleFormat = function handleFormat(key) {
        if (key.indexOf(_this.formatSeparator) < 0) {
          var path = getPathWithDefaults(data, defaultData, key);
          return _this.alwaysFormat ? _this.format(path, undefined, lng, (0,_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, options, data, {
            interpolationkey: key
          })) : path;
        }

        var p = key.split(_this.formatSeparator);
        var k = p.shift().trim();
        var f = p.join(_this.formatSeparator).trim();
        return _this.format(getPathWithDefaults(data, defaultData, k), f, lng, (0,_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, options, data, {
          interpolationkey: k
        }));
      };

      this.resetRegExp();
      var missingInterpolationHandler = options && options.missingInterpolationHandler || this.options.missingInterpolationHandler;
      var skipOnVariables = options && options.interpolation && options.interpolation.skipOnVariables || this.options.interpolation.skipOnVariables;
      var todos = [{
        regex: this.regexpUnescape,
        safeValue: function safeValue(val) {
          return regexSafe(val);
        }
      }, {
        regex: this.regexp,
        safeValue: function safeValue(val) {
          return _this.escapeValue ? regexSafe(_this.escape(val)) : regexSafe(val);
        }
      }];
      todos.forEach(function (todo) {
        replaces = 0;

        while (match = todo.regex.exec(str)) {
          value = handleFormat(match[1].trim());

          if (value === undefined) {
            if (typeof missingInterpolationHandler === 'function') {
              var temp = missingInterpolationHandler(str, match, options);
              value = typeof temp === 'string' ? temp : '';
            } else if (skipOnVariables) {
              value = match[0];
              continue;
            } else {
              _this.logger.warn("missed to pass in variable ".concat(match[1], " for interpolating ").concat(str));

              value = '';
            }
          } else if (typeof value !== 'string' && !_this.useRawValueToEscape) {
            value = makeString(value);
          }

          var safeValue = todo.safeValue(value);
          str = str.replace(match[0], safeValue);

          if (skipOnVariables) {
            todo.regex.lastIndex += safeValue.length;
            todo.regex.lastIndex -= match[0].length;
          } else {
            todo.regex.lastIndex = 0;
          }

          replaces++;

          if (replaces >= _this.maxReplaces) {
            break;
          }
        }
      });
      return str;
    }
  }, {
    key: "nest",
    value: function nest(str, fc) {
      var _this2 = this;

      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var match;
      var value;

      var clonedOptions = (0,_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, options);

      clonedOptions.applyPostProcessor = false;
      delete clonedOptions.defaultValue;

      function handleHasOptions(key, inheritedOptions) {
        var sep = this.nestingOptionsSeparator;
        if (key.indexOf(sep) < 0) return key;
        var c = key.split(new RegExp("".concat(sep, "[ ]*{")));
        var optionsString = "{".concat(c[1]);
        key = c[0];
        optionsString = this.interpolate(optionsString, clonedOptions);
        optionsString = optionsString.replace(/'/g, '"');

        try {
          clonedOptions = JSON.parse(optionsString);
          if (inheritedOptions) clonedOptions = (0,_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, inheritedOptions, clonedOptions);
        } catch (e) {
          this.logger.warn("failed parsing options string in nesting for key ".concat(key), e);
          return "".concat(key).concat(sep).concat(optionsString);
        }

        delete clonedOptions.defaultValue;
        return key;
      }

      while (match = this.nestingRegexp.exec(str)) {
        var formatters = [];
        var doReduce = false;

        if (match[0].indexOf(this.formatSeparator) !== -1 && !/{.*}/.test(match[1])) {
          var r = match[1].split(this.formatSeparator).map(function (elem) {
            return elem.trim();
          });
          match[1] = r.shift();
          formatters = r;
          doReduce = true;
        }

        value = fc(handleHasOptions.call(this, match[1].trim(), clonedOptions), clonedOptions);
        if (value && match[0] === str && typeof value !== 'string') return value;
        if (typeof value !== 'string') value = makeString(value);

        if (!value) {
          this.logger.warn("missed to resolve ".concat(match[1], " for nesting ").concat(str));
          value = '';
        }

        if (doReduce) {
          value = formatters.reduce(function (v, f) {
            return _this2.format(v, f, options.lng, (0,_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, options, {
              interpolationkey: match[1].trim()
            }));
          }, value.trim());
        }

        str = str.replace(match[0], value);
        this.regexp.lastIndex = 0;
      }

      return str;
    }
  }]);

  return Interpolator;
}();

function parseFormatStr(formatStr) {
  var formatName = formatStr.toLowerCase();
  var formatOptions = {};

  if (formatStr.indexOf('(') > -1) {
    var p = formatStr.split('(');
    formatName = p[0].toLowerCase();
    var optStr = p[1].substring(0, p[1].length - 1);

    if (formatName === 'currency' && optStr.indexOf(':') < 0) {
      if (!formatOptions.currency) formatOptions.currency = optStr.trim();
    } else if (formatName === 'relativetime' && optStr.indexOf(':') < 0) {
      if (!formatOptions.range) formatOptions.range = optStr.trim();
    } else {
      var opts = optStr.split(';');
      opts.forEach(function (opt) {
        if (!opt) return;

        var _opt$split = opt.split(':'),
            _opt$split2 = (0,_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_8__["default"])(_opt$split, 2),
            key = _opt$split2[0],
            val = _opt$split2[1];

        if (val.trim() === 'false') formatOptions[key.trim()] = false;
        if (val.trim() === 'true') formatOptions[key.trim()] = true;
        if (!isNaN(val.trim())) formatOptions[key.trim()] = parseInt(val.trim(), 10);
        if (!formatOptions[key.trim()]) formatOptions[key.trim()] = val.trim();
      });
    }
  }

  return {
    formatName: formatName,
    formatOptions: formatOptions
  };
}

var Formatter = function () {
  function Formatter() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    (0,_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_2__["default"])(this, Formatter);

    this.logger = baseLogger.create('formatter');
    this.options = options;
    this.formats = {
      number: function number(val, lng, options) {
        return new Intl.NumberFormat(lng, options).format(val);
      },
      currency: function currency(val, lng, options) {
        return new Intl.NumberFormat(lng, (0,_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, options, {
          style: 'currency'
        })).format(val);
      },
      datetime: function datetime(val, lng, options) {
        return new Intl.DateTimeFormat(lng, (0,_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, options)).format(val);
      },
      relativetime: function relativetime(val, lng, options) {
        return new Intl.RelativeTimeFormat(lng, (0,_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, options)).format(val, options.range || 'day');
      },
      list: function list(val, lng, options) {
        return new Intl.ListFormat(lng, (0,_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, options)).format(val);
      }
    };
    this.init(options);
  }

  (0,_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3__["default"])(Formatter, [{
    key: "init",
    value: function init(services) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        interpolation: {}
      };
      var iOpts = options.interpolation;
      this.formatSeparator = iOpts.formatSeparator ? iOpts.formatSeparator : iOpts.formatSeparator || ',';
    }
  }, {
    key: "add",
    value: function add(name, fc) {
      this.formats[name] = fc;
    }
  }, {
    key: "format",
    value: function format(value, _format, lng, options) {
      var _this = this;

      var formats = _format.split(this.formatSeparator);

      var result = formats.reduce(function (mem, f) {
        var _parseFormatStr = parseFormatStr(f),
            formatName = _parseFormatStr.formatName,
            formatOptions = _parseFormatStr.formatOptions;

        if (_this.formats[formatName]) {
          var formatted = mem;

          try {
            var valOptions = options && options.formatParams && options.formatParams[options.interpolationkey] || {};
            var l = valOptions.locale || valOptions.lng || options.locale || options.lng || lng;
            formatted = _this.formats[formatName](mem, l, (0,_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, formatOptions, options, valOptions));
          } catch (error) {
            _this.logger.warn(error);
          }

          return formatted;
        } else {
          _this.logger.warn("there was no format function for ".concat(formatName));
        }

        return mem;
      }, value);
      return result;
    }
  }]);

  return Formatter;
}();

function remove(arr, what) {
  var found = arr.indexOf(what);

  while (found !== -1) {
    arr.splice(found, 1);
    found = arr.indexOf(what);
  }
}

var Connector = function (_EventEmitter) {
  (0,_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_7__["default"])(Connector, _EventEmitter);

  function Connector(backend, store, services) {
    var _this;

    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    (0,_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_2__["default"])(this, Connector);

    _this = (0,_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__["default"])(this, (0,_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(Connector).call(this));

    if (isIE10) {
      EventEmitter.call((0,_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6__["default"])(_this));
    }

    _this.backend = backend;
    _this.store = store;
    _this.services = services;
    _this.languageUtils = services.languageUtils;
    _this.options = options;
    _this.logger = baseLogger.create('backendConnector');
    _this.state = {};
    _this.queue = [];

    if (_this.backend && _this.backend.init) {
      _this.backend.init(services, options.backend, options);
    }

    return _this;
  }

  (0,_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3__["default"])(Connector, [{
    key: "queueLoad",
    value: function queueLoad(languages, namespaces, options, callback) {
      var _this2 = this;

      var toLoad = [];
      var pending = [];
      var toLoadLanguages = [];
      var toLoadNamespaces = [];
      languages.forEach(function (lng) {
        var hasAllNamespaces = true;
        namespaces.forEach(function (ns) {
          var name = "".concat(lng, "|").concat(ns);

          if (!options.reload && _this2.store.hasResourceBundle(lng, ns)) {
            _this2.state[name] = 2;
          } else if (_this2.state[name] < 0) ; else if (_this2.state[name] === 1) {
            if (pending.indexOf(name) < 0) pending.push(name);
          } else {
            _this2.state[name] = 1;
            hasAllNamespaces = false;
            if (pending.indexOf(name) < 0) pending.push(name);
            if (toLoad.indexOf(name) < 0) toLoad.push(name);
            if (toLoadNamespaces.indexOf(ns) < 0) toLoadNamespaces.push(ns);
          }
        });
        if (!hasAllNamespaces) toLoadLanguages.push(lng);
      });

      if (toLoad.length || pending.length) {
        this.queue.push({
          pending: pending,
          loaded: {},
          errors: [],
          callback: callback
        });
      }

      return {
        toLoad: toLoad,
        pending: pending,
        toLoadLanguages: toLoadLanguages,
        toLoadNamespaces: toLoadNamespaces
      };
    }
  }, {
    key: "loaded",
    value: function loaded(name, err, data) {
      var s = name.split('|');
      var lng = s[0];
      var ns = s[1];
      if (err) this.emit('failedLoading', lng, ns, err);

      if (data) {
        this.store.addResourceBundle(lng, ns, data);
      }

      this.state[name] = err ? -1 : 2;
      var loaded = {};
      this.queue.forEach(function (q) {
        pushPath(q.loaded, [lng], ns);
        remove(q.pending, name);
        if (err) q.errors.push(err);

        if (q.pending.length === 0 && !q.done) {
          Object.keys(q.loaded).forEach(function (l) {
            if (!loaded[l]) loaded[l] = [];

            if (q.loaded[l].length) {
              q.loaded[l].forEach(function (ns) {
                if (loaded[l].indexOf(ns) < 0) loaded[l].push(ns);
              });
            }
          });
          q.done = true;

          if (q.errors.length) {
            q.callback(q.errors);
          } else {
            q.callback();
          }
        }
      });
      this.emit('loaded', loaded);
      this.queue = this.queue.filter(function (q) {
        return !q.done;
      });
    }
  }, {
    key: "read",
    value: function read(lng, ns, fcName) {
      var _this3 = this;

      var tried = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
      var wait = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 350;
      var callback = arguments.length > 5 ? arguments[5] : undefined;
      if (!lng.length) return callback(null, {});
      return this.backend[fcName](lng, ns, function (err, data) {
        if (err && data && tried < 5) {
          setTimeout(function () {
            _this3.read.call(_this3, lng, ns, fcName, tried + 1, wait * 2, callback);
          }, wait);
          return;
        }

        callback(err, data);
      });
    }
  }, {
    key: "prepareLoading",
    value: function prepareLoading(languages, namespaces) {
      var _this4 = this;

      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var callback = arguments.length > 3 ? arguments[3] : undefined;

      if (!this.backend) {
        this.logger.warn('No backend was added via i18next.use. Will not load resources.');
        return callback && callback();
      }

      if (typeof languages === 'string') languages = this.languageUtils.toResolveHierarchy(languages);
      if (typeof namespaces === 'string') namespaces = [namespaces];
      var toLoad = this.queueLoad(languages, namespaces, options, callback);

      if (!toLoad.toLoad.length) {
        if (!toLoad.pending.length) callback();
        return null;
      }

      toLoad.toLoad.forEach(function (name) {
        _this4.loadOne(name);
      });
    }
  }, {
    key: "load",
    value: function load(languages, namespaces, callback) {
      this.prepareLoading(languages, namespaces, {}, callback);
    }
  }, {
    key: "reload",
    value: function reload(languages, namespaces, callback) {
      this.prepareLoading(languages, namespaces, {
        reload: true
      }, callback);
    }
  }, {
    key: "loadOne",
    value: function loadOne(name) {
      var _this5 = this;

      var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var s = name.split('|');
      var lng = s[0];
      var ns = s[1];
      this.read(lng, ns, 'read', undefined, undefined, function (err, data) {
        if (err) _this5.logger.warn("".concat(prefix, "loading namespace ").concat(ns, " for language ").concat(lng, " failed"), err);
        if (!err && data) _this5.logger.log("".concat(prefix, "loaded namespace ").concat(ns, " for language ").concat(lng), data);

        _this5.loaded(name, err, data);
      });
    }
  }, {
    key: "saveMissing",
    value: function saveMissing(languages, namespace, key, fallbackValue, isUpdate) {
      var options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};

      if (this.services.utils && this.services.utils.hasLoadedNamespace && !this.services.utils.hasLoadedNamespace(namespace)) {
        this.logger.warn("did not save key \"".concat(key, "\" as the namespace \"").concat(namespace, "\" was not yet loaded"), 'This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!');
        return;
      }

      if (key === undefined || key === null || key === '') return;

      if (this.backend && this.backend.create) {
        this.backend.create(languages, namespace, key, fallbackValue, null, (0,_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, options, {
          isUpdate: isUpdate
        }));
      }

      if (!languages || !languages[0]) return;
      this.store.addResource(languages[0], namespace, key, fallbackValue);
    }
  }]);

  return Connector;
}(EventEmitter);

function get() {
  return {
    debug: false,
    initImmediate: true,
    ns: ['translation'],
    defaultNS: ['translation'],
    fallbackLng: ['dev'],
    fallbackNS: false,
    supportedLngs: false,
    nonExplicitSupportedLngs: false,
    load: 'all',
    preload: false,
    simplifyPluralSuffix: true,
    keySeparator: '.',
    nsSeparator: ':',
    pluralSeparator: '_',
    contextSeparator: '_',
    partialBundledLanguages: false,
    saveMissing: false,
    updateMissing: false,
    saveMissingTo: 'fallback',
    saveMissingPlurals: true,
    missingKeyHandler: false,
    missingInterpolationHandler: false,
    postProcess: false,
    postProcessPassResolved: false,
    returnNull: true,
    returnEmptyString: true,
    returnObjects: false,
    joinArrays: false,
    returnedObjectHandler: false,
    parseMissingKeyHandler: false,
    appendNamespaceToMissingKey: false,
    appendNamespaceToCIMode: false,
    overloadTranslationOptionHandler: function handle(args) {
      var ret = {};
      if ((0,_babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(args[1]) === 'object') ret = args[1];
      if (typeof args[1] === 'string') ret.defaultValue = args[1];
      if (typeof args[2] === 'string') ret.tDescription = args[2];

      if ((0,_babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(args[2]) === 'object' || (0,_babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(args[3]) === 'object') {
        var options = args[3] || args[2];
        Object.keys(options).forEach(function (key) {
          ret[key] = options[key];
        });
      }

      return ret;
    },
    interpolation: {
      escapeValue: true,
      format: function format(value, _format, lng, options) {
        return value;
      },
      prefix: '{{',
      suffix: '}}',
      formatSeparator: ',',
      unescapePrefix: '-',
      nestingPrefix: '$t(',
      nestingSuffix: ')',
      nestingOptionsSeparator: ',',
      maxReplaces: 1000,
      skipOnVariables: true
    }
  };
}
function transformOptions(options) {
  if (typeof options.ns === 'string') options.ns = [options.ns];
  if (typeof options.fallbackLng === 'string') options.fallbackLng = [options.fallbackLng];
  if (typeof options.fallbackNS === 'string') options.fallbackNS = [options.fallbackNS];

  if (options.supportedLngs && options.supportedLngs.indexOf('cimode') < 0) {
    options.supportedLngs = options.supportedLngs.concat(['cimode']);
  }

  return options;
}

function noop() {}

var I18n = function (_EventEmitter) {
  (0,_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_7__["default"])(I18n, _EventEmitter);

  function I18n() {
    var _this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var callback = arguments.length > 1 ? arguments[1] : undefined;

    (0,_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_2__["default"])(this, I18n);

    _this = (0,_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__["default"])(this, (0,_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(I18n).call(this));

    if (isIE10) {
      EventEmitter.call((0,_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6__["default"])(_this));
    }

    _this.options = transformOptions(options);
    _this.services = {};
    _this.logger = baseLogger;
    _this.modules = {
      external: []
    };

    if (callback && !_this.isInitialized && !options.isClone) {
      if (!_this.options.initImmediate) {
        _this.init(options, callback);

        return (0,_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__["default"])(_this, (0,_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6__["default"])(_this));
      }

      setTimeout(function () {
        _this.init(options, callback);
      }, 0);
    }

    return _this;
  }

  (0,_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3__["default"])(I18n, [{
    key: "init",
    value: function init() {
      var _this2 = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var callback = arguments.length > 1 ? arguments[1] : undefined;

      if (typeof options === 'function') {
        callback = options;
        options = {};
      }

      if (!options.defaultNS && options.ns) {
        if (typeof options.ns === 'string') {
          options.defaultNS = options.ns;
        } else if (options.ns.indexOf('translation') < 0) {
          options.defaultNS = options.ns[0];
        }
      }

      var defOpts = get();
      this.options = (0,_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, defOpts, this.options, transformOptions(options));

      if (options.keySeparator !== undefined) {
        this.options.userDefinedKeySeparator = options.keySeparator;
      }

      if (options.nsSeparator !== undefined) {
        this.options.userDefinedNsSeparator = options.nsSeparator;
      }

      function createClassOnDemand(ClassOrObject) {
        if (!ClassOrObject) return null;
        if (typeof ClassOrObject === 'function') return new ClassOrObject();
        return ClassOrObject;
      }

      if (!this.options.isClone) {
        if (this.modules.logger) {
          baseLogger.init(createClassOnDemand(this.modules.logger), this.options);
        } else {
          baseLogger.init(null, this.options);
        }

        var formatter;

        if (this.modules.formatter) {
          formatter = this.modules.formatter;
        } else if (typeof Intl !== 'undefined') {
          formatter = Formatter;
        }

        var lu = new LanguageUtil(this.options);
        this.store = new ResourceStore(this.options.resources, this.options);
        var s = this.services;
        s.logger = baseLogger;
        s.resourceStore = this.store;
        s.languageUtils = lu;
        s.pluralResolver = new PluralResolver(lu, {
          prepend: this.options.pluralSeparator,
          compatibilityJSON: this.options.compatibilityJSON,
          simplifyPluralSuffix: this.options.simplifyPluralSuffix
        });

        if (formatter && (!this.options.interpolation.format || this.options.interpolation.format === defOpts.interpolation.format)) {
          s.formatter = createClassOnDemand(formatter);
          s.formatter.init(s, this.options);
          this.options.interpolation.format = s.formatter.format.bind(s.formatter);
        }

        s.interpolator = new Interpolator(this.options);
        s.utils = {
          hasLoadedNamespace: this.hasLoadedNamespace.bind(this)
        };
        s.backendConnector = new Connector(createClassOnDemand(this.modules.backend), s.resourceStore, s, this.options);
        s.backendConnector.on('*', function (event) {
          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }

          _this2.emit.apply(_this2, [event].concat(args));
        });

        if (this.modules.languageDetector) {
          s.languageDetector = createClassOnDemand(this.modules.languageDetector);
          s.languageDetector.init(s, this.options.detection, this.options);
        }

        if (this.modules.i18nFormat) {
          s.i18nFormat = createClassOnDemand(this.modules.i18nFormat);
          if (s.i18nFormat.init) s.i18nFormat.init(this);
        }

        this.translator = new Translator(this.services, this.options);
        this.translator.on('*', function (event) {
          for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            args[_key2 - 1] = arguments[_key2];
          }

          _this2.emit.apply(_this2, [event].concat(args));
        });
        this.modules.external.forEach(function (m) {
          if (m.init) m.init(_this2);
        });
      }

      this.format = this.options.interpolation.format;
      if (!callback) callback = noop;

      if (this.options.fallbackLng && !this.services.languageDetector && !this.options.lng) {
        var codes = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
        if (codes.length > 0 && codes[0] !== 'dev') this.options.lng = codes[0];
      }

      if (!this.services.languageDetector && !this.options.lng) {
        this.logger.warn('init: no languageDetector is used and no lng is defined');
      }

      var storeApi = ['getResource', 'hasResourceBundle', 'getResourceBundle', 'getDataByLanguage'];
      storeApi.forEach(function (fcName) {
        _this2[fcName] = function () {
          var _this2$store;

          return (_this2$store = _this2.store)[fcName].apply(_this2$store, arguments);
        };
      });
      var storeApiChained = ['addResource', 'addResources', 'addResourceBundle', 'removeResourceBundle'];
      storeApiChained.forEach(function (fcName) {
        _this2[fcName] = function () {
          var _this2$store2;

          (_this2$store2 = _this2.store)[fcName].apply(_this2$store2, arguments);

          return _this2;
        };
      });
      var deferred = defer();

      var load = function load() {
        var finish = function finish(err, t) {
          if (_this2.isInitialized && !_this2.initializedStoreOnce) _this2.logger.warn('init: i18next is already initialized. You should call init just once!');
          _this2.isInitialized = true;
          if (!_this2.options.isClone) _this2.logger.log('initialized', _this2.options);

          _this2.emit('initialized', _this2.options);

          deferred.resolve(t);
          callback(err, t);
        };

        if (_this2.languages && _this2.options.compatibilityAPI !== 'v1' && !_this2.isInitialized) return finish(null, _this2.t.bind(_this2));

        _this2.changeLanguage(_this2.options.lng, finish);
      };

      if (this.options.resources || !this.options.initImmediate) {
        load();
      } else {
        setTimeout(load, 0);
      }

      return deferred;
    }
  }, {
    key: "loadResources",
    value: function loadResources(language) {
      var _this3 = this;

      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
      var usedCallback = callback;
      var usedLng = typeof language === 'string' ? language : this.language;
      if (typeof language === 'function') usedCallback = language;

      if (!this.options.resources || this.options.partialBundledLanguages) {
        if (usedLng && usedLng.toLowerCase() === 'cimode') return usedCallback();
        var toLoad = [];

        var append = function append(lng) {
          if (!lng) return;

          var lngs = _this3.services.languageUtils.toResolveHierarchy(lng);

          lngs.forEach(function (l) {
            if (toLoad.indexOf(l) < 0) toLoad.push(l);
          });
        };

        if (!usedLng) {
          var fallbacks = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
          fallbacks.forEach(function (l) {
            return append(l);
          });
        } else {
          append(usedLng);
        }

        if (this.options.preload) {
          this.options.preload.forEach(function (l) {
            return append(l);
          });
        }

        this.services.backendConnector.load(toLoad, this.options.ns, usedCallback);
      } else {
        usedCallback(null);
      }
    }
  }, {
    key: "reloadResources",
    value: function reloadResources(lngs, ns, callback) {
      var deferred = defer();
      if (!lngs) lngs = this.languages;
      if (!ns) ns = this.options.ns;
      if (!callback) callback = noop;
      this.services.backendConnector.reload(lngs, ns, function (err) {
        deferred.resolve();
        callback(err);
      });
      return deferred;
    }
  }, {
    key: "use",
    value: function use(module) {
      if (!module) throw new Error('You are passing an undefined module! Please check the object you are passing to i18next.use()');
      if (!module.type) throw new Error('You are passing a wrong module! Please check the object you are passing to i18next.use()');

      if (module.type === 'backend') {
        this.modules.backend = module;
      }

      if (module.type === 'logger' || module.log && module.warn && module.error) {
        this.modules.logger = module;
      }

      if (module.type === 'languageDetector') {
        this.modules.languageDetector = module;
      }

      if (module.type === 'i18nFormat') {
        this.modules.i18nFormat = module;
      }

      if (module.type === 'postProcessor') {
        postProcessor.addPostProcessor(module);
      }

      if (module.type === 'formatter') {
        this.modules.formatter = module;
      }

      if (module.type === '3rdParty') {
        this.modules.external.push(module);
      }

      return this;
    }
  }, {
    key: "changeLanguage",
    value: function changeLanguage(lng, callback) {
      var _this4 = this;

      this.isLanguageChangingTo = lng;
      var deferred = defer();
      this.emit('languageChanging', lng);

      var setLngProps = function setLngProps(l) {
        _this4.language = l;
        _this4.languages = _this4.services.languageUtils.toResolveHierarchy(l);
        _this4.resolvedLanguage = undefined;
        if (['cimode', 'dev'].indexOf(l) > -1) return;

        for (var li = 0; li < _this4.languages.length; li++) {
          var lngInLngs = _this4.languages[li];
          if (['cimode', 'dev'].indexOf(lngInLngs) > -1) continue;

          if (_this4.store.hasLanguageSomeTranslations(lngInLngs)) {
            _this4.resolvedLanguage = lngInLngs;
            break;
          }
        }
      };

      var done = function done(err, l) {
        if (l) {
          setLngProps(l);

          _this4.translator.changeLanguage(l);

          _this4.isLanguageChangingTo = undefined;

          _this4.emit('languageChanged', l);

          _this4.logger.log('languageChanged', l);
        } else {
          _this4.isLanguageChangingTo = undefined;
        }

        deferred.resolve(function () {
          return _this4.t.apply(_this4, arguments);
        });
        if (callback) callback(err, function () {
          return _this4.t.apply(_this4, arguments);
        });
      };

      var setLng = function setLng(lngs) {
        if (!lng && !lngs && _this4.services.languageDetector) lngs = [];
        var l = typeof lngs === 'string' ? lngs : _this4.services.languageUtils.getBestMatchFromCodes(lngs);

        if (l) {
          if (!_this4.language) {
            setLngProps(l);
          }

          if (!_this4.translator.language) _this4.translator.changeLanguage(l);
          if (_this4.services.languageDetector) _this4.services.languageDetector.cacheUserLanguage(l);
        }

        _this4.loadResources(l, function (err) {
          done(err, l);
        });
      };

      if (!lng && this.services.languageDetector && !this.services.languageDetector.async) {
        setLng(this.services.languageDetector.detect());
      } else if (!lng && this.services.languageDetector && this.services.languageDetector.async) {
        this.services.languageDetector.detect(setLng);
      } else {
        setLng(lng);
      }

      return deferred;
    }
  }, {
    key: "getFixedT",
    value: function getFixedT(lng, ns, keyPrefix) {
      var _this5 = this;

      var fixedT = function fixedT(key, opts) {
        var options;

        if ((0,_babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(opts) !== 'object') {
          for (var _len3 = arguments.length, rest = new Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
            rest[_key3 - 2] = arguments[_key3];
          }

          options = _this5.options.overloadTranslationOptionHandler([key, opts].concat(rest));
        } else {
          options = (0,_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, opts);
        }

        options.lng = options.lng || fixedT.lng;
        options.lngs = options.lngs || fixedT.lngs;
        options.ns = options.ns || fixedT.ns;
        var keySeparator = _this5.options.keySeparator || '.';
        var resultKey = keyPrefix ? "".concat(keyPrefix).concat(keySeparator).concat(key) : key;
        return _this5.t(resultKey, options);
      };

      if (typeof lng === 'string') {
        fixedT.lng = lng;
      } else {
        fixedT.lngs = lng;
      }

      fixedT.ns = ns;
      fixedT.keyPrefix = keyPrefix;
      return fixedT;
    }
  }, {
    key: "t",
    value: function t() {
      var _this$translator;

      return this.translator && (_this$translator = this.translator).translate.apply(_this$translator, arguments);
    }
  }, {
    key: "exists",
    value: function exists() {
      var _this$translator2;

      return this.translator && (_this$translator2 = this.translator).exists.apply(_this$translator2, arguments);
    }
  }, {
    key: "setDefaultNamespace",
    value: function setDefaultNamespace(ns) {
      this.options.defaultNS = ns;
    }
  }, {
    key: "hasLoadedNamespace",
    value: function hasLoadedNamespace(ns) {
      var _this6 = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (!this.isInitialized) {
        this.logger.warn('hasLoadedNamespace: i18next was not initialized', this.languages);
        return false;
      }

      if (!this.languages || !this.languages.length) {
        this.logger.warn('hasLoadedNamespace: i18n.languages were undefined or empty', this.languages);
        return false;
      }

      var lng = this.resolvedLanguage || this.languages[0];
      var fallbackLng = this.options ? this.options.fallbackLng : false;
      var lastLng = this.languages[this.languages.length - 1];
      if (lng.toLowerCase() === 'cimode') return true;

      var loadNotPending = function loadNotPending(l, n) {
        var loadState = _this6.services.backendConnector.state["".concat(l, "|").concat(n)];

        return loadState === -1 || loadState === 2;
      };

      if (options.precheck) {
        var preResult = options.precheck(this, loadNotPending);
        if (preResult !== undefined) return preResult;
      }

      if (this.hasResourceBundle(lng, ns)) return true;
      if (!this.services.backendConnector.backend) return true;
      if (loadNotPending(lng, ns) && (!fallbackLng || loadNotPending(lastLng, ns))) return true;
      return false;
    }
  }, {
    key: "loadNamespaces",
    value: function loadNamespaces(ns, callback) {
      var _this7 = this;

      var deferred = defer();

      if (!this.options.ns) {
        callback && callback();
        return Promise.resolve();
      }

      if (typeof ns === 'string') ns = [ns];
      ns.forEach(function (n) {
        if (_this7.options.ns.indexOf(n) < 0) _this7.options.ns.push(n);
      });
      this.loadResources(function (err) {
        deferred.resolve();
        if (callback) callback(err);
      });
      return deferred;
    }
  }, {
    key: "loadLanguages",
    value: function loadLanguages(lngs, callback) {
      var deferred = defer();
      if (typeof lngs === 'string') lngs = [lngs];
      var preloaded = this.options.preload || [];
      var newLngs = lngs.filter(function (lng) {
        return preloaded.indexOf(lng) < 0;
      });

      if (!newLngs.length) {
        if (callback) callback();
        return Promise.resolve();
      }

      this.options.preload = preloaded.concat(newLngs);
      this.loadResources(function (err) {
        deferred.resolve();
        if (callback) callback(err);
      });
      return deferred;
    }
  }, {
    key: "dir",
    value: function dir(lng) {
      if (!lng) lng = this.resolvedLanguage || (this.languages && this.languages.length > 0 ? this.languages[0] : this.language);
      if (!lng) return 'rtl';
      var rtlLngs = ['ar', 'shu', 'sqr', 'ssh', 'xaa', 'yhd', 'yud', 'aao', 'abh', 'abv', 'acm', 'acq', 'acw', 'acx', 'acy', 'adf', 'ads', 'aeb', 'aec', 'afb', 'ajp', 'apc', 'apd', 'arb', 'arq', 'ars', 'ary', 'arz', 'auz', 'avl', 'ayh', 'ayl', 'ayn', 'ayp', 'bbz', 'pga', 'he', 'iw', 'ps', 'pbt', 'pbu', 'pst', 'prp', 'prd', 'ug', 'ur', 'ydd', 'yds', 'yih', 'ji', 'yi', 'hbo', 'men', 'xmn', 'fa', 'jpr', 'peo', 'pes', 'prs', 'dv', 'sam', 'ckb'];
      return rtlLngs.indexOf(this.services.languageUtils.getLanguagePartFromCode(lng)) >= 0 ? 'rtl' : 'ltr';
    }
  }, {
    key: "createInstance",
    value: function createInstance() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var callback = arguments.length > 1 ? arguments[1] : undefined;
      return new I18n(options, callback);
    }
  }, {
    key: "cloneInstance",
    value: function cloneInstance() {
      var _this8 = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;

      var mergedOptions = (0,_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, this.options, options, {
        isClone: true
      });

      var clone = new I18n(mergedOptions);
      var membersToCopy = ['store', 'services', 'language'];
      membersToCopy.forEach(function (m) {
        clone[m] = _this8[m];
      });
      clone.services = (0,_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, this.services);
      clone.services.utils = {
        hasLoadedNamespace: clone.hasLoadedNamespace.bind(clone)
      };
      clone.translator = new Translator(clone.services, clone.options);
      clone.translator.on('*', function (event) {
        for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
          args[_key4 - 1] = arguments[_key4];
        }

        clone.emit.apply(clone, [event].concat(args));
      });
      clone.init(mergedOptions, callback);
      clone.translator.options = clone.options;
      clone.translator.backendConnector.services.utils = {
        hasLoadedNamespace: clone.hasLoadedNamespace.bind(clone)
      };
      return clone;
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return {
        options: this.options,
        store: this.store,
        language: this.language,
        languages: this.languages,
        resolvedLanguage: this.resolvedLanguage
      };
    }
  }]);

  return I18n;
}(EventEmitter);

var i18next = new I18n();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (i18next);


/***/ }),

/***/ "./css/owfont-regular.css":
/*!********************************!*\
  !*** ./css/owfont-regular.css ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./css/style.css":
/*!***********************!*\
  !*** ./css/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js":
/*!**********************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _arrayLikeToArray)
/* harmony export */ });
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js":
/*!********************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _arrayWithHoles)
/* harmony export */ });
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js":
/*!***************************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _assertThisInitialized)
/* harmony export */ });
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/esm/classCallCheck.js":
/*!********************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/esm/classCallCheck.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _classCallCheck)
/* harmony export */ });
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/esm/createClass.js":
/*!*****************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/esm/createClass.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _createClass)
/* harmony export */ });
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/esm/defineProperty.js":
/*!********************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/esm/defineProperty.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _defineProperty)
/* harmony export */ });
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js":
/*!********************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _getPrototypeOf)
/* harmony export */ });
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/esm/inherits.js":
/*!**************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/esm/inherits.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _inherits)
/* harmony export */ });
/* harmony import */ var _setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setPrototypeOf.js */ "../node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js");

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) (0,_setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__["default"])(subClass, superClass);
}

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js":
/*!**************************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _iterableToArrayLimit)
/* harmony export */ });
function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/esm/nonIterableRest.js":
/*!*********************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/esm/nonIterableRest.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _nonIterableRest)
/* harmony export */ });
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/esm/objectSpread.js":
/*!******************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/esm/objectSpread.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _objectSpread)
/* harmony export */ });
/* harmony import */ var _defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./defineProperty.js */ "../node_modules/@babel/runtime/helpers/esm/defineProperty.js");

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? Object(arguments[i]) : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys.push.apply(ownKeys, Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      (0,_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(target, key, source[key]);
    });
  }

  return target;
}

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js":
/*!*******************************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _possibleConstructorReturn)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "../node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _assertThisInitialized_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assertThisInitialized.js */ "../node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js");


function _possibleConstructorReturn(self, call) {
  if (call && ((0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }

  return (0,_assertThisInitialized_js__WEBPACK_IMPORTED_MODULE_1__["default"])(self);
}

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js":
/*!********************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _setPrototypeOf)
/* harmony export */ });
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/esm/slicedToArray.js":
/*!*******************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/esm/slicedToArray.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _slicedToArray)
/* harmony export */ });
/* harmony import */ var _arrayWithHoles_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayWithHoles.js */ "../node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js");
/* harmony import */ var _iterableToArrayLimit_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./iterableToArrayLimit.js */ "../node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js");
/* harmony import */ var _unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./unsupportedIterableToArray.js */ "../node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js");
/* harmony import */ var _nonIterableRest_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./nonIterableRest.js */ "../node_modules/@babel/runtime/helpers/esm/nonIterableRest.js");




function _slicedToArray(arr, i) {
  return (0,_arrayWithHoles_js__WEBPACK_IMPORTED_MODULE_0__["default"])(arr) || (0,_iterableToArrayLimit_js__WEBPACK_IMPORTED_MODULE_1__["default"])(arr, i) || (0,_unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__["default"])(arr, i) || (0,_nonIterableRest_js__WEBPACK_IMPORTED_MODULE_3__["default"])();
}

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/esm/typeof.js":
/*!************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/esm/typeof.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _typeof)
/* harmony export */ });
function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js":
/*!********************************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _unsupportedIterableToArray)
/* harmony export */ });
/* harmony import */ var _arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayLikeToArray.js */ "../node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js");

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(o, minLen);
}

/***/ }),

/***/ "./i18n/translations/en.json":
/*!***********************************!*\
  !*** ./i18n/translations/en.json ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"partsOfDay":{"night":"Good night,","morning":"Good morning,","afternoon":"Good afternoon,","evening":"Good evening,"},"daysOfWeek":{"sunday":"Sunday","monday":"Monday","tuesday":"Tuesday","wednesday":"Wednesday","thursday":"Thursday","friday":"Friday","saturday":"Saturday"},"months":{"january":"January","february":"February","march":"March","april":"April","may":"May","june":"June","july":"July","august":"August","september":"September","october":"October","november":"November","december":"December"},"quotes":{"quote":"quote","author":"author"},"weather":{"city":"Minsk","humidity":"Humidity","wind":"Wind speed","windSpeed":"m/s","placeholder":"No city found"},"date":{"placeholder":"[Enter Name]"},"quotesData":{"quote1":{"text":"Genius is one percent inspiration and ninety-nine percent perspiration.","author":"Thomas Edison"},"quote2":{"text":"You can observe a lot just by watching.","author":"Yogi Berra"},"quote3":{"text":"Nothing happens unless first we dream.","author":"Carl Sandburg"},"quote4":{"text":"Well begun is half done.","author":"Aristotle"},"quote5":{"text":"Well begun is half done.","author":"Aristotle"},"quote6":{"text":"Peace comes from within. Do not seek it without.","author":"Buddha"},"quote7":{"text":"Doing nothing is better than being busy doing nothing.","author":"Lao Tzu"},"quote8":{"text":"Trust yourself. You know more than you think you do.","author":"Benjamin Spock"},"quote9":{"text":"Well done is better than well said.","author":"Benjamin Franklin"},"quote10":{"text":"One today is worth two tomorrows.","author":"Benjamin Franklin"},"quote11":{"text":"God always takes the simplest way.","author":"Albert Einstein"},"quote12":{"text":"Be as you wish to seem.","author":"Socrates"},"quote13":{"text":"A goal without a plan is just a wish.","author":"Larry Elder"},"quote14":{"text":"The best teacher is experience learned from failures.","author":"Byron Pulsifer"},"quote15":{"text":"Love is the flower you\'ve got to let grow.","author":"John Lennon"},"quote16":{"text":"Skill to do comes of doing.","author":"Ralph Emerson"},"quote17":{"text":"I believe that every person is born with talent.","author":"Maya Angelou"},"quote18":{"text":"Great talent finds happiness in execution.","author":"Johann Wolfgang von Goethe"},"quote19":{"text":"The two most powerful warriors are patience and time.","author":"Leo Tolstoy"},"quote20":{"text":"Those who are free of resentful thoughts surely find peace.","author":"Buddha"}},"settings":{"settingsTitle":"Settings","lang":"Change language","langEn":"English","langRu":"Russian","imageSrc":"Background source","show":"Show","audioPlayer":"Player","weather":"Weather","time":"Time","date":"Date","greeting":"Greeting","quotes":"Quote","todoButton":"ToDo List"}}');

/***/ }),

/***/ "./i18n/translations/quotesEn.json":
/*!*****************************************!*\
  !*** ./i18n/translations/quotesEn.json ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"quote1":{"text":"Genius is one percent inspiration and ninety-nine percent perspiration.","author":"Thomas Edison"},"quote2":{"text":"You can observe a lot just by watching.","author":"Yogi Berra"},"quote3":{"text":"Nothing happens unless first we dream.","author":"Carl Sandburg"},"quote4":{"text":"Well begun is half done.","author":"Aristotle"},"quote5":{"text":"Well begun is half done.","author":"Aristotle"},"quote6":{"text":"Peace comes from within. Do not seek it without.","author":"Buddha"},"quote7":{"text":"Doing nothing is better than being busy doing nothing.","author":"Lao Tzu"},"quote8":{"text":"Trust yourself. You know more than you think you do.","author":"Benjamin Spock"},"quote9":{"text":"Well done is better than well said.","author":"Benjamin Franklin"},"quote10":{"text":"One today is worth two tomorrows.","author":"Benjamin Franklin"},"quote11":{"text":"God always takes the simplest way.","author":"Albert Einstein"},"quote12":{"text":"Be as you wish to seem.","author":"Socrates"},"quote13":{"text":"A goal without a plan is just a wish.","author":"Larry Elder"},"quote14":{"text":"The best teacher is experience learned from failures.","author":"Byron Pulsifer"},"quote15":{"text":"Love is the flower you\'ve got to let grow.","author":"John Lennon"},"quote16":{"text":"Skill to do comes of doing.","author":"Ralph Emerson"},"quote17":{"text":"I believe that every person is born with talent.","author":"Maya Angelou"},"quote18":{"text":"Great talent finds happiness in execution.","author":"Johann Wolfgang von Goethe"},"quote19":{"text":"The two most powerful warriors are patience and time.","author":"Leo Tolstoy"},"quote20":{"text":"Those who are free of resentful thoughts surely find peace.","author":"Buddha"}}');

/***/ }),

/***/ "./i18n/translations/quotesRu.json":
/*!*****************************************!*\
  !*** ./i18n/translations/quotesRu.json ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"quotesData":{"quote1":{"text":"Гений - это один процент вдохновения и девяносто девять процентов пота.","author":"Томас Эдисон"},"quote2":{"text":"Вы можете многое увидеть, просто наблюдая.","author":"Йоги Берра"},"quote3":{"text":"Ничего не произойдёт, пока мы не начнём мечтать.","author":"Карл Сэндберг"},"quote4":{"text":"Хорошо начать - половину дела сделать.","author":"Аристотель"},"quote5":{"text":"Хорошо начать - половину дела сделать.","author":"Аристотель"},"quote6":{"text":"Покой приходит изнутри, поэтому нет смысла искать его где-либо еще.","author":"Будда"},"quote7":{"text":"Лучше ничего не делать, чем делать ничего.","author":"Лао-цзы"},"quote8":{"text":"Доверяй себе. Вы знаете больше, чем думаете.","author":"Бенджамин Спок"},"quote9":{"text":"Меньше болтай, больше делай.","author":"Бенджамин Франклин"},"quote10":{"text":"Один сегодня стоит двух завтра.","author":"Бенджамин Франклин"},"quote11":{"text":"Бог всегда выбирает самый простой путь.","author":"Альберт Эйнштейн"},"quote12":{"text":"Будьте такими, какими хотите казаться.","author":"Сократ"},"quote13":{"text":"Цель без плана - просто желание.","author":"Ларри Элдер"},"quote14":{"text":"Лучший учитель - это опыт, полученный на ошибках.","author":"Байрон Пульцифер"},"quote15":{"text":"Любовь - это цветок, которому вы должны позволить расти.","author":"Джон Леннон"},"quote16":{"text":"Умение делать рождается из делания.","author":"Ральф Эмерсон"},"quote17":{"text":"Я считаю, что каждый человек рождается с талантом.","author":"Майя Анжелу"},"quote18":{"text":"Большой талант находит счастье в исполнении.","author":"Иоганн Вольфганг фон Гете"},"quote19":{"text":"Терпение и время, вот мои воины-богатыри.","author":"Лев Толстой"},"quote20":{"text":"Те, кто свободны от мыслей обиды, несомненно, обретут покой.","author":"Будда"}}}');

/***/ }),

/***/ "./i18n/translations/ru.json":
/*!***********************************!*\
  !*** ./i18n/translations/ru.json ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"partsOfDay":{"night":"Доброй ночи, ","morning":"Доброе утро, ","afternoon":"Добрый день, ","evening":"Добрый вечер, "},"daysOfWeek":{"sunday":"Воскресенье","monday":"Понедельник","tuesday":"Вторник","wednesday":"Среда","thursday":"Четверг","friday":"Пятница","saturday":"Суббота"},"months":{"january":"Января","february":"февраля","march":"марта","april":"апреля","may":"мая","june":"июня","july":"июля","august":"августа","september":"сентября","october":"октября","november":"ноября","december":"декабря"},"quotes":{"quote":"Цитата","author":"Автор"},"weather":{"city":"Минск","humidity":"Влажность","wind":"Скорость ветра","windSpeed":"м/с","placeholder":"Город не найден"},"date":{"placeholder":"[Введите имя]"},"quotesData":{"quotesData":{"quote1":{"text":"Гений - это один процент вдохновения и девяносто девять процентов пота.","author":"Томас Эдисон"},"quote2":{"text":"Вы можете многое увидеть, просто наблюдая.","author":"Йоги Берра"},"quote3":{"text":"Ничего не произойдёт, пока мы не начнём мечтать.","author":"Карл Сэндберг"},"quote4":{"text":"Хорошо начать - половину дела сделать.","author":"Аристотель"},"quote5":{"text":"Хорошо начать - половину дела сделать.","author":"Аристотель"},"quote6":{"text":"Покой приходит изнутри, поэтому нет смысла искать его где-либо еще.","author":"Будда"},"quote7":{"text":"Лучше ничего не делать, чем делать ничего.","author":"Лао-цзы"},"quote8":{"text":"Доверяй себе. Вы знаете больше, чем думаете.","author":"Бенджамин Спок"},"quote9":{"text":"Меньше болтай, больше делай.","author":"Бенджамин Франклин"},"quote10":{"text":"Один сегодня стоит двух завтра.","author":"Бенджамин Франклин"},"quote11":{"text":"Бог всегда выбирает самый простой путь.","author":"Альберт Эйнштейн"},"quote12":{"text":"Будьте такими, какими хотите казаться.","author":"Сократ"},"quote13":{"text":"Цель без плана - просто желание.","author":"Ларри Элдер"},"quote14":{"text":"Лучший учитель - это опыт, полученный на ошибках.","author":"Байрон Пульцифер"},"quote15":{"text":"Любовь - это цветок, которому вы должны позволить расти.","author":"Джон Леннон"},"quote16":{"text":"Умение делать рождается из делания.","author":"Ральф Эмерсон"},"quote17":{"text":"Я считаю, что каждый человек рождается с талантом.","author":"Майя Анжелу"},"quote18":{"text":"Большой талант находит счастье в исполнении.","author":"Иоганн Вольфганг фон Гете"},"quote19":{"text":"Терпение и время, вот мои воины-богатыри.","author":"Лев Толстой"},"quote20":{"text":"Те, кто свободны от мыслей обиды, несомненно, обретут покой.","author":"Будда"}}},"settings":{"settingsTitle":"Настройки","lang":"Изменить язык","langEn":"Английский","langRu":"Русский","imageSrc":"Источник изображений","show":"Показать","audioPlayer":"Плеер","weather":"Погода","date":"Дата","time":"Время","greeting":"Приветствие","quotes":"Цитаты","todoButton":"Список дел"}}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!******************!*\
  !*** ./index.js ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _i18n_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./i18n/config */ "./i18n/config.js");
/* harmony import */ var _css_owfont_regular_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./css/owfont-regular.css */ "./css/owfont-regular.css");
/* harmony import */ var _css_style_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./css/style.css */ "./css/style.css");
/* harmony import */ var _js_time__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./js/time */ "./js/time.js");
/* harmony import */ var _js_background__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./js/background */ "./js/background.js");
/* harmony import */ var _js_weather__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./js/weather */ "./js/weather.js");
/* harmony import */ var _js_quotes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./js/quotes */ "./js/quotes.js");
/* harmony import */ var _js_audio__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./js/audio */ "./js/audio.js");
/* harmony import */ var _js_settings__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./js/settings */ "./js/settings.js");
/* harmony import */ var _js_todo__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./js/todo */ "./js/todo.js");
/* harmony import */ var _js_todo__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_js_todo__WEBPACK_IMPORTED_MODULE_9__);










})();

/******/ })()
;
//# sourceMappingURL=main.dea4067909e39f3992b8.js.map