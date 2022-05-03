import { quote, author, changeQuote } from "../utils/constants";
import i18next from "i18next";

let currentKey;

export const setText = () => {
  quote.textContent = i18next.t(`quotesData.${currentKey}.text`);
  author.textContent = i18next.t(`quotesData.${currentKey}.author`);
};

export default async function getQuote() {
  const res = await fetch("../i18n/translations/quotesEn.json");
  const data = await res.json();
  const keys = Object.keys(data);

  let current = Math.floor(Math.random() * (keys.length - 1));

  currentKey = keys[current];
  setText();
}

document.addEventListener("DOMContentLoaded", getQuote);
changeQuote.addEventListener("click", getQuote);
