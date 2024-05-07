import i18next from "i18next";
import { initReactI18next } from "react-i18next";

// Translation files
    // English
import enMain from "../public/locales/en/main.json";
import enUserProject from "../public/locales/en/userProject.json";
import enLogout from "../public/locales/en/logout.json";
import enInvite from "../public/locales/en/invite.json";
import enResetPassword from "../public/locales/en/resetPassword.json";

    // Deutsch / German
import deMain from "../public/locales/de/main.json";
import deUserProject from "../public/locales/de/userProject.json";
import deLogout from "../public/locales/de/logout.json";
import deInvite from "../public/locales/de/invite.json";
import deResetPassword from "../public/locales/de/resetPassword.json";

const resources = {
    en: {
        main: enMain,
        userProject: enUserProject,
        logout: enLogout,
        invite: enInvite,
        resetPassword: enResetPassword,
    },
    de: {
        main: deMain,
        userProject: deUserProject,
        logout: deLogout,
        invite: deInvite,
        resetPassword: deResetPassword,
    },
};

i18next
    .use(initReactI18next)
    .init({
        resources,
        lng: "en", //default language
    });

export default i18next;