import i18next from "i18next";
import { initReactI18next } from "react-i18next";

// Translation files
    // English
import enMain from "./locales/en/main.json";
import enUserProject from "./locales/en/userProject.json";
import enLogout from "./locales/en/logout.json";
import enInvite from "./locales/en/invite.json";
import enResetPassword from "./locales/en/resetPassword.json";
import enAdmin from "./locales/en/admin.json";

    // Deutsch / German
import deMain from "./locales/de/main.json";
import deUserProject from "./locales/de/userProject.json";
import deLogout from "./locales/de/logout.json";
import deInvite from "./locales/de/invite.json";
import deResetPassword from "./locales/de/resetPassword.json";
import deAdmin from "./locales/de/admin.json";

const resources = {
    en: {
        main: enMain,
        userProject: enUserProject,
        logout: enLogout,
        invite: enInvite,
        resetPassword: enResetPassword,
        admin: enAdmin,
    },
    de: {
        main: deMain,
        userProject: deUserProject,
        logout: deLogout,
        invite: deInvite,
        resetPassword: deResetPassword,
        admin: deAdmin,
    },
};

i18next
    .use(initReactI18next)
    .init({
        resources,
        lng: "en", //default language
    });

export default i18next;