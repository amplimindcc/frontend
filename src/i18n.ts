import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation files
// English
import enMain from './locales/en/main.json';
import enUserProject from './locales/en/userProject.json';
import enLogout from './locales/en/logout.json';
import enInvite from './locales/en/invite.json';
import enResetPassword from './locales/en/resetPassword.json';
import enAdmin from './locales/en/admin.json';
import enPasswordStrength from './locales/en/passwordStrength.json';
import enLicense from './locales/en/license.json';
import enPrivacyPolicy from './locales/en/privacyPolicy.json';

// Deutsch / German
import deMain from './locales/de/main.json';
import deUserProject from './locales/de/userProject.json';
import deLogout from './locales/de/logout.json';
import deInvite from './locales/de/invite.json';
import deResetPassword from './locales/de/resetPassword.json';
import deAdmin from './locales/de/admin.json';
import dePasswordStrength from './locales/de/passwordStrength.json';
import deLicense from './locales/de/license.json';
import dePrivacyPolicy from './locales/de/privacyPolicy.json';

const resources = {
    en: {
        main: enMain,
        userProject: enUserProject,
        logout: enLogout,
        invite: enInvite,
        resetPassword: enResetPassword,
        admin: enAdmin,
        passwordStrength: enPasswordStrength,
        license: enLicense,
        privacyPolicy: enPrivacyPolicy,
    },
    de: {
        main: deMain,
        userProject: deUserProject,
        logout: deLogout,
        invite: deInvite,
        resetPassword: deResetPassword,
        admin: deAdmin,
        passwordStrength: dePasswordStrength,
        license: deLicense,
        privacyPolicy: dePrivacyPolicy,
    },
};

i18next.use(initReactI18next).init({
    resources,
    fallbackLng: 'en', //fallback language
});

export default i18next;
