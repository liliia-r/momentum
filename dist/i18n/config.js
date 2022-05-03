import i18next from "i18next";
import { Storage } from "../services/storage";
import { storageKeys } from "../utils/constants";

import enTranslation from "./translations/en.json";
import ruTranslation from "./translations/ru.json";
import quotesEn from "./translations/quotesEn.json";
import quotesRu from "./translations/quotesRu.json";

function checkLocalStorage() {
  const newStorage = new Storage(localStorage);
  let lang = newStorage.get(storageKeys.lang);
  return lang ? `${lang}` : "en";
}

i18next.init({
  lng: checkLocalStorage(),
  debug: true,
  resources: {
    en: {
      translation: {
        ...enTranslation,
        ...quotesEn,
      },
    },
    ru: {
      translation: {
        ...ruTranslation,
        ...quotesRu,
      },
    },
  },
});

// initialized and ready to go!
// i18next is already initialized, because the translation resources where passed via init function
// document.querySelector(".date").innerHTML = i18next.t("key");

export default i18next;
