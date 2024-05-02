import user from './user';
import toast from './toast';
import { ToastType } from '../interfaces/ToastType';
import submission from './submission';
import { get } from 'http';

/**
 * Returns processed boolean based on role and displays toast if error
 * @returns {Boolean | null} - true = admin | false = user | null = error
 */
const checkAdmin = async () => {
    try {
        const res = await user.checkAdmin();

        if(res.ok) {
            const { isAdmin } = await res.json();
            return isAdmin;
        }
        else {
            toast.showToast(ToastType.ERROR, 'You are not authorized');
        }
    }
    catch(err) {
        console.log(err);
        toast.showToast(ToastType.ERROR, 'Connection error. Try again later.');
    }

    return null
};

/**
 * Check the role and routes the user based on the role
 * @async
 * @param {Navigate Function} navigate - useNavigate() var
 * @param {string} adminRoute - route for admin
 * @param {string} userRoute - route for user
 */
const routeBasedOnRole = async (navigate: Function, adminRoute: string, userRoute: string) => {
    const isAdmin = await checkAdmin();

    if(isAdmin !== null) {
        isAdmin ? navigate(adminRoute) : navigate(userRoute);
    }
}

/**
 * If the user is admin, routes to adminRoute
 * @async
 * @param {Navigate Function} navigate - useNavigate() var
 * @param {string} adminRoute - route for admin
 */
const routeAdmin = async (navigate: Function, adminRoute: string) => {
    const isAdmin = await checkAdmin();

    if(isAdmin !== null) {
        if(isAdmin) {
            navigate(adminRoute);
        }
    }
}

/**
 * Check if token is valid
 * @async
 * @param {string} token
 * @returns {Boolean} - true if valid, false if invalid
 */
const checkTokenValid = async (token: string) => {
    try {
        const res = await user.checkToken(token);

        if(res.ok) {
            return true;
        }
        else if(res.status === 400) {
            toast.showToast(
                ToastType.ERROR,
                toast.httpError(res.status, 'Invite token invalid. Contact an admin.')
            );
        }
        else if(res.status === 403) {
            toast.showToast(
                ToastType.ERROR,
                toast.httpError(res.status, 'Invite token invalid. Contact an admin.')
            );
        }
    }
    catch(err) {
        toast.showToast(ToastType.ERROR, 'Connection error. Try again later.');
    }

    return false;
}

/**
 * Returns parsed data for submission status
 * @async
 * @returns {Object | null} - { isStarted: boolean, isExpired: boolean, submissionState: string } | null
 */
const getSubmissionStatus = async () => {
    try {
        const res = await submission.getStatus();

        if(res.ok) {
            const data = await res.json();
            return data;
        }
        else {
            toast.showToast(
                ToastType.ERROR,
                toast.httpError(res.status, 'Not authenticated.')
            );
        }
    }
    catch(err) {
        toast.showToast(ToastType.ERROR, 'Connection error. Try again later.');
    }
    return null;
}

export default {
    checkAdmin,
    routeBasedOnRole,
    routeAdmin,
    checkTokenValid,
    getSubmissionStatus
};