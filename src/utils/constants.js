export const time = document.querySelector(".time"),
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

export const storageKeys = Object.freeze({
  name: "name",
  city: "city",
  lang: "lang",
  backgroundSource: "backgroundSource",
  todo: "todo",
});
