import user from './user';
import toast from './toast';
import { ToastType } from '../interfaces/ToastType';
import submission from './submission';
import { StatusCodes } from 'http-status-codes';
import { NavigateFunction } from 'react-router-dom';
import i18next from 'i18next';

/**
 * Returns processed boolean based on role and displays toast if error
 * @author Steven Burger
 * @author David Linhardt
 *
 * @async
 * @returns {Boolean | null} - true = admin | false = user | null = error
 * @throws {Error} connection error
 */
const checkAdmin = async () => {
    try {
        const res = await user.checkAdmin();

        if (res.ok) {
            const { isAdmin } = await res.json();
            return isAdmin;
        }
    } catch (err) {
        toast.showToast(ToastType.ERROR, i18next.t('connectionError', { ns: 'main'}));
    }

    return null;
};

/**
 * Check the role and routes the user based on the role
 * @author Steven Burger
 *
 * @async
 * @param {NavigateFunction} navigate - useNavigate() var
 * @param {string} adminRoute - route for admin
 * @param {string} userRoute - route for user
 * @returns {void}
 */
const routeBasedOnRole = async (
    navigate: NavigateFunction,
    adminRoute: string,
    userRoute: string
) => {
    const isAdmin = await checkAdmin();

    if (isAdmin !== null) {
        isAdmin ? navigate(adminRoute) : navigate(userRoute);
    }
};

/**
 * If the user is admin, routes to adminRoute
 * @author Steven Burger
 *
 * @async
 * @param {NavigateFunction} navigate - useNavigate() var
 * @param {string} adminRoute - route for admin
 * @returns {void}
 */
const routeAdmin = async (navigate: NavigateFunction, adminRoute: string) => {
    const isAdmin = await checkAdmin();

    if (isAdmin !== null) {
        if (isAdmin) {
            navigate(adminRoute);
        }
    }
};

/**
 * Check if token is valid
 * @author Steven Burger
 * @author David Linhardt
 *
 * @async
 * @param {string} token
 * @returns {boolean} - true if valid, false if invalid
 * @throws {Error} connection error
 */
const checkTokenValid = async (token: string) => {
    try {
        const res = await user.checkToken(token);

        if (res.ok) {
            return true;
        } else if (res.status === StatusCodes.BAD_REQUEST) {
            toast.showToast(
                ToastType.ERROR, i18next.t('tokenInvalid', { ns: 'invite' })
            );
        } else if (res.status === StatusCodes.FORBIDDEN) {
            toast.showToast(
                ToastType.ERROR, i18next.t('tokenExpired', { ns: 'invite' }));
        } else if (res.status === StatusCodes.CONFLICT) {
            toast.showToast(ToastType.ERROR, i18next.t('tokenAlreadyUsed', { ns: 'invite' }));
        }
    } catch (err) {
        toast.showToast(ToastType.ERROR, i18next.t('connectionError', { ns: 'main'}));
    }

    return false;
};

/**
 * Returns parsed data for submission status
 * @author Steven Burger
 * @author David Linhardt
 *
 * @async
 * @returns {Object | null} - { isStarted: boolean, isExpired: boolean, submissionState: string } | null
 * @throws {Error} connection error
 */
const getSubmissionStatus = async () => {
    try {
        const res = await submission.getStatus();

        if (res.ok) {
            const data = await res.json();
            return data;
        } else {
            toast.showToast(
                ToastType.ERROR,
                i18next.t('notAuthenticated', { ns: 'main'})
            );
        }
    } catch (err) {
        toast.showToast(ToastType.ERROR, i18next.t('connectionError', { ns: 'main'}));
    }
    return null;
};

export default {
    checkAdmin,
    routeBasedOnRole,
    routeAdmin,
    checkTokenValid,
    getSubmissionStatus,
};
