import user from './user';
import toast from './toast';
import { ToastType } from '../interfaces/ToastType';

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

export default { checkAdmin, routeBasedOnRole, routeAdmin };