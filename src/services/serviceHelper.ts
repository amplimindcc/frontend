import user from './user';
import toast from './toast';
import { ToastType } from '../interfaces/ToastType';
import submission from './submission';
import { StatusCodes } from 'http-status-codes';
import { NavigateFunction } from 'react-router-dom';

/**
 * Returns processed boolean based on role and displays toast if error
 * @author Steven Burger
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
        toast.showToast(ToastType.ERROR, 'Connection error. Try again later.');
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
                ToastType.ERROR,
                toast.httpError(
                    res.status,
                    'Invite token invalid. Contact an admin.'
                )
            );
        } else if (res.status === StatusCodes.FORBIDDEN) {
            toast.showToast(
                ToastType.ERROR,
                toast.httpError(
                    res.status,
                    'Invite token expired. Contact an admin.'
                )
            );
        } else if (res.status === StatusCodes.CONFLICT) {
            toast.showToast(
                ToastType.ERROR,
                toast.httpError(
                    res.status,
                    'Invite token already used. Contact an admin.'
                )
            );
        }
    } catch (err) {
        toast.showToast(ToastType.ERROR, 'Connection error. Try again later.');
    }

    return false;
};

/**
 * Returns parsed data for submission status
 * @author Steven Burger
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
                toast.httpError(res.status, 'Not authenticated.')
            );
        }
    } catch (err) {
        toast.showToast(ToastType.ERROR, 'Connection error. Try again later.');
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
