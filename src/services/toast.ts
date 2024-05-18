import { Bounce, toast } from 'react-toastify';
import { ToastType } from '../interfaces/ToastType';

/**
 * Show toast message
 *
 * @param type INFO | ERROR | SUCCESS
 * @param message Toast message
 * @param ttl Time to live in Milliseconds
 * @returns Callback function to show toast
 */
const showToast = (
    type: ToastType = ToastType.INFO,
    message: string | JSX.Element,
    ttl: number = 5000
) => {
    switch (type) {
        case ToastType.ERROR:
            toast.error(message, {
                position: 'top-right',
                autoClose: ttl,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
                transition: Bounce,
            });
            break;
        case ToastType.SUCCESS:
            toast.success(message, {
                position: 'top-right',
                autoClose: ttl,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
                transition: Bounce,
            });
            break;
        case ToastType.INFO:
            toast.info(message, {
                position: 'top-right',
                autoClose: ttl,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
                transition: Bounce,
            });
            break;
    }
};

/**
 * Build HTTP error message 'status: message'
 *
 * @param status HTTP status code
 * @param message Error message
 * @returns Error message
 */
const httpError = (status: number, message: string) => {
    const res = status + ': ' + message;
    return res;
};

export default { showToast, httpError };
