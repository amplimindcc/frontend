import i18next from "i18next";
import { initReactI18next } from "react-i18next";

// Translation files
import enMain from "../public/locales/en/main.json";
import deMain from "../public/locales/de/main.json";

const resources = {
    en: {
        main: enMain,
    },
    de: {
        main: deMain,
    },
};

i18next
    .use(initReactI18next)
    .init({
        resources,
        lng: "en", //default language
    });

export default i18next;