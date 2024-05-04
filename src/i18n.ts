import i18next from "i18next";
import { initReactI18next } from "react-i18next";

// Translation files
import en from "../public/locales/en/translation.json";
import de from "../public/locales/de/translation.json";

const resources = {
    en: {
        translation: en,
    },
    de: {
        translation: de,
    },
};

i18next
    .use(initReactI18next)
    .init({
        resources,
        lng: "en", //default language
    });

export default i18next;