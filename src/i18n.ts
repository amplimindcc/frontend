import i18next from "i18next";
import { initReactI18next } from "react-i18next";

// Translation files
import enMain from "../public/locales/en/main.json";
import enCommit from "../public/locales/en/commit.json";
import enLogout from "../public/locales/en/logout.json";
import deMain from "../public/locales/de/main.json";
import deCommit from "../public/locales/de/commit.json";
import deLogout from "../public/locales/de/logout.json";

const resources = {
    en: {
        main: enMain,
        commit: enCommit,
        logout: enLogout,
    },
    de: {
        main: deMain,
        commit: deCommit,
        logout: deLogout,
    },
};

i18next
    .use(initReactI18next)
    .init({
        resources,
        lng: "en", //default language
    });

export default i18next;