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

const routeBasedOnRole = async (navigate: Function) => {
    const isAdmin = await checkAdmin();

    if(isAdmin !== null) {
        isAdmin ? navigate('/admin') : navigate('/project/start');
    }
}

export default { checkAdmin, routeBasedOnRole };