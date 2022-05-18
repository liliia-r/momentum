import {
  play,
  playList,
  songTitle,
  songDuration,
  currentSound,
  prevSong,
  nextSong,
  progressTime,
  progressSound,
  sound,
} from "../utils/constants";

import aquaSong from "../assets/sounds/Aqua Caelestis.mp3";
import ennioSong from "../assets/sounds/Ennio Morricone.mp3";
import riverSong from "../assets/sounds/River Flows In You.mp3";
import summerSong from "../assets/sounds/Summer Wind.mp3";

import { songs } from "../utils/songs";

let audio = new Audio();
let playNum = 0;
let isPlay = false;
let init = false;
let mouseDown = false;
let curDuration;
let currentTime;
let currentPlayItem;
let curAudioTitle;

songs.forEach((song, i) => {
  const audioItem = document.createElement("li");
  const btn = document.createElement("button");
  const p = document.createElement("p");
  audioItem.classList.add("audio-item");
  btn.classList.add("play");
  btn.classList.add("player-icon");
  btn.classList.add("player-btn");
  audioItem.dataset.playListNum = i;
  p.textContent = song.title;
  playList.appendChild(audioItem);
  audioItem.appendChild(p);
  audioItem.prepend(btn);
  if (i === 0) currentPlayItem = audioItem;
});

audio.src = songs[playNum].src;
curDuration = songs[playNum].duration;
curAudioTitle = songs[playNum].title;

const playAudio = () => {
  if (!isPlay) audio.play();
  else audio.pause();
  isPlay = !isPlay;
};

const toggleBtn = () => {
  play.classList.toggle("pause");
  document
    .querySelector(`[data-play-list-num="${playNum}"]`)
    .querySelector(".player-btn")
    .classList.toggle("pause");

  document
    .querySelector(`[data-play-list-num="${playNum}"]`)
    .querySelector(".player-btn")
    .classList.toggle("pause-active");
};

const toggleActive = () => {
  if (!isPlay) return;
  const newCurPlayItem = document.querySelector(
    `[data-play-list-num="${playNum}"]`
  );
  if (!currentPlayItem.classList.contains("active"))
    newCurPlayItem.classList.toggle("active");
  else {
    currentPlayItem.classList.toggle("active");
    currentPlayItem = newCurPlayItem;
    currentPlayItem.classList.toggle("active");
  }
  currentPlayItem = newCurPlayItem;
};

const changePlayAudio = () => {
  if (!init) {
    audio.addEventListener("timeupdate", nextOnTime);
    progressTime.addEventListener("click", scrub);
    progressTime.addEventListener("mousemove", (e) => {
      if (mouseDown) scrub(e);
    });
    progressTime.addEventListener("mousedown", () => {
      audio.pause();
      audio.removeEventListener("timeupdate", nextOnTime);
      mouseDown = true;
    });
    progressTime.addEventListener("mouseup", () => {
      if (play.classList.contains("pause")) audio.play();
      audio.addEventListener("timeupdate", nextOnTime);
      mouseDown = false;
    });
    init = !init;
  }
  songDuration.textContent = curDuration;
  songTitle.textContent = curAudioTitle;
  playAudio();
  toggleBtn();
  toggleActive();
};

const playNextAudio = () => {
  if (isPlay) changePlayAudio();
  playNum = playNum === songs.length - 1 ? 0 : playNum + 1;
  audio.src = songs[playNum].src;
  curDuration = songs[playNum].duration;
  curAudioTitle = songs[playNum].title;
  changePlayAudio();
};

const playPrevAudio = () => {
  if (isPlay) changePlayAudio();
  playNum = playNum === 0 ? songs.length - 1 : playNum - 1;
  audio.src = songs[playNum].src;
  curDuration = songs[playNum].duration;
  curAudioTitle = songs[playNum].title;
  changePlayAudio();
};

const nextOnTime = () => {
  currentSound.textContent = updateTimeProgress();

  if (audio.currentTime === audio.songDuration) playNextAudio();
};

function updateTimeProgress() {
  let minutes = Math.floor(audio.currentTime / 60);
  let seconds = Math.floor(audio.currentTime % 60);
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  if (seconds) {
    currentSound.textContent = `${minutes}:${seconds}`;
  }

  progressTime.value = (audio.currentTime / audio.duration) * 100;

  audio.currentTime =
    (progressTime.offsetX / progressTime.offsetWidth) * audio.duration;
}

function scrub(event) {
  audio.currentTime = event.target.value * (audio.duration / 100);
}

function updateProgressBarVol() {
  audio.volume = progressSound.value / 100;
  audio.volume === 0
    ? (sound.style.backgroundImage = 'url("assets/svg/soundfalse.svg")')
    : (sound.style.backgroundImage = 'url("assets/svg/sound.svg")');
}

function mute() {
  audio.muted = audio.muted === false ? true : false;
  if (progressSound.value === 0 || audio.muted) {
    sound.style.backgroundImage = 'url("assets/svg/soundfalse.svg")';
    progressSound.value = 0;
  } else {
    sound.style.backgroundImage = 'url("assets/svg/sound.svg")';
    progressSound.value = 40;
  }
}

play.addEventListener("click", changePlayAudio);
prevSong.addEventListener("click", playPrevAudio);
nextSong.addEventListener("click", playNextAudio);
audio.addEventListener("ended", playNextAudio);
progressTime.addEventListener("input", scrub);
progressSound.addEventListener("input", updateProgressBarVol);
sound.addEventListener("click", mute);

const btns = document.querySelectorAll(".player-btn");
btns.forEach((elem) => {
  elem.addEventListener("click", () => {
    console.log(elem);
    const curPN = +elem.parentNode.dataset.playListNum;
    const a = audio.src.split("/").pop().split("%20").join(" ");
    const b = songs[curPN].src.split("/").pop();
    if (isPlay) {
      changePlayAudio();
      if (a !== b) {
        playNum = curPN;
        audio.src = songs[playNum].src;
        curDuration = songs[playNum].duration;
        curAudioTitle = songs[playNum].title;
        changePlayAudio();
      }
    } else {
      if (a !== b) {
        playNum = curPN;
        audio.src = songs[playNum].src;
        curDuration = songs[playNum].duration;
        curAudioTitle = songs[playNum].title;
        changePlayAudio();
      }
      if (!init || a === b) changePlayAudio();
    }
  });
});
