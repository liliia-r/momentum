import { next, prev, body, radioButtons } from "../utils/constants";
import { Storage } from "../services/storage";
import { storageKeys } from "../utils/constants";
import { getRandomNum, randomNum } from "./getRandomNum";

getRandomNum(1, 20);
let locRandomNum = randomNum;

const newStorage = new Storage(localStorage);

const getLinkToImage = async (api, img, randomNum) => {
  const url =
    api === "unsplash"
      ? `https://api.unsplash.com/photos/random?query=nature&client_id=CpIz-7cJQ28Juh8IPCc1x5BLWNFzt4lrTe5cgTp5uT8`
      : `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=649b25d311697ca9cd2604bffa8c8dd5&tags=tree&extras=url_l&format=json&nojsoncallback=1&`;

  const res = await fetch(url);
  const data = await res.json();
  if (api === "unsplash") {
    img.src = data.urls.regular;
  } else {
    img.src = data.photos.photo[randomNum - 1].url_l;
  }
};

const getSlideNext = () => {
  next.removeEventListener("click", getSlideNext);
  body.addEventListener("transitionend", transitionBg);
  locRandomNum =
    +locRandomNum === 20
      ? "1"
      : (+locRandomNum + 1).toString().padStart(2, "0");
  setBg();
};

const getSlidePrev = () => {
  prev.removeEventListener("click", getSlidePrev);
  body.addEventListener("transitionend", transitionBg);
  locRandomNum =
    +locRandomNum === 1
      ? "20"
      : (+locRandomNum - 1).toString().padStart(2, "0");
  setBg();
};

const transitionBg = (e) => {
  if (body != e.target) return;
  next.addEventListener("click", getSlideNext);
  prev.addEventListener("click", getSlidePrev);
  body.removeEventListener("transitionend", transitionBg);
};

const getTimeOfDay = () => {
  const now = new Date();
  const hour = now.getHours();
  return Math.floor(hour / 6);
};

// Background image Local Storage
const changeSource = () => {
  let sourceForm = new FormData(document.querySelector(".background__inputs"));
  let source = sourceForm.get("bgSrc");
  newStorage.save(storageKeys.backgroundSource, source);
};

const setBg = () => {
  let source = newStorage.get("backgroundSource") || "gitHub";

  const partsOfDay = ["night", "morning", "afternoon", "evening"];
  const dayPart = getTimeOfDay();
  let currentTime = partsOfDay[dayPart];

  const img = new Image();

  if (source === "gitHub") {
    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${currentTime}/${locRandomNum
      .toString()
      .padStart(2, "0")}.jpg`;
  } else {
    if (source === "unsplash") {
      getLinkToImage("unsplash", img);
    }
    if (source === "flickr") {
      let rn = randomNum;
      while (rn === randomNum) {
        getRandomNum(1, 100);
      }
      getLinkToImage("flickr", img, randomNum);
    }
  }

  img.addEventListener("load", () => {
    body.style.backgroundImage = `url(${img.src})`;
  });
};

window.addEventListener("load", setBg);
body.addEventListener("DOMContentLoaded", setBg);
next.addEventListener("click", getSlideNext);
prev.addEventListener("click", getSlidePrev);

radioButtons.forEach(
  (radioButton) =>
    (radioButton.onchange = function () {
      changeSource();
      setBg();
    })
);
