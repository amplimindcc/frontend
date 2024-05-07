import i18next from "i18next";
import { initReactI18next } from "react-i18next";

// Translation files
    // English
import enMain from "./locales/en/main.json";
import enUserProject from "./locales/en/userProject.json";
import enLogout from "./locales/en/logout.json";
import enInvite from "./locales/en/invite.json";
import enResetPassword from "./locales/en/resetPassword.json";

    // Deutsch / German
import deMain from "./locales/de/main.json";
import deUserProject from "./locales/de/userProject.json";
import deLogout from "./locales/de/logout.json";
import deInvite from "./locales/de/invite.json";
import deResetPassword from "./locales/de/resetPassword.json";

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